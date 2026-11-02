const { app, BrowserWindow, Menu, Tray, shell, dialog } = require("electron");
const express = require("express");
const path = require("path");
const net = require("net");

let server;
let tray;
let localUrl = "";

function appFilesDirectory() {
  return app.isPackaged
    ? path.join(process.resourcesPath, "www")
    : path.join(__dirname, "..", "www");
}

function findAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.unref();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

function createLocalServer() {
  const localApp = express();
  const files = appFilesDirectory();
  localApp.disable("x-powered-by");
  localApp.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  localApp.use(express.static(files, { index: "index.html", fallthrough: false }));
  return localApp;
}

async function openSchoolix() {
  if (!localUrl) return;
  await shell.openExternal(localUrl);
}

function createTray() {
  // A native icon is optional. The app remains available in the Windows tray
  // and stays running so the local browser tab keeps working.
  tray = new Tray(path.join(appFilesDirectory(), "schoolix-app-icon.svg"));
  tray.setToolTip("Schoolix Local Server");
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "Open Schoolix", click: openSchoolix },
    { type: "separator" },
    { label: "Quit Schoolix Local", click: () => app.quit() }
  ]));
  tray.on("click", openSchoolix);
}

app.whenReady().then(async () => {
  try {
    const port = await findAvailablePort();
    const localApp = createLocalServer();
    server = await new Promise((resolve, reject) => {
      const instance = localApp.listen(port, "127.0.0.1", () => resolve(instance));
      instance.on("error", reject);
    });
    localUrl = `http://127.0.0.1:${port}/`;
    createTray();
    await openSchoolix();
  } catch (error) {
    await dialog.showMessageBox({
      type: "error",
      title: "Schoolix Local could not start",
      message: "The local Schoolix server could not be started.",
      detail: error.message || String(error)
    });
    app.quit();
  }
});

app.on("window-all-closed", (event) => event.preventDefault());
app.on("before-quit", () => server?.close());
