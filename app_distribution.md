# Schoolix APK Distribution

Use this APK for direct sharing:

- `dist/Schoolix.apk`

You can send this file over WhatsApp, email, USB, Google Drive, or any file sharing method.

Android users may need to allow "Install unknown apps" for the app they use to open the APK.

The Android app also checks `update.json` on launch. Keep this JSON deployed beside the web app so old APKs can detect future releases.

## Rebuild APK

```powershell
npm run android:sync
cd android
.\gradlew.bat assembleRelease
Copy-Item app\build\outputs\apk\release\app-release.apk ..\dist\Schoolix.apk -Force
```

After rebuilding, update `update.json` with the new `versionCode`, `versionName`, changelog, and APK URL. See `IN_APP_UPDATE_GUIDE.md` for the full release checklist.

## Included Login Access

- Student email or Student ID
- Parent email
- Teacher email
- Admin blocked inside Android app
