const e={file:"fees-report.html",title:"Schoolix - Fees Reports & Imposition",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
  <div class="container">
    <div class="top-bar">
      <div>
        <div class="page-eyebrow">Finance Operations</div>
        <h1>Fees Reports</h1>
        <p>Track demand, collections, dues, fines, and payment history from one clean workspace.</p>
      </div>
      <div class="top-actions">
        <button class="btn" id="adminDashboardBtn" onclick="window.location.href='#/index.html'" style="display:none;">Dashboard</button>
        <button class="btn btn-info" onclick="openImposeModal()">Impose Fees</button>
        <button class="btn btn-partial" onclick="document.getElementById('lateFinePanel').scrollIntoView({ behavior: 'smooth', block: 'start' })">Late Fee Fine</button>
        <button class="btn btn-success" onclick="exportToExcel()">Export Excel</button>
        <button class="btn" onclick="printReport()">Print</button>
      </div>
    </div>

    <div class="fee-ops-grid">
    <!-- Fee Imposition Section -->
    <div class="impose-section">
      <h2>Fee Imposition</h2>\r
      <p class="section-note">Select a class, optionally narrow it to one section, add the amount and a remark that will remain visible in fee history.</p>\r
      <div class="form-group">\r
        <select id="imposeClass" onchange="loadSectionsForImposeClass()">\r
          <option value="">Select Class</option>\r
          <option>PG</option>\r
          <option>LKG</option>\r
          <option>UKG</option>\r
          <option>1</option>\r
          <option>2</option>\r
          <option>3</option>\r
          <option>4</option>\r
          <option>5</option>\r
          <option>6</option>\r
          <option>7</option>\r
          <option>8</option>\r
          <option>9</option>\r
          <option>10</option>\r
          <option>11</option>\r
          <option>12</option>\r
        </select>\r
        <select id="imposeSection" disabled>\r
          <option value="">All Sections</option>\r
        </select>\r
        <select id="imposeMonth">\r
          <option value="">Select Month</option>\r
          <option>January</option>\r
          <option>February</option>\r
          <option>March</option>\r
          <option>April</option>\r
          <option>May</option>\r
          <option>June</option>\r
          <option>July</option>\r
          <option>August</option>\r
          <option>September</option>\r
          <option>October</option>\r
          <option>November</option>\r
          <option>December</option>\r
        </select>\r
        <input id="imposeAmount" type="number" placeholder="Amount (₹)" min="0">\r
        <input id="imposeRemark" type="text" placeholder="Remark / note for this fee (optional)">\r
        <button class="btn btn-info" onclick="imposeFees()">Impose Fees</button>\r
        <button class="btn" onclick="loadStudentsForClass()">Preview Students</button>\r
      </div>\r
      <div id="studentsPreview" style="margin-top:15px;"></div>\r
    </div>\r
\r
    <div class="fee-manage-panel" id="lateFinePanel">\r
      <h2>Late Fee Fine</h2>\r
      <p>Select fee month, last payment date, eligibility, and fine calculation. Preview students before applying.</p>\r
      <div class="form-group" style="margin-bottom:0;">\r
        <select id="fineMonth" onchange="loadFineRuleForMonth()">\r
          <option value="">Select Month</option>\r
          <option>January</option>\r
          <option>February</option>\r
          <option>March</option>\r
          <option>April</option>\r
          <option>May</option>\r
          <option>June</option>\r
          <option>July</option>\r
          <option>August</option>\r
          <option>September</option>\r
          <option>October</option>\r
          <option>November</option>\r
          <option>December</option>\r
        </select>\r
        <input id="fineDueDay" type="number" min="1" max="31" placeholder="Last payment day" style="display:none;">\r
        <input id="fineDueDate" type="date" title="Last payment date">\r
        <select id="fineEligibility">\r
          <option value="all-due">Full due and partial due</option>\r
          <option value="full-due">Only full due amount</option>\r
          <option value="partial-due">Only partially paid amount</option>\r
          <option value="due-above">Only due above amount</option>\r
        </select>\r
        <input id="fineDueThreshold" type="number" min="0" placeholder="Minimum due amount">\r
        <select id="fineMode">\r
          <option value="fixed">Fixed amount</option>\r
          <option value="percentage">Percentage</option>\r
        </select>\r
        <input id="fineAmount" type="number" min="1" placeholder="Fine amount (₹)">\r
        <select id="fineFrequency" style="display:none;">\r
          <option value="daily">Daily</option>\r
          <option value="weekly">Weekly</option>\r
          <option value="monthly">Monthly</option>\r
        </select>\r
        <select id="fineBasis">\r
          <option value="due">On due amount</option>\r
          <option value="assigned">On assigned amount</option>\r
        </select>\r
        <input id="fineIntervalDays" type="number" min="1" value="1" placeholder="Repeat every N days">\r
        <button class="btn" onclick="previewLateFeeFine()">Preview Fine</button>\r
        <button class="btn btn-success" onclick="saveAutoFineRule()">Save Auto Rule</button>\r
        <button class="btn btn-warning" onclick="openFineRulesModal()">Saved Rules</button>\r
        <button class="btn btn-partial" onclick="applyLateFeeFine()">Apply Fine</button>\r
      </div>\r
      <div id="fineRuleSummary" style="margin-top:12px;color:#334155;font-weight:700;"></div>\r
    </div>\r
\r
    <div class="fee-manage-panel">
      <h2>Manage Student Fees</h2>
      <p>Fetch by student ID to add payment, impose a month, update the same month's existing entry, or adjust extra collection.</p>
      <div class="form-group" style="margin-bottom:0;">\r
        <input id="manageStudentId" placeholder="Enter Student ID">\r
        <button class="btn btn-primary" onclick="fetchStudentFeeManager()">Fetch Student Fees</button>\r
      </div>\r
      <div id="manageStudentSummary" style="margin-top:14px;color:#334155;font-weight:700;"></div>
    </div>
    </div>
\r
    <!-- Stats Cards -->\r
    <div class="stats-grid" id="statsGrid">\r
      <div class="stat-card stat-imposed" onclick="filterByStatus('Imposed')">\r
        <div class="stat-number" id="totalImposed">₹0</div>\r
        <div class="stat-label">Total Imposed</div>\r
      </div>\r
      <div class="stat-card stat-paid" onclick="filterByStatus('Paid')">\r
        <div class="stat-number" id="totalPaid">₹0</div>\r
        <div class="stat-label">Total Paid</div>\r
      </div>\r
      <div class="stat-card stat-pending" onclick="filterByStatus('Pending')">\r
        <div class="stat-number" id="totalPending">₹0</div>\r
        <div class="stat-label">Total Pending</div>\r
      </div>\r
      <div class="stat-card stat-unpaid" onclick="filterByStatus('Unpaid')">\r
        <div class="stat-number" id="totalUnpaid">₹0</div>\r
        <div class="stat-label">Total Unpaid</div>\r
      </div>\r
      <div class="stat-card stat-total">\r
        <div class="stat-number" id="grandTotal">₹0</div>\r
        <div class="stat-label">Total Fees Paid</div>\r
      </div>\r
      <div class="stat-card">\r
        <div class="stat-number" id="selectedCount">0</div>\r
        <div class="stat-label">Selected Rows</div>\r
      </div>\r
    </div>\r
\r
    <div class="sx-chart-grid" id="feesAnalytics">\r
      <div class="sx-chart-card">\r
        <div class="sx-chart-head">\r
          <div>\r
            <h3 class="sx-chart-title">Collection Mix</h3>\r
            <p class="sx-chart-note" id="collectionMixNote">Collected and outstanding amount split</p>\r
          </div>\r
        </div>\r
        <div id="collectionMixChart"><div class="sx-chart-empty">Load records to view fee collection analytics.</div></div>\r
      </div>\r
      <div class="sx-chart-card sx-monthly-demand-card">\r
        <div class="sx-chart-head">\r
          <div>\r
            <h3 class="sx-chart-title">Monthly Demand</h3>\r
            <p class="sx-chart-note" id="monthlyDemandNote">Imposed amount by month</p>\r
          </div>\r
        </div>\r
        <div id="monthlyDemandChart"><div class="sx-chart-empty">Load records to view monthly demand.</div></div>\r
      </div>\r
      <div class="sx-chart-card">\r
        <div class="sx-chart-head">\r
          <div>\r
            <h3 class="sx-chart-title">Status Overview</h3>\r
            <p class="sx-chart-note" id="statusOverviewNote">Records by fee status</p>\r
          </div>\r
        </div>\r
        <div id="statusOverviewChart"><div class="sx-chart-empty">Load records to view status overview.</div></div>\r
      </div>\r
    </div>\r
\r
    <!-- Filters -->\r
    <div class="card filter-card">
      <div class="card-head">
        <div>
          <h2>Report Filters</h2>
          <p>Narrow the ledger before exporting, printing, or batch updating records.</p>
        </div>
      </div>
      <div class="form-group">
        <input id="searchStudent" placeholder="Search Student, ID, Payment ID">\r
        <select id="filterClass">
          <option value="">All Classes</option>
        </select>
        <select id="filterSection" disabled>
          <option value="">All Sections</option>
        </select>
        <select id="filterStatus">
          <option value="">All Status</option>\r
          <option value="Paid">Paid</option>\r
          <option value="Pending">Pending</option>\r
          <option value="Unpaid">Unpaid</option>\r
          <option value="Imposed">Imposed</option>\r
        </select>\r
        <select id="filterMonth">\r
          <option value="">All Months</option>\r
          <option>January</option>\r
          <option>February</option>\r
          <option>March</option>\r
          <option>April</option>\r
          <option>May</option>\r
          <option>June</option>\r
          <option>July</option>\r
          <option>August</option>\r
          <option>September</option>\r
          <option>October</option>\r
          <option>November</option>\r
          <option>December</option>\r
        </select>\r
        <select id="rowsPerPage">\r
          <option value="10">10 Rows</option>\r
          <option value="25">25 Rows</option>\r
          <option value="50">50 Rows</option>\r
          <option value="100">100 Rows</option>\r
          <option value="9999">Show All</option>\r
        </select>\r
        <button class="btn" onclick="loadReports()">Apply Filter</button>\r
        <button class="btn btn-success" onclick="loadAllReports()">Load All</button>\r
      </div>\r
    </div>\r
\r
    <div class="card daily-transactions-card">\r
      <div class="card-head">\r
        <div>\r
          <h2>Daily Transactions <span id="dailyTransactionCount">(0)</span></h2>\r
          <p>View fee payments received on one exact day. The latest transaction day opens automatically.</p>\r
        </div>\r
        <div class="daily-transaction-controls">\r
          <input id="dailyTransactionDate" type="date" aria-label="Daily transaction date" onchange="renderDailyTransactions()">\r
          <button class="btn" type="button" onclick="showLatestTransactionDay()">Latest Day</button>\r
          <button class="btn btn-success" type="button" onclick="showTodayTransactions()">Today</button>\r
        </div>\r
      </div>\r
      <div class="daily-transaction-summary">\r
        <div><small>Selected day</small><strong id="dailyTransactionDateLabel">-</strong></div>\r
        <div><small>Transactions</small><strong id="dailyTransactionTotalCount">0</strong></div>\r
        <div><small>Amount received</small><strong id="dailyTransactionAmount">₹0</strong></div>\r
      </div>\r
      <div id="dailyTransactionsTable"><div class="no-data">Load fee records to view daily transactions.</div></div>\r
    </div>\r
\r
    <div class="card report-card">
      <div class="card-head">
        <div>
          <h2>Fees Report <span id="totalRecords">(0 records)</span></h2>
          <p>Double-click a row to open full student fee history.</p>
        </div>
      </div>
      <div class="export-section report-actions">
        <button class="btn btn-success" onclick="exportToExcel()">Download Excel</button>
        <button class="btn" onclick="printReport()">Print Report</button>
      </div>
      <div id="reportsTable">\r
        <div class="no-data">Click "Load All" to view data</div>\r
      </div>\r
\r
      <div class="pagination" id="pagination"></div>\r
    </div>\r
  </div>\r
\r
  <!-- Students Modal -->\r
  <div id="studentsModal" class="modal">\r
    <div class="modal-content">\r
      <h3>Students Preview - <span id="modalClassName"></span></h3>
      <div id="studentsList"></div>
      <div style="margin-top: 20px;">
        <button class="btn btn-success" id="confirmImposeFeesBtn" onclick="confirmImposeFees()" style="margin-right: 10px;">Confirm &
          Impose</button>
        <button class="btn" onclick="closeStudentsModal()">Cancel</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div id="finePreviewModal" class="modal">\r
    <div class="modal-content">\r
      <h3>Late Fee Preview - <span id="finePreviewTitle"></span></h3>\r
      <div id="finePreviewSummary" style="margin:10px 0;color:#334155;font-weight:700;"></div>\r
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0;">\r
        <select id="finePreviewFilter" onchange="renderFinePreviewRows()" style="max-width:240px;">\r
          <option value="all">Show all students</option>\r
          <option value="pending">Only pending fine</option>\r
          <option value="already">Already imposed</option>\r
          <option value="selected">Selected only</option>\r
        </select>\r
        <button class="btn" onclick="toggleFinePreviewSelectAll(true)">Select Pending</button>\r
        <button class="btn btn-warning" onclick="unselectAlreadyImposedFineRows()">Unselect Already Imposed</button>\r
      </div>\r
      <div id="finePreviewList"></div>\r
      <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">\r
        <button class="btn btn-partial" onclick="confirmFinePreviewApply()">Apply Fine to Previewed Students</button>\r
        <button class="btn" onclick="closeFinePreviewModal()">Close</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div id="fineRulesModal" class="modal">\r
    <div class="modal-content">\r
      <h3>Saved Fine Rules</h3>\r
      <div id="fineRulesSummary" style="margin:10px 0;color:#334155;font-weight:700;"></div>\r
      <div id="fineRulesList"></div>\r
      <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">\r
        <button class="btn" onclick="refreshFineRulesModal()">Refresh</button>\r
        <button class="btn btn-secondary" onclick="closeFineRulesModal()">Close</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- SIMPLIFIED PARTIAL DETAILS MODAL -->\r
  <div id="partialDetailsModal" class="modal">\r
    <div class="modal-content">\r
      <h3>Partial Payment Details - <span id="partialDetailsStudent"></span></h3>\r
      <div id="partialDetailsContent"></div>\r
      <div style="margin-top: 20px;">\r
        <button class="btn btn-partial" onclick="addMorePayment()">Add More Payment</button>\r
        <button class="btn" onclick="closePartialDetailsModal()">Close</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Add Payment Modal -->
  <div id="addPaymentModal" class="modal">
    <div class="modal-content">
      <button type="button" id="addPaymentModalCloseBtn" class="modal-close" aria-label="Close add payment">&times;</button>
      <h3>Add Payment - <span id="addPaymentStudent"></span></h3>
      <div class="form-group">\r
        <input id="paymentAmount" type="number" placeholder="Enter Payment Amount (₹)" min="1">\r
        <select id="paymentMode" onchange="togglePaymentModeOther('paymentMode','paymentModeOther')">\r
          <option value="">Select payment mode</option>\r
          <option value="Cash">Cash</option>\r
          <option value="Card">Card</option>\r
          <option value="UPI">UPI</option>\r
          <option value="Other">Other</option>\r
        </select>\r
        <input id="paymentModeOther" type="text" maxlength="60" placeholder="Specify payment mode" style="display:none;">\r
        <input id="paymentNote" type="text" placeholder="Payment Note (Optional)">\r
      </div>\r
      <div style="margin-top: 20px;">\r
        <button class="btn btn-success" onclick="confirmAddPayment()">Add Payment</button>\r
        <button class="btn" onclick="closeAddPaymentModal()">Cancel</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- History Modal -->\r
  <div id="historyModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="historyModalTitle" hidden aria-hidden="true">
    <div class="modal-content history-modal-content">
      <div class="history-modal-header">
        <h3 id="historyModalTitle"><span id="modalStudentName"></span> - Fee History</h3>
        <button type="button" id="historyModalCloseBtn" class="history-modal-close" aria-label="Close fee history" data-school-branding="ignore" data-schoolix-manual-loading="true" onclick="return closeHistoryModal(event)">
          <span class="history-modal-close-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
              <path d="M6 6l12 12M18 6L6 18"></path>
            </svg>
          </span>
          <span class="history-modal-close-label">Close</span>
        </button>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0 16px;">\r
        <button class="btn btn-success" onclick="printHistoryReceipt('full')">Generate Full Fee Receipt</button>\r
      </div>\r
      <div class="history-manager">\r
        <h4 style="margin-bottom:10px;color:#334155;">Manage Fee Entry</h4>\r
        <div class="form-group" style="margin-bottom:10px;">\r
          <input id="historyFeeAmount" type="number" min="1" placeholder="Amount (₹)">\r
          <select id="historyFeeMonth">\r
            <option value="">Select Month</option>\r
            <option>January</option>\r
            <option>February</option>\r
            <option>March</option>\r
            <option>April</option>\r
            <option>May</option>\r
            <option>June</option>\r
            <option>July</option>\r
            <option>August</option>\r
            <option>September</option>\r
            <option>October</option>\r
            <option>November</option>\r
            <option>December</option>\r
          </select>\r
          <select id="historyFeeStatus" onchange="updateHistoryPaymentModeVisibility()">\r
            <option value="">Select Status</option>\r
            <option value="Paid">Paid</option>\r
            <option value="Imposed">Imposed</option>\r
            <option value="Pending">Pending</option>\r
            <option value="Unpaid">Unpaid</option>\r
          </select>\r
          <div id="historyPaymentModeGroup" class="form-group" style="display:none;margin:0;">\r
            <select id="historyPaymentMode" onchange="togglePaymentModeOther('historyPaymentMode','historyPaymentModeOther')">\r
              <option value="">Select payment mode</option>\r
              <option value="Cash">Cash</option>\r
              <option value="Card">Card</option>\r
              <option value="UPI">UPI</option>\r
              <option value="Other">Other</option>\r
            </select>\r
            <input id="historyPaymentModeOther" maxlength="60" placeholder="Specify payment mode" style="display:none;">\r
          </div>\r
          <input id="historyFeeRemarks" placeholder="Remarks (optional)">\r
        </div>\r
        <div class="extra-adjust-box" id="historyExtraBox">\r
          <div id="historyExtraText"></div>\r
          <div class="form-group" style="margin:12px 0 0;">\r
            <select id="adjustTargetMonth">\r
              <option value="">Adjust to month</option>\r
              <option>January</option>\r
              <option>February</option>\r
              <option>March</option>\r
              <option>April</option>\r
              <option>May</option>\r
              <option>June</option>\r
              <option>July</option>\r
              <option>August</option>\r
              <option>September</option>\r
              <option>October</option>\r
              <option>November</option>\r
              <option>December</option>\r
            </select>\r
            <input id="adjustExtraAmount" type="number" min="1" placeholder="Amount to adjust">\r
            <button class="btn btn-partial" onclick="applyHistoryExtraAdjustment()">Adjust Extra</button>\r
          </div>\r
        </div>\r
        <div style="display:flex;gap:10px;flex-wrap:wrap;">\r
          <button class="btn btn-success" onclick="saveHistoryFeeEntry()">Save Fee Entry</button>\r
          <button class="btn" onclick="resetHistoryFeeForm()">Reset</button>\r
        </div>\r
      </div>\r
      <div class="history-summary-banner" id="historyFeeSummary"></div>\r
      <div id="historyTable"></div>\r
      <div class="history-modal-footer-actions">
        <button type="button" class="btn" onclick="return closeHistoryModal(event)">Close Fee History</button>
      </div>
    </div>\r
  </div>\r
\r
  <script src="school-branding.js"><\/script>\r
  <script type="module">\r
    import { initializeApp } from "./firebase-compat.js";
    import {
      getFirestore, collection, getDocs, getDoc, query, where, orderBy, doc, serverTimestamp, updateDoc, setDoc, deleteDoc
    } from "./firebase-compat.js";
    import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
    import { newLedgerTransactionId, syncFeeCredit } from "./accounts-ledger.js";\r
\r
    // Firebase config same...\r
    const firebaseConfig = {\r
      apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
      authDomain: "schoolix-48107.firebaseapp.com",\r
      projectId: "schoolix-48107",\r
      storageBucket: "schoolix-48107.firebasestorage.app",\r
      messagingSenderId: "133937954491",\r
      appId: "1:133937954491:web:69d8064422617eb8c4339e",\r
      measurementId: "G-EG23XE5Q0Z"\r
    };\r
\r
    const app = initializeApp(firebaseConfig);\r
    const db = getFirestore(app);\r
    const auth = getAuth(app);\r
\r
    let currentUser = null;\r
    let currentUserData = null;\r
    let activeSchoolId = "";\r
    let allFees = [];\r
    let filteredFees = [];\r
    let currentPage = 1;\r
    let rowsPerPage = 10;\r
    let selectedRows = new Set();\r
    let studentsToImpose = [];\r
    let imposeConfig = {};\r
    let currentPartialFee = null;\r
    let currentPartialFeeId = null;\r
    let currentHistoryStudent = null;\r
    let currentHistoryFees = [];
    let pendingFinePreview = null;
    let finePreviewSelections = {};
    let autoFineApplying = false;
    let feeImposeInProgress = false;
    let feeCleanupInProgress = false;
    let feeDeleteInProgress = false;
    let studentTcMap = {};
    let activeSessionId = "";\r
    let activeSessionLabel = "";
    let activeSessionLocked = false;
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function normalizeFeeMonth(value) {
      const raw = String(value || "").trim();
      if (!raw) return "";
      if (/^\\d{1,2}$/.test(raw)) {
        const monthNumber = Number(raw);
        if (monthNumber >= 1 && monthNumber <= 12) return monthOrder[monthNumber - 1];
      }
      const compact = raw.toLowerCase().replace(/[^a-z]/g, "");
      const matchedMonth = monthOrder.find((month) => {
        const canonical = month.toLowerCase();
        return compact === canonical || compact === canonical.slice(0, 3) || compact.startsWith(canonical);
      });
      return matchedMonth || raw;
    }
\r
    function renderFeeDonut(targetId, items, centerText, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const total = items.reduce((sum, item) => sum + item.value, 0);\r
      if (!total) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      let cursor = 0;\r
      const gradient = items.map((item) => {\r
        const start = cursor;\r
        const end = cursor + (item.value / total) * 360;\r
        cursor = end;\r
        return \`\${item.color} \${start}deg \${end}deg\`;\r
      }).join(", ");\r
      target.innerHTML = \`\r
        <div class="sx-donut-wrap">\r
          <div class="sx-donut" data-center="\${centerText}" style="background:conic-gradient(\${gradient});"></div>\r
          <div class="sx-legend">\r
            \${items.map((item) => \`\r
              <div class="sx-legend-item">\r
                <span class="sx-dot" style="--dot:\${item.color}"></span>\r
                <span>\${item.label}</span>\r
                <strong>₹\${Math.round(item.value).toLocaleString()}</strong>\r
              </div>\r
            \`).join("")}\r
          </div>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderFeeBarsLegacy(targetId, items, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const visible = items.filter((item) => item.value > 0);\r
      const max = Math.max(...visible.map((item) => item.value), 0);\r
      if (!max) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      target.innerHTML = \`\r
        <div class="sx-bars">\r
          \${visible.map((item) => \`\r
            <div class="sx-bar-item">\r
              <div class="sx-bar-value">₹\${Math.round(item.value).toLocaleString()}</div>\r
              <div class="sx-bar-track">\r
                <div class="sx-bar-fill" style="height:\${Math.max(8, (item.value / max) * 100)}%;background:\${item.color};"></div>\r
              </div>\r
              <div class="sx-bar-label">\${item.label.slice(0, 3)}</div>\r
            </div>\r
          \`).join("")}\r
        </div>\r
      \`;\r
    }\r
\r
    function formatChartCurrency(value = 0) {\r
      const amount = Math.round(Number(value) || 0);\r
      if (amount >= 10000000) return \`₹\${(amount / 10000000).toFixed(amount % 10000000 ? 1 : 0)}Cr\`;\r
      if (amount >= 100000) return \`₹\${(amount / 100000).toFixed(amount % 100000 ? 1 : 0)}L\`;\r
      if (amount >= 1000) return \`₹\${(amount / 1000).toFixed(amount % 1000 ? 1 : 0)}k\`;\r
      return \`₹\${amount.toLocaleString("en-IN")}\`;\r
    }\r
\r
    function renderFeeBars(targetId, items, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const visible = items.filter((item) => item.value > 0);\r
      const max = Math.max(...visible.map((item) => item.value), 0);\r
      if (!max) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      const total = items.reduce((sum, item) => sum + item.value, 0);\r
      target.innerHTML = \`\r
        <div class="chart-total-row"><span class="chart-total-pill">Total \${formatChartCurrency(total)}</span></div>\r
        <div class="chart-columns">\r
          \${items.map((item) => {\r
            const hasValue = item.value > 0;\r
            const height = hasValue ? Math.max(18, (item.value / max) * 82) : 12;\r
            return \`\r
              <div class="chart-column">\r
                <div class="chart-column-value">\${hasValue ? formatChartCurrency(item.value) : ""}</div>\r
                <div class="chart-column-bar\${hasValue ? "" : " is-empty"}" title="\${item.label}: ₹\${Math.round(item.value).toLocaleString("en-IN")}" style="height:\${height}px;\${hasValue ? \`background:\${item.color};\` : ""}"></div>\r
                <div class="chart-column-label">\${item.label.slice(0, 3)}</div>\r
              </div>\r
            \`;\r
          }).join("")}\r
        </div>\r
      \`;\r
    }\r
\r
    function renderStatusOverview(targetId, items, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const total = items.reduce((sum, item) => sum + item.value, 0);\r
      if (!total) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      target.innerHTML = \`\r
        <div class="sx-status-list">\r
          \${items.map((item) => \`\r
            <div class="sx-status-row">\r
              <strong>\${item.label}</strong>\r
              <div class="sx-status-track">\r
                <div class="sx-status-fill" style="width:\${Math.max(4, (item.value / total) * 100)}%;background:\${item.color};"></div>\r
              </div>\r
              <span>\${item.value}</span>\r
            </div>\r
          \`).join("")}\r
        </div>\r
      \`;\r
    }\r
\r
    function sourceFeesForReportRows(reportRows) {\r
      const ids = new Set((reportRows || []).map((entry) => entry.reportFeeId || entry.id).filter(Boolean));\r
      return allFees.filter((fee) => ids.has(fee.id));\r
    }\r
\r
    function updateFeeAnalytics(reportRows) {\r
      const fees = sourceFeesForReportRows(reportRows);\r
      let totalImposed = 0;\r
      let totalCollected = 0;\r
      let totalOutstanding = 0;\r
      const chartPalette = ["#2563eb", "#10b981", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16", "#f59e0b", "#14b8a6", "#6366f1", "#e11d48"];\r
      const monthTotals = new Map(monthOrder.map((month) => [month, 0]));\r
      const statusTotals = new Map([\r
        ["Paid", 0],\r
        ["Partial", 0],\r
        ["Pending", 0],\r
        ["Imposed", 0]\r
      ]);\r
\r
      fees.forEach((fee) => {\r
        const amounts = getFeeAmounts(fee);\r
        const status = getCorrectStatus(fee);\r
        totalImposed += amounts.total;\r
        totalCollected += amounts.collected;\r
        const reportMonth = normalizeFeeMonth(fee.month) || "Other";
        monthTotals.set(reportMonth, (monthTotals.get(reportMonth) || 0) + amounts.total);
        statusTotals.set(status, (statusTotals.get(status) || 0) + 1);\r
        totalOutstanding += amounts.due;\r
      });\r
\r
      renderFeeDonut("collectionMixChart", [\r
        { label: "Collected", value: totalCollected, color: "#16a34a" },\r
        { label: "Outstanding", value: totalOutstanding, color: "#f97316" }\r
      ], \`\${totalImposed ? Math.round((totalCollected / totalImposed) * 100) : 0}%\`, "No fee collection data available.");\r
\r
      const note = document.getElementById("collectionMixNote");\r
      if (note) note.textContent = \`₹\${Math.round(totalCollected).toLocaleString()} collected from ₹\${Math.round(totalImposed).toLocaleString()} imposed\`;\r
\r
      const monthlyItems = Array.from(monthTotals.entries()).map(([label, value], index) => ({\r
        label,\r
        value,\r
        color: chartPalette[index % chartPalette.length]\r
      }));\r
      renderFeeBars("monthlyDemandChart", monthlyItems, "No monthly fee demand to chart yet.");\r
      const monthNote = document.getElementById("monthlyDemandNote");\r
      if (monthNote) monthNote.textContent = \`\${fees.length} unique fee records in the current view\`;\r
\r
      renderStatusOverview("statusOverviewChart", [\r
        { label: "Paid", value: statusTotals.get("Paid") || 0, color: "#16a34a" },\r
        { label: "Partial", value: statusTotals.get("Partial") || 0, color: "#2563eb" },\r
        { label: "Pending", value: statusTotals.get("Pending") || 0, color: "#f59e0b" },\r
        { label: "Imposed", value: statusTotals.get("Imposed") || 0, color: "#7c3aed" }\r
      ], "No fee statuses to chart yet.");\r
      const statusNote = document.getElementById("statusOverviewNote");\r
      if (statusNote) statusNote.textContent = \`\${fees.length} unique fee records in this report view\`;\r
    }\r
\r
    function getExportSchoolName() {\r
      const schoolName = window.SchoolBranding?.getSchoolName() || "Schoolix";\r
      const sanitized = schoolName.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");\r
      return sanitized || "Schoolix";\r
    }\r
\r
    function enableAdminNavigation() {
      document.body.classList.remove("sx-accountant-shell-enabled", "library-dashboard-app", "sx-accountant-fees-workspace");
      document.querySelectorAll("#librarySidebar, #librarySidebarOverlay, #libraryMenuButton").forEach((element) => element.remove());
      const dashboardBtn = document.getElementById("adminDashboardBtn");
      if (dashboardBtn) dashboardBtn.style.display = "";
      if (document.querySelector('script[data-admin-shell="true"]')) return;\r
      const script = document.createElement("script");\r
      script.src = "admin-shell.js?v=navbar-20260721";\r
      script.defer = true;\r
      script.dataset.adminShell = "true";\r
      document.body.appendChild(script);\r
    }\r
\r
    function enableAccountantWorkspace() {
      document.body.classList.add("sx-accountant-fees-workspace");
      document.body.dataset.accountantPage = "fees";
      document.body.classList.remove("sx-admin-shell-enabled", "sx-admin-shell-open", "sx-admin-shell-collapsed");
      document.querySelectorAll(".sx-admin-sidebar, .sx-admin-menu-btn, .sx-admin-overlay, .sx-admin-header").forEach((element) => element.remove());
      const dashboardBtn = document.getElementById("adminDashboardBtn");
      if (dashboardBtn) dashboardBtn.remove();
      const activate = () => window.enableAccountantShell?.();
      if (window.enableAccountantShell) {
        activate();
        return;
      }
      if (document.querySelector('script[data-accountant-shell="true"]')) return;
      const script = document.createElement("script");
      script.src = "accountant-portal.js";
      script.defer = true;
      script.dataset.accountantShell = "true";
      script.addEventListener("load", activate);
      document.body.appendChild(script);
    }
\r
    async function loadActiveSession() {\r
      activeSessionId = "";\r
      activeSessionLabel = "";\r
      activeSessionLocked = false;\r
      try {\r
        let viewSessionId = "";\r
        try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}\r
        const activeSnap = await getDoc(doc(db, "schools", activeSchoolId, "settings", "activeSession"));\r
        activeSessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");\r
        if (!activeSessionId) return;\r
        const sessionSnap = await getDoc(doc(db, "schools", activeSchoolId, "sessions", activeSessionId));\r
        if (!sessionSnap.exists()) {\r
          try { if (viewSessionId) localStorage.removeItem("schoolix.viewSessionId"); } catch (_) {}\r
          activeSessionId = activeSnap.exists() ? activeSnap.data().sessionId || "" : "";\r
          if (!activeSessionId || activeSessionId === viewSessionId) return;\r
          const fallbackSnap = await getDoc(doc(db, "schools", activeSchoolId, "sessions", activeSessionId));\r
          if (!fallbackSnap.exists()) return;\r
          const fallbackData = fallbackSnap.data();\r
          activeSessionLabel = fallbackData.session || fallbackData.name || "";\r
          activeSessionLocked = fallbackData.locked === true;\r
          return;\r
        }\r
        const data = sessionSnap.data();\r
        activeSessionLabel = data.session || data.name || "";\r
        activeSessionLocked = data.locked === true;\r
      } catch (error) {\r
        console.warn("Active session load failed; showing all fee records.", error);\r
        activeSessionId = "";\r
        activeSessionLabel = "";\r
        activeSessionLocked = false;\r
      }\r
    }\r
\r
    function feeBelongsToActiveSession(fee) {\r
      if (!activeSessionId && !activeSessionLabel) return true;\r
      if (!fee.sessionId && !fee.session && !fee.currentYear && !fee.academicSession) return false;\r
      return fee.sessionId === activeSessionId ||\r
        fee.session === activeSessionLabel ||\r
        fee.currentYear === activeSessionLabel ||\r
        fee.academicSession === activeSessionLabel;\r
    }\r
\r
    function sessionFeeFields() {
      return { sessionId: activeSessionId || "", session: activeSessionLabel || "" };
    }

    function feeStudentIdentityKey(fee) {
      const directId = String(fee.studentId || fee.studentDocId || "").trim().toLowerCase();
      if (directId) return directId;
      const profileKey = [
        fee.studentName || fee.name || "",
        fee.class || fee.currentClass || fee.finalClass || "",
        fee.section || "",
        fee.roll || fee.rollNo || ""
      ].map((value) => String(value).trim().toLowerCase()).filter(Boolean).join("|");
      return profileKey || String(fee.id || "").trim().toLowerCase();
    }

    function feeRecordKey(fee) {
      const sessionKey = activeSessionId || activeSessionLabel
        ? "active-session"
        : String(fee.sessionId || fee.session || fee.currentYear || fee.academicSession || "current").trim().toLowerCase();
      return [
        feeStudentIdentityKey(fee),
        normalizeFeeMonth(fee.month).toLowerCase(),
        sessionKey
      ].join("|");
    }

    function feeDocIdPart(value, fallback) {
      return String(value || fallback || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 70) || fallback;
    }

    function feeTypeIdentity(fee) {
      return String(fee?.feeType || fee?.type || fee?.category || "monthly").trim().toLowerCase() || "monthly";
    }

    function deterministicMonthlyFeeDocId(studentId, month, feeType = "monthly") {
      const sessionKey = activeSessionId || activeSessionLabel || "current";
      return [
        "monthly-fee",
        feeDocIdPart(sessionKey, "current"),
        feeDocIdPart(studentId, "student"),
        feeDocIdPart(month, "month"),
        feeDocIdPart(feeType, "monthly")
      ].join("_");
    }

    function deterministicBulkFeeDocId(studentId, month) {
      return deterministicMonthlyFeeDocId(studentId, month);
    }

    async function findExistingMonthlyFeeRecords(student, month, feeType = "monthly") {
      const studentId = typeof student === "object" ? student?.studentId : student;
      const studentDocId = typeof student === "object" ? (student?.studentDocId || student?.id || "") : "";
      const feesRef = collection(db, "schools", activeSchoolId, "fees");
      const hasStudentId = studentId !== undefined && studentId !== null && Boolean(String(studentId).trim());
      const identityMatches = (fee) =>
        (hasStudentId && String(fee.studentId || "").trim().toLowerCase() === String(studentId).trim().toLowerCase()) ||
        (studentDocId && fee.studentDocId === studentDocId);
      const wantedMonth = normalizeFeeMonth(month).toLowerCase();
      const matchesMonthlyFee = (fee) =>
        identityMatches(fee) &&
        feeBelongsToActiveSession(fee) &&
        normalizeFeeMonth(fee.month).toLowerCase() === wantedMonth &&
        feeTypeIdentity(fee) === feeTypeIdentity({ feeType });

      const cached = allFees.filter(matchesMonthlyFee);
      if (cached.length) return cached;
      if (!hasStudentId && !studentDocId) return [];

      // Older entries may contain only a session label or differently-cased month.
      // Querying those exact fields caused an existing monthly fee to be missed.
      const lookupField = hasStudentId ? "studentId" : "studentDocId";
      const lookupValue = hasStudentId ? studentId : studentDocId;
      const snapshots = [await getDocs(query(feesRef, where(lookupField, "==", lookupValue)))];
      const existing = new Map();
      snapshots.forEach((snapshot) => snapshot.docs.forEach((feeDoc) => {
        existing.set(feeDoc.id, { id: feeDoc.id, ...feeDoc.data() });
      }));
      return Array.from(existing.values()).filter(matchesMonthlyFee);
    }

    async function createMonthlyFeeIfMissing(student, month, payload, feeType = "monthly") {
      const normalizedMonth = normalizeFeeMonth(month);
      const feeRef = doc(db, "schools", activeSchoolId, "fees", deterministicMonthlyFeeDocId(student.studentId, normalizedMonth, feeType));
      const feeSnap = await getDoc(feeRef);
      if (feeSnap.exists()) return { created: false, fee: { id: feeRef.id, ...feeSnap.data() } };

      const existing = await findExistingMonthlyFeeRecords(student, normalizedMonth, feeType);
      if (existing.length) return { created: false, fee: mergeDuplicateFeeRecords(existing)[0] };

      // The duplicate bug came from random addDoc() IDs after a read-then-write check.
      // A deterministic monthly fee ID makes the write idempotent: repeated clicks/runs
      // target the same document for the same student + session + month + fee type.
      const normalizedPayload = { ...payload, month: normalizedMonth };
      await setDoc(feeRef, normalizedPayload, { merge: false });
      return { created: true, id: feeRef.id, fee: { id: feeRef.id, ...normalizedPayload } };
    }

    function uniqueBySignature(items = [], signatureFn) {
      const seen = new Set();
      return items.filter((item, index) => {
        const signature = signatureFn(item, index);
        if (seen.has(signature)) return false;
        seen.add(signature);
        return true;
      });
    }

    function uniqueImpositionEntries(fee) {
      return uniqueBySignature(
        Array.isArray(fee?.impositions) ? fee.impositions : [],
        (imposition) => String(imposition.impositionKey || [
          normalizeFeeMonth(imposition.month || fee.month || ""),
          imposition.amount || 0,
          imposition.remarks || ""
        ].join("|")).toLowerCase()
      );
    }

    function normalizeFeeRecord(fee) {
      const month = normalizeFeeMonth(fee.month);
      const normalizedFee = {
        ...fee,
        month,
        impositions: uniqueImpositionEntries(fee).map((imposition) => ({
          ...imposition,
          month: normalizeFeeMonth(imposition.month || month)
        }))
      };
      const impositions = normalizedFee.impositions;
      if (!impositions.length) return normalizedFee;
      const fineAmount = getTotalFineAmount(normalizedFee);
      const uniquePrincipal = impositions.reduce((sum, imposition) => sum + Number(imposition.amount || 0), 0);
      const storedTotal = Number(normalizedFee.originalAmount ?? normalizedFee.amount ?? 0);
      if (uniquePrincipal <= 0 || uniquePrincipal >= storedTotal) {
        return normalizedFee;
      }
      const totalPaidAmount = getTotalPaidAmount(normalizedFee);
      const totalExtraPaidAmount = getTotalExtraPaidAmount(normalizedFee);
      const correctedTotal = uniquePrincipal + fineAmount;
      const remainingAmount = Math.max(0, correctedTotal - totalPaidAmount);
      return {
        ...normalizedFee,
        impositions,
        amount: correctedTotal,
        originalAmount: correctedTotal,
        remainingAmount,
        totalCollectedAmount: totalPaidAmount + totalExtraPaidAmount,
        status: remainingAmount <= 0 ? "Paid" : totalPaidAmount > 0 ? "Partial" : (normalizedFee.status || "Imposed")
      };
    }

    function limitImpositionsToPrincipal(impositions = [], principalAmount = 0) {
      const target = Math.max(0, Number(principalAmount || 0));
      if (!target) return impositions;
      let remaining = target;
      const limited = [];
      for (const imposition of impositions) {
        const amount = Math.max(0, Number(imposition.amount || 0));
        if (!amount || remaining <= 0) continue;
        const includedAmount = Math.min(amount, remaining);
        limited.push(includedAmount === amount ? imposition : { ...imposition, amount: includedAmount });
        remaining -= includedAmount;
      }
      return limited;
    }

    function mergeDuplicateFeeRecords(records = []) {
      const grouped = new Map();
      records.map(normalizeFeeRecord).forEach((fee) => {
        const key = feeRecordKey(fee);
        if (!fee.month) {
          grouped.set(\`\${key}|\${fee.id || grouped.size}\`, [fee]);
          return;
        }
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key).push(fee);
      });

      const merged = [];
      grouped.forEach((fees) => {
        if (fees.length === 1) {
          merged.push(normalizeFeeRecord(fees[0]));
          return;
        }
        const primary = fees.slice().sort((a, b) => feeDateValue(b) - feeDateValue(a))[0];
        const principalAmount = Math.max(...fees.map((fee) =>
          Math.max(0, Number(fee.originalAmount ?? fee.amount ?? 0) - getTotalFineAmount(fee))
        ));
        const payments = uniqueBySignature(
          fees.flatMap((fee) => (Array.isArray(fee.payments) ? fee.payments : [])
            .map((payment, index) => ({ ...payment, __sourceFeeId: fee.id || "", __sourcePaymentIndex: index }))),
          (payment) => String(payment.transactionId || payment.ledgerTransactionId || payment.txnId || payment.paymentId || [
            payment.__sourceFeeId,
            payment.__sourcePaymentIndex,
            payment.receivedAmount ?? payment.amount ?? 0,
            payment.appliedAmount ?? payment.amount ?? 0,
            payment.extraAmount || 0,
            payment.note || payment.remarks || "",
            payment.status || "",
            payment.date?.toDate?.()?.toISOString?.() || payment.date || payment.paidAt || payment.createdAt || ""
          ].join("|")).toLowerCase()
        ).map(({ __sourceFeeId, __sourcePaymentIndex, ...payment }) => payment);
        const paymentPaidAmount = payments.reduce((sum, payment) => sum + Number(payment.appliedAmount ?? payment.amount ?? 0), 0);
        const storedPaidAmount = Math.max(...fees.map((fee) => Number(fee.totalPaidAmount ?? fee.paidAmount ?? 0)));
        const totalPaidAmount = Math.max(paymentPaidAmount, storedPaidAmount);
        const paymentExtraAmount = payments.reduce((sum, payment) => sum + Number(payment.extraAmount || 0), 0);
        const storedExtraAmount = Math.max(...fees.map((fee) => getTotalExtraPaidAmount(fee)));
        const totalExtraPaidAmount = Math.max(paymentExtraAmount, storedExtraAmount);
        const orderedFees = [primary, ...fees.filter((fee) => fee.id !== primary.id)];
        const impositions = limitImpositionsToPrincipal(uniqueBySignature(
          orderedFees.flatMap((fee) => getImpositionEntries(fee)),
          (imposition) => String([
            imposition.impositionKey || normalizeFeeMonth(imposition.month || primary.month || ""),
            imposition.amount || 0,
            imposition.remarks || ""
          ].join("|")).toLowerCase()
        ), principalAmount);
        const fineDetails = uniqueBySignature(
          fees.flatMap((fee) => getFineDetails(fee)),
          (fine) => String(fine.ruleKey || [fine.amount || 0, fine.reason || ""].join("|")).toLowerCase()
        );
        const fineAmount = fineDetails.reduce((sum, fine) => sum + Number(fine.amount || 0), 0);
        const correctedOriginalAmount = principalAmount + fineAmount;
        const remainingAmount = Math.max(0, correctedOriginalAmount - totalPaidAmount);
        merged.push(normalizeFeeRecord({
          ...primary,
          duplicateFeeIds: fees.map((fee) => fee.id).filter((id) => id && id !== primary.id),
          amount: correctedOriginalAmount,
          originalAmount: correctedOriginalAmount,
          paidAmount: totalPaidAmount,
          totalPaidAmount,
          totalExtraPaidAmount,
          totalCollectedAmount: totalPaidAmount + totalExtraPaidAmount,
          remainingAmount,
          status: remainingAmount <= 0 ? "Paid" : totalPaidAmount > 0 ? "Partial" : (primary.status || "Imposed"),
          payments,
          impositions,
          fineDetails,
          remarks: primary.remarks || fees.find((fee) => fee.remarks)?.remarks || "",
          impositionRemark: primary.impositionRemark || fees.find((fee) => fee.impositionRemark)?.impositionRemark || ""
        }));
      });
      return merged.sort((a, b) => feeDateValue(b) - feeDateValue(a));
    }

    function chooseCleanupPrimary(fees = []) {
      const deterministicIds = new Set(fees.map((fee) => deterministicBulkFeeDocId(fee.studentId, fee.month)));
      return fees.slice().sort((a, b) => {
        const aDeterministic = deterministicIds.has(a.id) ? 1 : 0;
        const bDeterministic = deterministicIds.has(b.id) ? 1 : 0;
        if (aDeterministic !== bDeterministic) return bDeterministic - aDeterministic;
        const aActivity = (Array.isArray(a.payments) ? a.payments.length : 0) + (Array.isArray(a.fineDetails) ? a.fineDetails.length : 0) + (getTotalPaidAmount(a) > 0 ? 10 : 0);
        const bActivity = (Array.isArray(b.payments) ? b.payments.length : 0) + (Array.isArray(b.fineDetails) ? b.fineDetails.length : 0) + (getTotalPaidAmount(b) > 0 ? 10 : 0);
        if (aActivity !== bActivity) return bActivity - aActivity;
        return feeDateValue(a) - feeDateValue(b);
      })[0];
    }

    function feeCleanupPayload(mergedFee, duplicateIds = []) {
      const amounts = getFeeAmounts(mergedFee);
      return {
        studentId: mergedFee.studentId || "",
        studentName: mergedFee.studentName || "",
        class: mergedFee.class || "",
        section: mergedFee.section || "",
        roll: mergedFee.roll || "",
        studentDocId: mergedFee.studentDocId || "",
        month: mergedFee.month || "",
        amount: amounts.total,
        originalAmount: amounts.total,
        paidAmount: amounts.applied,
        totalPaidAmount: amounts.applied,
        totalExtraPaidAmount: amounts.extra,
        totalCollectedAmount: amounts.collected,
        remainingAmount: amounts.due,
        status: amounts.due <= 0 ? "Paid" : amounts.applied > 0 ? "Partial" : (mergedFee.status || "Imposed"),
        remarks: mergedFee.remarks || "",
        impositionRemark: mergedFee.impositionRemark || mergedFee.remarks || "",
        impositions: getImpositionEntries(mergedFee),
        payments: Array.isArray(mergedFee.payments) ? mergedFee.payments : [],
        fineDetails: getFineDetails(mergedFee),
        totalFineAmount: getTotalFineAmount(mergedFee),
        fineAmount: getTotalFineAmount(mergedFee),
        date: mergedFee.date || mergedFee.imposedDate || mergedFee.createdAt || new Date(),
        ...sessionFeeFields(),
        duplicateFeeIdsRemoved: duplicateIds,
        dedupedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
    }

    function groupDuplicateFeeRecords(records = []) {
      const groups = new Map();
      records.map(normalizeFeeRecord).forEach((fee) => {
        if (!fee.id || !fee.month || !feeStudentIdentityKey(fee)) return;
        const key = feeRecordKey(fee);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(fee);
      });
      return groups;
    }

    async function cleanupDuplicateFeeRecords(records = [], { silent = false } = {}) {
      if (feeCleanupInProgress || activeSessionLocked || !activeSchoolId) {
        return { groupsFixed: 0, docsDeleted: 0, docsUpdated: 0 };
      }
      feeCleanupInProgress = true;
      const cleanupBtn = document.getElementById("cleanupDuplicateFeesBtn");
      if (cleanupBtn) {
        cleanupBtn.disabled = true;
        cleanupBtn.textContent = "Cleaning...";
      }
      try {
        let groupsFixed = 0;
        let docsDeleted = 0;
        let docsUpdated = 0;
        const groups = groupDuplicateFeeRecords(records.filter(feeBelongsToActiveSession));

        for (const fees of groups.values()) {
          const normalizedFees = fees.map(normalizeFeeRecord);
          const primary = chooseCleanupPrimary(normalizedFees);
          if (!primary?.id) continue;
          const merged = mergeDuplicateFeeRecords(normalizedFees)[0];
          if (!merged) continue;
          const duplicateIds = normalizedFees.map((fee) => fee.id).filter((id) => id && id !== primary.id);
          const normalizedPrimary = normalizeFeeRecord(primary);
          const rawImpositionCount = Array.isArray(primary.impositions) ? primary.impositions.length : 0;
          const primaryNeedsUpdate =
            duplicateIds.length > 0 ||
            rawImpositionCount !== getImpositionEntries(normalizedPrimary).length ||
            Number(primary.originalAmount ?? primary.amount ?? 0) !== Number(normalizedPrimary.originalAmount ?? normalizedPrimary.amount ?? 0);

          if (!primaryNeedsUpdate) continue;

          await updateDoc(
            doc(db, "schools", activeSchoolId, "fees", primary.id),
            feeCleanupPayload({ ...merged, id: primary.id }, duplicateIds)
          );
          docsUpdated++;

          for (const duplicateId of duplicateIds) {
            await deleteDoc(doc(db, "schools", activeSchoolId, "fees", duplicateId));
            docsDeleted++;
          }
          groupsFixed++;
        }

        if (!silent && (groupsFixed || docsDeleted || docsUpdated)) {
          showToast(\`Duplicate fees cleaned: \${docsDeleted} duplicate record(s) removed.\`);
        } else if (!silent) {
          showToast("No duplicate fee records found.");
        }
        return { groupsFixed, docsDeleted, docsUpdated };
      } finally {
        feeCleanupInProgress = false;
        if (cleanupBtn) {
          cleanupBtn.disabled = false;
          cleanupBtn.textContent = "Clean Duplicates";
        }
      }
    }

    function ensureSessionEditable(action = "Fee changes") {
      if (!activeSessionLocked) return true;\r
      showToast(\`\${action} are blocked because this session is locked.\`, "error");\r
      return false;\r
    }\r
\r
    function getCorrectStatus(fee) {\r
      const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
      const totalPaidAmount = Number(fee.totalPaidAmount || 0);\r
\r
      if (totalPaidAmount >= originalAmount) {\r
        return 'Paid';\r
      } else if (totalPaidAmount > 0) {\r
        return 'Partial';\r
      } else if (fee.status === 'Pending') {\r
        return 'Pending';\r
      } else {\r
        return 'Imposed';\r
      }\r
    }\r
\r
    function getTotalPaidAmount(fee) {\r
      if (Number.isFinite(Number(fee.totalPaidAmount))) return Number(fee.totalPaidAmount);\r
      if (Array.isArray(fee.payments)) {\r
        return fee.payments.reduce((sum, payment) => sum + Number(payment.appliedAmount ?? payment.amount ?? 0), 0);\r
      }\r
      return Number(fee.paidAmount || 0);\r
    }\r
\r
    window.togglePaymentModeOther = (selectId, inputId) => {\r
      const select = document.getElementById(selectId);\r
      const input = document.getElementById(inputId);\r
      if (!select || !input) return;\r
      input.style.display = select.value === "Other" ? "block" : "none";\r
      if (select.value !== "Other") input.value = "";\r
    };\r
\r
    window.updateHistoryPaymentModeVisibility = () => {\r
      const status = document.getElementById("historyFeeStatus")?.value || "";\r
      const group = document.getElementById("historyPaymentModeGroup");\r
      const mode = document.getElementById("historyPaymentMode");\r
      const other = document.getElementById("historyPaymentModeOther");\r
      if (!group) return;\r
      const isPaid = status === "Paid";\r
      group.style.display = isPaid ? "flex" : "none";\r
      if (!isPaid) {\r
        if (mode) mode.value = "";\r
        if (other) {\r
          other.value = "";\r
          other.style.display = "none";\r
        }\r
      }\r
    };\r
\r
    function paymentModeFromFields(selectId, inputId) {\r
      const mode = document.getElementById(selectId)?.value || "";\r
      const other = document.getElementById(inputId)?.value.trim() || "";\r
      if (!mode) return { error: "Select payment mode." };\r
      if (mode === "Other" && !other) return { error: "Specify the payment mode." };\r
      return { paymentMode: mode === "Other" ? \`Other - \${other}\` : mode, paymentModeType: mode };\r
    }\r
\r
    function askPaymentMode() {\r
      const answer = window.prompt("Payment mode enter karein: Cash, Card, UPI ya Other");\r
      if (answer === null) return null;\r
      const normalized = answer.trim().toLowerCase();\r
      const known = { cash: "Cash", card: "Card", upi: "UPI", other: "Other", others: "Other" };\r
      if (!known[normalized]) {\r
        showToast("Payment mode Cash, Card, UPI ya Other me se select karein.", "error");\r
        return null;\r
      }\r
      if (known[normalized] !== "Other") return { paymentMode: known[normalized], paymentModeType: known[normalized] };\r
      const detail = window.prompt("Other payment mode specify karein:");\r
      if (!detail?.trim()) {\r
        showToast("Other payment mode specify karna zaroori hai.", "error");\r
        return null;\r
      }\r
      return { paymentMode: \`Other - \${detail.trim()}\`, paymentModeType: "Other" };\r
    }\r
\r
    function getFeeAmounts(fee) {
      const total = Number(fee.originalAmount || fee.amount || 0);
      const paid = getTotalPaidAmount(fee);
      const extra = Number(fee.totalExtraPaidAmount || 0);
      const collected = Number(fee.totalCollectedAmount || paid + extra);
      // Assigned and applied totals are the source of truth. Older/manual
      // records can carry a stale remainingAmount after an advance payment is
      // assigned later, which made the UI show an incorrect outstanding fee.
      const remaining = Math.max(0, total - paid);
      return { total, paid, applied: paid, extra, collected, remaining, due: remaining };
    }\r
\r
    async function syncReceivedFee(feeId, fee, payment, paymentIndex) {\r
      try {\r
        await syncFeeCredit({\r
          db,\r
          schoolId: activeSchoolId,\r
          actor: {\r
            uid: currentUser?.uid,\r
            email: currentUser?.email,\r
            name: currentUser?.displayName,\r
            role: "admin"\r
          },\r
          feeId,\r
          fee,\r
          payment,\r
          paymentIndex\r
        });\r
      } catch (error) {\r
        console.warn("Fee was saved, but its accounts entry will be retried from School Accounts.", error);\r
      }\r
    }\r
\r
    function getImpositionEntries(fee) {
      const total = Number(fee.originalAmount ?? fee.amount ?? 0);
      const principal = Math.max(0, total - getTotalFineAmount(fee));
      return limitImpositionsToPrincipal(uniqueImpositionEntries(fee), principal);
    }
\r
    function buildImpositionEntry(student, amount, previousTotal = 0) {
      const imposedAt = new Date();
      const month = imposeConfig.month || "";
      const runId = String(imposeConfig.runId || "bulk-run").trim().toLowerCase();
      const cleanStudentId = String(student.studentId || "student").replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase() || "STUDENT";\r
      const dateKey = imposedAt.toISOString().slice(0, 10).replace(/-/g, "");\r
      return {\r
        amount: Number(amount || 0),\r
        month,\r
        date: imposedAt,\r
        status: "Imposed",\r
        remarks: imposeConfig.remarks || "",\r
        imposedBy: currentUser?.email || "",\r
        previousAssignedAmount: Number(previousTotal || 0),\r
        newAssignedAmount: Number(previousTotal || 0) + Number(amount || 0),\r
        transactionId: \`IMP-\${cleanStudentId}-\${dateKey}-\${Date.now().toString().slice(-6)}\`,
        impositionKey: [
          "bulk",
          activeSessionId || activeSessionLabel || "current",
          String(student.studentId || student.id || "student").trim().toLowerCase(),
          normalizeFeeMonth(month).toLowerCase(),
          "monthly",
          runId
        ].join("|")
      };
    }

    function getPaymentReceivedAmount(payment = {}) {
      const declared = Number(payment.receivedAmount ?? payment.fullAmount ?? 0);
      const allocated = Number(payment.appliedAmount ?? payment.amount ?? 0) + Number(payment.extraAmount || 0);
      return Math.max(0, Number.isFinite(declared) ? declared : 0, Number.isFinite(allocated) ? allocated : 0);
    }

    function rebalanceAdvancePayments(fee, assignedTotal) {
      const targetTotal = Math.max(0, Number(assignedTotal || 0));
      let assignmentLeft = targetTotal;
      let paymentCollected = 0;
      const payments = (Array.isArray(fee.payments) ? fee.payments : []).map((payment) => {
        const receivedAmount = getPaymentReceivedAmount(payment);
        const appliedAmount = Math.min(receivedAmount, assignmentLeft);
        const extraAmount = Math.max(0, receivedAmount - appliedAmount);
        assignmentLeft = Math.max(0, assignmentLeft - appliedAmount);
        paymentCollected += receivedAmount;
        return {
          ...payment,
          receivedAmount,
          appliedAmount,
          extraAmount,
          amount: appliedAmount,
          status: extraAmount > 0 ? "Applied with extra" : assignmentLeft <= 0 ? "Paid" : "Partial paid"
        };
      });

      const storedCollected = Math.max(
        0,
        Number(fee.totalCollectedAmount || 0),
        getTotalPaidAmount(fee) + getTotalExtraPaidAmount(fee)
      );
      const totalCollected = Math.max(paymentCollected, storedCollected);
      const totalPaidAmount = Math.min(targetTotal, totalCollected);
      const totalExtraPaidAmount = Math.max(0, totalCollected - totalPaidAmount);
      const remainingAmount = Math.max(0, targetTotal - totalPaidAmount);
      return { payments, totalCollected, totalPaidAmount, totalExtraPaidAmount, remainingAmount };
    }

    function buildSameMonthImpositionUpdate(student, fee, imposedAmount) {
      const fineAmount = getTotalFineAmount(fee);
      const currentTotal = Math.max(0, Number(fee.originalAmount ?? fee.amount ?? 0));
      const currentPrincipal = Math.max(0, currentTotal - fineAmount);
      const principalAmount = Math.max(0, Number(imposedAmount || 0));
      if (principalAmount <= 0) return null;

      const impositionEntry = buildImpositionEntry(student, principalAmount, currentPrincipal);
      const rawImpositions = uniqueImpositionEntries(fee);
      const alreadyApplied = rawImpositions.some((entry) =>
        String(entry.impositionKey || "").toLowerCase() === String(impositionEntry.impositionKey || "").toLowerCase()
      );
      if (alreadyApplied) return { alreadyApplied: true, updateData: null };

      const existingImpositions = currentPrincipal > 0
        ? limitImpositionsToPrincipal(rawImpositions, currentPrincipal)
        : [];
      const coveredPrincipal = existingImpositions.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
      const missingExistingPrincipal = Math.max(0, currentPrincipal - coveredPrincipal);
      if (missingExistingPrincipal > 0) {
        existingImpositions.push({
          amount: missingExistingPrincipal,
          month: normalizeFeeMonth(fee.month || imposeConfig.month),
          date: fee.imposedDate || fee.date || fee.createdAt || new Date(),
          status: fee.manualEntry ? "Manual entry" : "Imposed",
          remarks: fee.impositionRemark || fee.remarks || "",
          imposedBy: "",
          previousAssignedAmount: coveredPrincipal,
          newAssignedAmount: currentPrincipal,
          transactionId: fee.entryTransactionId || "",
          impositionKey: [
            "existing",
            fee.sessionId || fee.session || activeSessionId || activeSessionLabel || "current",
            String(fee.studentId || student.studentId || "student").trim().toLowerCase(),
            normalizeFeeMonth(fee.month || imposeConfig.month).toLowerCase(),
            feeTypeIdentity(fee),
            fee.id || "monthly-record"
          ].join("|")
        });
      }

      const assignedTotal = currentTotal + principalAmount;
      const allocation = rebalanceAdvancePayments(fee, assignedTotal);
      const impositions = uniqueBySignature(
        [...existingImpositions, impositionEntry],
        (entry) => String(entry.impositionKey || [normalizeFeeMonth(entry.month || fee.month || ""), entry.amount || 0].join("|")).toLowerCase()
      );

      return { alreadyApplied: false, updateData: {
        studentName: student.studentName,
        class: student.class,
        section: student.section,
        roll: student.roll,
        amount: assignedTotal,
        originalAmount: assignedTotal,
        paidAmount: allocation.totalPaidAmount,
        totalPaidAmount: allocation.totalPaidAmount,
        totalExtraPaidAmount: allocation.totalExtraPaidAmount,
        totalCollectedAmount: allocation.totalCollected,
        remainingAmount: allocation.remainingAmount,
        status: allocation.remainingAmount <= 0 ? "Paid" : allocation.totalPaidAmount > 0 ? "Partial" : "Imposed",
        remarks: imposeConfig.remarks || fee.remarks || "",
        impositionRemark: imposeConfig.remarks || fee.impositionRemark || "",
        impositions,
        payments: allocation.payments,
        imposedDate: impositionEntry.date,
        ...sessionFeeFields(),
        updatedAt: serverTimestamp()
      }};
    }

    function getFineDetails(fee) {
      return Array.isArray(fee.fineDetails) ? fee.fineDetails : [];\r
    }\r
\r
    function getTotalFineAmount(fee) {\r
      const stored = Number(fee.fineAmount || fee.totalFineAmount || 0);\r
      if (Number.isFinite(stored) && stored > 0) return stored;\r
      return getFineDetails(fee).reduce((sum, fine) => sum + Number(fine.amount || 0), 0);\r
    }\r
\r
    function getFineRuleKey(config) {\r
      const sessionKey = activeSessionId || activeSessionLabel || "current";\r
      return ["late-fee", sessionKey, config.month].join("-");\r
    }\r
\r
    function fineDetailMatchesRule(fine, ruleKey, config) {\r
      if (!fine) return false;\r
      if (fine.ruleKey === ruleKey) return true;\r
      return fine.type === "late-fee-fine" && String(fine.month || "").toLowerCase() === String(config.month || "").toLowerCase();\r
    }\r
\r
    async function getSavedFineRules() {\r
      if (!activeSchoolId) return {};\r
      const snap = await getDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"));\r
      return snap.exists() ? (snap.data()?.rules || {}) : {};\r
    }\r
\r
    function clampDueDate(year, monthIndex, dueDay) {\r
      const lastDay = new Date(year, monthIndex + 1, 0).getDate();\r
      return new Date(year, monthIndex, Math.min(dueDay, lastDay), 23, 59, 59, 999);\r
    }\r
\r
    function getLateFinePeriods(month, dueDay, frequency, today = new Date()) {\r
      const monthIndex = monthOrder.indexOf(month);\r
      if (monthIndex < 0 || !dueDay) return { periods: 0, dueDate: null, daysLate: 0 };\r
      const dueDate = clampDueDate(today.getFullYear(), monthIndex, dueDay);\r
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());\r
      const dueStart = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());\r
      const daysLate = Math.max(0, Math.floor((todayStart - dueStart) / 86400000));\r
      if (daysLate <= 0) return { periods: 0, dueDate, daysLate: 0 };\r
      if (frequency === "weekly") return { periods: Math.ceil(daysLate / 7), dueDate, daysLate };\r
      if (frequency === "monthly") return { periods: Math.ceil(daysLate / 30), dueDate, daysLate };\r
      return { periods: daysLate, dueDate, daysLate };\r
    }\r
\r
    function fineReasonText({ month, dueDay, frequency, fineAmount, periods, dueDate, daysLate }) {\r
      const label = frequency === "daily" ? "Daily" : frequency === "weekly" ? "Weekly" : "Monthly";\r
      return \`\${label} late fee fine for \${month}: last payment day \${dueDay} (\${formatDateTime(dueDate)}), \${daysLate} day(s) late, \${periods} period(s) x ₹\${Number(fineAmount).toLocaleString()}.\`;\r
    }\r
\r
    function getTotalExtraBalance(fees = currentHistoryFees) {\r
      return fees.reduce((sum, fee) => sum + getFeeAmounts(fee).extra, 0);\r
    }\r
\r
    function compactId(value, fallback = "-") {\r
      const raw = String(value || "").trim();\r
      if (!raw) return fallback;\r
      return raw.length > 20 ? \`\${raw.slice(0, 8)}...\${raw.slice(-6)}\` : raw;\r
    }\r
\r
    function generatedFeeTxnId(fee, index) {\r
      const base = String(fee.id || \`\${fee.studentId || "student"}-\${fee.month || "fee"}\`)\r
        .replace(/[^a-zA-Z0-9]/g, "")\r
        .slice(-8)\r
        .toUpperCase() || "FEE";\r
      return \`TXN-\${base}-\${String(index + 1).padStart(2, "0")}\`;\r
    }\r
\r
    function getFeeTransactionIds(fee) {\r
      const ids = [];\r
      const addId = (value) => {\r
        const raw = String(value || "").trim();\r
        if (raw && !ids.some((id) => id.toLowerCase() === raw.toLowerCase())) ids.push(raw);\r
      };\r
\r
      addId(fee.entryTransactionId);\r
      addId(fee.lastRazorpayPaymentId || fee.lastPaymentId || fee.lastTransactionId);\r
      (Array.isArray(fee.impositions) ? fee.impositions : []).forEach((imposition) => addId(imposition.transactionId));\r
      (Array.isArray(fee.payments) ? fee.payments : []).forEach((payment, index) => {\r
        addId(payment.transactionId || payment.txnId || payment.paymentId || payment.razorpayPaymentId || payment.razorpay_payment_id || payment.razorpay_order_id || generatedFeeTxnId(fee, index));\r
      });\r
      getFineDetails(fee).forEach((fine, index) => {\r
        const ruleKey = String(fine.ruleKey || \`\${fee.id || fee.month || "fee"}-fine-\${index}\`);\r
        addId(\`FINE-\${ruleKey.replace(/[^a-zA-Z0-9]/g, "").slice(-14).toUpperCase()}-\${String(index + 1).padStart(2, "0")}\`);\r
      });\r
      return ids;\r
    }\r
\r
    function renderFeeTransactionIds(fee) {\r
      const ids = getFeeTransactionIds(fee);\r
      if (!ids.length) return "-";\r
      const shown = ids.slice(0, 3).map((id) => \`<span title="\${esc(id)}">\${esc(compactId(id))}</span>\`).join("<br>");\r
      return ids.length > 3 ? \`\${shown}<br><span title="\${esc(ids.slice(3).join(", "))}">+\${ids.length - 3} more</span>\` : shown;\r
    }\r
\r
    function feeMatchesPaymentSearch(fee, searchTerm) {\r
      const needle = String(searchTerm || "").toLowerCase();\r
      if (!needle) return true;\r
      return getFeeTransactionIds(fee).some((id) => id.toLowerCase().includes(needle));\r
    }\r
\r
    function feeDateValue(fee) {\r
      const raw = fee.updatedAt?.toDate?.() || fee.date?.toDate?.() || fee.updatedAt || fee.date || 0;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? 0 : date.getTime();\r
    }\r
\r
    function reportEntryDateValue(entry) {\r
      const raw = entry.entryDate?.toDate?.() || entry.entryDate || entry.updatedAt?.toDate?.() || entry.date?.toDate?.() || entry.updatedAt || entry.date || 0;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? 0 : date.getTime();\r
    }\r
\r
    function reportEntryDateText(entry) {\r
      const raw = entry.entryDate?.toDate?.() || entry.entryDate || entry.date?.toDate?.() || entry.date;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-IN");\r
    }\r
\r
    function buildReportEntries(fees = allFees) {\r
      const entries = [];\r
      fees.forEach((fee) => {\r
        const impositions = getImpositionEntries(fee);\r
        const fineAmount = getTotalFineAmount(fee);\r
        const fallbackAmount = Math.max(0, Number(fee.originalAmount || fee.amount || 0) - fineAmount);\r
        const baseEntry = {\r
          ...fee,\r
          reportFeeId: fee.id,\r
          reportEntryId: \`\${fee.id || fee.studentId || "fee"}_base\`,\r
          reportEntryType: fee.autoImposed ? "Auto imposed" : fee.manualEntry ? "Manual entry" : "Fee imposed",\r
          entryAmount: fallbackAmount || Number(fee.originalAmount || fee.amount || 0),\r
          entryDate: fee.imposedDate || fee.date || fee.createdAt || fee.updatedAt,\r
          entryRemark: fee.impositionRemark || fee.remarks || ""\r
        };\r
\r
        if (impositions.length) {
          const principalAmount = impositions.reduce((sum, imposition) => sum + Number(imposition.amount || 0), 0) || fallbackAmount;
          entries.push({
            ...fee,
            reportFeeId: fee.id,
            reportEntryId: \`\${fee.id || fee.studentId || "fee"}_imposition\`,
            reportEntryType: "Fee imposed",
            reportIncludesExtraPayment: true,
            entryAmount: principalAmount,
            entryDate: impositions[0]?.date || fee.imposedDate || fee.date || fee.updatedAt,
            entryRemark: impositions.map((imposition) => imposition.remarks).filter(Boolean).join(", ") || fee.impositionRemark || fee.remarks || "",
            entryTransactionId: impositions.map((imposition) => imposition.transactionId).filter(Boolean).join(", ")
          });
        } else {
          entries.push(baseEntry);
        }
\r
        getFineDetails(fee).forEach((fine, index) => {\r
          const amount = Number(fine.amount || 0);\r
          if (amount <= 0) return;\r
          entries.push({\r
            ...fee,\r
            reportFeeId: fee.id,\r
            reportEntryId: \`\${fee.id || fee.studentId || "fee"}_fine_\${index}\`,\r
            reportEntryType: "Fine",\r
            entryAmount: amount,\r
            entryDate: fine.date || fee.updatedAt || fee.date,\r
            entryRemark: fine.reason || fee.lastFineReason || "Late fee fine",\r
            entryTransactionId: \`FINE-\${String(fine.ruleKey || fee.id || fee.month || "fee").replace(/[^a-zA-Z0-9]/g, "").slice(-14).toUpperCase()}-\${String(index + 1).padStart(2, "0")}\`\r
          });\r
        });\r
\r
      });\r
      return entries.sort((a, b) => reportEntryDateValue(b) - reportEntryDateValue(a));\r
    }\r
\r
    function getTotalExtraPaidAmount(entry) {\r
      const stored = Number(entry.totalExtraPaidAmount || 0);\r
      if (Number.isFinite(stored) && stored > 0) return stored;\r
      return (Array.isArray(entry.payments) ? entry.payments : [])\r
        .reduce((sum, payment) => sum + Number(payment.extraAmount || 0), 0);\r
    }\r
\r
    function getReportEntryPaidAmount(entry) {\r
      if (entry.reportEntryType === "Fine") return 0;\r
      const entryAmount = Number(entry.entryAmount ?? entry.originalAmount ?? entry.amount ?? 0);\r
      const totalPaid = getTotalPaidAmount(entry);\r
      const extraPaid = entry.reportIncludesExtraPayment === false ? 0 : getTotalExtraPaidAmount(entry);\r
      if (entryAmount <= 0 && (totalPaid > 0 || extraPaid > 0)) return totalPaid + extraPaid;\r
      const totalFine = getTotalFineAmount(entry);\r
      const principalTotal = Math.max(0, Number(entry.originalAmount || entry.amount || 0) - totalFine);\r
      if (entryAmount <= 0 || principalTotal <= 0) return extraPaid;\r
      const appliedForEntry = totalPaid > 0 ? Math.min(entryAmount, Math.round((totalPaid * entryAmount) / principalTotal)) : 0;\r
      return appliedForEntry + extraPaid;\r
    }\r
\r
    function isExtraAdjustmentPayment(payment) {\r
      const text = \`\${payment?.status || ""} \${payment?.note || ""}\`.toLowerCase();\r
      return text.includes("adjusted from extra") || text.includes("extra balance adjustment");\r
    }\r
\r
    function getReportEntryCollectedAmount(entry) {\r
      if (entry.reportEntryType === "Fine") return 0;\r
      const payments = Array.isArray(entry.payments) ? entry.payments : [];\r
      const cashApplied = payments.length\r
        ? payments.reduce((sum, payment) => sum + (isExtraAdjustmentPayment(payment) ? 0 : Number(payment.appliedAmount ?? payment.amount ?? 0)), 0)\r
        : getTotalPaidAmount(entry);\r
      const extraPaid = entry.reportIncludesExtraPayment === false ? 0 : getTotalExtraPaidAmount(entry);\r
      const entryAmount = Number(entry.entryAmount ?? entry.originalAmount ?? entry.amount ?? 0);\r
      if (entryAmount <= 0) return cashApplied + extraPaid;\r
      const totalFine = getTotalFineAmount(entry);\r
      const principalTotal = Math.max(0, Number(entry.originalAmount || entry.amount || 0) - totalFine);\r
      if (principalTotal <= 0) return extraPaid;\r
      const appliedForEntry = cashApplied > 0 ? Math.min(entryAmount, Math.round((cashApplied * entryAmount) / principalTotal)) : 0;\r
      return appliedForEntry + extraPaid;\r
    }\r
\r
    function getReportEntryStatus(entry) {\r
      if (entry.reportEntryType === "Fine") return "Imposed";\r
      const entryAmount = Number(entry.entryAmount ?? entry.originalAmount ?? entry.amount ?? 0);\r
      const paid = getReportEntryPaidAmount(entry);\r
      if (entryAmount <= 0 && paid > 0) return "Paid";\r
      if (entryAmount > 0 && paid >= entryAmount) return "Paid";\r
      if (paid > 0) return "Partial";\r
      return entry.status === "Pending" ? "Pending" : "Imposed";\r
    }\r
\r
    function findCurrentHistoryFee(month) {
      const wantedMonth = normalizeFeeMonth(month).toLowerCase();
      return currentHistoryFees
        .filter((fee) => fee.studentId === currentHistoryStudent?.studentId && normalizeFeeMonth(fee.month).toLowerCase() === wantedMonth)
        .sort((a, b) => feeDateValue(b) - feeDateValue(a))[0] || null;\r
    }\r
\r
    async function refreshCurrentHistory() {\r
      await loadAllReports();\r
      if (!currentHistoryStudent?.studentId) return;\r
      const history = allFees\r
        .filter((fee) => fee.studentId === currentHistoryStudent.studentId)\r
        .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
      displayHistoryModal(currentHistoryStudent.studentId, history);\r
    }\r
\r
    function buildHistoryPaymentUpdate(enteredAmount, fee, status, remarks) {\r
      const current = getFeeAmounts(fee);\r
      const payments = Array.isArray(fee.payments) ? [...fee.payments] : [];\r
\r
      if (status === "Paid") {\r
        const isZeroAssignedEntry = current.total <= 0 && current.due <= 0;\r
        const appliedNow = isZeroAssignedEntry ? enteredAmount : Math.min(enteredAmount, current.due);\r
        const extraNow = isZeroAssignedEntry ? 0 : Math.max(0, enteredAmount - current.due);\r
        const totalApplied = current.applied + appliedNow;\r
        const totalExtra = current.extra + extraNow;\r
        const remaining = Math.max(0, current.total - totalApplied);\r
        const totalCollected = totalApplied + totalExtra;\r
\r
        const newPayment = {\r
          receivedAmount: enteredAmount,\r
          appliedAmount: appliedNow,\r
          extraAmount: extraNow,\r
          amount: appliedNow,\r
          date: new Date(),\r
          status: extraNow > 0 ? "Applied with extra" : remaining === 0 ? "Paid" : "Partial paid",\r
          note: remarks || "Payment added from fees report",\r
          ledgerTransactionId: newLedgerTransactionId("FEE")\r
        };\r
        return {\r
          updateData: {\r
            amount: current.total,\r
            originalAmount: current.total,\r
            paidAmount: totalApplied,\r
            totalPaidAmount: totalApplied,\r
            totalExtraPaidAmount: totalExtra,\r
            totalCollectedAmount: totalCollected,\r
            remainingAmount: remaining,\r
            status: remaining === 0 ? "Paid" : "Partial",\r
            ...sessionFeeFields(),\r
            payments: [...payments, newPayment],\r
            lastPaymentAmount: enteredAmount,\r
            lastAppliedAmount: appliedNow,\r
            lastExtraAmount: extraNow,\r
            lastPaymentDate: serverTimestamp(),\r
            remarks: remarks || fee.remarks || "",\r
            updatedAt: serverTimestamp()\r
          },\r
          payment: newPayment,\r
          paymentIndex: payments.length,\r
          message: extraNow > 0\r
            ? \`Payment saved. ₹\${appliedNow.toLocaleString()} applied and ₹\${extraNow.toLocaleString()} stored as extra.\`\r
            : \`Payment saved. ₹\${appliedNow.toLocaleString()} applied to \${fee.month}.\`\r
        };\r
      }\r
\r
      const updatedTotal = current.total + enteredAmount;
      const updatedDue = Math.max(0, updatedTotal - current.applied);
      return {
        updateData: {
          status: updatedDue <= 0 ? "Paid" : current.applied > 0 ? "Partial" : status,
          amount: updatedTotal,
          originalAmount: updatedTotal,
          paidAmount: current.applied,
          totalPaidAmount: current.applied,
          totalExtraPaidAmount: current.extra,
          totalCollectedAmount: current.collected,
          remainingAmount: updatedDue,
          ...sessionFeeFields(),\r
          remarks: remarks || fee.remarks || "",\r
          updatedAt: serverTimestamp()\r
        },\r
        message: \`Same \${fee.month} entry updated. Assigned amount is now ₹\${updatedTotal.toLocaleString()}.\`\r
      };\r
    }\r
\r
    function formatDateTime(value) {\r
      const date = value?.toDate ? value.toDate() : new Date(value);\r
      if (!date || Number.isNaN(date.getTime())) return "N/A";\r
      return date.toLocaleString("en-IN");\r
    }\r
\r
    function esc(value) {\r
      return String(value ?? "")\r
        .replace(/&/g, "&amp;")\r
        .replace(/</g, "&lt;")\r
        .replace(/>/g, "&gt;")\r
        .replace(/"/g, "&quot;")\r
        .replace(/'/g, "&#39;");\r
    }\r
\r
    function normalizeClassValue(value) {\r
      return String(value ?? "")\r
        .trim()\r
        .replace(/^class\\s+/i, "")\r
        .toUpperCase();\r
    }\r
\r
    function studentMatchesClass(studentData, selectedClass) {\r
      const wanted = normalizeClassValue(selectedClass);\r
      return [studentData.class, studentData.currentClass, studentData.finalClass]\r
        .some((value) => normalizeClassValue(value) === wanted);\r
    }\r
\r
    async function getStudentsForImposition(selectedClass) {
      const students = new Map();
      const addStudent = (studentDoc) => {
        const studentData = studentDoc.data();
        if (studentData.tcIssued || !studentMatchesClass(studentData, selectedClass)) return;
        const studentId = studentData.studentId || studentDoc.id;
        const studentKey = String(studentId).trim().toLowerCase();
        if (students.has(studentKey)) return;
        students.set(studentKey, {
          id: studentDoc.id,
          studentId,
          studentName: studentData.studentName || studentData.name || \`Student-\${studentDoc.id.slice(0, 6)}\`,\r
          class: studentData.class || studentData.currentClass || selectedClass,\r
          section: studentData.section || '',\r
          roll: studentData.roll || studentData.rollNo || '',\r
          father: studentData.fatherName || studentData.father || 'N/A'\r
        });\r
      };\r
\r
      const exactSnap = await getDocs(query(\r
        collection(db, "schools", activeSchoolId, "students"),\r
        where("class", "==", selectedClass)\r
      ));\r
      exactSnap.forEach(addStudent);\r
\r
      if (!students.size) {\r
        const allSnap = await getDocs(collection(db, "schools", activeSchoolId, "students"));\r
        allSnap.forEach(addStudent);\r
      }\r
\r
      return Array.from(students.values());\r
    }\r
\r
    window.loadSectionsForImposeClass = async () => {\r
      const className = document.getElementById("imposeClass").value;\r
      const sectionSelect = document.getElementById("imposeSection");\r
      sectionSelect.innerHTML = \`<option value="">All Sections</option>\`;\r
      sectionSelect.disabled = true;\r
      studentsToImpose = [];\r
      document.getElementById("studentsPreview").innerHTML = "";\r
\r
      if (!className || !activeSchoolId) return;\r
\r
      try {\r
        const classStudents = await getStudentsForImposition(className);\r
        const sections = new Set();\r
        classStudents.forEach((student) => {\r
          const section = String(student.section || "").trim();\r
          if (section) sections.add(section);\r
        });\r
\r
        [...sections].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).forEach((section) => {\r
          sectionSelect.innerHTML += \`<option value="\${esc(section)}">Section \${esc(section)}</option>\`;\r
        });\r
        sectionSelect.disabled = false;\r
      } catch (error) {\r
        showToast("Unable to load sections: " + error.message, "error");\r
      }\r
    };\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) {\r
        window.location.href = "#/index.html";\r
      } else {\r
        currentUser = user;\r
        const userSnap = await getDoc(doc(db, "users", user.uid));\r
        if (!userSnap.exists()) {\r
          window.location.href = "#/index.html";\r
          return;\r
        }\r
        currentUserData = userSnap.data();\r
        const role = String(currentUserData.role || "").toLowerCase();\r
        if (role !== "admin" && role !== "accountant") {\r
          alert("Access denied. Only admin or accountant can manage fees.");\r
          window.location.href = "#/index.html";\r
          return;\r
        }\r
        activeSchoolId = role === "admin" ? user.uid : (currentUserData.adminId || currentUserData.schoolId || "");\r
        if (!activeSchoolId) {\r
          alert("Accountant account is not linked to a school admin.");\r
          window.location.href = "#/index.html";\r
          return;\r
        }\r
        if (role === "admin") {\r
          enableAdminNavigation();\r
        } else {\r
          enableAccountantWorkspace();\r
        }\r
        initializeFilters();\r
        await loadActiveSession();\r
        document.getElementById("reportsTable").innerHTML = '<div class="no-data">Loading all student fee records...</div>';\r
        setTimeout(() => loadAllReports(), 0);\r
      }\r
    });\r
\r
    // Same initializeFilters()...\r
    function initializeFilters() {
      const classSelect = document.getElementById("filterClass");
      const classList = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
      classList.forEach(c => {
        classSelect.innerHTML += \`<option value="\${c}">\${c}</option>\`;
      });
      classSelect.addEventListener("change", populateReportSections);
      populateReportSections();
    }

    function populateReportSections() {
      const classSelect = document.getElementById("filterClass");
      const sectionSelect = document.getElementById("filterSection");
      if (!classSelect || !sectionSelect) return;

      const selectedClass = classSelect.value;
      const previousSection = sectionSelect.value;
      const sections = new Set();
      allFees.forEach((fee) => {
        const feeClass = fee.class || fee.currentClass || fee.finalClass || "";
        const section = String(fee.section || "").trim();
        if ((!selectedClass || normalizeClassValue(feeClass) === normalizeClassValue(selectedClass)) && section) {
          sections.add(section);
        }
      });

      sectionSelect.innerHTML = \`<option value="">All Sections</option>\` +
        [...sections]
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          .map((section) => \`<option value="\${esc(section)}">Section \${esc(section)}</option>\`)
          .join("");
      sectionSelect.disabled = sections.size === 0;
      if (sections.has(previousSection)) sectionSelect.value = previousSection;
    }
\r
    function showToast(message, type = 'success') {\r
      const toast = document.createElement('div');\r
      toast.style.cssText = \`\r
    position: fixed; top: 20px; right: 20px; padding: 15px 25px; \r
    border-radius: 12px; color: white; z-index: 10000; font-weight: 600;\r
    background: \${type === 'success' ? '#15803d' :\r
          type === 'partial' ? '#0f766e' :\r
            '#b91c1c'};\r
    box-shadow: 0 10px 24px rgba(15,23,42,0.18);\r
  \`;\r
      toast.textContent = message;\r
      document.body.appendChild(toast);\r
      setTimeout(() => toast.remove(), 4000);\r
    }\r
\r
    function displayReports() {\r
      rowsPerPage = parseInt(document.getElementById("rowsPerPage").value);\r
      const startIndex = (currentPage - 1) * rowsPerPage;\r
      const endIndex = startIndex + rowsPerPage;\r
      const paginatedFees = filteredFees.slice(startIndex, endIndex);\r
\r
      if (paginatedFees.length === 0) {\r
        document.getElementById("reportsTable").innerHTML = '<div class="no-data">No matching records found</div>';\r
        document.getElementById("pagination").innerHTML = '';\r
        return;\r
      }\r
\r
      let html = \`\r
    <table>\r
      <thead>\r
        <tr>\r
          <th><input type="checkbox" id="selectAll" onclick="toggleSelectAll()"></th>\r
          <th>Student ID</th>\r
          <th>Name</th>\r
          <th>Class</th>\r
          <th>Month</th>\r
          <th>Original</th>\r
          <th>Actually Paid</th>\r
          <th>Transaction IDs</th>\r
          <th>Remark</th>\r
          <th>Status</th>\r
          <th>Date</th>\r
          <th>Actions</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
  \`;\r
\r
      paginatedFees.forEach(fee => {\r
        const feeId = fee.reportFeeId || fee.id;\r
        const isSelected = selectedRows.has(feeId);\r
        const originalAmount = Number(fee.entryAmount ?? fee.originalAmount ?? fee.amount ?? 0);\r
        const totalPaidAmount = getReportEntryPaidAmount(fee);\r
        const fineAmount = fee.reportEntryType === "Fine" ? originalAmount : 0;\r
        const correctStatus = getReportEntryStatus(fee);\r
        const dateStr = reportEntryDateText(fee);\r
        const paymentIdsHtml = renderFeeTransactionIds(fee);\r
\r
        let statusHtml = \`<span class="status-\${correctStatus.toLowerCase()}">\${correctStatus}</span>\`;\r
        if (correctStatus === 'Partial') {\r
          const progress = originalAmount > 0 ? Math.round((totalPaidAmount / originalAmount) * 100) : 0;\r
          statusHtml = \`<span class="status-partial" onclick="showPartialDetailsById('\${fee.id}')" style="cursor:pointer;">PARTIAL (\${progress}%)</span>\`;\r
        }\r
        const fineLineHtml = fineAmount > 0 ? \`<div style="font-size:12px;color:#b45309;margin-top:4px;">Fine ₹\${fineAmount.toLocaleString()}</div>\` : "";\r
\r
        html += \`\r
      <tr class="\${isSelected ? 'selected' : ''}" ondblclick="viewStudentHistory('\${fee.studentId || ''}')">\r
        <td class="report-print-hidden"><input type="checkbox" class="row-checkbox" data-id="\${feeId}" \${isSelected ? 'checked' : ''} onchange="toggleRowSelection('\${feeId}')"></td>
        <td><strong>\${fee.studentId || 'N/A'}</strong></td>\r
        <td ondblclick="viewStudentHistory('\${fee.studentId || ''}')">\${fee.studentName || 'N/A'}</td>\r
        <td>\${fee.class || ''}\${fee.section ? \`-\${fee.section}\` : ''}</td>\r
        <td>\${fee.month || 'N/A'}<div style="font-size:11px;color:#64748b;margin-top:3px;">\${esc(fee.reportEntryType || "Fee entry")}</div></td>\r
        <td>₹\${originalAmount.toLocaleString()}\${fineLineHtml}</td>\r
        <td>₹\${totalPaidAmount.toLocaleString()}</td>\r
        <td style="font-size:12px;color:#334155;max-width:150px;word-break:break-all;line-height:1.45;">\${paymentIdsHtml}</td>\r
        <td style="font-size:12px;color:#475569;max-width:220px;white-space:normal;">\${esc(fee.entryRemark || fee.remarks || fee.impositionRemark || fee.lastFineReason || '-')}</td>\r
        <td style="min-width: 150px;">\${statusHtml}</td>\r
        <td>\${dateStr}</td>\r
        <td class="report-print-hidden">
          <div class="action-buttons">\r
            <button class="btn btn-sm btn-info" onclick="viewStudentHistoryByFee('\${feeId}')" title="View History">History</button>\r
            <button class="btn btn-sm btn-partial" onclick="showPartialDetailsById('\${feeId}')" title="Add Payment">Add Payment</button>\r
          </div>\r
        </td>\r
      </tr>\r
    \`;\r
      });\r
\r
      html += '</tbody></table>';\r
      document.getElementById("reportsTable").innerHTML = html;\r
      renderPagination();\r
    }\r
\r
    function updateStats(reportRows) {\r
      const fees = sourceFeesForReportRows(reportRows);\r
      let totalImposed = 0, totalPending = 0, totalUnpaid = 0, totalFeesPaid = 0;\r
\r
      fees.forEach(fee => {\r
        const amounts = getFeeAmounts(fee);\r
        totalImposed += amounts.total;\r
        totalFeesPaid += amounts.collected;\r
        totalUnpaid += amounts.due;\r
        if (getCorrectStatus(fee) === "Pending") totalPending += amounts.due;\r
      });\r
\r
      document.getElementById("totalImposed").textContent = \`₹\${totalImposed.toLocaleString()}\`;\r
      document.getElementById("totalPaid").textContent = \`₹\${totalFeesPaid.toLocaleString()}\`;\r
      document.getElementById("totalPending").textContent = \`₹\${totalPending.toLocaleString()}\`;\r
      document.getElementById("totalUnpaid").textContent = \`₹\${totalUnpaid.toLocaleString()}\`;\r
      document.getElementById("grandTotal").textContent = \`₹\${totalFeesPaid.toLocaleString()}\`;\r
      document.getElementById("selectedCount").textContent = selectedRows.size;\r
      document.getElementById("totalRecords").textContent = \`(\${fees.length} fee records / \${reportRows.length} report entries)\`;\r
      updateFeeAnalytics(reportRows);\r
    }\r
\r
    window.markSelectedAsPartial = async () => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      if (selectedRows.size === 0) {\r
        showToast("Select rows first.", 'error');\r
        return;\r
      }\r
      const tcBlocked = Array.from(selectedRows).filter((feeId) => {\r
        const fee = allFees.find((f) => f.id === feeId);\r
        return fee && studentTcMap[fee.studentId];\r
      });\r
      if (tcBlocked.length) {\r
        showToast("TC issued for one or more selected students - fee updates are blocked.", "error");\r
        return;\r
      }\r
\r
      const partialAmount = prompt(\`Enter payment amount for \${selectedRows.size} fees:\\n\\nAmount per fee (₹):\`);\r
\r
      if (!partialAmount || parseFloat(partialAmount) <= 0) {\r
        showToast("Enter valid amount.", 'error');\r
        return;\r
      }\r
      const paymentMode = askPaymentMode();\r
      if (!paymentMode) return;\r
\r
      if (!confirm(\`Add ₹\${parseFloat(partialAmount).toLocaleString()} to \${selectedRows.size} fees?\`)) {\r
        return;\r
      }\r
\r
      const btn = document.querySelector('.top-bar .btn-partial');\r
      const originalText = btn.innerHTML;\r
      btn.innerHTML = '<span class="loading"></span> Processing...';\r
      btn.disabled = true;\r
\r
      try {\r
        const updatePromises = Array.from(selectedRows).map(async (feeId) => {\r
          const fee = allFees.find(f => f.id === feeId);\r
          if (fee) {\r
            const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
            const totalPaidSoFar = getTotalPaidAmount(fee);\r
            const paymentAmount = parseFloat(partialAmount);\r
            const newTotalPaid = totalPaidSoFar + paymentAmount;\r
            const newStatus = newTotalPaid >= originalAmount ? 'Paid' : 'Partial';\r
\r
            const currentPayments = fee.payments || [];\r
            const newPayment = {\r
              amount: paymentAmount,\r
              date: new Date(),\r
              note: 'Bulk partial payment',\r
              ...paymentMode,\r
              ledgerTransactionId: newLedgerTransactionId("FEE")\r
            };\r
\r
            await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
              status: newStatus,\r
              totalPaidAmount: newTotalPaid,\r
              paidAmount: paymentAmount,\r
              remainingAmount: Math.max(0, originalAmount - newTotalPaid),\r
              ...sessionFeeFields(),\r
              payments: [...currentPayments, newPayment],\r
              lastPaymentAmount: paymentAmount,\r
              lastPaymentDate: serverTimestamp()\r
            });\r
            await syncReceivedFee(feeId, fee, newPayment, currentPayments.length);\r
          }\r
        });\r
\r
        await Promise.all(updatePromises);\r
        showToast(\`\${selectedRows.size} fees updated.\`, 'partial');\r
        selectedRows.clear();\r
        loadAllReports();\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      } finally {\r
        btn.innerHTML = originalText;\r
        btn.disabled = false;\r
      }\r
    };\r
\r
    window.markSelectedAsPaid = async () => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      if (selectedRows.size === 0) {\r
        showToast("Select rows first.", 'error');\r
        return;\r
      }\r
      const tcBlocked = Array.from(selectedRows).filter((feeId) => {\r
        const fee = allFees.find((f) => f.id === feeId);\r
        return fee && studentTcMap[fee.studentId];\r
      });\r
      if (tcBlocked.length) {\r
        showToast("TC issued for one or more selected students - fee updates are blocked.", "error");\r
        return;\r
      }\r
\r
      const paymentMode = askPaymentMode();\r
      if (!paymentMode) return;\r
      if (!confirm(\`Mark \${selectedRows.size} fees as fully paid?\`)) return;\r
\r
      const btn = document.querySelector('.top-bar .btn-success');\r
      const originalText = btn.innerHTML;\r
      btn.innerHTML = '<span class="loading"></span> Marking Paid...';\r
      btn.disabled = true;\r
\r
      try {\r
        const updatePromises = Array.from(selectedRows).map(async (feeId) => {\r
          const fee = allFees.find(f => f.id === feeId);\r
          const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
          const amountReceived = Math.max(0, originalAmount - getTotalPaidAmount(fee));\r
          if (amountReceived <= 0) return;\r
          const currentPayments = fee.payments || [];\r
          const newPayment = {\r
            amount: amountReceived,\r
            receivedAmount: amountReceived,\r
            appliedAmount: amountReceived,\r
            date: new Date(),\r
            note: 'Marked fully paid from Reports',\r
            ...paymentMode,\r
            ledgerTransactionId: newLedgerTransactionId("FEE")\r
          };\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
            status: "Paid",\r
            totalPaidAmount: originalAmount,\r
            paidAmount: originalAmount,\r
            remainingAmount: 0,\r
            ...sessionFeeFields(),\r
            payments: [...currentPayments, newPayment],\r
            datePaid: serverTimestamp()\r
          });\r
          await syncReceivedFee(feeId, fee, newPayment, currentPayments.length);\r
        });\r
\r
        await Promise.all(updatePromises);\r
        showToast(\`\${selectedRows.size} fees marked fully paid.\`, 'success');\r
        selectedRows.clear();\r
        loadAllReports();\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      } finally {\r
        btn.innerHTML = originalText;\r
        btn.disabled = false;\r
      }\r
    };\r
\r
    window.markFeeAsPartial = async (feeId) => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      const partialAmount = prompt("Enter partial payment amount:");\r
      if (!partialAmount || parseFloat(partialAmount) <= 0) return;\r
      const paymentMode = askPaymentMode();\r
      if (!paymentMode) return;\r
\r
      try {\r
        const fee = allFees.find(f => f.id === feeId);\r
        const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
        const totalPaidSoFar = getTotalPaidAmount(fee);\r
        const paymentAmount = parseFloat(partialAmount);\r
        const newTotalPaid = totalPaidSoFar + paymentAmount;\r
\r
        const currentPayments = fee.payments || [];\r
        const newPayment = {\r
          amount: paymentAmount,\r
          receivedAmount: paymentAmount,\r
          appliedAmount: paymentAmount,\r
          date: new Date(),\r
          note: 'Single partial payment',\r
          ...paymentMode,\r
          ledgerTransactionId: newLedgerTransactionId("FEE")\r
        };\r
        await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
          status: newTotalPaid >= originalAmount ? 'Paid' : 'Partial',\r
          totalPaidAmount: newTotalPaid,\r
          paidAmount: paymentAmount,\r
          remainingAmount: Math.max(0, originalAmount - newTotalPaid),\r
          ...sessionFeeFields(),\r
          payments: [...currentPayments, newPayment]\r
        });\r
        await syncReceivedFee(feeId, fee, newPayment, currentPayments.length);\r
        showToast(\`₹\${paymentAmount.toLocaleString()} added.\`, 'partial');\r
        loadAllReports();\r
      } catch (error) {
        showToast("Error: " + error.message, 'error');
      }
    };
\r
    async function fetchFeeReportDocs() {\r
      const feesRef = collection(db, "schools", activeSchoolId, "fees");\r
      try {\r
        return await getDocs(query(feesRef, orderBy("date", "desc")));\r
      } catch (error) {\r
        console.warn("Ordered fee fetch failed; falling back to unordered fetch.", error);\r
        return await getDocs(feesRef);\r
      }\r
    }\r
\r
    function feeRecordsFromSnapshot(snapshot) {
      const loadedFees = [];
      snapshot.forEach(doc => {
        const fee = { id: doc.id, ...doc.data() };
        if (feeBelongsToActiveSession(fee)) loadedFees.push(fee);
      });
      return loadedFees;
    }

    function hydrateAllFeesFromSnapshot(snapshot) {
      const loadedFees = feeRecordsFromSnapshot(snapshot);
      allFees = mergeDuplicateFeeRecords(loadedFees);
      allFees.sort((a, b) => feeDateValue(b) - feeDateValue(a));
    }

    async function fetchCleanFeeSnapshot({ silent = true } = {}) {
      let snapshot = await fetchFeeReportDocs();
      const cleanupResult = await cleanupDuplicateFeeRecords(feeRecordsFromSnapshot(snapshot), { silent });
      if (cleanupResult.groupsFixed || cleanupResult.docsDeleted || cleanupResult.docsUpdated) {
        snapshot = await fetchFeeReportDocs();
      }
      return { snapshot, cleanupResult };
    }

    function snapshotRows(snapshot) {
      const rows = [];
      snapshot.forEach((item) => rows.push({ id: item.id, ...item.data() }));
      return rows;
    }

    async function deleteDocsInCollection(collectionName, predicate = () => true) {
      const snap = await getDocs(collection(db, "schools", activeSchoolId, collectionName));
      const rows = snapshotRows(snap).filter(predicate);
      let deleted = 0;
      for (const row of rows) {
        await deleteDoc(doc(db, "schools", activeSchoolId, collectionName, row.id));
        deleted++;
      }
      return deleted;
    }

    function isFeeAccountEntry(entry = {}) {
      const sourceType = String(entry.sourceType || "").toLowerCase();
      const category = String(entry.category || "").toLowerCase();
      const reason = String(entry.reason || "").toLowerCase();
      return sourceType === "student_fee" ||
        category === "fees" ||
        Boolean(entry.feeMonth) ||
        reason.includes("fee received");
    }
\r
    async function refreshStudentTcMap() {\r
      try {\r
        const stSnap = await getDocs(collection(db, "schools", activeSchoolId, "students"));\r
        studentTcMap = {};\r
        stSnap.forEach((d) => {\r
          const data = d.data();\r
          const sid = data.studentId || d.id;\r
          studentTcMap[sid] = !!data.tcIssued;\r
        });\r
      } catch (error) {\r
        console.warn("Student TC map load failed; fee records will still render.", error);\r
      }\r
    }\r
\r
    async function runAutoFineAfterReportLoad() {\r
      if (autoFineApplying || activeSessionLocked || !activeSchoolId) return;\r
      try {\r
        const autoResult = await autoApplyDueFineRules();\r
        if (autoResult.appliedCount > 0) {\r
          const refreshedSnapshot = await fetchFeeReportDocs();\r
          hydrateAllFeesFromSnapshot(refreshedSnapshot);\r
          filteredFees = buildReportEntries(allFees);\r
          displayReports();\r
          updateStats(filteredFees);\r
          renderDailyTransactions();\r
          showToast(\`Auto fine applied: Rs \${autoResult.totalFine.toLocaleString()} on \${autoResult.appliedCount} student(s).\`, "partial");\r
        }\r
      } catch (error) {\r
        console.warn("Background auto fine failed:", error);\r
      }\r
    }\r
\r
    window.loadAllReports = async () => {
      try {
        await loadActiveSession();
        const { snapshot, cleanupResult } = await fetchCleanFeeSnapshot({ silent: true });
        hydrateAllFeesFromSnapshot(snapshot);
        populateReportSections();
        filteredFees = buildReportEntries(allFees);
        currentPage = 1;
        displayReports();
        updateStats(filteredFees);
        renderDailyTransactions();\r
        showToast(\`\${allFees.length} records loaded\${activeSessionLabel ? \` for \${activeSessionLabel}\` : ""}\${cleanupResult.docsDeleted ? \`, \${cleanupResult.docsDeleted} duplicate removed\` : ""}\`);
        setTimeout(async () => {
          await refreshStudentTcMap();
          await runAutoFineAfterReportLoad();
        }, 0);\r
      } catch (error) {\r
        console.error("Fee report load failed:", error);\r
        showToast("Error: " + error.message, 'error');
      }
    };

    window.cleanupDuplicateFeesNow = async () => {
      if (!ensureSessionEditable("Duplicate fee cleanup")) return;
      if (!confirm("Remove duplicate imposed fee records for the selected session? Payments and fines will be merged into one record before duplicates are deleted.")) return;
      try {
        await loadActiveSession();
        const { snapshot, cleanupResult } = await fetchCleanFeeSnapshot({ silent: true });
        hydrateAllFeesFromSnapshot(snapshot);
        filteredFees = buildReportEntries(allFees);
        currentPage = 1;
        displayReports();
        updateStats(filteredFees);
        renderDailyTransactions();\r
        if (cleanupResult.docsDeleted) {
          showToast(\`\${cleanupResult.docsDeleted} duplicate fee record(s) removed.\`);
        } else {
          showToast("No duplicate fee records found.");
        }
      } catch (error) {
        console.error("Duplicate fee cleanup failed:", error);
        showToast("Cleanup failed: " + error.message, "error");
      }
    };

    window.deleteAllFeeRecordsNow = async () => {
      if (!ensureSessionEditable("Fee record deletion")) return;
      if (feeDeleteInProgress) return showToast("Fee record deletion is already running.", "error");
      const firstConfirm = confirm("Permanently delete ALL student fee records for this school? This removes imposed fees, payment history, fee transactions, and fee-linked account entries.");
      if (!firstConfirm) return;
      const typed = prompt('Type DELETE FEES to confirm permanent deletion.');
      if (String(typed || "").trim().toUpperCase() !== "DELETE FEES") {
        showToast("Deletion cancelled.", "error");
        return;
      }

      const btn = document.getElementById("deleteAllFeeRecordsBtn");
      try {
        feeDeleteInProgress = true;
        if (btn) {
          btn.disabled = true;
          btn.textContent = "Deleting...";
        }
        await loadActiveSession();

        const deletedFees = await deleteDocsInCollection("fees");
        const deletedOnlineTransactions = await deleteDocsInCollection("onlineFeeTransactions");
        const deletedFeeAccounts = await deleteDocsInCollection("accounts", isFeeAccountEntry);

        allFees = [];
        filteredFees = [];
        selectedRows.clear();
        currentPage = 1;
        displayReports();
        updateStats([]);
        const dailyDate = document.getElementById("dailyTransactionDate");\r
        if (dailyDate) dailyDate.value = "";\r
        renderDailyTransactions();\r
        document.getElementById("reportsTable").innerHTML = '<div class="no-data">All fee records deleted.</div>';
        document.getElementById("pagination").innerHTML = "";
        showToast(\`Deleted \${deletedFees} fee record(s), \${deletedOnlineTransactions} online transaction(s), and \${deletedFeeAccounts} fee account entry(s).\`);
      } catch (error) {
        console.error("Delete all fee records failed:", error);
        showToast("Delete failed: " + error.message, "error");
      } finally {
        feeDeleteInProgress = false;
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Delete All Fee Records";
        }
      }
    };

    window.loadReports = () => {
      const searchTerm = document.getElementById("searchStudent").value.toLowerCase();\r
      const selectedClass = document.getElementById("filterClass").value;
      const selectedSection = document.getElementById("filterSection").value;
      const selectedStatus = document.getElementById("filterStatus").value;\r
      const selectedMonth = document.getElementById("filterMonth").value;\r
\r
      filteredFees = buildReportEntries(allFees).filter(fee => {\r
        const correctStatus = getReportEntryStatus(fee);\r
        const matchesSearch = !searchTerm ||\r
          fee.studentName?.toLowerCase().includes(searchTerm) ||\r
          fee.studentId?.toLowerCase?.().includes(searchTerm) ||\r
          feeMatchesPaymentSearch(fee, searchTerm);\r
\r
        const matchesClass = !selectedClass || normalizeClassValue(fee.class || fee.currentClass || fee.finalClass) === normalizeClassValue(selectedClass);
        const matchesSection = !selectedSection || String(fee.section || "").trim().toLowerCase() === selectedSection.toLowerCase();
        const matchesStatus = !selectedStatus ||\r
          correctStatus === selectedStatus ||\r
          (selectedStatus === "Unpaid" && correctStatus === "Imposed");\r
        const matchesMonth = !selectedMonth || String(fee.month || "").toLowerCase() === String(selectedMonth).toLowerCase();\r
\r
        return matchesSearch && matchesClass && matchesSection && matchesStatus && matchesMonth;
      });\r
\r
      currentPage = 1;\r
      displayReports();\r
      updateStats(filteredFees);\r
    };\r
\r
    function renderPagination() {\r
      const totalPages = Math.ceil(filteredFees.length / rowsPerPage);\r
      if (!totalPages) {\r
        document.getElementById("pagination").innerHTML = "";\r
        return;\r
      }\r
      let html = \`\r
    <button class="pagination-btn \${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(1)">First</button>\r
    <button class="pagination-btn \${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(\${currentPage - 1})">Prev</button>\r
    <span class="page-info">Page \${currentPage} of \${totalPages} (\${filteredFees.length} total)</span>\r
    <button class="pagination-btn \${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(\${currentPage + 1})">Next</button>\r
    <button class="pagination-btn \${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(\${totalPages})">Last</button>\r
  \`;\r
      document.getElementById("pagination").innerHTML = html;\r
    }\r
\r
    window.changePage = (page) => {\r
      const totalPages = Math.ceil(filteredFees.length / rowsPerPage);\r
      if (page >= 1 && page <= totalPages) {\r
        currentPage = page;\r
        displayReports();\r
      }\r
    };\r
\r
    window.toggleRowSelection = (feeId) => {\r
      if (selectedRows.has(feeId)) {\r
        selectedRows.delete(feeId);\r
      } else {\r
        selectedRows.add(feeId);\r
      }\r
      updateStats(filteredFees);\r
    };\r
\r
    window.toggleSelectAll = () => {\r
      const selectAll = document.getElementById("selectAll");\r
      const checkboxes = document.querySelectorAll(".row-checkbox");\r
\r
      if (selectAll.checked) {\r
        checkboxes.forEach(cb => {\r
          selectedRows.add(cb.dataset.id);\r
          cb.checked = true;\r
        });\r
      } else {\r
        checkboxes.forEach(cb => {\r
          selectedRows.delete(cb.dataset.id);\r
          cb.checked = false;\r
        });\r
      }\r
      updateStats(filteredFees);\r
    };\r
\r
    window.exportToExcel = () => {\r
      let csv = 'Student ID,Student Name,Class,Section,Roll,Month,Entry Type,Entry Amount,Actually Paid,Remaining,Status,Remark,Date\\n';\r
\r
      filteredFees.forEach(fee => {\r
        const original = Number(fee.entryAmount ?? fee.originalAmount ?? fee.amount ?? 0);\r
        const totalPaid = getReportEntryPaidAmount(fee);\r
        const remaining = original - totalPaid;\r
        const correctStatus = getReportEntryStatus(fee);\r
        csv += \`"\${fee.studentId || ''}","\${(fee.studentName || '').replace(/"/g, '""')}","\${fee.class || ''}","\${fee.section || ''}","\${fee.roll || ''}","\${fee.month || ''}","\${fee.reportEntryType || 'Fee entry'}",\${original},\${totalPaid},\${remaining},"\${correctStatus}","\${(fee.entryRemark || fee.remarks || fee.impositionRemark || '').replace(/"/g, '""')}","\${reportEntryDateText(fee)}"\\n\`;\r
      });\r
\r
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });\r
      const url = URL.createObjectURL(blob);\r
      const a = document.createElement('a');\r
      a.href = url;\r
      a.download = \`\${getExportSchoolName()}_Fees_Report_\${new Date().toISOString().split('T')[0]}.csv\`;\r
      document.body.appendChild(a);\r
      a.click();\r
      document.body.removeChild(a);\r
      URL.revokeObjectURL(url);\r
      showToast("Excel exported.");\r
    };\r
\r
    window.printReport = () => {
      const previousPage = currentPage;
      const rowsSelect = document.getElementById("rowsPerPage");
      const previousRows = rowsSelect?.value || "10";
      currentPage = 1;
      if (rowsSelect) rowsSelect.value = "9999";
      displayReports();

      const restoreReport = () => {
        window.removeEventListener("afterprint", restoreReport);
        currentPage = previousPage;
        if (rowsSelect) rowsSelect.value = previousRows;
        displayReports();
      };
      window.addEventListener("afterprint", restoreReport);
      window.print();
    };
\r
    window.showPartialDetailsById = (feeId) => {\r
      const fee = allFees.find((entry) => entry.id === feeId);\r
      if (!fee) {\r
        showToast("Fee record not found.", "error");\r
        return;\r
      }\r
      currentPartialFee = fee;\r
      currentPartialFeeId = fee.id;\r
      const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
      const totalPaidAmount = getTotalPaidAmount(fee);\r
      const remaining = originalAmount - totalPaidAmount;\r
      const progress = originalAmount > 0 ? (totalPaidAmount / originalAmount * 100) : 0;\r
\r
      document.getElementById("partialDetailsStudent").textContent = \`\${fee.studentName} (\${fee.studentId}) - \${fee.month}\`;\r
\r
      const paymentsHtml = (fee.payments || []).map(p =>\r
        \`<div style="padding:8px;border-bottom:1px solid #eee;">\r
      <strong>Received ₹\${Number(p.receivedAmount ?? p.amount ?? 0).toLocaleString()}</strong>\r
      <br><small>Applied ₹\${Number(p.appliedAmount ?? p.amount ?? 0).toLocaleString()}\${Number(p.extraAmount || 0) > 0 ? \` / Extra ₹\${Number(p.extraAmount || 0).toLocaleString()}\` : ""}</small>\r
      <span style="color:#666;float:right;font-size:12px;">\r
        \${formatDateTime(p.date)}\r
      </span>\r
      \${p.razorpayPaymentId || p.paymentId ? \`<br><small><strong>Payment ID:</strong> \${p.razorpayPaymentId || p.paymentId}</small>\` : ''}\r
      \${p.razorpayOrderId || p.orderId ? \`<br><small><strong>Order ID:</strong> \${p.razorpayOrderId || p.orderId}</small>\` : ''}\r
      \${p.paymentMode ? \`<br><small><strong>Mode:</strong> \${esc(p.paymentMode)}</small>\` : ''}\r
      \${p.note ? \`<br><small>\${p.note}</small>\` : ''}\r
    </div>\`\r
      ).join('');\r
\r
      const detailsHtml = \`\r
    <div style="background:#f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #cbd5e1;">\r
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">\r
        <div><strong>Original Amount:</strong> ₹\${originalAmount.toLocaleString()}</div>\r
        <div><strong>Actually Paid:</strong> ₹\${totalPaidAmount.toLocaleString()}</div>\r
        <div style="color:#065f46;font-size:18px;"><strong>Remaining:</strong> ₹\${remaining.toLocaleString()}</div>\r
        <div><strong>Progress:</strong> \${Math.round(progress)}%</div>\r
      </div>\r
      <div style="width:100%;height:10px;background:#e0e0e0;border-radius:5px;overflow:hidden;">\r
        <div style="height:100%;background:#1f3a5f;width:\${progress}%;border-radius:5px;"></div>\r
      </div>\r
    </div>\r
    <div style="max-height:300px;overflow-y:auto;background:#f8f9ff;border-radius:8px;padding:15px;">\r
      <strong>Payment History (\${(fee.payments || []).length} payments):</strong>\r
      \${paymentsHtml || '<div style="text-align:center;color:#666;padding:20px;">No payments yet</div>'}\r
    </div>\r
  \`;\r
\r
      document.getElementById("partialDetailsContent").innerHTML = detailsHtml;\r
      document.getElementById("partialDetailsModal").style.display = "flex";\r
    };\r
\r
    window.closePartialDetailsModal = () => {\r
      document.getElementById("partialDetailsModal").style.display = "none";\r
    };\r
\r
    window.addMorePayment = () => {\r
      if (!currentPartialFee) {\r
        showToast("No fee selected for payment.", "error");\r
        return;\r
      }\r
      document.getElementById("partialDetailsModal").style.display = "none";\r
      document.getElementById("addPaymentStudent").textContent = \`\${currentPartialFee.studentName} - \${currentPartialFee.month}\`;\r
      document.getElementById("paymentAmount").value = "";\r
      document.getElementById("paymentMode").value = "";\r
      document.getElementById("paymentModeOther").value = "";\r
      document.getElementById("paymentModeOther").style.display = "none";\r
      document.getElementById("paymentNote").value = "";\r
      document.getElementById("addPaymentModal").style.display = "flex";\r
    };\r
\r
    window.closeAddPaymentModal = () => {\r
      document.getElementById("addPaymentModal").style.display = "none";\r
      currentPartialFee = null;\r
      currentPartialFeeId = null;\r
    };\r
\r
    window.confirmAddPayment = async () => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      const paymentAmount = parseFloat(document.getElementById("paymentAmount").value);\r
      const note = document.getElementById("paymentNote").value;\r
      const paymentMode = paymentModeFromFields("paymentMode", "paymentModeOther");\r
\r
      if (!paymentAmount || paymentAmount <= 0) {\r
        showToast("Enter a valid payment amount.", 'error');\r
        return;\r
      }\r
      if (paymentMode.error) return showToast(paymentMode.error, "error");\r
      if (currentPartialFee?.studentId && studentTcMap[currentPartialFee.studentId]) {\r
        showToast("TC issued for this student ï¿½ fee payments are not allowed.", 'error');\r
        return;\r
      }\r
\r
      const amounts = getFeeAmounts(currentPartialFee);\r
      const isZeroAssignedEntry = amounts.total <= 0 && amounts.due <= 0;\r
      const appliedNow = isZeroAssignedEntry ? paymentAmount : Math.min(paymentAmount, amounts.due);\r
      const extraNow = isZeroAssignedEntry ? 0 : Math.max(0, paymentAmount - amounts.due);\r
      const newTotalPaid = amounts.applied + appliedNow;\r
      const newTotalExtra = amounts.extra + extraNow;\r
      const remainingAfter = Math.max(0, amounts.total - newTotalPaid);\r
\r
      if (!confirm(\`Add payment\\n\\nReceived: ₹\${paymentAmount.toLocaleString()}\\nApplied: ₹\${appliedNow.toLocaleString()}\\nExtra stored: ₹\${extraNow.toLocaleString()}\\nRemaining after: ₹\${remainingAfter.toLocaleString()}\\n\\nProceed?\`)) {\r
        return;\r
      }\r
\r
      try {\r
        const currentPayments = currentPartialFee.payments || [];\r
        const newPayment = {\r
          receivedAmount: paymentAmount,\r
          appliedAmount: appliedNow,\r
          extraAmount: extraNow,\r
          amount: appliedNow,\r
          date: new Date(),\r
          note: note || 'Payment added from Reports',\r
          status: extraNow > 0 ? "Applied with extra" : remainingAfter === 0 ? "FULLY PAID" : "PARTIAL PAID",\r
          ...paymentMode,\r
          ledgerTransactionId: newLedgerTransactionId("FEE")\r
        };\r
\r
        await updateDoc(doc(db, "schools", activeSchoolId, "fees", currentPartialFee.id), {\r
          status: remainingAfter === 0 ? 'Paid' : 'Partial',\r
          totalPaidAmount: newTotalPaid,\r
          paidAmount: newTotalPaid,\r
          totalExtraPaidAmount: newTotalExtra,\r
          totalCollectedAmount: newTotalPaid + newTotalExtra,\r
          remainingAmount: remainingAfter,\r
          ...sessionFeeFields(),\r
          payments: [...currentPayments, newPayment],\r
          lastPaymentAmount: paymentAmount,\r
          lastAppliedAmount: appliedNow,\r
          lastExtraAmount: extraNow,\r
          lastPaymentDate: serverTimestamp(),\r
          updatedAt: serverTimestamp()\r
        });\r
        await syncReceivedFee(currentPartialFee.id, currentPartialFee, newPayment, currentPayments.length);\r
\r
        closeAddPaymentModal();\r
        await loadAllReports();\r
        showToast(extraNow > 0\r
          ? \`₹\${appliedNow.toLocaleString()} applied and ₹\${extraNow.toLocaleString()} stored as extra.\`\r
          : \`₹\${paymentAmount.toLocaleString()} added successfully.\`, 'partial');\r
      } catch (error) {
        showToast("Error: " + error.message, 'error');
      }
    };
\r
    // Late fine rule handlers are defined below with auto-apply support.\r
\r
    function readFineConfig() {\r
      const month = document.getElementById("fineMonth").value;\r
      const dueDate = document.getElementById("fineDueDate").value;\r
      const eligibility = document.getElementById("fineEligibility").value || "all-due";\r
      const dueThreshold = Number(document.getElementById("fineDueThreshold").value || 0);\r
      const mode = document.getElementById("fineMode").value || "fixed";\r
      const fineAmount = Number(document.getElementById("fineAmount").value || 0);\r
      const basis = document.getElementById("fineBasis").value || "due";\r
      const intervalDays = Math.max(1, Number(document.getElementById("fineIntervalDays").value || 1));\r
      return { month, dueDate, eligibility, dueThreshold, mode, fineAmount, basis, intervalDays };\r
    }\r
\r
    function validateFineConfig(config, silent = false) {\r
      if (!config.month || !config.dueDate || Number(config.fineAmount || 0) <= 0) {\r
        if (!silent) showToast("Select month, last payment date, and fine amount/percentage.", "error");\r
        return false;\r
      }\r
      if (config.eligibility === "due-above" && Number(config.dueThreshold || 0) <= 0) {\r
        if (!silent) showToast("Enter minimum due amount for this eligibility option.", "error");\r
        return false;\r
      }\r
      return true;\r
    }\r
\r
    async function saveFineRuleConfig(config, silent = false) {\r
      if (!validateFineConfig(config, silent)) return false;\r
      const ruleKey = getFineRuleKey(config);\r
      const existingRules = await getSavedFineRules();\r
      const existingRule = existingRules[config.month] || {};\r
      await setDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"), {\r
        rules: {\r
          [config.month]: {\r
            ...existingRule,\r
            ...config,\r
            ruleKey,\r
            autoApply: true,\r
            active: true,\r
            createdAt: existingRule.createdAt || new Date(),\r
            updatedAt: new Date(),\r
            ...sessionFeeFields()\r
          }\r
        },\r
        updatedAt: serverTimestamp()\r
      }, { merge: true });\r
      return true;\r
    }\r
\r
    window.saveAutoFineRule = async () => {\r
      try {\r
        const config = readFineConfig();\r
        const saved = await saveFineRuleConfig(config);\r
        if (!saved) return;\r
        const calc = calculateModernFinePeriods(config);\r
        const summary = document.getElementById("fineRuleSummary");\r
        if (summary) {\r
          summary.textContent = calc.periods > 0\r
            ? \`Auto rule saved. It is already due, so Apply/Preview can impose it now.\`\r
            : \`Auto rule saved. Fine will start automatically after \${formatDateTime(calc.dueDate)}.\`;\r
        }\r
        showToast("Auto fine rule saved.");\r
      } catch (error) {\r
        showToast("Error saving rule: " + error.message, "error");\r
      }\r
    };\r
\r
    function fillFineRuleForm(config) {\r
      document.getElementById("fineMonth").value = config.month || "";\r
      document.getElementById("fineDueDate").value = config.dueDate || "";\r
      document.getElementById("fineDueDay").value = config.dueDay || "";\r
      document.getElementById("fineEligibility").value = config.eligibility || "all-due";\r
      document.getElementById("fineDueThreshold").value = config.dueThreshold || "";\r
      document.getElementById("fineMode").value = config.mode || "fixed";\r
      document.getElementById("fineAmount").value = config.fineAmount || "";\r
      document.getElementById("fineBasis").value = config.basis || "due";\r
      document.getElementById("fineIntervalDays").value = config.intervalDays || (config.frequency === "weekly" ? 7 : config.frequency === "monthly" ? 30 : 1);\r
    }\r
\r
    function ruleStatusText(rule, config) {\r
      if (rule.active === false) return "Paused";\r
      const calc = calculateModernFinePeriods(config);\r
      return calc.periods > 0 ? \`Due now: \${calc.daysLate} day(s), \${calc.periods} period(s)\` : \`Starts after \${formatDateTime(calc.dueDate)}\`;\r
    }\r
\r
    function summarizeFineRuleUsage(month, config) {\r
      const ruleKey = config.ruleKey || getFineRuleKey(config);\r
      const students = new Set();\r
      let total = 0;\r
      (allFees || []).forEach((fee) => {\r
        getFineDetails(fee).forEach((fine) => {\r
          if (!fineDetailMatchesRule(fine, ruleKey, config)) return;\r
          total += Number(fine.amount || 0);\r
          if (fee.studentId) students.add(fee.studentId);\r
        });\r
      });\r
      return { total, students: students.size };\r
    }\r
\r
    function formatRuleDate(value) {\r
      return value ? formatDateTime(value) : "-";\r
    }\r
\r
    function fineRuleDetailHtml(month, rule, config) {\r
      const calc = calculateModernFinePeriods(config);\r
      const usage = summarizeFineRuleUsage(month, config);\r
      const amountText = config.mode === "percentage"\r
        ? \`\${config.fineAmount}%\`\r
        : \`Rs \${Number(config.fineAmount || 0).toLocaleString()}\`;\r
      const basisText = config.basis === "assigned" ? "assigned amount" : "due amount";\r
      const startText = calc.periods > 0\r
        ? \`Started \${calc.daysLate} day(s) ago\`\r
        : \`Starts after due date\`;\r
      const nextAction = rule.active === false\r
        ? "Paused - auto fine will not run"\r
        : calc.periods > 0\r
          ? "Ready - preview/apply will add only pending delta"\r
          : "Waiting - auto fine starts after last payment date";\r
      const details = [\r
        ["Month", month],\r
        ["Last payment date", formatRuleDate(calc.dueDate || config.dueDate)],\r
        ["Start status", startText],\r
        ["Days late", \`\${calc.daysLate || 0}\`],\r
        ["Billing periods", \`\${calc.periods || 0}\`],\r
        ["Fine", \`\${amountText} every \${config.intervalDays} day(s)\`],\r
        ["Basis", basisText],\r
        ["Eligibility", fineEligibilityLabel(config)],\r
        ["Minimum due", config.eligibility === "due-above" ? \`Rs \${Number(config.dueThreshold || 0).toLocaleString()}\` : "-"],\r
        ["Auto apply", rule.autoApply === false ? "Off" : "On"],\r
        ["Rule status", rule.active === false ? "Paused" : "Active"],\r
        ["Session", config.session || config.sessionId || activeSessionLabel || "Current"],\r
        ["Applied so far", \`Rs \${usage.total.toLocaleString()} on \${usage.students} student(s)\`],\r
        ["Last auto run", rule.lastAutoAppliedAt ? formatDateTime(rule.lastAutoAppliedAt) : "-"],\r
        ["Last run amount", rule.lastAutoAppliedAmount ? \`Rs \${Number(rule.lastAutoAppliedAmount || 0).toLocaleString()} on \${Number(rule.lastAutoAppliedStudents || 0)} student(s)\` : "-"],\r
        ["Created", rule.createdAt ? formatDateTime(rule.createdAt) : "-"],\r
        ["Updated", rule.updatedAt ? formatDateTime(rule.updatedAt) : "-"],\r
        ["Next action", nextAction]\r
      ];\r
      return \`\r
        <article style="border:1px solid #dbe3ef;border-radius:12px;padding:16px;background:#fff;margin-bottom:14px;">\r
          <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-start;">\r
            <div>\r
              <h4 style="margin:0 0 6px;color:#172033;">\${esc(month)} Fine Rule</h4>\r
              <div style="color:#475569;font-size:13px;font-weight:700;">\${esc(amountText)} every \${esc(config.intervalDays)} day(s) on \${esc(basisText)}</div>\r
            </div>\r
            <span class="status-\${rule.active === false ? "pending" : "imposed"}">\${esc(ruleStatusText(rule, config))}</span>\r
          </div>\r
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:14px;">\r
            \${details.map(([label, value]) => \`\r
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px;">\r
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;font-weight:800;">\${esc(label)}</div>\r
                <div style="margin-top:4px;color:#172033;font-weight:700;font-size:13px;white-space:normal;">\${esc(value)}</div>\r
              </div>\r
            \`).join("")}\r
          </div>\r
          <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">\r
            <button class="btn" onclick="selectFineRule('\${esc(month)}')">Select</button>\r
            <button class="btn" onclick="previewSavedFineRule('\${esc(month)}')">Preview</button>\r
            <button class="btn btn-warning" onclick="toggleFineRule('\${esc(month)}', \${rule.active === false ? "true" : "false"})">\${rule.active === false ? "Activate" : "Pause"}</button>\r
          </div>\r
        </article>\r
      \`;\r
    }\r
\r
    async function renderFineRulesModal() {\r
      const list = document.getElementById("fineRulesList");\r
      const summary = document.getElementById("fineRulesSummary");\r
      if (!list || !summary) return;\r
      list.innerHTML = \`<div class="no-data">Loading saved fine rules...</div>\`;\r
      const rules = await getSavedFineRules();\r
      const entries = Object.entries(rules)\r
        .map(([month, rule]) => [month, rule, normalizeSavedFineConfig(month, rule)])\r
        .filter(([, , config]) => feeBelongsToActiveSession(config))\r
        .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]));\r
      const activeCount = entries.filter(([, rule]) => rule.active !== false).length;\r
      summary.textContent = entries.length\r
        ? \`\${activeCount} active rule(s), \${entries.length - activeCount} paused. Select any month to load it.\`\r
        : "No saved fine rules yet.";\r
      if (!entries.length) {\r
        list.innerHTML = \`<div class="no-data">Save an auto rule first. It will appear here month-wise.</div>\`;\r
        return;\r
      }\r
      list.innerHTML = \`<div style="max-height:520px;overflow:auto;padding-right:4px;">\${entries.map(([month, rule, config]) => fineRuleDetailHtml(month, rule, config)).join("")}</div>\`;\r
    }\r
\r
    window.openFineRulesModal = async () => {\r
      document.getElementById("fineRulesModal").style.display = "flex";\r
      try {\r
        await renderFineRulesModal();\r
      } catch (error) {\r
        document.getElementById("fineRulesList").innerHTML = \`<div class="no-data">Unable to load rules: \${esc(error.message)}</div>\`;\r
      }\r
    };\r
\r
    window.refreshFineRulesModal = () => renderFineRulesModal();\r
\r
    window.closeFineRulesModal = () => {\r
      document.getElementById("fineRulesModal").style.display = "none";\r
    };\r
\r
    window.selectFineRule = async (month) => {\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month];\r
        if (!rule) return showToast("Fine rule not found.", "error");\r
        const config = normalizeSavedFineConfig(month, rule);\r
        fillFineRuleForm(config);\r
        document.getElementById("fineRuleSummary").textContent = \`Loaded \${month} rule. Preview before applying.\`;\r
        closeFineRulesModal();\r
      } catch (error) {\r
        showToast("Unable to select rule: " + error.message, "error");\r
      }\r
    };\r
\r
    window.previewSavedFineRule = async (month) => {\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month];\r
        if (!rule) return showToast("Fine rule not found.", "error");\r
        const config = normalizeSavedFineConfig(month, rule);\r
        fillFineRuleForm(config);\r
        closeFineRulesModal();\r
        const preview = await buildLateFinePreview(config);\r
        if (preview) renderLateFinePreview(preview);\r
      } catch (error) {\r
        showToast("Unable to preview rule: " + error.message, "error");\r
      }\r
    };\r
\r
    window.toggleFineRule = async (month, shouldActivate) => {\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month];\r
        if (!rule) return showToast("Fine rule not found.", "error");\r
        await setDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"), {\r
          rules: {\r
            [month]: {\r
              ...rule,\r
              active: !!shouldActivate,\r
              updatedAt: new Date(),\r
              ...sessionFeeFields()\r
            }\r
          },\r
          updatedAt: serverTimestamp()\r
        }, { merge: true });\r
        await renderFineRulesModal();\r
        showToast(\`\${month} fine rule \${shouldActivate ? "activated" : "paused"}.\`);\r
      } catch (error) {\r
        showToast("Unable to update rule: " + error.message, "error");\r
      }\r
    };\r
\r
    function calculateModernFinePeriods(config, today = new Date()) {\r
      const dueDate = new Date(\`\${config.dueDate}T23:59:59\`);\r
      if (!config.dueDate || Number.isNaN(dueDate.getTime())) return { periods: 0, dueDate: null, daysLate: 0, intervalDays: config.intervalDays };\r
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());\r
      const dueStart = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());\r
      const daysLate = Math.max(0, Math.floor((todayStart - dueStart) / 86400000));\r
      return {\r
        periods: daysLate > 0 ? Math.ceil(daysLate / config.intervalDays) : 0,\r
        dueDate,\r
        daysLate,\r
        intervalDays: config.intervalDays\r
      };\r
    }\r
\r
    function feeMatchesFineEligibility(fee, amounts, config) {\r
      const principalDue = Math.max(0, amounts.due - getTotalFineAmount(fee));\r
      if (principalDue <= 0) return false;\r
      if (config.eligibility === "full-due") return amounts.applied <= 0 && principalDue > 0;\r
      if (config.eligibility === "partial-due") return amounts.applied > 0 && principalDue > 0;\r
      if (config.eligibility === "due-above") return principalDue > config.dueThreshold;\r
      return true;\r
    }\r
\r
    function fineEligibilityLabel(config) {\r
      if (config.eligibility === "full-due") return "Only full due amount";\r
      if (config.eligibility === "partial-due") return "Only partially paid amount";\r
      if (config.eligibility === "due-above") return \`Due above ₹\${config.dueThreshold.toLocaleString()}\`;\r
      return "Full due and partial due";\r
    }\r
\r
    function calculateFineForFee(fee, amounts, config, periods) {\r
      const existingFine = getTotalFineAmount(fee);\r
      const principalAssigned = Math.max(0, amounts.total - existingFine);\r
      const principalDue = Math.max(0, amounts.due - existingFine);\r
      const baseAmount = config.basis === "assigned" ? principalAssigned : principalDue;\r
      const perPeriodFine = config.mode === "percentage"\r
        ? Math.round((baseAmount * config.fineAmount) / 100)\r
        : config.fineAmount;\r
      return {\r
        baseAmount,\r
        perPeriodFine,\r
        totalFine: Math.max(0, perPeriodFine * periods)\r
      };\r
    }\r
\r
    function modernFineReason({ fee, config, calc, fineMath }) {\r
      const amountText = config.mode === "percentage"\r
        ? \`\${config.fineAmount}% of \${config.basis === "assigned" ? "assigned" : "due"} amount\`\r
        : \`₹\${config.fineAmount.toLocaleString()} fixed\`;\r
      return \`Late fine for \${fee.month || config.month}: \${calc.daysLate} day(s) late, \${calc.periods} period(s), \${amountText}.\`;\r
    }\r
\r
    async function buildLateFinePreview(configOverride = null, options = {}) {\r
      const silent = options.silent === true;\r
      if (!silent && !ensureSessionEditable("Late fee fine")) return null;\r
      const config = configOverride || readFineConfig();\r
      if (!validateFineConfig(config, silent)) return null;\r
      const calc = calculateModernFinePeriods(config);\r
      if (!calc.periods) {\r
        if (!silent) showToast("Fine is not due yet for this date. Save Auto Rule to start it automatically later.", "error");\r
        return null;\r
      }\r
\r
      const ruleKey = getFineRuleKey(config);\r
      const filters = [where("month", "==", config.month)];\r
      if (activeSessionId) filters.push(where("sessionId", "==", activeSessionId));\r
      const snapshot = await getDocs(query(collection(db, "schools", activeSchoolId, "fees"), ...filters));\r
      const rows = [];\r
      let skippedCount = 0;\r
\r
      snapshot.docs.forEach((feeDoc) => {\r
        const fee = { id: feeDoc.id, ...feeDoc.data() };\r
        if (!feeBelongsToActiveSession(fee) || studentTcMap[fee.studentId]) {\r
          skippedCount++;\r
          return;\r
        }\r
        const amounts = getFeeAmounts(fee);\r
        if (!feeMatchesFineEligibility(fee, amounts, config)) {\r
          skippedCount++;\r
          return;\r
        }\r
        const fineMath = calculateFineForFee(fee, amounts, config, calc.periods);\r
        const fineDetails = getFineDetails(fee);\r
        const alreadyForRule = fineDetails\r
          .filter((fine) => fineDetailMatchesRule(fine, ruleKey, config))\r
          .reduce((sum, fine) => sum + Number(fine.amount || 0), 0);\r
        const deltaFine = Math.max(0, fineMath.totalFine - alreadyForRule);\r
        rows.push({\r
          id: fee.id,\r
          fee,\r
          amounts,\r
          fineMath,\r
          alreadyForRule,\r
          deltaFine,\r
          alreadyImposed: deltaFine <= 0,\r
          reason: modernFineReason({ fee, config, calc, fineMath })\r
        });\r
      });\r
\r
      return {\r
        config,\r
        calc,\r
        ruleKey,\r
        rows,\r
        skippedCount,\r
        totalFine: rows.reduce((sum, row) => sum + row.deltaFine, 0),\r
        pendingCount: rows.filter((row) => row.deltaFine > 0).length,\r
        alreadyCount: rows.filter((row) => row.deltaFine <= 0).length\r
      };\r
    }\r
\r
    function renderLateFinePreviewLegacy(preview) {\r
      pendingFinePreview = preview;\r
      document.getElementById("finePreviewTitle").textContent = preview.config.month;\r
      document.getElementById("finePreviewSummary").textContent =\r
        \`\${preview.rows.length} student(s), total fine ₹\${preview.totalFine.toLocaleString()}, \${preview.calc.daysLate} day(s) late, \${preview.calc.periods} billing period(s).\`;\r
      const rowsHtml = preview.rows.map((row) => {\r
        const newDue = row.amounts.due + row.deltaFine;\r
        return \`\r
          <tr>\r
            <td><strong>\${esc(row.fee.studentId || "-")}</strong></td>\r
            <td>\${esc(row.fee.studentName || "-")}</td>\r
            <td>\${esc(row.fee.class || "")}\${row.fee.section ? "-" + esc(row.fee.section) : ""}</td>\r
            <td>₹\${row.amounts.total.toLocaleString()}</td>\r
            <td>₹\${row.amounts.applied.toLocaleString()}</td>\r
            <td>₹\${row.amounts.due.toLocaleString()}</td>\r
            <td>₹\${row.deltaFine.toLocaleString()}</td>\r
            <td>₹\${newDue.toLocaleString()}</td>\r
            <td style="font-size:12px;color:#475569;white-space:normal;min-width:220px;">\${esc(row.reason)}</td>\r
          </tr>\r
        \`;\r
      }).join("");\r
      document.getElementById("finePreviewList").innerHTML = preview.rows.length ? \`\r
        <div style="max-height:420px;overflow:auto;">\r
          <table style="width:100%;">\r
            <thead>\r
              <tr>\r
                <th>Student ID</th><th>Name</th><th>Class</th><th>Assigned</th><th>Paid</th><th>Current Due</th><th>Fine</th><th>New Due</th><th>Reason</th>\r
              </tr>\r
            </thead>\r
            <tbody>\${rowsHtml}</tbody>\r
          </table>\r
        </div>\r
      \` : \`<div class="no-data">No eligible students found for this fine rule.</div>\`;\r
      document.getElementById("finePreviewModal").style.display = "flex";\r
    }\r
\r
    function selectedFinePreviewRows() {\r
      if (!pendingFinePreview) return [];\r
      return pendingFinePreview.rows.filter((row, index) => finePreviewSelections[index] && row.deltaFine > 0);\r
    }\r
\r
    function updateFinePreviewSelectionSummary() {\r
      if (!pendingFinePreview) return;\r
      const selectedRows = selectedFinePreviewRows();\r
      const selectedTotal = selectedRows.reduce((sum, row) => sum + row.deltaFine, 0);\r
      document.getElementById("finePreviewSummary").textContent =\r
        \`\${pendingFinePreview.rows.length} eligible student(s): \${pendingFinePreview.pendingCount} pending, \${pendingFinePreview.alreadyCount} already imposed. Selected \${selectedRows.length}, total fine Rs \${selectedTotal.toLocaleString()}. \${pendingFinePreview.calc.daysLate} day(s) late, \${pendingFinePreview.calc.periods} period(s).\`;\r
    }\r
\r
    function renderLateFinePreview(preview) {\r
      pendingFinePreview = preview;\r
      finePreviewSelections = {};\r
      preview.rows.forEach((row, index) => {\r
        finePreviewSelections[index] = row.deltaFine > 0;\r
      });\r
      document.getElementById("finePreviewTitle").textContent = preview.config.month;\r
      const filter = document.getElementById("finePreviewFilter");\r
      if (filter) filter.value = "all";\r
      renderFinePreviewRows();\r
      document.getElementById("finePreviewModal").style.display = "flex";\r
    }\r
\r
    window.renderFinePreviewRows = () => {\r
      if (!pendingFinePreview) return;\r
      const filter = document.getElementById("finePreviewFilter")?.value || "all";\r
      const visibleRows = pendingFinePreview.rows\r
        .map((row, index) => ({ row, index }))\r
        .filter(({ row, index }) => {\r
          if (filter === "pending") return row.deltaFine > 0;\r
          if (filter === "already") return row.deltaFine <= 0;\r
          if (filter === "selected") return !!finePreviewSelections[index];\r
          return true;\r
        });\r
      const rowsHtml = visibleRows.map(({ row, index }) => {\r
        const newDue = row.amounts.due + row.deltaFine;\r
        const isAlready = row.deltaFine <= 0;\r
        return \`\r
          <tr>\r
            <td><input type="checkbox" class="fine-preview-check" data-index="\${index}" \${finePreviewSelections[index] ? "checked" : ""} onchange="setFinePreviewRowSelected(\${index}, this.checked)"></td>\r
            <td><strong>\${esc(row.fee.studentId || "-")}</strong></td>\r
            <td>\${esc(row.fee.studentName || "-")}</td>\r
            <td>\${esc(row.fee.class || "")}\${row.fee.section ? "-" + esc(row.fee.section) : ""}</td>\r
            <td>Rs \${row.amounts.total.toLocaleString()}</td>\r
            <td>Rs \${row.amounts.applied.toLocaleString()}</td>\r
            <td>Rs \${row.amounts.due.toLocaleString()}</td>\r
            <td>\${isAlready ? \`<span class="status-paid">Already imposed</span>\` : \`<span class="status-imposed">Pending Rs \${row.deltaFine.toLocaleString()}</span>\`}<br><small style="color:#64748b;">Applied before Rs \${row.alreadyForRule.toLocaleString()}</small></td>\r
            <td>Rs \${newDue.toLocaleString()}</td>\r
            <td style="font-size:12px;color:#475569;white-space:normal;min-width:220px;">\${esc(row.reason)}</td>\r
          </tr>\r
        \`;\r
      }).join("");\r
      document.getElementById("finePreviewList").innerHTML = pendingFinePreview.rows.length ? \`\r
        <div style="max-height:420px;overflow:auto;">\r
          <table style="width:100%;">\r
            <thead>\r
              <tr>\r
                <th>Select</th><th>Student ID</th><th>Name</th><th>Class</th><th>Assigned</th><th>Paid</th><th>Current Due</th><th>Fine Status</th><th>New Due</th><th>Reason</th>\r
              </tr>\r
            </thead>\r
            <tbody>\${rowsHtml || \`<tr><td colspan="10"><div class="no-data">No rows for this filter.</div></td></tr>\`}</tbody>\r
          </table>\r
        </div>\r
      \` : \`<div class="no-data">No eligible students found for this fine rule.</div>\`;\r
      updateFinePreviewSelectionSummary();\r
    };\r
\r
    window.setFinePreviewRowSelected = (index, checked) => {\r
      finePreviewSelections[index] = !!checked;\r
      updateFinePreviewSelectionSummary();\r
    };\r
\r
    window.toggleFinePreviewSelectAll = (checked) => {\r
      if (!pendingFinePreview) return;\r
      pendingFinePreview.rows.forEach((row, index) => {\r
        finePreviewSelections[index] = !!checked && row.deltaFine > 0;\r
      });\r
      renderFinePreviewRows();\r
    };\r
\r
    window.unselectAlreadyImposedFineRows = () => {\r
      if (!pendingFinePreview) return;\r
      pendingFinePreview.rows.forEach((row, index) => {\r
        if (row.deltaFine <= 0) finePreviewSelections[index] = false;\r
      });\r
      const filter = document.getElementById("finePreviewFilter");\r
      if (filter) filter.value = "already";\r
      renderFinePreviewRows();\r
    };\r
\r
    window.previewLateFeeFine = async () => {\r
      try {\r
        const preview = await buildLateFinePreview();\r
        if (preview) renderLateFinePreview(preview);\r
      } catch (error) {\r
        showToast("Error building preview: " + error.message, "error");\r
      }\r
    };\r
\r
    window.closeFinePreviewModal = () => {\r
      document.getElementById("finePreviewModal").style.display = "none";\r
    };\r
\r
    window.confirmFinePreviewApply = async () => {\r
      if (!pendingFinePreview) return showToast("Preview fine first.", "error");\r
      await applyLateFeeFineFromPreview(pendingFinePreview);\r
    };\r
\r
    window.loadFineRuleForMonth = async () => {\r
      const month = document.getElementById("fineMonth").value;\r
      const summary = document.getElementById("fineRuleSummary");\r
      if (summary) summary.textContent = "";\r
      if (!month || !activeSchoolId) return;\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month] || null;\r
        if (!rule) {\r
          if (summary) summary.textContent = \`No saved fine rule for \${month}.\`;\r
          return;\r
        }\r
        const config = normalizeSavedFineConfig(month, rule);\r
        fillFineRuleForm(config);\r
        if (summary) summary.textContent = \`Saved rule loaded for \${month}\${rule.active === false ? " (paused)" : ""}. Preview before applying.\`;\r
      } catch (error) {\r
        console.warn("Fine rule load failed:", error);\r
      }\r
    };\r
\r
    async function applyLateFeeFineFromPreview(preview, options = {}) {\r
      const silent = options.silent === true;\r
      const rowsToApply = silent\r
        ? preview.rows.filter((row) => row.deltaFine > 0)\r
        : selectedFinePreviewRows();\r
      if (!preview.rows.length) {\r
        if (!silent) showToast("No eligible students to apply fine.", "error");\r
        return { updatedCount: 0, addedFineTotal: 0 };\r
      }\r
      const selectedTotal = rowsToApply.reduce((sum, row) => sum + row.deltaFine, 0);\r
      if (!rowsToApply.length || selectedTotal <= 0) {\r
        if (!silent) showToast("No pending fine selected. Already imposed rows will not be charged again.", "error");\r
        return { updatedCount: 0, addedFineTotal: 0 };\r
      }\r
      if (!silent && !confirm(\`Apply fine to \${rowsToApply.length} selected student(s)?\\nTotal fine: Rs \${selectedTotal.toLocaleString()}\`)) {\r
        return { updatedCount: 0, addedFineTotal: 0 };\r
      }\r
      const { config, calc, ruleKey } = preview;\r
      try {\r
        await saveFineRuleConfig(config, true);\r
        let updatedCount = 0;\r
        let addedFineTotal = 0;\r
        for (const row of rowsToApply) {\r
          const { fee, amounts, fineMath, alreadyForRule, deltaFine, reason } = row;\r
          if (deltaFine <= 0) continue;\r
          const existingFine = getTotalFineAmount(fee);\r
          const fineDetails = getFineDetails(fee);\r
          const newTotal = amounts.total + deltaFine;\r
          const newRemaining = Math.max(0, newTotal - amounts.applied);\r
          const newStatus = amounts.applied >= newTotal ? "Paid" : amounts.applied > 0 ? "Partial" : (fee.status === "Pending" ? "Pending" : "Imposed");\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", fee.id), {\r
            amount: newTotal,\r
            originalAmount: newTotal,\r
            fineAmount: existingFine + deltaFine,\r
            totalFineAmount: existingFine + deltaFine,\r
            remainingAmount: newRemaining,\r
            status: newStatus,\r
            fineDetails: [...fineDetails, {\r
              amount: deltaFine,\r
              totalRequiredFine: fineMath.totalFine,\r
              alreadyAppliedBefore: alreadyForRule,\r
              ruleKey,\r
              month: config.month,\r
              dueDate: calc.dueDate,\r
              intervalDays: config.intervalDays,\r
              eligibility: config.eligibility,\r
              dueThreshold: config.dueThreshold,\r
              mode: config.mode,\r
              finePerPeriod: fineMath.perPeriodFine,\r
              fineInput: config.fineAmount,\r
              basis: config.basis,\r
              periods: calc.periods,\r
              daysLate: calc.daysLate,\r
              baseAmount: fineMath.baseAmount,\r
              reason,\r
              date: new Date(),\r
              type: "late-fee-fine"\r
            }],\r
            lastFineAmount: deltaFine,\r
            lastFineReason: reason,\r
            ...sessionFeeFields(),\r
            updatedAt: serverTimestamp()\r
          });\r
          updatedCount++;\r
          addedFineTotal += deltaFine;\r
        }\r
        if (!silent) {\r
          closeFinePreviewModal();\r
          pendingFinePreview = null;\r
          await loadAllReports();\r
          const summary = document.getElementById("fineRuleSummary");\r
          if (summary) summary.textContent = \`Applied Rs \${addedFineTotal.toLocaleString()} fine across \${updatedCount} student(s).\`;\r
          showToast(\`Late fine applied: Rs \${addedFineTotal.toLocaleString()} on \${updatedCount} student(s).\`);\r
        }\r
        return { updatedCount, addedFineTotal };\r
      } catch (error) {\r
        if (!silent) showToast("Error applying fine: " + error.message, "error");\r
        throw error;\r
      }\r
    }\r
    window.applyLateFeeFine = async () => {\r
      try {\r
        const config = readFineConfig();\r
        if (!validateFineConfig(config)) return;\r
        const calc = calculateModernFinePeriods(config);\r
        if (!calc.periods) {\r
          const saved = await saveFineRuleConfig(config);\r
          if (saved) {\r
            const summary = document.getElementById("fineRuleSummary");\r
            if (summary) summary.textContent = \`Auto rule saved. Fine will start automatically after \${formatDateTime(calc.dueDate)}.\`;\r
            showToast("Future auto fine rule saved.");\r
          }\r
          return;\r
        }\r
        const preview = await buildLateFinePreview(config);\r
        if (!preview) return;\r
        renderLateFinePreview(preview);\r
      } catch (error) {\r
        showToast("Error applying fine: " + error.message, "error");\r
      }\r
    };\r
\r
    function normalizeSavedFineConfig(month, rule = {}) {\r
      let dueDate = rule.dueDate || "";\r
      if (!dueDate && rule.dueDay) {\r
        const monthIndex = monthOrder.indexOf(month);\r
        if (monthIndex >= 0) {\r
          const date = clampDueDate(new Date().getFullYear(), monthIndex, Number(rule.dueDay));\r
          dueDate = \`\${date.getFullYear()}-\${String(date.getMonth() + 1).padStart(2, "0")}-\${String(date.getDate()).padStart(2, "0")}\`;\r
        }\r
      }\r
      const legacyInterval = rule.frequency === "weekly" ? 7 : rule.frequency === "monthly" ? 30 : 1;\r
      return {\r
        month: rule.month || month,\r
        dueDate,\r
        eligibility: rule.eligibility || "all-due",\r
        dueThreshold: Number(rule.dueThreshold || 0),\r
        mode: rule.mode || "fixed",\r
        fineAmount: Number(rule.fineAmount || 0),\r
        basis: rule.basis || "due",\r
        intervalDays: Math.max(1, Number(rule.intervalDays || legacyInterval)),\r
        active: rule.active !== false,\r
        autoApply: rule.autoApply !== false,\r
        ruleKey: rule.ruleKey || getFineRuleKey({ month: rule.month || month }),\r
        sessionId: rule.sessionId || "",\r
        session: rule.session || ""\r
      };\r
    }\r
\r
    async function autoApplyDueFineRules() {\r
      if (autoFineApplying || activeSessionLocked || !activeSchoolId) return { appliedCount: 0, totalFine: 0 };\r
      autoFineApplying = true;\r
      try {\r
        const snap = await getDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"));\r
        const rules = snap.exists() ? (snap.data()?.rules || {}) : {};\r
        let appliedCount = 0;\r
        let totalFine = 0;\r
        for (const [month, rule] of Object.entries(rules)) {\r
          if (rule.active === false || rule.autoApply === false) continue;\r
          const config = normalizeSavedFineConfig(month, rule);\r
          if (!feeBelongsToActiveSession(config)) continue;\r
          if (!validateFineConfig(config, true)) continue;\r
          const calc = calculateModernFinePeriods(config);\r
          if (!calc.periods) continue;\r
          const preview = await buildLateFinePreview(config, { silent: true });\r
          if (!preview?.rows?.length) continue;\r
          const result = await applyLateFeeFineFromPreview(preview, { silent: true });\r
          appliedCount += result?.updatedCount || preview.rows.length;\r
          totalFine += result?.addedFineTotal || preview.totalFine;\r
          await setDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"), {\r
            rules: {\r
              [month]: {\r
                ...rule,\r
                lastAutoAppliedAt: new Date(),\r
                lastAutoAppliedAmount: result?.addedFineTotal || preview.totalFine,\r
                lastAutoAppliedStudents: result?.updatedCount || preview.rows.length,\r
                updatedAt: new Date()\r
              }\r
            },\r
            updatedAt: serverTimestamp()\r
          }, { merge: true });\r
        }\r
        return { appliedCount, totalFine };\r
      } catch (error) {\r
        console.warn("Auto fine apply failed:", error);\r
        return { appliedCount: 0, totalFine: 0 };\r
      } finally {\r
        autoFineApplying = false;\r
      }\r
    }\r
\r
    window.viewStudentHistory = async (studentId) => {\r
      try {\r
        if (!studentId) return showToast("Student ID missing.", "error");\r
        if (!allFees.length) await loadAllReports();\r
        let history = allFees\r
          .filter((fee) => fee.studentId === studentId)\r
          .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
        const firstFee = history[0] || {};\r
        currentHistoryStudent = {\r
          studentId,\r
          studentName: firstFee.studentName || "Student",\r
          class: firstFee.class || "",\r
          section: firstFee.section || "",\r
          roll: firstFee.roll || "",\r
          studentDocId: firstFee.studentDocId || "",\r
          tcIssued: !!studentTcMap[studentId]\r
        };\r
\r
        displayHistoryModal(studentId, history);\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      }\r
    };\r
\r
    window.fetchStudentFeeManager = async () => {\r
      const studentId = document.getElementById("manageStudentId").value.trim();\r
      if (!studentId) return showToast("Enter student ID.", "error");\r
      try {\r
        const snap = await getDocs(query(\r
          collection(db, "schools", activeSchoolId, "students"),\r
          where("studentId", "==", studentId)\r
        ));\r
        if (snap.empty) return showToast("Student not found.", "error");\r
        const studentDoc = snap.docs[0];\r
        const student = { id: studentDoc.id, ...studentDoc.data() };\r
        currentHistoryStudent = {\r
          studentId: student.studentId || studentId,\r
          studentName: student.studentName || student.name || "Student",\r
          class: student.class || "",\r
          section: student.section || "",\r
          roll: student.roll || student.rollNo || "",\r
          studentDocId: student.id,\r
          tcIssued: !!student.tcIssued\r
        };\r
        document.getElementById("manageStudentSummary").textContent =\r
          \`\${currentHistoryStudent.studentName} - Class \${currentHistoryStudent.class || "-"}\${currentHistoryStudent.section ? "-" + currentHistoryStudent.section : ""} - ID \${currentHistoryStudent.studentId}\`;\r
        if (currentHistoryStudent.tcIssued) {\r
          showToast("TC issued for this student. Fee changes are blocked.", "error");\r
        }\r
        if (!allFees.length) await loadAllReports();\r
        const history = allFees\r
          .filter((fee) => fee.studentId === currentHistoryStudent.studentId)\r
          .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
        displayHistoryModal(currentHistoryStudent.studentId, history);\r
      } catch (error) {\r
        showToast("Error: " + error.message, "error");\r
      }\r
    };\r
\r
    window.viewStudentHistoryByFee = (feeId) => {\r
      const fee = allFees.find((entry) => entry.id === feeId);\r
      if (!fee) return showToast("Fee record not found.", "error");\r
\r
      const studentId = fee.studentId || "";\r
      const studentName = fee.studentName || "Student";\r
      const studentClass = fee.class || "";\r
      const studentSection = fee.section || "";\r
\r
      const history = allFees
        .filter((entry) => {
          // A stable ID must be authoritative. Falling through to the name/class
          // match after an ID mismatch mixed two different students who happened
          // to have the same name in the same class and section.
          if (studentId) return entry.studentId === studentId;
          if (fee.studentDocId) return entry.studentDocId === fee.studentDocId;
          return entry.studentName === studentName && entry.class === studentClass && entry.section === studentSection;
        })
        .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
\r
      currentHistoryStudent = {\r
        studentId: studentId || fee.studentId || "",\r
        studentName,\r
        class: studentClass,\r
        section: studentSection,\r
        roll: fee.roll || "",\r
        studentDocId: fee.studentDocId || "",\r
        tcIssued: !!studentTcMap[studentId]\r
      };\r
\r
      displayHistoryModal(studentId || "N/A", history);\r
    };\r
\r
    function buildHistoryTimeline(fee) {\r
      const rows = [];\r
      const assignedTotal = Number(fee.originalAmount || fee.amount || 0);\r
      const fineTotal = getTotalFineAmount(fee);\r
      const fallbackAssigned = Math.max(0, assignedTotal - fineTotal);\r
      const impositions = getImpositionEntries(fee);\r
\r
      if (impositions.length) {\r
        impositions.forEach((imposition, index) => {\r
          const amount = Number(imposition.amount || 0);\r
          if (amount <= 0) return;\r
          rows.push({\r
            type: index === 0 ? "Fee imposed" : "Additional fee imposed",\r
            date: imposition.date || fee.imposedDate || fee.date,\r
            amount,\r
            detail: imposition.remarks || fee.impositionRemark || fee.remarks || "Fee added to this month",\r
            tone: "#1e40af"\r
          });\r
        });\r
      } else if (fallbackAssigned > 0) {\r
        rows.push({\r
          type: fee.autoImposed ? "Auto fee imposed" : fee.manualEntry ? "Manual fee entry" : "Fee imposed",\r
          date: fee.imposedDate || fee.date,\r
          amount: fallbackAssigned,\r
          detail: fee.impositionRemark || fee.remarks || "Fee added to this month",\r
          tone: "#1e40af"\r
        });\r
      }\r
\r
      getFineDetails(fee).forEach((fine) => {\r
        const amount = Number(fine.amount || 0);\r
        if (amount <= 0) return;\r
        rows.push({\r
          type: "Fine added",\r
          date: fine.date || fee.updatedAt || fee.date,\r
          amount,\r
          detail: fine.reason || fee.lastFineReason || "Late fee fine added to month total",\r
          tone: "#b45309"\r
        });\r
      });\r
\r
      (Array.isArray(fee.payments) ? fee.payments : []).forEach((payment, index) => {\r
        const received = getPaymentReceivedAmount(payment);\r
        const applied = Number(payment.appliedAmount ?? payment.amount ?? 0);\r
        const extra = Number(payment.extraAmount || 0);\r
        if (received <= 0 && applied <= 0) return;\r
        const paymentId = payment.transactionId || payment.txnId || payment.paymentId || payment.razorpayPaymentId || payment.razorpay_payment_id || payment.razorpay_order_id || generatedFeeTxnId(fee, index);\r
        rows.push({\r
          type: "Payment received",\r
          date: payment.date || payment.paidAt || payment.createdAt || fee.lastPaymentDate,\r
          amount: received || applied,\r
          detail: \`Applied Rs \${applied.toLocaleString()} to \${fee.month || "month"} total\${extra > 0 ? \`, extra Rs \${extra.toLocaleString()} stored\` : ""}\${paymentId ? \` | ID: \${paymentId}\` : ""}\`,\r
          tone: "#047857"\r
        });\r
      });\r
\r
      return rows.sort((a, b) => {\r
        const da = a.date?.toDate?.() || a.date || 0;\r
        const db = b.date?.toDate?.() || b.date || 0;\r
        return (new Date(db).getTime() || 0) - (new Date(da).getTime() || 0);\r
      });\r
    }\r
\r
    function feePaymentRowsForReceipt(fee) {\r
      const payments = Array.isArray(fee.payments) ? fee.payments : [];\r
      return payments.map((payment, index) => {\r
        const received = getPaymentReceivedAmount(payment);\r
        const applied = Number(payment.appliedAmount ?? payment.amount ?? 0);\r
        const extra = Number(payment.extraAmount || 0);\r
        const txn = payment.transactionId || payment.txnId || payment.paymentId || payment.razorpayPaymentId || payment.razorpay_payment_id || payment.razorpay_order_id || generatedFeeTxnId(fee, index);\r
        return { received, applied, extra, txn, mode: payment.paymentMode || payment.mode || payment.method || "-", date: payment.date || payment.paymentDate || payment.paidAt || payment.createdAt || fee.lastPaymentDate, note: payment.note || payment.remarks || "" };\r
      }).filter((payment) => payment.received > 0 || payment.applied > 0);\r
    }\r
\r
    function transactionDateValue(value) {\r
      const raw = value?.toDate?.() || value;\r
      const date = raw instanceof Date ? raw : new Date(raw || 0);\r
      return Number.isNaN(date.getTime()) ? null : date;\r
    }\r
\r
    function localTransactionDateKey(value) {\r
      const date = transactionDateValue(value);\r
      if (!date) return "";\r
      return [\r
        date.getFullYear(),\r
        String(date.getMonth() + 1).padStart(2, "0"),\r
        String(date.getDate()).padStart(2, "0")\r
      ].join("-");\r
    }\r
\r
    function buildDailyPaymentTransactions(fees = allFees) {\r
      const rows = [];\r
      fees.forEach((fee) => {\r
        feePaymentRowsForReceipt(fee).forEach((payment, index) => {\r
          const date = transactionDateValue(payment.date);\r
          if (!date) return;\r
          rows.push({\r
            ...payment,\r
            date,\r
            dateKey: localTransactionDateKey(date),\r
            feeId: fee.id,\r
            studentId: fee.studentId || "-",\r
            studentName: fee.studentName || "-",\r
            className: [fee.class, fee.section].filter(Boolean).join("-") || "-",\r
            month: fee.month || "-",\r
            index\r
          });\r
        });\r
      });\r
      return rows.sort((a, b) => b.date.getTime() - a.date.getTime());\r
    }\r
\r
    window.renderDailyTransactions = () => {\r
      const input = document.getElementById("dailyTransactionDate");\r
      const transactions = buildDailyPaymentTransactions(allFees);\r
      if (input && !input.value && transactions.length) input.value = transactions[0].dateKey;\r
      const selectedDate = input?.value || "";\r
      const rows = selectedDate ? transactions.filter((transaction) => transaction.dateKey === selectedDate) : [];\r
      const totalReceived = rows.reduce((sum, transaction) => sum + Number(transaction.received || transaction.applied || 0), 0);\r
      const selectedDateObject = selectedDate ? new Date(\`\${selectedDate}T00:00:00\`) : null;\r
      const dateLabel = selectedDateObject && !Number.isNaN(selectedDateObject.getTime())\r
        ? selectedDateObject.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })\r
        : "-";\r
\r
      document.getElementById("dailyTransactionCount").textContent = \`(\${rows.length})\`;\r
      document.getElementById("dailyTransactionDateLabel").textContent = dateLabel;\r
      document.getElementById("dailyTransactionTotalCount").textContent = rows.length.toLocaleString("en-IN");\r
      document.getElementById("dailyTransactionAmount").textContent = \`₹\${totalReceived.toLocaleString("en-IN")}\`;\r
\r
      const target = document.getElementById("dailyTransactionsTable");\r
      if (!rows.length) {\r
        target.innerHTML = \`<div class="no-data">\${selectedDate ? \`No fee payment was received on \${esc(dateLabel)}.\` : "No payment transactions are available."}</div>\`;\r
        return;\r
      }\r
\r
      target.innerHTML = \`<table>\r
        <thead><tr><th>Time</th><th>Student</th><th>Student ID</th><th>Class</th><th>Month</th><th>Transaction ID</th><th>Mode</th><th>Received</th><th>Applied</th><th>Extra</th><th>Note</th></tr></thead>\r
        <tbody>\${rows.map((transaction) => \`<tr ondblclick="viewStudentHistoryByFee('\${transaction.feeId || ""}')">\r
          <td>\${transaction.date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</td>\r
          <td><strong>\${esc(transaction.studentName)}</strong></td>\r
          <td>\${esc(transaction.studentId)}</td>\r
          <td>\${esc(transaction.className)}</td>\r
          <td>\${esc(transaction.month)}</td>\r
          <td style="font-size:12px;word-break:break-all;">\${esc(transaction.txn || "-")}</td>\r
          <td>\${esc(transaction.mode || "-")}</td>\r
          <td><strong>₹\${Number(transaction.received || transaction.applied || 0).toLocaleString("en-IN")}</strong></td>\r
          <td>₹\${Number(transaction.applied || 0).toLocaleString("en-IN")}</td>\r
          <td>₹\${Number(transaction.extra || 0).toLocaleString("en-IN")}</td>\r
          <td style="white-space:normal;min-width:180px;">\${esc(transaction.note || "-")}</td>\r
        </tr>\`).join("")}</tbody>\r
      </table>\`;\r
    };\r
\r
    window.showLatestTransactionDay = () => {\r
      const latest = buildDailyPaymentTransactions(allFees)[0];\r
      if (!latest) return showToast("No fee payment transactions are available.", "error");\r
      document.getElementById("dailyTransactionDate").value = latest.dateKey;\r
      renderDailyTransactions();\r
    };\r
\r
    window.showTodayTransactions = () => {\r
      document.getElementById("dailyTransactionDate").value = localTransactionDateKey(new Date());\r
      renderDailyTransactions();\r
    };\r
\r
    function buildHistoryReceiptHtml(feesToPrint, title = "Fee Receipt") {\r
      const fees = Array.isArray(feesToPrint) ? feesToPrint : [];\r
      const student = currentHistoryStudent || {};\r
      const schoolName = window.SchoolBranding?.getSchoolName?.() || "Schoolix";\r
      const receiptNo = \`RCP-\${student.studentId || "STUDENT"}-\${Date.now().toString().slice(-6)}\`;\r
      const summary = calculateHistoryFeeSummary(fees);\r
      const feeRows = fees.map((fee) => {\r
        const amounts = getFeeAmounts(fee);\r
        const status = getCorrectStatus(fee);\r
        const payments = feePaymentRowsForReceipt(fee);\r
        const txnList = payments.length ? payments.map((payment) => esc(payment.txn)).join("<br>") : getFeeTransactionIds(fee).map((id) => esc(id)).join("<br>") || "-";\r
        const paymentRows = payments.length ? payments.map((payment) => \`\r
          <tr>\r
            <td>\${formatDateTime(payment.date)}</td>\r
            <td>\${esc(payment.txn)}</td>\r
            <td>\${esc(payment.mode)}</td>\r
            <td>Rs \${payment.received.toLocaleString()}</td>\r
            <td>Rs \${payment.applied.toLocaleString()}</td>\r
            <td>Rs \${payment.extra.toLocaleString()}</td>\r
            <td>\${esc(payment.note || "-")}</td>\r
          </tr>\r
        \`).join("") : \`<tr><td colspan="7">No payment transactions recorded.</td></tr>\`;\r
        return \`\r
          <section class="receipt-fee">\r
            <h3>\${esc(fee.month || "Fee Entry")} <span>\${esc(status)}</span></h3>\r
            <table class="receipt-summary-table">\r
              <tr><th>Assigned</th><th>Applied</th><th>Collected</th><th>Extra</th><th>Due</th><th>Transaction No.</th></tr>\r
              <tr>\r
                <td>Rs \${amounts.total.toLocaleString()}</td>\r
                <td>Rs \${amounts.applied.toLocaleString()}</td>\r
                <td>Rs \${amounts.collected.toLocaleString()}</td>\r
                <td>Rs \${amounts.extra.toLocaleString()}</td>\r
                <td>Rs \${amounts.due.toLocaleString()}</td>\r
                <td>\${txnList}</td>\r
              </tr>\r
            </table>\r
            <table>\r
              <thead><tr><th>Date</th><th>Transaction No.</th><th>Mode</th><th>Received</th><th>Applied</th><th>Extra</th><th>Note</th></tr></thead>\r
              <tbody>\${paymentRows}</tbody>\r
            </table>\r
            \${fee.remarks || fee.impositionRemark ? \`<p class="receipt-note"><strong>Remarks:</strong> \${esc(fee.remarks || fee.impositionRemark)}</p>\` : ""}\r
          </section>\r
        \`;\r
      }).join("");\r
\r
      return \`<!DOCTYPE html>\r
      <html><head>\r
<title>\${esc(title)}</title>\r
      <style>\r
        @page{size:A4;margin:12mm}\r
        *{box-sizing:border-box}\r
        body{margin:0;color:#111827;font-family:Arial,sans-serif;font-size:12px;line-height:1.45}\r
        .receipt{max-width:186mm;margin:0 auto}\r
        .receipt-head{display:flex;justify-content:space-between;gap:16px;border-bottom:2px solid #1d4ed8;padding-bottom:12px;margin-bottom:14px}\r
        h1{margin:0;color:#123a8c;font-size:24px}\r
        h2{margin:4px 0 0;font-size:16px}\r
        .meta{text-align:right;color:#475569}\r
        .student-grid,.totals{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}\r
        .box{border:1px solid #cbd5e1;border-radius:8px;padding:8px;background:#f8fafc}\r
        .box small{display:block;color:#64748b;font-weight:700;text-transform:uppercase;font-size:9px}\r
        .box strong{display:block;margin-top:3px;font-size:13px}\r
        .receipt-fee{break-inside:avoid;page-break-inside:avoid;margin-top:14px;border:1px solid #cbd5e1;border-radius:8px;padding:10px}\r
        .receipt-fee h3{display:flex;justify-content:space-between;margin:0 0 8px;color:#172033}\r
        .receipt-fee h3 span{font-size:11px;color:#047857}\r
        table{width:100%;border-collapse:collapse;margin-top:8px;table-layout:fixed}\r
        th{background:#eaf1ff;color:#123a8c;text-align:left;font-size:10px}\r
        th,td{border:1px solid #d8e1ef;padding:6px;vertical-align:top;word-break:break-word}\r
        .receipt-summary-table td{font-weight:700}\r
        .receipt-note{margin:8px 0 0;color:#475569}\r
        .footer{margin-top:18px;border-top:1px solid #cbd5e1;padding-top:8px;color:#64748b;text-align:center;font-size:10px}\r
        @media print{button{display:none}}\r
      </style></head>\r
      <body><div class="receipt">\r
        <div class="receipt-head">\r
          <div><h1>\${esc(schoolName)}</h1><h2>\${esc(title)}</h2></div>\r
          <div class="meta"><strong>Receipt No:</strong> \${esc(receiptNo)}<br><strong>Generated:</strong> \${new Date().toLocaleString("en-IN")}</div>\r
        </div>\r
        <div class="student-grid">\r
          <div class="box"><small>Student</small><strong>\${esc(student.studentName || "-")}</strong></div>\r
          <div class="box"><small>Student ID</small><strong>\${esc(student.studentId || "-")}</strong></div>\r
          <div class="box"><small>Class</small><strong>\${esc([student.class, student.section].filter(Boolean).join("-") || "-")}</strong></div>\r
          <div class="box"><small>Roll</small><strong>\${esc(student.roll || "-")}</strong></div>\r
        </div>\r
        <div class="totals">\r
          <div class="box"><small>Assigned</small><strong>Rs \${summary.total.toLocaleString()}</strong></div>\r
          <div class="box"><small>Applied</small><strong>Rs \${summary.applied.toLocaleString()}</strong></div>\r
          <div class="box"><small>Collected</small><strong>Rs \${summary.collected.toLocaleString()}</strong></div>\r
          <div class="box"><small>Due</small><strong>Rs \${summary.due.toLocaleString()}</strong></div>\r
        </div>\r
        \${feeRows || "<p>No fee records selected.</p>"}\r
        <div class="footer">System generated Schoolix fee receipt. Please verify transaction numbers before handing over.</div>\r
      </div>\r
      <script>window.onload=()=>setTimeout(()=>window.print(),150);<\\/script>\r
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
`},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:`\r
  <link rel="stylesheet" href="admin-shell.css?v=navbar-20260721">\r
  <style id="feesReportProfessionalFinalPolish">
    body {\r
      background:\r
        linear-gradient(90deg, rgba(15, 108, 189, 0.035) 1px, transparent 1px),\r
        linear-gradient(180deg, rgba(15, 108, 189, 0.035) 1px, transparent 1px),\r
        linear-gradient(180deg, #f8fafd 0%, #f3f6fb 100%) !important;\r
      background-size: 34px 34px, 34px 34px, auto !important;\r
      color: #142033;\r
    }\r
\r
    body .btn,\r
    body .btn-primary,\r
    body .btn-info {\r
      background: #0f6cbd;\r
      color: #ffffff;\r
      border-color: transparent;\r
      box-shadow: 0 8px 16px rgba(15, 108, 189, 0.18);\r
    }\r
\r
    body .btn:hover,\r
    body .btn-primary:hover,\r
    body .btn-info:hover {\r
      background: #0b4f8a;\r
      box-shadow: 0 10px 20px rgba(15, 108, 189, 0.22);\r
    }\r
\r
    body .btn-success {\r
      background: #12805c;\r
      box-shadow: 0 8px 16px rgba(18, 128, 92, 0.18);\r
    }\r
\r
    body .btn-warning,\r
    body .btn-partial {\r
      background: #b56c00;\r
      box-shadow: 0 8px 16px rgba(181, 108, 0, 0.16);\r
    }\r
\r
    body .btn-danger,\r
    body button[onclick*="delete"],\r
    body button[onclick*="Delete"] {\r
      background: #b42318;\r
      box-shadow: 0 8px 16px rgba(180, 35, 24, 0.16);\r
    }\r
\r
    body .sx-chart-grid {\r
      grid-template-columns: repeat(3, minmax(0, 1fr));\r
      align-items: stretch;\r
      gap: 14px;\r
    }\r
\r
    body .sx-chart-card {\r
      min-height: 260px;\r
      padding: 18px;\r
    }\r
\r
    body .sx-monthly-demand-card {\r
      grid-column: auto;\r
      min-height: 260px;\r
    }\r
\r
    body .sx-monthly-demand-card .sx-chart-head {\r
      align-items: flex-start;\r
      margin-bottom: 10px;\r
    }\r
\r
    body .sx-monthly-demand-card .sx-chart-title::before {\r
      content: "Finance";\r
      display: block;\r
      width: fit-content;\r
      margin-bottom: 6px;\r
      color: #0b4f8a;\r
      font-size: 11px;\r
      font-weight: 800;\r
      text-transform: uppercase;\r
    }\r
\r
    body #monthlyDemandChart {\r
      overflow-x: auto;\r
      padding: 2px 0 4px;\r
      scrollbar-width: thin;\r
    }\r
\r
    body #monthlyDemandChart .chart-total-row {\r
      min-width: 480px;\r
      justify-content: flex-start;\r
      margin-bottom: 8px;\r
    }\r
\r
    body #monthlyDemandChart .chart-total-pill {\r
      min-height: 28px;\r
      padding: 6px 10px;\r
      background: #f8fafc;\r
      border-color: #d9e2ef;\r
      color: #142033;\r
      font-size: 11px;\r
      font-weight: 850;\r
    }\r
\r
    body #monthlyDemandChart .chart-columns {\r
      grid-template-columns: repeat(12, minmax(32px, 1fr));\r
      gap: 6px;\r
      min-width: 480px;\r
      min-height: 112px;\r
      align-items: end;\r
      padding: 4px 2px 0;\r
    }\r
\r
    body #monthlyDemandChart .chart-column {\r
      gap: 5px;\r
      min-width: 0;\r
    }\r
\r
    body #monthlyDemandChart .chart-column-bar {\r
      width: 100%;\r
      max-height: 86px;\r
      min-height: 12px;\r
      border-radius: 999px;\r
      background: linear-gradient(180deg, rgba(15, 108, 189, 0.9), rgba(13, 148, 136, 0.38));\r
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.42), 0 8px 14px rgba(15, 108, 189, 0.1);\r
    }\r
\r
    body #monthlyDemandChart .chart-column-bar.is-empty {\r
      background: #e7edf6;\r
      box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.05);\r
    }\r
\r
    body #monthlyDemandChart .chart-column-value {\r
      min-height: 16px;\r
      max-width: 46px;\r
      color: #5f6f86;\r
      font-size: 9px;\r
      font-weight: 800;\r
      line-height: 1.2;\r
      overflow: hidden;\r
      text-overflow: ellipsis;\r
    }\r
\r
    body #monthlyDemandChart .chart-column-label {\r
      color: #142033;\r
      font-size: 10px;\r
      font-weight: 850;\r
      line-height: 1.2;\r
    }\r
\r
    @media (max-width: 1180px) {\r
      body .sx-chart-grid {\r
        grid-template-columns: repeat(2, minmax(0, 1fr));\r
      }\r
\r
      body .sx-monthly-demand-card {\r
        grid-column: 1 / -1;\r
      }\r
    }\r
\r
    @media (max-width: 760px) {\r
      body .sx-chart-grid {\r
        grid-template-columns: 1fr;\r
      }\r
\r
      body #monthlyDemandChart .chart-total-row,\r
      body #monthlyDemandChart .chart-columns {\r
        min-width: 420px;\r
      }\r
    }\r
  `},{tag:"style",attributes:{id:"feesReportMatureConsolePolish"},text:`
    body {
      background:
        linear-gradient(90deg, rgba(30, 64, 175, 0.03) 1px, transparent 1px),
        linear-gradient(180deg, rgba(30, 64, 175, 0.03) 1px, transparent 1px),
        linear-gradient(180deg, #f7f9fc 0%, #eef3f8 100%) !important;
      color: #101828;
    }

    body .container {
      max-width: 1540px;
      gap: 16px;
    }

    body .top-bar {
      min-height: 176px;
      align-items: center;
      padding: 30px 32px;
      background:
        linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 64, 175, 0.9)),
        #101828;
      border-color: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
    }

    body .top-bar::before {
      width: 100%;
      background:
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(180deg, rgba(255,255,255,0.06) 1px, transparent 1px);
      background-size: 42px 42px;
      opacity: 0.45;
    }

    body .top-bar > * {
      position: relative;
      z-index: 1;
    }

    body .page-eyebrow {
      width: fit-content;
      margin-bottom: 12px;
      padding: 6px 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.84);
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
    }

    body .top-bar h1 {
      color: #ffffff;
      font-size: 40px;
      letter-spacing: 0;
    }

    body .top-bar p {
      max-width: 680px;
      color: rgba(255, 255, 255, 0.76);
      font-size: 15px;
      line-height: 1.55;
    }

    body .top-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      max-width: 560px;
    }

    body .top-bar .btn {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.18);
      color: #ffffff;
      box-shadow: none;
    }

    body .top-bar .btn:hover {
      background: rgba(255,255,255,0.2);
      border-color: rgba(255,255,255,0.28);
    }

    body .fee-ops-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.35fr) minmax(280px, 0.8fr);
      gap: 14px;
      align-items: stretch;
    }

    body .impose-section,
    body .fee-manage-panel {
      height: 100%;
      padding: 22px;
      border-radius: 8px;
      box-shadow: 0 10px 28px rgba(16, 24, 40, 0.06);
    }

    body .impose-section h2,
    body .fee-manage-panel h2,
    body .card-head h2 {
      margin-bottom: 6px;
      font-size: 18px;
      letter-spacing: 0;
    }

    body .section-note,
    body .fee-manage-panel p,
    body .card-head p {
      margin: 0 0 16px;
      color: #667085;
      font-size: 13px;
      line-height: 1.5;
    }

    body .form-group {
      gap: 10px;
      margin-bottom: 0;
    }

    body input,
    body select {
      min-height: 42px;
      border-radius: 7px;
      background: #fcfcfd;
      border-color: #d0d5dd;
      font-size: 13px;
      font-weight: 700;
    }

    body .btn {
      min-height: 42px;
      border-radius: 7px;
      font-size: 13px;
      box-shadow: none;
    }

    body .stats-grid {
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 10px;
    }

    body .stat-card {
      min-height: 112px;
      padding: 16px;
      border-color: #e4e7ec;
      box-shadow: 0 8px 22px rgba(16, 24, 40, 0.05);
    }

    body .stat-card::before,
    body .stat-paid::before,
    body .stat-partial::before,
    body .stat-pending::before,
    body .stat-unpaid::before,
    body .stat-imposed::before,
    body .stat-total::before {
      height: 3px;
      background: #344054;
    }

    body .stat-paid::before,
    body .stat-total::before { background: #027a48; }
    body .stat-pending::before,
    body .stat-unpaid::before { background: #b42318; }
    body .stat-imposed::before { background: #175cd3; }

    body .stat-number {
      font-size: 24px;
      line-height: 1.1;
      color: #101828 !important;
    }

    body .stat-label {
      color: #667085;
      font-size: 11px;
      letter-spacing: .04em;
    }

    body .sx-chart-grid {
      gap: 14px;
    }

    body .sx-chart-card {
      min-height: 238px;
      border-color: #e4e7ec;
      box-shadow: 0 8px 22px rgba(16, 24, 40, 0.05);
    }

    body .sx-chart-title {
      font-size: 16px;
      color: #101828;
    }

    body .filter-card,
    body .report-card {
      border-color: #e4e7ec;
      box-shadow: 0 10px 28px rgba(16, 24, 40, 0.06);
    }

    body .card-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 14px;
    }

    body .filter-card .form-group {
      grid-template-columns: minmax(260px, 1.4fr) repeat(5, minmax(130px, 0.8fr)) repeat(2, auto);
      align-items: stretch;
    }

    body .report-card {
      padding: 0;
      overflow: hidden;
    }

    body .report-card .card-head,
    body .report-actions {
      padding-left: 22px;
      padding-right: 22px;
    }

    body .report-card .card-head {
      padding-top: 22px;
      margin-bottom: 0;
    }

    body .report-card #totalRecords {
      color: #667085 !important;
      font-size: 13px;
      font-weight: 800;
    }

    body .report-actions {
      margin: 12px 0 16px;
    }

    body #reportsTable {
      overflow-x: auto;
      border-top: 1px solid #eaecf0;
    }

    body #reportsTable table {
      min-width: 1220px;
      margin: 0;
      border: 0;
      border-radius: 0;
      box-shadow: none;
    }

    body #reportsTable th {
      position: sticky;
      top: 0;
      z-index: 2;
      background: #f9fafb;
      color: #475467;
      border-bottom: 1px solid #eaecf0;
      font-size: 11px;
      letter-spacing: .04em;
      white-space: nowrap;
    }

    body #reportsTable td {
      padding: 13px 14px;
      border-bottom: 1px solid #f2f4f7;
      color: #344054;
      font-size: 13px;
      vertical-align: middle;
    }

    body #reportsTable td:nth-child(2),
    body #reportsTable td:nth-child(3) {
      color: #101828;
      font-weight: 800;
    }

    body #reportsTable tr:hover,
    body #reportsTable tr.selected {
      background: #f5f8ff !important;
    }

    body .status-paid,
    body .status-partial,
    body .status-pending,
    body .status-unpaid,
    body .status-imposed {
      min-height: 28px;
      padding: 5px 9px;
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
    }

    body .pagination {
      justify-content: space-between;
      padding: 14px 22px 18px;
      border-top: 1px solid #eaecf0;
      background: #ffffff;
    }

    body .page-info,
    body .pagination-btn {
      box-shadow: none;
      border-color: #d0d5dd;
      color: #344054;
      font-size: 12px;
      font-weight: 800;
    }

    body .pagination-btn.active,
    body .pagination-btn:hover {
      background: #175cd3;
      border-color: #175cd3;
      color: #ffffff;
    }

    body .no-data {
      margin: 0;
      padding: 44px 22px;
      background: #fcfcfd;
      color: #667085;
      font-style: normal;
      font-weight: 800;
    }
\r
    body .daily-transactions-card .card-head { align-items: flex-end; }\r
\r
    body .daily-transaction-controls {\r
      display: flex;\r
      align-items: center;\r
      gap: 8px;\r
      flex-wrap: wrap;\r
    }\r
\r
    body .daily-transaction-controls input[type="date"] {\r
      width: auto;\r
      min-width: 170px;\r
    }\r
\r
    body .daily-transaction-summary {\r
      display: grid;\r
      grid-template-columns: repeat(3, minmax(0, 1fr));\r
      border: 1px solid #e4e7ec;\r
      border-radius: 8px;\r
      margin: 0 20px 16px;\r
      overflow: hidden;\r
      background: #f8fafc;\r
    }\r
\r
    body .daily-transaction-summary > div {\r
      padding: 12px 14px;\r
      border-right: 1px solid #e4e7ec;\r
    }\r
\r
    body .daily-transaction-summary > div:last-child { border-right: 0; }\r
    body .daily-transaction-summary small,\r
    body .daily-transaction-summary strong { display: block; }\r
    body .daily-transaction-summary small { color: #667085; font-size: 11px; font-weight: 700; }\r
    body .daily-transaction-summary strong { margin-top: 3px; color: #172033; font-size: 16px; }\r
\r
    body #dailyTransactionsTable {\r
      overflow: auto;\r
      border-top: 1px solid #e4e7ec;\r
    }\r
\r
    body #dailyTransactionsTable table { min-width: 1080px; margin: 0; }\r

    @media (max-width: 1280px) {
      body .fee-ops-grid,
      body .filter-card .form-group {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      body .stats-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 760px) {
      body .top-bar,
      body .fee-ops-grid,
      body .filter-card .form-group {
        grid-template-columns: 1fr;
      }

      body .top-actions,
      body .top-bar .btn {
        width: 100%;
      }

      body .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      body .top-bar h1 {
        font-size: 30px;
      }
\r
      body .daily-transaction-controls,\r
      body .daily-transaction-controls input,\r
      body .daily-transaction-controls .btn { width: 100%; }\r
\r
      body .daily-transaction-summary {\r
        grid-template-columns: 1fr;\r
        margin-inline: 14px;\r
      }\r
\r
      body .daily-transaction-summary > div {\r
        border-right: 0;\r
        border-bottom: 1px solid #e4e7ec;\r
      }\r
\r
      body .daily-transaction-summary > div:last-child { border-bottom: 0; }\r
    }

    @media print {
      @page { size: landscape; margin: 8mm; }

      body {
        padding: 0;
        background: #fff !important;
        color: #000 !important;
      }

      body > *:not(.container) {
        display: none !important;
      }

      .container {
        max-width: none;
        width: 100%;
        margin: 0;
      }

      .top-bar,
      .fee-ops-grid,
      .stats-grid,
      .sx-chart-grid,
      .filter-card,
      .daily-transactions-card,\r
      .report-actions,
      .pagination,
      .report-card > .card-head p,
      .report-print-hidden {
        display: none !important;
      }

      .report-card {
        display: block !important;
        border: 0 !important;
        box-shadow: none !important;
        overflow: visible !important;
      }

      .report-card > .card-head {
        display: block !important;
        padding: 0 0 6px !important;
        margin: 0 !important;
      }

      #reportsTable {
        overflow: visible !important;
        border: 0 !important;
      }

      #reportsTable table {
        width: 100% !important;
        min-width: 0 !important;
        table-layout: fixed;
        margin: 0 !important;
        border: 1px solid #333 !important;
        box-shadow: none !important;
        font-size: 8px !important;
      }

      #reportsTable thead { display: table-header-group; }
      #reportsTable tr { break-inside: avoid; page-break-inside: avoid; }
      #reportsTable th,
      #reportsTable td {
        padding: 3px 4px !important;
        color: #000 !important;
        border: 1px solid #999 !important;
        vertical-align: top;
        white-space: normal !important;
        word-break: break-word;
      }

      #reportsTable th { position: static !important; background: #eee !important; }
      #reportsTable th:nth-child(1),
      #reportsTable td:nth-child(1),
      #reportsTable th:nth-child(12),
      #reportsTable td:nth-child(12) { display: none !important; }
      #reportsTable .status-paid,
      #reportsTable .status-partial,
      #reportsTable .status-pending,
      #reportsTable .status-unpaid,
      #reportsTable .status-imposed {
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        color: #000 !important;
      }
    }
  `}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
    import { initializeApp } from "./firebase-compat.js";
    import {
      getFirestore, collection, getDocs, getDoc, query, where, orderBy, doc, serverTimestamp, updateDoc, setDoc, deleteDoc
    } from "./firebase-compat.js";
    import { getAuth, onAuthStateChanged } from "./firebase-compat.js";\r
    import { newLedgerTransactionId, syncFeeCredit } from "./accounts-ledger.js";\r
\r
    // Firebase config same...\r
    const firebaseConfig = {\r
      apiKey: "AIzaSyAomGwef93HFT9Xyx7SVW95FPw_IcIAICE",\r
      authDomain: "schoolix-48107.firebaseapp.com",\r
      projectId: "schoolix-48107",\r
      storageBucket: "schoolix-48107.firebasestorage.app",\r
      messagingSenderId: "133937954491",\r
      appId: "1:133937954491:web:69d8064422617eb8c4339e",\r
      measurementId: "G-EG23XE5Q0Z"\r
    };\r
\r
    const app = initializeApp(firebaseConfig);\r
    const db = getFirestore(app);\r
    const auth = getAuth(app);\r
\r
    let currentUser = null;\r
    let currentUserData = null;\r
    let activeSchoolId = "";\r
    let allFees = [];\r
    let filteredFees = [];\r
    let currentPage = 1;\r
    let rowsPerPage = 10;\r
    let selectedRows = new Set();\r
    let studentsToImpose = [];\r
    let imposeConfig = {};\r
    let currentPartialFee = null;\r
    let currentPartialFeeId = null;\r
    let currentHistoryStudent = null;\r
    let currentHistoryFees = [];
    let pendingFinePreview = null;
    let finePreviewSelections = {};
    let autoFineApplying = false;
    let feeImposeInProgress = false;
    let feeCleanupInProgress = false;
    let feeDeleteInProgress = false;
    let studentTcMap = {};
    let activeSessionId = "";\r
    let activeSessionLabel = "";
    let activeSessionLocked = false;
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function normalizeFeeMonth(value) {
      const raw = String(value || "").trim();
      if (!raw) return "";
      if (/^\\d{1,2}$/.test(raw)) {
        const monthNumber = Number(raw);
        if (monthNumber >= 1 && monthNumber <= 12) return monthOrder[monthNumber - 1];
      }
      const compact = raw.toLowerCase().replace(/[^a-z]/g, "");
      const matchedMonth = monthOrder.find((month) => {
        const canonical = month.toLowerCase();
        return compact === canonical || compact === canonical.slice(0, 3) || compact.startsWith(canonical);
      });
      return matchedMonth || raw;
    }
\r
    function renderFeeDonut(targetId, items, centerText, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const total = items.reduce((sum, item) => sum + item.value, 0);\r
      if (!total) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      let cursor = 0;\r
      const gradient = items.map((item) => {\r
        const start = cursor;\r
        const end = cursor + (item.value / total) * 360;\r
        cursor = end;\r
        return \`\${item.color} \${start}deg \${end}deg\`;\r
      }).join(", ");\r
      target.innerHTML = \`\r
        <div class="sx-donut-wrap">\r
          <div class="sx-donut" data-center="\${centerText}" style="background:conic-gradient(\${gradient});"></div>\r
          <div class="sx-legend">\r
            \${items.map((item) => \`\r
              <div class="sx-legend-item">\r
                <span class="sx-dot" style="--dot:\${item.color}"></span>\r
                <span>\${item.label}</span>\r
                <strong>₹\${Math.round(item.value).toLocaleString()}</strong>\r
              </div>\r
            \`).join("")}\r
          </div>\r
        </div>\r
      \`;\r
    }\r
\r
    function renderFeeBarsLegacy(targetId, items, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const visible = items.filter((item) => item.value > 0);\r
      const max = Math.max(...visible.map((item) => item.value), 0);\r
      if (!max) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      target.innerHTML = \`\r
        <div class="sx-bars">\r
          \${visible.map((item) => \`\r
            <div class="sx-bar-item">\r
              <div class="sx-bar-value">₹\${Math.round(item.value).toLocaleString()}</div>\r
              <div class="sx-bar-track">\r
                <div class="sx-bar-fill" style="height:\${Math.max(8, (item.value / max) * 100)}%;background:\${item.color};"></div>\r
              </div>\r
              <div class="sx-bar-label">\${item.label.slice(0, 3)}</div>\r
            </div>\r
          \`).join("")}\r
        </div>\r
      \`;\r
    }\r
\r
    function formatChartCurrency(value = 0) {\r
      const amount = Math.round(Number(value) || 0);\r
      if (amount >= 10000000) return \`₹\${(amount / 10000000).toFixed(amount % 10000000 ? 1 : 0)}Cr\`;\r
      if (amount >= 100000) return \`₹\${(amount / 100000).toFixed(amount % 100000 ? 1 : 0)}L\`;\r
      if (amount >= 1000) return \`₹\${(amount / 1000).toFixed(amount % 1000 ? 1 : 0)}k\`;\r
      return \`₹\${amount.toLocaleString("en-IN")}\`;\r
    }\r
\r
    function renderFeeBars(targetId, items, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const visible = items.filter((item) => item.value > 0);\r
      const max = Math.max(...visible.map((item) => item.value), 0);\r
      if (!max) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      const total = items.reduce((sum, item) => sum + item.value, 0);\r
      target.innerHTML = \`\r
        <div class="chart-total-row"><span class="chart-total-pill">Total \${formatChartCurrency(total)}</span></div>\r
        <div class="chart-columns">\r
          \${items.map((item) => {\r
            const hasValue = item.value > 0;\r
            const height = hasValue ? Math.max(18, (item.value / max) * 82) : 12;\r
            return \`\r
              <div class="chart-column">\r
                <div class="chart-column-value">\${hasValue ? formatChartCurrency(item.value) : ""}</div>\r
                <div class="chart-column-bar\${hasValue ? "" : " is-empty"}" title="\${item.label}: ₹\${Math.round(item.value).toLocaleString("en-IN")}" style="height:\${height}px;\${hasValue ? \`background:\${item.color};\` : ""}"></div>\r
                <div class="chart-column-label">\${item.label.slice(0, 3)}</div>\r
              </div>\r
            \`;\r
          }).join("")}\r
        </div>\r
      \`;\r
    }\r
\r
    function renderStatusOverview(targetId, items, emptyText) {\r
      const target = document.getElementById(targetId);\r
      if (!target) return;\r
      const total = items.reduce((sum, item) => sum + item.value, 0);\r
      if (!total) {\r
        target.innerHTML = \`<div class="sx-chart-empty">\${emptyText}</div>\`;\r
        return;\r
      }\r
      target.innerHTML = \`\r
        <div class="sx-status-list">\r
          \${items.map((item) => \`\r
            <div class="sx-status-row">\r
              <strong>\${item.label}</strong>\r
              <div class="sx-status-track">\r
                <div class="sx-status-fill" style="width:\${Math.max(4, (item.value / total) * 100)}%;background:\${item.color};"></div>\r
              </div>\r
              <span>\${item.value}</span>\r
            </div>\r
          \`).join("")}\r
        </div>\r
      \`;\r
    }\r
\r
    function sourceFeesForReportRows(reportRows) {\r
      const ids = new Set((reportRows || []).map((entry) => entry.reportFeeId || entry.id).filter(Boolean));\r
      return allFees.filter((fee) => ids.has(fee.id));\r
    }\r
\r
    function updateFeeAnalytics(reportRows) {\r
      const fees = sourceFeesForReportRows(reportRows);\r
      let totalImposed = 0;\r
      let totalCollected = 0;\r
      let totalOutstanding = 0;\r
      const chartPalette = ["#2563eb", "#10b981", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16", "#f59e0b", "#14b8a6", "#6366f1", "#e11d48"];\r
      const monthTotals = new Map(monthOrder.map((month) => [month, 0]));\r
      const statusTotals = new Map([\r
        ["Paid", 0],\r
        ["Partial", 0],\r
        ["Pending", 0],\r
        ["Imposed", 0]\r
      ]);\r
\r
      fees.forEach((fee) => {\r
        const amounts = getFeeAmounts(fee);\r
        const status = getCorrectStatus(fee);\r
        totalImposed += amounts.total;\r
        totalCollected += amounts.collected;\r
        const reportMonth = normalizeFeeMonth(fee.month) || "Other";
        monthTotals.set(reportMonth, (monthTotals.get(reportMonth) || 0) + amounts.total);
        statusTotals.set(status, (statusTotals.get(status) || 0) + 1);\r
        totalOutstanding += amounts.due;\r
      });\r
\r
      renderFeeDonut("collectionMixChart", [\r
        { label: "Collected", value: totalCollected, color: "#16a34a" },\r
        { label: "Outstanding", value: totalOutstanding, color: "#f97316" }\r
      ], \`\${totalImposed ? Math.round((totalCollected / totalImposed) * 100) : 0}%\`, "No fee collection data available.");\r
\r
      const note = document.getElementById("collectionMixNote");\r
      if (note) note.textContent = \`₹\${Math.round(totalCollected).toLocaleString()} collected from ₹\${Math.round(totalImposed).toLocaleString()} imposed\`;\r
\r
      const monthlyItems = Array.from(monthTotals.entries()).map(([label, value], index) => ({\r
        label,\r
        value,\r
        color: chartPalette[index % chartPalette.length]\r
      }));\r
      renderFeeBars("monthlyDemandChart", monthlyItems, "No monthly fee demand to chart yet.");\r
      const monthNote = document.getElementById("monthlyDemandNote");\r
      if (monthNote) monthNote.textContent = \`\${fees.length} unique fee records in the current view\`;\r
\r
      renderStatusOverview("statusOverviewChart", [\r
        { label: "Paid", value: statusTotals.get("Paid") || 0, color: "#16a34a" },\r
        { label: "Partial", value: statusTotals.get("Partial") || 0, color: "#2563eb" },\r
        { label: "Pending", value: statusTotals.get("Pending") || 0, color: "#f59e0b" },\r
        { label: "Imposed", value: statusTotals.get("Imposed") || 0, color: "#7c3aed" }\r
      ], "No fee statuses to chart yet.");\r
      const statusNote = document.getElementById("statusOverviewNote");\r
      if (statusNote) statusNote.textContent = \`\${fees.length} unique fee records in this report view\`;\r
    }\r
\r
    function getExportSchoolName() {\r
      const schoolName = window.SchoolBranding?.getSchoolName() || "Schoolix";\r
      const sanitized = schoolName.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");\r
      return sanitized || "Schoolix";\r
    }\r
\r
    function enableAdminNavigation() {
      document.body.classList.remove("sx-accountant-shell-enabled", "library-dashboard-app", "sx-accountant-fees-workspace");
      document.querySelectorAll("#librarySidebar, #librarySidebarOverlay, #libraryMenuButton").forEach((element) => element.remove());
      const dashboardBtn = document.getElementById("adminDashboardBtn");
      if (dashboardBtn) dashboardBtn.style.display = "";
      if (document.querySelector('script[data-admin-shell="true"]')) return;\r
      const script = document.createElement("script");\r
      script.src = "admin-shell.js?v=navbar-20260721";\r
      script.defer = true;\r
      script.dataset.adminShell = "true";\r
      document.body.appendChild(script);\r
    }\r
\r
    function enableAccountantWorkspace() {
      document.body.classList.add("sx-accountant-fees-workspace");
      document.body.dataset.accountantPage = "fees";
      document.body.classList.remove("sx-admin-shell-enabled", "sx-admin-shell-open", "sx-admin-shell-collapsed");
      document.querySelectorAll(".sx-admin-sidebar, .sx-admin-menu-btn, .sx-admin-overlay, .sx-admin-header").forEach((element) => element.remove());
      const dashboardBtn = document.getElementById("adminDashboardBtn");
      if (dashboardBtn) dashboardBtn.remove();
      const activate = () => window.enableAccountantShell?.();
      if (window.enableAccountantShell) {
        activate();
        return;
      }
      if (document.querySelector('script[data-accountant-shell="true"]')) return;
      const script = document.createElement("script");
      script.src = "accountant-portal.js";
      script.defer = true;
      script.dataset.accountantShell = "true";
      script.addEventListener("load", activate);
      document.body.appendChild(script);
    }
\r
    async function loadActiveSession() {\r
      activeSessionId = "";\r
      activeSessionLabel = "";\r
      activeSessionLocked = false;\r
      try {\r
        let viewSessionId = "";\r
        try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}\r
        const activeSnap = await getDoc(doc(db, "schools", activeSchoolId, "settings", "activeSession"));\r
        activeSessionId = viewSessionId || (activeSnap.exists() ? activeSnap.data().sessionId || "" : "");\r
        if (!activeSessionId) return;\r
        const sessionSnap = await getDoc(doc(db, "schools", activeSchoolId, "sessions", activeSessionId));\r
        if (!sessionSnap.exists()) {\r
          try { if (viewSessionId) localStorage.removeItem("schoolix.viewSessionId"); } catch (_) {}\r
          activeSessionId = activeSnap.exists() ? activeSnap.data().sessionId || "" : "";\r
          if (!activeSessionId || activeSessionId === viewSessionId) return;\r
          const fallbackSnap = await getDoc(doc(db, "schools", activeSchoolId, "sessions", activeSessionId));\r
          if (!fallbackSnap.exists()) return;\r
          const fallbackData = fallbackSnap.data();\r
          activeSessionLabel = fallbackData.session || fallbackData.name || "";\r
          activeSessionLocked = fallbackData.locked === true;\r
          return;\r
        }\r
        const data = sessionSnap.data();\r
        activeSessionLabel = data.session || data.name || "";\r
        activeSessionLocked = data.locked === true;\r
      } catch (error) {\r
        console.warn("Active session load failed; showing all fee records.", error);\r
        activeSessionId = "";\r
        activeSessionLabel = "";\r
        activeSessionLocked = false;\r
      }\r
    }\r
\r
    function feeBelongsToActiveSession(fee) {\r
      if (!activeSessionId && !activeSessionLabel) return true;\r
      if (!fee.sessionId && !fee.session && !fee.currentYear && !fee.academicSession) return false;\r
      return fee.sessionId === activeSessionId ||\r
        fee.session === activeSessionLabel ||\r
        fee.currentYear === activeSessionLabel ||\r
        fee.academicSession === activeSessionLabel;\r
    }\r
\r
    function sessionFeeFields() {
      return { sessionId: activeSessionId || "", session: activeSessionLabel || "" };
    }

    function feeStudentIdentityKey(fee) {
      const directId = String(fee.studentId || fee.studentDocId || "").trim().toLowerCase();
      if (directId) return directId;
      const profileKey = [
        fee.studentName || fee.name || "",
        fee.class || fee.currentClass || fee.finalClass || "",
        fee.section || "",
        fee.roll || fee.rollNo || ""
      ].map((value) => String(value).trim().toLowerCase()).filter(Boolean).join("|");
      return profileKey || String(fee.id || "").trim().toLowerCase();
    }

    function feeRecordKey(fee) {
      const sessionKey = activeSessionId || activeSessionLabel
        ? "active-session"
        : String(fee.sessionId || fee.session || fee.currentYear || fee.academicSession || "current").trim().toLowerCase();
      return [
        feeStudentIdentityKey(fee),
        normalizeFeeMonth(fee.month).toLowerCase(),
        sessionKey
      ].join("|");
    }

    function feeDocIdPart(value, fallback) {
      return String(value || fallback || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 70) || fallback;
    }

    function feeTypeIdentity(fee) {
      return String(fee?.feeType || fee?.type || fee?.category || "monthly").trim().toLowerCase() || "monthly";
    }

    function deterministicMonthlyFeeDocId(studentId, month, feeType = "monthly") {
      const sessionKey = activeSessionId || activeSessionLabel || "current";
      return [
        "monthly-fee",
        feeDocIdPart(sessionKey, "current"),
        feeDocIdPart(studentId, "student"),
        feeDocIdPart(month, "month"),
        feeDocIdPart(feeType, "monthly")
      ].join("_");
    }

    function deterministicBulkFeeDocId(studentId, month) {
      return deterministicMonthlyFeeDocId(studentId, month);
    }

    async function findExistingMonthlyFeeRecords(student, month, feeType = "monthly") {
      const studentId = typeof student === "object" ? student?.studentId : student;
      const studentDocId = typeof student === "object" ? (student?.studentDocId || student?.id || "") : "";
      const feesRef = collection(db, "schools", activeSchoolId, "fees");
      const hasStudentId = studentId !== undefined && studentId !== null && Boolean(String(studentId).trim());
      const identityMatches = (fee) =>
        (hasStudentId && String(fee.studentId || "").trim().toLowerCase() === String(studentId).trim().toLowerCase()) ||
        (studentDocId && fee.studentDocId === studentDocId);
      const wantedMonth = normalizeFeeMonth(month).toLowerCase();
      const matchesMonthlyFee = (fee) =>
        identityMatches(fee) &&
        feeBelongsToActiveSession(fee) &&
        normalizeFeeMonth(fee.month).toLowerCase() === wantedMonth &&
        feeTypeIdentity(fee) === feeTypeIdentity({ feeType });

      const cached = allFees.filter(matchesMonthlyFee);
      if (cached.length) return cached;
      if (!hasStudentId && !studentDocId) return [];

      // Older entries may contain only a session label or differently-cased month.
      // Querying those exact fields caused an existing monthly fee to be missed.
      const lookupField = hasStudentId ? "studentId" : "studentDocId";
      const lookupValue = hasStudentId ? studentId : studentDocId;
      const snapshots = [await getDocs(query(feesRef, where(lookupField, "==", lookupValue)))];
      const existing = new Map();
      snapshots.forEach((snapshot) => snapshot.docs.forEach((feeDoc) => {
        existing.set(feeDoc.id, { id: feeDoc.id, ...feeDoc.data() });
      }));
      return Array.from(existing.values()).filter(matchesMonthlyFee);
    }

    async function createMonthlyFeeIfMissing(student, month, payload, feeType = "monthly") {
      const normalizedMonth = normalizeFeeMonth(month);
      const feeRef = doc(db, "schools", activeSchoolId, "fees", deterministicMonthlyFeeDocId(student.studentId, normalizedMonth, feeType));
      const feeSnap = await getDoc(feeRef);
      if (feeSnap.exists()) return { created: false, fee: { id: feeRef.id, ...feeSnap.data() } };

      const existing = await findExistingMonthlyFeeRecords(student, normalizedMonth, feeType);
      if (existing.length) return { created: false, fee: mergeDuplicateFeeRecords(existing)[0] };

      // The duplicate bug came from random addDoc() IDs after a read-then-write check.
      // A deterministic monthly fee ID makes the write idempotent: repeated clicks/runs
      // target the same document for the same student + session + month + fee type.
      const normalizedPayload = { ...payload, month: normalizedMonth };
      await setDoc(feeRef, normalizedPayload, { merge: false });
      return { created: true, id: feeRef.id, fee: { id: feeRef.id, ...normalizedPayload } };
    }

    function uniqueBySignature(items = [], signatureFn) {
      const seen = new Set();
      return items.filter((item, index) => {
        const signature = signatureFn(item, index);
        if (seen.has(signature)) return false;
        seen.add(signature);
        return true;
      });
    }

    function uniqueImpositionEntries(fee) {
      return uniqueBySignature(
        Array.isArray(fee?.impositions) ? fee.impositions : [],
        (imposition) => String(imposition.impositionKey || [
          normalizeFeeMonth(imposition.month || fee.month || ""),
          imposition.amount || 0,
          imposition.remarks || ""
        ].join("|")).toLowerCase()
      );
    }

    function normalizeFeeRecord(fee) {
      const month = normalizeFeeMonth(fee.month);
      const normalizedFee = {
        ...fee,
        month,
        impositions: uniqueImpositionEntries(fee).map((imposition) => ({
          ...imposition,
          month: normalizeFeeMonth(imposition.month || month)
        }))
      };
      const impositions = normalizedFee.impositions;
      if (!impositions.length) return normalizedFee;
      const fineAmount = getTotalFineAmount(normalizedFee);
      const uniquePrincipal = impositions.reduce((sum, imposition) => sum + Number(imposition.amount || 0), 0);
      const storedTotal = Number(normalizedFee.originalAmount ?? normalizedFee.amount ?? 0);
      if (uniquePrincipal <= 0 || uniquePrincipal >= storedTotal) {
        return normalizedFee;
      }
      const totalPaidAmount = getTotalPaidAmount(normalizedFee);
      const totalExtraPaidAmount = getTotalExtraPaidAmount(normalizedFee);
      const correctedTotal = uniquePrincipal + fineAmount;
      const remainingAmount = Math.max(0, correctedTotal - totalPaidAmount);
      return {
        ...normalizedFee,
        impositions,
        amount: correctedTotal,
        originalAmount: correctedTotal,
        remainingAmount,
        totalCollectedAmount: totalPaidAmount + totalExtraPaidAmount,
        status: remainingAmount <= 0 ? "Paid" : totalPaidAmount > 0 ? "Partial" : (normalizedFee.status || "Imposed")
      };
    }

    function limitImpositionsToPrincipal(impositions = [], principalAmount = 0) {
      const target = Math.max(0, Number(principalAmount || 0));
      if (!target) return impositions;
      let remaining = target;
      const limited = [];
      for (const imposition of impositions) {
        const amount = Math.max(0, Number(imposition.amount || 0));
        if (!amount || remaining <= 0) continue;
        const includedAmount = Math.min(amount, remaining);
        limited.push(includedAmount === amount ? imposition : { ...imposition, amount: includedAmount });
        remaining -= includedAmount;
      }
      return limited;
    }

    function mergeDuplicateFeeRecords(records = []) {
      const grouped = new Map();
      records.map(normalizeFeeRecord).forEach((fee) => {
        const key = feeRecordKey(fee);
        if (!fee.month) {
          grouped.set(\`\${key}|\${fee.id || grouped.size}\`, [fee]);
          return;
        }
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key).push(fee);
      });

      const merged = [];
      grouped.forEach((fees) => {
        if (fees.length === 1) {
          merged.push(normalizeFeeRecord(fees[0]));
          return;
        }
        const primary = fees.slice().sort((a, b) => feeDateValue(b) - feeDateValue(a))[0];
        const principalAmount = Math.max(...fees.map((fee) =>
          Math.max(0, Number(fee.originalAmount ?? fee.amount ?? 0) - getTotalFineAmount(fee))
        ));
        const payments = uniqueBySignature(
          fees.flatMap((fee) => (Array.isArray(fee.payments) ? fee.payments : [])
            .map((payment, index) => ({ ...payment, __sourceFeeId: fee.id || "", __sourcePaymentIndex: index }))),
          (payment) => String(payment.transactionId || payment.ledgerTransactionId || payment.txnId || payment.paymentId || [
            payment.__sourceFeeId,
            payment.__sourcePaymentIndex,
            payment.receivedAmount ?? payment.amount ?? 0,
            payment.appliedAmount ?? payment.amount ?? 0,
            payment.extraAmount || 0,
            payment.note || payment.remarks || "",
            payment.status || "",
            payment.date?.toDate?.()?.toISOString?.() || payment.date || payment.paidAt || payment.createdAt || ""
          ].join("|")).toLowerCase()
        ).map(({ __sourceFeeId, __sourcePaymentIndex, ...payment }) => payment);
        const paymentPaidAmount = payments.reduce((sum, payment) => sum + Number(payment.appliedAmount ?? payment.amount ?? 0), 0);
        const storedPaidAmount = Math.max(...fees.map((fee) => Number(fee.totalPaidAmount ?? fee.paidAmount ?? 0)));
        const totalPaidAmount = Math.max(paymentPaidAmount, storedPaidAmount);
        const paymentExtraAmount = payments.reduce((sum, payment) => sum + Number(payment.extraAmount || 0), 0);
        const storedExtraAmount = Math.max(...fees.map((fee) => getTotalExtraPaidAmount(fee)));
        const totalExtraPaidAmount = Math.max(paymentExtraAmount, storedExtraAmount);
        const orderedFees = [primary, ...fees.filter((fee) => fee.id !== primary.id)];
        const impositions = limitImpositionsToPrincipal(uniqueBySignature(
          orderedFees.flatMap((fee) => getImpositionEntries(fee)),
          (imposition) => String([
            imposition.impositionKey || normalizeFeeMonth(imposition.month || primary.month || ""),
            imposition.amount || 0,
            imposition.remarks || ""
          ].join("|")).toLowerCase()
        ), principalAmount);
        const fineDetails = uniqueBySignature(
          fees.flatMap((fee) => getFineDetails(fee)),
          (fine) => String(fine.ruleKey || [fine.amount || 0, fine.reason || ""].join("|")).toLowerCase()
        );
        const fineAmount = fineDetails.reduce((sum, fine) => sum + Number(fine.amount || 0), 0);
        const correctedOriginalAmount = principalAmount + fineAmount;
        const remainingAmount = Math.max(0, correctedOriginalAmount - totalPaidAmount);
        merged.push(normalizeFeeRecord({
          ...primary,
          duplicateFeeIds: fees.map((fee) => fee.id).filter((id) => id && id !== primary.id),
          amount: correctedOriginalAmount,
          originalAmount: correctedOriginalAmount,
          paidAmount: totalPaidAmount,
          totalPaidAmount,
          totalExtraPaidAmount,
          totalCollectedAmount: totalPaidAmount + totalExtraPaidAmount,
          remainingAmount,
          status: remainingAmount <= 0 ? "Paid" : totalPaidAmount > 0 ? "Partial" : (primary.status || "Imposed"),
          payments,
          impositions,
          fineDetails,
          remarks: primary.remarks || fees.find((fee) => fee.remarks)?.remarks || "",
          impositionRemark: primary.impositionRemark || fees.find((fee) => fee.impositionRemark)?.impositionRemark || ""
        }));
      });
      return merged.sort((a, b) => feeDateValue(b) - feeDateValue(a));
    }

    function chooseCleanupPrimary(fees = []) {
      const deterministicIds = new Set(fees.map((fee) => deterministicBulkFeeDocId(fee.studentId, fee.month)));
      return fees.slice().sort((a, b) => {
        const aDeterministic = deterministicIds.has(a.id) ? 1 : 0;
        const bDeterministic = deterministicIds.has(b.id) ? 1 : 0;
        if (aDeterministic !== bDeterministic) return bDeterministic - aDeterministic;
        const aActivity = (Array.isArray(a.payments) ? a.payments.length : 0) + (Array.isArray(a.fineDetails) ? a.fineDetails.length : 0) + (getTotalPaidAmount(a) > 0 ? 10 : 0);
        const bActivity = (Array.isArray(b.payments) ? b.payments.length : 0) + (Array.isArray(b.fineDetails) ? b.fineDetails.length : 0) + (getTotalPaidAmount(b) > 0 ? 10 : 0);
        if (aActivity !== bActivity) return bActivity - aActivity;
        return feeDateValue(a) - feeDateValue(b);
      })[0];
    }

    function feeCleanupPayload(mergedFee, duplicateIds = []) {
      const amounts = getFeeAmounts(mergedFee);
      return {
        studentId: mergedFee.studentId || "",
        studentName: mergedFee.studentName || "",
        class: mergedFee.class || "",
        section: mergedFee.section || "",
        roll: mergedFee.roll || "",
        studentDocId: mergedFee.studentDocId || "",
        month: mergedFee.month || "",
        amount: amounts.total,
        originalAmount: amounts.total,
        paidAmount: amounts.applied,
        totalPaidAmount: amounts.applied,
        totalExtraPaidAmount: amounts.extra,
        totalCollectedAmount: amounts.collected,
        remainingAmount: amounts.due,
        status: amounts.due <= 0 ? "Paid" : amounts.applied > 0 ? "Partial" : (mergedFee.status || "Imposed"),
        remarks: mergedFee.remarks || "",
        impositionRemark: mergedFee.impositionRemark || mergedFee.remarks || "",
        impositions: getImpositionEntries(mergedFee),
        payments: Array.isArray(mergedFee.payments) ? mergedFee.payments : [],
        fineDetails: getFineDetails(mergedFee),
        totalFineAmount: getTotalFineAmount(mergedFee),
        fineAmount: getTotalFineAmount(mergedFee),
        date: mergedFee.date || mergedFee.imposedDate || mergedFee.createdAt || new Date(),
        ...sessionFeeFields(),
        duplicateFeeIdsRemoved: duplicateIds,
        dedupedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
    }

    function groupDuplicateFeeRecords(records = []) {
      const groups = new Map();
      records.map(normalizeFeeRecord).forEach((fee) => {
        if (!fee.id || !fee.month || !feeStudentIdentityKey(fee)) return;
        const key = feeRecordKey(fee);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(fee);
      });
      return groups;
    }

    async function cleanupDuplicateFeeRecords(records = [], { silent = false } = {}) {
      if (feeCleanupInProgress || activeSessionLocked || !activeSchoolId) {
        return { groupsFixed: 0, docsDeleted: 0, docsUpdated: 0 };
      }
      feeCleanupInProgress = true;
      const cleanupBtn = document.getElementById("cleanupDuplicateFeesBtn");
      if (cleanupBtn) {
        cleanupBtn.disabled = true;
        cleanupBtn.textContent = "Cleaning...";
      }
      try {
        let groupsFixed = 0;
        let docsDeleted = 0;
        let docsUpdated = 0;
        const groups = groupDuplicateFeeRecords(records.filter(feeBelongsToActiveSession));

        for (const fees of groups.values()) {
          const normalizedFees = fees.map(normalizeFeeRecord);
          const primary = chooseCleanupPrimary(normalizedFees);
          if (!primary?.id) continue;
          const merged = mergeDuplicateFeeRecords(normalizedFees)[0];
          if (!merged) continue;
          const duplicateIds = normalizedFees.map((fee) => fee.id).filter((id) => id && id !== primary.id);
          const normalizedPrimary = normalizeFeeRecord(primary);
          const rawImpositionCount = Array.isArray(primary.impositions) ? primary.impositions.length : 0;
          const primaryNeedsUpdate =
            duplicateIds.length > 0 ||
            rawImpositionCount !== getImpositionEntries(normalizedPrimary).length ||
            Number(primary.originalAmount ?? primary.amount ?? 0) !== Number(normalizedPrimary.originalAmount ?? normalizedPrimary.amount ?? 0);

          if (!primaryNeedsUpdate) continue;

          await updateDoc(
            doc(db, "schools", activeSchoolId, "fees", primary.id),
            feeCleanupPayload({ ...merged, id: primary.id }, duplicateIds)
          );
          docsUpdated++;

          for (const duplicateId of duplicateIds) {
            await deleteDoc(doc(db, "schools", activeSchoolId, "fees", duplicateId));
            docsDeleted++;
          }
          groupsFixed++;
        }

        if (!silent && (groupsFixed || docsDeleted || docsUpdated)) {
          showToast(\`Duplicate fees cleaned: \${docsDeleted} duplicate record(s) removed.\`);
        } else if (!silent) {
          showToast("No duplicate fee records found.");
        }
        return { groupsFixed, docsDeleted, docsUpdated };
      } finally {
        feeCleanupInProgress = false;
        if (cleanupBtn) {
          cleanupBtn.disabled = false;
          cleanupBtn.textContent = "Clean Duplicates";
        }
      }
    }

    function ensureSessionEditable(action = "Fee changes") {
      if (!activeSessionLocked) return true;\r
      showToast(\`\${action} are blocked because this session is locked.\`, "error");\r
      return false;\r
    }\r
\r
    function getCorrectStatus(fee) {\r
      const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
      const totalPaidAmount = Number(fee.totalPaidAmount || 0);\r
\r
      if (totalPaidAmount >= originalAmount) {\r
        return 'Paid';\r
      } else if (totalPaidAmount > 0) {\r
        return 'Partial';\r
      } else if (fee.status === 'Pending') {\r
        return 'Pending';\r
      } else {\r
        return 'Imposed';\r
      }\r
    }\r
\r
    function getTotalPaidAmount(fee) {\r
      if (Number.isFinite(Number(fee.totalPaidAmount))) return Number(fee.totalPaidAmount);\r
      if (Array.isArray(fee.payments)) {\r
        return fee.payments.reduce((sum, payment) => sum + Number(payment.appliedAmount ?? payment.amount ?? 0), 0);\r
      }\r
      return Number(fee.paidAmount || 0);\r
    }\r
\r
    window.togglePaymentModeOther = (selectId, inputId) => {\r
      const select = document.getElementById(selectId);\r
      const input = document.getElementById(inputId);\r
      if (!select || !input) return;\r
      input.style.display = select.value === "Other" ? "block" : "none";\r
      if (select.value !== "Other") input.value = "";\r
    };\r
\r
    window.updateHistoryPaymentModeVisibility = () => {\r
      const status = document.getElementById("historyFeeStatus")?.value || "";\r
      const group = document.getElementById("historyPaymentModeGroup");\r
      const mode = document.getElementById("historyPaymentMode");\r
      const other = document.getElementById("historyPaymentModeOther");\r
      if (!group) return;\r
      const isPaid = status === "Paid";\r
      group.style.display = isPaid ? "flex" : "none";\r
      if (!isPaid) {\r
        if (mode) mode.value = "";\r
        if (other) {\r
          other.value = "";\r
          other.style.display = "none";\r
        }\r
      }\r
    };\r
\r
    function paymentModeFromFields(selectId, inputId) {\r
      const mode = document.getElementById(selectId)?.value || "";\r
      const other = document.getElementById(inputId)?.value.trim() || "";\r
      if (!mode) return { error: "Select payment mode." };\r
      if (mode === "Other" && !other) return { error: "Specify the payment mode." };\r
      return { paymentMode: mode === "Other" ? \`Other - \${other}\` : mode, paymentModeType: mode };\r
    }\r
\r
    function askPaymentMode() {\r
      const answer = window.prompt("Payment mode enter karein: Cash, Card, UPI ya Other");\r
      if (answer === null) return null;\r
      const normalized = answer.trim().toLowerCase();\r
      const known = { cash: "Cash", card: "Card", upi: "UPI", other: "Other", others: "Other" };\r
      if (!known[normalized]) {\r
        showToast("Payment mode Cash, Card, UPI ya Other me se select karein.", "error");\r
        return null;\r
      }\r
      if (known[normalized] !== "Other") return { paymentMode: known[normalized], paymentModeType: known[normalized] };\r
      const detail = window.prompt("Other payment mode specify karein:");\r
      if (!detail?.trim()) {\r
        showToast("Other payment mode specify karna zaroori hai.", "error");\r
        return null;\r
      }\r
      return { paymentMode: \`Other - \${detail.trim()}\`, paymentModeType: "Other" };\r
    }\r
\r
    function getFeeAmounts(fee) {
      const total = Number(fee.originalAmount || fee.amount || 0);
      const paid = getTotalPaidAmount(fee);
      const extra = Number(fee.totalExtraPaidAmount || 0);
      const collected = Number(fee.totalCollectedAmount || paid + extra);
      // Assigned and applied totals are the source of truth. Older/manual
      // records can carry a stale remainingAmount after an advance payment is
      // assigned later, which made the UI show an incorrect outstanding fee.
      const remaining = Math.max(0, total - paid);
      return { total, paid, applied: paid, extra, collected, remaining, due: remaining };
    }\r
\r
    async function syncReceivedFee(feeId, fee, payment, paymentIndex) {\r
      try {\r
        await syncFeeCredit({\r
          db,\r
          schoolId: activeSchoolId,\r
          actor: {\r
            uid: currentUser?.uid,\r
            email: currentUser?.email,\r
            name: currentUser?.displayName,\r
            role: "admin"\r
          },\r
          feeId,\r
          fee,\r
          payment,\r
          paymentIndex\r
        });\r
      } catch (error) {\r
        console.warn("Fee was saved, but its accounts entry will be retried from School Accounts.", error);\r
      }\r
    }\r
\r
    function getImpositionEntries(fee) {
      const total = Number(fee.originalAmount ?? fee.amount ?? 0);
      const principal = Math.max(0, total - getTotalFineAmount(fee));
      return limitImpositionsToPrincipal(uniqueImpositionEntries(fee), principal);
    }
\r
    function buildImpositionEntry(student, amount, previousTotal = 0) {
      const imposedAt = new Date();
      const month = imposeConfig.month || "";
      const runId = String(imposeConfig.runId || "bulk-run").trim().toLowerCase();
      const cleanStudentId = String(student.studentId || "student").replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase() || "STUDENT";\r
      const dateKey = imposedAt.toISOString().slice(0, 10).replace(/-/g, "");\r
      return {\r
        amount: Number(amount || 0),\r
        month,\r
        date: imposedAt,\r
        status: "Imposed",\r
        remarks: imposeConfig.remarks || "",\r
        imposedBy: currentUser?.email || "",\r
        previousAssignedAmount: Number(previousTotal || 0),\r
        newAssignedAmount: Number(previousTotal || 0) + Number(amount || 0),\r
        transactionId: \`IMP-\${cleanStudentId}-\${dateKey}-\${Date.now().toString().slice(-6)}\`,
        impositionKey: [
          "bulk",
          activeSessionId || activeSessionLabel || "current",
          String(student.studentId || student.id || "student").trim().toLowerCase(),
          normalizeFeeMonth(month).toLowerCase(),
          "monthly",
          runId
        ].join("|")
      };
    }

    function getPaymentReceivedAmount(payment = {}) {
      const declared = Number(payment.receivedAmount ?? payment.fullAmount ?? 0);
      const allocated = Number(payment.appliedAmount ?? payment.amount ?? 0) + Number(payment.extraAmount || 0);
      return Math.max(0, Number.isFinite(declared) ? declared : 0, Number.isFinite(allocated) ? allocated : 0);
    }

    function rebalanceAdvancePayments(fee, assignedTotal) {
      const targetTotal = Math.max(0, Number(assignedTotal || 0));
      let assignmentLeft = targetTotal;
      let paymentCollected = 0;
      const payments = (Array.isArray(fee.payments) ? fee.payments : []).map((payment) => {
        const receivedAmount = getPaymentReceivedAmount(payment);
        const appliedAmount = Math.min(receivedAmount, assignmentLeft);
        const extraAmount = Math.max(0, receivedAmount - appliedAmount);
        assignmentLeft = Math.max(0, assignmentLeft - appliedAmount);
        paymentCollected += receivedAmount;
        return {
          ...payment,
          receivedAmount,
          appliedAmount,
          extraAmount,
          amount: appliedAmount,
          status: extraAmount > 0 ? "Applied with extra" : assignmentLeft <= 0 ? "Paid" : "Partial paid"
        };
      });

      const storedCollected = Math.max(
        0,
        Number(fee.totalCollectedAmount || 0),
        getTotalPaidAmount(fee) + getTotalExtraPaidAmount(fee)
      );
      const totalCollected = Math.max(paymentCollected, storedCollected);
      const totalPaidAmount = Math.min(targetTotal, totalCollected);
      const totalExtraPaidAmount = Math.max(0, totalCollected - totalPaidAmount);
      const remainingAmount = Math.max(0, targetTotal - totalPaidAmount);
      return { payments, totalCollected, totalPaidAmount, totalExtraPaidAmount, remainingAmount };
    }

    function buildSameMonthImpositionUpdate(student, fee, imposedAmount) {
      const fineAmount = getTotalFineAmount(fee);
      const currentTotal = Math.max(0, Number(fee.originalAmount ?? fee.amount ?? 0));
      const currentPrincipal = Math.max(0, currentTotal - fineAmount);
      const principalAmount = Math.max(0, Number(imposedAmount || 0));
      if (principalAmount <= 0) return null;

      const impositionEntry = buildImpositionEntry(student, principalAmount, currentPrincipal);
      const rawImpositions = uniqueImpositionEntries(fee);
      const alreadyApplied = rawImpositions.some((entry) =>
        String(entry.impositionKey || "").toLowerCase() === String(impositionEntry.impositionKey || "").toLowerCase()
      );
      if (alreadyApplied) return { alreadyApplied: true, updateData: null };

      const existingImpositions = currentPrincipal > 0
        ? limitImpositionsToPrincipal(rawImpositions, currentPrincipal)
        : [];
      const coveredPrincipal = existingImpositions.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
      const missingExistingPrincipal = Math.max(0, currentPrincipal - coveredPrincipal);
      if (missingExistingPrincipal > 0) {
        existingImpositions.push({
          amount: missingExistingPrincipal,
          month: normalizeFeeMonth(fee.month || imposeConfig.month),
          date: fee.imposedDate || fee.date || fee.createdAt || new Date(),
          status: fee.manualEntry ? "Manual entry" : "Imposed",
          remarks: fee.impositionRemark || fee.remarks || "",
          imposedBy: "",
          previousAssignedAmount: coveredPrincipal,
          newAssignedAmount: currentPrincipal,
          transactionId: fee.entryTransactionId || "",
          impositionKey: [
            "existing",
            fee.sessionId || fee.session || activeSessionId || activeSessionLabel || "current",
            String(fee.studentId || student.studentId || "student").trim().toLowerCase(),
            normalizeFeeMonth(fee.month || imposeConfig.month).toLowerCase(),
            feeTypeIdentity(fee),
            fee.id || "monthly-record"
          ].join("|")
        });
      }

      const assignedTotal = currentTotal + principalAmount;
      const allocation = rebalanceAdvancePayments(fee, assignedTotal);
      const impositions = uniqueBySignature(
        [...existingImpositions, impositionEntry],
        (entry) => String(entry.impositionKey || [normalizeFeeMonth(entry.month || fee.month || ""), entry.amount || 0].join("|")).toLowerCase()
      );

      return { alreadyApplied: false, updateData: {
        studentName: student.studentName,
        class: student.class,
        section: student.section,
        roll: student.roll,
        amount: assignedTotal,
        originalAmount: assignedTotal,
        paidAmount: allocation.totalPaidAmount,
        totalPaidAmount: allocation.totalPaidAmount,
        totalExtraPaidAmount: allocation.totalExtraPaidAmount,
        totalCollectedAmount: allocation.totalCollected,
        remainingAmount: allocation.remainingAmount,
        status: allocation.remainingAmount <= 0 ? "Paid" : allocation.totalPaidAmount > 0 ? "Partial" : "Imposed",
        remarks: imposeConfig.remarks || fee.remarks || "",
        impositionRemark: imposeConfig.remarks || fee.impositionRemark || "",
        impositions,
        payments: allocation.payments,
        imposedDate: impositionEntry.date,
        ...sessionFeeFields(),
        updatedAt: serverTimestamp()
      }};
    }

    function getFineDetails(fee) {
      return Array.isArray(fee.fineDetails) ? fee.fineDetails : [];\r
    }\r
\r
    function getTotalFineAmount(fee) {\r
      const stored = Number(fee.fineAmount || fee.totalFineAmount || 0);\r
      if (Number.isFinite(stored) && stored > 0) return stored;\r
      return getFineDetails(fee).reduce((sum, fine) => sum + Number(fine.amount || 0), 0);\r
    }\r
\r
    function getFineRuleKey(config) {\r
      const sessionKey = activeSessionId || activeSessionLabel || "current";\r
      return ["late-fee", sessionKey, config.month].join("-");\r
    }\r
\r
    function fineDetailMatchesRule(fine, ruleKey, config) {\r
      if (!fine) return false;\r
      if (fine.ruleKey === ruleKey) return true;\r
      return fine.type === "late-fee-fine" && String(fine.month || "").toLowerCase() === String(config.month || "").toLowerCase();\r
    }\r
\r
    async function getSavedFineRules() {\r
      if (!activeSchoolId) return {};\r
      const snap = await getDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"));\r
      return snap.exists() ? (snap.data()?.rules || {}) : {};\r
    }\r
\r
    function clampDueDate(year, monthIndex, dueDay) {\r
      const lastDay = new Date(year, monthIndex + 1, 0).getDate();\r
      return new Date(year, monthIndex, Math.min(dueDay, lastDay), 23, 59, 59, 999);\r
    }\r
\r
    function getLateFinePeriods(month, dueDay, frequency, today = new Date()) {\r
      const monthIndex = monthOrder.indexOf(month);\r
      if (monthIndex < 0 || !dueDay) return { periods: 0, dueDate: null, daysLate: 0 };\r
      const dueDate = clampDueDate(today.getFullYear(), monthIndex, dueDay);\r
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());\r
      const dueStart = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());\r
      const daysLate = Math.max(0, Math.floor((todayStart - dueStart) / 86400000));\r
      if (daysLate <= 0) return { periods: 0, dueDate, daysLate: 0 };\r
      if (frequency === "weekly") return { periods: Math.ceil(daysLate / 7), dueDate, daysLate };\r
      if (frequency === "monthly") return { periods: Math.ceil(daysLate / 30), dueDate, daysLate };\r
      return { periods: daysLate, dueDate, daysLate };\r
    }\r
\r
    function fineReasonText({ month, dueDay, frequency, fineAmount, periods, dueDate, daysLate }) {\r
      const label = frequency === "daily" ? "Daily" : frequency === "weekly" ? "Weekly" : "Monthly";\r
      return \`\${label} late fee fine for \${month}: last payment day \${dueDay} (\${formatDateTime(dueDate)}), \${daysLate} day(s) late, \${periods} period(s) x ₹\${Number(fineAmount).toLocaleString()}.\`;\r
    }\r
\r
    function getTotalExtraBalance(fees = currentHistoryFees) {\r
      return fees.reduce((sum, fee) => sum + getFeeAmounts(fee).extra, 0);\r
    }\r
\r
    function compactId(value, fallback = "-") {\r
      const raw = String(value || "").trim();\r
      if (!raw) return fallback;\r
      return raw.length > 20 ? \`\${raw.slice(0, 8)}...\${raw.slice(-6)}\` : raw;\r
    }\r
\r
    function generatedFeeTxnId(fee, index) {\r
      const base = String(fee.id || \`\${fee.studentId || "student"}-\${fee.month || "fee"}\`)\r
        .replace(/[^a-zA-Z0-9]/g, "")\r
        .slice(-8)\r
        .toUpperCase() || "FEE";\r
      return \`TXN-\${base}-\${String(index + 1).padStart(2, "0")}\`;\r
    }\r
\r
    function getFeeTransactionIds(fee) {\r
      const ids = [];\r
      const addId = (value) => {\r
        const raw = String(value || "").trim();\r
        if (raw && !ids.some((id) => id.toLowerCase() === raw.toLowerCase())) ids.push(raw);\r
      };\r
\r
      addId(fee.entryTransactionId);\r
      addId(fee.lastRazorpayPaymentId || fee.lastPaymentId || fee.lastTransactionId);\r
      (Array.isArray(fee.impositions) ? fee.impositions : []).forEach((imposition) => addId(imposition.transactionId));\r
      (Array.isArray(fee.payments) ? fee.payments : []).forEach((payment, index) => {\r
        addId(payment.transactionId || payment.txnId || payment.paymentId || payment.razorpayPaymentId || payment.razorpay_payment_id || payment.razorpay_order_id || generatedFeeTxnId(fee, index));\r
      });\r
      getFineDetails(fee).forEach((fine, index) => {\r
        const ruleKey = String(fine.ruleKey || \`\${fee.id || fee.month || "fee"}-fine-\${index}\`);\r
        addId(\`FINE-\${ruleKey.replace(/[^a-zA-Z0-9]/g, "").slice(-14).toUpperCase()}-\${String(index + 1).padStart(2, "0")}\`);\r
      });\r
      return ids;\r
    }\r
\r
    function renderFeeTransactionIds(fee) {\r
      const ids = getFeeTransactionIds(fee);\r
      if (!ids.length) return "-";\r
      const shown = ids.slice(0, 3).map((id) => \`<span title="\${esc(id)}">\${esc(compactId(id))}</span>\`).join("<br>");\r
      return ids.length > 3 ? \`\${shown}<br><span title="\${esc(ids.slice(3).join(", "))}">+\${ids.length - 3} more</span>\` : shown;\r
    }\r
\r
    function feeMatchesPaymentSearch(fee, searchTerm) {\r
      const needle = String(searchTerm || "").toLowerCase();\r
      if (!needle) return true;\r
      return getFeeTransactionIds(fee).some((id) => id.toLowerCase().includes(needle));\r
    }\r
\r
    function feeDateValue(fee) {\r
      const raw = fee.updatedAt?.toDate?.() || fee.date?.toDate?.() || fee.updatedAt || fee.date || 0;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? 0 : date.getTime();\r
    }\r
\r
    function reportEntryDateValue(entry) {\r
      const raw = entry.entryDate?.toDate?.() || entry.entryDate || entry.updatedAt?.toDate?.() || entry.date?.toDate?.() || entry.updatedAt || entry.date || 0;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? 0 : date.getTime();\r
    }\r
\r
    function reportEntryDateText(entry) {\r
      const raw = entry.entryDate?.toDate?.() || entry.entryDate || entry.date?.toDate?.() || entry.date;\r
      const date = raw instanceof Date ? raw : new Date(raw);\r
      return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-IN");\r
    }\r
\r
    function buildReportEntries(fees = allFees) {\r
      const entries = [];\r
      fees.forEach((fee) => {\r
        const impositions = getImpositionEntries(fee);\r
        const fineAmount = getTotalFineAmount(fee);\r
        const fallbackAmount = Math.max(0, Number(fee.originalAmount || fee.amount || 0) - fineAmount);\r
        const baseEntry = {\r
          ...fee,\r
          reportFeeId: fee.id,\r
          reportEntryId: \`\${fee.id || fee.studentId || "fee"}_base\`,\r
          reportEntryType: fee.autoImposed ? "Auto imposed" : fee.manualEntry ? "Manual entry" : "Fee imposed",\r
          entryAmount: fallbackAmount || Number(fee.originalAmount || fee.amount || 0),\r
          entryDate: fee.imposedDate || fee.date || fee.createdAt || fee.updatedAt,\r
          entryRemark: fee.impositionRemark || fee.remarks || ""\r
        };\r
\r
        if (impositions.length) {
          const principalAmount = impositions.reduce((sum, imposition) => sum + Number(imposition.amount || 0), 0) || fallbackAmount;
          entries.push({
            ...fee,
            reportFeeId: fee.id,
            reportEntryId: \`\${fee.id || fee.studentId || "fee"}_imposition\`,
            reportEntryType: "Fee imposed",
            reportIncludesExtraPayment: true,
            entryAmount: principalAmount,
            entryDate: impositions[0]?.date || fee.imposedDate || fee.date || fee.updatedAt,
            entryRemark: impositions.map((imposition) => imposition.remarks).filter(Boolean).join(", ") || fee.impositionRemark || fee.remarks || "",
            entryTransactionId: impositions.map((imposition) => imposition.transactionId).filter(Boolean).join(", ")
          });
        } else {
          entries.push(baseEntry);
        }
\r
        getFineDetails(fee).forEach((fine, index) => {\r
          const amount = Number(fine.amount || 0);\r
          if (amount <= 0) return;\r
          entries.push({\r
            ...fee,\r
            reportFeeId: fee.id,\r
            reportEntryId: \`\${fee.id || fee.studentId || "fee"}_fine_\${index}\`,\r
            reportEntryType: "Fine",\r
            entryAmount: amount,\r
            entryDate: fine.date || fee.updatedAt || fee.date,\r
            entryRemark: fine.reason || fee.lastFineReason || "Late fee fine",\r
            entryTransactionId: \`FINE-\${String(fine.ruleKey || fee.id || fee.month || "fee").replace(/[^a-zA-Z0-9]/g, "").slice(-14).toUpperCase()}-\${String(index + 1).padStart(2, "0")}\`\r
          });\r
        });\r
\r
      });\r
      return entries.sort((a, b) => reportEntryDateValue(b) - reportEntryDateValue(a));\r
    }\r
\r
    function getTotalExtraPaidAmount(entry) {\r
      const stored = Number(entry.totalExtraPaidAmount || 0);\r
      if (Number.isFinite(stored) && stored > 0) return stored;\r
      return (Array.isArray(entry.payments) ? entry.payments : [])\r
        .reduce((sum, payment) => sum + Number(payment.extraAmount || 0), 0);\r
    }\r
\r
    function getReportEntryPaidAmount(entry) {\r
      if (entry.reportEntryType === "Fine") return 0;\r
      const entryAmount = Number(entry.entryAmount ?? entry.originalAmount ?? entry.amount ?? 0);\r
      const totalPaid = getTotalPaidAmount(entry);\r
      const extraPaid = entry.reportIncludesExtraPayment === false ? 0 : getTotalExtraPaidAmount(entry);\r
      if (entryAmount <= 0 && (totalPaid > 0 || extraPaid > 0)) return totalPaid + extraPaid;\r
      const totalFine = getTotalFineAmount(entry);\r
      const principalTotal = Math.max(0, Number(entry.originalAmount || entry.amount || 0) - totalFine);\r
      if (entryAmount <= 0 || principalTotal <= 0) return extraPaid;\r
      const appliedForEntry = totalPaid > 0 ? Math.min(entryAmount, Math.round((totalPaid * entryAmount) / principalTotal)) : 0;\r
      return appliedForEntry + extraPaid;\r
    }\r
\r
    function isExtraAdjustmentPayment(payment) {\r
      const text = \`\${payment?.status || ""} \${payment?.note || ""}\`.toLowerCase();\r
      return text.includes("adjusted from extra") || text.includes("extra balance adjustment");\r
    }\r
\r
    function getReportEntryCollectedAmount(entry) {\r
      if (entry.reportEntryType === "Fine") return 0;\r
      const payments = Array.isArray(entry.payments) ? entry.payments : [];\r
      const cashApplied = payments.length\r
        ? payments.reduce((sum, payment) => sum + (isExtraAdjustmentPayment(payment) ? 0 : Number(payment.appliedAmount ?? payment.amount ?? 0)), 0)\r
        : getTotalPaidAmount(entry);\r
      const extraPaid = entry.reportIncludesExtraPayment === false ? 0 : getTotalExtraPaidAmount(entry);\r
      const entryAmount = Number(entry.entryAmount ?? entry.originalAmount ?? entry.amount ?? 0);\r
      if (entryAmount <= 0) return cashApplied + extraPaid;\r
      const totalFine = getTotalFineAmount(entry);\r
      const principalTotal = Math.max(0, Number(entry.originalAmount || entry.amount || 0) - totalFine);\r
      if (principalTotal <= 0) return extraPaid;\r
      const appliedForEntry = cashApplied > 0 ? Math.min(entryAmount, Math.round((cashApplied * entryAmount) / principalTotal)) : 0;\r
      return appliedForEntry + extraPaid;\r
    }\r
\r
    function getReportEntryStatus(entry) {\r
      if (entry.reportEntryType === "Fine") return "Imposed";\r
      const entryAmount = Number(entry.entryAmount ?? entry.originalAmount ?? entry.amount ?? 0);\r
      const paid = getReportEntryPaidAmount(entry);\r
      if (entryAmount <= 0 && paid > 0) return "Paid";\r
      if (entryAmount > 0 && paid >= entryAmount) return "Paid";\r
      if (paid > 0) return "Partial";\r
      return entry.status === "Pending" ? "Pending" : "Imposed";\r
    }\r
\r
    function findCurrentHistoryFee(month) {
      const wantedMonth = normalizeFeeMonth(month).toLowerCase();
      return currentHistoryFees
        .filter((fee) => fee.studentId === currentHistoryStudent?.studentId && normalizeFeeMonth(fee.month).toLowerCase() === wantedMonth)
        .sort((a, b) => feeDateValue(b) - feeDateValue(a))[0] || null;\r
    }\r
\r
    async function refreshCurrentHistory() {\r
      await loadAllReports();\r
      if (!currentHistoryStudent?.studentId) return;\r
      const history = allFees\r
        .filter((fee) => fee.studentId === currentHistoryStudent.studentId)\r
        .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
      displayHistoryModal(currentHistoryStudent.studentId, history);\r
    }\r
\r
    function buildHistoryPaymentUpdate(enteredAmount, fee, status, remarks) {\r
      const current = getFeeAmounts(fee);\r
      const payments = Array.isArray(fee.payments) ? [...fee.payments] : [];\r
\r
      if (status === "Paid") {\r
        const isZeroAssignedEntry = current.total <= 0 && current.due <= 0;\r
        const appliedNow = isZeroAssignedEntry ? enteredAmount : Math.min(enteredAmount, current.due);\r
        const extraNow = isZeroAssignedEntry ? 0 : Math.max(0, enteredAmount - current.due);\r
        const totalApplied = current.applied + appliedNow;\r
        const totalExtra = current.extra + extraNow;\r
        const remaining = Math.max(0, current.total - totalApplied);\r
        const totalCollected = totalApplied + totalExtra;\r
\r
        const newPayment = {\r
          receivedAmount: enteredAmount,\r
          appliedAmount: appliedNow,\r
          extraAmount: extraNow,\r
          amount: appliedNow,\r
          date: new Date(),\r
          status: extraNow > 0 ? "Applied with extra" : remaining === 0 ? "Paid" : "Partial paid",\r
          note: remarks || "Payment added from fees report",\r
          ledgerTransactionId: newLedgerTransactionId("FEE")\r
        };\r
        return {\r
          updateData: {\r
            amount: current.total,\r
            originalAmount: current.total,\r
            paidAmount: totalApplied,\r
            totalPaidAmount: totalApplied,\r
            totalExtraPaidAmount: totalExtra,\r
            totalCollectedAmount: totalCollected,\r
            remainingAmount: remaining,\r
            status: remaining === 0 ? "Paid" : "Partial",\r
            ...sessionFeeFields(),\r
            payments: [...payments, newPayment],\r
            lastPaymentAmount: enteredAmount,\r
            lastAppliedAmount: appliedNow,\r
            lastExtraAmount: extraNow,\r
            lastPaymentDate: serverTimestamp(),\r
            remarks: remarks || fee.remarks || "",\r
            updatedAt: serverTimestamp()\r
          },\r
          payment: newPayment,\r
          paymentIndex: payments.length,\r
          message: extraNow > 0\r
            ? \`Payment saved. ₹\${appliedNow.toLocaleString()} applied and ₹\${extraNow.toLocaleString()} stored as extra.\`\r
            : \`Payment saved. ₹\${appliedNow.toLocaleString()} applied to \${fee.month}.\`\r
        };\r
      }\r
\r
      const updatedTotal = current.total + enteredAmount;
      const updatedDue = Math.max(0, updatedTotal - current.applied);
      return {
        updateData: {
          status: updatedDue <= 0 ? "Paid" : current.applied > 0 ? "Partial" : status,
          amount: updatedTotal,
          originalAmount: updatedTotal,
          paidAmount: current.applied,
          totalPaidAmount: current.applied,
          totalExtraPaidAmount: current.extra,
          totalCollectedAmount: current.collected,
          remainingAmount: updatedDue,
          ...sessionFeeFields(),\r
          remarks: remarks || fee.remarks || "",\r
          updatedAt: serverTimestamp()\r
        },\r
        message: \`Same \${fee.month} entry updated. Assigned amount is now ₹\${updatedTotal.toLocaleString()}.\`\r
      };\r
    }\r
\r
    function formatDateTime(value) {\r
      const date = value?.toDate ? value.toDate() : new Date(value);\r
      if (!date || Number.isNaN(date.getTime())) return "N/A";\r
      return date.toLocaleString("en-IN");\r
    }\r
\r
    function esc(value) {\r
      return String(value ?? "")\r
        .replace(/&/g, "&amp;")\r
        .replace(/</g, "&lt;")\r
        .replace(/>/g, "&gt;")\r
        .replace(/"/g, "&quot;")\r
        .replace(/'/g, "&#39;");\r
    }\r
\r
    function normalizeClassValue(value) {\r
      return String(value ?? "")\r
        .trim()\r
        .replace(/^class\\s+/i, "")\r
        .toUpperCase();\r
    }\r
\r
    function studentMatchesClass(studentData, selectedClass) {\r
      const wanted = normalizeClassValue(selectedClass);\r
      return [studentData.class, studentData.currentClass, studentData.finalClass]\r
        .some((value) => normalizeClassValue(value) === wanted);\r
    }\r
\r
    async function getStudentsForImposition(selectedClass) {
      const students = new Map();
      const addStudent = (studentDoc) => {
        const studentData = studentDoc.data();
        if (studentData.tcIssued || !studentMatchesClass(studentData, selectedClass)) return;
        const studentId = studentData.studentId || studentDoc.id;
        const studentKey = String(studentId).trim().toLowerCase();
        if (students.has(studentKey)) return;
        students.set(studentKey, {
          id: studentDoc.id,
          studentId,
          studentName: studentData.studentName || studentData.name || \`Student-\${studentDoc.id.slice(0, 6)}\`,\r
          class: studentData.class || studentData.currentClass || selectedClass,\r
          section: studentData.section || '',\r
          roll: studentData.roll || studentData.rollNo || '',\r
          father: studentData.fatherName || studentData.father || 'N/A'\r
        });\r
      };\r
\r
      const exactSnap = await getDocs(query(\r
        collection(db, "schools", activeSchoolId, "students"),\r
        where("class", "==", selectedClass)\r
      ));\r
      exactSnap.forEach(addStudent);\r
\r
      if (!students.size) {\r
        const allSnap = await getDocs(collection(db, "schools", activeSchoolId, "students"));\r
        allSnap.forEach(addStudent);\r
      }\r
\r
      return Array.from(students.values());\r
    }\r
\r
    window.loadSectionsForImposeClass = async () => {\r
      const className = document.getElementById("imposeClass").value;\r
      const sectionSelect = document.getElementById("imposeSection");\r
      sectionSelect.innerHTML = \`<option value="">All Sections</option>\`;\r
      sectionSelect.disabled = true;\r
      studentsToImpose = [];\r
      document.getElementById("studentsPreview").innerHTML = "";\r
\r
      if (!className || !activeSchoolId) return;\r
\r
      try {\r
        const classStudents = await getStudentsForImposition(className);\r
        const sections = new Set();\r
        classStudents.forEach((student) => {\r
          const section = String(student.section || "").trim();\r
          if (section) sections.add(section);\r
        });\r
\r
        [...sections].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).forEach((section) => {\r
          sectionSelect.innerHTML += \`<option value="\${esc(section)}">Section \${esc(section)}</option>\`;\r
        });\r
        sectionSelect.disabled = false;\r
      } catch (error) {\r
        showToast("Unable to load sections: " + error.message, "error");\r
      }\r
    };\r
\r
    onAuthStateChanged(auth, async (user) => {\r
      if (!user) {\r
        window.location.href = "#/index.html";\r
      } else {\r
        currentUser = user;\r
        const userSnap = await getDoc(doc(db, "users", user.uid));\r
        if (!userSnap.exists()) {\r
          window.location.href = "#/index.html";\r
          return;\r
        }\r
        currentUserData = userSnap.data();\r
        const role = String(currentUserData.role || "").toLowerCase();\r
        if (role !== "admin" && role !== "accountant") {\r
          alert("Access denied. Only admin or accountant can manage fees.");\r
          window.location.href = "#/index.html";\r
          return;\r
        }\r
        activeSchoolId = role === "admin" ? user.uid : (currentUserData.adminId || currentUserData.schoolId || "");\r
        if (!activeSchoolId) {\r
          alert("Accountant account is not linked to a school admin.");\r
          window.location.href = "#/index.html";\r
          return;\r
        }\r
        if (role === "admin") {\r
          enableAdminNavigation();\r
        } else {\r
          enableAccountantWorkspace();\r
        }\r
        initializeFilters();\r
        await loadActiveSession();\r
        document.getElementById("reportsTable").innerHTML = '<div class="no-data">Loading all student fee records...</div>';\r
        setTimeout(() => loadAllReports(), 0);\r
      }\r
    });\r
\r
    // Same initializeFilters()...\r
    function initializeFilters() {
      const classSelect = document.getElementById("filterClass");
      const classList = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
      classList.forEach(c => {
        classSelect.innerHTML += \`<option value="\${c}">\${c}</option>\`;
      });
      classSelect.addEventListener("change", populateReportSections);
      populateReportSections();
    }

    function populateReportSections() {
      const classSelect = document.getElementById("filterClass");
      const sectionSelect = document.getElementById("filterSection");
      if (!classSelect || !sectionSelect) return;

      const selectedClass = classSelect.value;
      const previousSection = sectionSelect.value;
      const sections = new Set();
      allFees.forEach((fee) => {
        const feeClass = fee.class || fee.currentClass || fee.finalClass || "";
        const section = String(fee.section || "").trim();
        if ((!selectedClass || normalizeClassValue(feeClass) === normalizeClassValue(selectedClass)) && section) {
          sections.add(section);
        }
      });

      sectionSelect.innerHTML = \`<option value="">All Sections</option>\` +
        [...sections]
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          .map((section) => \`<option value="\${esc(section)}">Section \${esc(section)}</option>\`)
          .join("");
      sectionSelect.disabled = sections.size === 0;
      if (sections.has(previousSection)) sectionSelect.value = previousSection;
    }
\r
    function showToast(message, type = 'success') {\r
      const toast = document.createElement('div');\r
      toast.style.cssText = \`\r
    position: fixed; top: 20px; right: 20px; padding: 15px 25px; \r
    border-radius: 12px; color: white; z-index: 10000; font-weight: 600;\r
    background: \${type === 'success' ? '#15803d' :\r
          type === 'partial' ? '#0f766e' :\r
            '#b91c1c'};\r
    box-shadow: 0 10px 24px rgba(15,23,42,0.18);\r
  \`;\r
      toast.textContent = message;\r
      document.body.appendChild(toast);\r
      setTimeout(() => toast.remove(), 4000);\r
    }\r
\r
    function displayReports() {\r
      rowsPerPage = parseInt(document.getElementById("rowsPerPage").value);\r
      const startIndex = (currentPage - 1) * rowsPerPage;\r
      const endIndex = startIndex + rowsPerPage;\r
      const paginatedFees = filteredFees.slice(startIndex, endIndex);\r
\r
      if (paginatedFees.length === 0) {\r
        document.getElementById("reportsTable").innerHTML = '<div class="no-data">No matching records found</div>';\r
        document.getElementById("pagination").innerHTML = '';\r
        return;\r
      }\r
\r
      let html = \`\r
    <table>\r
      <thead>\r
        <tr>\r
          <th><input type="checkbox" id="selectAll" onclick="toggleSelectAll()"></th>\r
          <th>Student ID</th>\r
          <th>Name</th>\r
          <th>Class</th>\r
          <th>Month</th>\r
          <th>Original</th>\r
          <th>Actually Paid</th>\r
          <th>Transaction IDs</th>\r
          <th>Remark</th>\r
          <th>Status</th>\r
          <th>Date</th>\r
          <th>Actions</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
  \`;\r
\r
      paginatedFees.forEach(fee => {\r
        const feeId = fee.reportFeeId || fee.id;\r
        const isSelected = selectedRows.has(feeId);\r
        const originalAmount = Number(fee.entryAmount ?? fee.originalAmount ?? fee.amount ?? 0);\r
        const totalPaidAmount = getReportEntryPaidAmount(fee);\r
        const fineAmount = fee.reportEntryType === "Fine" ? originalAmount : 0;\r
        const correctStatus = getReportEntryStatus(fee);\r
        const dateStr = reportEntryDateText(fee);\r
        const paymentIdsHtml = renderFeeTransactionIds(fee);\r
\r
        let statusHtml = \`<span class="status-\${correctStatus.toLowerCase()}">\${correctStatus}</span>\`;\r
        if (correctStatus === 'Partial') {\r
          const progress = originalAmount > 0 ? Math.round((totalPaidAmount / originalAmount) * 100) : 0;\r
          statusHtml = \`<span class="status-partial" onclick="showPartialDetailsById('\${fee.id}')" style="cursor:pointer;">PARTIAL (\${progress}%)</span>\`;\r
        }\r
        const fineLineHtml = fineAmount > 0 ? \`<div style="font-size:12px;color:#b45309;margin-top:4px;">Fine ₹\${fineAmount.toLocaleString()}</div>\` : "";\r
\r
        html += \`\r
      <tr class="\${isSelected ? 'selected' : ''}" ondblclick="viewStudentHistory('\${fee.studentId || ''}')">\r
        <td class="report-print-hidden"><input type="checkbox" class="row-checkbox" data-id="\${feeId}" \${isSelected ? 'checked' : ''} onchange="toggleRowSelection('\${feeId}')"></td>
        <td><strong>\${fee.studentId || 'N/A'}</strong></td>\r
        <td ondblclick="viewStudentHistory('\${fee.studentId || ''}')">\${fee.studentName || 'N/A'}</td>\r
        <td>\${fee.class || ''}\${fee.section ? \`-\${fee.section}\` : ''}</td>\r
        <td>\${fee.month || 'N/A'}<div style="font-size:11px;color:#64748b;margin-top:3px;">\${esc(fee.reportEntryType || "Fee entry")}</div></td>\r
        <td>₹\${originalAmount.toLocaleString()}\${fineLineHtml}</td>\r
        <td>₹\${totalPaidAmount.toLocaleString()}</td>\r
        <td style="font-size:12px;color:#334155;max-width:150px;word-break:break-all;line-height:1.45;">\${paymentIdsHtml}</td>\r
        <td style="font-size:12px;color:#475569;max-width:220px;white-space:normal;">\${esc(fee.entryRemark || fee.remarks || fee.impositionRemark || fee.lastFineReason || '-')}</td>\r
        <td style="min-width: 150px;">\${statusHtml}</td>\r
        <td>\${dateStr}</td>\r
        <td class="report-print-hidden">
          <div class="action-buttons">\r
            <button class="btn btn-sm btn-info" onclick="viewStudentHistoryByFee('\${feeId}')" title="View History">History</button>\r
            <button class="btn btn-sm btn-partial" onclick="showPartialDetailsById('\${feeId}')" title="Add Payment">Add Payment</button>\r
          </div>\r
        </td>\r
      </tr>\r
    \`;\r
      });\r
\r
      html += '</tbody></table>';\r
      document.getElementById("reportsTable").innerHTML = html;\r
      renderPagination();\r
    }\r
\r
    function updateStats(reportRows) {\r
      const fees = sourceFeesForReportRows(reportRows);\r
      let totalImposed = 0, totalPending = 0, totalUnpaid = 0, totalFeesPaid = 0;\r
\r
      fees.forEach(fee => {\r
        const amounts = getFeeAmounts(fee);\r
        totalImposed += amounts.total;\r
        totalFeesPaid += amounts.collected;\r
        totalUnpaid += amounts.due;\r
        if (getCorrectStatus(fee) === "Pending") totalPending += amounts.due;\r
      });\r
\r
      document.getElementById("totalImposed").textContent = \`₹\${totalImposed.toLocaleString()}\`;\r
      document.getElementById("totalPaid").textContent = \`₹\${totalFeesPaid.toLocaleString()}\`;\r
      document.getElementById("totalPending").textContent = \`₹\${totalPending.toLocaleString()}\`;\r
      document.getElementById("totalUnpaid").textContent = \`₹\${totalUnpaid.toLocaleString()}\`;\r
      document.getElementById("grandTotal").textContent = \`₹\${totalFeesPaid.toLocaleString()}\`;\r
      document.getElementById("selectedCount").textContent = selectedRows.size;\r
      document.getElementById("totalRecords").textContent = \`(\${fees.length} fee records / \${reportRows.length} report entries)\`;\r
      updateFeeAnalytics(reportRows);\r
    }\r
\r
    window.markSelectedAsPartial = async () => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      if (selectedRows.size === 0) {\r
        showToast("Select rows first.", 'error');\r
        return;\r
      }\r
      const tcBlocked = Array.from(selectedRows).filter((feeId) => {\r
        const fee = allFees.find((f) => f.id === feeId);\r
        return fee && studentTcMap[fee.studentId];\r
      });\r
      if (tcBlocked.length) {\r
        showToast("TC issued for one or more selected students - fee updates are blocked.", "error");\r
        return;\r
      }\r
\r
      const partialAmount = prompt(\`Enter payment amount for \${selectedRows.size} fees:\\n\\nAmount per fee (₹):\`);\r
\r
      if (!partialAmount || parseFloat(partialAmount) <= 0) {\r
        showToast("Enter valid amount.", 'error');\r
        return;\r
      }\r
      const paymentMode = askPaymentMode();\r
      if (!paymentMode) return;\r
\r
      if (!confirm(\`Add ₹\${parseFloat(partialAmount).toLocaleString()} to \${selectedRows.size} fees?\`)) {\r
        return;\r
      }\r
\r
      const btn = document.querySelector('.top-bar .btn-partial');\r
      const originalText = btn.innerHTML;\r
      btn.innerHTML = '<span class="loading"></span> Processing...';\r
      btn.disabled = true;\r
\r
      try {\r
        const updatePromises = Array.from(selectedRows).map(async (feeId) => {\r
          const fee = allFees.find(f => f.id === feeId);\r
          if (fee) {\r
            const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
            const totalPaidSoFar = getTotalPaidAmount(fee);\r
            const paymentAmount = parseFloat(partialAmount);\r
            const newTotalPaid = totalPaidSoFar + paymentAmount;\r
            const newStatus = newTotalPaid >= originalAmount ? 'Paid' : 'Partial';\r
\r
            const currentPayments = fee.payments || [];\r
            const newPayment = {\r
              amount: paymentAmount,\r
              date: new Date(),\r
              note: 'Bulk partial payment',\r
              ...paymentMode,\r
              ledgerTransactionId: newLedgerTransactionId("FEE")\r
            };\r
\r
            await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
              status: newStatus,\r
              totalPaidAmount: newTotalPaid,\r
              paidAmount: paymentAmount,\r
              remainingAmount: Math.max(0, originalAmount - newTotalPaid),\r
              ...sessionFeeFields(),\r
              payments: [...currentPayments, newPayment],\r
              lastPaymentAmount: paymentAmount,\r
              lastPaymentDate: serverTimestamp()\r
            });\r
            await syncReceivedFee(feeId, fee, newPayment, currentPayments.length);\r
          }\r
        });\r
\r
        await Promise.all(updatePromises);\r
        showToast(\`\${selectedRows.size} fees updated.\`, 'partial');\r
        selectedRows.clear();\r
        loadAllReports();\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      } finally {\r
        btn.innerHTML = originalText;\r
        btn.disabled = false;\r
      }\r
    };\r
\r
    window.markSelectedAsPaid = async () => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      if (selectedRows.size === 0) {\r
        showToast("Select rows first.", 'error');\r
        return;\r
      }\r
      const tcBlocked = Array.from(selectedRows).filter((feeId) => {\r
        const fee = allFees.find((f) => f.id === feeId);\r
        return fee && studentTcMap[fee.studentId];\r
      });\r
      if (tcBlocked.length) {\r
        showToast("TC issued for one or more selected students - fee updates are blocked.", "error");\r
        return;\r
      }\r
\r
      const paymentMode = askPaymentMode();\r
      if (!paymentMode) return;\r
      if (!confirm(\`Mark \${selectedRows.size} fees as fully paid?\`)) return;\r
\r
      const btn = document.querySelector('.top-bar .btn-success');\r
      const originalText = btn.innerHTML;\r
      btn.innerHTML = '<span class="loading"></span> Marking Paid...';\r
      btn.disabled = true;\r
\r
      try {\r
        const updatePromises = Array.from(selectedRows).map(async (feeId) => {\r
          const fee = allFees.find(f => f.id === feeId);\r
          const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
          const amountReceived = Math.max(0, originalAmount - getTotalPaidAmount(fee));\r
          if (amountReceived <= 0) return;\r
          const currentPayments = fee.payments || [];\r
          const newPayment = {\r
            amount: amountReceived,\r
            receivedAmount: amountReceived,\r
            appliedAmount: amountReceived,\r
            date: new Date(),\r
            note: 'Marked fully paid from Reports',\r
            ...paymentMode,\r
            ledgerTransactionId: newLedgerTransactionId("FEE")\r
          };\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
            status: "Paid",\r
            totalPaidAmount: originalAmount,\r
            paidAmount: originalAmount,\r
            remainingAmount: 0,\r
            ...sessionFeeFields(),\r
            payments: [...currentPayments, newPayment],\r
            datePaid: serverTimestamp()\r
          });\r
          await syncReceivedFee(feeId, fee, newPayment, currentPayments.length);\r
        });\r
\r
        await Promise.all(updatePromises);\r
        showToast(\`\${selectedRows.size} fees marked fully paid.\`, 'success');\r
        selectedRows.clear();\r
        loadAllReports();\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      } finally {\r
        btn.innerHTML = originalText;\r
        btn.disabled = false;\r
      }\r
    };\r
\r
    window.markFeeAsPartial = async (feeId) => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      const partialAmount = prompt("Enter partial payment amount:");\r
      if (!partialAmount || parseFloat(partialAmount) <= 0) return;\r
      const paymentMode = askPaymentMode();\r
      if (!paymentMode) return;\r
\r
      try {\r
        const fee = allFees.find(f => f.id === feeId);\r
        const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
        const totalPaidSoFar = getTotalPaidAmount(fee);\r
        const paymentAmount = parseFloat(partialAmount);\r
        const newTotalPaid = totalPaidSoFar + paymentAmount;\r
\r
        const currentPayments = fee.payments || [];\r
        const newPayment = {\r
          amount: paymentAmount,\r
          receivedAmount: paymentAmount,\r
          appliedAmount: paymentAmount,\r
          date: new Date(),\r
          note: 'Single partial payment',\r
          ...paymentMode,\r
          ledgerTransactionId: newLedgerTransactionId("FEE")\r
        };\r
        await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
          status: newTotalPaid >= originalAmount ? 'Paid' : 'Partial',\r
          totalPaidAmount: newTotalPaid,\r
          paidAmount: paymentAmount,\r
          remainingAmount: Math.max(0, originalAmount - newTotalPaid),\r
          ...sessionFeeFields(),\r
          payments: [...currentPayments, newPayment]\r
        });\r
        await syncReceivedFee(feeId, fee, newPayment, currentPayments.length);\r
        showToast(\`₹\${paymentAmount.toLocaleString()} added.\`, 'partial');\r
        loadAllReports();\r
      } catch (error) {
        showToast("Error: " + error.message, 'error');
      }
    };
\r
    async function fetchFeeReportDocs() {\r
      const feesRef = collection(db, "schools", activeSchoolId, "fees");\r
      try {\r
        return await getDocs(query(feesRef, orderBy("date", "desc")));\r
      } catch (error) {\r
        console.warn("Ordered fee fetch failed; falling back to unordered fetch.", error);\r
        return await getDocs(feesRef);\r
      }\r
    }\r
\r
    function feeRecordsFromSnapshot(snapshot) {
      const loadedFees = [];
      snapshot.forEach(doc => {
        const fee = { id: doc.id, ...doc.data() };
        if (feeBelongsToActiveSession(fee)) loadedFees.push(fee);
      });
      return loadedFees;
    }

    function hydrateAllFeesFromSnapshot(snapshot) {
      const loadedFees = feeRecordsFromSnapshot(snapshot);
      allFees = mergeDuplicateFeeRecords(loadedFees);
      allFees.sort((a, b) => feeDateValue(b) - feeDateValue(a));
    }

    async function fetchCleanFeeSnapshot({ silent = true } = {}) {
      let snapshot = await fetchFeeReportDocs();
      const cleanupResult = await cleanupDuplicateFeeRecords(feeRecordsFromSnapshot(snapshot), { silent });
      if (cleanupResult.groupsFixed || cleanupResult.docsDeleted || cleanupResult.docsUpdated) {
        snapshot = await fetchFeeReportDocs();
      }
      return { snapshot, cleanupResult };
    }

    function snapshotRows(snapshot) {
      const rows = [];
      snapshot.forEach((item) => rows.push({ id: item.id, ...item.data() }));
      return rows;
    }

    async function deleteDocsInCollection(collectionName, predicate = () => true) {
      const snap = await getDocs(collection(db, "schools", activeSchoolId, collectionName));
      const rows = snapshotRows(snap).filter(predicate);
      let deleted = 0;
      for (const row of rows) {
        await deleteDoc(doc(db, "schools", activeSchoolId, collectionName, row.id));
        deleted++;
      }
      return deleted;
    }

    function isFeeAccountEntry(entry = {}) {
      const sourceType = String(entry.sourceType || "").toLowerCase();
      const category = String(entry.category || "").toLowerCase();
      const reason = String(entry.reason || "").toLowerCase();
      return sourceType === "student_fee" ||
        category === "fees" ||
        Boolean(entry.feeMonth) ||
        reason.includes("fee received");
    }
\r
    async function refreshStudentTcMap() {\r
      try {\r
        const stSnap = await getDocs(collection(db, "schools", activeSchoolId, "students"));\r
        studentTcMap = {};\r
        stSnap.forEach((d) => {\r
          const data = d.data();\r
          const sid = data.studentId || d.id;\r
          studentTcMap[sid] = !!data.tcIssued;\r
        });\r
      } catch (error) {\r
        console.warn("Student TC map load failed; fee records will still render.", error);\r
      }\r
    }\r
\r
    async function runAutoFineAfterReportLoad() {\r
      if (autoFineApplying || activeSessionLocked || !activeSchoolId) return;\r
      try {\r
        const autoResult = await autoApplyDueFineRules();\r
        if (autoResult.appliedCount > 0) {\r
          const refreshedSnapshot = await fetchFeeReportDocs();\r
          hydrateAllFeesFromSnapshot(refreshedSnapshot);\r
          filteredFees = buildReportEntries(allFees);\r
          displayReports();\r
          updateStats(filteredFees);\r
          renderDailyTransactions();\r
          showToast(\`Auto fine applied: Rs \${autoResult.totalFine.toLocaleString()} on \${autoResult.appliedCount} student(s).\`, "partial");\r
        }\r
      } catch (error) {\r
        console.warn("Background auto fine failed:", error);\r
      }\r
    }\r
\r
    window.loadAllReports = async () => {
      try {
        await loadActiveSession();
        const { snapshot, cleanupResult } = await fetchCleanFeeSnapshot({ silent: true });
        hydrateAllFeesFromSnapshot(snapshot);
        populateReportSections();
        filteredFees = buildReportEntries(allFees);
        currentPage = 1;
        displayReports();
        updateStats(filteredFees);
        renderDailyTransactions();\r
        showToast(\`\${allFees.length} records loaded\${activeSessionLabel ? \` for \${activeSessionLabel}\` : ""}\${cleanupResult.docsDeleted ? \`, \${cleanupResult.docsDeleted} duplicate removed\` : ""}\`);
        setTimeout(async () => {
          await refreshStudentTcMap();
          await runAutoFineAfterReportLoad();
        }, 0);\r
      } catch (error) {\r
        console.error("Fee report load failed:", error);\r
        showToast("Error: " + error.message, 'error');
      }
    };

    window.cleanupDuplicateFeesNow = async () => {
      if (!ensureSessionEditable("Duplicate fee cleanup")) return;
      if (!confirm("Remove duplicate imposed fee records for the selected session? Payments and fines will be merged into one record before duplicates are deleted.")) return;
      try {
        await loadActiveSession();
        const { snapshot, cleanupResult } = await fetchCleanFeeSnapshot({ silent: true });
        hydrateAllFeesFromSnapshot(snapshot);
        filteredFees = buildReportEntries(allFees);
        currentPage = 1;
        displayReports();
        updateStats(filteredFees);
        renderDailyTransactions();\r
        if (cleanupResult.docsDeleted) {
          showToast(\`\${cleanupResult.docsDeleted} duplicate fee record(s) removed.\`);
        } else {
          showToast("No duplicate fee records found.");
        }
      } catch (error) {
        console.error("Duplicate fee cleanup failed:", error);
        showToast("Cleanup failed: " + error.message, "error");
      }
    };

    window.deleteAllFeeRecordsNow = async () => {
      if (!ensureSessionEditable("Fee record deletion")) return;
      if (feeDeleteInProgress) return showToast("Fee record deletion is already running.", "error");
      const firstConfirm = confirm("Permanently delete ALL student fee records for this school? This removes imposed fees, payment history, fee transactions, and fee-linked account entries.");
      if (!firstConfirm) return;
      const typed = prompt('Type DELETE FEES to confirm permanent deletion.');
      if (String(typed || "").trim().toUpperCase() !== "DELETE FEES") {
        showToast("Deletion cancelled.", "error");
        return;
      }

      const btn = document.getElementById("deleteAllFeeRecordsBtn");
      try {
        feeDeleteInProgress = true;
        if (btn) {
          btn.disabled = true;
          btn.textContent = "Deleting...";
        }
        await loadActiveSession();

        const deletedFees = await deleteDocsInCollection("fees");
        const deletedOnlineTransactions = await deleteDocsInCollection("onlineFeeTransactions");
        const deletedFeeAccounts = await deleteDocsInCollection("accounts", isFeeAccountEntry);

        allFees = [];
        filteredFees = [];
        selectedRows.clear();
        currentPage = 1;
        displayReports();
        updateStats([]);
        const dailyDate = document.getElementById("dailyTransactionDate");\r
        if (dailyDate) dailyDate.value = "";\r
        renderDailyTransactions();\r
        document.getElementById("reportsTable").innerHTML = '<div class="no-data">All fee records deleted.</div>';
        document.getElementById("pagination").innerHTML = "";
        showToast(\`Deleted \${deletedFees} fee record(s), \${deletedOnlineTransactions} online transaction(s), and \${deletedFeeAccounts} fee account entry(s).\`);
      } catch (error) {
        console.error("Delete all fee records failed:", error);
        showToast("Delete failed: " + error.message, "error");
      } finally {
        feeDeleteInProgress = false;
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Delete All Fee Records";
        }
      }
    };

    window.loadReports = () => {
      const searchTerm = document.getElementById("searchStudent").value.toLowerCase();\r
      const selectedClass = document.getElementById("filterClass").value;
      const selectedSection = document.getElementById("filterSection").value;
      const selectedStatus = document.getElementById("filterStatus").value;\r
      const selectedMonth = document.getElementById("filterMonth").value;\r
\r
      filteredFees = buildReportEntries(allFees).filter(fee => {\r
        const correctStatus = getReportEntryStatus(fee);\r
        const matchesSearch = !searchTerm ||\r
          fee.studentName?.toLowerCase().includes(searchTerm) ||\r
          fee.studentId?.toLowerCase?.().includes(searchTerm) ||\r
          feeMatchesPaymentSearch(fee, searchTerm);\r
\r
        const matchesClass = !selectedClass || normalizeClassValue(fee.class || fee.currentClass || fee.finalClass) === normalizeClassValue(selectedClass);
        const matchesSection = !selectedSection || String(fee.section || "").trim().toLowerCase() === selectedSection.toLowerCase();
        const matchesStatus = !selectedStatus ||\r
          correctStatus === selectedStatus ||\r
          (selectedStatus === "Unpaid" && correctStatus === "Imposed");\r
        const matchesMonth = !selectedMonth || String(fee.month || "").toLowerCase() === String(selectedMonth).toLowerCase();\r
\r
        return matchesSearch && matchesClass && matchesSection && matchesStatus && matchesMonth;
      });\r
\r
      currentPage = 1;\r
      displayReports();\r
      updateStats(filteredFees);\r
    };\r
\r
    function renderPagination() {\r
      const totalPages = Math.ceil(filteredFees.length / rowsPerPage);\r
      if (!totalPages) {\r
        document.getElementById("pagination").innerHTML = "";\r
        return;\r
      }\r
      let html = \`\r
    <button class="pagination-btn \${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(1)">First</button>\r
    <button class="pagination-btn \${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(\${currentPage - 1})">Prev</button>\r
    <span class="page-info">Page \${currentPage} of \${totalPages} (\${filteredFees.length} total)</span>\r
    <button class="pagination-btn \${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(\${currentPage + 1})">Next</button>\r
    <button class="pagination-btn \${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(\${totalPages})">Last</button>\r
  \`;\r
      document.getElementById("pagination").innerHTML = html;\r
    }\r
\r
    window.changePage = (page) => {\r
      const totalPages = Math.ceil(filteredFees.length / rowsPerPage);\r
      if (page >= 1 && page <= totalPages) {\r
        currentPage = page;\r
        displayReports();\r
      }\r
    };\r
\r
    window.toggleRowSelection = (feeId) => {\r
      if (selectedRows.has(feeId)) {\r
        selectedRows.delete(feeId);\r
      } else {\r
        selectedRows.add(feeId);\r
      }\r
      updateStats(filteredFees);\r
    };\r
\r
    window.toggleSelectAll = () => {\r
      const selectAll = document.getElementById("selectAll");\r
      const checkboxes = document.querySelectorAll(".row-checkbox");\r
\r
      if (selectAll.checked) {\r
        checkboxes.forEach(cb => {\r
          selectedRows.add(cb.dataset.id);\r
          cb.checked = true;\r
        });\r
      } else {\r
        checkboxes.forEach(cb => {\r
          selectedRows.delete(cb.dataset.id);\r
          cb.checked = false;\r
        });\r
      }\r
      updateStats(filteredFees);\r
    };\r
\r
    window.exportToExcel = () => {\r
      let csv = 'Student ID,Student Name,Class,Section,Roll,Month,Entry Type,Entry Amount,Actually Paid,Remaining,Status,Remark,Date\\n';\r
\r
      filteredFees.forEach(fee => {\r
        const original = Number(fee.entryAmount ?? fee.originalAmount ?? fee.amount ?? 0);\r
        const totalPaid = getReportEntryPaidAmount(fee);\r
        const remaining = original - totalPaid;\r
        const correctStatus = getReportEntryStatus(fee);\r
        csv += \`"\${fee.studentId || ''}","\${(fee.studentName || '').replace(/"/g, '""')}","\${fee.class || ''}","\${fee.section || ''}","\${fee.roll || ''}","\${fee.month || ''}","\${fee.reportEntryType || 'Fee entry'}",\${original},\${totalPaid},\${remaining},"\${correctStatus}","\${(fee.entryRemark || fee.remarks || fee.impositionRemark || '').replace(/"/g, '""')}","\${reportEntryDateText(fee)}"\\n\`;\r
      });\r
\r
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });\r
      const url = URL.createObjectURL(blob);\r
      const a = document.createElement('a');\r
      a.href = url;\r
      a.download = \`\${getExportSchoolName()}_Fees_Report_\${new Date().toISOString().split('T')[0]}.csv\`;\r
      document.body.appendChild(a);\r
      a.click();\r
      document.body.removeChild(a);\r
      URL.revokeObjectURL(url);\r
      showToast("Excel exported.");\r
    };\r
\r
    window.printReport = () => {
      const previousPage = currentPage;
      const rowsSelect = document.getElementById("rowsPerPage");
      const previousRows = rowsSelect?.value || "10";
      currentPage = 1;
      if (rowsSelect) rowsSelect.value = "9999";
      displayReports();

      const restoreReport = () => {
        window.removeEventListener("afterprint", restoreReport);
        currentPage = previousPage;
        if (rowsSelect) rowsSelect.value = previousRows;
        displayReports();
      };
      window.addEventListener("afterprint", restoreReport);
      window.print();
    };
\r
    window.showPartialDetailsById = (feeId) => {\r
      const fee = allFees.find((entry) => entry.id === feeId);\r
      if (!fee) {\r
        showToast("Fee record not found.", "error");\r
        return;\r
      }\r
      currentPartialFee = fee;\r
      currentPartialFeeId = fee.id;\r
      const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
      const totalPaidAmount = getTotalPaidAmount(fee);\r
      const remaining = originalAmount - totalPaidAmount;\r
      const progress = originalAmount > 0 ? (totalPaidAmount / originalAmount * 100) : 0;\r
\r
      document.getElementById("partialDetailsStudent").textContent = \`\${fee.studentName} (\${fee.studentId}) - \${fee.month}\`;\r
\r
      const paymentsHtml = (fee.payments || []).map(p =>\r
        \`<div style="padding:8px;border-bottom:1px solid #eee;">\r
      <strong>Received ₹\${Number(p.receivedAmount ?? p.amount ?? 0).toLocaleString()}</strong>\r
      <br><small>Applied ₹\${Number(p.appliedAmount ?? p.amount ?? 0).toLocaleString()}\${Number(p.extraAmount || 0) > 0 ? \` / Extra ₹\${Number(p.extraAmount || 0).toLocaleString()}\` : ""}</small>\r
      <span style="color:#666;float:right;font-size:12px;">\r
        \${formatDateTime(p.date)}\r
      </span>\r
      \${p.razorpayPaymentId || p.paymentId ? \`<br><small><strong>Payment ID:</strong> \${p.razorpayPaymentId || p.paymentId}</small>\` : ''}\r
      \${p.razorpayOrderId || p.orderId ? \`<br><small><strong>Order ID:</strong> \${p.razorpayOrderId || p.orderId}</small>\` : ''}\r
      \${p.paymentMode ? \`<br><small><strong>Mode:</strong> \${esc(p.paymentMode)}</small>\` : ''}\r
      \${p.note ? \`<br><small>\${p.note}</small>\` : ''}\r
    </div>\`\r
      ).join('');\r
\r
      const detailsHtml = \`\r
    <div style="background:#f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #cbd5e1;">\r
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">\r
        <div><strong>Original Amount:</strong> ₹\${originalAmount.toLocaleString()}</div>\r
        <div><strong>Actually Paid:</strong> ₹\${totalPaidAmount.toLocaleString()}</div>\r
        <div style="color:#065f46;font-size:18px;"><strong>Remaining:</strong> ₹\${remaining.toLocaleString()}</div>\r
        <div><strong>Progress:</strong> \${Math.round(progress)}%</div>\r
      </div>\r
      <div style="width:100%;height:10px;background:#e0e0e0;border-radius:5px;overflow:hidden;">\r
        <div style="height:100%;background:#1f3a5f;width:\${progress}%;border-radius:5px;"></div>\r
      </div>\r
    </div>\r
    <div style="max-height:300px;overflow-y:auto;background:#f8f9ff;border-radius:8px;padding:15px;">\r
      <strong>Payment History (\${(fee.payments || []).length} payments):</strong>\r
      \${paymentsHtml || '<div style="text-align:center;color:#666;padding:20px;">No payments yet</div>'}\r
    </div>\r
  \`;\r
\r
      document.getElementById("partialDetailsContent").innerHTML = detailsHtml;\r
      document.getElementById("partialDetailsModal").style.display = "flex";\r
    };\r
\r
    window.closePartialDetailsModal = () => {\r
      document.getElementById("partialDetailsModal").style.display = "none";\r
    };\r
\r
    window.addMorePayment = () => {\r
      if (!currentPartialFee) {\r
        showToast("No fee selected for payment.", "error");\r
        return;\r
      }\r
      document.getElementById("partialDetailsModal").style.display = "none";\r
      document.getElementById("addPaymentStudent").textContent = \`\${currentPartialFee.studentName} - \${currentPartialFee.month}\`;\r
      document.getElementById("paymentAmount").value = "";\r
      document.getElementById("paymentMode").value = "";\r
      document.getElementById("paymentModeOther").value = "";\r
      document.getElementById("paymentModeOther").style.display = "none";\r
      document.getElementById("paymentNote").value = "";\r
      document.getElementById("addPaymentModal").style.display = "flex";\r
    };\r
\r
    window.closeAddPaymentModal = () => {\r
      document.getElementById("addPaymentModal").style.display = "none";\r
      currentPartialFee = null;\r
      currentPartialFeeId = null;\r
    };\r
\r
    window.confirmAddPayment = async () => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      const paymentAmount = parseFloat(document.getElementById("paymentAmount").value);\r
      const note = document.getElementById("paymentNote").value;\r
      const paymentMode = paymentModeFromFields("paymentMode", "paymentModeOther");\r
\r
      if (!paymentAmount || paymentAmount <= 0) {\r
        showToast("Enter a valid payment amount.", 'error');\r
        return;\r
      }\r
      if (paymentMode.error) return showToast(paymentMode.error, "error");\r
      if (currentPartialFee?.studentId && studentTcMap[currentPartialFee.studentId]) {\r
        showToast("TC issued for this student ï¿½ fee payments are not allowed.", 'error');\r
        return;\r
      }\r
\r
      const amounts = getFeeAmounts(currentPartialFee);\r
      const isZeroAssignedEntry = amounts.total <= 0 && amounts.due <= 0;\r
      const appliedNow = isZeroAssignedEntry ? paymentAmount : Math.min(paymentAmount, amounts.due);\r
      const extraNow = isZeroAssignedEntry ? 0 : Math.max(0, paymentAmount - amounts.due);\r
      const newTotalPaid = amounts.applied + appliedNow;\r
      const newTotalExtra = amounts.extra + extraNow;\r
      const remainingAfter = Math.max(0, amounts.total - newTotalPaid);\r
\r
      if (!confirm(\`Add payment\\n\\nReceived: ₹\${paymentAmount.toLocaleString()}\\nApplied: ₹\${appliedNow.toLocaleString()}\\nExtra stored: ₹\${extraNow.toLocaleString()}\\nRemaining after: ₹\${remainingAfter.toLocaleString()}\\n\\nProceed?\`)) {\r
        return;\r
      }\r
\r
      try {\r
        const currentPayments = currentPartialFee.payments || [];\r
        const newPayment = {\r
          receivedAmount: paymentAmount,\r
          appliedAmount: appliedNow,\r
          extraAmount: extraNow,\r
          amount: appliedNow,\r
          date: new Date(),\r
          note: note || 'Payment added from Reports',\r
          status: extraNow > 0 ? "Applied with extra" : remainingAfter === 0 ? "FULLY PAID" : "PARTIAL PAID",\r
          ...paymentMode,\r
          ledgerTransactionId: newLedgerTransactionId("FEE")\r
        };\r
\r
        await updateDoc(doc(db, "schools", activeSchoolId, "fees", currentPartialFee.id), {\r
          status: remainingAfter === 0 ? 'Paid' : 'Partial',\r
          totalPaidAmount: newTotalPaid,\r
          paidAmount: newTotalPaid,\r
          totalExtraPaidAmount: newTotalExtra,\r
          totalCollectedAmount: newTotalPaid + newTotalExtra,\r
          remainingAmount: remainingAfter,\r
          ...sessionFeeFields(),\r
          payments: [...currentPayments, newPayment],\r
          lastPaymentAmount: paymentAmount,\r
          lastAppliedAmount: appliedNow,\r
          lastExtraAmount: extraNow,\r
          lastPaymentDate: serverTimestamp(),\r
          updatedAt: serverTimestamp()\r
        });\r
        await syncReceivedFee(currentPartialFee.id, currentPartialFee, newPayment, currentPayments.length);\r
\r
        closeAddPaymentModal();\r
        await loadAllReports();\r
        showToast(extraNow > 0\r
          ? \`₹\${appliedNow.toLocaleString()} applied and ₹\${extraNow.toLocaleString()} stored as extra.\`\r
          : \`₹\${paymentAmount.toLocaleString()} added successfully.\`, 'partial');\r
      } catch (error) {
        showToast("Error: " + error.message, 'error');
      }
    };
\r
    // Late fine rule handlers are defined below with auto-apply support.\r
\r
    function readFineConfig() {\r
      const month = document.getElementById("fineMonth").value;\r
      const dueDate = document.getElementById("fineDueDate").value;\r
      const eligibility = document.getElementById("fineEligibility").value || "all-due";\r
      const dueThreshold = Number(document.getElementById("fineDueThreshold").value || 0);\r
      const mode = document.getElementById("fineMode").value || "fixed";\r
      const fineAmount = Number(document.getElementById("fineAmount").value || 0);\r
      const basis = document.getElementById("fineBasis").value || "due";\r
      const intervalDays = Math.max(1, Number(document.getElementById("fineIntervalDays").value || 1));\r
      return { month, dueDate, eligibility, dueThreshold, mode, fineAmount, basis, intervalDays };\r
    }\r
\r
    function validateFineConfig(config, silent = false) {\r
      if (!config.month || !config.dueDate || Number(config.fineAmount || 0) <= 0) {\r
        if (!silent) showToast("Select month, last payment date, and fine amount/percentage.", "error");\r
        return false;\r
      }\r
      if (config.eligibility === "due-above" && Number(config.dueThreshold || 0) <= 0) {\r
        if (!silent) showToast("Enter minimum due amount for this eligibility option.", "error");\r
        return false;\r
      }\r
      return true;\r
    }\r
\r
    async function saveFineRuleConfig(config, silent = false) {\r
      if (!validateFineConfig(config, silent)) return false;\r
      const ruleKey = getFineRuleKey(config);\r
      const existingRules = await getSavedFineRules();\r
      const existingRule = existingRules[config.month] || {};\r
      await setDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"), {\r
        rules: {\r
          [config.month]: {\r
            ...existingRule,\r
            ...config,\r
            ruleKey,\r
            autoApply: true,\r
            active: true,\r
            createdAt: existingRule.createdAt || new Date(),\r
            updatedAt: new Date(),\r
            ...sessionFeeFields()\r
          }\r
        },\r
        updatedAt: serverTimestamp()\r
      }, { merge: true });\r
      return true;\r
    }\r
\r
    window.saveAutoFineRule = async () => {\r
      try {\r
        const config = readFineConfig();\r
        const saved = await saveFineRuleConfig(config);\r
        if (!saved) return;\r
        const calc = calculateModernFinePeriods(config);\r
        const summary = document.getElementById("fineRuleSummary");\r
        if (summary) {\r
          summary.textContent = calc.periods > 0\r
            ? \`Auto rule saved. It is already due, so Apply/Preview can impose it now.\`\r
            : \`Auto rule saved. Fine will start automatically after \${formatDateTime(calc.dueDate)}.\`;\r
        }\r
        showToast("Auto fine rule saved.");\r
      } catch (error) {\r
        showToast("Error saving rule: " + error.message, "error");\r
      }\r
    };\r
\r
    function fillFineRuleForm(config) {\r
      document.getElementById("fineMonth").value = config.month || "";\r
      document.getElementById("fineDueDate").value = config.dueDate || "";\r
      document.getElementById("fineDueDay").value = config.dueDay || "";\r
      document.getElementById("fineEligibility").value = config.eligibility || "all-due";\r
      document.getElementById("fineDueThreshold").value = config.dueThreshold || "";\r
      document.getElementById("fineMode").value = config.mode || "fixed";\r
      document.getElementById("fineAmount").value = config.fineAmount || "";\r
      document.getElementById("fineBasis").value = config.basis || "due";\r
      document.getElementById("fineIntervalDays").value = config.intervalDays || (config.frequency === "weekly" ? 7 : config.frequency === "monthly" ? 30 : 1);\r
    }\r
\r
    function ruleStatusText(rule, config) {\r
      if (rule.active === false) return "Paused";\r
      const calc = calculateModernFinePeriods(config);\r
      return calc.periods > 0 ? \`Due now: \${calc.daysLate} day(s), \${calc.periods} period(s)\` : \`Starts after \${formatDateTime(calc.dueDate)}\`;\r
    }\r
\r
    function summarizeFineRuleUsage(month, config) {\r
      const ruleKey = config.ruleKey || getFineRuleKey(config);\r
      const students = new Set();\r
      let total = 0;\r
      (allFees || []).forEach((fee) => {\r
        getFineDetails(fee).forEach((fine) => {\r
          if (!fineDetailMatchesRule(fine, ruleKey, config)) return;\r
          total += Number(fine.amount || 0);\r
          if (fee.studentId) students.add(fee.studentId);\r
        });\r
      });\r
      return { total, students: students.size };\r
    }\r
\r
    function formatRuleDate(value) {\r
      return value ? formatDateTime(value) : "-";\r
    }\r
\r
    function fineRuleDetailHtml(month, rule, config) {\r
      const calc = calculateModernFinePeriods(config);\r
      const usage = summarizeFineRuleUsage(month, config);\r
      const amountText = config.mode === "percentage"\r
        ? \`\${config.fineAmount}%\`\r
        : \`Rs \${Number(config.fineAmount || 0).toLocaleString()}\`;\r
      const basisText = config.basis === "assigned" ? "assigned amount" : "due amount";\r
      const startText = calc.periods > 0\r
        ? \`Started \${calc.daysLate} day(s) ago\`\r
        : \`Starts after due date\`;\r
      const nextAction = rule.active === false\r
        ? "Paused - auto fine will not run"\r
        : calc.periods > 0\r
          ? "Ready - preview/apply will add only pending delta"\r
          : "Waiting - auto fine starts after last payment date";\r
      const details = [\r
        ["Month", month],\r
        ["Last payment date", formatRuleDate(calc.dueDate || config.dueDate)],\r
        ["Start status", startText],\r
        ["Days late", \`\${calc.daysLate || 0}\`],\r
        ["Billing periods", \`\${calc.periods || 0}\`],\r
        ["Fine", \`\${amountText} every \${config.intervalDays} day(s)\`],\r
        ["Basis", basisText],\r
        ["Eligibility", fineEligibilityLabel(config)],\r
        ["Minimum due", config.eligibility === "due-above" ? \`Rs \${Number(config.dueThreshold || 0).toLocaleString()}\` : "-"],\r
        ["Auto apply", rule.autoApply === false ? "Off" : "On"],\r
        ["Rule status", rule.active === false ? "Paused" : "Active"],\r
        ["Session", config.session || config.sessionId || activeSessionLabel || "Current"],\r
        ["Applied so far", \`Rs \${usage.total.toLocaleString()} on \${usage.students} student(s)\`],\r
        ["Last auto run", rule.lastAutoAppliedAt ? formatDateTime(rule.lastAutoAppliedAt) : "-"],\r
        ["Last run amount", rule.lastAutoAppliedAmount ? \`Rs \${Number(rule.lastAutoAppliedAmount || 0).toLocaleString()} on \${Number(rule.lastAutoAppliedStudents || 0)} student(s)\` : "-"],\r
        ["Created", rule.createdAt ? formatDateTime(rule.createdAt) : "-"],\r
        ["Updated", rule.updatedAt ? formatDateTime(rule.updatedAt) : "-"],\r
        ["Next action", nextAction]\r
      ];\r
      return \`\r
        <article style="border:1px solid #dbe3ef;border-radius:12px;padding:16px;background:#fff;margin-bottom:14px;">\r
          <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-start;">\r
            <div>\r
              <h4 style="margin:0 0 6px;color:#172033;">\${esc(month)} Fine Rule</h4>\r
              <div style="color:#475569;font-size:13px;font-weight:700;">\${esc(amountText)} every \${esc(config.intervalDays)} day(s) on \${esc(basisText)}</div>\r
            </div>\r
            <span class="status-\${rule.active === false ? "pending" : "imposed"}">\${esc(ruleStatusText(rule, config))}</span>\r
          </div>\r
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:14px;">\r
            \${details.map(([label, value]) => \`\r
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px;">\r
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;font-weight:800;">\${esc(label)}</div>\r
                <div style="margin-top:4px;color:#172033;font-weight:700;font-size:13px;white-space:normal;">\${esc(value)}</div>\r
              </div>\r
            \`).join("")}\r
          </div>\r
          <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">\r
            <button class="btn" onclick="selectFineRule('\${esc(month)}')">Select</button>\r
            <button class="btn" onclick="previewSavedFineRule('\${esc(month)}')">Preview</button>\r
            <button class="btn btn-warning" onclick="toggleFineRule('\${esc(month)}', \${rule.active === false ? "true" : "false"})">\${rule.active === false ? "Activate" : "Pause"}</button>\r
          </div>\r
        </article>\r
      \`;\r
    }\r
\r
    async function renderFineRulesModal() {\r
      const list = document.getElementById("fineRulesList");\r
      const summary = document.getElementById("fineRulesSummary");\r
      if (!list || !summary) return;\r
      list.innerHTML = \`<div class="no-data">Loading saved fine rules...</div>\`;\r
      const rules = await getSavedFineRules();\r
      const entries = Object.entries(rules)\r
        .map(([month, rule]) => [month, rule, normalizeSavedFineConfig(month, rule)])\r
        .filter(([, , config]) => feeBelongsToActiveSession(config))\r
        .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]));\r
      const activeCount = entries.filter(([, rule]) => rule.active !== false).length;\r
      summary.textContent = entries.length\r
        ? \`\${activeCount} active rule(s), \${entries.length - activeCount} paused. Select any month to load it.\`\r
        : "No saved fine rules yet.";\r
      if (!entries.length) {\r
        list.innerHTML = \`<div class="no-data">Save an auto rule first. It will appear here month-wise.</div>\`;\r
        return;\r
      }\r
      list.innerHTML = \`<div style="max-height:520px;overflow:auto;padding-right:4px;">\${entries.map(([month, rule, config]) => fineRuleDetailHtml(month, rule, config)).join("")}</div>\`;\r
    }\r
\r
    window.openFineRulesModal = async () => {\r
      document.getElementById("fineRulesModal").style.display = "flex";\r
      try {\r
        await renderFineRulesModal();\r
      } catch (error) {\r
        document.getElementById("fineRulesList").innerHTML = \`<div class="no-data">Unable to load rules: \${esc(error.message)}</div>\`;\r
      }\r
    };\r
\r
    window.refreshFineRulesModal = () => renderFineRulesModal();\r
\r
    window.closeFineRulesModal = () => {\r
      document.getElementById("fineRulesModal").style.display = "none";\r
    };\r
\r
    window.selectFineRule = async (month) => {\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month];\r
        if (!rule) return showToast("Fine rule not found.", "error");\r
        const config = normalizeSavedFineConfig(month, rule);\r
        fillFineRuleForm(config);\r
        document.getElementById("fineRuleSummary").textContent = \`Loaded \${month} rule. Preview before applying.\`;\r
        closeFineRulesModal();\r
      } catch (error) {\r
        showToast("Unable to select rule: " + error.message, "error");\r
      }\r
    };\r
\r
    window.previewSavedFineRule = async (month) => {\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month];\r
        if (!rule) return showToast("Fine rule not found.", "error");\r
        const config = normalizeSavedFineConfig(month, rule);\r
        fillFineRuleForm(config);\r
        closeFineRulesModal();\r
        const preview = await buildLateFinePreview(config);\r
        if (preview) renderLateFinePreview(preview);\r
      } catch (error) {\r
        showToast("Unable to preview rule: " + error.message, "error");\r
      }\r
    };\r
\r
    window.toggleFineRule = async (month, shouldActivate) => {\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month];\r
        if (!rule) return showToast("Fine rule not found.", "error");\r
        await setDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"), {\r
          rules: {\r
            [month]: {\r
              ...rule,\r
              active: !!shouldActivate,\r
              updatedAt: new Date(),\r
              ...sessionFeeFields()\r
            }\r
          },\r
          updatedAt: serverTimestamp()\r
        }, { merge: true });\r
        await renderFineRulesModal();\r
        showToast(\`\${month} fine rule \${shouldActivate ? "activated" : "paused"}.\`);\r
      } catch (error) {\r
        showToast("Unable to update rule: " + error.message, "error");\r
      }\r
    };\r
\r
    function calculateModernFinePeriods(config, today = new Date()) {\r
      const dueDate = new Date(\`\${config.dueDate}T23:59:59\`);\r
      if (!config.dueDate || Number.isNaN(dueDate.getTime())) return { periods: 0, dueDate: null, daysLate: 0, intervalDays: config.intervalDays };\r
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());\r
      const dueStart = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());\r
      const daysLate = Math.max(0, Math.floor((todayStart - dueStart) / 86400000));\r
      return {\r
        periods: daysLate > 0 ? Math.ceil(daysLate / config.intervalDays) : 0,\r
        dueDate,\r
        daysLate,\r
        intervalDays: config.intervalDays\r
      };\r
    }\r
\r
    function feeMatchesFineEligibility(fee, amounts, config) {\r
      const principalDue = Math.max(0, amounts.due - getTotalFineAmount(fee));\r
      if (principalDue <= 0) return false;\r
      if (config.eligibility === "full-due") return amounts.applied <= 0 && principalDue > 0;\r
      if (config.eligibility === "partial-due") return amounts.applied > 0 && principalDue > 0;\r
      if (config.eligibility === "due-above") return principalDue > config.dueThreshold;\r
      return true;\r
    }\r
\r
    function fineEligibilityLabel(config) {\r
      if (config.eligibility === "full-due") return "Only full due amount";\r
      if (config.eligibility === "partial-due") return "Only partially paid amount";\r
      if (config.eligibility === "due-above") return \`Due above ₹\${config.dueThreshold.toLocaleString()}\`;\r
      return "Full due and partial due";\r
    }\r
\r
    function calculateFineForFee(fee, amounts, config, periods) {\r
      const existingFine = getTotalFineAmount(fee);\r
      const principalAssigned = Math.max(0, amounts.total - existingFine);\r
      const principalDue = Math.max(0, amounts.due - existingFine);\r
      const baseAmount = config.basis === "assigned" ? principalAssigned : principalDue;\r
      const perPeriodFine = config.mode === "percentage"\r
        ? Math.round((baseAmount * config.fineAmount) / 100)\r
        : config.fineAmount;\r
      return {\r
        baseAmount,\r
        perPeriodFine,\r
        totalFine: Math.max(0, perPeriodFine * periods)\r
      };\r
    }\r
\r
    function modernFineReason({ fee, config, calc, fineMath }) {\r
      const amountText = config.mode === "percentage"\r
        ? \`\${config.fineAmount}% of \${config.basis === "assigned" ? "assigned" : "due"} amount\`\r
        : \`₹\${config.fineAmount.toLocaleString()} fixed\`;\r
      return \`Late fine for \${fee.month || config.month}: \${calc.daysLate} day(s) late, \${calc.periods} period(s), \${amountText}.\`;\r
    }\r
\r
    async function buildLateFinePreview(configOverride = null, options = {}) {\r
      const silent = options.silent === true;\r
      if (!silent && !ensureSessionEditable("Late fee fine")) return null;\r
      const config = configOverride || readFineConfig();\r
      if (!validateFineConfig(config, silent)) return null;\r
      const calc = calculateModernFinePeriods(config);\r
      if (!calc.periods) {\r
        if (!silent) showToast("Fine is not due yet for this date. Save Auto Rule to start it automatically later.", "error");\r
        return null;\r
      }\r
\r
      const ruleKey = getFineRuleKey(config);\r
      const filters = [where("month", "==", config.month)];\r
      if (activeSessionId) filters.push(where("sessionId", "==", activeSessionId));\r
      const snapshot = await getDocs(query(collection(db, "schools", activeSchoolId, "fees"), ...filters));\r
      const rows = [];\r
      let skippedCount = 0;\r
\r
      snapshot.docs.forEach((feeDoc) => {\r
        const fee = { id: feeDoc.id, ...feeDoc.data() };\r
        if (!feeBelongsToActiveSession(fee) || studentTcMap[fee.studentId]) {\r
          skippedCount++;\r
          return;\r
        }\r
        const amounts = getFeeAmounts(fee);\r
        if (!feeMatchesFineEligibility(fee, amounts, config)) {\r
          skippedCount++;\r
          return;\r
        }\r
        const fineMath = calculateFineForFee(fee, amounts, config, calc.periods);\r
        const fineDetails = getFineDetails(fee);\r
        const alreadyForRule = fineDetails\r
          .filter((fine) => fineDetailMatchesRule(fine, ruleKey, config))\r
          .reduce((sum, fine) => sum + Number(fine.amount || 0), 0);\r
        const deltaFine = Math.max(0, fineMath.totalFine - alreadyForRule);\r
        rows.push({\r
          id: fee.id,\r
          fee,\r
          amounts,\r
          fineMath,\r
          alreadyForRule,\r
          deltaFine,\r
          alreadyImposed: deltaFine <= 0,\r
          reason: modernFineReason({ fee, config, calc, fineMath })\r
        });\r
      });\r
\r
      return {\r
        config,\r
        calc,\r
        ruleKey,\r
        rows,\r
        skippedCount,\r
        totalFine: rows.reduce((sum, row) => sum + row.deltaFine, 0),\r
        pendingCount: rows.filter((row) => row.deltaFine > 0).length,\r
        alreadyCount: rows.filter((row) => row.deltaFine <= 0).length\r
      };\r
    }\r
\r
    function renderLateFinePreviewLegacy(preview) {\r
      pendingFinePreview = preview;\r
      document.getElementById("finePreviewTitle").textContent = preview.config.month;\r
      document.getElementById("finePreviewSummary").textContent =\r
        \`\${preview.rows.length} student(s), total fine ₹\${preview.totalFine.toLocaleString()}, \${preview.calc.daysLate} day(s) late, \${preview.calc.periods} billing period(s).\`;\r
      const rowsHtml = preview.rows.map((row) => {\r
        const newDue = row.amounts.due + row.deltaFine;\r
        return \`\r
          <tr>\r
            <td><strong>\${esc(row.fee.studentId || "-")}</strong></td>\r
            <td>\${esc(row.fee.studentName || "-")}</td>\r
            <td>\${esc(row.fee.class || "")}\${row.fee.section ? "-" + esc(row.fee.section) : ""}</td>\r
            <td>₹\${row.amounts.total.toLocaleString()}</td>\r
            <td>₹\${row.amounts.applied.toLocaleString()}</td>\r
            <td>₹\${row.amounts.due.toLocaleString()}</td>\r
            <td>₹\${row.deltaFine.toLocaleString()}</td>\r
            <td>₹\${newDue.toLocaleString()}</td>\r
            <td style="font-size:12px;color:#475569;white-space:normal;min-width:220px;">\${esc(row.reason)}</td>\r
          </tr>\r
        \`;\r
      }).join("");\r
      document.getElementById("finePreviewList").innerHTML = preview.rows.length ? \`\r
        <div style="max-height:420px;overflow:auto;">\r
          <table style="width:100%;">\r
            <thead>\r
              <tr>\r
                <th>Student ID</th><th>Name</th><th>Class</th><th>Assigned</th><th>Paid</th><th>Current Due</th><th>Fine</th><th>New Due</th><th>Reason</th>\r
              </tr>\r
            </thead>\r
            <tbody>\${rowsHtml}</tbody>\r
          </table>\r
        </div>\r
      \` : \`<div class="no-data">No eligible students found for this fine rule.</div>\`;\r
      document.getElementById("finePreviewModal").style.display = "flex";\r
    }\r
\r
    function selectedFinePreviewRows() {\r
      if (!pendingFinePreview) return [];\r
      return pendingFinePreview.rows.filter((row, index) => finePreviewSelections[index] && row.deltaFine > 0);\r
    }\r
\r
    function updateFinePreviewSelectionSummary() {\r
      if (!pendingFinePreview) return;\r
      const selectedRows = selectedFinePreviewRows();\r
      const selectedTotal = selectedRows.reduce((sum, row) => sum + row.deltaFine, 0);\r
      document.getElementById("finePreviewSummary").textContent =\r
        \`\${pendingFinePreview.rows.length} eligible student(s): \${pendingFinePreview.pendingCount} pending, \${pendingFinePreview.alreadyCount} already imposed. Selected \${selectedRows.length}, total fine Rs \${selectedTotal.toLocaleString()}. \${pendingFinePreview.calc.daysLate} day(s) late, \${pendingFinePreview.calc.periods} period(s).\`;\r
    }\r
\r
    function renderLateFinePreview(preview) {\r
      pendingFinePreview = preview;\r
      finePreviewSelections = {};\r
      preview.rows.forEach((row, index) => {\r
        finePreviewSelections[index] = row.deltaFine > 0;\r
      });\r
      document.getElementById("finePreviewTitle").textContent = preview.config.month;\r
      const filter = document.getElementById("finePreviewFilter");\r
      if (filter) filter.value = "all";\r
      renderFinePreviewRows();\r
      document.getElementById("finePreviewModal").style.display = "flex";\r
    }\r
\r
    window.renderFinePreviewRows = () => {\r
      if (!pendingFinePreview) return;\r
      const filter = document.getElementById("finePreviewFilter")?.value || "all";\r
      const visibleRows = pendingFinePreview.rows\r
        .map((row, index) => ({ row, index }))\r
        .filter(({ row, index }) => {\r
          if (filter === "pending") return row.deltaFine > 0;\r
          if (filter === "already") return row.deltaFine <= 0;\r
          if (filter === "selected") return !!finePreviewSelections[index];\r
          return true;\r
        });\r
      const rowsHtml = visibleRows.map(({ row, index }) => {\r
        const newDue = row.amounts.due + row.deltaFine;\r
        const isAlready = row.deltaFine <= 0;\r
        return \`\r
          <tr>\r
            <td><input type="checkbox" class="fine-preview-check" data-index="\${index}" \${finePreviewSelections[index] ? "checked" : ""} onchange="setFinePreviewRowSelected(\${index}, this.checked)"></td>\r
            <td><strong>\${esc(row.fee.studentId || "-")}</strong></td>\r
            <td>\${esc(row.fee.studentName || "-")}</td>\r
            <td>\${esc(row.fee.class || "")}\${row.fee.section ? "-" + esc(row.fee.section) : ""}</td>\r
            <td>Rs \${row.amounts.total.toLocaleString()}</td>\r
            <td>Rs \${row.amounts.applied.toLocaleString()}</td>\r
            <td>Rs \${row.amounts.due.toLocaleString()}</td>\r
            <td>\${isAlready ? \`<span class="status-paid">Already imposed</span>\` : \`<span class="status-imposed">Pending Rs \${row.deltaFine.toLocaleString()}</span>\`}<br><small style="color:#64748b;">Applied before Rs \${row.alreadyForRule.toLocaleString()}</small></td>\r
            <td>Rs \${newDue.toLocaleString()}</td>\r
            <td style="font-size:12px;color:#475569;white-space:normal;min-width:220px;">\${esc(row.reason)}</td>\r
          </tr>\r
        \`;\r
      }).join("");\r
      document.getElementById("finePreviewList").innerHTML = pendingFinePreview.rows.length ? \`\r
        <div style="max-height:420px;overflow:auto;">\r
          <table style="width:100%;">\r
            <thead>\r
              <tr>\r
                <th>Select</th><th>Student ID</th><th>Name</th><th>Class</th><th>Assigned</th><th>Paid</th><th>Current Due</th><th>Fine Status</th><th>New Due</th><th>Reason</th>\r
              </tr>\r
            </thead>\r
            <tbody>\${rowsHtml || \`<tr><td colspan="10"><div class="no-data">No rows for this filter.</div></td></tr>\`}</tbody>\r
          </table>\r
        </div>\r
      \` : \`<div class="no-data">No eligible students found for this fine rule.</div>\`;\r
      updateFinePreviewSelectionSummary();\r
    };\r
\r
    window.setFinePreviewRowSelected = (index, checked) => {\r
      finePreviewSelections[index] = !!checked;\r
      updateFinePreviewSelectionSummary();\r
    };\r
\r
    window.toggleFinePreviewSelectAll = (checked) => {\r
      if (!pendingFinePreview) return;\r
      pendingFinePreview.rows.forEach((row, index) => {\r
        finePreviewSelections[index] = !!checked && row.deltaFine > 0;\r
      });\r
      renderFinePreviewRows();\r
    };\r
\r
    window.unselectAlreadyImposedFineRows = () => {\r
      if (!pendingFinePreview) return;\r
      pendingFinePreview.rows.forEach((row, index) => {\r
        if (row.deltaFine <= 0) finePreviewSelections[index] = false;\r
      });\r
      const filter = document.getElementById("finePreviewFilter");\r
      if (filter) filter.value = "already";\r
      renderFinePreviewRows();\r
    };\r
\r
    window.previewLateFeeFine = async () => {\r
      try {\r
        const preview = await buildLateFinePreview();\r
        if (preview) renderLateFinePreview(preview);\r
      } catch (error) {\r
        showToast("Error building preview: " + error.message, "error");\r
      }\r
    };\r
\r
    window.closeFinePreviewModal = () => {\r
      document.getElementById("finePreviewModal").style.display = "none";\r
    };\r
\r
    window.confirmFinePreviewApply = async () => {\r
      if (!pendingFinePreview) return showToast("Preview fine first.", "error");\r
      await applyLateFeeFineFromPreview(pendingFinePreview);\r
    };\r
\r
    window.loadFineRuleForMonth = async () => {\r
      const month = document.getElementById("fineMonth").value;\r
      const summary = document.getElementById("fineRuleSummary");\r
      if (summary) summary.textContent = "";\r
      if (!month || !activeSchoolId) return;\r
      try {\r
        const rules = await getSavedFineRules();\r
        const rule = rules[month] || null;\r
        if (!rule) {\r
          if (summary) summary.textContent = \`No saved fine rule for \${month}.\`;\r
          return;\r
        }\r
        const config = normalizeSavedFineConfig(month, rule);\r
        fillFineRuleForm(config);\r
        if (summary) summary.textContent = \`Saved rule loaded for \${month}\${rule.active === false ? " (paused)" : ""}. Preview before applying.\`;\r
      } catch (error) {\r
        console.warn("Fine rule load failed:", error);\r
      }\r
    };\r
\r
    async function applyLateFeeFineFromPreview(preview, options = {}) {\r
      const silent = options.silent === true;\r
      const rowsToApply = silent\r
        ? preview.rows.filter((row) => row.deltaFine > 0)\r
        : selectedFinePreviewRows();\r
      if (!preview.rows.length) {\r
        if (!silent) showToast("No eligible students to apply fine.", "error");\r
        return { updatedCount: 0, addedFineTotal: 0 };\r
      }\r
      const selectedTotal = rowsToApply.reduce((sum, row) => sum + row.deltaFine, 0);\r
      if (!rowsToApply.length || selectedTotal <= 0) {\r
        if (!silent) showToast("No pending fine selected. Already imposed rows will not be charged again.", "error");\r
        return { updatedCount: 0, addedFineTotal: 0 };\r
      }\r
      if (!silent && !confirm(\`Apply fine to \${rowsToApply.length} selected student(s)?\\nTotal fine: Rs \${selectedTotal.toLocaleString()}\`)) {\r
        return { updatedCount: 0, addedFineTotal: 0 };\r
      }\r
      const { config, calc, ruleKey } = preview;\r
      try {\r
        await saveFineRuleConfig(config, true);\r
        let updatedCount = 0;\r
        let addedFineTotal = 0;\r
        for (const row of rowsToApply) {\r
          const { fee, amounts, fineMath, alreadyForRule, deltaFine, reason } = row;\r
          if (deltaFine <= 0) continue;\r
          const existingFine = getTotalFineAmount(fee);\r
          const fineDetails = getFineDetails(fee);\r
          const newTotal = amounts.total + deltaFine;\r
          const newRemaining = Math.max(0, newTotal - amounts.applied);\r
          const newStatus = amounts.applied >= newTotal ? "Paid" : amounts.applied > 0 ? "Partial" : (fee.status === "Pending" ? "Pending" : "Imposed");\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", fee.id), {\r
            amount: newTotal,\r
            originalAmount: newTotal,\r
            fineAmount: existingFine + deltaFine,\r
            totalFineAmount: existingFine + deltaFine,\r
            remainingAmount: newRemaining,\r
            status: newStatus,\r
            fineDetails: [...fineDetails, {\r
              amount: deltaFine,\r
              totalRequiredFine: fineMath.totalFine,\r
              alreadyAppliedBefore: alreadyForRule,\r
              ruleKey,\r
              month: config.month,\r
              dueDate: calc.dueDate,\r
              intervalDays: config.intervalDays,\r
              eligibility: config.eligibility,\r
              dueThreshold: config.dueThreshold,\r
              mode: config.mode,\r
              finePerPeriod: fineMath.perPeriodFine,\r
              fineInput: config.fineAmount,\r
              basis: config.basis,\r
              periods: calc.periods,\r
              daysLate: calc.daysLate,\r
              baseAmount: fineMath.baseAmount,\r
              reason,\r
              date: new Date(),\r
              type: "late-fee-fine"\r
            }],\r
            lastFineAmount: deltaFine,\r
            lastFineReason: reason,\r
            ...sessionFeeFields(),\r
            updatedAt: serverTimestamp()\r
          });\r
          updatedCount++;\r
          addedFineTotal += deltaFine;\r
        }\r
        if (!silent) {\r
          closeFinePreviewModal();\r
          pendingFinePreview = null;\r
          await loadAllReports();\r
          const summary = document.getElementById("fineRuleSummary");\r
          if (summary) summary.textContent = \`Applied Rs \${addedFineTotal.toLocaleString()} fine across \${updatedCount} student(s).\`;\r
          showToast(\`Late fine applied: Rs \${addedFineTotal.toLocaleString()} on \${updatedCount} student(s).\`);\r
        }\r
        return { updatedCount, addedFineTotal };\r
      } catch (error) {\r
        if (!silent) showToast("Error applying fine: " + error.message, "error");\r
        throw error;\r
      }\r
    }\r
    window.applyLateFeeFine = async () => {\r
      try {\r
        const config = readFineConfig();\r
        if (!validateFineConfig(config)) return;\r
        const calc = calculateModernFinePeriods(config);\r
        if (!calc.periods) {\r
          const saved = await saveFineRuleConfig(config);\r
          if (saved) {\r
            const summary = document.getElementById("fineRuleSummary");\r
            if (summary) summary.textContent = \`Auto rule saved. Fine will start automatically after \${formatDateTime(calc.dueDate)}.\`;\r
            showToast("Future auto fine rule saved.");\r
          }\r
          return;\r
        }\r
        const preview = await buildLateFinePreview(config);\r
        if (!preview) return;\r
        renderLateFinePreview(preview);\r
      } catch (error) {\r
        showToast("Error applying fine: " + error.message, "error");\r
      }\r
    };\r
\r
    function normalizeSavedFineConfig(month, rule = {}) {\r
      let dueDate = rule.dueDate || "";\r
      if (!dueDate && rule.dueDay) {\r
        const monthIndex = monthOrder.indexOf(month);\r
        if (monthIndex >= 0) {\r
          const date = clampDueDate(new Date().getFullYear(), monthIndex, Number(rule.dueDay));\r
          dueDate = \`\${date.getFullYear()}-\${String(date.getMonth() + 1).padStart(2, "0")}-\${String(date.getDate()).padStart(2, "0")}\`;\r
        }\r
      }\r
      const legacyInterval = rule.frequency === "weekly" ? 7 : rule.frequency === "monthly" ? 30 : 1;\r
      return {\r
        month: rule.month || month,\r
        dueDate,\r
        eligibility: rule.eligibility || "all-due",\r
        dueThreshold: Number(rule.dueThreshold || 0),\r
        mode: rule.mode || "fixed",\r
        fineAmount: Number(rule.fineAmount || 0),\r
        basis: rule.basis || "due",\r
        intervalDays: Math.max(1, Number(rule.intervalDays || legacyInterval)),\r
        active: rule.active !== false,\r
        autoApply: rule.autoApply !== false,\r
        ruleKey: rule.ruleKey || getFineRuleKey({ month: rule.month || month }),\r
        sessionId: rule.sessionId || "",\r
        session: rule.session || ""\r
      };\r
    }\r
\r
    async function autoApplyDueFineRules() {\r
      if (autoFineApplying || activeSessionLocked || !activeSchoolId) return { appliedCount: 0, totalFine: 0 };\r
      autoFineApplying = true;\r
      try {\r
        const snap = await getDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"));\r
        const rules = snap.exists() ? (snap.data()?.rules || {}) : {};\r
        let appliedCount = 0;\r
        let totalFine = 0;\r
        for (const [month, rule] of Object.entries(rules)) {\r
          if (rule.active === false || rule.autoApply === false) continue;\r
          const config = normalizeSavedFineConfig(month, rule);\r
          if (!feeBelongsToActiveSession(config)) continue;\r
          if (!validateFineConfig(config, true)) continue;\r
          const calc = calculateModernFinePeriods(config);\r
          if (!calc.periods) continue;\r
          const preview = await buildLateFinePreview(config, { silent: true });\r
          if (!preview?.rows?.length) continue;\r
          const result = await applyLateFeeFineFromPreview(preview, { silent: true });\r
          appliedCount += result?.updatedCount || preview.rows.length;\r
          totalFine += result?.addedFineTotal || preview.totalFine;\r
          await setDoc(doc(db, "schools", activeSchoolId, "settings", "feeFineRules"), {\r
            rules: {\r
              [month]: {\r
                ...rule,\r
                lastAutoAppliedAt: new Date(),\r
                lastAutoAppliedAmount: result?.addedFineTotal || preview.totalFine,\r
                lastAutoAppliedStudents: result?.updatedCount || preview.rows.length,\r
                updatedAt: new Date()\r
              }\r
            },\r
            updatedAt: serverTimestamp()\r
          }, { merge: true });\r
        }\r
        return { appliedCount, totalFine };\r
      } catch (error) {\r
        console.warn("Auto fine apply failed:", error);\r
        return { appliedCount: 0, totalFine: 0 };\r
      } finally {\r
        autoFineApplying = false;\r
      }\r
    }\r
\r
    window.viewStudentHistory = async (studentId) => {\r
      try {\r
        if (!studentId) return showToast("Student ID missing.", "error");\r
        if (!allFees.length) await loadAllReports();\r
        let history = allFees\r
          .filter((fee) => fee.studentId === studentId)\r
          .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
        const firstFee = history[0] || {};\r
        currentHistoryStudent = {\r
          studentId,\r
          studentName: firstFee.studentName || "Student",\r
          class: firstFee.class || "",\r
          section: firstFee.section || "",\r
          roll: firstFee.roll || "",\r
          studentDocId: firstFee.studentDocId || "",\r
          tcIssued: !!studentTcMap[studentId]\r
        };\r
\r
        displayHistoryModal(studentId, history);\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      }\r
    };\r
\r
    window.fetchStudentFeeManager = async () => {\r
      const studentId = document.getElementById("manageStudentId").value.trim();\r
      if (!studentId) return showToast("Enter student ID.", "error");\r
      try {\r
        const snap = await getDocs(query(\r
          collection(db, "schools", activeSchoolId, "students"),\r
          where("studentId", "==", studentId)\r
        ));\r
        if (snap.empty) return showToast("Student not found.", "error");\r
        const studentDoc = snap.docs[0];\r
        const student = { id: studentDoc.id, ...studentDoc.data() };\r
        currentHistoryStudent = {\r
          studentId: student.studentId || studentId,\r
          studentName: student.studentName || student.name || "Student",\r
          class: student.class || "",\r
          section: student.section || "",\r
          roll: student.roll || student.rollNo || "",\r
          studentDocId: student.id,\r
          tcIssued: !!student.tcIssued\r
        };\r
        document.getElementById("manageStudentSummary").textContent =\r
          \`\${currentHistoryStudent.studentName} - Class \${currentHistoryStudent.class || "-"}\${currentHistoryStudent.section ? "-" + currentHistoryStudent.section : ""} - ID \${currentHistoryStudent.studentId}\`;\r
        if (currentHistoryStudent.tcIssued) {\r
          showToast("TC issued for this student. Fee changes are blocked.", "error");\r
        }\r
        if (!allFees.length) await loadAllReports();\r
        const history = allFees\r
          .filter((fee) => fee.studentId === currentHistoryStudent.studentId)\r
          .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
        displayHistoryModal(currentHistoryStudent.studentId, history);\r
      } catch (error) {\r
        showToast("Error: " + error.message, "error");\r
      }\r
    };\r
\r
    window.viewStudentHistoryByFee = (feeId) => {\r
      const fee = allFees.find((entry) => entry.id === feeId);\r
      if (!fee) return showToast("Fee record not found.", "error");\r
\r
      const studentId = fee.studentId || "";\r
      const studentName = fee.studentName || "Student";\r
      const studentClass = fee.class || "";\r
      const studentSection = fee.section || "";\r
\r
      const history = allFees
        .filter((entry) => {
          // A stable ID must be authoritative. Falling through to the name/class
          // match after an ID mismatch mixed two different students who happened
          // to have the same name in the same class and section.
          if (studentId) return entry.studentId === studentId;
          if (fee.studentDocId) return entry.studentDocId === fee.studentDocId;
          return entry.studentName === studentName && entry.class === studentClass && entry.section === studentSection;
        })
        .sort((a, b) => feeDateValue(b) - feeDateValue(a));\r
\r
      currentHistoryStudent = {\r
        studentId: studentId || fee.studentId || "",\r
        studentName,\r
        class: studentClass,\r
        section: studentSection,\r
        roll: fee.roll || "",\r
        studentDocId: fee.studentDocId || "",\r
        tcIssued: !!studentTcMap[studentId]\r
      };\r
\r
      displayHistoryModal(studentId || "N/A", history);\r
    };\r
\r
    function buildHistoryTimeline(fee) {\r
      const rows = [];\r
      const assignedTotal = Number(fee.originalAmount || fee.amount || 0);\r
      const fineTotal = getTotalFineAmount(fee);\r
      const fallbackAssigned = Math.max(0, assignedTotal - fineTotal);\r
      const impositions = getImpositionEntries(fee);\r
\r
      if (impositions.length) {\r
        impositions.forEach((imposition, index) => {\r
          const amount = Number(imposition.amount || 0);\r
          if (amount <= 0) return;\r
          rows.push({\r
            type: index === 0 ? "Fee imposed" : "Additional fee imposed",\r
            date: imposition.date || fee.imposedDate || fee.date,\r
            amount,\r
            detail: imposition.remarks || fee.impositionRemark || fee.remarks || "Fee added to this month",\r
            tone: "#1e40af"\r
          });\r
        });\r
      } else if (fallbackAssigned > 0) {\r
        rows.push({\r
          type: fee.autoImposed ? "Auto fee imposed" : fee.manualEntry ? "Manual fee entry" : "Fee imposed",\r
          date: fee.imposedDate || fee.date,\r
          amount: fallbackAssigned,\r
          detail: fee.impositionRemark || fee.remarks || "Fee added to this month",\r
          tone: "#1e40af"\r
        });\r
      }\r
\r
      getFineDetails(fee).forEach((fine) => {\r
        const amount = Number(fine.amount || 0);\r
        if (amount <= 0) return;\r
        rows.push({\r
          type: "Fine added",\r
          date: fine.date || fee.updatedAt || fee.date,\r
          amount,\r
          detail: fine.reason || fee.lastFineReason || "Late fee fine added to month total",\r
          tone: "#b45309"\r
        });\r
      });\r
\r
      (Array.isArray(fee.payments) ? fee.payments : []).forEach((payment, index) => {\r
        const received = getPaymentReceivedAmount(payment);\r
        const applied = Number(payment.appliedAmount ?? payment.amount ?? 0);\r
        const extra = Number(payment.extraAmount || 0);\r
        if (received <= 0 && applied <= 0) return;\r
        const paymentId = payment.transactionId || payment.txnId || payment.paymentId || payment.razorpayPaymentId || payment.razorpay_payment_id || payment.razorpay_order_id || generatedFeeTxnId(fee, index);\r
        rows.push({\r
          type: "Payment received",\r
          date: payment.date || payment.paidAt || payment.createdAt || fee.lastPaymentDate,\r
          amount: received || applied,\r
          detail: \`Applied Rs \${applied.toLocaleString()} to \${fee.month || "month"} total\${extra > 0 ? \`, extra Rs \${extra.toLocaleString()} stored\` : ""}\${paymentId ? \` | ID: \${paymentId}\` : ""}\`,\r
          tone: "#047857"\r
        });\r
      });\r
\r
      return rows.sort((a, b) => {\r
        const da = a.date?.toDate?.() || a.date || 0;\r
        const db = b.date?.toDate?.() || b.date || 0;\r
        return (new Date(db).getTime() || 0) - (new Date(da).getTime() || 0);\r
      });\r
    }\r
\r
    function feePaymentRowsForReceipt(fee) {\r
      const payments = Array.isArray(fee.payments) ? fee.payments : [];\r
      return payments.map((payment, index) => {\r
        const received = getPaymentReceivedAmount(payment);\r
        const applied = Number(payment.appliedAmount ?? payment.amount ?? 0);\r
        const extra = Number(payment.extraAmount || 0);\r
        const txn = payment.transactionId || payment.txnId || payment.paymentId || payment.razorpayPaymentId || payment.razorpay_payment_id || payment.razorpay_order_id || generatedFeeTxnId(fee, index);\r
        return { received, applied, extra, txn, mode: payment.paymentMode || payment.mode || payment.method || "-", date: payment.date || payment.paymentDate || payment.paidAt || payment.createdAt || fee.lastPaymentDate, note: payment.note || payment.remarks || "" };\r
      }).filter((payment) => payment.received > 0 || payment.applied > 0);\r
    }\r
\r
    function transactionDateValue(value) {\r
      const raw = value?.toDate?.() || value;\r
      const date = raw instanceof Date ? raw : new Date(raw || 0);\r
      return Number.isNaN(date.getTime()) ? null : date;\r
    }\r
\r
    function localTransactionDateKey(value) {\r
      const date = transactionDateValue(value);\r
      if (!date) return "";\r
      return [\r
        date.getFullYear(),\r
        String(date.getMonth() + 1).padStart(2, "0"),\r
        String(date.getDate()).padStart(2, "0")\r
      ].join("-");\r
    }\r
\r
    function buildDailyPaymentTransactions(fees = allFees) {\r
      const rows = [];\r
      fees.forEach((fee) => {\r
        feePaymentRowsForReceipt(fee).forEach((payment, index) => {\r
          const date = transactionDateValue(payment.date);\r
          if (!date) return;\r
          rows.push({\r
            ...payment,\r
            date,\r
            dateKey: localTransactionDateKey(date),\r
            feeId: fee.id,\r
            studentId: fee.studentId || "-",\r
            studentName: fee.studentName || "-",\r
            className: [fee.class, fee.section].filter(Boolean).join("-") || "-",\r
            month: fee.month || "-",\r
            index\r
          });\r
        });\r
      });\r
      return rows.sort((a, b) => b.date.getTime() - a.date.getTime());\r
    }\r
\r
    window.renderDailyTransactions = () => {\r
      const input = document.getElementById("dailyTransactionDate");\r
      const transactions = buildDailyPaymentTransactions(allFees);\r
      if (input && !input.value && transactions.length) input.value = transactions[0].dateKey;\r
      const selectedDate = input?.value || "";\r
      const rows = selectedDate ? transactions.filter((transaction) => transaction.dateKey === selectedDate) : [];\r
      const totalReceived = rows.reduce((sum, transaction) => sum + Number(transaction.received || transaction.applied || 0), 0);\r
      const selectedDateObject = selectedDate ? new Date(\`\${selectedDate}T00:00:00\`) : null;\r
      const dateLabel = selectedDateObject && !Number.isNaN(selectedDateObject.getTime())\r
        ? selectedDateObject.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })\r
        : "-";\r
\r
      document.getElementById("dailyTransactionCount").textContent = \`(\${rows.length})\`;\r
      document.getElementById("dailyTransactionDateLabel").textContent = dateLabel;\r
      document.getElementById("dailyTransactionTotalCount").textContent = rows.length.toLocaleString("en-IN");\r
      document.getElementById("dailyTransactionAmount").textContent = \`₹\${totalReceived.toLocaleString("en-IN")}\`;\r
\r
      const target = document.getElementById("dailyTransactionsTable");\r
      if (!rows.length) {\r
        target.innerHTML = \`<div class="no-data">\${selectedDate ? \`No fee payment was received on \${esc(dateLabel)}.\` : "No payment transactions are available."}</div>\`;\r
        return;\r
      }\r
\r
      target.innerHTML = \`<table>\r
        <thead><tr><th>Time</th><th>Student</th><th>Student ID</th><th>Class</th><th>Month</th><th>Transaction ID</th><th>Mode</th><th>Received</th><th>Applied</th><th>Extra</th><th>Note</th></tr></thead>\r
        <tbody>\${rows.map((transaction) => \`<tr ondblclick="viewStudentHistoryByFee('\${transaction.feeId || ""}')">\r
          <td>\${transaction.date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</td>\r
          <td><strong>\${esc(transaction.studentName)}</strong></td>\r
          <td>\${esc(transaction.studentId)}</td>\r
          <td>\${esc(transaction.className)}</td>\r
          <td>\${esc(transaction.month)}</td>\r
          <td style="font-size:12px;word-break:break-all;">\${esc(transaction.txn || "-")}</td>\r
          <td>\${esc(transaction.mode || "-")}</td>\r
          <td><strong>₹\${Number(transaction.received || transaction.applied || 0).toLocaleString("en-IN")}</strong></td>\r
          <td>₹\${Number(transaction.applied || 0).toLocaleString("en-IN")}</td>\r
          <td>₹\${Number(transaction.extra || 0).toLocaleString("en-IN")}</td>\r
          <td style="white-space:normal;min-width:180px;">\${esc(transaction.note || "-")}</td>\r
        </tr>\`).join("")}</tbody>\r
      </table>\`;\r
    };\r
\r
    window.showLatestTransactionDay = () => {\r
      const latest = buildDailyPaymentTransactions(allFees)[0];\r
      if (!latest) return showToast("No fee payment transactions are available.", "error");\r
      document.getElementById("dailyTransactionDate").value = latest.dateKey;\r
      renderDailyTransactions();\r
    };\r
\r
    window.showTodayTransactions = () => {\r
      document.getElementById("dailyTransactionDate").value = localTransactionDateKey(new Date());\r
      renderDailyTransactions();\r
    };\r
\r
    function buildHistoryReceiptHtml(feesToPrint, title = "Fee Receipt") {\r
      const fees = Array.isArray(feesToPrint) ? feesToPrint : [];\r
      const student = currentHistoryStudent || {};\r
      const schoolName = window.SchoolBranding?.getSchoolName?.() || "Schoolix";\r
      const receiptNo = \`RCP-\${student.studentId || "STUDENT"}-\${Date.now().toString().slice(-6)}\`;\r
      const summary = calculateHistoryFeeSummary(fees);\r
      const feeRows = fees.map((fee) => {\r
        const amounts = getFeeAmounts(fee);\r
        const status = getCorrectStatus(fee);\r
        const payments = feePaymentRowsForReceipt(fee);\r
        const txnList = payments.length ? payments.map((payment) => esc(payment.txn)).join("<br>") : getFeeTransactionIds(fee).map((id) => esc(id)).join("<br>") || "-";\r
        const paymentRows = payments.length ? payments.map((payment) => \`\r
          <tr>\r
            <td>\${formatDateTime(payment.date)}</td>\r
            <td>\${esc(payment.txn)}</td>\r
            <td>\${esc(payment.mode)}</td>\r
            <td>Rs \${payment.received.toLocaleString()}</td>\r
            <td>Rs \${payment.applied.toLocaleString()}</td>\r
            <td>Rs \${payment.extra.toLocaleString()}</td>\r
            <td>\${esc(payment.note || "-")}</td>\r
          </tr>\r
        \`).join("") : \`<tr><td colspan="7">No payment transactions recorded.</td></tr>\`;\r
        return \`\r
          <section class="receipt-fee">\r
            <h3>\${esc(fee.month || "Fee Entry")} <span>\${esc(status)}</span></h3>\r
            <table class="receipt-summary-table">\r
              <tr><th>Assigned</th><th>Applied</th><th>Collected</th><th>Extra</th><th>Due</th><th>Transaction No.</th></tr>\r
              <tr>\r
                <td>Rs \${amounts.total.toLocaleString()}</td>\r
                <td>Rs \${amounts.applied.toLocaleString()}</td>\r
                <td>Rs \${amounts.collected.toLocaleString()}</td>\r
                <td>Rs \${amounts.extra.toLocaleString()}</td>\r
                <td>Rs \${amounts.due.toLocaleString()}</td>\r
                <td>\${txnList}</td>\r
              </tr>\r
            </table>\r
            <table>\r
              <thead><tr><th>Date</th><th>Transaction No.</th><th>Mode</th><th>Received</th><th>Applied</th><th>Extra</th><th>Note</th></tr></thead>\r
              <tbody>\${paymentRows}</tbody>\r
            </table>\r
            \${fee.remarks || fee.impositionRemark ? \`<p class="receipt-note"><strong>Remarks:</strong> \${esc(fee.remarks || fee.impositionRemark)}</p>\` : ""}\r
          </section>\r
        \`;\r
      }).join("");\r
\r
      return \`<!DOCTYPE html>\r
      <html><head>\r
<title>\${esc(title)}</title>\r
      <style>\r
        @page{size:A4;margin:12mm}\r
        *{box-sizing:border-box}\r
        body{margin:0;color:#111827;font-family:Arial,sans-serif;font-size:12px;line-height:1.45}\r
        .receipt{max-width:186mm;margin:0 auto}\r
        .receipt-head{display:flex;justify-content:space-between;gap:16px;border-bottom:2px solid #1d4ed8;padding-bottom:12px;margin-bottom:14px}\r
        h1{margin:0;color:#123a8c;font-size:24px}\r
        h2{margin:4px 0 0;font-size:16px}\r
        .meta{text-align:right;color:#475569}\r
        .student-grid,.totals{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}\r
        .box{border:1px solid #cbd5e1;border-radius:8px;padding:8px;background:#f8fafc}\r
        .box small{display:block;color:#64748b;font-weight:700;text-transform:uppercase;font-size:9px}\r
        .box strong{display:block;margin-top:3px;font-size:13px}\r
        .receipt-fee{break-inside:avoid;page-break-inside:avoid;margin-top:14px;border:1px solid #cbd5e1;border-radius:8px;padding:10px}\r
        .receipt-fee h3{display:flex;justify-content:space-between;margin:0 0 8px;color:#172033}\r
        .receipt-fee h3 span{font-size:11px;color:#047857}\r
        table{width:100%;border-collapse:collapse;margin-top:8px;table-layout:fixed}\r
        th{background:#eaf1ff;color:#123a8c;text-align:left;font-size:10px}\r
        th,td{border:1px solid #d8e1ef;padding:6px;vertical-align:top;word-break:break-word}\r
        .receipt-summary-table td{font-weight:700}\r
        .receipt-note{margin:8px 0 0;color:#475569}\r
        .footer{margin-top:18px;border-top:1px solid #cbd5e1;padding-top:8px;color:#64748b;text-align:center;font-size:10px}\r
        @media print{button{display:none}}\r
      </style></head>\r
      <body><div class="receipt">\r
        <div class="receipt-head">\r
          <div><h1>\${esc(schoolName)}</h1><h2>\${esc(title)}</h2></div>\r
          <div class="meta"><strong>Receipt No:</strong> \${esc(receiptNo)}<br><strong>Generated:</strong> \${new Date().toLocaleString("en-IN")}</div>\r
        </div>\r
        <div class="student-grid">\r
          <div class="box"><small>Student</small><strong>\${esc(student.studentName || "-")}</strong></div>\r
          <div class="box"><small>Student ID</small><strong>\${esc(student.studentId || "-")}</strong></div>\r
          <div class="box"><small>Class</small><strong>\${esc([student.class, student.section].filter(Boolean).join("-") || "-")}</strong></div>\r
          <div class="box"><small>Roll</small><strong>\${esc(student.roll || "-")}</strong></div>\r
        </div>\r
        <div class="totals">\r
          <div class="box"><small>Assigned</small><strong>Rs \${summary.total.toLocaleString()}</strong></div>\r
          <div class="box"><small>Applied</small><strong>Rs \${summary.applied.toLocaleString()}</strong></div>\r
          <div class="box"><small>Collected</small><strong>Rs \${summary.collected.toLocaleString()}</strong></div>\r
          <div class="box"><small>Due</small><strong>Rs \${summary.due.toLocaleString()}</strong></div>\r
        </div>\r
        \${feeRows || "<p>No fee records selected.</p>"}\r
        <div class="footer">System generated Schoolix fee receipt. Please verify transaction numbers before handing over.</div>\r
      </div>\r
      <script>window.onload=()=>setTimeout(()=>window.print(),150);<\\/script>\r
      </body></html>\`;\r
    }\r
\r
    window.printHistoryReceipt = (scope, feeId = "") => {\r
      if (!currentHistoryStudent) return showToast("Open a student fee history first.", "error");\r
      const fees = scope === "single"\r
        ? currentHistoryFees.filter((fee) => fee.id === feeId)\r
        : currentHistoryFees;\r
      if (!fees.length) return showToast("No fee records available for receipt.", "error");\r
      const title = scope === "single" ? \`\${fees[0].month || "Monthly"} Fee Receipt\` : "Full Fee Receipt";\r
      const receiptWindow = window.open("", "_blank", "width=900,height=700");\r
      if (!receiptWindow) return showToast("Allow popups to generate receipt.", "error");\r
      receiptWindow.document.open();\r
      receiptWindow.document.write(buildHistoryReceiptHtml(fees, title));\r
      receiptWindow.document.close();\r
    };\r
\r
    function calculateHistoryFeeSummary(fees = []) {\r
      return fees.reduce((summary, fee) => {\r
        const amounts = getFeeAmounts(fee);\r
        summary.total += amounts.total;\r
        summary.applied += amounts.applied;\r
        summary.extra += amounts.extra;\r
        summary.collected += amounts.collected;\r
        summary.due += amounts.due;\r
        return summary;\r
      }, { total: 0, applied: 0, collected: 0, extra: 0, due: 0 });\r
    }\r
\r
    function renderHistorySummaryBanner(fees = []) {\r
      const box = document.getElementById("historyFeeSummary");\r
      if (!box) return;\r
      const s = calculateHistoryFeeSummary(fees);\r
      box.innerHTML = \`\r
        <strong style="display:block;font-size:16px;margin-bottom:6px;color:#172033;">Fee snapshot</strong>\r
        <div style="color:#64748b;font-size:14px;line-height:1.6">Assigned, applied, collected and extra amounts are shown separately so balances stay accurate.</div>\r
        <div class="history-summary-grid">\r
          <div class="history-summary-tile total"><small>Assigned</small><span>Rs \${s.total.toLocaleString()}</span><strong>Total fee raised</strong></div>\r
          <div class="history-summary-tile paid"><small>Applied</small><span>Rs \${s.applied.toLocaleString()}</span><strong>Applied against dues</strong></div>\r
          <div class="history-summary-tile collected"><small>Collected</small><span>Rs \${s.collected.toLocaleString()}</span><strong>Applied + extra</strong></div>\r
          <div class="history-summary-tile extra"><small>Extra</small><span>Rs \${s.extra.toLocaleString()}</span><strong>Collected above due</strong></div>\r
          <div class="history-summary-tile due"><small>Due</small><span>Rs \${s.due.toLocaleString()}</span><strong>Remaining balance</strong></div>\r
        </div>\`;\r
      box.style.display = "block";\r
    }\r
\r
    function displayHistoryModal(studentId, history) {
      const historyForStudent = (history || []).map((fee) => ({
        ...fee,
        studentId: fee.studentId || currentHistoryStudent?.studentId || studentId || "",
        studentName: fee.studentName || currentHistoryStudent?.studentName || "",
        class: fee.class || currentHistoryStudent?.class || "",
        section: fee.section || currentHistoryStudent?.section || "",
        roll: fee.roll || currentHistoryStudent?.roll || ""
      }));
      currentHistoryFees = mergeDuplicateFeeRecords(historyForStudent);
      history = currentHistoryFees;
      const titleName = currentHistoryStudent?.studentName ? \`\${currentHistoryStudent.studentName} (\${studentId})\` : studentId;
      document.getElementById("modalStudentName").textContent = titleName;\r
      resetHistoryFeeForm();\r
      const extraBalance = getTotalExtraBalance(currentHistoryFees);\r
      document.getElementById("historyExtraBox").style.display = extraBalance > 0 ? "block" : "none";\r
      document.getElementById("historyExtraText").textContent = extraBalance > 0\r
        ? \`Extra balance available: Rs \${extraBalance.toLocaleString()}. You can adjust it to any month.\`\r
        : "";\r
      renderHistorySummaryBanner(currentHistoryFees);\r
\r
      if (!history.length) {\r
        document.getElementById("historyTable").innerHTML =\r
          '<div style="text-align:center;padding:40px;color:#666;">No fee history found</div>';\r
      } else {\r
        let html = \`<div style="max-height: 460px; overflow-y: auto;">\`;\r
        history.forEach((fee) => {\r
          const amounts = getFeeAmounts(fee);\r
          const status = getCorrectStatus(fee);\r
          const mainDate = formatDateTime(fee.updatedAt || fee.date);\r
          const timeline = buildHistoryTimeline(fee);\r
          const fineAmount = getTotalFineAmount(fee);\r
          const progress = amounts.total > 0 ? Math.min(100, Math.round((amounts.applied / amounts.total) * 100)) : 0;\r
          html += \`\r
        <div class="history-fee-card">\r
          <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">\r
            <div>\r
              <strong>\${fee.month || "Fee Entry"}</strong>\r
              <div class="history-fee-meta">\${mainDate}</div>\r
            </div>\r
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">\r
              <button class="btn btn-sm btn-success" onclick="printHistoryReceipt('single','\${fee.id}')">Receipt</button>\r
              <span class="status-\${status.toLowerCase()}">\${status}</span>\r
            </div>\r
          </div>\r
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:12px;">\r
            <div><small>Total Assigned</small><div><strong>Rs \${amounts.total.toLocaleString()}</strong>\${fineAmount > 0 ? \`<div style="font-size:11px;color:#b45309;">includes fine Rs \${fineAmount.toLocaleString()}</div>\` : ""}</div></div>\r
            <div><small>Applied</small><div><strong>Rs \${amounts.applied.toLocaleString()}</strong></div></div>\r
            <div><small>Collected</small><div><strong>Rs \${amounts.collected.toLocaleString()}</strong></div></div>\r
            <div><small>Extra</small><div><strong>Rs \${amounts.extra.toLocaleString()}</strong></div></div>\r
            <div><small>\${amounts.due <= 0 ? "Cleared" : "Outstanding"}</small><div><strong style="color:\${amounts.due <= 0 ? "#047857" : "#b91c1c"}">Rs \${amounts.due.toLocaleString()}</strong></div></div>\r
          </div>\r
          <div style="margin-top:10px;">\r
            <div style="width:100%;height:10px;background:#e2e8f0;border-radius:999px;overflow:hidden;">\r
              <div style="height:100%;width:\${progress}%;background:linear-gradient(90deg,#16a34a,#2563eb);border-radius:999px;"></div>\r
            </div>\r
            <div style="margin-top:6px;color:#64748b;font-size:12px;">\${progress}% of this month's total has been cleared.</div>\r
          </div>\r
          \${fee.remarks || fee.impositionRemark ? \`<div style="margin-top:10px;color:#475569;font-size:13px;"><strong>Remark:</strong> \${esc(fee.remarks || fee.impositionRemark)}</div>\` : ""}\r
          <div style="margin-top:10px;background:#f8fbff;border:1px solid #e2e8f0;border-radius:10px;padding:10px;">\r
            <strong style="font-size:13px;">Transaction Timeline (\${timeline.length})</strong>\r
            \${timeline.length ? timeline.map((item) => \`\r
              <div class="history-payment-item">\r
                <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;">\r
                  <span><strong style="color:\${item.tone};">\${esc(item.type)}</strong> - Rs \${Number(item.amount || 0).toLocaleString()}</span>\r
                  <span style="color:#64748b;">\${formatDateTime(item.date)}</span>\r
                </div>\r
                <div style="color:#64748b;font-size:12px;">\${esc(item.detail || "")}</div>\r
              </div>\r
            \`).join("") : '<div class="history-payment-item">No transactions yet.</div>'}\r
          </div>\r
        </div>\r
      \`;\r
        });\r
        html += \`</div>\`;\r
        document.getElementById("historyTable").innerHTML = html;\r
      }\r
\r
      const modal = document.getElementById("historyModal");
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      modal.style.display = "flex";
      requestAnimationFrame(() => document.getElementById("historyModalCloseBtn")?.focus());
    }\r
    window.resetHistoryFeeForm = () => {\r
      document.getElementById("historyFeeAmount").value = "";\r
      document.getElementById("historyFeeMonth").value = "";\r
      document.getElementById("historyFeeStatus").value = "";\r
      document.getElementById("historyPaymentMode").value = "";\r
      document.getElementById("historyPaymentModeOther").value = "";\r
      document.getElementById("historyPaymentModeOther").style.display = "none";\r
      updateHistoryPaymentModeVisibility();\r
      document.getElementById("historyFeeRemarks").value = "";\r
      document.getElementById("adjustTargetMonth").value = "";\r
      document.getElementById("adjustExtraAmount").value = "";\r
    };\r
    window.saveHistoryFeeEntry = async () => {\r
      if (!ensureSessionEditable("Fee entries")) return;\r
      if (!currentHistoryStudent) {\r
        showToast("Fetch/select a student first.", "error");\r
        return;\r
      }\r
      if (currentHistoryStudent.tcIssued || studentTcMap[currentHistoryStudent.studentId]) {\r
        showToast("TC issued for this student. Fee changes are blocked.", "error");\r
        return;\r
      }\r
\r
      const amount = Number(document.getElementById("historyFeeAmount").value || 0);\r
      const month = document.getElementById("historyFeeMonth").value;\r
      const status = document.getElementById("historyFeeStatus").value;\r
      const remarks = document.getElementById("historyFeeRemarks").value.trim();\r
      const paymentMode = status === "Paid" ? paymentModeFromFields("historyPaymentMode", "historyPaymentModeOther") : null;\r
      if (!month || !status || amount <= 0) {\r
        showToast("Enter amount, month and status.", "error");\r
        return;\r
      }\r
      if (paymentMode?.error) return showToast(paymentMode.error, "error");\r
\r
      try {\r
        const existing = findCurrentHistoryFee(month);\r
        if (existing) {\r
          const paymentUpdate = buildHistoryPaymentUpdate(amount, existing, status, remarks);\r
          if (paymentUpdate.payment) Object.assign(paymentUpdate.payment, paymentMode);\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", existing.id), paymentUpdate.updateData);\r
          if (paymentUpdate.payment) await syncReceivedFee(existing.id, existing, paymentUpdate.payment, paymentUpdate.paymentIndex);\r
          showToast(paymentUpdate.message);\r
        } else {\r
          const isPaid = status === "Paid";\r
          const assignedAmount = isPaid ? 0 : amount;\r
          const newPayment = isPaid ? {\r
            receivedAmount: amount,\r
            appliedAmount: amount,\r
            extraAmount: 0,\r
            amount,\r
            date: new Date(),\r
            status: "Paid",\r
            note: remarks || "Paid entry from fees report",\r
            ...paymentMode,\r
            ledgerTransactionId: newLedgerTransactionId("FEE")\r
          } : null;\r
          const newFee = {\r
            studentId: currentHistoryStudent.studentId,\r
            studentName: currentHistoryStudent.studentName,\r
            class: currentHistoryStudent.class,\r
            section: currentHistoryStudent.section,\r
            roll: currentHistoryStudent.roll,\r
            studentDocId: currentHistoryStudent.studentDocId || "",\r
            month,\r
            amount: assignedAmount,\r
            originalAmount: assignedAmount,\r
            paidAmount: isPaid ? amount : 0,\r
            totalPaidAmount: isPaid ? amount : 0,\r
            totalExtraPaidAmount: 0,\r
            totalCollectedAmount: isPaid ? amount : 0,\r
            remainingAmount: isPaid ? 0 : assignedAmount,\r
            status: isPaid ? "Paid" : status,\r
            date: new Date(),\r
            updatedAt: serverTimestamp(),\r
            manualEntry: true,\r
            remarks,\r
            ...sessionFeeFields(),\r
            payments: newPayment ? [newPayment] : []\r
          };\r
          const saveResult = await createMonthlyFeeIfMissing(currentHistoryStudent, month, newFee);
          if (!saveResult.created) {
            const paymentUpdate = buildHistoryPaymentUpdate(amount, saveResult.fee, status, remarks);
            if (paymentUpdate.payment) Object.assign(paymentUpdate.payment, paymentMode || {});
            await updateDoc(doc(db, "schools", activeSchoolId, "fees", saveResult.fee.id), paymentUpdate.updateData);
            if (paymentUpdate.payment) await syncReceivedFee(saveResult.fee.id, saveResult.fee, paymentUpdate.payment, paymentUpdate.paymentIndex);
            showToast(paymentUpdate.message);
          } else {
            if (newPayment) await syncReceivedFee(saveResult.id, newFee, newPayment, 0);
            showToast(isPaid ? \`New paid fee saved for \${month}.\` : \`New \${status.toLowerCase()} fee saved for \${month}.\`);
          }
        }\r
\r
        await refreshCurrentHistory();\r
      } catch (error) {\r
        showToast("Error: " + error.message, "error");\r
      }\r
    };\r
\r
    window.applyHistoryExtraAdjustment = async () => {\r
      if (!ensureSessionEditable("Fee adjustments")) return;\r
      if (!currentHistoryStudent) return showToast("Fetch/select a student first.", "error");\r
      if (currentHistoryStudent.tcIssued || studentTcMap[currentHistoryStudent.studentId]) {\r
        showToast("TC issued for this student. Fee changes are blocked.", "error");\r
        return;\r
      }\r
      const targetMonth = document.getElementById("adjustTargetMonth").value;\r
      const adjustAmount = Number(document.getElementById("adjustExtraAmount").value || 0);\r
      if (!targetMonth) return showToast("Select target month.", "error");\r
      if (adjustAmount <= 0) return showToast("Enter valid adjustment amount.", "error");\r
      const totalExtra = getTotalExtraBalance(currentHistoryFees);\r
      if (adjustAmount > totalExtra) return showToast(\`Amount exceeds extra balance ₹\${totalExtra.toLocaleString()}.\`, "error");\r
\r
      try {\r
        const feesWithExtra = [...currentHistoryFees]\r
          .filter((fee) => getFeeAmounts(fee).extra > 0)\r
          .sort((a, b) => feeDateValue(a) - feeDateValue(b));\r
        let remaining = adjustAmount;\r
        for (const fee of feesWithExtra) {\r
          if (remaining <= 0) break;\r
          const amounts = getFeeAmounts(fee);\r
          const deduct = Math.min(remaining, amounts.extra);\r
          remaining -= deduct;\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", fee.id), {\r
            totalExtraPaidAmount: amounts.extra - deduct,\r
            totalCollectedAmount: amounts.applied + (amounts.extra - deduct),\r
            ...sessionFeeFields(),\r
            updatedAt: serverTimestamp()\r
          });\r
        }\r
\r
        const existing = findCurrentHistoryFee(targetMonth);\r
        if (existing) {\r
          const freshSnap = await getDoc(doc(db, "schools", activeSchoolId, "fees", existing.id));\r
          const freshExisting = freshSnap.exists() ? { id: existing.id, ...freshSnap.data() } : existing;\r
          const amounts = getFeeAmounts(freshExisting);\r
          const appliedNow = amounts.total <= 0 && amounts.due <= 0 ? adjustAmount : Math.min(adjustAmount, amounts.due);\r
          const newApplied = amounts.applied + appliedNow;\r
          const newDue = Math.max(0, amounts.total - newApplied);\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", existing.id), {\r
            paidAmount: newApplied,\r
            totalPaidAmount: newApplied,\r
            totalCollectedAmount: newApplied + amounts.extra,\r
            remainingAmount: newDue,\r
            status: newDue === 0 ? "Paid" : "Partial",\r
            ...sessionFeeFields(),\r
            payments: [...(freshExisting.payments || []), {\r
              receivedAmount: adjustAmount,\r
              appliedAmount: appliedNow,\r
              extraAmount: 0,\r
              amount: appliedNow,\r
              date: new Date(),\r
              status: "Adjusted from extra",\r
              note: "Extra balance adjustment"\r
            }],\r
            updatedAt: serverTimestamp()\r
          });\r
        } else {\r
          const newAdjustmentFee = {
            studentId: currentHistoryStudent.studentId,
            studentName: currentHistoryStudent.studentName,
            class: currentHistoryStudent.class,
            section: currentHistoryStudent.section,
            roll: currentHistoryStudent.roll,\r
            studentDocId: currentHistoryStudent.studentDocId || "",\r
            month: targetMonth,\r
            amount: 0,\r
            originalAmount: 0,\r
            paidAmount: adjustAmount,\r
            totalPaidAmount: adjustAmount,\r
            totalExtraPaidAmount: 0,\r
            totalCollectedAmount: adjustAmount,\r
            remainingAmount: 0,\r
            status: "Paid",\r
            date: new Date(),\r
            updatedAt: serverTimestamp(),\r
            adjustmentEntry: true,\r
            remarks: "Extra balance adjustment",
            ...sessionFeeFields(),
            payments: [{ receivedAmount: adjustAmount, appliedAmount: adjustAmount, extraAmount: 0, amount: adjustAmount, date: new Date(), status: "Adjusted from extra", note: "Extra balance adjustment" }]
          };
          const saveResult = await createMonthlyFeeIfMissing(currentHistoryStudent, targetMonth, newAdjustmentFee);
          if (!saveResult.created) {
            const amounts = getFeeAmounts(saveResult.fee);
            const appliedNow = amounts.total <= 0 && amounts.due <= 0 ? adjustAmount : Math.min(adjustAmount, amounts.due);
            const newApplied = amounts.applied + appliedNow;
            const newDue = Math.max(0, amounts.total - newApplied);
            await updateDoc(doc(db, "schools", activeSchoolId, "fees", saveResult.fee.id), {
              paidAmount: newApplied,
              totalPaidAmount: newApplied,
              totalCollectedAmount: newApplied + amounts.extra,
              remainingAmount: newDue,
              status: newDue === 0 ? "Paid" : "Partial",
              ...sessionFeeFields(),
              payments: [...(saveResult.fee.payments || []), {
                receivedAmount: adjustAmount,
                appliedAmount: appliedNow,
                extraAmount: 0,
                amount: appliedNow,
                date: new Date(),
                status: "Adjusted from extra",
                note: "Extra balance adjustment"
              }],
              updatedAt: serverTimestamp()
            });
          }
        }
        showToast(\`₹\${adjustAmount.toLocaleString()} extra adjusted to \${targetMonth}.\`);\r
        await refreshCurrentHistory();\r
      } catch (error) {\r
        showToast("Error: " + error.message, "error");\r
      }\r
    };\r
    window.closeHistoryModal = (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      const modal = document.getElementById("historyModal");
      if (modal) {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        modal.style.display = "none";
        modal.querySelector(".history-modal-content")?.scrollTo?.({ top: 0, behavior: "auto" });
      }
      currentHistoryStudent = null;
      currentHistoryFees = [];
      return false;
    };
\r
    window.markFeeAsPaid = async (feeId) => {\r
      if (!ensureSessionEditable("Fee payments")) return;\r
      const paymentMode = askPaymentMode();\r
      if (!paymentMode) return;\r
      if (!confirm("Mark as fully paid?")) return;\r
\r
      try {\r
        const fee = allFees.find(f => f.id === feeId);\r
        const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
        const amountReceived = Math.max(0, originalAmount - getTotalPaidAmount(fee));\r
        if (amountReceived <= 0) return showToast("This fee is already fully paid.", "success");\r
        const currentPayments = fee.payments || [];\r
        const newPayment = {\r
          amount: amountReceived,\r
          receivedAmount: amountReceived,\r
          appliedAmount: amountReceived,\r
          extraAmount: 0,\r
          date: new Date(),\r
          note: "Marked fully paid",\r
          ...paymentMode,\r
          ledgerTransactionId: newLedgerTransactionId("FEE")\r
        };\r
        await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
          status: "Paid",\r
          totalPaidAmount: originalAmount,\r
          paidAmount: originalAmount,\r
          remainingAmount: 0,\r
          ...sessionFeeFields(),\r
          payments: [...currentPayments, newPayment],\r
          datePaid: serverTimestamp()\r
        });\r
        await syncReceivedFee(feeId, fee, newPayment, currentPayments.length);\r
        showToast("Marked as fully paid.", 'success');\r
        loadAllReports();\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      }\r
    };\r
\r
    window.markFeeAsPending = async (feeId) => {\r
      if (!ensureSessionEditable("Fee updates")) return;\r
      if (!confirm("Mark as pending?")) return;\r
\r
      try {\r
        const fee = allFees.find(f => f.id === feeId);\r
        const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
        await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
          status: "Pending",\r
          totalPaidAmount: 0,\r
          paidAmount: 0,\r
          remainingAmount: originalAmount,\r
          ...sessionFeeFields(),\r
          payments: []\r
        });\r
        showToast("Marked as pending.", 'success');\r
        loadAllReports();\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      }\r
    };\r
\r
    window.filterByStatus = (status) => {\r
      document.getElementById("filterStatus").value = status;\r
      loadReports();\r
    };\r
\r
    window.loadStudentsForClass = async () => {\r
      const selectedClass = document.getElementById("imposeClass").value;\r
      const selectedSection = document.getElementById("imposeSection").value.trim();\r
      if (!selectedClass) {\r
        showToast("Please select a class first.", 'error');\r
        return;\r
      }\r
      if (!activeSchoolId) {\r
        showToast("School data is still loading. Please try again in a moment.", "error");\r
        return;\r
      }\r
\r
      try {
        const classStudents = await getStudentsForImposition(selectedClass);
        // Refresh fees immediately before previewing so a month record created
        // in another tab or moments earlier is shown and merged accurately.
        const latestFeeSnapshot = await fetchFeeReportDocs();
        hydrateAllFeesFromSnapshot(latestFeeSnapshot);
        studentsToImpose = classStudents.filter((student) => {
          const normalizedSection = String(student.section || "").trim();\r
          if (selectedSection && normalizedSection.toLowerCase() !== selectedSection.toLowerCase()) return;\r
          return true;\r
        });\r
\r
        if (!studentsToImpose.length) {\r
          showToast(\`No students found for class \${selectedClass}\${selectedSection ? \` section \${selectedSection}\` : ""}.\`, "error");\r
          return;\r
        }\r
\r
        imposeConfig = {
          class: selectedClass,
          month: normalizeFeeMonth(document.getElementById("imposeMonth").value || new Date().toLocaleString('default', { month: 'long' })),
          amount: parseFloat(document.getElementById("imposeAmount").value) || 0,
          section: document.getElementById("imposeSection").value || '',
          remarks: document.getElementById("imposeRemark").value.trim(),
          runId: \`bulk-run-\${Date.now()}-\${Math.random().toString(36).slice(2, 8)}\`
        };
\r
        if (imposeConfig.amount <= 0) {\r
          showToast("Please enter amount greater than 0.", 'error');\r
          return;\r
        }\r
\r
        displayStudentsPreview();\r
        document.getElementById("studentsModal").style.display = "flex";\r
      } catch (error) {\r
        showToast("Error: " + error.message, 'error');\r
      }\r
    };\r
\r
    function displayStudentsPreview() {\r
      document.getElementById("modalClassName").textContent =\r
        \`\${imposeConfig.class} \${imposeConfig.section ? \`(\${imposeConfig.section})\` : ''} - \${imposeConfig.month}\`;\r
\r
      let html = \`\r
    <div style="max-height: 400px; overflow-y: auto;">\r
      <table style="width:100%;">\r
        <thead><tr>\r
          <th><input type="checkbox" id="imposeSelectAll" checked onchange="toggleImposeSelectAll(this.checked)"></th>\r
          <th>Student ID</th><th>Name</th><th>Roll</th><th>Section</th><th>Amount</th>\r
        </tr></thead>\r
        <tbody>\r
  \`;\r
\r
      studentsToImpose.forEach((student, index) => {
        const sameMonthFee = allFees.find((fee) =>
          String(fee.studentId || "") === String(student.studentId || "") &&
          feeBelongsToActiveSession(fee) &&
          normalizeFeeMonth(fee.month).toLowerCase() === normalizeFeeMonth(imposeConfig.month).toLowerCase()
        );
        const existingAssigned = sameMonthFee ? getFeeAmounts(sameMonthFee).total : 0;
        const projectedAssigned = existingAssigned + Number(imposeConfig.amount || 0);
        html += \`<tr>
          <td><input type="checkbox" class="impose-student-check" data-index="\${index}" checked onchange="updateImposeSelectionSummary()"></td>\r
          <td>\${esc(student.studentId)}</td>\r
          <td>\${esc(student.studentName)}</td>\r
          <td>\${esc(student.roll)}</td>\r
          <td>\${esc(student.section)}</td>\r
          <td>₹\${imposeConfig.amount.toLocaleString()}
            <div style="margin-top:4px;font-size:11px;color:\${sameMonthFee ? "#1d4ed8" : "#64748b"};font-weight:700;">
              \${sameMonthFee
                ? \`Same month: ₹\${existingAssigned.toLocaleString()} → ₹\${projectedAssigned.toLocaleString()}\`
                : "New month record"}
            </div>
          </td>
        </tr>\`;
      });
\r
      html += \`</tbody></table></div>\r
    <div style="padding:16px;background:#f1f5f9;border:1px solid #dbe3ef;border-radius:10px;margin-top:15px;color:#172033;">\r
      <strong id="imposeSelectionSummary">Selected Students: \${studentsToImpose.length} | Total Amount: ₹\${(studentsToImpose.length * imposeConfig.amount).toLocaleString()}</strong>\r
      \${imposeConfig.remarks ? \`<div style="margin-top:8px;color:#475569;font-weight:600;">Remark: \${esc(imposeConfig.remarks)}</div>\` : ""}\r
    </div>\`;\r
\r
      document.getElementById("studentsList").innerHTML = html;\r
      updateImposeSelectionSummary();\r
    }\r
\r
    function getSelectedStudentsForImposition() {\r
      return Array.from(document.querySelectorAll(".impose-student-check:checked"))\r
        .map((checkbox) => studentsToImpose[Number(checkbox.dataset.index)])\r
        .filter(Boolean);\r
    }\r
\r
    window.toggleImposeSelectAll = (checked) => {\r
      document.querySelectorAll(".impose-student-check").forEach((checkbox) => {\r
        checkbox.checked = checked;\r
      });\r
      updateImposeSelectionSummary();\r
    };\r
\r
    window.updateImposeSelectionSummary = () => {\r
      const selectedCount = getSelectedStudentsForImposition().length;\r
      const total = selectedCount * Number(imposeConfig.amount || 0);\r
      const summary = document.getElementById("imposeSelectionSummary");\r
      if (summary) summary.textContent = \`Selected Students: \${selectedCount} | Total Amount: ₹\${total.toLocaleString()}\`;\r
      const selectAll = document.getElementById("imposeSelectAll");\r
      if (selectAll) {\r
        const checks = Array.from(document.querySelectorAll(".impose-student-check"));\r
        selectAll.checked = checks.length > 0 && checks.every((checkbox) => checkbox.checked);\r
        selectAll.indeterminate = checks.some((checkbox) => checkbox.checked) && !selectAll.checked;\r
      }\r
    };\r
\r
    window.confirmImposeFees = async () => {
      if (!ensureSessionEditable("Fee imposition")) return;
      if (feeImposeInProgress) return showToast("Fee imposition is already running. Please wait.", "error");
      const selectedStudents = getSelectedStudentsForImposition();
      if (!selectedStudents.length) {\r
        showToast("Select at least one student to impose fees.", "error");\r
        return;\r
      }\r
      if (!confirm(\`Impose fees for \${selectedStudents.length} selected students?\\nTotal: ₹\${(selectedStudents.length * imposeConfig.amount).toLocaleString()}\`)) return;\r

      try {
        feeImposeInProgress = true;
        const confirmBtn = document.getElementById("confirmImposeFeesBtn");
        if (confirmBtn) {
          confirmBtn.disabled = true;
          confirmBtn.textContent = "Imposing...";
        }
        let createdCount = 0;
        let mergedCount = 0;
        let alreadyAppliedCount = 0;
        for (const student of selectedStudents) {
          if (studentTcMap[student.studentId]) continue;
          const impositionEntry = buildImpositionEntry(student, imposeConfig.amount, 0);
          const saveResult = await createMonthlyFeeIfMissing(student, imposeConfig.month, {
            studentId: student.studentId,
            studentName: student.studentName,
            class: student.class,
            section: student.section,
            roll: student.roll,
            month: imposeConfig.month,
            amount: imposeConfig.amount,
            originalAmount: imposeConfig.amount,
            totalPaidAmount: 0,
            paidAmount: 0,
            remainingAmount: imposeConfig.amount,
            status: "Imposed",
            date: new Date(),
            remarks: imposeConfig.remarks,
            impositionRemark: imposeConfig.remarks,
            ...sessionFeeFields(),
            impositions: [impositionEntry],
            payments: []
          });

          if (saveResult.created) {
            createdCount++;
          } else {
            const mergeResult = buildSameMonthImpositionUpdate(student, saveResult.fee, imposeConfig.amount);
            if (mergeResult?.updateData) {
              await updateDoc(doc(db, "schools", activeSchoolId, "fees", saveResult.fee.id), mergeResult.updateData);
              mergedCount++;
            } else {
              alreadyAppliedCount++;
            }
          }
        }

        closeStudentsModal();
        loadAllReports();
        showToast(\`\${createdCount} new month record(s) created. \${mergedCount} existing same-month record(s) updated. \${alreadyAppliedCount} already processed in this run.\`);
      } catch (error) {
        showToast("Error: " + error.message, 'error');
      } finally {
        feeImposeInProgress = false;
        const confirmBtn = document.getElementById("confirmImposeFeesBtn");
        if (confirmBtn) {
          confirmBtn.disabled = false;
          confirmBtn.textContent = "Confirm & Impose";
        }
      }
    };
\r
    window.markSelectedAsPending = async () => {\r
      if (!ensureSessionEditable("Fee updates")) return;\r
      if (selectedRows.size === 0) {\r
        showToast("Select rows first.", "error");\r
        return;\r
      }\r
      const tcBlocked = Array.from(selectedRows).filter((feeId) => {\r
        const fee = allFees.find((f) => f.id === feeId);\r
        return fee && studentTcMap[fee.studentId];\r
      });\r
      if (tcBlocked.length) {\r
        showToast("TC issued for one or more selected students - fee updates are blocked.", "error");\r
        return;\r
      }\r
\r
      if (!confirm(\`Mark \${selectedRows.size} selected records as pending?\`)) return;\r
\r
      try {\r
        const updatePromises = Array.from(selectedRows).map(async (feeId) => {\r
          const fee = allFees.find((f) => f.id === feeId);\r
          if (!fee) return;\r
          const originalAmount = Number(fee.originalAmount || fee.amount || 0);\r
          await updateDoc(doc(db, "schools", activeSchoolId, "fees", feeId), {\r
            status: "Pending",\r
            totalPaidAmount: 0,\r
            paidAmount: 0,\r
            remainingAmount: originalAmount,\r
            ...sessionFeeFields(),\r
            payments: [],\r
            updatedAt: serverTimestamp()\r
          });\r
        });\r
        await Promise.all(updatePromises);\r
        selectedRows.clear();\r
        showToast("Selected records marked as pending.");\r
        loadAllReports();\r
      } catch (error) {\r
        showToast("Error: " + error.message, "error");\r
      }\r
    };\r
\r
    window.imposeFees = () => loadStudentsForClass();\r
    window.openImposeModal = () => document.getElementById("imposeClass").focus();\r
    window.closeStudentsModal = () => {\r
      document.getElementById("studentsModal").style.display = "none";\r
      studentsToImpose = [];\r
    };\r
\r
    // Event Listeners\r
    document.addEventListener('DOMContentLoaded', function () {\r
      document.getElementById("searchStudent").addEventListener("keypress", function (e) {\r
        if (e.key === "Enter") loadReports();\r
      });\r
\r
      document.getElementById("manageStudentId")?.addEventListener("keydown", function (e) {\r
        if (e.key !== "Enter") return;\r
        e.preventDefault();\r
        window.fetchStudentFeeManager();\r
      });\r
\r
      document.getElementById("rowsPerPage").addEventListener("change", function () {\r
        rowsPerPage = parseInt(this.value);\r
        currentPage = 1;\r
        displayReports();\r
      });\r
\r
      // Modal close on outside click\r
      document.getElementById("studentsModal").addEventListener("click", function (e) {\r
        if (e.target === this) closeStudentsModal();\r
      });\r
      document.getElementById("partialDetailsModal").addEventListener("click", function (e) {\r
        if (e.target === this) closePartialDetailsModal();\r
      });\r
      document.getElementById("addPaymentModal").addEventListener("click", function (e) {
        if (e.target === this) closeAddPaymentModal();
      });
      document.getElementById("addPaymentModalCloseBtn")?.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeAddPaymentModal();
      });
      document.getElementById("historyModal").addEventListener("click", function (e) {
        if (e.target === this) window.closeHistoryModal(e);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !document.getElementById("historyModal")?.hidden) {
          window.closeHistoryModal(e);
        }
      });
    });\r
\r
  `},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""}]};export{e as default};
