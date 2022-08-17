use tauri::{Manager, RunEvent, WindowEvent};

use crate::ui::app::register_shortcut;
use crate::ui::menu::main_menu_builder;
use crate::ui::tray::SystemTrayBuilder;

mod ui;

fn main() {
  let builder = tauri::Builder::default();
  let app = builder
    .menu(main_menu_builder())
    .system_tray(SystemTrayBuilder::build())
    .on_system_tray_event(SystemTrayBuilder::handle_tray_event)
    .build(tauri::generate_context!())
    .expect("error while running tauri application");

  register_shortcut(&app);
  app.run(|app_handle, e| {
    if let RunEvent::Ready = e {
      let win = app_handle.get_window("main").unwrap().clone();

      win.on_window_event(|e| {
        if let WindowEvent::CloseRequested { api, .. } = e {
          // api.prevent_close();
        }
      })
    }
  });
}
