use crate::ui::menu::main_menu_builder;

mod ui;

fn main() {
  let builder = tauri::Builder::default();
  builder
    .menu(main_menu_builder())
    .build(tauri::generate_context!())
    .expect("error while running tauri application")
    .run(|_, _| {});
}
