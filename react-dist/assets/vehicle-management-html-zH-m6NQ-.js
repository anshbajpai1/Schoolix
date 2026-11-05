const e={file:"vehicle-management.html",title:"Vehicle Management - Schoolix",htmlClass:"",bodyClass:"sx-admin-tool sx-transport-page",body:`\r
<div class="sx-transport-page-busy" id="transportPageBusy" aria-live="polite" aria-hidden="true">\r
  <div class="sx-transport-busy-card">\r
    <div class="sx-spinner" aria-hidden="true"></div>\r
    <strong id="transportBusyTitle">Loading transport workspace...</strong>\r
    <p class="muted" id="transportBusyText">Fetching routes, vehicles and live tracking status.</p>\r
  </div>\r
</div>\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
<div class="container">\r
    <div class="card transport-hero">\r
        <div class="transport-hero-main">\r
            <div>\r
                <span class="transport-hero-kicker">\r
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>\r
                    Transport Control Center\r
                </span>\r
                <h1>Vehicles, routes and live bus tracking</h1>\r
                <p class="muted">Manage fleet records, assign students, save routes, and monitor live GPS from one clean transport workspace.</p>\r
            </div>\r
            <div class="hero-actions">\r
                <button type="button" class="btn-primary" onclick="document.getElementById('vehicleFormCard').scrollIntoView({behavior:'smooth',block:'start'})">Add Vehicle</button>\r
                <button type="button" class="btn-secondary" onclick="document.getElementById('adminLiveMap').scrollIntoView({behavior:'smooth',block:'center'})">Open Live Map</button>\r
            </div>\r
        </div>\r
        <div class="transport-command-panel">\r
            <div>\r
                <div class="command-title">Today at a glance</div>\r
                <p class="muted">Fleet health, assignments, and route coverage update as records load.</p>\r
            </div>\r
            <div class="command-grid">\r
                <div class="command-tile"><strong id="heroActiveVehicles">0</strong><span>Active fleet</span></div>\r
                <div class="command-tile"><strong id="heroAssignedStudents">0</strong><span>Assigned students</span></div>\r
                <div class="command-tile"><strong id="heroSavedRoutes">0</strong><span>Saved routes</span></div>\r
                <div class="command-tile"><strong id="heroLiveVehicles">0</strong><span>Live vehicles</span></div>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <div class="card transport-section">\r
        <div class="section-heading">\r
            <div class="section-title-block">\r
                <span class="icon-tile" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/></svg></span>\r
                <div>\r
                    <h2>Overview</h2>\r
                    <div class="section-subtitle">Fast fleet counts for admin review.</div>\r
                </div>\r
            </div>\r
        </div>\r
        <div class="stats">\r
            <div class="stat"><span class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-3.2c.1-.7.2-1.4.2-2.1V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg></span><div><strong id="totalVehicles">0</strong><span>Total Vehicles</span></div></div>\r
            <div class="stat"><span class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></span><div><strong id="activeVehicles">0</strong><span>Active</span></div></div>\r
            <div class="stat"><span class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a6 6 0 0 1-7.9 7.9l-6.7 6.7a2.1 2.1 0 0 1-3-3l6.7-6.7a6 6 0 0 1 7.9-7.9z"/></svg></span><div><strong id="maintenanceVehicles">0</strong><span>In Maintenance</span></div></div>\r
            <div class="stat"><span class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg></span><div><strong id="inactiveVehicles">0</strong><span>Inactive</span></div></div>\r
            <div class="stat"><span class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7H8a3 3 0 0 1 0-6h10"/><circle cx="18" cy="5" r="3"/></svg></span><div><strong id="totalRoutes">0</strong><span>Saved Routes</span></div></div>\r
            <div class="stat"><span class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span><div><strong id="totalAssigned">0</strong><span>Students Assigned</span></div></div>\r
        </div>\r
    </div>\r
\r
    <div class="card transport-live-card">\r
        <div class="section-heading transport-section" style="margin-bottom:0;">\r
            <div class="section-title-block">\r
                <span class="icon-tile" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg></span>\r
                <div>\r
                    <h2>Live Tracking Map</h2>\r
                    <div class="section-subtitle">Active GPS locations appear here through Supabase Realtime and MapLibre.</div>\r
                </div>\r
            </div>\r
        </div>\r
        <div class="live-map-grid">\r
            <div class="transport-map" id="adminLiveMap">\r
              <div class="sx-map-fallback">\r
                <svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z"/><path d="M9 4v13"/><path d="M15 6.5v13"/></svg>\r
                <strong>Preparing live map…</strong>\r
                <span>Vehicle positions load as soon as an active trip streams GPS.</span>\r
              </div>\r
            </div>\r
            <div class="live-vehicle-list" id="adminLiveVehicleList">\r
                <div class="empty">Live locations will appear when active trips send GPS updates.</div>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <div class="transport-workspace">\r
    <div class="workspace-column">\r
    <div class="card transport-section" id="vehicleFormCard">\r
        <div class="section-heading">\r
            <div class="section-title-block">\r
                <span class="icon-tile" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-3.2c.1-.7.2-1.4.2-2.1V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg></span>\r
                <div>\r
                    <h2 id="formTitle">Add Vehicle</h2>\r
                    <div class="section-subtitle">Vehicle details, driver info, compliance dates, and assigned route.</div>\r
                </div>\r
            </div>\r
        </div>\r
        <form id="vehicleForm">\r
            <div class="grid">\r
                <div class="field-group">\r
                    <label class="field-label" for="vehicleNumber">Vehicle registration number</label>\r
                    <input id="vehicleNumber" placeholder="e.g. UP32AB1234" required>\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="vehicleType">Vehicle type</label>\r
                    <select id="vehicleType" required>\r
                        <option value="">Select Type</option>\r
                        <option value="Bus">Bus</option>\r
                        <option value="Van">Van</option>\r
                        <option value="Mini Bus">Mini Bus</option>\r
                        <option value="Other">Other</option>\r
                    </select>\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="vehicleModel">Model / manufacturer</label>\r
                    <input id="vehicleModel" placeholder="e.g. Tata Starbus">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="capacity">Seating capacity</label>\r
                    <input id="capacity" type="number" min="1" placeholder="Number of seats">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="driverName">Driver name</label>\r
                    <input id="driverName" placeholder="Full name">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="driverPhone">Driver phone</label>\r
                    <input id="driverPhone" placeholder="Mobile number">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="driverEmail">Driver login email</label>\r
                    <input id="driverEmail" type="email" placeholder="driver@example.com" autocomplete="username">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="driverPassword">Set driver password</label>\r
                    <input id="driverPassword" type="password" minlength="6" placeholder="Min 6 characters" autocomplete="new-password">\r
                    <span class="field-hint">Required only when creating a new driver login.</span>\r
                </div>\r
                <div class="field-group full-row">\r
                    <label class="field-label" for="vehicleRouteSelect">Assign route (optional)</label>\r
                    <span class="field-hint">Pick a saved route (From - To) or use manual name below.</span>\r
                    <select id="vehicleRouteSelect"></select>\r
                </div>\r
                <div class="field-group full-row">\r
                    <label class="field-label" for="routeName">Route name / label (manual)</label>\r
                    <span class="field-hint">Required if no saved route selected.</span>\r
                    <input id="routeName" placeholder="e.g. Route A / Morning North">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="permitExpiry">Permit valid till</label>\r
                    <input id="permitExpiry" type="date">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="insuranceExpiry">Insurance valid till</label>\r
                    <input id="insuranceExpiry" type="date">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="fitnessExpiry">Fitness certificate valid till</label>\r
                    <input id="fitnessExpiry" type="date">\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="vehicleStatus">Vehicle status</label>\r
                    <select id="vehicleStatus" required>\r
                        <option value="active">Active</option>\r
                        <option value="maintenance">Maintenance</option>\r
                        <option value="inactive">Inactive</option>\r
                    </select>\r
                </div>\r
                <div class="field-group full-row">\r
                    <label class="field-label" for="notes">Notes (optional)</label>\r
                    <textarea id="notes" rows="3" placeholder="Any extra remarks"></textarea>\r
                </div>\r
                <div class="full-row" style="display:flex; gap:10px; flex-wrap:wrap;">\r
                    <button type="submit" class="btn-primary" id="saveBtn"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>Save Vehicle</button>\r
                    <button type="button" class="btn-secondary" onclick="resetForm()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>Reset</button>\r
                </div>\r
            </div>\r
        </form>\r
    </div>\r
    </div>\r
\r
    <div class="workspace-column">\r
    <div class="card transport-section" id="routeLookupCard">\r
        <div class="section-heading">\r
            <div class="section-title-block">\r
                <span class="icon-tile" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg></span>\r
                <div>\r
                    <h2>Route lookup</h2>\r
                    <div class="section-subtitle">Find saved route details quickly.</div>\r
                </div>\r
            </div>\r
        </div>\r
        <p class="muted">Enter a saved route ID (e.g. RT123456) to load that route's details.</p>\r
        <div class="grid" style="margin-top: 12px; align-items: end;">\r
            <div class="field-group">\r
                <label class="field-label" for="routeLookupInput">Route ID</label>\r
                <input id="routeLookupInput" placeholder="e.g. RT123456" autocomplete="off">\r
            </div>\r
            <button type="button" class="btn-primary" onclick="fetchRouteById()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>Fetch route</button>\r
        </div>\r
        <div id="routeLookupResult" class="route-lookup-box">\r
            <p style="margin-bottom: 8px;"><strong>Route ID:</strong> <span class="route-id-badge" id="lookupRouteId"></span></p>\r
            <p><strong>From:</strong> <span id="lookupFrom"></span></p>\r
            <div id="lookupViaBlock" style="display: none; margin: 8px 0;">\r
                <strong>Via (bus stops in order):</strong>\r
                <ol class="via-stops-list" id="lookupViaList"></ol>\r
            </div>\r
            <p><strong>To:</strong> <span id="lookupTo"></span></p>\r
            <p><strong>Notes:</strong> <span id="lookupNotes"></span></p>\r
        </div>\r
    </div>\r
\r
    <div class="card transport-section">\r
        <div class="section-heading">\r
            <div class="section-title-block">\r
                <span class="icon-tile" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7H8a3 3 0 0 1 0-6h10"/><circle cx="18" cy="5" r="3"/></svg></span>\r
                <div>\r
                    <h2>School routes</h2>\r
                    <div class="section-subtitle">Build reusable routes and ordered via stops.</div>\r
                </div>\r
            </div>\r
        </div>\r
        <p class="muted">Save every school route with a clear start and end point.</p>\r
        <form id="routeForm">\r
            <div class="grid">\r
                <div class="field-group">\r
                    <label class="field-label" for="routeFrom">From (start point)</label>\r
                    <input id="routeFrom" placeholder="e.g. School gate / Sector 5" required>\r
                </div>\r
                <div class="field-group full-row via-section">\r
                    <label class="field-label">Via stops (optional)</label>\r
                    <span class="field-hint">Bus ya vehicle jahan-jahan rukta hai - order mein add karo.</span>\r
                    <div id="viaStopsContainer"></div>\r
                    <button type="button" class="btn-success" style="margin-top:10px;" onclick="addViaStopRow()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>Add via stop</button>\r
                </div>\r
                <div class="field-group">\r
                    <label class="field-label" for="routeTo">To (end point)</label>\r
                    <input id="routeTo" placeholder="e.g. City bus stand / Village name" required>\r
                </div>\r
                <div class="field-group full-row">\r
                    <label class="field-label" for="routeNotes">Route notes (optional)</label>\r
                    <textarea id="routeNotes" rows="2" placeholder="Optional details"></textarea>\r
                </div>\r
                <div class="full-row" style="display:flex; gap:10px; flex-wrap:wrap;">\r
                    <button type="submit" class="btn-primary"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>Save route</button>\r
                    <button type="button" class="btn-secondary" onclick="resetRouteForm()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>Clear</button>\r
                </div>\r
            </div>\r
        </form>\r
        <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 1rem;">All saved routes</h3>\r
        <div class="list" id="routeList"></div>\r
    </div>\r
    </div>\r
    </div>\r
\r
    <div class="card transport-section">\r
        <div class="section-heading">\r
            <div class="section-title-block">\r
                <span class="icon-tile" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg></span>\r
                <div>\r
                    <h2>Vehicle Records</h2>\r
                    <div class="section-subtitle">Search, edit, assign students, or remove vehicles.</div>\r
                </div>\r
            </div>\r
        </div>\r
        <div class="filters">\r
            <input id="searchInput" placeholder="Search by vehicle no, route, driver, phone">\r
            <select id="statusFilter">\r
                <option value="all">All Status</option>\r
                <option value="active">Active</option>\r
                <option value="maintenance">Maintenance</option>\r
                <option value="inactive">Inactive</option>\r
            </select>\r
            <select id="typeFilter">\r
                <option value="all">All Types</option>\r
                <option value="Bus">Bus</option>\r
                <option value="Van">Van</option>\r
                <option value="Mini Bus">Mini Bus</option>\r
                <option value="Other">Other</option>\r
            </select>\r
        </div>\r
        <div class="list" id="vehicleList"></div>\r
    </div>\r
</div>\r
\r
<!-- Assign students modal -->\r
<div class="modal-overlay" id="assignModal">\r
    <div class="modal-box" onclick="event.stopPropagation()">\r
        <div class="modal-header">\r
            <h3 id="assignModalTitle">Assign Students</h3>\r
            <p id="assignModalSub">Loading vehicle info...</p>\r
        </div>\r
        <div class="modal-body">\r
            <!-- Assigned students list -->\r
            <div class="assigned-list-section">\r
                <h4>Currently Assigned Students (<span id="assignedCount">0</span>)</h4>\r
                <div id="assignedStudentsList">\r
                    <div class="loading-msg">Loading...</div>\r
                </div>\r
            </div>\r
\r
            <div class="section-divider"></div>\r
\r
            <!-- Search to add students -->\r
            <div class="field-group" style="margin-bottom:12px;">\r
                <label class="field-label">Search & Add Student</label>\r
                <span class="field-hint">Student ka naam ya ID daalo. Sirf usi school ke students dikhenge.</span>\r
            </div>\r
            <div class="search-box">\r
                <input id="studentSearchInput" placeholder="Name ya Student ID..." autocomplete="off">\r
                <button type="button" class="btn-primary" onclick="searchStudents()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>Search</button>\r
            </div>\r
            <div id="studentSearchResults">\r
                <div class="empty" style="font-size:13px;">Student dhundho upar se - naam ya ID daalo.</div>\r
            </div>\r
        </div>\r
        <div class="modal-footer">\r
            <button type="button" class="btn-secondary" onclick="closeAssignModal()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>Close</button>\r
        </div>\r
    </div>\r
</div>\r
\r
<script src="school-branding.js"><\/script>\r
<script type="module">\r
import { initializeApp } from "./firebase-compat.js";\r
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "./firebase-compat.js";\r
import {\r
    getFirestore, doc, getDoc, collection, getDocs,\r
    addDoc, updateDoc, deleteDoc, setDoc, serverTimestamp,\r
    query, where, arrayUnion, arrayRemove\r
} from "./firebase-compat.js";\r
import { calibratedSpeedKmh, createVehicleMap, locationStatus } from "./schoolix-maplibre.js";\r
import { activeTrips, assignDriver, deactivateStudentTransport, isTransportAccessDenied, isTransportDriverReferenceMissing, isTransportSetupMissing, liveLocations, startTrip, stopTrip, subscribeTransport, upsertDriver, upsertStudentTransport, upsertVehicle } from "./schoolix-transport.js";\r
\r
const firebaseConfig = {\r
    apiKey: "@secret:GOOGLE_API_KEY",\r
    authDomain: "schoolix-48107.firebaseapp.com",\r
    projectId: "schoolix-48107",\r
    storageBucket: "schoolix-48107.firebasestorage.app",\r
    messagingSenderId: "133937954491",\r
    appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
\r
const vehicleForm   = document.getElementById("vehicleForm");\r
const routeForm     = document.getElementById("routeForm");\r
const vehicleListEl = document.getElementById("vehicleList");\r
const routeListEl   = document.getElementById("routeList");\r
const searchInput   = document.getElementById("searchInput");\r
const statusFilter  = document.getElementById("statusFilter");\r
const typeFilter    = document.getElementById("typeFilter");\r
const formTitleEl   = document.getElementById("formTitle");\r
const saveBtnEl     = document.getElementById("saveBtn");\r
const vehicleRouteSelect = document.getElementById("vehicleRouteSelect");\r
const routeLookupInput   = document.getElementById("routeLookupInput");\r
const routeLookupResult  = document.getElementById("routeLookupResult");\r
\r
let adminId = null;\r
let vehicles = [];\r
let routes = [];\r
let allStudents = [];\r
let filteredVehicles = [];\r
let editingVehicleId = null;\r
let assigningVehicleId = null;\r
let adminMap = null;\r
let liveLocationRows = [];\r
let activeTripRows = [];\r
let vehicleListLoading = true;\r
let routeListLoading = true;\r
let liveMapRefreshTimer = 0;\r
\r
window.SchoolixTransportLiveRefreshMs = 3000;\r
\r
const ICONS = {\r
    search: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>',\r
    users: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',\r
    edit: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',\r
    trash: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>',\r
    route: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7H8a3 3 0 0 1 0-6h10"/><circle cx="18" cy="5" r="3"/></svg>',\r
    bus: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-3.2c.1-.7.2-1.4.2-2.1V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg>',\r
    play: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 3 20 12 6 21 6 3"/></svg>',\r
    stop: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>'\r
};\r
\r
function escHtml(s) {\r
    if (s == null || s === "") return "";\r
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");\r
}\r
\r
function skeletonCards(count = 3) {\r
    return Array.from({ length: count }, () => \`\r
        <div class="sx-skeleton-card" aria-hidden="true">\r
            <div class="sx-skeleton-line w60"></div>\r
            <div class="sx-skeleton-line w80"></div>\r
            <div class="sx-skeleton-line"></div>\r
        </div>\r
    \`).join("");\r
}\r
\r
function setPageBusy(visible, title = "Loading transport workspace...", text = "Fetching routes, vehicles and live tracking status.") {\r
    const overlay = document.getElementById("transportPageBusy");\r
    if (!overlay) return;\r
    document.getElementById("transportBusyTitle").textContent = title;\r
    document.getElementById("transportBusyText").textContent = text;\r
    overlay.classList.toggle("is-visible", Boolean(visible));\r
    overlay.setAttribute("aria-hidden", String(!visible));\r
}\r
\r
function setButtonBusy(button, busy, label = "Working...") {\r
    if (!button) return;\r
    if (busy) {\r
        button.dataset.originalHtml = button.dataset.originalHtml || button.innerHTML;\r
        button.disabled = true;\r
        button.innerHTML = \`<span class="sx-spinner" style="width:16px;height:16px;margin:0;border-width:2px;"></span>\${escHtml(label)}\`;\r
    } else {\r
        button.disabled = false;\r
        if (button.dataset.originalHtml) {\r
            button.innerHTML = button.dataset.originalHtml;\r
            delete button.dataset.originalHtml;\r
        }\r
        if (button.id === "saveBtn" && !editingVehicleId) {\r
            button.innerHTML = saveVehicleButtonHtml("Save Vehicle");\r
        }\r
    }\r
}\r
\r
function saveVehicleButtonHtml(label = "Save Vehicle") {\r
    return \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>\${escHtml(label)}\`;\r
}\r
\r
function currentActionButton() {\r
    const active = document.activeElement;\r
    return active?.tagName === "BUTTON" ? active : null;\r
}\r
\r
function clearMapMissing(mapApi, vehicleIds = []) {\r
    if (typeof mapApi?.clearMissing === "function") {\r
        mapApi.clearMissing(vehicleIds);\r
        return;\r
    }\r
    const keep = new Set(vehicleIds.map((id) => String(id)));\r
    mapApi?.markers?.forEach?.((entry, id) => {\r
        if (!keep.has(String(id))) {\r
            entry?.marker?.remove?.();\r
            mapApi.markers.delete(id);\r
        }\r
    });\r
}\r
\r
vehicleListEl.innerHTML = skeletonCards(4);\r
routeListEl.innerHTML = skeletonCards(2);\r
document.getElementById("adminLiveVehicleList").innerHTML = skeletonCards(3);\r
\r
onAuthStateChanged(auth, async (user) => {\r
    setPageBusy(true);\r
    if (!user) { window.location.href = "#/index.html"; return; }\r
    try {\r
        const userDoc = await getDoc(doc(db, "users", user.uid));\r
        if (!userDoc.exists() || userDoc.data().role !== "admin") {\r
            alert("Access denied.");\r
            window.location.href = "#/index.html";\r
            return;\r
        }\r
        adminId = user.uid;\r
        await loadRoutes();\r
        await loadVehicles();\r
        adminMap = await createVehicleMap(document.getElementById("adminLiveMap"), { zoom: 12, recenterLabel: "Show active vehicles" });\r
        await loadAllStudents();\r
        await refreshActiveTrips();\r
        await refreshAdminLiveMap();\r
        subscribeTransport("schoolix_vehicle_live_locations", \`school_id=eq.\${adminId}\`, refreshAdminLiveMap, refreshAdminLiveMap);\r
        subscribeTransport("schoolix_transport_trips", \`school_id=eq.\${adminId}\`, refreshActiveTrips, refreshActiveTrips);\r
    } finally {\r
        setPageBusy(false);\r
    }\r
});\r
\r
/* Students cache */\r
async function loadAllStudents() {\r
    try {\r
        const snap = await getDocs(collection(db, "schools", adminId, "students"));\r
        allStudents = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
    } catch(e) { console.error("Load students failed:", e); }\r
}\r
\r
/* Assign modal */\r
window.openAssignModal = async (vehicleId) => {\r
    assigningVehicleId = vehicleId;\r
    const v = vehicles.find(x => x.id === vehicleId);\r
    if (!v) return;\r
\r
    document.getElementById("assignModalTitle").textContent =\r
        \`Assign Students - \${v.vehicleNumber}\`;\r
    document.getElementById("assignModalSub").textContent =\r
        \`\${v.vehicleType} - Driver: \${v.driverName} - Capacity: \${v.capacity} seats\`;\r
    document.getElementById("studentSearchInput").value = "";\r
    document.getElementById("studentSearchResults").innerHTML =\r
        \`<div class="empty" style="font-size:13px;">Student dhundho upar se - naam ya ID daalo.</div>\`;\r
\r
    document.getElementById("assignModal").classList.add("open");\r
    await renderAssignedStudents(v);\r
};\r
\r
window.closeAssignModal = () => {\r
    document.getElementById("assignModal").classList.remove("open");\r
    assigningVehicleId = null;\r
};\r
\r
document.getElementById("assignModal").addEventListener("click", function(e) {\r
    if (e.target === this) closeAssignModal();\r
});\r
\r
async function renderAssignedStudents(v) {\r
    const list  = document.getElementById("assignedStudentsList");\r
    const count = document.getElementById("assignedCount");\r
    const assigned = Array.isArray(v.assignedStudentIds) ? v.assignedStudentIds : [];\r
    count.textContent = assigned.length;\r
\r
    if (!assigned.length) {\r
        list.innerHTML = \`<div class="empty" style="font-size:13px;">Abhi koi student assign nahi hai.</div>\`;\r
        return;\r
    }\r
\r
    list.innerHTML = \`<div class="loading-msg">Loading assigned students...</div>\`;\r
\r
    // Get student details for assigned IDs\r
    const items = assigned.map(sid => {\r
        const s = allStudents.find(st => st.studentId === sid || st.id === sid);\r
        return s || { studentId: sid, name: "Unknown Student", class: "-", section: "" };\r
    });\r
\r
    // Get student tracking data\r
    const studentTracking = v.studentTracking || {};\r
\r
    list.innerHTML = items.map(s => {\r
        const sid = s.studentId || s.id;\r
        const tracking = studentTracking[sid] || {};\r
        \r
        return \`\r
        <div class="assigned-item" style="flex-direction:column;align-items:flex-start;gap:12px;padding:14px;">\r
            <div class="ai-info" style="width:100%;">\r
                <strong>\${escHtml(s.name)}</strong>\r
                <span>ID: \${escHtml(sid)} - Class: \${escHtml(s.class||"-")}\${s.section ? "-"+escHtml(s.section) : ""}</span>\r
            </div>\r
            <div style="width:100%;display:grid;grid-template-columns:1fr 1fr;gap:8px;">\r
                <div style="background:#ede9fe;border:1px solid #c4b5fd;border-radius:8px;padding:10px;">\r
                    <div style="font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;margin-bottom:6px;">Pickup Time</div>\r
                    <input type="time" style="width:100%;padding:6px;border:1px solid #c4b5fd;border-radius:6px;font-size:12px;" \r
                        id="pickup_\${escHtml(sid)}" value="\${tracking.pickupTime || ''}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'pickupTime', this.value)">\r
                    <div style="font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;margin:12px 0 6px;">Pickup Place</div>\r
                    <input type="text" placeholder="Enter pickup place" style="width:100%;padding:8px;border:1px solid #c4b5fd;border-radius:6px;font-size:12px;" \r
                        id="pickupPlace_\${escHtml(sid)}" value="\${escHtml(tracking.pickupPlace || '')}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'pickupPlace', this.value)">\r
                </div>\r
                <div style="background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:10px;">\r
                    <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;margin-bottom:6px;">Drop-off Time</div>\r
                    <input type="time" style="width:100%;padding:6px;border:1px solid #86efac;border-radius:6px;font-size:12px;" \r
                        id="dropoff_\${escHtml(sid)}" value="\${tracking.dropoffTime || ''}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'dropoffTime', this.value)">\r
                    <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;margin:12px 0 6px;">Drop-off Place</div>\r
                    <input type="text" placeholder="Enter drop-off place" style="width:100%;padding:8px;border:1px solid #86efac;border-radius:6px;font-size:12px;" \r
                        id="dropoffPlace_\${escHtml(sid)}" value="\${escHtml(tracking.dropoffPlace || '')}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'dropoffPlace', this.value)">\r
                </div>\r
            </div>\r
            <button type="button" class="btn-danger" style="padding:6px 12px;font-size:12px;width:100%;"\r
                onclick="removeStudentFromVehicle('\${escHtml(sid)}')">Remove Student</button>\r
        </div>\r
    \`;\r
    }).join("");\r
}\r
\r
window.searchStudents = async () => {\r
    const q = document.getElementById("studentSearchInput").value.trim().toLowerCase();\r
    const resultsEl = document.getElementById("studentSearchResults");\r
\r
    if (!q) {\r
        resultsEl.innerHTML = \`<div class="empty" style="font-size:13px;">Kuch type karo phir search karo.</div>\`;\r
        return;\r
    }\r
\r
    const v = vehicles.find(x => x.id === assigningVehicleId);\r
    const alreadyAssigned = v ? (Array.isArray(v.assignedStudentIds) ? v.assignedStudentIds : []) : [];\r
\r
    const matches = allStudents.filter(s =>\r
        (s.name || "").toLowerCase().includes(q) ||\r
        (s.studentId || "").toLowerCase().includes(q) ||\r
        (s.id || "").toLowerCase().includes(q)\r
    );\r
\r
    if (!matches.length) {\r
        resultsEl.innerHTML = \`<div class="empty" style="font-size:13px;">Koi student nahi mila "\${escHtml(q)}" ke liye.</div>\`;\r
        return;\r
    }\r
\r
    resultsEl.innerHTML = \`<div class="student-search-result">\${matches.slice(0, 10).map(s => {\r
        const sid = s.studentId || s.id;\r
        const isAssigned = alreadyAssigned.includes(sid);\r
        return \`<div class="sr-item">\r
            <div class="sr-info">\r
                <strong>\${escHtml(s.name)}</strong>\r
                <span>ID: \${escHtml(sid)} - Class: \${escHtml(s.class||"-")}\${s.section?"-"+escHtml(s.section):""} - \${escHtml(s.phone||"")}</span>\r
            </div>\r
            \${isAssigned\r
                ? \`<span class="pill active" style="margin-left:0;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>Assigned</span>\`\r
                : \`<button type="button" class="btn-teal" style="padding:6px 12px;font-size:12px;white-space:nowrap;"\r
                    onclick="assignStudentToVehicle('\${escHtml(sid)}', '\${escHtml(s.name)}')">Assign</button>\`\r
            }\r
        </div>\`;\r
    }).join("")}</div>\`;\r
};\r
\r
window.assignStudentToVehicle = async (studentId, studentName) => {\r
    if (!assigningVehicleId || !studentId) return;\r
    try {\r
        const v = vehicles.find(x => x.id === assigningVehicleId);\r
        if (!v) return;\r
        const vRef = doc(db, "schools", adminId, "vehicles", assigningVehicleId);\r
        await updateDoc(vRef, {\r
            assignedStudentIds: arrayUnion(studentId),\r
            updatedAt: serverTimestamp()\r
        });\r
        const transportSynced = await upsertStudentTransport({\r
            school_id: adminId,\r
            student_id: studentId,\r
            vehicle_id: assigningVehicleId,\r
            route_id: v.routeId || null,\r
            active: true,\r
            updated_at: new Date().toISOString()\r
        }).then(() => true).catch(error => {\r
            console.warn("Student transport sync failed", error);\r
            return false;\r
        });\r
\r
        // Also update student doc with vehicleId for easy reverse lookup\r
        const sQuery = query(collection(db, "schools", adminId, "students"),\r
            where("studentId", "==", studentId));\r
        const sSnap = await getDocs(sQuery);\r
        if (!sSnap.empty) {\r
            await updateDoc(doc(db, "schools", adminId, "students", sSnap.docs[0].id), {\r
                assignedVehicleId: assigningVehicleId\r
            });\r
        }\r
\r
        showToast(\r
            transportSynced ? \`\${studentName} assigned successfully!\` : \`\${studentName} assigned. Live tracking sync pending.\`,\r
            transportSynced ? "success" : "info"\r
        );\r
        await loadVehicles();\r
        await loadAllStudents();\r
        const updatedV = vehicles.find(x => x.id === assigningVehicleId);\r
        if (updatedV) {\r
            await renderAssignedStudents(updatedV);\r
            document.getElementById("assignedCount").textContent =\r
                (updatedV.assignedStudentIds || []).length;\r
        }\r
        // Refresh search results\r
        await searchStudents();\r
    } catch(e) {\r
        console.error(e);\r
        showToast("Assignment failed!", "error");\r
    }\r
};\r
\r
window.updateStudentTracking = async (studentId, field, value) => {\r
    if (!assigningVehicleId || !studentId) return;\r
    try {\r
        const v = vehicles.find(x => x.id === assigningVehicleId);\r
        if (!v) return;\r
        \r
        const tracking = v.studentTracking || {};\r
        if (!tracking[studentId]) tracking[studentId] = {};\r
        tracking[studentId][field] = value;\r
        \r
        const vRef = doc(db, "schools", adminId, "vehicles", assigningVehicleId);\r
        await updateDoc(vRef, {\r
            studentTracking: tracking,\r
            updatedAt: serverTimestamp()\r
        });\r
        \r
        const fieldLabels = {\r
            pickupTime: 'Pickup time',\r
            dropoffTime: 'Drop-off time',\r
            pickupPlace: 'Pickup place',\r
            dropoffPlace: 'Drop-off place'\r
        };\r
        showToast(\`\${fieldLabels[field] || 'Update'} saved!\`, "success");\r
        await loadVehicles();\r
    } catch(e) {\r
        console.error(e);\r
        showToast("Update failed!", "error");\r
    }\r
};\r
\r
window.removeStudentFromVehicle = async (studentId) => {\r
    if (!assigningVehicleId || !studentId) return;\r
    if (!confirm(\`Remove student \${studentId} from this vehicle?\`)) return;\r
    try {\r
        const v = vehicles.find(x => x.id === assigningVehicleId);\r
        if (!v) return;\r
        \r
        const tracking = v.studentTracking || {};\r
        delete tracking[studentId];\r
        \r
        const vRef = doc(db, "schools", adminId, "vehicles", assigningVehicleId);\r
        await updateDoc(vRef, {\r
            assignedStudentIds: arrayRemove(studentId),\r
            studentTracking: tracking,\r
            updatedAt: serverTimestamp()\r
        });\r
        await deactivateStudentTransport(adminId, studentId, assigningVehicleId)\r
            .catch(error => console.warn("Student transport deactivate failed", error));\r
\r
        // Remove from student doc too\r
        const sQuery = query(collection(db, "schools", adminId, "students"),\r
            where("studentId", "==", studentId));\r
        const sSnap = await getDocs(sQuery);\r
        if (!sSnap.empty) {\r
            await updateDoc(doc(db, "schools", adminId, "students", sSnap.docs[0].id), {\r
                assignedVehicleId: ""\r
            });\r
        }\r
\r
        showToast("Student removed.", "info");\r
        await loadVehicles();\r
        await loadAllStudents();\r
        const updatedV = vehicles.find(x => x.id === assigningVehicleId);\r
        if (updatedV) await renderAssignedStudents(updatedV);\r
    } catch(e) {\r
        console.error(e);\r
        showToast("Remove failed!", "error");\r
    }\r
};\r
\r
/* Toast */\r
function showToast(msg, type="info") {\r
    const t = document.createElement("div");\r
    t.className = \`sx-toast \${type}\`;\r
    t.setAttribute("role", "status");\r
    t.textContent = msg;\r
    document.body.appendChild(t);\r
    requestAnimationFrame(() => t.classList.add("is-visible"));\r
    setTimeout(() => {\r
        t.classList.remove("is-visible");\r
        setTimeout(()=>t.remove(), 220);\r
    }, 3200);\r
}\r
\r
/* Routes */\r
async function generateRouteId() {\r
    const snap = await getDocs(collection(db, "schools", adminId, "routes"));\r
    const existing = new Set();\r
    snap.forEach(d => { if (d.data().routeId) existing.add(String(d.data().routeId)); });\r
    let id = "";\r
    do { id = \`RT\${Math.floor(100000 + Math.random() * 900000)}\`; } while (existing.has(id));\r
    return id;\r
}\r
\r
function getViaStopsFromForm() {\r
    return [...document.getElementById("viaStopsContainer").querySelectorAll(".via-stop-input")]\r
        .map(el => el.value.trim()).filter(Boolean);\r
}\r
\r
window.addViaStopRow = (preset = "") => {\r
    const container = document.getElementById("viaStopsContainer");\r
    const row = document.createElement("div");\r
    row.className = "via-row";\r
    const inp = document.createElement("input");\r
    inp.type = "text"; inp.className = "via-stop-input";\r
    inp.placeholder = "Via stop - area / landmark";\r
    if (preset) inp.value = preset;\r
    const btn = document.createElement("button");\r
    btn.type = "button"; btn.className = "btn-danger"; btn.innerHTML = \`\${ICONS.trash}Remove\`;\r
    btn.addEventListener("click", () => row.remove());\r
    row.appendChild(inp); row.appendChild(btn);\r
    container.appendChild(row); inp.focus();\r
};\r
\r
function clearViaStopsForm() { document.getElementById("viaStopsContainer").innerHTML = ""; }\r
\r
routeForm.addEventListener("submit", async (e) => {\r
    e.preventDefault();\r
    const submitBtn = routeForm.querySelector('button[type="submit"]');\r
    const from = document.getElementById("routeFrom").value.trim();\r
    const to   = document.getElementById("routeTo").value.trim();\r
    const notes= document.getElementById("routeNotes").value.trim();\r
    const via  = getViaStopsFromForm();\r
    if (!from || !to) { alert("From and To are required."); return; }\r
    try {\r
        setButtonBusy(submitBtn, true, "Saving route...");\r
        const routeId = await generateRouteId();\r
        await addDoc(collection(db, "schools", adminId, "routes"), {\r
            routeId, from, to, via, notes: notes||"",\r
            createdAt: serverTimestamp(), updatedAt: serverTimestamp()\r
        });\r
        showToast(\`Route saved: \${routeId}\`, "success");\r
        routeForm.reset(); clearViaStopsForm();\r
        await loadRoutes();\r
    } catch(e) { console.error(e); alert("Failed to save route."); }\r
    finally { setButtonBusy(submitBtn, false); }\r
});\r
\r
async function loadRoutes() {\r
    try {\r
        if (routeListLoading) routeListEl.innerHTML = skeletonCards(2);\r
        const snap = await getDocs(collection(db, "schools", adminId, "routes"));\r
        routes = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
        routeListLoading = false;\r
        document.getElementById("totalRoutes").textContent = routes.length;\r
        const heroRoutes = document.getElementById("heroSavedRoutes");\r
        if (heroRoutes) heroRoutes.textContent = String(routes.length);\r
        populateRouteDropdown();\r
        renderRouteList();\r
    } catch(e) { routeListLoading = false; routeListEl.innerHTML = '<div class="empty">Failed to load routes.</div>'; }\r
}\r
\r
function populateRouteDropdown() {\r
    const current = vehicleRouteSelect.value;\r
    vehicleRouteSelect.innerHTML = '<option value="">- No saved route - use manual name below</option>';\r
    routes.forEach(r => {\r
        const via = Array.isArray(r.via) ? r.via : [];\r
        const opt = document.createElement("option");\r
        opt.value = r.routeId;\r
        opt.textContent = \`\${r.routeId}: \${r.from} - \${r.to}\${via.length?" ("+via.length+" via)":""}\`;\r
        opt.dataset.docId = r.id;\r
        vehicleRouteSelect.appendChild(opt);\r
    });\r
    if ([...vehicleRouteSelect.options].some(o => o.value === current)) vehicleRouteSelect.value = current;\r
}\r
\r
function renderRouteList() {\r
    routeListEl.innerHTML = "";\r
    if (!routes.length) { routeListEl.innerHTML = '<div class="empty">No routes saved yet.</div>'; return; }\r
    routes.forEach(r => {\r
        const row = document.createElement("div");\r
        row.className = "route-card";\r
        const via = Array.isArray(r.via) ? r.via : [];\r
        const viaBlock = via.length\r
            ? \`<br><strong>Via:</strong><ol class="via-stops-list">\${via.map(s=>\`<li>\${escHtml(s)}</li>\`).join("")}</ol>\`\r
            : "";\r
        row.innerHTML = \`\r
            <div class="meta">\r
                <strong class="route-id-badge">\${escHtml(r.routeId)}</strong>\r
                <span class="pill active" style="margin-left:8px;">\${ICONS.route}\${escHtml(r.from)} - \${escHtml(r.to)}</span>\r
                \${viaBlock}\r
                \${r.notes ? \`<br>Notes: \${escHtml(r.notes)}\` : ""}\r
            </div>\r
            <div class="action-col">\r
                <button type="button" class="btn-success" onclick="useRouteLookup('\${escHtml(r.routeId)}')">\${ICONS.search}Show details</button>\r
                <button type="button" class="btn-danger" onclick="deleteRoute('\${escHtml(r.id)}')">\${ICONS.trash}Delete</button>\r
            </div>\`;\r
        routeListEl.appendChild(row);\r
    });\r
}\r
\r
window.fetchRouteById = async () => {\r
    const raw = routeLookupInput.value.trim().toUpperCase();\r
    if (!raw) { alert("Enter a Route ID."); return; }\r
    const trigger = document.activeElement?.tagName === "BUTTON" ? document.activeElement : null;\r
    try {\r
        setButtonBusy(trigger, true, "Fetching...");\r
        const q = query(collection(db, "schools", adminId, "routes"), where("routeId", "==", raw));\r
        const snap = await getDocs(q);\r
        if (snap.empty) { routeLookupResult.classList.remove("show"); alert("No route found."); return; }\r
        const data = snap.docs[0].data();\r
        document.getElementById("lookupRouteId").textContent = data.routeId || raw;\r
        document.getElementById("lookupFrom").textContent   = data.from || "-";\r
        document.getElementById("lookupTo").textContent     = data.to || "-";\r
        document.getElementById("lookupNotes").textContent  = data.notes || "-";\r
        const via = Array.isArray(data.via) ? data.via : [];\r
        const viaBlock = document.getElementById("lookupViaBlock");\r
        const viaList  = document.getElementById("lookupViaList");\r
        viaList.innerHTML = "";\r
        if (via.length) {\r
            via.forEach(s => { const li = document.createElement("li"); li.textContent = s; viaList.appendChild(li); });\r
            viaBlock.style.display = "block";\r
        } else { viaBlock.style.display = "none"; }\r
        routeLookupResult.classList.add("show");\r
    } catch(e) { alert("Could not fetch route."); }\r
    finally { setButtonBusy(trigger, false); }\r
};\r
\r
window.useRouteLookup = (routeId) => {\r
    routeLookupInput.value = routeId; fetchRouteById();\r
    document.getElementById("routeLookupCard")?.scrollIntoView({ behavior: "smooth", block: "start" });\r
};\r
\r
window.resetRouteForm = () => { document.getElementById("routeForm").reset(); clearViaStopsForm(); };\r
\r
window.deleteRoute = async (docId) => {\r
    if (!confirm("Delete this route?")) return;\r
    try {\r
        setPageBusy(true, "Deleting route...", "Updating route list and vehicle route dropdown.");\r
        await deleteDoc(doc(db, "schools", adminId, "routes", docId));\r
        await loadRoutes(); await loadVehicles();\r
        showToast("Route deleted.", "info");\r
    } catch(e) { alert("Failed to delete."); }\r
    finally { setPageBusy(false); }\r
};\r
\r
/* Vehicles */\r
function isUuid(value = "") {\r
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || "").trim());\r
}\r
\r
function trackingVehiclePayload(vehicleId, v = {}) {\r
    return {\r
        id: vehicleId,\r
        school_id: adminId,\r
        vehicle_number: v.vehicleNumber || vehicleId,\r
        vehicle_type: v.vehicleType || "Bus",\r
        route_id: v.routeId || null,\r
        driver_id: v.driverId || null,\r
        status: v.status || "active",\r
        data: {\r
            driverName: v.driverName || "",\r
            driverPhone: v.driverPhone || "",\r
            driverEmail: v.driverEmail || "",\r
            routeName: v.routeName || "",\r
            capacity: v.capacity || 0\r
        },\r
        updated_at: new Date().toISOString()\r
    };\r
}\r
\r
async function findUserByEmail(email) {\r
    const cleanEmail = String(email || "").trim().toLowerCase();\r
    if (!cleanEmail) return null;\r
    const snap = await getDocs(query(collection(db, "users"), where("email", "==", cleanEmail)));\r
    if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
    const authSnap = await getDocs(query(collection(db, "users"), where("authEmail", "==", cleanEmail)));\r
    if (!authSnap.empty) return { id: authSnap.docs[0].id, ...authSnap.docs[0].data() };\r
    return null;\r
}\r
\r
async function ensureDriverLogin(vehicleId, payload) {\r
    const email = String(payload.driverEmail || "").trim().toLowerCase();\r
    const password = document.getElementById("driverPassword").value.trim();\r
    if (!email) return {};\r
\r
    let userProfile = await findUserByEmail(email);\r
    let authUid = String(userProfile?.authUid || userProfile?.uid || userProfile?.id || "").trim();\r
\r
    if (!userProfile) {\r
        if (!password || password.length < 6) {\r
            throw new Error("New driver login ke liye email ke saath minimum 6 character password set karo.");\r
        }\r
        const cred = await createUserWithEmailAndPassword(auth, email, password);\r
        authUid = cred.user.uid;\r
        userProfile = { id: authUid };\r
    }\r
\r
    const driverId = String(userProfile.driverId || userProfile.transportDriverId || authUid || email).trim();\r
    const userDocId = String(userProfile.id || authUid).trim();\r
    const profilePayload = {\r
        name: payload.driverName || "Driver",\r
        phone: payload.driverPhone,\r
        email,\r
        authEmail: email,\r
        role: "driver",\r
        schoolId: adminId,\r
        adminId,\r
        access: true,\r
        status: "active",\r
        assignedVehicleId: vehicleId,\r
        driverId,\r
        transportDriverId: driverId,\r
        updatedAt: serverTimestamp()\r
    };\r
\r
    if (authUid) {\r
        profilePayload.authUid = authUid;\r
        profilePayload.uid = authUid;\r
    }\r
\r
    await setDoc(doc(db, "users", userDocId), profilePayload, { merge: true });\r
\r
    const driverRow = {\r
        id: driverId,\r
        school_id: adminId,\r
        auth_uid: isUuid(authUid) ? authUid : null,\r
        name: payload.driverName || "Driver",\r
        phone: payload.driverPhone,\r
        email,\r
        assigned_vehicle_id: vehicleId,\r
        status: "active",\r
        data: {\r
            vehicleNumber: payload.vehicleNumber,\r
            userDocId,\r
            authUid\r
        },\r
        updated_at: new Date().toISOString()\r
    };\r
    const driverSynced = await upsertDriver(driverRow)\r
        .then(() => assignDriver(driverId, vehicleId, adminId))\r
        .then(() => true)\r
        .catch(error => {\r
            console.warn("Driver transport sync skipped:", error);\r
            return false;\r
        });\r
    if (!driverSynced) showToast("Driver login created. Live tracking sync pending.", "info");\r
\r
    return { driverId, driverAuthUid: authUid, driverEmail: email };\r
}\r
\r
async function safeUpsertTrackingVehicle(vehicleId, payload) {\r
    try {\r
        await upsertVehicle(trackingVehiclePayload(vehicleId, payload));\r
        return true;\r
    } catch (error) {\r
        if (isTransportDriverReferenceMissing(error) && payload?.driverId) {\r
            console.warn("Vehicle driver reference missing in transport sync; starting trip without linked driver row.", error);\r
            const withoutDriver = { ...payload, driverId: null };\r
            await upsertVehicle(trackingVehiclePayload(vehicleId, withoutDriver));\r
            return true;\r
        }\r
        throw error;\r
    }\r
}\r
\r
vehicleForm.addEventListener("submit", async (e) => {\r
    e.preventDefault();\r
    const submitBtn = document.getElementById("saveBtn");\r
    const selectedRouteId = vehicleRouteSelect.value.trim();\r
    const manualRouteName = document.getElementById("routeName").value.trim();\r
    let routeName = manualRouteName || "Unassigned route", routeFrom = "", routeTo = "", routeVia = [];\r
    if (selectedRouteId) {\r
        const r = routes.find(x => x.routeId === selectedRouteId);\r
        if (r) { routeFrom=r.from||""; routeTo=r.to||""; routeVia=Array.isArray(r.via)?r.via:[]; if (!routeName) routeName=\`\${r.from} - \${r.to}\`; }\r
    }\r
\r
    const payload = {\r
        vehicleNumber:   document.getElementById("vehicleNumber").value.trim().toUpperCase(),\r
        vehicleType:     document.getElementById("vehicleType").value,\r
        vehicleModel:    document.getElementById("vehicleModel").value.trim(),\r
        capacity:        Number(document.getElementById("capacity").value||0),\r
        driverName:      document.getElementById("driverName").value.trim(),\r
        driverPhone:     document.getElementById("driverPhone").value.trim(),\r
        driverEmail:     document.getElementById("driverEmail").value.trim().toLowerCase(),\r
        routeId: selectedRouteId||"", routeName, routeFrom, routeTo, routeVia,\r
        permitExpiry:    document.getElementById("permitExpiry").value||"",\r
        insuranceExpiry: document.getElementById("insuranceExpiry").value||"",\r
        fitnessExpiry:   document.getElementById("fitnessExpiry").value||"",\r
        status:          document.getElementById("vehicleStatus").value,\r
        notes:           document.getElementById("notes").value.trim(),\r
        updatedAt:       serverTimestamp()\r
    };\r
\r
    if (!payload.vehicleNumber || !payload.vehicleType) {\r
        alert("Vehicle number and vehicle type are required."); return;\r
    }\r
    if (payload.driverEmail && !payload.driverName) {\r
        alert("Driver login email ke saath driver name bhi daalo."); return;\r
    }\r
    const dup = vehicles.find(v => v.vehicleNumber===payload.vehicleNumber && v.id!==editingVehicleId);\r
    if (dup) { alert("Vehicle number already exists."); return; }\r
\r
    try {\r
        setButtonBusy(submitBtn, true, editingVehicleId ? "Updating..." : "Saving...");\r
        let vehicleId = editingVehicleId;\r
        if (editingVehicleId) {\r
            await updateDoc(doc(db, "schools", adminId, "vehicles", editingVehicleId), payload);\r
            showToast("Vehicle updated!", "success");\r
        } else {\r
            const vehicleRef = await addDoc(collection(db, "schools", adminId, "vehicles"), {\r
                ...payload, assignedStudentIds: [], createdAt: serverTimestamp()\r
            });\r
            vehicleId = vehicleRef.id;\r
            showToast("Vehicle added!", "success");\r
        }\r
        // A vehicle record belongs to Firestore. Live tracking is an optional
        // Supabase integration, so an unavailable migration/RLS policy must not
        // make a successfully saved vehicle look like it failed to save.
        let trackingPending = false;
        try {
            await safeUpsertTrackingVehicle(vehicleId, payload);
        } catch (error) {
            trackingPending = true;
            console.warn("Vehicle saved, but tracking sync is pending:", error);
        }

        if (payload.driverEmail) {
            try {
                const driverMeta = await ensureDriverLogin(vehicleId, payload);
                if (Object.keys(driverMeta).length) {
                    await updateDoc(doc(db, "schools", adminId, "vehicles", vehicleId), {
                        ...driverMeta,
                        updatedAt: serverTimestamp()
                    });
                    try {
                        await safeUpsertTrackingVehicle(vehicleId, { ...payload, ...driverMeta });
                    } catch (error) {
                        trackingPending = true;
                        console.warn("Vehicle saved, but driver tracking sync is pending:", error);
                    }
                    showToast("Driver login ready for phone app.", "success");
                }
            } catch (error) {
                // The vehicle is already saved. Keep the failure scoped to the
                // optional driver-login setup instead of reporting a save error.
                console.error("Driver login setup failed:", error);
                showToast(\`Vehicle saved. Driver login setup pending: \${error.message || "please try again."}\`, "info");
            }
        }
        if (trackingPending) {
            showToast("Vehicle saved. Live tracking sync pending.", "info");
        }
        resetForm(); await loadVehicles();
    } catch(e) { console.error(e); alert(e.message || "Failed to save vehicle."); }\r
    finally { setButtonBusy(submitBtn, false); }\r
});\r
\r
async function loadVehicles() {\r
    try {\r
        if (vehicleListLoading) vehicleListEl.innerHTML = skeletonCards(4);\r
        const snap = await getDocs(collection(db, "schools", adminId, "vehicles"));\r
        vehicles = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
        vehicleListLoading = false;\r
        syncVehiclesForTracking();\r
        filteredVehicles = [...vehicles];\r
        updateStats(); renderVehicles();\r
    } catch(e) { vehicleListLoading = false; vehicleListEl.innerHTML = '<div class="empty">Failed to load records.</div>'; }\r
}\r
\r
async function syncVehiclesForTracking() {\r
    Promise.all(vehicles.map(v => upsertVehicle(trackingVehiclePayload(v.id, v))\r
        .catch(error => console.warn("Vehicle tracking sync failed", v.id, error))));\r
}\r
\r
function formatLiveAge(value) {\r
    if (!value) return "-";\r
    const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));\r
    if (seconds < 60) return \`\${seconds}s ago\`;\r
    return \`\${Math.round(seconds / 60)}m ago\`;\r
}\r
\r
function queueLiveMapRefresh(repeats = 5, delay = 1800) {\r
    window.clearTimeout(liveMapRefreshTimer);\r
    const tick = async (left) => {\r
        await refreshActiveTrips();\r
        if (left > 1) liveMapRefreshTimer = window.setTimeout(() => tick(left - 1), delay);\r
    };\r
    liveMapRefreshTimer = window.setTimeout(() => tick(repeats), delay);\r
}\r
\r
async function refreshAdminLiveMap() {\r
    const activeVehicleIds = activeTripRows.map(t => t.vehicle_id).filter(Boolean);\r
    const vehicleIds = activeVehicleIds.length ? activeVehicleIds : vehicles.map(v => v.id);\r
    const activeSet = new Set(activeVehicleIds);\r
    liveLocationRows = await liveLocations(vehicleIds).catch(() => []);\r
    if (activeSet.size) liveLocationRows = liveLocationRows.filter(loc => activeSet.has(loc.vehicle_id));\r
    const byVehicle = new Map(vehicles.map(v => [v.id, v]));\r
    const list = document.getElementById("adminLiveVehicleList");\r
    if (!list) return;\r
    if (!liveLocationRows.length) {\r
        if (activeSet.size) {\r
            list.innerHTML = activeVehicleIds.map((vehicleId) => {\r
                const v = byVehicle.get(vehicleId) || {};\r
                return \`<div class="live-vehicle-item is-waiting">\r
                    <strong>\${escHtml(v.vehicleNumber || vehicleId)}</strong>\r
                    <div>Driver: \${escHtml(v.driverName || "-")}</div>\r
                    <div style="font-weight:800;color:#1d4ed8">WAITING FOR FIRST GPS PING</div>\r
                    <div>Driver app ko location permission ke saath logged in rakhein.</div>\r
                </div>\`;\r
            }).join("");\r
        } else {\r
            list.innerHTML = '<div class="empty">No live GPS updates yet. Start tracking on a vehicle and keep the driver app logged in with location permission.</div>';\r
        }\r
        const heroLive = document.getElementById("heroLiveVehicles");\r
        if (heroLive) heroLive.textContent = "0";\r
        clearMapMissing(adminMap, []);\r
        return;\r
    }\r
    const heroLive = document.getElementById("heroLiveVehicles");\r
    if (heroLive) heroLive.textContent = String(liveLocationRows.length);\r
    list.innerHTML = liveLocationRows.map(loc => {\r
        const v = byVehicle.get(loc.vehicle_id) || {};\r
        const status = locationStatus(loc.updated_at);\r
        adminMap?.setVehicle(loc.vehicle_id, loc, v.vehicleNumber || v.vehicle_number || "Vehicle", {\r
            driver: v.driverName || "",\r
            route: v.routeName || "",\r
            status\r
        });\r
        return \`<div class="live-vehicle-item">\r
            <strong>\${escHtml(v.vehicleNumber || loc.vehicle_id)}</strong>\r
            <div>Driver: \${escHtml(v.driverName || "-")}</div>\r
            <div style="font-weight:800;color:\${status === "live" ? "#16794f" : "#9a6700"}">\${escHtml(status.toUpperCase())}</div>\r
            <div>Updated: \${escHtml(formatLiveAge(loc.updated_at))}</div>\r
            <div>Speed: \${escHtml(String(Math.round(calibratedSpeedKmh(loc.speed))))} km/h</div>\r
            <div style="color:#64748b">\${escHtml(Number(loc.latitude).toFixed(5))}, \${escHtml(Number(loc.longitude).toFixed(5))}</div>\r
        </div>\`;\r
    }).join("");\r
    clearMapMissing(adminMap, liveLocationRows.map(loc => loc.vehicle_id));\r
    adminMap?.fitAll();\r
}\r
\r
async function refreshActiveTrips() {\r
    activeTripRows = await activeTrips(vehicles.map(v => v.id)).catch(() => []);\r
    renderVehicles();\r
    await refreshAdminLiveMap();\r
}\r
\r
function updateStats() {\r
    document.getElementById("totalVehicles").textContent     = vehicles.length;\r
    document.getElementById("activeVehicles").textContent    = vehicles.filter(v=>v.status==="active").length;\r
    document.getElementById("maintenanceVehicles").textContent = vehicles.filter(v=>v.status==="maintenance").length;\r
    document.getElementById("inactiveVehicles").textContent  = vehicles.filter(v=>v.status==="inactive").length;\r
    document.getElementById("totalRoutes").textContent       = routes.length;\r
    const totalAssigned = vehicles.reduce((sum,v)=>sum+(Array.isArray(v.assignedStudentIds)?v.assignedStudentIds.length:0),0);\r
    document.getElementById("totalAssigned").textContent     = totalAssigned;\r
    const heroActive = document.getElementById("heroActiveVehicles");\r
    const heroAssigned = document.getElementById("heroAssignedStudents");\r
    const heroRoutes = document.getElementById("heroSavedRoutes");\r
    if (heroActive) heroActive.textContent = String(vehicles.filter(v=>v.status==="active").length);\r
    if (heroAssigned) heroAssigned.textContent = String(totalAssigned);\r
    if (heroRoutes) heroRoutes.textContent = String(routes.length);\r
}\r
\r
function statusBadge(s) {\r
    if (s==="active")      return '<span class="pill active">ACTIVE</span>';\r
    if (s==="maintenance") return '<span class="pill maintenance">MAINTENANCE</span>';\r
    return '<span class="pill inactive">INACTIVE</span>';\r
}\r
\r
function formatVehicleRoute(v) {\r
    const idPart = v.routeId ? \`<span class="route-id-badge" style="font-size:13px;">\${escHtml(v.routeId)}</span> \` : "";\r
    if (v.routeFrom && v.routeTo) {\r
        const via = Array.isArray(v.routeVia) ? v.routeVia : [];\r
        const segs = [escHtml(v.routeFrom), ...via.map(s=>escHtml(s)), escHtml(v.routeTo)];\r
        const extra = v.routeName && v.routeName!==\`\${v.routeFrom} - \${v.routeTo}\` ? \` (\${escHtml(v.routeName)})\` : "";\r
        return \`\${idPart}\${segs.join(" - ")}\${extra}\`;\r
    }\r
    return \`\${idPart}\${escHtml(v.routeName||"-")}\`;\r
}\r
\r
function expiryWarning(dateStr) {\r
    if (!dateStr) return "";\r
    const d = new Date(dateStr);\r
    const now = new Date();\r
    const diff = Math.ceil((d - now) / (1000*60*60*24));\r
    const alertIco = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\`;\r
    if (diff < 0) return \`<span style="color:#dc2626;font-weight:700;display:inline-flex;align-items:center;">\${alertIco}Expired</span>\`;\r
    if (diff <= 30) return \`<span style="color:#d97706;font-weight:700;display:inline-flex;align-items:center;">\${alertIco}Expiring in \${diff}d</span>\`;\r
    return "";\r
}\r
\r
function renderVehicles() {\r
    vehicleListEl.innerHTML = "";\r
    if (!filteredVehicles.length) { vehicleListEl.innerHTML = '<div class="empty">No vehicles found.</div>'; return; }\r
    filteredVehicles.forEach(v => {\r
        const row = document.createElement("div");\r
        const assigned = Array.isArray(v.assignedStudentIds) ? v.assignedStudentIds.length : 0;\r
        const activeTrip = activeTripRows.find(t => t.vehicle_id === v.id);\r
        const trackingOn = Boolean(activeTrip);\r
        row.className = \`vehicle-card \${trackingOn ? "is-tracking" : ""}\`;\r
        const compliance = \`\r
            Permit: \${escHtml(v.permitExpiry||"-")} \${expiryWarning(v.permitExpiry)}\r
            &nbsp;|&nbsp; Insurance: \${escHtml(v.insuranceExpiry||"-")} \${expiryWarning(v.insuranceExpiry)}\r
            &nbsp;|&nbsp; Fitness: \${escHtml(v.fitnessExpiry||"-")} \${expiryWarning(v.fitnessExpiry)}\r
        \`;\r
        row.innerHTML = \`\r
            <div class="meta">\r
                <div class="vehicle-title">\r
                <strong>\${escHtml(v.vehicleNumber || "Vehicle")}</strong>\r
                \${statusBadge(v.status)}\r
                <span class="pill \${trackingOn ? "active" : "inactive"}">\${trackingOn ? "TRACKING ON" : "TRACKING OFF"}</span>\r
                <span class="students-count-badge">\${assigned} student\${assigned!==1?"s":""}</span>\r
                </div>\r
                <div class="vehicle-meta-grid">\r
                    <div class="vehicle-meta-box"><small>Vehicle</small><span>\${escHtml(v.vehicleType || "-")} \${v.vehicleModel ? \`- \${escHtml(v.vehicleModel)}\` : ""}</span></div>\r
                    <div class="vehicle-meta-box"><small>Capacity</small><span>\${escHtml(String(v.capacity || 0))} seats</span></div>\r
                    <div class="vehicle-meta-box"><small>Driver</small><span>\${escHtml(v.driverName || "-")} \${v.driverPhone ? \`- \${escHtml(v.driverPhone)}\` : ""}</span></div>\r
                    <div class="vehicle-meta-box"><small>Driver Login</small><span>\${escHtml(v.driverEmail || "Not set")}</span></div>\r
                    <div class="vehicle-meta-box" style="grid-column: span 2;"><small>Route</small><span>\${formatVehicleRoute(v)}</span></div>\r
                    <div class="vehicle-compliance">\${compliance}</div>\r
                    \${v.notes ? \`<div class="vehicle-meta-box" style="grid-column:1/-1;"><small>Notes</small><span>\${escHtml(v.notes)}</span></div>\` : ""}\r
                </div>\r
            </div>\r
            <div class="action-col">\r
                \${trackingOn\r
                    ? \`<button class="btn-danger" onclick="stopVehicleTracking('\${escHtml(v.id)}')">\${ICONS.stop}Stop Tracking</button>\`\r
                    : \`<button class="btn-primary" onclick="startVehicleTracking('\${escHtml(v.id)}')">\${ICONS.play}Start Tracking</button>\`}\r
                <button class="btn-purple" onclick="openAssignModal('\${escHtml(v.id)}')">\${ICONS.users}Assign Students</button>\r
                <button class="btn-success" onclick="editVehicle('\${escHtml(v.id)}')">\${ICONS.edit}Edit</button>\r
                <button class="btn-danger"  onclick="deleteVehicle('\${escHtml(v.id)}')">\${ICONS.trash}Delete</button>\r
            </div>\`;\r
        vehicleListEl.appendChild(row);\r
    });\r
}\r
\r
window.startVehicleTracking = async (vehicleId) => {\r
    const v = vehicles.find(x => x.id === vehicleId);\r
    if (!v) return;\r
    const actionButton = currentActionButton();\r
    if (!confirm(\`Start tracking for \${v.vehicleNumber || vehicleId}? Driver phone will begin sending GPS if logged in and permission is granted.\`)) return;\r
    try {\r
        setButtonBusy(actionButton, true, "Starting...");\r
        setPageBusy(true, "Starting tracking...", "Opening active trip and preparing live GPS sync.");\r
        const synced = await safeUpsertTrackingVehicle(vehicleId, v);\r
        if (!synced) {\r
            alert("Live tracking sync complete nahi ho paaya. Vehicle save karke dobara Start Tracking try karo.");\r
            return;\r
        }\r
        await startTrip(vehicleId);\r
        showToast("Tracking started. Admin map is watching for the driver's live GPS now.", "success");\r
        await refreshActiveTrips();\r
        await refreshAdminLiveMap();\r
        queueLiveMapRefresh();\r
    } catch (error) {\r
        console.error(error);\r
        if (isTransportSetupMissing(error)) {\r
            alert("Supabase transport migration apply nahi hui hai. Transport tables/RPC missing hain, isliye Start Tracking nahi chal sakta.");\r
        } else if (isTransportAccessDenied(error)) {\r
            alert("Live tracking access denied hai. Admin account se dobara login karo, phir Start Tracking try karo.");\r
        } else {\r
            alert(error.message || "Could not start tracking. Vehicle/driver sync check karke dobara try karo.");\r
        }\r
    } finally {\r
        setButtonBusy(actionButton, false);\r
        setPageBusy(false);\r
    }\r
};\r
\r
window.stopVehicleTracking = async (vehicleId) => {\r
    const v = vehicles.find(x => x.id === vehicleId);\r
    if (!v) return;\r
    const actionButton = currentActionButton();\r
    if (!confirm(\`Stop tracking for \${v.vehicleNumber || vehicleId}?\`)) return;\r
    try {\r
        setButtonBusy(actionButton, true, "Stopping...");\r
        setPageBusy(true, "Stopping tracking...", "Closing active trip for this vehicle.");\r
        await stopTrip(vehicleId);\r
        showToast("Tracking stopped.", "success");\r
        await refreshActiveTrips();\r
        await refreshAdminLiveMap();\r
    } catch (error) {\r
        console.error(error);\r
        alert(error.message || "Could not stop tracking.");\r
    } finally {\r
        setButtonBusy(actionButton, false);\r
        setPageBusy(false);\r
    }\r
};\r
\r
function applyFilters() {\r
    const q = searchInput.value.trim().toLowerCase();\r
    const s = statusFilter.value, t = typeFilter.value;\r
    filteredVehicles = vehicles.filter(v => {\r
        const viaMatch = (Array.isArray(v.routeVia)?v.routeVia:[]).some(x=>(x||"").toLowerCase().includes(q));\r
        const matchQ =\r
            (v.vehicleNumber||"").toLowerCase().includes(q) ||\r
            (v.routeName||"").toLowerCase().includes(q) ||\r
            (v.routeId||"").toLowerCase().includes(q) ||\r
            (v.routeFrom||"").toLowerCase().includes(q) ||\r
            (v.routeTo||"").toLowerCase().includes(q) || viaMatch ||\r
            (v.driverName||"").toLowerCase().includes(q) ||\r
            (v.driverPhone||"").toLowerCase().includes(q) ||\r
            (v.driverEmail||"").toLowerCase().includes(q);\r
        return matchQ && (s==="all"||v.status===s) && (t==="all"||v.vehicleType===t);\r
    });\r
    renderVehicles();\r
}\r
searchInput.addEventListener("input", applyFilters);\r
statusFilter.addEventListener("change", applyFilters);\r
typeFilter.addEventListener("change", applyFilters);\r
\r
window.editVehicle = (id) => {\r
    const v = vehicles.find(x => x.id===id); if (!v) return;\r
    editingVehicleId = id;\r
    document.getElementById("vehicleNumber").value   = v.vehicleNumber||"";\r
    document.getElementById("vehicleType").value     = v.vehicleType||"";\r
    document.getElementById("vehicleModel").value    = v.vehicleModel||"";\r
    document.getElementById("capacity").value        = v.capacity||"";\r
    document.getElementById("driverName").value      = v.driverName||"";\r
    document.getElementById("driverPhone").value     = v.driverPhone||"";\r
    document.getElementById("driverEmail").value     = v.driverEmail||"";\r
    document.getElementById("driverPassword").value  = "";\r
    populateRouteDropdown(); vehicleRouteSelect.value = v.routeId||"";\r
    document.getElementById("routeName").value       = v.routeName||"";\r
    document.getElementById("permitExpiry").value    = v.permitExpiry||"";\r
    document.getElementById("insuranceExpiry").value = v.insuranceExpiry||"";\r
    document.getElementById("fitnessExpiry").value   = v.fitnessExpiry||"";\r
    document.getElementById("vehicleStatus").value   = v.status||"active";\r
    document.getElementById("notes").value           = v.notes||"";\r
    formTitleEl.textContent = "Edit Vehicle";\r
    saveBtnEl.innerHTML     = saveVehicleButtonHtml("Update Vehicle");\r
    window.scrollTo({ top: 0, behavior: "smooth" });\r
};\r
\r
window.deleteVehicle = async (id) => {\r
    const actionButton = currentActionButton();\r
    if (!confirm("Delete this vehicle?")) return;\r
    try {\r
        setButtonBusy(actionButton, true, "Deleting...");\r
        setPageBusy(true, "Deleting vehicle...", "Removing record and refreshing transport workspace.");\r
        await deleteDoc(doc(db, "schools", adminId, "vehicles", id));\r
        if (editingVehicleId===id) resetForm();\r
        await loadVehicles();\r
        showToast("Vehicle deleted.", "info");\r
    } catch(e) { alert("Failed to delete."); }\r
    finally {\r
        setButtonBusy(actionButton, false);\r
        setPageBusy(false);\r
    }\r
};\r
\r
window.resetForm = () => {\r
    editingVehicleId = null; vehicleForm.reset();\r
    document.getElementById("driverPassword").value = "";\r
    document.getElementById("vehicleStatus").value = "active";\r
    vehicleRouteSelect.value = ""; populateRouteDropdown();\r
    formTitleEl.textContent = "Add Vehicle"; saveBtnEl.innerHTML = saveVehicleButtonHtml("Save Vehicle");\r
};\r
\r
window.logout = async () => {\r
    try { await signOut(auth); window.location.href = "#/index.html"; }\r
    catch(e) { alert("Logout failed."); }\r
};\r
\r
document.getElementById("studentSearchInput").addEventListener("keydown", e => {\r
    if (e.key === "Enter") { e.preventDefault(); searchStudents(); }\r
});\r
routeLookupInput.addEventListener("keydown", e => {\r
    if (e.key === "Enter") { e.preventDefault(); fetchRouteById(); }\r
});\r
<\/script>\r
<script type="module" src="access-control.js"><\/script>\r
  <script src="schoolix-polish.js" defer><\/script>\r
  <script src="admin-shell.js?v=navbar-20260721" defer><\/script>\r
`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`
html.sx-page-loading,
html.sx-page-loading body {
  min-height: 100%;
  background: #f8fafc !important;
}
html.sx-page-loading body::before,
html.sx-page-loading body::after {
  visibility: hidden !important;
}
html.sx-page-loading body > :not(#sxPageLoader):not(script):not(style) {
  visibility: hidden !important;
}
.sx-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147482500;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  background: #f8fafc;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.25s ease;
  overflow: hidden;
}
.sx-page-loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.sx-page-loader .dots-container {
  position: fixed;
  inset: 0;
  display: block;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: #f8fafc;
}
.sx-page-loader .dots-container::before,
.sx-page-loader .dots-container::after,
.sx-page-loader .dot {
  display: none !important;
}
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"admin-shell.css?v=navbar-20260721"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
(function () {\r
  var root = document.documentElement;\r
  root.classList.add("sx-page-loading");\r
  window.SchoolixPageLoaderEarly = window.SchoolixPageLoaderEarly || { startedAt: Date.now() };\r
\r
  function markEarlyReady(reason) {\r
    window.SchoolixPageLoaderEarly.ready = true;\r
    window.SchoolixPageLoaderEarly.reason = reason || "dom-ready";\r
    try {\r
      window.dispatchEvent(new CustomEvent("schoolix:critical-load-ready", { detail: window.SchoolixPageLoaderEarly }));\r
    } catch (_) {}\r
  }\r
\r
  function afterFirstPaint(reason) {\r
    requestAnimationFrame(function () {\r
      requestAnimationFrame(function () { markEarlyReady(reason); });\r
    });\r
  }\r
\r
  function emergencyHide() {\r
    if (window.SchoolixPageLoader || !root.classList.contains("sx-page-loading")) return;\r
    root.classList.remove("sx-page-loading");\r
    root.classList.add("sx-page-loaded");\r
    var loader = document.getElementById("sxPageLoader");\r
    if (!loader) return;\r
    loader.classList.add("is-hidden");\r
    setTimeout(function () { loader.remove(); }, 260);\r
  }\r
\r
  if (document.readyState === "loading") {\r
    document.addEventListener("DOMContentLoaded", function () { afterFirstPaint("dom-ready"); }, { once: true });\r
  } else {\r
    afterFirstPaint(document.readyState === "complete" ? "document-complete" : "dom-ready");\r
  }\r
  window.addEventListener("load", function () { markEarlyReady("window-load"); }, { once: true });\r
  setTimeout(emergencyHide, 3200);\r
}());\r
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{type:"module"},text:`\r
import { initializeApp } from "./firebase-compat.js";\r
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "./firebase-compat.js";\r
import {\r
    getFirestore, doc, getDoc, collection, getDocs,\r
    addDoc, updateDoc, deleteDoc, setDoc, serverTimestamp,\r
    query, where, arrayUnion, arrayRemove\r
} from "./firebase-compat.js";\r
import { calibratedSpeedKmh, createVehicleMap, locationStatus } from "./schoolix-maplibre.js";\r
import { activeTrips, assignDriver, deactivateStudentTransport, isTransportAccessDenied, isTransportDriverReferenceMissing, isTransportSetupMissing, liveLocations, startTrip, stopTrip, subscribeTransport, upsertDriver, upsertStudentTransport, upsertVehicle } from "./schoolix-transport.js";\r
\r
const firebaseConfig = {\r
    apiKey: "@secret:GOOGLE_API_KEY",\r
    authDomain: "schoolix-48107.firebaseapp.com",\r
    projectId: "schoolix-48107",\r
    storageBucket: "schoolix-48107.firebasestorage.app",\r
    messagingSenderId: "133937954491",\r
    appId: "1:133937954491:web:69d8064422617eb8c4339e"\r
};\r
\r
const app = initializeApp(firebaseConfig);\r
const auth = getAuth(app);\r
const db = getFirestore(app);\r
\r
const vehicleForm   = document.getElementById("vehicleForm");\r
const routeForm     = document.getElementById("routeForm");\r
const vehicleListEl = document.getElementById("vehicleList");\r
const routeListEl   = document.getElementById("routeList");\r
const searchInput   = document.getElementById("searchInput");\r
const statusFilter  = document.getElementById("statusFilter");\r
const typeFilter    = document.getElementById("typeFilter");\r
const formTitleEl   = document.getElementById("formTitle");\r
const saveBtnEl     = document.getElementById("saveBtn");\r
const vehicleRouteSelect = document.getElementById("vehicleRouteSelect");\r
const routeLookupInput   = document.getElementById("routeLookupInput");\r
const routeLookupResult  = document.getElementById("routeLookupResult");\r
\r
let adminId = null;\r
let vehicles = [];\r
let routes = [];\r
let allStudents = [];\r
let filteredVehicles = [];\r
let editingVehicleId = null;\r
let assigningVehicleId = null;\r
let adminMap = null;\r
let liveLocationRows = [];\r
let activeTripRows = [];\r
let vehicleListLoading = true;\r
let routeListLoading = true;\r
let liveMapRefreshTimer = 0;\r
\r
window.SchoolixTransportLiveRefreshMs = 3000;\r
\r
const ICONS = {\r
    search: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>',\r
    users: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',\r
    edit: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',\r
    trash: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>',\r
    route: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7H8a3 3 0 0 1 0-6h10"/><circle cx="18" cy="5" r="3"/></svg>',\r
    bus: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-3.2c.1-.7.2-1.4.2-2.1V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg>',\r
    play: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 3 20 12 6 21 6 3"/></svg>',\r
    stop: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>'\r
};\r
\r
function escHtml(s) {\r
    if (s == null || s === "") return "";\r
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");\r
}\r
\r
function skeletonCards(count = 3) {\r
    return Array.from({ length: count }, () => \`\r
        <div class="sx-skeleton-card" aria-hidden="true">\r
            <div class="sx-skeleton-line w60"></div>\r
            <div class="sx-skeleton-line w80"></div>\r
            <div class="sx-skeleton-line"></div>\r
        </div>\r
    \`).join("");\r
}\r
\r
function setPageBusy(visible, title = "Loading transport workspace...", text = "Fetching routes, vehicles and live tracking status.") {\r
    const overlay = document.getElementById("transportPageBusy");\r
    if (!overlay) return;\r
    document.getElementById("transportBusyTitle").textContent = title;\r
    document.getElementById("transportBusyText").textContent = text;\r
    overlay.classList.toggle("is-visible", Boolean(visible));\r
    overlay.setAttribute("aria-hidden", String(!visible));\r
}\r
\r
function setButtonBusy(button, busy, label = "Working...") {\r
    if (!button) return;\r
    if (busy) {\r
        button.dataset.originalHtml = button.dataset.originalHtml || button.innerHTML;\r
        button.disabled = true;\r
        button.innerHTML = \`<span class="sx-spinner" style="width:16px;height:16px;margin:0;border-width:2px;"></span>\${escHtml(label)}\`;\r
    } else {\r
        button.disabled = false;\r
        if (button.dataset.originalHtml) {\r
            button.innerHTML = button.dataset.originalHtml;\r
            delete button.dataset.originalHtml;\r
        }\r
        if (button.id === "saveBtn" && !editingVehicleId) {\r
            button.innerHTML = saveVehicleButtonHtml("Save Vehicle");\r
        }\r
    }\r
}\r
\r
function saveVehicleButtonHtml(label = "Save Vehicle") {\r
    return \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>\${escHtml(label)}\`;\r
}\r
\r
function currentActionButton() {\r
    const active = document.activeElement;\r
    return active?.tagName === "BUTTON" ? active : null;\r
}\r
\r
function clearMapMissing(mapApi, vehicleIds = []) {\r
    if (typeof mapApi?.clearMissing === "function") {\r
        mapApi.clearMissing(vehicleIds);\r
        return;\r
    }\r
    const keep = new Set(vehicleIds.map((id) => String(id)));\r
    mapApi?.markers?.forEach?.((entry, id) => {\r
        if (!keep.has(String(id))) {\r
            entry?.marker?.remove?.();\r
            mapApi.markers.delete(id);\r
        }\r
    });\r
}\r
\r
vehicleListEl.innerHTML = skeletonCards(4);\r
routeListEl.innerHTML = skeletonCards(2);\r
document.getElementById("adminLiveVehicleList").innerHTML = skeletonCards(3);\r
\r
onAuthStateChanged(auth, async (user) => {\r
    setPageBusy(true);\r
    if (!user) { window.location.href = "#/index.html"; return; }\r
    try {\r
        const userDoc = await getDoc(doc(db, "users", user.uid));\r
        if (!userDoc.exists() || userDoc.data().role !== "admin") {\r
            alert("Access denied.");\r
            window.location.href = "#/index.html";\r
            return;\r
        }\r
        adminId = user.uid;\r
        await loadRoutes();\r
        await loadVehicles();\r
        adminMap = await createVehicleMap(document.getElementById("adminLiveMap"), { zoom: 12, recenterLabel: "Show active vehicles" });\r
        await loadAllStudents();\r
        await refreshActiveTrips();\r
        await refreshAdminLiveMap();\r
        subscribeTransport("schoolix_vehicle_live_locations", \`school_id=eq.\${adminId}\`, refreshAdminLiveMap, refreshAdminLiveMap);\r
        subscribeTransport("schoolix_transport_trips", \`school_id=eq.\${adminId}\`, refreshActiveTrips, refreshActiveTrips);\r
    } finally {\r
        setPageBusy(false);\r
    }\r
});\r
\r
/* Students cache */\r
async function loadAllStudents() {\r
    try {\r
        const snap = await getDocs(collection(db, "schools", adminId, "students"));\r
        allStudents = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
    } catch(e) { console.error("Load students failed:", e); }\r
}\r
\r
/* Assign modal */\r
window.openAssignModal = async (vehicleId) => {\r
    assigningVehicleId = vehicleId;\r
    const v = vehicles.find(x => x.id === vehicleId);\r
    if (!v) return;\r
\r
    document.getElementById("assignModalTitle").textContent =\r
        \`Assign Students - \${v.vehicleNumber}\`;\r
    document.getElementById("assignModalSub").textContent =\r
        \`\${v.vehicleType} - Driver: \${v.driverName} - Capacity: \${v.capacity} seats\`;\r
    document.getElementById("studentSearchInput").value = "";\r
    document.getElementById("studentSearchResults").innerHTML =\r
        \`<div class="empty" style="font-size:13px;">Student dhundho upar se - naam ya ID daalo.</div>\`;\r
\r
    document.getElementById("assignModal").classList.add("open");\r
    await renderAssignedStudents(v);\r
};\r
\r
window.closeAssignModal = () => {\r
    document.getElementById("assignModal").classList.remove("open");\r
    assigningVehicleId = null;\r
};\r
\r
document.getElementById("assignModal").addEventListener("click", function(e) {\r
    if (e.target === this) closeAssignModal();\r
});\r
\r
async function renderAssignedStudents(v) {\r
    const list  = document.getElementById("assignedStudentsList");\r
    const count = document.getElementById("assignedCount");\r
    const assigned = Array.isArray(v.assignedStudentIds) ? v.assignedStudentIds : [];\r
    count.textContent = assigned.length;\r
\r
    if (!assigned.length) {\r
        list.innerHTML = \`<div class="empty" style="font-size:13px;">Abhi koi student assign nahi hai.</div>\`;\r
        return;\r
    }\r
\r
    list.innerHTML = \`<div class="loading-msg">Loading assigned students...</div>\`;\r
\r
    // Get student details for assigned IDs\r
    const items = assigned.map(sid => {\r
        const s = allStudents.find(st => st.studentId === sid || st.id === sid);\r
        return s || { studentId: sid, name: "Unknown Student", class: "-", section: "" };\r
    });\r
\r
    // Get student tracking data\r
    const studentTracking = v.studentTracking || {};\r
\r
    list.innerHTML = items.map(s => {\r
        const sid = s.studentId || s.id;\r
        const tracking = studentTracking[sid] || {};\r
        \r
        return \`\r
        <div class="assigned-item" style="flex-direction:column;align-items:flex-start;gap:12px;padding:14px;">\r
            <div class="ai-info" style="width:100%;">\r
                <strong>\${escHtml(s.name)}</strong>\r
                <span>ID: \${escHtml(sid)} - Class: \${escHtml(s.class||"-")}\${s.section ? "-"+escHtml(s.section) : ""}</span>\r
            </div>\r
            <div style="width:100%;display:grid;grid-template-columns:1fr 1fr;gap:8px;">\r
                <div style="background:#ede9fe;border:1px solid #c4b5fd;border-radius:8px;padding:10px;">\r
                    <div style="font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;margin-bottom:6px;">Pickup Time</div>\r
                    <input type="time" style="width:100%;padding:6px;border:1px solid #c4b5fd;border-radius:6px;font-size:12px;" \r
                        id="pickup_\${escHtml(sid)}" value="\${tracking.pickupTime || ''}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'pickupTime', this.value)">\r
                    <div style="font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;margin:12px 0 6px;">Pickup Place</div>\r
                    <input type="text" placeholder="Enter pickup place" style="width:100%;padding:8px;border:1px solid #c4b5fd;border-radius:6px;font-size:12px;" \r
                        id="pickupPlace_\${escHtml(sid)}" value="\${escHtml(tracking.pickupPlace || '')}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'pickupPlace', this.value)">\r
                </div>\r
                <div style="background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:10px;">\r
                    <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;margin-bottom:6px;">Drop-off Time</div>\r
                    <input type="time" style="width:100%;padding:6px;border:1px solid #86efac;border-radius:6px;font-size:12px;" \r
                        id="dropoff_\${escHtml(sid)}" value="\${tracking.dropoffTime || ''}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'dropoffTime', this.value)">\r
                    <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;margin:12px 0 6px;">Drop-off Place</div>\r
                    <input type="text" placeholder="Enter drop-off place" style="width:100%;padding:8px;border:1px solid #86efac;border-radius:6px;font-size:12px;" \r
                        id="dropoffPlace_\${escHtml(sid)}" value="\${escHtml(tracking.dropoffPlace || '')}" \r
                        onchange="updateStudentTracking('\${escHtml(sid)}', 'dropoffPlace', this.value)">\r
                </div>\r
            </div>\r
            <button type="button" class="btn-danger" style="padding:6px 12px;font-size:12px;width:100%;"\r
                onclick="removeStudentFromVehicle('\${escHtml(sid)}')">Remove Student</button>\r
        </div>\r
    \`;\r
    }).join("");\r
}\r
\r
window.searchStudents = async () => {\r
    const q = document.getElementById("studentSearchInput").value.trim().toLowerCase();\r
    const resultsEl = document.getElementById("studentSearchResults");\r
\r
    if (!q) {\r
        resultsEl.innerHTML = \`<div class="empty" style="font-size:13px;">Kuch type karo phir search karo.</div>\`;\r
        return;\r
    }\r
\r
    const v = vehicles.find(x => x.id === assigningVehicleId);\r
    const alreadyAssigned = v ? (Array.isArray(v.assignedStudentIds) ? v.assignedStudentIds : []) : [];\r
\r
    const matches = allStudents.filter(s =>\r
        (s.name || "").toLowerCase().includes(q) ||\r
        (s.studentId || "").toLowerCase().includes(q) ||\r
        (s.id || "").toLowerCase().includes(q)\r
    );\r
\r
    if (!matches.length) {\r
        resultsEl.innerHTML = \`<div class="empty" style="font-size:13px;">Koi student nahi mila "\${escHtml(q)}" ke liye.</div>\`;\r
        return;\r
    }\r
\r
    resultsEl.innerHTML = \`<div class="student-search-result">\${matches.slice(0, 10).map(s => {\r
        const sid = s.studentId || s.id;\r
        const isAssigned = alreadyAssigned.includes(sid);\r
        return \`<div class="sr-item">\r
            <div class="sr-info">\r
                <strong>\${escHtml(s.name)}</strong>\r
                <span>ID: \${escHtml(sid)} - Class: \${escHtml(s.class||"-")}\${s.section?"-"+escHtml(s.section):""} - \${escHtml(s.phone||"")}</span>\r
            </div>\r
            \${isAssigned\r
                ? \`<span class="pill active" style="margin-left:0;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>Assigned</span>\`\r
                : \`<button type="button" class="btn-teal" style="padding:6px 12px;font-size:12px;white-space:nowrap;"\r
                    onclick="assignStudentToVehicle('\${escHtml(sid)}', '\${escHtml(s.name)}')">Assign</button>\`\r
            }\r
        </div>\`;\r
    }).join("")}</div>\`;\r
};\r
\r
window.assignStudentToVehicle = async (studentId, studentName) => {\r
    if (!assigningVehicleId || !studentId) return;\r
    try {\r
        const v = vehicles.find(x => x.id === assigningVehicleId);\r
        if (!v) return;\r
        const vRef = doc(db, "schools", adminId, "vehicles", assigningVehicleId);\r
        await updateDoc(vRef, {\r
            assignedStudentIds: arrayUnion(studentId),\r
            updatedAt: serverTimestamp()\r
        });\r
        const transportSynced = await upsertStudentTransport({\r
            school_id: adminId,\r
            student_id: studentId,\r
            vehicle_id: assigningVehicleId,\r
            route_id: v.routeId || null,\r
            active: true,\r
            updated_at: new Date().toISOString()\r
        }).then(() => true).catch(error => {\r
            console.warn("Student transport sync failed", error);\r
            return false;\r
        });\r
\r
        // Also update student doc with vehicleId for easy reverse lookup\r
        const sQuery = query(collection(db, "schools", adminId, "students"),\r
            where("studentId", "==", studentId));\r
        const sSnap = await getDocs(sQuery);\r
        if (!sSnap.empty) {\r
            await updateDoc(doc(db, "schools", adminId, "students", sSnap.docs[0].id), {\r
                assignedVehicleId: assigningVehicleId\r
            });\r
        }\r
\r
        showToast(\r
            transportSynced ? \`\${studentName} assigned successfully!\` : \`\${studentName} assigned. Live tracking sync pending.\`,\r
            transportSynced ? "success" : "info"\r
        );\r
        await loadVehicles();\r
        await loadAllStudents();\r
        const updatedV = vehicles.find(x => x.id === assigningVehicleId);\r
        if (updatedV) {\r
            await renderAssignedStudents(updatedV);\r
            document.getElementById("assignedCount").textContent =\r
                (updatedV.assignedStudentIds || []).length;\r
        }\r
        // Refresh search results\r
        await searchStudents();\r
    } catch(e) {\r
        console.error(e);\r
        showToast("Assignment failed!", "error");\r
    }\r
};\r
\r
window.updateStudentTracking = async (studentId, field, value) => {\r
    if (!assigningVehicleId || !studentId) return;\r
    try {\r
        const v = vehicles.find(x => x.id === assigningVehicleId);\r
        if (!v) return;\r
        \r
        const tracking = v.studentTracking || {};\r
        if (!tracking[studentId]) tracking[studentId] = {};\r
        tracking[studentId][field] = value;\r
        \r
        const vRef = doc(db, "schools", adminId, "vehicles", assigningVehicleId);\r
        await updateDoc(vRef, {\r
            studentTracking: tracking,\r
            updatedAt: serverTimestamp()\r
        });\r
        \r
        const fieldLabels = {\r
            pickupTime: 'Pickup time',\r
            dropoffTime: 'Drop-off time',\r
            pickupPlace: 'Pickup place',\r
            dropoffPlace: 'Drop-off place'\r
        };\r
        showToast(\`\${fieldLabels[field] || 'Update'} saved!\`, "success");\r
        await loadVehicles();\r
    } catch(e) {\r
        console.error(e);\r
        showToast("Update failed!", "error");\r
    }\r
};\r
\r
window.removeStudentFromVehicle = async (studentId) => {\r
    if (!assigningVehicleId || !studentId) return;\r
    if (!confirm(\`Remove student \${studentId} from this vehicle?\`)) return;\r
    try {\r
        const v = vehicles.find(x => x.id === assigningVehicleId);\r
        if (!v) return;\r
        \r
        const tracking = v.studentTracking || {};\r
        delete tracking[studentId];\r
        \r
        const vRef = doc(db, "schools", adminId, "vehicles", assigningVehicleId);\r
        await updateDoc(vRef, {\r
            assignedStudentIds: arrayRemove(studentId),\r
            studentTracking: tracking,\r
            updatedAt: serverTimestamp()\r
        });\r
        await deactivateStudentTransport(adminId, studentId, assigningVehicleId)\r
            .catch(error => console.warn("Student transport deactivate failed", error));\r
\r
        // Remove from student doc too\r
        const sQuery = query(collection(db, "schools", adminId, "students"),\r
            where("studentId", "==", studentId));\r
        const sSnap = await getDocs(sQuery);\r
        if (!sSnap.empty) {\r
            await updateDoc(doc(db, "schools", adminId, "students", sSnap.docs[0].id), {\r
                assignedVehicleId: ""\r
            });\r
        }\r
\r
        showToast("Student removed.", "info");\r
        await loadVehicles();\r
        await loadAllStudents();\r
        const updatedV = vehicles.find(x => x.id === assigningVehicleId);\r
        if (updatedV) await renderAssignedStudents(updatedV);\r
    } catch(e) {\r
        console.error(e);\r
        showToast("Remove failed!", "error");\r
    }\r
};\r
\r
/* Toast */\r
function showToast(msg, type="info") {\r
    const t = document.createElement("div");\r
    t.className = \`sx-toast \${type}\`;\r
    t.setAttribute("role", "status");\r
    t.textContent = msg;\r
    document.body.appendChild(t);\r
    requestAnimationFrame(() => t.classList.add("is-visible"));\r
    setTimeout(() => {\r
        t.classList.remove("is-visible");\r
        setTimeout(()=>t.remove(), 220);\r
    }, 3200);\r
}\r
\r
/* Routes */\r
async function generateRouteId() {\r
    const snap = await getDocs(collection(db, "schools", adminId, "routes"));\r
    const existing = new Set();\r
    snap.forEach(d => { if (d.data().routeId) existing.add(String(d.data().routeId)); });\r
    let id = "";\r
    do { id = \`RT\${Math.floor(100000 + Math.random() * 900000)}\`; } while (existing.has(id));\r
    return id;\r
}\r
\r
function getViaStopsFromForm() {\r
    return [...document.getElementById("viaStopsContainer").querySelectorAll(".via-stop-input")]\r
        .map(el => el.value.trim()).filter(Boolean);\r
}\r
\r
window.addViaStopRow = (preset = "") => {\r
    const container = document.getElementById("viaStopsContainer");\r
    const row = document.createElement("div");\r
    row.className = "via-row";\r
    const inp = document.createElement("input");\r
    inp.type = "text"; inp.className = "via-stop-input";\r
    inp.placeholder = "Via stop - area / landmark";\r
    if (preset) inp.value = preset;\r
    const btn = document.createElement("button");\r
    btn.type = "button"; btn.className = "btn-danger"; btn.innerHTML = \`\${ICONS.trash}Remove\`;\r
    btn.addEventListener("click", () => row.remove());\r
    row.appendChild(inp); row.appendChild(btn);\r
    container.appendChild(row); inp.focus();\r
};\r
\r
function clearViaStopsForm() { document.getElementById("viaStopsContainer").innerHTML = ""; }\r
\r
routeForm.addEventListener("submit", async (e) => {\r
    e.preventDefault();\r
    const submitBtn = routeForm.querySelector('button[type="submit"]');\r
    const from = document.getElementById("routeFrom").value.trim();\r
    const to   = document.getElementById("routeTo").value.trim();\r
    const notes= document.getElementById("routeNotes").value.trim();\r
    const via  = getViaStopsFromForm();\r
    if (!from || !to) { alert("From and To are required."); return; }\r
    try {\r
        setButtonBusy(submitBtn, true, "Saving route...");\r
        const routeId = await generateRouteId();\r
        await addDoc(collection(db, "schools", adminId, "routes"), {\r
            routeId, from, to, via, notes: notes||"",\r
            createdAt: serverTimestamp(), updatedAt: serverTimestamp()\r
        });\r
        showToast(\`Route saved: \${routeId}\`, "success");\r
        routeForm.reset(); clearViaStopsForm();\r
        await loadRoutes();\r
    } catch(e) { console.error(e); alert("Failed to save route."); }\r
    finally { setButtonBusy(submitBtn, false); }\r
});\r
\r
async function loadRoutes() {\r
    try {\r
        if (routeListLoading) routeListEl.innerHTML = skeletonCards(2);\r
        const snap = await getDocs(collection(db, "schools", adminId, "routes"));\r
        routes = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
        routeListLoading = false;\r
        document.getElementById("totalRoutes").textContent = routes.length;\r
        const heroRoutes = document.getElementById("heroSavedRoutes");\r
        if (heroRoutes) heroRoutes.textContent = String(routes.length);\r
        populateRouteDropdown();\r
        renderRouteList();\r
    } catch(e) { routeListLoading = false; routeListEl.innerHTML = '<div class="empty">Failed to load routes.</div>'; }\r
}\r
\r
function populateRouteDropdown() {\r
    const current = vehicleRouteSelect.value;\r
    vehicleRouteSelect.innerHTML = '<option value="">- No saved route - use manual name below</option>';\r
    routes.forEach(r => {\r
        const via = Array.isArray(r.via) ? r.via : [];\r
        const opt = document.createElement("option");\r
        opt.value = r.routeId;\r
        opt.textContent = \`\${r.routeId}: \${r.from} - \${r.to}\${via.length?" ("+via.length+" via)":""}\`;\r
        opt.dataset.docId = r.id;\r
        vehicleRouteSelect.appendChild(opt);\r
    });\r
    if ([...vehicleRouteSelect.options].some(o => o.value === current)) vehicleRouteSelect.value = current;\r
}\r
\r
function renderRouteList() {\r
    routeListEl.innerHTML = "";\r
    if (!routes.length) { routeListEl.innerHTML = '<div class="empty">No routes saved yet.</div>'; return; }\r
    routes.forEach(r => {\r
        const row = document.createElement("div");\r
        row.className = "route-card";\r
        const via = Array.isArray(r.via) ? r.via : [];\r
        const viaBlock = via.length\r
            ? \`<br><strong>Via:</strong><ol class="via-stops-list">\${via.map(s=>\`<li>\${escHtml(s)}</li>\`).join("")}</ol>\`\r
            : "";\r
        row.innerHTML = \`\r
            <div class="meta">\r
                <strong class="route-id-badge">\${escHtml(r.routeId)}</strong>\r
                <span class="pill active" style="margin-left:8px;">\${ICONS.route}\${escHtml(r.from)} - \${escHtml(r.to)}</span>\r
                \${viaBlock}\r
                \${r.notes ? \`<br>Notes: \${escHtml(r.notes)}\` : ""}\r
            </div>\r
            <div class="action-col">\r
                <button type="button" class="btn-success" onclick="useRouteLookup('\${escHtml(r.routeId)}')">\${ICONS.search}Show details</button>\r
                <button type="button" class="btn-danger" onclick="deleteRoute('\${escHtml(r.id)}')">\${ICONS.trash}Delete</button>\r
            </div>\`;\r
        routeListEl.appendChild(row);\r
    });\r
}\r
\r
window.fetchRouteById = async () => {\r
    const raw = routeLookupInput.value.trim().toUpperCase();\r
    if (!raw) { alert("Enter a Route ID."); return; }\r
    const trigger = document.activeElement?.tagName === "BUTTON" ? document.activeElement : null;\r
    try {\r
        setButtonBusy(trigger, true, "Fetching...");\r
        const q = query(collection(db, "schools", adminId, "routes"), where("routeId", "==", raw));\r
        const snap = await getDocs(q);\r
        if (snap.empty) { routeLookupResult.classList.remove("show"); alert("No route found."); return; }\r
        const data = snap.docs[0].data();\r
        document.getElementById("lookupRouteId").textContent = data.routeId || raw;\r
        document.getElementById("lookupFrom").textContent   = data.from || "-";\r
        document.getElementById("lookupTo").textContent     = data.to || "-";\r
        document.getElementById("lookupNotes").textContent  = data.notes || "-";\r
        const via = Array.isArray(data.via) ? data.via : [];\r
        const viaBlock = document.getElementById("lookupViaBlock");\r
        const viaList  = document.getElementById("lookupViaList");\r
        viaList.innerHTML = "";\r
        if (via.length) {\r
            via.forEach(s => { const li = document.createElement("li"); li.textContent = s; viaList.appendChild(li); });\r
            viaBlock.style.display = "block";\r
        } else { viaBlock.style.display = "none"; }\r
        routeLookupResult.classList.add("show");\r
    } catch(e) { alert("Could not fetch route."); }\r
    finally { setButtonBusy(trigger, false); }\r
};\r
\r
window.useRouteLookup = (routeId) => {\r
    routeLookupInput.value = routeId; fetchRouteById();\r
    document.getElementById("routeLookupCard")?.scrollIntoView({ behavior: "smooth", block: "start" });\r
};\r
\r
window.resetRouteForm = () => { document.getElementById("routeForm").reset(); clearViaStopsForm(); };\r
\r
window.deleteRoute = async (docId) => {\r
    if (!confirm("Delete this route?")) return;\r
    try {\r
        setPageBusy(true, "Deleting route...", "Updating route list and vehicle route dropdown.");\r
        await deleteDoc(doc(db, "schools", adminId, "routes", docId));\r
        await loadRoutes(); await loadVehicles();\r
        showToast("Route deleted.", "info");\r
    } catch(e) { alert("Failed to delete."); }\r
    finally { setPageBusy(false); }\r
};\r
\r
/* Vehicles */\r
function isUuid(value = "") {\r
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || "").trim());\r
}\r
\r
function trackingVehiclePayload(vehicleId, v = {}) {\r
    return {\r
        id: vehicleId,\r
        school_id: adminId,\r
        vehicle_number: v.vehicleNumber || vehicleId,\r
        vehicle_type: v.vehicleType || "Bus",\r
        route_id: v.routeId || null,\r
        driver_id: v.driverId || null,\r
        status: v.status || "active",\r
        data: {\r
            driverName: v.driverName || "",\r
            driverPhone: v.driverPhone || "",\r
            driverEmail: v.driverEmail || "",\r
            routeName: v.routeName || "",\r
            capacity: v.capacity || 0\r
        },\r
        updated_at: new Date().toISOString()\r
    };\r
}\r
\r
async function findUserByEmail(email) {\r
    const cleanEmail = String(email || "").trim().toLowerCase();\r
    if (!cleanEmail) return null;\r
    const snap = await getDocs(query(collection(db, "users"), where("email", "==", cleanEmail)));\r
    if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };\r
    const authSnap = await getDocs(query(collection(db, "users"), where("authEmail", "==", cleanEmail)));\r
    if (!authSnap.empty) return { id: authSnap.docs[0].id, ...authSnap.docs[0].data() };\r
    return null;\r
}\r
\r
async function ensureDriverLogin(vehicleId, payload) {\r
    const email = String(payload.driverEmail || "").trim().toLowerCase();\r
    const password = document.getElementById("driverPassword").value.trim();\r
    if (!email) return {};\r
\r
    let userProfile = await findUserByEmail(email);\r
    let authUid = String(userProfile?.authUid || userProfile?.uid || userProfile?.id || "").trim();\r
\r
    if (!userProfile) {\r
        if (!password || password.length < 6) {\r
            throw new Error("New driver login ke liye email ke saath minimum 6 character password set karo.");\r
        }\r
        const cred = await createUserWithEmailAndPassword(auth, email, password);\r
        authUid = cred.user.uid;\r
        userProfile = { id: authUid };\r
    }\r
\r
    const driverId = String(userProfile.driverId || userProfile.transportDriverId || authUid || email).trim();\r
    const userDocId = String(userProfile.id || authUid).trim();\r
    const profilePayload = {\r
        name: payload.driverName || "Driver",\r
        phone: payload.driverPhone,\r
        email,\r
        authEmail: email,\r
        role: "driver",\r
        schoolId: adminId,\r
        adminId,\r
        access: true,\r
        status: "active",\r
        assignedVehicleId: vehicleId,\r
        driverId,\r
        transportDriverId: driverId,\r
        updatedAt: serverTimestamp()\r
    };\r
\r
    if (authUid) {\r
        profilePayload.authUid = authUid;\r
        profilePayload.uid = authUid;\r
    }\r
\r
    await setDoc(doc(db, "users", userDocId), profilePayload, { merge: true });\r
\r
    const driverRow = {\r
        id: driverId,\r
        school_id: adminId,\r
        auth_uid: isUuid(authUid) ? authUid : null,\r
        name: payload.driverName || "Driver",\r
        phone: payload.driverPhone,\r
        email,\r
        assigned_vehicle_id: vehicleId,\r
        status: "active",\r
        data: {\r
            vehicleNumber: payload.vehicleNumber,\r
            userDocId,\r
            authUid\r
        },\r
        updated_at: new Date().toISOString()\r
    };\r
    const driverSynced = await upsertDriver(driverRow)\r
        .then(() => assignDriver(driverId, vehicleId, adminId))\r
        .then(() => true)\r
        .catch(error => {\r
            console.warn("Driver transport sync skipped:", error);\r
            return false;\r
        });\r
    if (!driverSynced) showToast("Driver login created. Live tracking sync pending.", "info");\r
\r
    return { driverId, driverAuthUid: authUid, driverEmail: email };\r
}\r
\r
async function safeUpsertTrackingVehicle(vehicleId, payload) {\r
    try {\r
        await upsertVehicle(trackingVehiclePayload(vehicleId, payload));\r
        return true;\r
    } catch (error) {\r
        if (isTransportDriverReferenceMissing(error) && payload?.driverId) {\r
            console.warn("Vehicle driver reference missing in transport sync; starting trip without linked driver row.", error);\r
            const withoutDriver = { ...payload, driverId: null };\r
            await upsertVehicle(trackingVehiclePayload(vehicleId, withoutDriver));\r
            return true;\r
        }\r
        throw error;\r
    }\r
}\r
\r
vehicleForm.addEventListener("submit", async (e) => {\r
    e.preventDefault();\r
    const submitBtn = document.getElementById("saveBtn");\r
    const selectedRouteId = vehicleRouteSelect.value.trim();\r
    const manualRouteName = document.getElementById("routeName").value.trim();\r
    let routeName = manualRouteName || "Unassigned route", routeFrom = "", routeTo = "", routeVia = [];\r
    if (selectedRouteId) {\r
        const r = routes.find(x => x.routeId === selectedRouteId);\r
        if (r) { routeFrom=r.from||""; routeTo=r.to||""; routeVia=Array.isArray(r.via)?r.via:[]; if (!routeName) routeName=\`\${r.from} - \${r.to}\`; }\r
    }\r
\r
    const payload = {\r
        vehicleNumber:   document.getElementById("vehicleNumber").value.trim().toUpperCase(),\r
        vehicleType:     document.getElementById("vehicleType").value,\r
        vehicleModel:    document.getElementById("vehicleModel").value.trim(),\r
        capacity:        Number(document.getElementById("capacity").value||0),\r
        driverName:      document.getElementById("driverName").value.trim(),\r
        driverPhone:     document.getElementById("driverPhone").value.trim(),\r
        driverEmail:     document.getElementById("driverEmail").value.trim().toLowerCase(),\r
        routeId: selectedRouteId||"", routeName, routeFrom, routeTo, routeVia,\r
        permitExpiry:    document.getElementById("permitExpiry").value||"",\r
        insuranceExpiry: document.getElementById("insuranceExpiry").value||"",\r
        fitnessExpiry:   document.getElementById("fitnessExpiry").value||"",\r
        status:          document.getElementById("vehicleStatus").value,\r
        notes:           document.getElementById("notes").value.trim(),\r
        updatedAt:       serverTimestamp()\r
    };\r
\r
    if (!payload.vehicleNumber || !payload.vehicleType) {\r
        alert("Vehicle number and vehicle type are required."); return;\r
    }\r
    if (payload.driverEmail && !payload.driverName) {\r
        alert("Driver login email ke saath driver name bhi daalo."); return;\r
    }\r
    const dup = vehicles.find(v => v.vehicleNumber===payload.vehicleNumber && v.id!==editingVehicleId);\r
    if (dup) { alert("Vehicle number already exists."); return; }\r
\r
    try {\r
        setButtonBusy(submitBtn, true, editingVehicleId ? "Updating..." : "Saving...");\r
        let vehicleId = editingVehicleId;\r
        if (editingVehicleId) {\r
            await updateDoc(doc(db, "schools", adminId, "vehicles", editingVehicleId), payload);\r
            showToast("Vehicle updated!", "success");\r
        } else {\r
            const vehicleRef = await addDoc(collection(db, "schools", adminId, "vehicles"), {\r
                ...payload, assignedStudentIds: [], createdAt: serverTimestamp()\r
            });\r
            vehicleId = vehicleRef.id;\r
            showToast("Vehicle added!", "success");\r
        }\r
        // A vehicle record belongs to Firestore. Live tracking is an optional
        // Supabase integration, so an unavailable migration/RLS policy must not
        // make a successfully saved vehicle look like it failed to save.
        let trackingPending = false;
        try {
            await safeUpsertTrackingVehicle(vehicleId, payload);
        } catch (error) {
            trackingPending = true;
            console.warn("Vehicle saved, but tracking sync is pending:", error);
        }

        if (payload.driverEmail) {
            try {
                const driverMeta = await ensureDriverLogin(vehicleId, payload);
                if (Object.keys(driverMeta).length) {
                    await updateDoc(doc(db, "schools", adminId, "vehicles", vehicleId), {
                        ...driverMeta,
                        updatedAt: serverTimestamp()
                    });
                    try {
                        await safeUpsertTrackingVehicle(vehicleId, { ...payload, ...driverMeta });
                    } catch (error) {
                        trackingPending = true;
                        console.warn("Vehicle saved, but driver tracking sync is pending:", error);
                    }
                    showToast("Driver login ready for phone app.", "success");
                }
            } catch (error) {
                // The vehicle is already saved. Keep the failure scoped to the
                // optional driver-login setup instead of reporting a save error.
                console.error("Driver login setup failed:", error);
                showToast(\`Vehicle saved. Driver login setup pending: \${error.message || "please try again."}\`, "info");
            }
        }
        if (trackingPending) {
            showToast("Vehicle saved. Live tracking sync pending.", "info");
        }
        resetForm(); await loadVehicles();
    } catch(e) { console.error(e); alert(e.message || "Failed to save vehicle."); }\r
    finally { setButtonBusy(submitBtn, false); }\r
});\r
\r
async function loadVehicles() {\r
    try {\r
        if (vehicleListLoading) vehicleListEl.innerHTML = skeletonCards(4);\r
        const snap = await getDocs(collection(db, "schools", adminId, "vehicles"));\r
        vehicles = snap.docs.map(d => ({ id: d.id, ...d.data() }));\r
        vehicleListLoading = false;\r
        syncVehiclesForTracking();\r
        filteredVehicles = [...vehicles];\r
        updateStats(); renderVehicles();\r
    } catch(e) { vehicleListLoading = false; vehicleListEl.innerHTML = '<div class="empty">Failed to load records.</div>'; }\r
}\r
\r
async function syncVehiclesForTracking() {\r
    Promise.all(vehicles.map(v => upsertVehicle(trackingVehiclePayload(v.id, v))\r
        .catch(error => console.warn("Vehicle tracking sync failed", v.id, error))));\r
}\r
\r
function formatLiveAge(value) {\r
    if (!value) return "-";\r
    const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));\r
    if (seconds < 60) return \`\${seconds}s ago\`;\r
    return \`\${Math.round(seconds / 60)}m ago\`;\r
}\r
\r
function queueLiveMapRefresh(repeats = 5, delay = 1800) {\r
    window.clearTimeout(liveMapRefreshTimer);\r
    const tick = async (left) => {\r
        await refreshActiveTrips();\r
        if (left > 1) liveMapRefreshTimer = window.setTimeout(() => tick(left - 1), delay);\r
    };\r
    liveMapRefreshTimer = window.setTimeout(() => tick(repeats), delay);\r
}\r
\r
async function refreshAdminLiveMap() {\r
    const activeVehicleIds = activeTripRows.map(t => t.vehicle_id).filter(Boolean);\r
    const vehicleIds = activeVehicleIds.length ? activeVehicleIds : vehicles.map(v => v.id);\r
    const activeSet = new Set(activeVehicleIds);\r
    liveLocationRows = await liveLocations(vehicleIds).catch(() => []);\r
    if (activeSet.size) liveLocationRows = liveLocationRows.filter(loc => activeSet.has(loc.vehicle_id));\r
    const byVehicle = new Map(vehicles.map(v => [v.id, v]));\r
    const list = document.getElementById("adminLiveVehicleList");\r
    if (!list) return;\r
    if (!liveLocationRows.length) {\r
        if (activeSet.size) {\r
            list.innerHTML = activeVehicleIds.map((vehicleId) => {\r
                const v = byVehicle.get(vehicleId) || {};\r
                return \`<div class="live-vehicle-item is-waiting">\r
                    <strong>\${escHtml(v.vehicleNumber || vehicleId)}</strong>\r
                    <div>Driver: \${escHtml(v.driverName || "-")}</div>\r
                    <div style="font-weight:800;color:#1d4ed8">WAITING FOR FIRST GPS PING</div>\r
                    <div>Driver app ko location permission ke saath logged in rakhein.</div>\r
                </div>\`;\r
            }).join("");\r
        } else {\r
            list.innerHTML = '<div class="empty">No live GPS updates yet. Start tracking on a vehicle and keep the driver app logged in with location permission.</div>';\r
        }\r
        const heroLive = document.getElementById("heroLiveVehicles");\r
        if (heroLive) heroLive.textContent = "0";\r
        clearMapMissing(adminMap, []);\r
        return;\r
    }\r
    const heroLive = document.getElementById("heroLiveVehicles");\r
    if (heroLive) heroLive.textContent = String(liveLocationRows.length);\r
    list.innerHTML = liveLocationRows.map(loc => {\r
        const v = byVehicle.get(loc.vehicle_id) || {};\r
        const status = locationStatus(loc.updated_at);\r
        adminMap?.setVehicle(loc.vehicle_id, loc, v.vehicleNumber || v.vehicle_number || "Vehicle", {\r
            driver: v.driverName || "",\r
            route: v.routeName || "",\r
            status\r
        });\r
        return \`<div class="live-vehicle-item">\r
            <strong>\${escHtml(v.vehicleNumber || loc.vehicle_id)}</strong>\r
            <div>Driver: \${escHtml(v.driverName || "-")}</div>\r
            <div style="font-weight:800;color:\${status === "live" ? "#16794f" : "#9a6700"}">\${escHtml(status.toUpperCase())}</div>\r
            <div>Updated: \${escHtml(formatLiveAge(loc.updated_at))}</div>\r
            <div>Speed: \${escHtml(String(Math.round(calibratedSpeedKmh(loc.speed))))} km/h</div>\r
            <div style="color:#64748b">\${escHtml(Number(loc.latitude).toFixed(5))}, \${escHtml(Number(loc.longitude).toFixed(5))}</div>\r
        </div>\`;\r
    }).join("");\r
    clearMapMissing(adminMap, liveLocationRows.map(loc => loc.vehicle_id));\r
    adminMap?.fitAll();\r
}\r
\r
async function refreshActiveTrips() {\r
    activeTripRows = await activeTrips(vehicles.map(v => v.id)).catch(() => []);\r
    renderVehicles();\r
    await refreshAdminLiveMap();\r
}\r
\r
function updateStats() {\r
    document.getElementById("totalVehicles").textContent     = vehicles.length;\r
    document.getElementById("activeVehicles").textContent    = vehicles.filter(v=>v.status==="active").length;\r
    document.getElementById("maintenanceVehicles").textContent = vehicles.filter(v=>v.status==="maintenance").length;\r
    document.getElementById("inactiveVehicles").textContent  = vehicles.filter(v=>v.status==="inactive").length;\r
    document.getElementById("totalRoutes").textContent       = routes.length;\r
    const totalAssigned = vehicles.reduce((sum,v)=>sum+(Array.isArray(v.assignedStudentIds)?v.assignedStudentIds.length:0),0);\r
    document.getElementById("totalAssigned").textContent     = totalAssigned;\r
    const heroActive = document.getElementById("heroActiveVehicles");\r
    const heroAssigned = document.getElementById("heroAssignedStudents");\r
    const heroRoutes = document.getElementById("heroSavedRoutes");\r
    if (heroActive) heroActive.textContent = String(vehicles.filter(v=>v.status==="active").length);\r
    if (heroAssigned) heroAssigned.textContent = String(totalAssigned);\r
    if (heroRoutes) heroRoutes.textContent = String(routes.length);\r
}\r
\r
function statusBadge(s) {\r
    if (s==="active")      return '<span class="pill active">ACTIVE</span>';\r
    if (s==="maintenance") return '<span class="pill maintenance">MAINTENANCE</span>';\r
    return '<span class="pill inactive">INACTIVE</span>';\r
}\r
\r
function formatVehicleRoute(v) {\r
    const idPart = v.routeId ? \`<span class="route-id-badge" style="font-size:13px;">\${escHtml(v.routeId)}</span> \` : "";\r
    if (v.routeFrom && v.routeTo) {\r
        const via = Array.isArray(v.routeVia) ? v.routeVia : [];\r
        const segs = [escHtml(v.routeFrom), ...via.map(s=>escHtml(s)), escHtml(v.routeTo)];\r
        const extra = v.routeName && v.routeName!==\`\${v.routeFrom} - \${v.routeTo}\` ? \` (\${escHtml(v.routeName)})\` : "";\r
        return \`\${idPart}\${segs.join(" - ")}\${extra}\`;\r
    }\r
    return \`\${idPart}\${escHtml(v.routeName||"-")}\`;\r
}\r
\r
function expiryWarning(dateStr) {\r
    if (!dateStr) return "";\r
    const d = new Date(dateStr);\r
    const now = new Date();\r
    const diff = Math.ceil((d - now) / (1000*60*60*24));\r
    const alertIco = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\`;\r
    if (diff < 0) return \`<span style="color:#dc2626;font-weight:700;display:inline-flex;align-items:center;">\${alertIco}Expired</span>\`;\r
    if (diff <= 30) return \`<span style="color:#d97706;font-weight:700;display:inline-flex;align-items:center;">\${alertIco}Expiring in \${diff}d</span>\`;\r
    return "";\r
}\r
\r
function renderVehicles() {\r
    vehicleListEl.innerHTML = "";\r
    if (!filteredVehicles.length) { vehicleListEl.innerHTML = '<div class="empty">No vehicles found.</div>'; return; }\r
    filteredVehicles.forEach(v => {\r
        const row = document.createElement("div");\r
        const assigned = Array.isArray(v.assignedStudentIds) ? v.assignedStudentIds.length : 0;\r
        const activeTrip = activeTripRows.find(t => t.vehicle_id === v.id);\r
        const trackingOn = Boolean(activeTrip);\r
        row.className = \`vehicle-card \${trackingOn ? "is-tracking" : ""}\`;\r
        const compliance = \`\r
            Permit: \${escHtml(v.permitExpiry||"-")} \${expiryWarning(v.permitExpiry)}\r
            &nbsp;|&nbsp; Insurance: \${escHtml(v.insuranceExpiry||"-")} \${expiryWarning(v.insuranceExpiry)}\r
            &nbsp;|&nbsp; Fitness: \${escHtml(v.fitnessExpiry||"-")} \${expiryWarning(v.fitnessExpiry)}\r
        \`;\r
        row.innerHTML = \`\r
            <div class="meta">\r
                <div class="vehicle-title">\r
                <strong>\${escHtml(v.vehicleNumber || "Vehicle")}</strong>\r
                \${statusBadge(v.status)}\r
                <span class="pill \${trackingOn ? "active" : "inactive"}">\${trackingOn ? "TRACKING ON" : "TRACKING OFF"}</span>\r
                <span class="students-count-badge">\${assigned} student\${assigned!==1?"s":""}</span>\r
                </div>\r
                <div class="vehicle-meta-grid">\r
                    <div class="vehicle-meta-box"><small>Vehicle</small><span>\${escHtml(v.vehicleType || "-")} \${v.vehicleModel ? \`- \${escHtml(v.vehicleModel)}\` : ""}</span></div>\r
                    <div class="vehicle-meta-box"><small>Capacity</small><span>\${escHtml(String(v.capacity || 0))} seats</span></div>\r
                    <div class="vehicle-meta-box"><small>Driver</small><span>\${escHtml(v.driverName || "-")} \${v.driverPhone ? \`- \${escHtml(v.driverPhone)}\` : ""}</span></div>\r
                    <div class="vehicle-meta-box"><small>Driver Login</small><span>\${escHtml(v.driverEmail || "Not set")}</span></div>\r
                    <div class="vehicle-meta-box" style="grid-column: span 2;"><small>Route</small><span>\${formatVehicleRoute(v)}</span></div>\r
                    <div class="vehicle-compliance">\${compliance}</div>\r
                    \${v.notes ? \`<div class="vehicle-meta-box" style="grid-column:1/-1;"><small>Notes</small><span>\${escHtml(v.notes)}</span></div>\` : ""}\r
                </div>\r
            </div>\r
            <div class="action-col">\r
                \${trackingOn\r
                    ? \`<button class="btn-danger" onclick="stopVehicleTracking('\${escHtml(v.id)}')">\${ICONS.stop}Stop Tracking</button>\`\r
                    : \`<button class="btn-primary" onclick="startVehicleTracking('\${escHtml(v.id)}')">\${ICONS.play}Start Tracking</button>\`}\r
                <button class="btn-purple" onclick="openAssignModal('\${escHtml(v.id)}')">\${ICONS.users}Assign Students</button>\r
                <button class="btn-success" onclick="editVehicle('\${escHtml(v.id)}')">\${ICONS.edit}Edit</button>\r
                <button class="btn-danger"  onclick="deleteVehicle('\${escHtml(v.id)}')">\${ICONS.trash}Delete</button>\r
            </div>\`;\r
        vehicleListEl.appendChild(row);\r
    });\r
}\r
\r
window.startVehicleTracking = async (vehicleId) => {\r
    const v = vehicles.find(x => x.id === vehicleId);\r
    if (!v) return;\r
    const actionButton = currentActionButton();\r
    if (!confirm(\`Start tracking for \${v.vehicleNumber || vehicleId}? Driver phone will begin sending GPS if logged in and permission is granted.\`)) return;\r
    try {\r
        setButtonBusy(actionButton, true, "Starting...");\r
        setPageBusy(true, "Starting tracking...", "Opening active trip and preparing live GPS sync.");\r
        const synced = await safeUpsertTrackingVehicle(vehicleId, v);\r
        if (!synced) {\r
            alert("Live tracking sync complete nahi ho paaya. Vehicle save karke dobara Start Tracking try karo.");\r
            return;\r
        }\r
        await startTrip(vehicleId);\r
        showToast("Tracking started. Admin map is watching for the driver's live GPS now.", "success");\r
        await refreshActiveTrips();\r
        await refreshAdminLiveMap();\r
        queueLiveMapRefresh();\r
    } catch (error) {\r
        console.error(error);\r
        if (isTransportSetupMissing(error)) {\r
            alert("Supabase transport migration apply nahi hui hai. Transport tables/RPC missing hain, isliye Start Tracking nahi chal sakta.");\r
        } else if (isTransportAccessDenied(error)) {\r
            alert("Live tracking access denied hai. Admin account se dobara login karo, phir Start Tracking try karo.");\r
        } else {\r
            alert(error.message || "Could not start tracking. Vehicle/driver sync check karke dobara try karo.");\r
        }\r
    } finally {\r
        setButtonBusy(actionButton, false);\r
        setPageBusy(false);\r
    }\r
};\r
\r
window.stopVehicleTracking = async (vehicleId) => {\r
    const v = vehicles.find(x => x.id === vehicleId);\r
    if (!v) return;\r
    const actionButton = currentActionButton();\r
    if (!confirm(\`Stop tracking for \${v.vehicleNumber || vehicleId}?\`)) return;\r
    try {\r
        setButtonBusy(actionButton, true, "Stopping...");\r
        setPageBusy(true, "Stopping tracking...", "Closing active trip for this vehicle.");\r
        await stopTrip(vehicleId);\r
        showToast("Tracking stopped.", "success");\r
        await refreshActiveTrips();\r
        await refreshAdminLiveMap();\r
    } catch (error) {\r
        console.error(error);\r
        alert(error.message || "Could not stop tracking.");\r
    } finally {\r
        setButtonBusy(actionButton, false);\r
        setPageBusy(false);\r
    }\r
};\r
\r
function applyFilters() {\r
    const q = searchInput.value.trim().toLowerCase();\r
    const s = statusFilter.value, t = typeFilter.value;\r
    filteredVehicles = vehicles.filter(v => {\r
        const viaMatch = (Array.isArray(v.routeVia)?v.routeVia:[]).some(x=>(x||"").toLowerCase().includes(q));\r
        const matchQ =\r
            (v.vehicleNumber||"").toLowerCase().includes(q) ||\r
            (v.routeName||"").toLowerCase().includes(q) ||\r
            (v.routeId||"").toLowerCase().includes(q) ||\r
            (v.routeFrom||"").toLowerCase().includes(q) ||\r
            (v.routeTo||"").toLowerCase().includes(q) || viaMatch ||\r
            (v.driverName||"").toLowerCase().includes(q) ||\r
            (v.driverPhone||"").toLowerCase().includes(q) ||\r
            (v.driverEmail||"").toLowerCase().includes(q);\r
        return matchQ && (s==="all"||v.status===s) && (t==="all"||v.vehicleType===t);\r
    });\r
    renderVehicles();\r
}\r
searchInput.addEventListener("input", applyFilters);\r
statusFilter.addEventListener("change", applyFilters);\r
typeFilter.addEventListener("change", applyFilters);\r
\r
window.editVehicle = (id) => {\r
    const v = vehicles.find(x => x.id===id); if (!v) return;\r
    editingVehicleId = id;\r
    document.getElementById("vehicleNumber").value   = v.vehicleNumber||"";\r
    document.getElementById("vehicleType").value     = v.vehicleType||"";\r
    document.getElementById("vehicleModel").value    = v.vehicleModel||"";\r
    document.getElementById("capacity").value        = v.capacity||"";\r
    document.getElementById("driverName").value      = v.driverName||"";\r
    document.getElementById("driverPhone").value     = v.driverPhone||"";\r
    document.getElementById("driverEmail").value     = v.driverEmail||"";\r
    document.getElementById("driverPassword").value  = "";\r
    populateRouteDropdown(); vehicleRouteSelect.value = v.routeId||"";\r
    document.getElementById("routeName").value       = v.routeName||"";\r
    document.getElementById("permitExpiry").value    = v.permitExpiry||"";\r
    document.getElementById("insuranceExpiry").value = v.insuranceExpiry||"";\r
    document.getElementById("fitnessExpiry").value   = v.fitnessExpiry||"";\r
    document.getElementById("vehicleStatus").value   = v.status||"active";\r
    document.getElementById("notes").value           = v.notes||"";\r
    formTitleEl.textContent = "Edit Vehicle";\r
    saveBtnEl.innerHTML     = saveVehicleButtonHtml("Update Vehicle");\r
    window.scrollTo({ top: 0, behavior: "smooth" });\r
};\r
\r
window.deleteVehicle = async (id) => {\r
    const actionButton = currentActionButton();\r
    if (!confirm("Delete this vehicle?")) return;\r
    try {\r
        setButtonBusy(actionButton, true, "Deleting...");\r
        setPageBusy(true, "Deleting vehicle...", "Removing record and refreshing transport workspace.");\r
        await deleteDoc(doc(db, "schools", adminId, "vehicles", id));\r
        if (editingVehicleId===id) resetForm();\r
        await loadVehicles();\r
        showToast("Vehicle deleted.", "info");\r
    } catch(e) { alert("Failed to delete."); }\r
    finally {\r
        setButtonBusy(actionButton, false);\r
        setPageBusy(false);\r
    }\r
};\r
\r
window.resetForm = () => {\r
    editingVehicleId = null; vehicleForm.reset();\r
    document.getElementById("driverPassword").value = "";\r
    document.getElementById("vehicleStatus").value = "active";\r
    vehicleRouteSelect.value = ""; populateRouteDropdown();\r
    formTitleEl.textContent = "Add Vehicle"; saveBtnEl.innerHTML = saveVehicleButtonHtml("Save Vehicle");\r
};\r
\r
window.logout = async () => {\r
    try { await signOut(auth); window.location.href = "#/index.html"; }\r
    catch(e) { alert("Logout failed."); }\r
};\r
\r
document.getElementById("studentSearchInput").addEventListener("keydown", e => {\r
    if (e.key === "Enter") { e.preventDefault(); searchStudents(); }\r
});\r
routeLookupInput.addEventListener("keydown", e => {\r
    if (e.key === "Enter") { e.preventDefault(); fetchRouteById(); }\r
});\r
`},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
