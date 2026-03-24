use serde::{Deserialize, Serialize};
use notify::{RecommendedWatcher, RecursiveMode, Watcher};
use std::path::Path;
use std::sync::{Arc, Mutex};
use tauri::{Emitter, State, Window};
use freedesktop_desktop_entry::{default_paths, get_languages_from_env, Iter};
use freedesktop_icons::lookup;
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

#[derive(Deserialize, Serialize, Debug)]
struct AppsJsonified {
    name: String,
    path: String,
}

struct WatcherState {
    watcher: Arc<Mutex<Option<RecommendedWatcher>>>,
    last_content: Arc<Mutex<String>>,
}

impl WatcherState {
    fn new() -> Self {
        Self {
            watcher: Arc::new(Mutex::new(None)),
            last_content: Arc::new(Mutex::new(String::new())),
        }
    }
}

#[derive(Serialize)]
struct AppInfo {
    name: String,
    exec: String,
    icon_url: Option<String>,
    description: String,
}

#[tauri::command]
fn app_pin_listener(window: Window, state: State<'_, Arc<WatcherState>>) -> Result<(), String> {
    let window = window.clone();
    let last_content = Arc::clone(&state.last_content);
    if let Ok(apps_str) = std::fs::read_to_string("../public/sys_data/panel_apps.json") {
        {
            let mut last = last_content.lock().unwrap();
            *last = apps_str.clone();
        }
        if let Ok(apps_json) = serde_json::from_str::<Vec<AppsJsonified>>(&apps_str) {
            let _ = window.emit("panel_apps_updated", &apps_json);
        }
    }

    let mut watcher = RecommendedWatcher::new(
        move |res| match res {
            Ok(_) => {
                if let Ok(apps_str) = std::fs::read_to_string("../public/sys_data/panel_apps.json") {
                    let mut last = last_content.lock().unwrap();
                    if *last != apps_str {
                        *last = apps_str.clone();
                        if let Ok(apps_json) = serde_json::from_str::<Vec<AppsJsonified>>(&apps_str) {
                            println!("Updated panel json apps {:?}", apps_json);
                            let _ = window.emit("panel_apps_updated", &apps_json);
                        }
                    }
                }
            }
            Err(e) => eprintln!("watch error: {:?}", e),
        },
        notify::Config::default(),
    )
    .map_err(|e| e.to_string())?;

    watcher
        .watch(
            Path::new("../public/sys_data/panel_apps.json"),
            RecursiveMode::NonRecursive,
        )
        .map_err(|e| e.to_string())?;

    *state.watcher.lock().unwrap() = Some(watcher);
    Ok(())
}
fn copy_icon_to_cache(icon_path: &PathBuf, icons_dir: &PathBuf) -> PathBuf {
    let file_name = icon_path.file_name().expect("no file name");
    let target_path = icons_dir.join(file_name);
    if !target_path.exists() {
        fs::copy(icon_path, &target_path).expect("failed to copy icon");
    }
    target_path
}


#[tauri::command]
async fn list_apps(app: tauri::AppHandle) -> Vec<AppInfo> {
    let locales = get_languages_from_env();
    let apps = Iter::new(default_paths()).entries(Some(&locales)).collect::<Vec<_>>();
    let resource_dir = app.path().resource_dir().expect("no resource dir found");
    let icons_dir = resource_dir.join("app_icons");
    fs::create_dir_all(&icons_dir).expect("failed to create icons dir");

    let mut result = Vec::new();

    for app_entry in apps {
        let name = app_entry.name(&locales).unwrap_or("Unnamed App".into()).to_string();
        let exec = app_entry.exec().map(|s| s.to_string()).unwrap_or_default();
        let description = app_entry.comment(&locales).unwrap_or("No description".into()).to_string();

        let icon_url = if let Some(icon_name) = app_entry.icon() {
            lookup(icon_name).with_size(1024).find().map(|icon_path| {
                let icon_file = icons_dir.join(icon_path.file_name().unwrap());
                if !icon_file.exists() {
                    fs::copy(&icon_path, &icon_file).expect("failed to copy icon");
                }
                format!("app_icons/{}", icon_file.file_name().unwrap().to_string_lossy())
            })
        } else {
            None
        };

        result.push(AppInfo { name, exec, icon_url, description });
    }

    result
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(Arc::new(WatcherState::new()))
        .invoke_handler(tauri::generate_handler![app_pin_listener, list_apps])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn main() {
    run();
}