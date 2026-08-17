# Schoolix In-App Android Updates

Schoolix checks `https://schoolix-48107.web.app/update.json` every time the Android app starts. If the JSON `versionCode` is higher than the installed APK versionCode, the app shows an update dialog and downloads the APK directly, without the Google Play Store.

## JSON Format

```json
{
  "versionCode": 7,
  "versionName": "1.6",
  "forceUpdate": false,
  "message": "Bug fixes and performance improvements.",
  "apkUrl": "https://schoolix-48107.web.app/dist/Schoolix.apk?v=7"
}
```

## Release Future Updates

1. Update the Android version in `android/app/build.gradle`.

```gradle
versionCode 7
versionName "1.6"
```

Always increase `versionCode`. Android uses this number to decide whether an APK is newer.

2. Build the latest web assets and Android APK.

```powershell
npm run android:sync
cd android
.\gradlew.bat assembleRelease
Copy-Item app\build\outputs\apk\release\app-release.apk ..\dist\Schoolix.apk -Force
```

3. Upload the new APK to your server.

For Firebase Hosting in this project, keep the file available at:

```text
https://schoolix-48107.web.app/dist/Schoolix.apk
```

4. Update `update.json` on the server.

Set:

- `versionCode`: the new integer from `android/app/build.gradle`
- `versionName`: the visible app version
- `forceUpdate`: `true` only when old apps must be blocked
- `message`: changelog shown to users
- `apkUrl`: direct HTTPS URL to the new APK

5. Deploy the updated JSON and APK.

When users open Schoolix Android next time, the app checks the JSON automatically. If the remote `versionCode` is newer, the update dialog appears. On Android 8+, users may need to allow "Install unknown apps" for Schoolix before the installer opens.
