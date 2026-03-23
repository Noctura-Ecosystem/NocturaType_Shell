use serde::{Deserialize, Serialize};
use notify::{RecommendedWatcher, RecursiveMode, Watcher};
use std::path::Path;
use std::sync::{Arc, Mutex};
use tauri::{Emitter, State, Window};

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(Arc::new(WatcherState::new()))
        .invoke_handler(tauri::generate_handler![app_pin_listener])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn main() {
    run()
}