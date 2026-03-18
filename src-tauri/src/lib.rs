use tauri::Window;
use tauri::Emitter;
use serde_json::json;
#[tauri::command]
fn add_app(window: Window, app_name: String, app_path: String) {
    let data = json!({
        "name": app_name,
        "src": app_path
    });
    window.emit("add-app", data).unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![add_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn main() {
    run()
}