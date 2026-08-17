import { initializeApp, getApps, getApp } from "./firebase-compat.js";
import { getAuth, onAuthStateChanged } from "./firebase-compat.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  serverTimestamp,
  where
} from "./firebase-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",
  authDomain: "schoolix-48107.firebaseapp.com",
  projectId: "schoolix-48107",
  storageBucket: "schoolix-48107.firebasestorage.app",
  messagingSenderId: "133937954491",
  appId: "1:133937954491:web:69d8064422617eb8c4339e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = (id) => document.getElementById(id);

let staffProfile = null;
let schoolId = "";
let qrStream = null;
let qrTimer = null;
let qrBusy = false;

function todayISO() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function roleLabel(role) {
  return role === "accountant" ? "Accountant" : role === "librarian" ? "Librarian" : "Staff";
}

function currentMonth() {
  return todayISO().slice(0, 7);
}

function formatDate(date) {
  if (!date) return "-";
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function setStatus(message, type = "info") {
  const box = $("staffQrStatus");
  if (!box) return;
  box.textContent = message;
  box.dataset.type = type;
}

function toast(message) {
  if (window.showToast) return window.showToast(message);
  const note = document.createElement("div");
  note.textContent = message;
  note.style.cssText = "position:fixed;right:16px;bottom:16px;z-index:99999;background:#111827;color:#fff;padding:12px 14px;border-radius:8px;font-weight:700;box-shadow:0 12px 28px rgba(15,23,42,.22)";
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2800);
}

function parseToken(rawValue) {
  const value = String(rawValue || "").trim();
  const prefix = "SCHLX-STAFF-ATT:";
  return value.startsWith(prefix) ? value.slice(prefix.length).trim() : "";
}

function ensureCard() {
  if ($("staffQrCheckinCard") || $("staffAttendanceCard")) return;
  if (!$("staffQrCheckinStyles")) {
    const style = document.createElement("style");
    style.id = "staffQrCheckinStyles";
    style.textContent = `
      .staff-qr-checkin-card{display:block;grid-column:1/-1;margin-top:18px;padding:20px;border:1px solid rgba(148,163,184,.26);border-radius:8px;background:#fff;color:#0f172a;box-shadow:0 14px 34px rgba(15,23,42,.08)}
      body.staff-portal-sidebar-enabled{padding-left:260px}
      .staff-portal-sidebar{position:fixed;inset:0 auto 0 0;width:260px;z-index:2500;background:#0f172a;color:#e5e7eb;padding:20px;display:flex;flex-direction:column;gap:18px;box-shadow:12px 0 34px rgba(15,23,42,.18)}
      .staff-portal-brand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:20px}
      .staff-portal-brand span{display:grid;place-items:center;width:38px;height:38px;border-radius:8px;background:#2563eb;color:#fff}
      .staff-portal-nav{display:grid;gap:8px}
      .staff-portal-nav a,.staff-portal-nav button{width:100%;min-height:42px;border:0;border-radius:8px;background:transparent;color:#cbd5e1;text-decoration:none;display:flex;align-items:center;gap:10px;padding:10px 12px;font-weight:800;text-align:left;cursor:pointer}
      .staff-portal-nav a:hover,.staff-portal-nav button:hover,.staff-portal-nav .active{background:rgba(255,255,255,.1);color:#fff}
      body.staff-portal-sidebar-enabled .shell{max-width:1180px}
      .staff-qr-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap}
      .staff-qr-head h2{margin:0;font-size:20px;letter-spacing:0;color:inherit}
      .staff-qr-head p{margin:6px 0 0;color:#64748b}
      .staff-qr-actions,.staff-qr-manual{display:flex;gap:10px;flex-wrap:wrap}
      .staff-qr-body{display:grid;grid-template-columns:minmax(240px,360px) minmax(0,1fr);gap:14px;margin-top:16px;align-items:stretch}
      .staff-qr-video-wrap{min-height:220px;border-radius:8px;background:#111827;color:#cbd5e1;display:grid;place-items:center;overflow:hidden}
      .staff-qr-video-wrap video{display:none;width:100%;height:100%;object-fit:cover}
      .staff-qr-panel{display:grid;align-content:start;gap:12px}
      .staff-qr-status{padding:14px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;color:#64748b;font-weight:800}
      .staff-qr-status[data-type="success"]{border-color:#bbf7d0;background:#f0fdf4;color:#166534}
      .staff-qr-status[data-type="error"]{border-color:#fecaca;background:#fef2f2;color:#991b1b}
      .staff-qr-manual input{flex:1 1 260px;min-height:42px;border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;font:inherit}
      .staff-qr-btn{min-height:42px;border:1px solid #cbd5e1;border-radius:8px;background:#f8fafc;color:#0f172a;padding:10px 13px;font-weight:900;cursor:pointer}
      .staff-qr-btn.primary{border-color:#2563eb;background:#2563eb;color:#fff}
      .staff-attendance-card{grid-column:1/-1;margin-top:18px;padding:20px;border:1px solid rgba(148,163,184,.26);border-radius:8px;background:#fff;color:#0f172a;box-shadow:0 14px 34px rgba(15,23,42,.08)}
      .staff-attendance-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
      .staff-attendance-head h2{margin:0;font-size:20px;letter-spacing:0}
      .staff-attendance-head input{min-height:40px;border:1px solid #cbd5e1;border-radius:8px;padding:8px 10px;font:inherit}
      .staff-attendance-list{display:grid;gap:10px;margin-top:14px}
      .staff-attendance-row{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;padding:12px}
      .staff-attendance-row strong{display:block}
      .staff-attendance-row small{display:block;margin-top:4px;color:#64748b}
      .staff-attendance-badge{border-radius:999px;padding:6px 10px;font-size:12px;font-weight:900}
      .staff-attendance-badge.present{background:#dcfce7;color:#166534}.staff-attendance-badge.half{background:#fef3c7;color:#92400e}.staff-attendance-badge.absent{background:#fee2e2;color:#991b1b}
      @media(max-width:900px){body.staff-portal-sidebar-enabled{padding-left:0}.staff-portal-sidebar{position:static;width:auto;margin:0 0 18px}.staff-attendance-row{grid-template-columns:1fr}}
      @media(max-width:760px){.staff-qr-body{grid-template-columns:1fr}.staff-qr-manual input,.staff-qr-btn{width:100%}}
    `;
    document.head.appendChild(style);
  }
  const mode = document.body?.dataset?.staffFeature || "both";
  const host = mode === "qr"
    ? ($("libraryQrMount") || $("accountantQrMount") || document.querySelector(".grid") || document.querySelector(".container") || document.querySelector(".shell") || document.body)
    : mode === "attendance"
      ? ($("libraryAttendanceMount") || $("accountantAttendanceMount") || document.querySelector(".grid") || document.querySelector(".container") || document.querySelector(".shell") || document.body)
      : (document.querySelector(".grid") || document.querySelector(".container") || document.querySelector(".shell") || document.body);
  let anchor = null;
  if (mode === "both" || mode === "qr") {
    const card = document.createElement("section");
    card.className = "staff-qr-checkin-card";
    card.id = "staffQrCheckinCard";
    card.innerHTML = `
      <div class="staff-qr-head">
        <div>
          <h2>QR Check-In</h2>
          <p>Scan the attendance QR generated from your profile.</p>
        </div>
        <div class="staff-qr-actions">
          <button type="button" class="staff-qr-btn primary" onclick="startStaffQrScanner()">Scan QR</button>
          <button type="button" class="staff-qr-btn" onclick="stopStaffQrScanner()">Stop</button>
        </div>
      </div>
      <div class="staff-qr-body">
        <div class="staff-qr-video-wrap">
          <video id="staffQrVideo" muted playsinline></video>
          <div id="staffQrCameraHint">Camera preview will appear here.</div>
        </div>
        <div class="staff-qr-panel">
          <div class="staff-qr-status" id="staffQrStatus">Ask admin to generate your unique attendance QR.</div>
          <div class="staff-qr-manual">
            <input id="staffQrManualCode" placeholder="Paste QR code if camera scan is unavailable">
            <button type="button" class="staff-qr-btn primary" onclick="submitStaffQrManualCode()">Mark Attendance</button>
          </div>
        </div>
      </div>
    `;
    if (host.classList.contains("grid")) host.appendChild(card);
    else host.insertBefore(card, host.children[1] || null);
    anchor = card;
  }

  if (mode === "both" || mode === "attendance") {
    const attendance = document.createElement("section");
    attendance.className = "staff-attendance-card";
    attendance.id = "staffAttendanceCard";
    attendance.innerHTML = `
      <div class="staff-attendance-head">
        <div><h2>My Daily Attendance</h2><p>Daily attendance marked by QR or admin.</p></div>
        <input type="month" id="staffAttendanceMonth" value="${currentMonth()}" onchange="loadStaffAttendanceHistory()">
      </div>
      <div class="staff-attendance-list" id="staffAttendanceList"><div class="staff-qr-status">Loading attendance...</div></div>
    `;
    if (anchor) anchor.insertAdjacentElement("afterend", attendance);
    else if (host.classList.contains("grid")) host.appendChild(attendance);
    else host.insertBefore(attendance, host.children[1] || null);
    loadStaffAttendanceHistory().catch((error) => setStatus(error.message || "Unable to load attendance.", "error"));
  }
  if (mode === "both") ensurePortalNavigation();
}

function ensurePortalNavigation() {
  const existingLibraryNav = document.querySelector(".library-nav");
  if (existingLibraryNav && !existingLibraryNav.querySelector('[data-staff-nav="qr"]')) {
    existingLibraryNav.insertAdjacentHTML("beforeend", `
      <div class="library-nav-label">Attendance</div>
      <a class="library-nav-link" href="#staffQrCheckinCard" data-staff-nav="qr">
        <span class="library-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 12h10"></path></svg></span>
        QR Check-In
      </a>
      <a class="library-nav-link" href="#staffAttendanceCard" data-staff-nav="attendance">
        <span class="library-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></span>
        My Attendance
      </a>
    `);
    return;
  }
  if (document.querySelector(".staff-portal-sidebar")) return;
  const role = roleLabel(staffProfile?.role || "staff");
  const sidebar = document.createElement("aside");
  sidebar.className = "staff-portal-sidebar";
  sidebar.innerHTML = `
    <div class="staff-portal-brand"><span>S</span><div>Schoolix<br><small>${role} Portal</small></div></div>
    <nav class="staff-portal-nav">
      <a class="active" href="#top">Dashboard</a>
      <a href="#staffQrCheckinCard">QR Check-In</a>
      <a href="#staffAttendanceCard">My Attendance</a>
      ${staffProfile?.role === "accountant" ? '<a href="fees-report.html">Fees</a><a href="school-accounts.html">Accounts</a><a href="accountant-notices.html">Notices</a>' : ""}
      <button type="button" onclick="logout()">Logout</button>
    </nav>
  `;
  document.body.classList.add("staff-portal-sidebar-enabled");
  document.body.insertBefore(sidebar, document.body.firstElementChild);
}

async function markAttendanceFromQr(rawValue) {
  const tokenId = parseToken(rawValue);
  if (!tokenId) throw new Error("This is not a staff attendance QR.");
  if (!staffProfile?.uid || !schoolId) throw new Error("Staff profile is still loading.");

  const tokenRef = doc(db, "schools", schoolId, "staff_attendance_qr", tokenId);
  const tokenSnap = await getDoc(tokenRef);
  if (!tokenSnap.exists()) throw new Error("This QR code was not found. Ask admin to generate a fresh QR.");

  const token = tokenSnap.data();
  const role = String(staffProfile.role || "").toLowerCase();
  if (token.staffUid !== staffProfile.uid) throw new Error(`This QR belongs to another ${roleLabel(role).toLowerCase()}.`);
  if (String(token.staffRole || "").toLowerCase() !== role) throw new Error("This QR is for a different staff role.");
  if (token.active === false) throw new Error("This QR code has already been used.");
  if (Number(token.expiresAtMillis || 0) && Date.now() > Number(token.expiresAtMillis)) throw new Error("This QR has expired. Ask admin to show the latest QR.");
  if (!token.date || token.date !== todayISO()) throw new Error("This QR is not for today's attendance.");

  const actionTime = token.actionTime || token.checkInTime || "";
  const attendanceRef = doc(db, "schools", schoolId, "staff_attendance", `${staffProfile.uid}_${token.date}`);
  await setDoc(attendanceRef, {
    staffUid: staffProfile.uid,
    staffId: staffProfile.staffId || staffProfile.employeeId || token.staffId || "",
    staffName: staffProfile.name || token.staffName || roleLabel(role),
    staffEmail: staffProfile.email || token.staffEmail || "",
    staffRole: role,
    date: token.date,
    status: "Present",
    presentWeight: 1,
    checkInTime: actionTime,
    checkOutTime: "",
    notes: "Check-in marked by staff QR scan.",
    qrTokenId: tokenId,
    lastQrMode: token.qrMode || "checkin",
    updatedAt: serverTimestamp(),
    updatedBy: staffProfile.email || auth.currentUser?.email || role
  }, { merge: true });

  await setDoc(tokenRef, {
    active: false,
    scannedAt: serverTimestamp(),
    scannedBy: staffProfile.email || auth.currentUser?.email || "",
    scannedByUid: staffProfile.uid
  }, { merge: true });

  setStatus(`${token.modeLabel || "Attendance"} marked for today at ${actionTime || "admin time"}.`, "success");
  toast(`${token.modeLabel || "Attendance"} marked.`);
  await loadStaffAttendanceHistory();
}

window.loadStaffAttendanceHistory = async function() {
  const list = $("staffAttendanceList");
  if (!list || !staffProfile?.uid || !schoolId) return;
  const month = $("staffAttendanceMonth")?.value || currentMonth();
  list.innerHTML = `<div class="staff-qr-status">Loading attendance...</div>`;
  const snap = await getDocs(query(collection(db, "schools", schoolId, "staff_attendance"), where("staffUid", "==", staffProfile.uid)));
  const records = snap.docs
    .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
    .filter((record) => String(record.date || "").startsWith(`${month}-`))
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  if (!records.length) {
    list.innerHTML = `<div class="staff-qr-status">No attendance found for this month.</div>`;
    return;
  }
  list.innerHTML = records.map((record) => {
    const status = String(record.status || "Present");
    const cls = status === "Half Day" ? "half" : status === "Absent" ? "absent" : "present";
    const source = record.qrTokenId || record.scannedByUid || record.lastQrMode ? "QR" : "Manual";
    return `
      <div class="staff-attendance-row">
        <div>
          <strong>${formatDate(record.date)}</strong>
          <small>Check-In: ${record.checkInTime || "--"} | Check-Out: ${record.checkOutTime || "--"} | Source: ${source}</small>
          <small>${record.notes || ""}</small>
        </div>
        <span class="staff-attendance-badge ${cls}">${status}</span>
      </div>
    `;
  }).join("");
};

window.submitStaffQrManualCode = async function() {
  try {
    await markAttendanceFromQr($("staffQrManualCode")?.value || "");
    if ($("staffQrManualCode")) $("staffQrManualCode").value = "";
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Unable to mark attendance from QR.", "error");
    toast(error.message || "Unable to mark attendance from QR.");
  }
};

window.startStaffQrScanner = async function() {
  if (!("BarcodeDetector" in window)) {
    setStatus("Camera QR scanning is not supported in this browser. Paste the code below instead.", "error");
    return;
  }
  if (qrStream) return;
  try {
    const video = $("staffQrVideo");
    qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
    video.srcObject = qrStream;
    video.style.display = "block";
    if ($("staffQrCameraHint")) $("staffQrCameraHint").style.display = "none";
    await video.play();
    const detector = new BarcodeDetector({ formats: ["qr_code"] });
    setStatus("Scanning for QR code...", "info");
    qrTimer = window.setInterval(async () => {
      if (qrBusy || !qrStream) return;
      qrBusy = true;
      try {
        const codes = await detector.detect(video);
        if (codes.length) {
          await markAttendanceFromQr(codes[0].rawValue);
          window.stopStaffQrScanner();
        }
      } catch (error) {
        console.error(error);
        setStatus(error.message || "Unable to scan this QR.", "error");
      } finally {
        qrBusy = false;
      }
    }, 700);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Camera permission was not granted.", "error");
  }
};

window.stopStaffQrScanner = function() {
  if (qrTimer) window.clearInterval(qrTimer);
  qrTimer = null;
  qrBusy = false;
  if (qrStream) {
    qrStream.getTracks().forEach((track) => track.stop());
    qrStream = null;
  }
  const video = $("staffQrVideo");
  if (video) {
    video.pause();
    video.srcObject = null;
    video.style.display = "none";
  }
  if ($("staffQrCameraHint")) $("staffQrCameraHint").style.display = "block";
};

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  const snap = await getDoc(doc(db, "users", user.uid)).catch(() => null);
  if (!snap?.exists()) return;
  const data = snap.data();
  const role = String(data.role || "").toLowerCase();
  if (!["accountant", "librarian"].includes(role)) return;
  staffProfile = { uid: user.uid, ...data, role };
  schoolId = data.adminId || data.schoolId || "";
  ensureCard();
  setStatus(`Ready for ${roleLabel(role)} QR check-in.`);
});
