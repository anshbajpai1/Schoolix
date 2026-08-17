package com.schoolix.app.updates;

import org.json.JSONException;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UpdateInfo {
    private final int versionCode;
    private final String versionName;
    private final boolean forceUpdate;
    private final String message;
    private final List<String> changelog;
    private final String apkUrl;

    public UpdateInfo(int versionCode, String versionName, boolean forceUpdate, String message, String apkUrl) {
        this(versionCode, versionName, forceUpdate, message, Collections.emptyList(), apkUrl);
    }

    public UpdateInfo(int versionCode, String versionName, boolean forceUpdate, String message, List<String> changelog, String apkUrl) {
        this.versionCode = versionCode;
        this.versionName = versionName;
        this.forceUpdate = forceUpdate;
        this.message = message;
        this.changelog = changelog == null ? Collections.emptyList() : Collections.unmodifiableList(new ArrayList<>(changelog));
        this.apkUrl = apkUrl;
    }

    public static UpdateInfo fromJson(String json) throws JSONException {
        JSONObject object = new JSONObject(json);
        List<String> changelog = new ArrayList<>();
        JSONArray array = object.optJSONArray("changelog");
        if (array == null) array = object.optJSONArray("changes");
        if (array != null) {
            for (int index = 0; index < array.length(); index += 1) {
                String item = array.optString(index, "").trim();
                if (!item.isEmpty()) changelog.add(item);
            }
        }
        return new UpdateInfo(
            object.getInt("versionCode"),
            object.optString("versionName", ""),
            object.optBoolean("forceUpdate", false),
            object.optString("message", "A new Schoolix update is available."),
            changelog,
            object.getString("apkUrl")
        );
    }

    public int getVersionCode() {
        return versionCode;
    }

    public String getVersionName() {
        return versionName;
    }

    public boolean isForceUpdate() {
        return forceUpdate;
    }

    public String getMessage() {
        return message;
    }

    public List<String> getChangelog() {
        return changelog;
    }

    public String getApkUrl() {
        return apkUrl;
    }

    public JSONObject toJson() throws JSONException {
        JSONArray changes = new JSONArray();
        for (String item : changelog) changes.put(item);
        return new JSONObject()
            .put("versionCode", versionCode)
            .put("versionName", versionName)
            .put("forceUpdate", forceUpdate)
            .put("message", message)
            .put("changelog", changes)
            .put("apkUrl", apkUrl);
    }
}
