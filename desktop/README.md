# Schoolix Local

`npm run build:desktop` creates a Windows app folder at `desktop-local/win-unpacked/`. Copy that entire folder to another Windows computer, then run `Schoolix Local.exe` inside it.

When opened, the executable starts Schoolix on a loopback-only local address and opens it in the user's default browser. It does not expose the server to the local network. Keep the tray app running while Schoolix is open; use **Quit Schoolix Local** from its tray menu when finished.

Cloud features such as sign-in, school data sync, uploaded photos, and payments still require internet access.
