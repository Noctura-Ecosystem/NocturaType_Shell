use serde::{Deserialize, Serialize};
use notify::{RecommendedWatcher, RecursiveMode, Watcher};
use std::path::Path;
use std::sync::{Arc, Mutex};
use tauri::{Emitter, State, Window};
use freedesktop_desktop_entry::{default_paths, get_languages_from_env, Iter};
use freedesktop_icons::lookup;
use std::path::PathBuf;

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
    icon_path: Option<String>,
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
#[tauri::command]
async fn list_apps() -> Vec<AppInfo> {
    let locales = get_languages_from_env();
    let apps =  Iter::new(default_paths())
        .entries(Some(&locales))
        .filter(|entry| {
            entry.type_() == Some("Application") && !entry.no_display()
        });
    let mut result = Vec::new();
    let mut fail = 0;
    let mut total = 0;

    for app in apps {
        total += 1;
        let name = app.name(&locales).unwrap_or("Unnamed App".into());
        let icon_name = app.icon().unwrap_or("No img".into());
        let exec = app.exec().map(|s| s.to_string()).unwrap_or_default();
        let description = app.comment(&locales).unwrap_or("No description".into()).to_string();
        let mut icon_path = lookup(&icon_name).with_size(48).find();
        if icon_path == None {
            icon_path = lookup(&icon_name.replace("-", "_")).with_size(48).find();
            if icon_path == None {
                println!("ERROR WITH:- {}", &icon_name.replace("-", "_"));
                fail += 1;
                continue;
            }
        }
        println!("{}, {}, {}, {:?}", name, exec, description, icon_path);
        result.push(AppInfo{
            name: name.to_string(),
            exec,
            icon_path: icon_path.map(|p: PathBuf| p.to_string_lossy().into_owned()),
            description,
        });
    }
    println!("FAIL:- {}", fail);
    println!("TOTAL:- {}", total);
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