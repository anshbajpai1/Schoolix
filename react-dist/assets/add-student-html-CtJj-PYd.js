const e={file:"add-student.html",title:"Admissions and Fees | Schoolix",htmlClass:"",bodyClass:"",body:`\r
<div id="sxPageLoader" class="sx-page-loader" role="status" aria-live="polite">\r
  <section class="dots-container" aria-label="Loading page">\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
    <div class="dot"></div>\r
  </section>\r
</div>\r
  <div class="page-shell">\r
    <header class="hero">\r
      <div>\r
        <span class="eyebrow">Schoolix Administration</span>\r
        <h1>Admissions and Fees</h1>\r
        <p>Manage student admissions, automatic section allocation, fee imposition and payment tracking with clear\r
          visibility into paid, pending and extra collections.</p>\r
      </div>\r
      <div class="hero-actions">\r
        <button class="btn btn-secondary" id="printRecentBtn" style="display:none" onclick="printRecentStudent()">Print\r
          Latest Registration</button>\r
        <button class="btn btn-primary" onclick="goToStudents()">View Students</button>\r
      </div>\r
    </header>\r
\r
    <section class="recent-student" id="recentStudentCard">\r
      <h3>Recently Added Student</h3>\r
      <p id="recentStudentInfo"></p>\r
      <div class="button-row">\r
        <button class="btn btn-primary" onclick="printRecentStudent()">Print Registration Form</button>\r
      </div>\r
    </section>\r
\r
    <section class="card">\r
      <div class="section-heading">\r
        <div>\r
          <h2>Fee Configuration</h2>\r
          <p>Set the standard fee for each class. New admissions automatically receive an imposed fee entry for the\r
            current month using this configuration.</p>\r
        </div>\r
        <button class="btn btn-warning" onclick="openFeeConfigModal()">Edit Class Fees</button>\r
      </div>\r
      <div class="config-grid">\r
        <div class="config-pill"><strong>PG</strong><span id="pgAmount">₹2,500</span></div>\r
        <div class="config-pill"><strong>LKG</strong><span id="lkgAmount">₹2,800</span></div>\r
        <div class="config-pill"><strong>UKG</strong><span id="ukgAmount">₹3,000</span></div>\r
        <div class="config-pill"><strong>Class 1</strong><span id="class1Amount">₹3,500</span></div>\r
        <div class="config-pill"><strong>Class 2</strong><span id="class2Amount">₹3,500</span></div>\r
        <div class="config-pill"><strong>Class 3</strong><span id="class3Amount">₹3,500</span></div>\r
        <div class="config-pill"><strong>Class 4</strong><span id="class4Amount">₹3,500</span></div>\r
        <div class="config-pill"><strong>Class 5</strong><span id="class5Amount">₹3,500</span></div>\r
        <div class="config-pill"><strong>Class 6</strong><span id="class6Amount">₹4,000</span></div>\r
        <div class="config-pill"><strong>Class 7</strong><span id="class7Amount">₹4,000</span></div>\r
        <div class="config-pill"><strong>Class 8</strong><span id="class8Amount">₹4,000</span></div>\r
        <div class="config-pill"><strong>Class 9</strong><span id="class9Amount">₹4,500</span></div>\r
        <div class="config-pill"><strong>Class 10</strong><span id="class10Amount">₹4,500</span></div>\r
        <div class="config-pill"><strong>Class 11</strong><span id="class11Amount">₹5,000</span></div>\r
        <div class="config-pill"><strong>Class 12</strong><span id="class12Amount">₹5,000</span></div>\r
      </div>\r
    </section>\r
\r
    <!-- Add New Student -->\r
    <section class="card">\r
      <div class="section-heading">\r
        <div>\r
          <h2>Add New Student</h2>\r
          <p>Student profile, section allocation and first fee imposition are handled together so the admission record\r
            is complete from day one.</p>\r
        </div>\r
      </div>\r
\r
      <div class="bulk-import-panel">\r
        <div>\r
          <h3>Bulk Student Import</h3>\r
          <p class="subnote" style="margin:8px 0 0">Upload an Excel or CSV sheet with student details. Student ID and section can be left blank; they will be assigned automatically.</p>\r
        </div>\r
        <div class="bulk-import-actions">\r
          <div class="field">\r
            <label for="bulkStudentFile">Excel / CSV file</label>\r
            <input id="bulkStudentFile" type="file" accept=".xlsx,.xls,.csv">\r
          </div>\r
          <button class="btn btn-secondary" type="button" onclick="downloadBulkStudentTemplate()">Download Template</button>\r
          <button class="btn btn-success" type="button" id="bulkImportBtn" onclick="importBulkStudents()">Import Students</button>\r
        </div>\r
        <div id="bulkImportResults" class="bulk-import-results"></div>\r
      </div>\r
\r
      <div class="layout-two">\r
        <div>\r
          <div class="subnote">Section is optional. Enter it manually when needed; leave it blank and Schoolix will\r
            automatically assign the least-filled section for the selected class.</div>\r
          <div class="form-grid">\r
            <div class="field"><label for="name">Student name</label><input id="name" placeholder="Enter full name">\r
            </div>\r
            <div class="field">\r
              <label for="class">Class</label>\r
              <select id="class" onchange="showAutoFees()">\r
                <option value="">Select class</option>\r
              </select>\r
            </div>\r
            <div class="field">\r
              <label for="section">Section (optional)</label>\r
              <input id="section" placeholder="Example: A (leave blank for auto-assign)">\r
            </div>\r
            <div class="field">\r
              <label for="maxPerSection">Max students per section (optional)</label>\r
              <input id="maxPerSection" type="number" min="1" placeholder="Example: 40">\r
\r
              <!-- NEW BUTTON -->\r
              <button class="btn btn-primary" onclick="saveMaxSectionLimit()">\r
                Save for now\r
              </button>\r
            </div>\r
            <div class="field"><label for="dateOfAdmission">Date of admission</label><input id="dateOfAdmission"\r
                type="date"></div>\r
            <div class="field"><label for="yearOfAdmission">Year of admission</label><input id="yearOfAdmission"\r
                type="number" min="2000" placeholder="Example: 2026"></div>\r
            <div class="field">\r
              <label for="currentYear">Current Academic session</label>\r
              <select id="currentYear">\r
                <option value="">Loading sessions…</option>\r
              </select>\r
            </div>\r
            <div class="field"><label for="studentId">Student ID</label><input id="studentId"\r
                placeholder="26XXXX format (auto-generated)"></div>\r
            <div class="field">\r
              <label for="srNumber">SR Number</label>\r
              <div class="sr-number-tools">\r
                <input id="srNumber" placeholder="Unique school SR number">\r
                <button class="btn btn-secondary" type="button" onclick="generateSrNumber()">Generate SR</button>\r
              </div>\r
            </div>\r
            <div class="field">\r
              <label for="gender">Gender</label>\r
              <select id="gender">\r
                <option value="">Select gender</option>\r
                <option>Male</option>\r
                <option>Female</option>\r
                <option>Other</option>\r
              </select>\r
            </div>\r
            <div class="field">\r
              <label for="category">Category</label>\r
              <select id="category">\r
                <option value="">Select category</option>\r
                <option>General</option>\r
                <option>OBC</option>\r
                <option>SC</option>\r
                <option>ST</option>\r
              </select>\r
            </div>\r
            <div class="field"><label for="aadharNumber">Aadhaar number</label><input id="aadharNumber" type="text"\r
                maxlength="12" placeholder="Optional"></div>\r
            <div class="field">\r
              <label for="bloodGroup">Blood group</label>\r
              <select id="bloodGroup">\r
                <option value="">Select blood group</option>\r
                <option>A+</option>\r
                <option>A-</option>\r
                <option>B+</option>\r
                <option>B-</option>\r
                <option>AB+</option>\r
                <option>AB-</option>\r
                <option>O+</option>\r
                <option>O-</option>\r
              </select>\r
            </div>\r
            <div class="field"><label for="religion">Religion</label><input id="religion"\r
                placeholder="Optional"></div>\r
            <div class="field"><label for="previousSchool">Previous school</label><input id="previousSchool"\r
                placeholder="Optional"></div>\r
            <div class="field">\r
              <label for="studentStatus">Status</label>\r
              <select id="studentStatus">\r
                <option>Active</option>\r
                <option>Passed Out</option>\r
                <option>TC Issued</option>\r
              </select>\r
            </div>\r
            <div class="field"><label for="studentEmail">Registered email address</label><input id="studentEmail" type="email"\r
                placeholder="student@example.com (required for login/reset)"></div>\r
            <div class="field"><label for="parentEmail">Parent email address</label><input id="parentEmail" type="email"\r
                placeholder="parent@example.com (absence alerts)"></div>\r
            <div class="field"><label for="studentPassword">Login password</label><input id="studentPassword" type="password"\r
                placeholder="Optional; auto-generated if blank"></div>\r
            <div class="field"><label for="father">Father name</label><input id="father"\r
                placeholder="Enter father name"></div>\r
            <div class="field"><label for="fatherPhone">Father phone number</label><input id="fatherPhone"\r
                placeholder="Enter father contact number"></div>\r
            <div class="field"><label for="mother">Mother name</label><input id="mother"\r
                placeholder="Enter mother name"></div>\r
            <div class="field"><label for="motherPhone">Mother phone number</label><input id="motherPhone"\r
                placeholder="Enter mother contact number"></div>\r
            <div class="field"><label for="phone">Primary contact number</label><input id="phone"\r
                placeholder="Optional; defaults to father's number"></div>\r
            <div class="field"><label for="dob">Date of birth</label><input id="dob" type="date"></div>\r
            <div class="student-photo-field">\r
              <div class="student-photo-preview" id="studentPhotoPreview">No photo</div>\r
              <div class="field">\r
                <label for="studentPhoto">Student photo</label>\r
                <input id="studentPhoto" type="file" accept="image/*">\r
                <small>Optional. Uploaded to Cloudinary when the admission is saved.</small>\r
              </div>\r
            </div>\r
            <div class="field" style="grid-column:1/-1"><label for="address">Address</label><input id="address"\r
                placeholder="Optional"></div>\r
            <div class="field" style="grid-column:1/-1"><label for="documentList">Document list</label><textarea id="documentList"\r
                placeholder="Birth Certificate, TC, Aadhaar copy, marksheet"></textarea></div>\r
          </div>\r
\r
          <div class="auto-fee-banner" id="autoFeeInfo">\r
            <strong id="autoFeeTitle">Auto imposed fee</strong>\r
            <div id="autoFeeAmount"></div>\r
          </div>\r
\r
          <div class="button-row" style="margin-top:20px">\r
            <button class="btn btn-secondary" onclick="generateStudentId()">Generate Student ID</button>\r
            <button class="btn btn-success" onclick="addStudent()">Add Student and Impose Fee</button>\r
          </div>\r
        </div>\r
\r
        <aside class="aside-panel">\r
          <div class="info-panel">\r
            <h3>Admission workflow</h3>\r
            <p>The student is added to the school collection, section is assigned automatically, roll numbers are\r
              refreshed and the monthly fee for the current month is created as an imposed entry.</p>\r
          </div>\r
          <div class="info-panel">\r
            <h3>Payment handling</h3>\r
            <p>Partial payments stay attached to the same fee entry. If an amount higher than the due balance is\r
              received, the extra amount is recorded separately and can be adjusted to any future month.</p>\r
          </div>\r
          <div class="info-panel">\r
            <h3>Extra adjustment</h3>\r
            <p>Extra collected amounts can be moved and applied to any billing month — current, past, or future —\r
              directly from the fee history section.</p>\r
          </div>\r
        </aside>\r
      </div>\r
    </section>\r
\r
    <!-- Fee Management -->\r
    <section class="card" id="addStudentFeeManagementSection" style="display:contents">\r
      <div class="section-heading" style="display:none">\r
        <div>\r
          <h2>Fee Management</h2>\r
          <p>Fetch a student, update or impose a monthly fee, review fee history and print receipts whenever needed.</p>\r
        </div>\r
      </div>\r
\r
      <div class="search-bar" style="display:none">\r
        <input id="searchId" placeholder="Enter student ID">\r
        <button class="btn btn-primary" onclick="fetchStudent()">Fetch Student</button>\r
      </div>\r
\r
      <!-- Fees Modal -->\r
      <div class="modal" id="feesModal" style="display:none">\r
        <div class="modal-card">\r
          <div class="modal-header">\r
            <div>\r
              <h3>Student Fees</h3>\r
              <p>Review student details, save a payment or update the current fee state without losing visibility into\r
                partial and extra collections.</p>\r
            </div>\r
            <div class="button-row">\r
              <button class="btn btn-accent" id="printReceiptBtn" style="display:none" onclick="openReceiptModal()">View / Print Fee Statement</button>\r
              <button class="btn btn-secondary" id="downloadStatementBtn" style="display:none" onclick="downloadFullStatement()">Download Full Statement</button>\r
              <button class="btn btn-secondary" id="printBtn" style="display:none"\r
                onclick="printRegistrationForm()">Print Registration Form</button>\r
              <button class="btn btn-secondary" onclick="closeModal()">Close</button>\r
            </div>\r
          </div>\r
          <div class="modal-body">\r
            <div class="form-grid" style="grid-template-columns:repeat(3, minmax(0, 1fr));margin-bottom:18px">\r
              <div class="field"><label for="studentName">Student name</label><input id="studentName" readonly></div>\r
              <div class="field"><label for="studentClass">Class and section</label><input id="studentClass" readonly>\r
              </div>\r
              <div class="field"><label for="studentFather">Father name</label><input id="studentFather" readonly></div>\r
              <div class="field"><label for="studentFatherPhone">Father phone</label><input id="studentFatherPhone" readonly></div>\r
              <div class="field"><label for="studentMother">Mother name</label><input id="studentMother" readonly></div>\r
              <div class="field"><label for="studentMotherPhone">Mother phone</label><input id="studentMotherPhone" readonly></div>\r
            </div>\r
\r
            <div class="summary-banner" id="studentFeeSummary"></div>\r
\r
            <!-- Extra balance notice -->\r
            <div class="extra-adjust-banner" id="extraBalanceBanner">\r
              <h4>Extra Balance Available</h4>\r
              <div id="extraBalanceText"></div>\r
              <div style="margin-top:12px">\r
                <button class="btn btn-accent" style="min-height:38px;padding:10px 16px"\r
                  onclick="openAdjustExtraModal()">Adjust Extra to Another Month</button>\r
              </div>\r
            </div>\r
\r
            <div class="inline-grid" style="margin-top:14px">\r
              <div class="field">\r
                <label for="amount">Amount</label>\r
                <input id="amount" type="number" min="0" placeholder="Enter amount">\r
              </div>\r
              <div class="field">\r
                <label for="month">Billing month</label>\r
                <select id="month">\r
                  <option value="">Select month</option>\r
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
              </div>\r
              <div class="field">\r
                <label for="status">Status</label>\r
                <select id="status">\r
                  <option value="">Select status</option>\r
                  <option value="Paid">Record payment</option>\r
                  <option value="Imposed">Imposed</option>\r
                  <option value="Pending">Pending</option>\r
                  <option value="Unpaid">Unpaid</option>\r
                </select>\r
              </div>\r
            </div>\r
\r
            <!-- Remarks field -->\r
            <div class="field" style="margin-top:14px">\r
              <label for="feeRemarks">Remarks <span\r
                  style="font-weight:400;color:var(--text-soft)">(optional)</span></label>\r
              <textarea id="feeRemarks"\r
                placeholder="Add any notes, reason for late payment, concession details, etc."></textarea>\r
            </div>\r
\r
            <div class="preview-banner" id="autoUpdateAlert">\r
              <strong id="autoUpdateMsg">Existing fee detected</strong>\r
              <div class="preview-details" id="autoUpdateMetrics"></div>\r
              <div id="previewHint" style="margin-top:12px;color:var(--text-soft);font-size:13px;line-height:1.6"></div>\r
            </div>\r
\r
            <div class="button-row" style="margin-top:18px">\r
              <button class="btn btn-success" id="saveBtn" onclick="saveFees()">Save Fee Entry</button>\r
              <button class="btn btn-secondary" onclick="resetFeeForm()">Reset Form</button>\r
              <button class="btn btn-primary" onclick="viewHistory()">Refresh History</button>\r
            </div>\r
\r
            <div id="historySection"></div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Fee Config Modal -->\r
      <div class="modal" id="feeConfigModal">\r
        <div class="modal-card">\r
          <div class="modal-header">\r
            <div class="fee-config-title">\r
              <div class="fee-config-icon">₹</div>\r
              <div>\r
                <h3>Configure Class Fees</h3>\r
                <p>Update standard admission fees used for newly imposed monthly fee entries.</p>\r
              </div>\r
            </div>\r
            <button class="btn btn-secondary" onclick="closeFeeConfigModal()">Close</button>\r
          </div>\r
          <div class="fee-config-body">\r
            <div class="fee-config-grid">\r
              <div class="field"><label for="pgFeeInput">PG</label><input id="pgFeeInput" type="number" min="0"></div>\r
              <div class="field"><label for="lkgFeeInput">LKG</label><input id="lkgFeeInput" type="number" min="0">\r
              </div>\r
              <div class="field"><label for="ukgFeeInput">UKG</label><input id="ukgFeeInput" type="number" min="0">\r
              </div>\r
              <div class="field"><label for="class1FeeInput">Class 1</label><input id="class1FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class2FeeInput">Class 2</label><input id="class2FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class3FeeInput">Class 3</label><input id="class3FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class4FeeInput">Class 4</label><input id="class4FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class5FeeInput">Class 5</label><input id="class5FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class6FeeInput">Class 6</label><input id="class6FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class7FeeInput">Class 7</label><input id="class7FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class8FeeInput">Class 8</label><input id="class8FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class9FeeInput">Class 9</label><input id="class9FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class10FeeInput">Class 10</label><input id="class10FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class11FeeInput">Class 11</label><input id="class11FeeInput" type="number"\r
                  min="0"></div>\r
              <div class="field"><label for="class12FeeInput">Class 12</label><input id="class12FeeInput" type="number"\r
                  min="0"></div>\r
            </div>\r
            <div class="fee-config-actions">\r
              <button class="btn btn-success" onclick="saveFeeConfig()">Save Fee Configuration</button>\r
              <button class="btn btn-secondary" onclick="closeFeeConfigModal()">Cancel</button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Receipt Modal -->\r
      <div class="modal" id="receiptModal">\r
        <div class="modal-card" style="max-width:860px">\r
          <div class="modal-header">\r
            <div>\r
              <h3>Fee Receipt</h3>\r
              <p>Select a specific fee entry or print the full fee summary receipt for this student.</p>\r
            </div>\r
            <div class="button-row">\r
              <button class="btn btn-primary" onclick="downloadReceiptPDF()">Download PDF</button>\r
              <button class="btn btn-secondary" onclick="printReceipt()">Print Receipt</button>\r
              <button class="btn btn-secondary" onclick="closeReceiptModal()">Close</button>\r
            </div>\r
          </div>\r
          <div class="modal-body">\r
            <div style="margin-bottom:16px">\r
              <label style="font-size:13px;font-weight:700;color:#344155;display:block;margin-bottom:8px">Receipt\r
                Type</label>\r
              <div style="display:flex;gap:12px;flex-wrap:wrap">\r
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px">\r
                  <input type="radio" name="receiptType" value="full" checked onchange="renderReceiptPreview()"> Full\r
                  Fee Summary\r
                </label>\r
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px">\r
                  <input type="radio" name="receiptType" value="single" onchange="renderReceiptPreview()"> Single Month\r
                  Entry\r
                </label>\r
              </div>\r
            </div>\r
            <div id="singleMonthSelector" style="display:none;margin-bottom:16px">\r
              <label style="font-size:13px;font-weight:700;color:#344155;display:block;margin-bottom:8px">Select Month\r
                Entry</label>\r
              <select id="receiptFeeSelect" onchange="renderReceiptPreview()" style="max-width:320px"></select>\r
            </div>\r
            <div id="receiptPreview"\r
              style="border:1px solid var(--line);border-radius:18px;overflow:hidden;background:#fff"></div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Adjust Extra Modal -->\r
      <div class="modal" id="adjustExtraModal">\r
        <div class="modal-card" style="max-width:560px">\r
          <div class="modal-header">\r
            <div>\r
              <h3>Adjust Extra Amount</h3>\r
              <p>Apply the extra collected balance towards any billing month fee.</p>\r
            </div>\r
            <button class="btn btn-secondary" onclick="closeAdjustExtraModal()">Close</button>\r
          </div>\r
          <div class="modal-body">\r
            <div id="adjustExtraInfo"\r
              style="margin-bottom:18px;padding:14px 16px;border-radius:var(--radius-md);background:var(--accent-soft);color:#0b5f56;font-size:14px;line-height:1.6">\r
            </div>\r
            <div class="form-grid" style="grid-template-columns:1fr 1fr">\r
              <div class="field">\r
                <label for="adjustTargetMonth">Apply to month</label>\r
                <select id="adjustTargetMonth">\r
                  <option value="">Select month</option>\r
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
              </div>\r
              <div class="field">\r
                <label for="adjustAmount">Amount to adjust</label>\r
                <input id="adjustAmount" type="number" min="1" placeholder="Enter amount">\r
              </div>\r
            </div>\r
            <div class="field" style="margin-top:14px">\r
              <label for="adjustRemarks">Remarks</label>\r
              <textarea id="adjustRemarks" placeholder="Reason for adjustment (optional)"></textarea>\r
            </div>\r
            <div class="button-row" style="margin-top:18px">\r
              <button class="btn btn-success" onclick="applyExtraAdjustment()">Apply Adjustment</button>\r
              <button class="btn btn-secondary" onclick="closeAdjustExtraModal()">Cancel</button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="print-surface" id="printContent"></div>\r
\r
      <script src="school-branding.js"><\/script>\r
      <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"><\/script>\r
      <script type="module">\r
        import { initializeApp } from "./firebase-compat.js";\r
        import {\r
          addDoc, collection, deleteDoc, doc, getDoc, getDocs,\r
          getFirestore, query, setDoc, updateDoc, where\r
        } from "./firebase-compat.js";\r
        import {\r
          createUserWithEmailAndPassword,\r
          getAuth,\r
          onAuthStateChanged,\r
          signOut\r
        } from "./firebase-compat.js";\r
\r
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
        const studentCreatorApp = initializeApp(firebaseConfig, "studentCreatorApp");\r
        const studentCreatorAuth = getAuth(studentCreatorApp);\r
        const $ = (id) => document.getElementById(id);\r
        const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
        const REGISTRATION_EMAIL_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-registration-email\`;\r
\r
        const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];\r
\r
        const DEFAULT_FEE_CONFIG = {\r
          PG: 2500, LKG: 2800, UKG: 3000,\r
          "1": 3500, "2": 3500, "3": 3500, "4": 3500, "5": 3500,\r
          "6": 4000, "7": 4000, "8": 4000,\r
          "9": 4500, "10": 4500, "11": 5000, "12": 5000\r
        };\r
\r
        const toastColors = {\r
          success: "linear-gradient(135deg,#12805c,#15956b)",\r
          error: "linear-gradient(135deg,#d64c3c,#b42318)",\r
          info: "linear-gradient(135deg,#0f6cbd,#1575c8)"\r
        };\r
\r
        let currentUser = null;\r
        let currentStudent = null;\r
        let recentStudent = null;\r
        let savedMaxPerSection = "";\r
        let feeHistory = [];\r
        let feeConfig = { ...DEFAULT_FEE_CONFIG };\r
        let existingFeeId = null;\r
        let existingFeeData = null;\r
        let editingFeeId = null;\r
        let editingFeeData = null;\r
        let activeSessionId = "";\r
        let activeSessionLabel = "";\r
        let activeSessionLocked = false;\r
\r
        function escapeHtml(value) {\r
          return String(value ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\"": "&quot;", "'": "&#39;" }[m]));\r
        }\r
\r
        const CLOUDINARY_CLOUD_NAME = "fthnumnk";\r
        const CLOUDINARY_UPLOAD_PRESET = "schoolix_student_photos";\r
\r
        function getCloudinaryConfig() {\r
          return {\r
            cloudName: CLOUDINARY_CLOUD_NAME,\r
            uploadPreset: CLOUDINARY_UPLOAD_PRESET\r
          };\r
        };\r
\r
        async function uploadStudentPhoto(file, studentId) {\r
          if (!file) return { photoUrl: "", photoPublicId: "" };\r
          if (!file.type.startsWith("image/")) throw new Error("Please select an image file for student photo.");\r
          if (file.size > 5 * 1024 * 1024) throw new Error("Student photo must be under 5 MB.");\r
          const config = getCloudinaryConfig();\r
          if (!config.cloudName || !config.uploadPreset) {\r
            throw new Error("Cloudinary photo upload is not configured.");\r
          }\r
          const form = new FormData();\r
          form.append("file", file);\r
          form.append("upload_preset", config.uploadPreset);\r
          form.append("folder", \`schoolix/students/\${currentUser.uid}\`);\r
          form.append("public_id", \`\${String(studentId || "student").replace(/[^a-zA-Z0-9_-]/g, "_")}_\${Date.now()}\`);\r
          const response = await fetch(\`https://api.cloudinary.com/v1_1/\${encodeURIComponent(config.cloudName)}/image/upload\`, {\r
            method: "POST",\r
            body: form\r
          });\r
          const data = await response.json().catch(() => ({}));\r
          if (!response.ok) throw new Error(data.error?.message || "Cloudinary photo upload failed.");\r
          return { photoUrl: data.secure_url || data.url || "", photoPublicId: data.public_id || "" };\r
        }\r
\r
        function updateStudentPhotoPreview() {\r
          const preview = $("studentPhotoPreview");\r
          const file = $("studentPhoto")?.files?.[0];\r
          if (!preview) return;\r
          if (!file) {\r
            preview.textContent = "No photo";\r
            return;\r
          }\r
          const reader = new FileReader();\r
          reader.onload = () => { preview.innerHTML = \`<img src="\${reader.result}" alt="Student photo preview">\`; };\r
          reader.readAsDataURL(file);\r
        }\r
\r
        function formatCurrency(value) {\r
          return \`₹\${Number(value || 0).toLocaleString("en-IN")}\`;\r
        }\r
\r
        function toDate(value) {\r
          if (!value) return null;\r
          if (value?.toDate) return value.toDate();\r
          const p = new Date(value);\r
          return isNaN(p.getTime()) ? null : p;\r
        }\r
\r
        function normalizeClassValue(value) {\r
          const cleaned = String(value || "").trim().toUpperCase().replace(/^CLASS\\s+/i, "");\r
          if (!cleaned) return "";\r
          const roman = { I: "1", II: "2", III: "3", IV: "4", V: "5", VI: "6", VII: "7", VIII: "8", IX: "9", X: "10", XI: "11", XII: "12" };\r
          return roman[cleaned] || (/^\\d+$/.test(cleaned) ? String(Number(cleaned)) : cleaned);\r
        }\r
\r
        function normalizeSectionValue(value) {\r
          return String(value || "").trim().toUpperCase().replace(/^SECTION\\s+/i, "");\r
        }\r
\r
        function sameClassSection(student, studentClass, section) {\r
          return normalizeClassValue(student.class) === normalizeClassValue(studentClass) &&\r
            normalizeSectionValue(student.section || "A") === normalizeSectionValue(section || "A");\r
        }\r
\r
        function getSelectedSessionMeta() {\r
          const sel = $("currentYear");\r
          const opt = sel?.options?.[sel.selectedIndex];\r
          return {\r
            sessionId: opt?.dataset?.id || activeSessionId || "",\r
            session: sel?.value || activeSessionLabel || "",\r
            locked: opt?.dataset?.locked === "1" || activeSessionLocked,\r
            classesLocked: opt?.dataset?.classesLocked === "1"\r
          };\r
        }\r
\r
        function makeSessionPlacement(student, meta, overrides = {}) {\r
          const now = Date.now();\r
          return {\r
            ...(student.sessionPlacements?.[meta.sessionId] || {}),\r
            sessionId: meta.sessionId || "",\r
            session: meta.session || student.currentYear || "",\r
            currentYear: meta.session || student.currentYear || "",\r
            class: student.class || "",\r
            section: student.section || "",\r
            roll: student.roll || student.rollNo || "",\r
            locked: Boolean(meta.locked),\r
            classLocked: Boolean(meta.classesLocked),\r
            createdAt: student.createdAt || now,\r
            updatedAt: now,\r
            ...overrides\r
          };\r
        }\r
\r
        function sessionFeeFields() {\r
          const meta = getSelectedSessionMeta();\r
          return { sessionId: meta.sessionId || "", session: meta.session || "" };\r
        }\r
\r
        function ensureSessionEditable(action = "Fee changes") {\r
          if (!getSelectedSessionMeta().locked) return true;\r
          showToast(\`\${action} are blocked because this session is locked.\`, "error");\r
          return false;\r
        }\r
\r
        function feeBelongsToSelectedSession(fee) {\r
          const meta = getSelectedSessionMeta();\r
          if (!meta.sessionId && !meta.session) return true;\r
          if (!fee.sessionId && !fee.session && !fee.currentYear && !fee.academicSession) return false;\r
          return fee.sessionId === meta.sessionId ||\r
            fee.session === meta.session ||\r
            fee.currentYear === meta.session ||\r
            fee.academicSession === meta.session;\r
        }\r
\r
        function formatDate(value) {\r
          const d = toDate(value);\r
          return d ? d.toLocaleDateString("en-IN") : "N/A";\r
        }\r
\r
        function currentMonthName() { return MONTHS[new Date().getMonth()]; }\r
\r
        function academicYearFromToday() {\r
          const t = new Date();\r
          const s = t.getMonth() >= 3 ? t.getFullYear() : t.getFullYear() - 1;\r
          return \`\${s}-\${String((s + 1) % 100).padStart(2, "0")}\`;\r
        }\r
\r
        function showToast(message, type = "success") {\r
          const t = document.createElement("div");\r
          t.className = "toast";\r
          t.textContent = message;\r
          t.style.background = toastColors[type] || toastColors.success;\r
          document.body.appendChild(t);\r
          setTimeout(() => t.remove(), 3600);\r
        }\r
\r
        function getFeeAmounts(fee) {\r
          const total = Number(fee?.originalAmount ?? fee?.amount ?? 0);\r
          const applied = Number(fee?.totalPaidAmount ?? fee?.paidAmount ?? 0);\r
          const explicitExtra = Number(fee?.totalExtraPaidAmount);\r
          const derivedCollected = Number(fee?.totalCollectedAmount ?? applied + (isFinite(explicitExtra) ? explicitExtra : 0));\r
          const extra = isFinite(explicitExtra) ? explicitExtra : Math.max(0, derivedCollected - applied);\r
          const collected = Number(fee?.totalCollectedAmount ?? applied + extra);\r
          const due = isFinite(Number(fee?.remainingAmount)) ? Number(fee.remainingAmount) : Math.max(0, total - applied);\r
          return {\r
            total: Math.max(0, total),\r
            applied: Math.max(0, applied),\r
            extra: Math.max(0, extra),\r
            collected: Math.max(0, collected),\r
            due: Math.max(0, due)\r
          };\r
        }\r
\r
        function getFeeStatusMeta(fee) {\r
          const { total, applied, extra, due } = getFeeAmounts(fee);\r
          if (due === 0 && total > 0 && extra > 0) return { tone: "paid", label: "Paid with extra" };\r
          if (due === 0 && total > 0) return { tone: "paid", label: "Paid" };\r
          if (applied > 0) return { tone: "partial", label: "Partial payment" };\r
          if (fee?.status === "Imposed") return { tone: "imposed", label: "Imposed" };\r
          if (fee?.status === "Unpaid") return { tone: "unpaid", label: "Unpaid" };\r
          return { tone: "pending", label: fee?.status || "Pending" };\r
        }\r
\r
        function calculateStudentFeeSummary(fees) {\r
          return fees.reduce((t, fee) => {\r
            const a = getFeeAmounts(fee);\r
            t.total += a.total; t.applied += a.applied;\r
            t.extra += a.extra; t.collected += a.collected; t.due += a.due;\r
            return t;\r
          }, { total: 0, applied: 0, extra: 0, collected: 0, due: 0 });\r
        }\r
\r
        // Calculate total extra balance across ALL fee entries\r
        function getTotalExtraBalance() {\r
          return feeHistory.reduce((sum, fee) => sum + getFeeAmounts(fee).extra, 0);\r
        }\r
\r
        function updateExtraBalanceBanner() {\r
          const totalExtra = getTotalExtraBalance();\r
          if (totalExtra > 0 && currentStudent) {\r
            $("extraBalanceBanner").style.display = "block";\r
            $("extraBalanceText").innerHTML = \`Total extra balance: <strong>\${formatCurrency(totalExtra)}</strong>. You can apply this towards any month's fee.\`;\r
          } else {\r
            $("extraBalanceBanner").style.display = "none";\r
          }\r
        }\r
\r
        function renderSummaryBanner(fees) {\r
          const s = calculateStudentFeeSummary(fees);\r
          $("studentFeeSummary").innerHTML = \`\r
            <strong style="display:block;font-size:16px;margin-bottom:6px">Fee snapshot</strong>\r
            <div style="color:var(--text-soft);font-size:14px;line-height:1.6">Assigned, applied, collected and extra amounts are shown separately so balances stay accurate.</div>\r
            <div class="stats-grid" style="margin-top:14px">\r
              <div class="stat-tile total"><small>Assigned</small><span>\${formatCurrency(s.total)}</span><strong>Total fee raised</strong></div>\r
              <div class="stat-tile paid"><small>Applied</small><span>\${formatCurrency(s.applied)}</span><strong>Applied against dues</strong></div>\r
              <div class="stat-tile extra"><small>Extra</small><span>\${formatCurrency(s.extra)}</span><strong>Collected above due</strong></div>\r
              <div class="stat-tile due"><small>Due</small><span>\${formatCurrency(s.due)}</span><strong>Remaining balance</strong></div>\r
            </div>\`;\r
          $("studentFeeSummary").style.display = "block";\r
        }\r
\r
        function initializeClasses() {\r
          const classList = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
          $("class").innerHTML = \`<option value="">Select class</option>\${classList.map(v => \`<option value="\${v}">\${v}</option>\`).join("")}\`;\r
        }\r
\r
        function setDefaults() {\r
          if (!$("maxPerSection").value && savedMaxPerSection) $("maxPerSection").value = savedMaxPerSection;\r
          if (!$("yearOfAdmission").value) $("yearOfAdmission").value = String(new Date().getFullYear());\r
          if (!$("currentYear").value) $("currentYear").value = academicYearFromToday();\r
          if (!$("month").value) $("month").value = currentMonthName();\r
        }\r
\r
        async function loadFeeConfig() {\r
          try {\r
            const directDoc = await getDoc(doc(db, "schools", currentUser.uid, "config", "fees_config"));\r
            if (directDoc.exists()) {\r
              feeConfig = { ...feeConfig, ...(directDoc.data().fees || {}) };\r
            } else {\r
              const fallback = await getDocs(query(collection(db, "schools", currentUser.uid, "config"), where("type", "==", "fees")));\r
              if (!fallback.empty) feeConfig = { ...feeConfig, ...(fallback.docs[0].data().fees || {}) };\r
            }\r
          } catch (e) { console.error("Fee config load failed:", e); }\r
          updateFeeDisplay();\r
          showAutoFees();\r
        }\r
\r
        function updateFeeDisplay() {\r
          const map = {\r
            pgAmount: "PG", lkgAmount: "LKG", ukgAmount: "UKG",\r
            class1Amount: "1", class2Amount: "2", class3Amount: "3", class4Amount: "4", class5Amount: "5",\r
            class6Amount: "6", class7Amount: "7", class8Amount: "8", class9Amount: "9", class10Amount: "10",\r
            class11Amount: "11", class12Amount: "12"\r
          };\r
          Object.entries(map).forEach(([id, key]) => { $(id).textContent = formatCurrency(feeConfig[key] || 0); });\r
        }\r
\r
        window.showAutoFees = () => {\r
          const sel = $("class").value;\r
          if (sel && feeConfig[sel]) {\r
            $("autoFeeTitle").textContent = "Auto imposed fee";\r
            $("autoFeeAmount").textContent = \`\${formatCurrency(feeConfig[sel])} will be created for \${currentMonthName()} as an imposed entry.\`;\r
            $("autoFeeInfo").style.display = "block";\r
          } else {\r
            $("autoFeeInfo").style.display = "none";\r
          }\r
        };\r
\r
        async function getExistingStudentIds() {\r
          const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
          return snap.docs.map(d => String(d.data().studentId || "").trim()).filter(Boolean);\r
        }\r
\r
        async function getExistingSrNumbers() {\r
          const [studentSnap, passedOutSnap] = await Promise.all([\r
            getDocs(collection(db, "schools", currentUser.uid, "students")),\r
            getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
          ]);\r
          return [...studentSnap.docs, ...passedOutSnap.docs]\r
            .map(d => String(d.data().srNumber || "").trim())\r
            .filter(Boolean);\r
        }\r
\r
        function splitSrNumber(value) {\r
          const text = String(value || "").trim();\r
          const match = text.match(/^(.*?)(\\d+)(\\D*)$/);\r
          if (!match) return { prefix: "", number: 0, suffix: "", width: 0 };\r
          return {\r
            prefix: match[1] || "",\r
            number: Number(match[2] || 0),\r
            suffix: match[3] || "",\r
            width: match[2].length\r
          };\r
        }\r
\r
        function formatSrNumber(pattern, number) {\r
          const width = Math.max(Number(pattern.width || 0), String(Math.max(0, number)).length);\r
          return \`\${pattern.prefix || ""}\${String(number).padStart(width, "0")}\${pattern.suffix || ""}\`;\r
        }\r
\r
        function getNextSrPattern(existingSrNumbers, seed = "") {\r
          const cleanSeed = String(seed || "").trim();\r
          const seedPattern = splitSrNumber(cleanSeed);\r
          const parsedExisting = existingSrNumbers\r
            .map(splitSrNumber)\r
            .filter((item) => Number.isFinite(item.number) && item.number > 0);\r
\r
          if (cleanSeed && seedPattern.number > 0) {\r
            return seedPattern;\r
          }\r
\r
          const highest = parsedExisting.reduce((best, item) => item.number > best.number ? item : best, { prefix: "", number: 0, suffix: "", width: 0 });\r
          return {\r
            prefix: highest.prefix || "",\r
            number: highest.number + 1,\r
            suffix: highest.suffix || "",\r
            width: Math.max(highest.width || 0, 1)\r
          };\r
        }\r
\r
        async function generateUniqueSrNumbers(count = 1, seed = "", extraTaken = []) {\r
          const existing = await getExistingSrNumbers();\r
          const taken = new Set([...existing, ...extraTaken].map((value) => String(value || "").trim().toLowerCase()).filter(Boolean));\r
          const pattern = getNextSrPattern(existing, seed);\r
          let nextNumber = Math.max(1, Number(pattern.number || 1));\r
          const generated = [];\r
\r
          while (generated.length < count) {\r
            const candidate = formatSrNumber(pattern, nextNumber);\r
            nextNumber += 1;\r
            const key = candidate.toLowerCase();\r
            if (taken.has(key)) continue;\r
            taken.add(key);\r
            generated.push(candidate);\r
          }\r
\r
          return generated;\r
        }\r
\r
        window.generateSrNumber = async () => {\r
          try {\r
            const input = $("srNumber");\r
            const seed = input?.value || "";\r
            const [srNumber] = await generateUniqueSrNumbers(1, seed, seed ? [seed] : []);\r
            if (input) input.value = srNumber;\r
            showToast("SR Number generated.", "info");\r
          } catch (e) {\r
            console.error("SR number generation failed:", e);\r
            showToast("Unable to generate SR number.", "error");\r
          }\r
        };\r
\r
        async function findExistingStudentRecord(studentId = "", email = "", srNumber = "") {\r
          const [studentSnap, passedOutSnap] = await Promise.all([\r
            getDocs(collection(db, "schools", currentUser.uid, "students")),\r
            getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
          ]);\r
          const normalizedStudentId = String(studentId || "").trim();\r
          const normalizedEmail = String(email || "").trim().toLowerCase();\r
          const normalizedSrNumber = String(srNumber || "").trim().toLowerCase();\r
          const activeMatch = studentSnap.docs\r
            .map(d => ({ id: d.id, ...d.data() }))\r
            .find((student) => {\r
              const existingStudentId = String(student.studentId || "").trim();\r
              const existingEmail = String(student.email || "").trim().toLowerCase();\r
              const existingSrNumber = String(student.srNumber || "").trim().toLowerCase();\r
              return (normalizedStudentId && existingStudentId === normalizedStudentId)\r
                || (normalizedEmail && existingEmail === normalizedEmail)\r
                || (normalizedSrNumber && existingSrNumber === normalizedSrNumber);\r
            });\r
          if (activeMatch) return activeMatch;\r
          if (!normalizedSrNumber) return null;\r
          return passedOutSnap.docs\r
            .map(d => ({ id: d.id, ...d.data(), archived: true }))\r
            .find((student) => String(student.srNumber || "").trim().toLowerCase() === normalizedSrNumber) || null;\r
        }\r
\r
        async function generateUniqueStudentId(existing = null) {\r
          const ids = existing || await getExistingStudentIds();\r
          const currentYear = new Date().getFullYear();\r
          const yearPrefix = String(currentYear).slice(-2); // Last 2 digits of current year (e.g., "26" for 2026)\r
\r
          let gen = "";\r
          let attempts = 0;\r
          do {\r
            // Generate 4 random digits\r
            const randomDigits = String(Math.floor(1000 + Math.random() * 9000));\r
            gen = yearPrefix + randomDigits; // Combine year prefix with 4 random digits\r
            attempts++;\r
            if (attempts > 10000) { // Prevent infinite loop\r
              throw new Error("Unable to generate unique student ID after maximum attempts");\r
            }\r
          } while (ids.includes(gen));\r
\r
          return gen;\r
        }\r
\r
        window.generateStudentId = async () => {\r
          try { $("studentId").value = await generateUniqueStudentId(); showToast("Student ID generated.", "info"); }\r
          catch (e) { showToast("Unable to generate student ID.", "error"); }\r
        };\r
\r
        async function assignAutoSection(studentClass, maxPerSection) {\r
          try {\r
            const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
\r
            const counts = {};\r
            snap.forEach((d) => {\r
              const student = d.data();\r
              if (normalizeClassValue(student.class) !== normalizeClassValue(studentClass)) return;\r
              const section = normalizeSectionValue(student.section || "A") || "A";\r
              counts[section] = (counts[section] || 0) + 1;\r
            });\r
\r
            const capacity = Math.max(1, Number(maxPerSection) || Number(savedMaxPerSection) || 40);\r
            const sections = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));\r
            const available = sections.filter((section) => (counts[section] || 0) < capacity);\r
            const candidates = available.length ? available : sections;\r
            return candidates.sort((a, b) =>\r
              (counts[a] || 0) - (counts[b] || 0) || a.localeCompare(b)\r
            )[0] || "A";\r
\r
          } catch (e) {\r
            return "A";\r
          }\r
        }\r
        async function updateRolls(studentClass, section, preloadedStudents = null) {\r
          const assignedRolls = new Map();\r
          try {\r
            const rawStudents = preloadedStudents || (await getDocs(collection(db, "schools", currentUser.uid, "students"))).docs.map(d => ({ id: d.id, ...d.data() }));\r
            const students = rawStudents.filter(student => sameClassSection(student, studentClass, section));\r
            students.sort((a, b) =>\r
              String(a.name || "").trim().localeCompare(String(b.name || "").trim(), "en", { sensitivity: "base", numeric: true }) ||\r
              String(a.studentId || a.id || "").localeCompare(String(b.studentId || b.id || ""), "en", { numeric: true })\r
            );\r
            const sessionMeta = getSelectedSessionMeta();\r
            const updatePromises = [];\r
            for (let i = 0; i < students.length; i++) {\r
              const roll = String(i + 1).padStart(2, "0");\r
              const student = students[i];\r
              assignedRolls.set(student.id, roll);\r
              const currentPlacementRoll = sessionMeta.sessionId ? student.sessionPlacements?.[sessionMeta.sessionId]?.roll : null;\r
              const rollChanged = (student.roll !== roll) || (student.rollNo !== roll) || (currentPlacementRoll !== null && currentPlacementRoll !== roll);\r
              if (rollChanged && student.id) {\r
                const updatePayload = { roll, rollNo: roll, updatedAt: new Date() };\r
                if (sessionMeta.sessionId) {\r
                  updatePayload[\`sessionPlacements.\${sessionMeta.sessionId}\`] = makeSessionPlacement(\r
                    { ...student, roll, rollNo: roll },\r
                    sessionMeta,\r
                    { roll }\r
                  );\r
                }\r
                updatePromises.push(updateDoc(doc(db, "schools", currentUser.uid, "students", student.id), updatePayload));\r
                const mirrorIds = [student.studentId, student.authUid].map(value => String(value || "").trim()).filter(Boolean);\r
                [...new Set(mirrorIds)].forEach((id) => {\r
                  updatePromises.push(setDoc(doc(db, "users", id), { rollNo: roll, roll, updatedAt: Date.now() }, { merge: true }).catch(() => {}));\r
                });\r
              }\r
            }\r
            if (updatePromises.length > 0) {\r
              await Promise.all(updatePromises);\r
            }\r
          } catch (e) { console.error("Roll update failed:", e); }\r
          return assignedRolls;\r
        }\r
\r
        async function findExistingFeeRecord(studentId, monthName) {\r
          const snap = await getDocs(query(collection(db, "schools", currentUser.uid, "fees"), where("studentId", "==", studentId)));\r
          return snap.docs\r
            .map(d => ({ id: d.id, ...d.data() }))\r
            .filter(f => feeBelongsToSelectedSession(f) && String(f.month || "").toLowerCase() === String(monthName || "").toLowerCase())\r
            .sort((a, b) => (toDate(b.updatedAt) || toDate(b.date) || 0) - (toDate(a.updatedAt) || toDate(a.date) || 0))[0] || null;\r
        }\r
\r
        function feeDocIdPart(value, fallback) {\r
          return String(value || fallback || "")\r
            .trim()\r
            .toLowerCase()\r
            .replace(/[^a-z0-9]+/g, "-")\r
            .replace(/^-+|-+$/g, "")\r
            .slice(0, 70) || fallback;\r
        }\r
\r
        function deterministicMonthlyFeeDocId(studentId, month, feeType = "monthly") {\r
          const meta = getSelectedSessionMeta();\r
          const sessionKey = meta.sessionId || meta.session || "current";\r
          return [\r
            "monthly-fee",\r
            feeDocIdPart(sessionKey, "current"),\r
            feeDocIdPart(studentId, "student"),\r
            feeDocIdPart(month, "month"),\r
            feeDocIdPart(feeType, "monthly")\r
          ].join("_");\r
        }\r
\r
        async function createMonthlyFeeIfMissing(studentId, month, payload, feeType = "monthly") {\r
          const existing = await findExistingFeeRecord(studentId, month);\r
          if (existing) return { created: false, fee: existing };\r
\r
          const feeRef = doc(db, "schools", currentUser.uid, "fees", deterministicMonthlyFeeDocId(studentId, month, feeType));\r
          const feeSnap = await getDoc(feeRef);\r
          if (feeSnap.exists()) return { created: false, fee: { id: feeRef.id, ...feeSnap.data() } };\r
\r
          // Monthly fee records used random addDoc() IDs, so repeated saves could create\r
          // duplicates. This deterministic ID makes student + session + month + fee type\r
          // idempotent while keeping the stored fee payload backward-compatible.\r
          await setDoc(feeRef, payload, { merge: false });\r
          return { created: true, id: feeRef.id, fee: { id: feeRef.id, ...payload } };\r
        }\r
\r
        function showRecentStudent(student) {\r
          recentStudent = student;\r
          $("recentStudentCard").style.display = "block";\r
          $("printRecentBtn").style.display = "inline-flex";\r
          $("recentStudentInfo").innerHTML = \`\r
            \${student.photoUrl ? \`<img src="\${escapeHtml(student.photoUrl)}" alt="\${escapeHtml(student.name || "Student")} photo" style="width:74px;height:74px;border-radius:14px;object-fit:cover;border:1px solid #d7e3f4;margin:0 0 10px;display:block">\` : ""}\r
            <strong>\${escapeHtml(student.name || "")}</strong><br>\r
            \${escapeHtml(student.class || "")}-\${escapeHtml(student.section || "")} | ID: \${escapeHtml(student.studentId || "")}<br>\r
            Father: \${escapeHtml(student.father || "")} (\${escapeHtml(student.fatherPhone || student.phone || "")})<br>\r
            Mother: \${escapeHtml(student.mother || "")} (\${escapeHtml(student.motherPhone || student.phone || "")})\`;\r
        }\r
\r
        function resetStudentForm() {\r
          ["name", "section", "yearOfAdmission", "studentId", "srNumber", "gender", "category", "aadharNumber", "bloodGroup", "religion", "previousSchool", "studentEmail", "parentEmail", "studentPassword", "father", "fatherPhone", "mother", "motherPhone", "phone", "address", "documentList", "dob", "dateOfAdmission"].forEach(id => { const el=$(id); if(el) el.value=""; }); const cls=$("class"); if(cls) cls.value="";\r
          const status = $("studentStatus");\r
          if (status) status.value = "Active";\r
          const photoInput = $("studentPhoto");\r
          if (photoInput) photoInput.value = "";\r
          updateStudentPhotoPreview();\r
          setDefaults();\r
          $("autoFeeInfo").style.display = "none";\r
        }\r
\r
        function normalizeAdmissionDate(value) {\r
          if (!value) return "";\r
          if (value instanceof Date && !isNaN(value.getTime())) return value.toISOString().slice(0, 10);\r
          const text = String(value || "").trim();\r
          if (/^\\d{4}-\\d{2}-\\d{2}$/.test(text)) return text;\r
          const parsed = new Date(text);\r
          return isNaN(parsed.getTime()) ? text : parsed.toISOString().slice(0, 10);\r
        }\r
\r
        function getStudentPayloadFromForm() {\r
          return {\r
            name: $("name").value.trim(),\r
            studentClass: $("class").value,\r
            section: $("section").value.trim(),\r
            maxPerSection: parseInt($("maxPerSection").value, 10) || 0,\r
            yearOfAdmission: $("yearOfAdmission").value.trim(),\r
            currentYear: $("currentYear").value.trim(),\r
            studentId: $("studentId").value.trim(),\r
            srNumber: $("srNumber").value.trim(),\r
            gender: $("gender").value.trim(),\r
            category: $("category").value.trim(),\r
            aadharNumber: $("aadharNumber").value.trim(),\r
            bloodGroup: $("bloodGroup").value.trim(),\r
            religion: $("religion").value.trim(),\r
            previousSchool: $("previousSchool").value.trim(),\r
            status: $("studentStatus").value.trim(),\r
            studentEmail: $("studentEmail").value.trim(),\r
            parentEmail: $("parentEmail").value.trim(),\r
            studentPassword: $("studentPassword").value.trim(),\r
            father: $("father").value.trim(),\r
            fatherPhone: $("fatherPhone").value.trim(),\r
            mother: $("mother").value.trim(),\r
            motherPhone: $("motherPhone").value.trim(),\r
            phone: $("phone").value.trim(),\r
            address: $("address").value.trim(),\r
            documentList: $("documentList").value.trim(),\r
            dob: $("dob").value,\r
            dateOfAdmission: $("dateOfAdmission").value,\r
            photoFile: $("studentPhoto")?.files?.[0] || null\r
          };\r
        }\r
\r
        function validateStudentPayload(payload, label = "Student") {\r
          if (!payload.name || !payload.studentClass || !payload.yearOfAdmission || !payload.currentYear || !payload.father || !payload.fatherPhone || !payload.mother || !payload.motherPhone || !payload.dateOfAdmission) {\r
            throw new Error(\`\${label}: required fields missing.\`);\r
          }\r
          if (payload.aadharNumber && !/^\\d{12}$/.test(payload.aadharNumber)) {\r
            throw new Error(\`\${label}: Aadhaar number must contain 12 digits.\`);\r
          }\r
          if (!payload.studentEmail || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(payload.studentEmail)) {\r
            throw new Error(\`\${label}: valid registered email is required.\`);\r
          }\r
          if (payload.parentEmail && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(payload.parentEmail)) {\r
            throw new Error(\`\${label}: parent email is invalid.\`);\r
          }\r
          if (payload.studentPassword && payload.studentPassword.length < 6) {\r
            throw new Error(\`\${label}: password must be at least 6 characters when entered.\`);\r
          }\r
        }\r
\r
        function generateLoginPassword(studentId = "", srNumber = "") {\r
          const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";\r
          const random = new Uint32Array(6);\r
          crypto.getRandomValues(random);\r
          const token = Array.from(random, (value) => alphabet[value % alphabet.length]).join("");\r
          return \`Sx\${token}\`;\r
        }\r
\r
        async function sendStudentRegistrationEmail(student, temporaryPassword, feeAmount = 0, feeMonth = "") {\r
          if (!student?.email) return { success: false, skipped: true };\r
          const payload = {\r
            recipients: [student.email],\r
            schoolName: student.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix",\r
            studentName: student.name,\r
            studentId: student.studentId,\r
            srNumber: student.srNumber,\r
            className: student.class,\r
            section: student.section,\r
            roll: student.roll || student.rollNo || "",\r
            father: student.father,\r
            fatherPhone: student.fatherPhone,\r
            mother: student.mother,\r
            motherPhone: student.motherPhone,\r
            phone: student.phone,\r
            gender: student.gender,\r
            category: student.category,\r
            bloodGroup: student.bloodGroup,\r
            religion: student.religion,\r
            previousSchool: student.previousSchool,\r
            aadharNumber: student.aadharNumber,\r
            dob: student.dob,\r
            dateOfAdmission: student.dateOfAdmission || student.admissionDate,\r
            yearOfAdmission: student.yearOfAdmission,\r
            academicSession: student.academicSession || student.session || student.currentYear,\r
            loginEmail: student.email,\r
            parentEmail: student.parentEmail,\r
            address: student.address,\r
            documentList: student.documentList || student.documents,\r
            status: student.status,\r
            feeAmount,\r
            feeMonth,\r
            temporaryPassword\r
          };\r
\r
          const response = await fetch(REGISTRATION_EMAIL_FUNCTION_URL, {\r
            method: "POST",\r
            headers: {\r
              "Content-Type": "application/json",\r
              "apikey": SUPABASE_ANON_KEY,\r
              "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
            },\r
            body: JSON.stringify(payload)\r
          });\r
          const data = await response.json().catch(() => ({}));\r
          if (!response.ok) throw new Error(data.error || data.details || "Registration email failed");\r
          return data;\r
        }\r
\r
        async function createStudentAdmission(rawPayload, options = {}) {\r
          const payload = {\r
            ...rawPayload,\r
            name: String(rawPayload.name || "").trim(),\r
            studentClass: normalizeClassValue(rawPayload.studentClass || rawPayload.class),\r
            section: normalizeSectionValue(rawPayload.section),\r
            maxPerSection: parseInt(rawPayload.maxPerSection, 10) || parseInt(savedMaxPerSection, 10) || 40,\r
            yearOfAdmission: String(rawPayload.yearOfAdmission || "").trim(),\r
            currentYear: String(rawPayload.currentYear || "").trim(),\r
            studentId: String(rawPayload.studentId || "").trim(),\r
            srNumber: String(rawPayload.srNumber || "").trim(),\r
            gender: String(rawPayload.gender || "").trim(),\r
            category: String(rawPayload.category || "").trim(),\r
            aadharNumber: String(rawPayload.aadharNumber || "").trim(),\r
            bloodGroup: String(rawPayload.bloodGroup || "").trim(),\r
            religion: String(rawPayload.religion || "").trim(),\r
            previousSchool: String(rawPayload.previousSchool || "").trim(),\r
            status: String(rawPayload.status || "Active").trim() || "Active",\r
            studentEmail: String(rawPayload.studentEmail || "").trim().toLowerCase(),\r
            parentEmail: String(rawPayload.parentEmail || "").trim().toLowerCase(),\r
            studentPassword: String(rawPayload.studentPassword || "").trim(),\r
            father: String(rawPayload.father || "").trim(),\r
            fatherPhone: String(rawPayload.fatherPhone || "").trim(),\r
            mother: String(rawPayload.mother || "").trim(),\r
            motherPhone: String(rawPayload.motherPhone || "").trim(),\r
            phone: String(rawPayload.phone || rawPayload.fatherPhone || rawPayload.motherPhone || "").trim(),\r
            address: String(rawPayload.address || "").trim(),\r
            documentList: String(rawPayload.documentList || rawPayload.documents || "").trim(),\r
            dob: normalizeAdmissionDate(rawPayload.dob),\r
            dateOfAdmission: normalizeAdmissionDate(rawPayload.dateOfAdmission)\r
          };\r
          validateStudentPayload(payload, options.label || payload.name || "Student");\r
\r
          const sessionMeta = getSelectedSessionMeta();\r
\r
          // 1. Single consolidated prefetch for all validation & ID generation\r
          const [studentSnap, passedOutSnap] = await Promise.all([\r
            getDocs(collection(db, "schools", currentUser.uid, "students")),\r
            getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
          ]);\r
          const activeStudents = studentSnap.docs.map(d => ({ id: d.id, ...d.data() }));\r
          const passedOutStudents = passedOutSnap.docs.map(d => ({ id: d.id, ...d.data(), archived: true }));\r
          const allExistingStudents = [...activeStudents, ...passedOutStudents];\r
\r
          // 2. Generate SR number if not provided (in-memory)\r
          const existingSrList = allExistingStudents.map(s => String(s.srNumber || "").trim()).filter(Boolean);\r
          if (!payload.srNumber) {\r
            const pattern = getNextSrPattern(existingSrList, options.srSeed || "");\r
            let nextNum = Math.max(1, Number(pattern.number || 1));\r
            const takenSet = new Set(existingSrList.map(s => s.toLowerCase()));\r
            while (takenSet.has(formatSrNumber(pattern, nextNum).toLowerCase())) {\r
              nextNum++;\r
            }\r
            payload.srNumber = formatSrNumber(pattern, nextNum);\r
          }\r
\r
          // 3. Fast in-memory duplicate check\r
          const normalizedStudentId = String(payload.studentId || "").trim();\r
          const normalizedEmail = String(payload.studentEmail || "").trim().toLowerCase();\r
          const normalizedSrNumber = String(payload.srNumber || "").trim().toLowerCase();\r
          const duplicateMatch = allExistingStudents.find((s) => {\r
            const sId = String(s.studentId || "").trim();\r
            const sEmail = String(s.email || "").trim().toLowerCase();\r
            const sSr = String(s.srNumber || "").trim().toLowerCase();\r
            return (normalizedStudentId && sId === normalizedStudentId) ||\r
                   (normalizedEmail && sEmail === normalizedEmail) ||\r
                   (normalizedSrNumber && sSr === normalizedSrNumber);\r
          });\r
          if (duplicateMatch) {\r
            throw new Error("A student with this ID, email, or SR number already exists in this school.");\r
          }\r
\r
          // 4. Generate Student ID if needed (in-memory)\r
          let studentId = payload.studentId;\r
          const existingIds = activeStudents.map(s => String(s.studentId || "").trim()).filter(Boolean);\r
          if (!studentId) {\r
            studentId = await generateUniqueStudentId(existingIds);\r
          } else if (existingIds.includes(studentId)) {\r
            throw new Error("This student ID is already in use.");\r
          }\r
\r
          if (!payload.studentPassword) {\r
            payload.studentPassword = generateLoginPassword(studentId, payload.srNumber);\r
          }\r
\r
          // 5. Section assignment (in-memory)\r
          let section = payload.section;\r
          if (!section) {\r
            const counts = {};\r
            activeStudents.forEach((student) => {\r
              if (normalizeClassValue(student.class) !== normalizeClassValue(payload.studentClass)) return;\r
              const sec = normalizeSectionValue(student.section || "A") || "A";\r
              counts[sec] = (counts[sec] || 0) + 1;\r
            });\r
            // Test imports intentionally fill a section to 20 before opening the next one.\r
            // Regular admissions continue to use the administrator's configured limit.\r
            const capacity = options.isTestBulkImport\r
              ? 20\r
              : Math.max(1, Number(payload.maxPerSection) || Number(savedMaxPerSection) || 40);\r
            const sections = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));\r
            const available = sections.filter((s) => (counts[s] || 0) < capacity);\r
            if (options.isTestBulkImport) {\r
              // Keep test rows together rather than spreading them across sections.\r
              section = available[0] || sections[sections.length - 1] || "A";\r
            } else {\r
              const candidates = available.length ? available : sections;\r
              section = candidates.sort((a, b) => (counts[a] || 0) - (counts[b] || 0) || a.localeCompare(b))[0] || "A";\r
            }\r
          }\r
\r
          // 6. Pre-calculate roll number BEFORE insert\r
          const classmates = activeStudents.filter(s => sameClassSection(s, payload.studentClass, section));\r
          const sortedClassmates = [...classmates, { id: "NEW_STUDENT", name: payload.name, studentId }];\r
          sortedClassmates.sort((a, b) =>\r
            String(a.name || "").trim().localeCompare(String(b.name || "").trim(), "en", { sensitivity: "base", numeric: true }) ||\r
            String(a.studentId || a.id || "").localeCompare(String(b.studentId || b.id || ""), "en", { numeric: true })\r
          );\r
          const newStudentIndex = sortedClassmates.findIndex(s => s.id === "NEW_STUDENT");\r
          const assignedRoll = String(newStudentIndex + 1).padStart(2, "0");\r
\r
          // 7. Photo upload & Auth user creation in parallel\r
          const [photoUpload, studentAuthCred] = await Promise.all([\r
            uploadStudentPhoto(payload.photoFile, studentId),\r
            createUserWithEmailAndPassword(studentCreatorAuth, payload.studentEmail, payload.studentPassword)\r
          ]);\r
          const studentAuthUid = studentAuthCred.user.uid;\r
          const currentSchoolName = window.SchoolBranding?.getSchoolName?.() || "";\r
          const schoolId = String(currentUser.uid || "").trim();\r
\r
          // 8. Session Placement\r
          const placement = sessionMeta.sessionId ? makeSessionPlacement({\r
            name: payload.name, class: payload.studentClass, section,\r
            roll: assignedRoll, rollNo: assignedRoll\r
          }, sessionMeta, { roll: assignedRoll }) : null;\r
\r
          // 9. Fully-hydrated Student Data (No second getDoc/updateDoc needed!)\r
          const studentData = {\r
            studentId, name: payload.name, class: payload.studentClass, section,\r
            roll: assignedRoll, rollNo: assignedRoll,\r
            srNumber: payload.srNumber,\r
            father: payload.father, fatherPhone: payload.fatherPhone,\r
            mother: payload.mother, motherPhone: payload.motherPhone,\r
            phone: payload.phone || payload.fatherPhone || payload.motherPhone,\r
            address: payload.address, dob: payload.dob,\r
            gender: payload.gender,\r
            category: payload.category,\r
            bloodGroup: payload.bloodGroup,\r
            religion: payload.religion,\r
            previousSchool: payload.previousSchool,\r
            documentList: payload.documentList,\r
            documents: payload.documentList,\r
            status: payload.status,\r
            tcIssued: payload.status === "TC Issued",\r
            dateOfAdmission: payload.dateOfAdmission,\r
            yearOfAdmission: payload.yearOfAdmission,\r
            currentYear: sessionMeta.session || payload.currentYear,\r
            sessionId: sessionMeta.sessionId || "",\r
            session: sessionMeta.session || payload.currentYear,\r
            academicSession: sessionMeta.session || payload.currentYear,\r
            sessionPlacements: placement && sessionMeta.sessionId ? { [sessionMeta.sessionId]: placement } : {},\r
            aadharNumber: payload.aadharNumber || "",\r
            email: payload.studentEmail,\r
            parentEmail: payload.parentEmail || payload.studentEmail,\r
            photoUrl: photoUpload.photoUrl,\r
            photoPublicId: photoUpload.photoPublicId,\r
            authUid: studentAuthUid,\r
            schoolId,\r
            adminId: schoolId,\r
            schoolName: currentSchoolName,\r
            createdAt: new Date(),\r
            updatedAt: new Date()\r
          };\r
\r
          // 10. Insert student & user mirror documents in parallel\r
          const studentRef = await addDoc(collection(db, "schools", currentUser.uid, "students"), studentData);\r
          const userMirror = {\r
            ...studentData,\r
            authUid: studentAuthUid,\r
            studentDocId: studentRef.id,\r
            role: "student",\r
            authProvider: "firebase",\r
            authEmail: payload.studentEmail\r
          };\r
          await Promise.all([\r
            setDoc(doc(db, "users", studentId), { uid: studentId, ...userMirror }),\r
            setDoc(doc(db, "users", studentAuthUid), { uid: studentAuthUid, ...userMirror })\r
          ]);\r
\r
          // 11. Update other classmates whose roll numbers shifted (parallel, fast)\r
          const classmateUpdates = [];\r
          for (let i = 0; i < sortedClassmates.length; i++) {\r
            const item = sortedClassmates[i];\r
            if (item.id === "NEW_STUDENT") continue;\r
            const expectedRoll = String(i + 1).padStart(2, "0");\r
            if (item.roll !== expectedRoll || item.rollNo !== expectedRoll) {\r
              const uPayload = { roll: expectedRoll, rollNo: expectedRoll, updatedAt: new Date() };\r
              if (sessionMeta.sessionId) {\r
                uPayload[\`sessionPlacements.\${sessionMeta.sessionId}\`] = makeSessionPlacement(\r
                  { ...item, roll: expectedRoll, rollNo: expectedRoll },\r
                  sessionMeta,\r
                  { roll: expectedRoll }\r
                );\r
              }\r
              classmateUpdates.push(\r
                updateDoc(doc(db, "schools", currentUser.uid, "students", item.id), uPayload)\r
              );\r
              const mIds = [item.studentId, item.authUid].map(v => String(v || "").trim()).filter(Boolean);\r
              [...new Set(mIds)].forEach(mid => {\r
                classmateUpdates.push(\r
                  setDoc(doc(db, "users", mid), { rollNo: expectedRoll, roll: expectedRoll, updatedAt: Date.now() }, { merge: true }).catch(() => {})\r
                );\r
              });\r
            }\r
          }\r
          if (classmateUpdates.length > 0) {\r
            await Promise.all(classmateUpdates);\r
          }\r
\r
          // Re-read this class-section after the insert. This keeps rolls correct\r
          // even when another admission was saved at nearly the same time.\r
          // Example: Ansh (01), Dhruv (02), Shreshth (03).\r
          await updateRolls(payload.studentClass, section);\r
\r
          // 12. Create auto monthly fee if configured\r
          const feeAmount = Number(feeConfig[payload.studentClass] || 0);\r
          const currentMonth = currentMonthName();\r
          if (feeAmount > 0) {\r
            await createMonthlyFeeIfMissing(studentId, currentMonth, {\r
              studentId, studentDocId: studentRef.id, studentName: payload.name,\r
              roll: assignedRoll, class: payload.studentClass, section,\r
              amount: feeAmount, originalAmount: feeAmount,\r
              paidAmount: 0, totalPaidAmount: 0,\r
              totalExtraPaidAmount: 0, totalCollectedAmount: 0,\r
              remainingAmount: feeAmount,\r
              status: "Imposed", month: currentMonth,\r
              date: new Date(), autoImposed: true, imposedDate: new Date(),\r
              ...sessionFeeFields(),\r
              payments: [], remarks: "",\r
              createdBy: currentUser.email || ""\r
            });\r
          }\r
\r
          const savedStudent = { id: studentRef.id, ...studentData };\r
\r
          // 13. Send registration email asynchronously in the background so it never slows down UI\r
          if (savedStudent.email) {\r
            sendStudentRegistrationEmail(savedStudent, payload.studentPassword, feeAmount, currentMonth)\r
              .catch(err => console.warn("Background registration email notice:", err));\r
          }\r
\r
          return { savedStudent, feeAmount, currentMonth, registrationEmailSent: true, registrationEmailError: "" };\r
        }\r
\r
        window.addStudent = async () => {\r
          const btn = document.querySelector("button[onclick*='addStudent']");\r
          const originalText = btn ? btn.textContent : "";\r
          try {\r
            if (!ensureSessionEditable("Admission and fee creation")) return;\r
            if (btn) {\r
              btn.disabled = true;\r
              btn.textContent = "Adding student...";\r
            }\r
            const result = await createStudentAdmission(getStudentPayloadFromForm());\r
            showRecentStudent(result.savedStudent);\r
            resetStudentForm();\r
            showToast(\`Student added successfully! \${result.feeAmount > 0 ? \`\${formatCurrency(result.feeAmount)} fee imposed for \${result.currentMonth}.\` : ""}\`, "success");\r
          } catch (e) {\r
            console.error("Student add failed:", e);\r
            showToast(e.message || "Unable to add student.", "error");\r
          } finally {\r
            if (btn) {\r
              btn.disabled = false;\r
              btn.textContent = originalText;\r
            }\r
          }\r
        };\r
\r
        const BULK_STUDENT_HEADERS = [\r
          "srNumber", "name", "class", "section", "studentId", "gender", "category", "aadharNumber", "bloodGroup", "religion", "previousSchool", "status", "documentList", "studentEmail", "parentEmail",\r
          "studentPassword", "father", "fatherPhone", "mother", "motherPhone", "phone",\r
          "dob", "dateOfAdmission", "yearOfAdmission", "currentYear", "address", "maxPerSection"\r
        ];\r
\r
        const BULK_HEADER_ALIASES = {\r
          srNumber: ["srnumber", "srno", "scholarregister", "scholarno", "serialnumber"],\r
          name: ["name", "studentname", "student"],\r
          studentClass: ["class", "studentclass", "classname"],\r
          section: ["section", "sec"],\r
          studentId: ["studentid", "admissionno", "admissionnumber", "registrationid"],\r
          gender: ["gender", "sex"],\r
          category: ["category", "castecategory"],\r
          aadharNumber: ["aadharnumber", "aadhaar", "aadhaarnumber", "aadhar"],\r
          bloodGroup: ["bloodgroup", "blood"],\r
          religion: ["religion"],\r
          previousSchool: ["previousschool", "lastschool", "prevschool"],\r
          status: ["status", "studentstatus"],\r
          documentList: ["documentlist", "documents", "docs", "submitteddocuments"],\r
          studentEmail: ["studentemail", "registeredemail", "email", "loginemail"],\r
          parentEmail: ["parentemail", "guardianemail"],\r
          studentPassword: ["studentpassword", "password", "loginpassword"],\r
          father: ["father", "fathername"],\r
          fatherPhone: ["fatherphone", "fatherphonenumber", "fathermobile"],\r
          mother: ["mother", "mothername"],\r
          motherPhone: ["motherphone", "motherphonenumber", "mothermobile"],\r
          phone: ["phone", "primaryphone", "contact", "contactnumber", "mobile"],\r
          dob: ["dob", "dateofbirth", "birthdate"],\r
          dateOfAdmission: ["dateofadmission", "admissiondate", "dateadmission"],\r
          yearOfAdmission: ["yearofadmission", "admissionyear"],\r
          currentYear: ["currentyear", "academicsession", "session", "academicyear"],\r
          address: ["address"],\r
          maxPerSection: ["maxpersection", "sectionlimit", "maxstudentspersection"]\r
        };\r
\r
        function normalizeBulkHeader(value) {\r
          return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");\r
        }\r
\r
        function canonicalBulkKey(header) {\r
          const normalized = normalizeBulkHeader(header);\r
          for (const [key, aliases] of Object.entries(BULK_HEADER_ALIASES)) {\r
            if (aliases.includes(normalized)) return key;\r
          }\r
          return "";\r
        }\r
\r
        function parseCsvText(text) {\r
          const rows = [];\r
          let row = [], value = "", quoted = false;\r
          for (let i = 0; i < text.length; i += 1) {\r
            const ch = text[i];\r
            const next = text[i + 1];\r
            if (ch === '"' && quoted && next === '"') {\r
              value += '"';\r
              i += 1;\r
            } else if (ch === '"') {\r
              quoted = !quoted;\r
            } else if (ch === "," && !quoted) {\r
              row.push(value);\r
              value = "";\r
            } else if ((ch === "\\n" || ch === "\\r") && !quoted) {\r
              if (ch === "\\r" && next === "\\n") i += 1;\r
              row.push(value);\r
              if (row.some((cell) => String(cell).trim())) rows.push(row);\r
              row = [];\r
              value = "";\r
            } else {\r
              value += ch;\r
            }\r
          }\r
          row.push(value);\r
          if (row.some((cell) => String(cell).trim())) rows.push(row);\r
          return rows;\r
        }\r
\r
        function rowsToObjects(rows) {\r
          const headers = rows[0] || [];\r
          return rows.slice(1).map((row) => {\r
            const obj = {};\r
            headers.forEach((header, index) => {\r
              const key = canonicalBulkKey(header);\r
              if (key) obj[key] = row[index] ?? "";\r
            });\r
            return obj;\r
          }).filter((row) => Object.values(row).some((value) => String(value || "").trim()));\r
        }\r
\r
        async function readBulkStudentRows(file) {\r
          const ext = String(file.name || "").split(".").pop().toLowerCase();\r
          if (ext === "csv") {\r
            return rowsToObjects(parseCsvText(await file.text()));\r
          }\r
          if (!window.XLSX) {\r
            throw new Error("Excel parser is still loading. Please try again in a moment, or upload CSV.");\r
          }\r
          const workbook = window.XLSX.read(await file.arrayBuffer(), { type: "array", cellDates: true });\r
          const sheet = workbook.Sheets[workbook.SheetNames[0]];\r
          const rawRows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false });\r
          return rowsToObjects(rawRows);\r
        }\r
\r
        function withBulkDefaults(row) {\r
          const today = new Date().toISOString().slice(0, 10);\r
          const formLimit = parseInt($("maxPerSection")?.value || savedMaxPerSection, 10) || 0;\r
          return {\r
            ...row,\r
            studentClass: row.studentClass || row.class,\r
            maxPerSection: parseInt(row.maxPerSection, 10) || formLimit,\r
            dateOfAdmission: row.dateOfAdmission || $("dateOfAdmission")?.value || today,\r
            yearOfAdmission: row.yearOfAdmission || $("yearOfAdmission")?.value || String(new Date().getFullYear()),\r
            currentYear: row.currentYear || $("currentYear")?.value || academicYearFromToday()\r
          };\r
        }\r
\r
        function isTestBulkStudent(row) {\r
          const studentId = String(row?.studentId || "").trim();\r
          return /^TEST\\d+$/i.test(studentId);\r
        }\r
\r
        async function assignBulkSrNumbers(rows) {\r
          const normalizedRows = rows.map((row) => ({ ...row, srNumber: String(row.srNumber || "").trim() }));\r
          const fileTaken = new Set();\r
          const duplicateInFile = normalizedRows.find((row) => {\r
            if (!row.srNumber) return false;\r
            const key = row.srNumber.toLowerCase();\r
            if (fileTaken.has(key)) return true;\r
            fileTaken.add(key);\r
            return false;\r
          });\r
          if (duplicateInFile) throw new Error(\`Duplicate SR number in import file: \${duplicateInFile.srNumber}\`);\r
\r
          const blankIndexes = normalizedRows\r
            .map((row, index) => row.srNumber ? -1 : index)\r
            .filter((index) => index >= 0);\r
          if (!blankIndexes.length) return normalizedRows;\r
\r
          const seed = normalizedRows.find((row) => row.srNumber)?.srNumber || $("srNumber")?.value || "";\r
          const generated = await generateUniqueSrNumbers(blankIndexes.length, seed, normalizedRows.map((row) => row.srNumber));\r
          blankIndexes.forEach((rowIndex, generatedIndex) => {\r
            normalizedRows[rowIndex].srNumber = generated[generatedIndex];\r
          });\r
          return normalizedRows;\r
        }\r
\r
        function renderBulkResults(results) {\r
          const target = $("bulkImportResults");\r
          if (!target) return;\r
          target.classList.add("show");\r
          const ok = results.filter((item) => item.ok).length;\r
          const failed = results.length - ok;\r
          target.innerHTML = \`\r
            <strong>Import finished: \${ok} added, \${failed} failed.</strong>\r
            <div style="margin-top:10px;display:grid;gap:6px">\r
              \${results.map((item) => \`<div><span class="\${item.ok ? "ok" : "fail"}">\${item.ok ? "Added" : "Failed"}</span> Row \${item.row}: \${escapeHtml(item.name || "")}\${item.studentId ? \` (\${escapeHtml(item.studentId)})\` : ""}\${item.message ? \` - \${escapeHtml(item.message)}\` : ""}</div>\`).join("")}\r
            </div>\`;\r
        }\r
\r
        window.downloadBulkStudentTemplate = () => {\r
          const sample = [\r
            BULK_STUDENT_HEADERS,\r
            ["", "Aarav Sharma", "5", "", "", "Male", "General", "", "B+", "", "", "Active", "", "aarav.student@example.com", "parent@example.com", "student123", "Raj Sharma", "9876543210", "Neha Sharma", "9876543211", "", "2015-04-12", new Date().toISOString().slice(0, 10), String(new Date().getFullYear()), $("currentYear")?.value || academicYearFromToday(), "Student address", $("maxPerSection")?.value || savedMaxPerSection || "40"]\r
          ];\r
          const csv = sample.map((row) => row.map((cell) => \`"\${String(cell ?? "").replace(/"/g, '""')}"\`).join(",")).join("\\n");\r
          const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));\r
          const link = document.createElement("a");\r
          link.href = url;\r
          link.download = "schoolix-student-bulk-template.csv";\r
          link.click();\r
          URL.revokeObjectURL(url);\r
        };\r
\r
        window.importBulkStudents = async () => {\r
          const file = $("bulkStudentFile")?.files?.[0];\r
          if (!file) return showToast("Select an Excel or CSV file first.", "error");\r
          if (!ensureSessionEditable("Bulk admission import")) return;\r
          const button = $("bulkImportBtn");\r
          const previousLabel = button?.textContent || "Import Students";\r
          const results = [];\r
          try {\r
            if (button) { button.disabled = true; button.textContent = "Importing..."; }\r
            const rows = await assignBulkSrNumbers((await readBulkStudentRows(file)).map(withBulkDefaults));\r
            if (!rows.length) throw new Error("No student rows found in the file.");\r
            const seenEmails = new Set();\r
            const seenIds = new Set();\r
            rows.forEach((row, index) => {\r
              const label = \`Row \${index + 2}\`;\r
              validateStudentPayload({\r
                ...row,\r
                studentClass: normalizeClassValue(row.studentClass || row.class),\r
                maxPerSection: parseInt(row.maxPerSection, 10) || 0,\r
                studentEmail: String(row.studentEmail || "").trim().toLowerCase(),\r
                parentEmail: String(row.parentEmail || "").trim().toLowerCase(),\r
                studentPassword: String(row.studentPassword || "").trim(),\r
                dateOfAdmission: normalizeAdmissionDate(row.dateOfAdmission)\r
              }, label);\r
              const email = String(row.studentEmail || "").trim().toLowerCase();\r
              const id = String(row.studentId || "").trim();\r
              if (seenEmails.has(email)) throw new Error(\`\${label}: duplicate email in import file.\`);\r
              if (id && seenIds.has(id)) throw new Error(\`\${label}: duplicate student ID in import file.\`);\r
              seenEmails.add(email);\r
              if (id) seenIds.add(id);\r
            });\r
\r
            for (let index = 0; index < rows.length; index += 1) {\r
              const rowNumber = index + 2;\r
              const row = rows[index];\r
              try {\r
                const result = await createStudentAdmission(row, {\r
                  label: \`Row \${rowNumber}\`,\r
                  isTestBulkImport: isTestBulkStudent(row)\r
                });\r
                results.push({ ok: true, row: rowNumber, name: result.savedStudent.name, studentId: result.savedStudent.studentId });\r
              } catch (error) {\r
                console.error("Bulk student import row failed:", rowNumber, error);\r
                results.push({ ok: false, row: rowNumber, name: row.name, studentId: row.studentId, message: error.message || "Unable to import row." });\r
              }\r
            }\r
            renderBulkResults(results);\r
            const imported = results.filter((item) => item.ok).length;\r
            showToast(\`\${imported} student(s) imported from \${file.name}.\`, imported ? "success" : "error");\r
          } catch (error) {\r
            console.error("Bulk import failed:", error);\r
            showToast(error.message || "Unable to import students.", "error");\r
            if (results.length) renderBulkResults(results);\r
          } finally {\r
            if (button) { button.disabled = false; button.textContent = previousLabel; }\r
          }\r
        };\r
\r
        function setFeeFormMode(isEditing) {\r
          $("month").disabled = Boolean(isEditing);\r
          $("saveBtn").textContent = isEditing ? "Update Fee Entry" : "Save Fee Entry";\r
        }\r
\r
        function clearPreview() {\r
          $("autoUpdateAlert").style.display = "none";\r
          $("autoUpdateAlert").classList.remove("warning");\r
          $("autoUpdateMsg").textContent = "";\r
          $("autoUpdateMetrics").innerHTML = "";\r
          $("previewHint").textContent = "";\r
        }\r
\r
        window.resetFeeForm = () => {\r
          $("amount").value = "";\r
          $("status").value = "";\r
          $("feeRemarks").value = "";\r
          $("month").value = currentMonthName();\r
          existingFeeId = null; existingFeeData = null;\r
          editingFeeId = null; editingFeeData = null;\r
          setFeeFormMode(false);\r
          clearPreview();\r
        };\r
\r
        async function loadFeesForStudent(studentId) {\r
          const snap = await getDocs(query(collection(db, "schools", currentUser.uid, "fees"), where("studentId", "==", studentId)));\r
          return snap.docs\r
            .map(d => ({ id: d.id, ...d.data() }))\r
            .filter(feeBelongsToSelectedSession)\r
            .sort((a, b) => (toDate(b.updatedAt) || toDate(b.date) || 0) - (toDate(a.updatedAt) || toDate(a.date) || 0));\r
        }\r
\r
        function renderPreview(fee, enteredAmount, status) {\r
          if (!fee) { clearPreview(); return; }\r
          const base = getFeeAmounts(fee);\r
          if (status === "Paid") {\r
            const isZeroAssignedEntry = base.total <= 0 && base.due <= 0;\r
            const appliedNow = isZeroAssignedEntry ? enteredAmount : Math.min(enteredAmount, base.due);\r
            const extraNow = isZeroAssignedEntry ? 0 : Math.max(0, enteredAmount - base.due);\r
            const projApplied = base.applied + appliedNow;\r
            const projExtra = base.extra + extraNow;\r
            const projDue = Math.max(0, base.total - projApplied);\r
            $("autoUpdateMsg").textContent = \`\${fee.month} already exists for this student. The payment will update the same entry.\`;\r
            $("autoUpdateMetrics").innerHTML = \`\r
              <div class="preview-metric"><span>Assigned</span><strong>\${formatCurrency(base.total)}</strong></div>\r
              <div class="preview-metric"><span>Already Applied</span><strong>\${formatCurrency(base.applied)}</strong></div>\r
              <div class="preview-metric"><span>Applied Now</span><strong>\${formatCurrency(appliedNow)}</strong></div>\r
              <div class="preview-metric"><span>Extra Now</span><strong>\${formatCurrency(extraNow)}</strong></div>\r
              <div class="preview-metric"><span>Projected Extra</span><strong>\${formatCurrency(projExtra)}</strong></div>\r
              <div class="preview-metric"><span>Projected Due</span><strong>\${formatCurrency(projDue)}</strong></div>\`;\r
            $("previewHint").textContent = extraNow > 0\r
              ? "The received amount exceeds the current due. The excess will be stored as extra collection and can be adjusted to any month."\r
              : "The payment will be appended to the existing payment history.";\r
            $("autoUpdateAlert").classList.remove("warning");\r
          } else {\r
            const projAssigned = base.total + enteredAmount;\r
            const projDue = base.due + enteredAmount;\r
            $("autoUpdateMsg").textContent = \`\${fee.month} already exists. The entered amount will be added to the same month.\`;\r
            $("autoUpdateMetrics").innerHTML = \`\r
              <div class="preview-metric"><span>Current Assigned</span><strong>\${formatCurrency(base.total)}</strong></div>\r
              <div class="preview-metric"><span>Applied Till Now</span><strong>\${formatCurrency(base.applied)}</strong></div>\r
              <div class="preview-metric"><span>Extra Till Now</span><strong>\${formatCurrency(base.extra)}</strong></div>\r
              <div class="preview-metric"><span>Added Now</span><strong>\${formatCurrency(enteredAmount)}</strong></div>\r
              <div class="preview-metric"><span>Projected Assigned</span><strong>\${formatCurrency(projAssigned)}</strong></div>\r
              <div class="preview-metric"><span>Projected Due</span><strong>\${formatCurrency(projDue)}</strong></div>\`;\r
            $("previewHint").textContent = "Existing payment history and applied amounts will stay intact. Only assigned and due amounts will increase.";\r
            $("autoUpdateAlert").classList.remove("warning");\r
          }\r
          $("autoUpdateAlert").style.display = "block";\r
        }\r
\r
        window.checkAutoUpdate = async () => {\r
          try {\r
            const month = $("month").value;\r
            const status = $("status").value;\r
            const enteredAmount = Number($("amount").value || 0);\r
            if (!currentStudent || !month || !status || enteredAmount <= 0) {\r
              if (!editingFeeId) clearPreview();\r
              existingFeeId = null; existingFeeData = null;\r
              return;\r
            }\r
            if (editingFeeId && editingFeeData) { renderPreview(editingFeeData, enteredAmount, status); return; }\r
            const fee = await findExistingFeeRecord(currentStudent.studentId, month);\r
            existingFeeId = fee?.id || null;\r
            existingFeeData = fee || null;\r
            renderPreview(existingFeeData, enteredAmount, status);\r
          } catch (e) { console.error("Preview update failed:", e); clearPreview(); }\r
        };\r
\r
        async function buildPaymentUpdate(enteredAmount, fee, status, remarks) {\r
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
            const paymentStatus = extraNow > 0 ? (appliedNow > 0 ? "Applied with extra" : "Extra collection") : remaining === 0 ? "Paid" : "Partial paid";\r
\r
            return {\r
              updateData: {\r
                amount: current.total, originalAmount: current.total,\r
                paidAmount: totalApplied, totalPaidAmount: totalApplied,\r
                totalExtraPaidAmount: totalExtra,\r
                totalCollectedAmount: totalApplied + totalExtra,\r
                remainingAmount: remaining,\r
                status: remaining === 0 ? "Paid" : "Partial Paid",\r
                payments: [...payments, {\r
                  receivedAmount: enteredAmount, appliedAmount: appliedNow,\r
                  extraAmount: extraNow, amount: appliedNow,\r
                  date: new Date(), status: paymentStatus,\r
                  remarks: remarks || ""\r
                }],\r
                lastPaymentAmount: enteredAmount, lastAppliedAmount: appliedNow,\r
                lastExtraAmount: extraNow, lastPaymentDate: new Date(),\r
                remarks: remarks || fee.remarks || "",\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
              },\r
              message: extraNow > 0\r
                ? \`Payment saved. \${formatCurrency(appliedNow)} applied and \${formatCurrency(extraNow)} stored as extra collection.\`\r
                : \`Payment saved. \${formatCurrency(appliedNow)} applied to \${fee.month}.\`\r
            };\r
          }\r
\r
          return {\r
            updateData: {\r
              amount: current.total + enteredAmount,\r
              originalAmount: current.total + enteredAmount,\r
              paidAmount: current.applied, totalPaidAmount: current.applied,\r
              totalExtraPaidAmount: current.extra, totalCollectedAmount: current.collected,\r
              remainingAmount: current.due + enteredAmount,\r
              status, payments,\r
              remarks: remarks || fee.remarks || "",\r
              lastPaymentAmount: fee.lastPaymentAmount || 0,\r
              lastAppliedAmount: fee.lastAppliedAmount || 0,\r
              lastExtraAmount: fee.lastExtraAmount || 0,\r
              lastPaymentDate: fee.lastPaymentDate || null,\r
              updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
            },\r
            message: \`\${formatCurrency(enteredAmount)} added to \${fee.month}. Total assigned is now \${formatCurrency(current.total + enteredAmount)}.\`\r
          };\r
        }\r
\r
        window.saveFees = async () => {\r
          try {\r
            if (!ensureSessionEditable("Fee changes")) return;\r
            if (!currentStudent) return showToast("Fetch a student first.", "error");\r
            const enteredAmount = Number($("amount").value || 0);\r
            const status = $("status").value;\r
            const month = $("month").value;\r
            const remarks = $("feeRemarks").value.trim();\r
\r
            if (!month || !status || enteredAmount <= 0) {\r
              return showToast("Enter amount, billing month and status.", "error");\r
            }\r
\r
            const targetFeeId = editingFeeId || existingFeeId;\r
            const targetFeeData = editingFeeData || existingFeeData;\r
\r
            if (targetFeeId && targetFeeData) {\r
              const paymentUpdate = await buildPaymentUpdate(enteredAmount, targetFeeData, status, remarks);\r
              if (!paymentUpdate) return;\r
              await updateDoc(doc(db, "schools", currentUser.uid, "fees", targetFeeId), paymentUpdate.updateData);\r
              showToast(paymentUpdate.message);\r
            } else {\r
              const isPaid = status === "Paid";\r
              const assignedAmount = isPaid ? 0 : enteredAmount;\r
              const newFee = {\r
                studentId: currentStudent.studentId,\r
                studentDocId: currentStudent.id,\r
                studentName: currentStudent.name,\r
                roll: currentStudent.roll || "",\r
                class: currentStudent.class, section: currentStudent.section || "",\r
                amount: assignedAmount, originalAmount: assignedAmount,\r
                paidAmount: isPaid ? enteredAmount : 0,\r
                totalPaidAmount: isPaid ? enteredAmount : 0,\r
                totalExtraPaidAmount: 0,\r
                totalCollectedAmount: isPaid ? enteredAmount : 0,\r
                remainingAmount: isPaid ? 0 : assignedAmount,\r
                status: isPaid ? "Paid" : status,\r
                month, date: new Date(), manualEntry: true,\r
                ...sessionFeeFields(),\r
                remarks: remarks || "",\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || "",\r
                payments: isPaid ? [{\r
                  receivedAmount: enteredAmount, appliedAmount: enteredAmount,\r
                  extraAmount: 0, amount: enteredAmount,\r
                  date: new Date(), status: "Paid", remarks: remarks || ""\r
                }] : []\r
              };\r
              const saveResult = await createMonthlyFeeIfMissing(currentStudent.studentId, month, newFee);\r
              if (!saveResult.created) {\r
                const paymentUpdate = await buildPaymentUpdate(enteredAmount, saveResult.fee, status, remarks);\r
                if (!paymentUpdate) return;\r
                await updateDoc(doc(db, "schools", currentUser.uid, "fees", saveResult.fee.id), paymentUpdate.updateData);\r
              }\r
              showToast(isPaid ? \`New paid fee saved for \${month}.\` : \`New \${status.toLowerCase()} fee saved for \${month}.\`);\r
            }\r
\r
            resetFeeForm();\r
            await viewHistory();\r
          } catch (e) {\r
            console.error("Fee save failed:", e);\r
            showToast(e.message || "Unable to save fee entry.", "error");\r
          }\r
        };\r
\r
        function feeCardHtml(fee) {\r
          const amounts = getFeeAmounts(fee);\r
          const meta = getFeeStatusMeta(fee);\r
          const payments = Array.isArray(fee.payments) ? [...fee.payments].reverse() : [];\r
          const progress = amounts.total > 0 ? Math.min(100, Math.round((amounts.applied / amounts.total) * 100)) : 0;\r
          const source = fee.autoImposed ? "Auto imposed" : fee.adjustmentEntry ? "Extra adjustment" : fee.manualEntry ? "Manual entry" : "Updated record";\r
\r
          return \`\r
            <article class="fee-card \${meta.tone}">\r
              <div class="fee-card-top">\r
                <div>\r
                  <div class="fee-title">\${escapeHtml(fee.month || "Fee entry")}</div>\r
                  <div class="fee-meta">\${formatDate(fee.updatedAt || fee.date)} | \${source}</div>\r
                </div>\r
                <div class="button-row" style="gap:10px">\r
                  <span class="status-chip \${meta.tone}">\${meta.label}</span>\r
                  <button class="btn btn-accent" style="min-height:38px;padding:10px 14px;font-size:13px" onclick="openReceiptModalForFee('\${fee.id}')">Receipt</button>\r
                  <button class="btn btn-secondary" style="min-height:38px;padding:10px 14px" onclick="editFee('\${fee.id}')">Edit</button>\r
                  <button class="btn btn-danger" style="min-height:38px;padding:10px 14px" onclick="deleteFee('\${fee.id}')">Delete</button>\r
                </div>\r
              </div>\r
\r
              <div class="money-grid">\r
                <div class="money-box"><span>Assigned</span><strong>\${formatCurrency(amounts.total)}</strong></div>\r
                <div class="money-box"><span>Applied</span><strong>\${formatCurrency(amounts.applied)}</strong></div>\r
                <div class="money-box"><span>Collected</span><strong>\${formatCurrency(amounts.collected)}</strong></div>\r
                <div class="money-box"><span>Extra</span><strong>\${formatCurrency(amounts.extra)}</strong></div>\r
                <div class="money-box"><span>Due</span><strong>\${formatCurrency(amounts.due)}</strong></div>\r
              </div>\r
\r
              <div>\r
                <div class="progress-track"><div class="progress-fill" style="width:\${progress}%"></div></div>\r
                <div style="margin-top:8px;color:var(--text-soft);font-size:13px">\${progress}% of the assigned amount has been applied.</div>\r
              </div>\r
\r
              \${fee.remarks ? \`<div class="fee-remarks"><strong>Remarks</strong>\${escapeHtml(fee.remarks)}</div>\` : ""}\r
\r
              \${payments.length ? \`\r
                <div class="payment-history">\r
                  <h4>Payment History</h4>\r
                  \${payments.map(p => \`\r
                    <div class="payment-item">\r
                      <div>\r
                        <strong>\${formatDate(p.date)}</strong><br>\r
                        <span style="color:var(--text-soft)">Received \${formatCurrency(p.receivedAmount ?? p.fullAmount ?? p.amount ?? 0)}</span>\r
                        \${p.remarks ? \`<br><span style="color:#8a6a00;font-size:12px">\${escapeHtml(p.remarks)}</span>\` : ""}\r
                      </div>\r
                      <div style="text-align:right">\r
                        <div>Applied \${formatCurrency(p.appliedAmount ?? p.amount ?? 0)}</div>\r
                        <div style="color:var(--accent)">Extra \${formatCurrency(p.extraAmount ?? 0)}</div>\r
                        <div style="color:var(--text-soft)">\${escapeHtml(p.status || "Payment recorded")}</div>\r
                      </div>\r
                    </div>\`).join("")}\r
                </div>\` : ""}\r
            </article>\`;\r
        }\r
\r
        window.viewHistory = async () => {\r
          try {\r
            if (!currentStudent) return showToast("Fetch a student first.", "error");\r
            feeHistory = await loadFeesForStudent(currentStudent.studentId);\r
            renderSummaryBanner(feeHistory);\r
            updateExtraBalanceBanner();\r
            $("historySection").innerHTML = feeHistory.length\r
              ? \`<div class="history-list">\${feeHistory.map(fee => feeCardHtml(fee)).join("")}</div>\`\r
              : \`<div class="empty-state">No fee entries found for this student.</div>\`;\r
            $("printBtn").style.display = "inline-flex";\r
            $("printReceiptBtn").style.display = "inline-flex";\r
            $("downloadStatementBtn").style.display = "inline-flex";\r
          } catch (e) {\r
            console.error("History load failed:", e);\r
            showToast(e.message || "Unable to load fee history.", "error");\r
          }\r
        };\r
\r
        window.fetchStudent = async () => {\r
          try {\r
            const studentId = $("searchId").value.trim();\r
            if (!studentId) return showToast("Enter a student ID.", "error");\r
            const snap = await getDocs(query(collection(db, "schools", currentUser.uid, "students"), where("studentId", "==", studentId)));\r
            if (snap.empty) return showToast("Student not found.", "error");\r
            currentStudent = { id: snap.docs[0].id, ...snap.docs[0].data() };\r
            $("studentName").value = currentStudent.name || "";\r
            $("studentClass").value = \`\${currentStudent.class || ""}-\${currentStudent.section || ""}\`;\r
            $("studentFather").value = currentStudent.father || "";\r
            $("studentFatherPhone").value = currentStudent.fatherPhone || currentStudent.phone || "";\r
            $("studentMother").value = currentStudent.mother || "";\r
            $("studentMotherPhone").value = currentStudent.motherPhone || currentStudent.phone || "";\r
            $("feesModal").style.display = "flex";\r
            $("printBtn").style.display = "inline-flex";\r
            resetFeeForm();\r
            await viewHistory();\r
            showToast("Student loaded.", "info");\r
          } catch (e) {\r
            console.error("Student fetch failed:", e);\r
            showToast(e.message || "Unable to fetch student.", "error");\r
          }\r
        };\r
\r
        window.editFee = (feeId) => {\r
          const fee = feeHistory.find(e => e.id === feeId);\r
          if (!fee) return showToast("Fee entry not found.", "error");\r
          editingFeeId = fee.id; editingFeeData = fee;\r
          existingFeeId = fee.id; existingFeeData = fee;\r
          $("amount").value = String(fee.originalAmount ?? fee.amount ?? 0);\r
          $("month").value = fee.month || "";\r
          $("status").value = fee.status === "Partial Paid" ? "Paid" : fee.status || "Pending";\r
          $("feeRemarks").value = fee.remarks || "";\r
          setFeeFormMode(true);\r
          renderPreview(fee, Number($("amount").value || 0), $("status").value);\r
          document.querySelector("#feesModal .modal-card").scrollTop = 0;\r
          showToast("Edit mode enabled for the selected fee.", "info");\r
        };\r
\r
        window.deleteFee = async (feeId) => {\r
          if (!ensureSessionEditable("Fee deletion")) return;\r
          if (!window.confirm("Delete this fee entry?")) return;\r
          try {\r
            await deleteDoc(doc(db, "schools", currentUser.uid, "fees", feeId));\r
            if (editingFeeId === feeId) resetFeeForm();\r
            await viewHistory();\r
            showToast("Fee entry deleted.");\r
          } catch (e) {\r
            console.error("Fee delete failed:", e);\r
            showToast(e.message || "Unable to delete fee entry.", "error");\r
          }\r
        };\r
\r
        // ── EXTRA ADJUSTMENT ──────────────────────────────────────────\r
\r
        window.openAdjustExtraModal = () => {\r
          const totalExtra = getTotalExtraBalance();\r
          if (totalExtra <= 0) return showToast("No extra balance to adjust.", "error");\r
          $("adjustExtraInfo").innerHTML = \`\r
            <strong>Total extra balance available: \${formatCurrency(totalExtra)}</strong><br>\r
            Select the month you want to apply this extra amount to. If a fee entry exists for that month, the amount will be applied against its due. If not, a new paid entry will be created.\`;\r
          $("adjustTargetMonth").value = "";\r
          $("adjustAmount").value = "";\r
          $("adjustRemarks").value = "";\r
          $("adjustExtraModal").style.display = "flex";\r
        };\r
\r
        window.closeAdjustExtraModal = () => {\r
          $("adjustExtraModal").style.display = "none";\r
        };\r
\r
        window.applyExtraAdjustment = async () => {\r
          try {\r
            if (!ensureSessionEditable("Fee adjustments")) return;\r
            const targetMonth = $("adjustTargetMonth").value;\r
            const adjustAmount = Number($("adjustAmount").value || 0);\r
            const remarks = $("adjustRemarks").value.trim();\r
\r
            if (!targetMonth) return showToast("Select a target month.", "error");\r
            if (adjustAmount <= 0) return showToast("Enter a valid amount.", "error");\r
\r
            const totalExtra = getTotalExtraBalance();\r
            if (adjustAmount > totalExtra) {\r
              return showToast(\`Amount exceeds available extra balance of \${formatCurrency(totalExtra)}.\`, "error");\r
            }\r
\r
            // Deduct from fee entries with extra (oldest first)\r
            const feesWithExtra = [...feeHistory]\r
              .filter(f => getFeeAmounts(f).extra > 0)\r
              .sort((a, b) => (toDate(a.updatedAt) || toDate(a.date) || 0) - (toDate(b.updatedAt) || toDate(b.date) || 0));\r
\r
            let remaining = adjustAmount;\r
            for (const fee of feesWithExtra) {\r
              if (remaining <= 0) break;\r
              const amounts = getFeeAmounts(fee);\r
              const deductFromThis = Math.min(remaining, amounts.extra);\r
              const newExtra = amounts.extra - deductFromThis;\r
              const newCollected = amounts.applied + newExtra;\r
              remaining -= deductFromThis;\r
              await updateDoc(doc(db, "schools", currentUser.uid, "fees", fee.id), {\r
                totalExtraPaidAmount: newExtra,\r
                totalCollectedAmount: newCollected,\r
                updatedAt: new Date(),\r
                lastUpdatedBy: currentUser.email || ""\r
              });\r
            }\r
\r
            // Apply to target month\r
            const existingFee = await findExistingFeeRecord(currentStudent.studentId, targetMonth);\r
            if (existingFee) {\r
              const current = getFeeAmounts(existingFee);\r
              const appliedNow = current.total <= 0 && current.due <= 0 ? adjustAmount : Math.min(adjustAmount, current.due);\r
              const totalApplied = current.applied + appliedNow;\r
              const newDue = Math.max(0, current.total - totalApplied);\r
              const payments = Array.isArray(existingFee.payments) ? [...existingFee.payments] : [];\r
              await updateDoc(doc(db, "schools", currentUser.uid, "fees", existingFee.id), {\r
                paidAmount: totalApplied, totalPaidAmount: totalApplied,\r
                totalCollectedAmount: current.collected + appliedNow,\r
                remainingAmount: newDue,\r
                status: newDue === 0 ? "Paid" : "Partial Paid",\r
                payments: [...payments, {\r
                  receivedAmount: adjustAmount, appliedAmount: appliedNow,\r
                  extraAmount: 0, amount: appliedNow,\r
                  date: new Date(), status: "Adjusted from extra",\r
                  remarks: remarks || "Extra balance adjustment"\r
                }],\r
                remarks: existingFee.remarks || "",\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
              });\r
              showToast(\`\${formatCurrency(adjustAmount)} extra adjusted to \${targetMonth}. \${formatCurrency(appliedNow)} applied against dues.\`);\r
            } else {\r
              const newAdjustmentFee = {\r
                studentId: currentStudent.studentId,\r
                studentDocId: currentStudent.id,\r
                studentName: currentStudent.name,\r
                roll: currentStudent.roll || "",\r
                class: currentStudent.class, section: currentStudent.section || "",\r
                amount: 0, originalAmount: 0,\r
                paidAmount: adjustAmount, totalPaidAmount: adjustAmount,\r
                totalExtraPaidAmount: 0, totalCollectedAmount: adjustAmount,\r
                remainingAmount: 0, status: "Paid",\r
                month: targetMonth, date: new Date(),\r
                adjustmentEntry: true, remarks: remarks || "Extra balance adjustment",\r
                ...sessionFeeFields(),\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || "",\r
                payments: [{\r
                  receivedAmount: adjustAmount, appliedAmount: adjustAmount,\r
                  extraAmount: 0, amount: adjustAmount,\r
                  date: new Date(), status: "Adjusted from extra",\r
                  remarks: remarks || "Extra balance adjustment"\r
                }]\r
              };\r
              const saveResult = await createMonthlyFeeIfMissing(currentStudent.studentId, targetMonth, newAdjustmentFee);\r
              if (!saveResult.created) {\r
                const current = getFeeAmounts(saveResult.fee);\r
                const appliedNow = current.total <= 0 && current.due <= 0 ? adjustAmount : Math.min(adjustAmount, current.due);\r
                const totalApplied = current.applied + appliedNow;\r
                const newDue = Math.max(0, current.total - totalApplied);\r
                const payments = Array.isArray(saveResult.fee.payments) ? [...saveResult.fee.payments] : [];\r
                await updateDoc(doc(db, "schools", currentUser.uid, "fees", saveResult.fee.id), {\r
                  paidAmount: totalApplied, totalPaidAmount: totalApplied,\r
                  totalCollectedAmount: current.collected + appliedNow,\r
                  remainingAmount: newDue,\r
                  status: newDue === 0 ? "Paid" : "Partial Paid",\r
                  payments: [...payments, {\r
                    receivedAmount: adjustAmount, appliedAmount: appliedNow,\r
                    extraAmount: 0, amount: appliedNow,\r
                    date: new Date(), status: "Adjusted from extra",\r
                    remarks: remarks || "Extra balance adjustment"\r
                  }],\r
                  remarks: saveResult.fee.remarks || "",\r
                  updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
                });\r
              }\r
              showToast(\`\${formatCurrency(adjustAmount)} extra adjusted and new paid entry created for \${targetMonth}.\`);\r
            }\r
\r
            closeAdjustExtraModal();\r
            await viewHistory();\r
          } catch (e) {\r
            console.error("Extra adjustment failed:", e);\r
            showToast(e.message || "Adjustment failed.", "error");\r
          }\r
        };\r
\r
        // ── RECEIPT ─────────────────────────────────────────────────────\r
\r
        function buildReceiptHtml(student, feesToShow, isSingle = false) {\r
          const schoolName = window.SchoolBranding?.getSchoolName() || "Schoolix Academy";\r
          const now = new Date();\r
          const receiptNo = \`RCP-\${student.studentId}-\${now.getTime().toString().slice(-6)}\`;\r
\r
          const rowsHtml = feesToShow.map(fee => {\r
            const a = getFeeAmounts(fee);\r
            const meta = getFeeStatusMeta(fee);\r
            const statusColor = meta.tone === "paid" ? "#12805c" : meta.tone === "partial" ? "#0d9488" : meta.tone === "unpaid" ? "#b42318" : "#b56c00";\r
            return \`\r
              <tr>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;font-weight:700">\${escapeHtml(fee.month || "")}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right">\${formatCurrency(a.total)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right;color:#12805c">\${formatCurrency(a.applied)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right;color:#0d9488">\${formatCurrency(a.extra)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right;color:#b42318">\${formatCurrency(a.due)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:center"><span style="background:\${statusColor}20;color:\${statusColor};padding:4px 10px;border-radius:999px;font-size:11px;font-weight:800">\${meta.label}</span></td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;font-size:12px;color:#5e6c80">\${escapeHtml(fee.remarks || "—")}</td>\r
              </tr>\`;\r
          }).join("");\r
\r
          const summary = calculateStudentFeeSummary(feesToShow);\r
\r
          return \`\r
            <div style="font-family:'Aptos','Segoe UI',Tahoma,sans-serif;max-width:860px;margin:0 auto;background:#fff;color:#142033">\r
              <div style="padding:28px 30px;background:linear-gradient(135deg,#0f6cbd,#0b4f8a);color:#fff;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px">\r
                <div>\r
                  <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;opacity:.8;font-weight:700">\${escapeHtml(schoolName)}</div>\r
                  <h1 style="margin:8px 0 4px;font-size:26px;letter-spacing:-.02em">\${isSingle ? "Fee Receipt" : "Full Fee Statement"}</h1>\r
                  <div style="font-size:13px;opacity:.85">Receipt No: \${receiptNo}</div>\r
                </div>\r
                <div style="text-align:right;font-size:13px;opacity:.85;line-height:1.7">\r
                  <div>Date: \${now.toLocaleDateString("en-IN")}</div>\r
                  <div>Generated: \${now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>\r
                </div>\r
              </div>\r
\r
              <div style="padding:20px 30px;background:#eef3fb;border-bottom:1px solid #d7e2f2;display:grid;grid-template-columns:1fr 1fr;gap:20px">\r
                <div>\r
                  <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#3b4b63;font-weight:700;margin-bottom:8px">Student Details</div>\r
                  <table style="font-size:13px;border-collapse:collapse;width:100%">\r
                    <tr><td style="padding:3px 0;font-weight:700;width:38%">Name</td><td>\${escapeHtml(student.name || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Student ID</td><td>\${escapeHtml(student.studentId || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Class</td><td>\${escapeHtml(student.class || "N/A")}-\${escapeHtml(student.section || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Roll No.</td><td>\${escapeHtml(student.roll || "TBA")}</td></tr>\r
                  </table>\r
                </div>\r
                <div>\r
                  <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#5e6c80;font-weight:700;margin-bottom:8px">Parent Details</div>\r
                  <table style="font-size:13px;border-collapse:collapse;width:100%">\r
                    <tr><td style="padding:3px 0;font-weight:700;width:38%">Father</td><td>\${escapeHtml(student.father || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Father Phone</td><td>\${escapeHtml(student.fatherPhone || student.phone || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Mother</td><td>\${escapeHtml(student.mother || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Mother Phone</td><td>\${escapeHtml(student.motherPhone || student.phone || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Phone</td><td>\${escapeHtml(student.phone || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Acad. Year</td><td>\${escapeHtml(student.currentYear || "N/A")}</td></tr>\r
                  </table>\r
                </div>\r
              </div>\r
\r
              <div style="padding:0 30px 20px">\r
                <div style="margin:20px 0 12px;font-weight:800;font-size:15px">Fee Details</div>\r
                <div style="overflow-x:auto">\r
                  <table style="width:100%;border-collapse:collapse;font-size:13px">\r
                    <thead>\r
                      <tr style="background:#e8eff8">\r
                        <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Month</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Assigned</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Applied</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Extra</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Due</th>\r
                        <th style="padding:10px 12px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Status</th>\r
                        <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Remarks</th>\r
                      </tr>\r
                    </thead>\r
                    <tbody>\${rowsHtml}</tbody>\r
                    <tfoot>\r
                      <tr style="background:#eef5ff;font-weight:800;color:#102a43">\r
                        <td style="padding:12px;border-top:2px solid #d8e2f0">TOTAL</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0">\${formatCurrency(summary.total)}</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0;color:#12805c">\${formatCurrency(summary.applied)}</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0;color:#0f766e">\${formatCurrency(summary.extra)}</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0;color:#991b1b">\${formatCurrency(summary.due)}</td>\r
                        <td style="border-top:2px solid #d8e2f0"></td>\r
                        <td style="border-top:2px solid #d8e2f0"></td>\r
                      </tr>\r
                    </tfoot>\r
                  </table>\r
                </div>\r
              </div>\r
\r
              <div style="padding:16px 30px 24px;border-top:1px solid #e8eef7;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;color:#5e6c80;font-size:12px">\r
                <span>This is a computer generated receipt.</span>\r
                <span>\${escapeHtml(schoolName)} | \${now.toLocaleDateString("en-IN")}</span>\r
              </div>\r
            </div>\`;\r
        }\r
\r
        window.openReceiptModal = () => {\r
          if (!currentStudent || !feeHistory.length) return showToast("No fee data available.", "error");\r
\r
          // Populate single fee selector\r
          $("receiptFeeSelect").innerHTML = feeHistory.map(f => \`<option value="\${f.id}">\${escapeHtml(f.month || f.id)}</option>\`).join("");\r
          document.querySelector('input[name="receiptType"][value="full"]').checked = true;\r
          $("singleMonthSelector").style.display = "none";\r
          renderReceiptPreview();\r
          $("receiptModal").style.display = "flex";\r
        };\r
\r
        window.openReceiptModalForFee = (feeId) => {\r
          if (!currentStudent) return;\r
          $("receiptFeeSelect").innerHTML = feeHistory.map(f => \`<option value="\${f.id}"\${f.id === feeId ? " selected" : ""}>\${escapeHtml(f.month || f.id)}</option>\`).join("");\r
          document.querySelector('input[name="receiptType"][value="single"]').checked = true;\r
          $("singleMonthSelector").style.display = "block";\r
          renderReceiptPreview();\r
          $("receiptModal").style.display = "flex";\r
        };\r
\r
        window.closeReceiptModal = () => {\r
          $("receiptModal").style.display = "none";\r
        };\r
\r
        window.downloadFullStatement = () => {\r
          document.querySelector('input[name="receiptType"][value="full"]').checked = true;\r
          $("singleMonthSelector").style.display = "none";\r
          renderReceiptPreview();\r
          downloadReceiptPDF();\r
        };\r
\r
        window.renderReceiptPreview = () => {\r
          const type = document.querySelector('input[name="receiptType"]:checked')?.value || "full";\r
          $("singleMonthSelector").style.display = type === "single" ? "block" : "none";\r
\r
          let feesToShow = feeHistory;\r
          if (type === "single") {\r
            const selectedId = $("receiptFeeSelect").value;\r
            feesToShow = feeHistory.filter(f => f.id === selectedId);\r
          }\r
\r
          $("receiptPreview").innerHTML = buildReceiptHtml(currentStudent, feesToShow, type === "single");\r
        };\r
\r
        window.printReceipt = () => {\r
          const html = $("receiptPreview").innerHTML;\r
          $("printContent").innerHTML = html;\r
          setTimeout(() => window.print(), 150);\r
        };\r
\r
        window.downloadReceiptPDF = () => {\r
          const type = document.querySelector('input[name="receiptType"]:checked')?.value || "full";\r
          let feesToShow = feeHistory;\r
          if (type === "single") {\r
            const selectedId = $("receiptFeeSelect").value;\r
            feesToShow = feeHistory.filter(f => f.id === selectedId);\r
          }\r
\r
          const html = buildReceiptHtml(currentStudent, feesToShow, type === "single");\r
          const w = window.open("", "_blank");\r
          w.document.write(\`<!DOCTYPE html><html><head>\r
<title>Fee Receipt</title><style>body{margin:0;font-family:'Segoe UI',Tahoma,sans-serif}@media print{body{margin:0}}</style></head><body>\${html}<script>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\\/script>`,styles:[{tag:"style",attributes:{id:"sxCriticalLoaderStyle"},text:`\r
html.sx-page-loading,\r
html.sx-page-loading body {\r
  min-height: 100%;\r
  background: #f8fafc !important;\r
}\r
html.sx-page-loading body::before,\r
html.sx-page-loading body::after {\r
  visibility: hidden !important;\r
}\r
html.sx-page-loading body > :not(#sxPageLoader):not(script):not(style) {\r
  visibility: hidden !important;\r
}\r
.sx-page-loader {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147482500;\r
  display: flex;\r
  align-items: stretch;\r
  justify-content: stretch;\r
  background: #f8fafc;\r
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.25s ease;\r
  overflow: hidden;\r
}\r
.sx-page-loader.is-hidden {\r
  opacity: 0;\r
  visibility: hidden;\r
  pointer-events: none;\r
}\r
.sx-page-loader .dots-container {\r
  position: fixed;\r
  inset: 0;\r
  display: block;\r
  width: 100vw;\r
  height: 100vh;\r
  padding: 0;\r
  margin: 0;\r
  overflow: hidden;\r
  background: #f8fafc;\r
}\r
.sx-page-loader .dots-container::before,\r
.sx-page-loader .dots-container::after,\r
.sx-page-loader .dot {\r
  display: none !important;\r
}\r
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
`},{attributes:{src:"school-branding.js"},text:""},{attributes:{src:"https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"},text:""},{attributes:{type:"module"},text:`\r
        import { initializeApp } from "./firebase-compat.js";\r
        import {\r
          addDoc, collection, deleteDoc, doc, getDoc, getDocs,\r
          getFirestore, query, setDoc, updateDoc, where\r
        } from "./firebase-compat.js";\r
        import {\r
          createUserWithEmailAndPassword,\r
          getAuth,\r
          onAuthStateChanged,\r
          signOut\r
        } from "./firebase-compat.js";\r
\r
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
        const studentCreatorApp = initializeApp(firebaseConfig, "studentCreatorApp");\r
        const studentCreatorAuth = getAuth(studentCreatorApp);\r
        const $ = (id) => document.getElementById(id);\r
        const SUPABASE_URL = "https://ezkmeedcqetztkeppxil.supabase.co";\r
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a21lZWRjcWV0enRrZXBweGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjk5NjAsImV4cCI6MjA5MzcwNTk2MH0.1davJ_NYkFhHToUtcFBR0kA6dk0-cOkaIbK2SCObkQg";\r
        const REGISTRATION_EMAIL_FUNCTION_URL = \`\${SUPABASE_URL}/functions/v1/send-registration-email\`;\r
\r
        const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];\r
\r
        const DEFAULT_FEE_CONFIG = {\r
          PG: 2500, LKG: 2800, UKG: 3000,\r
          "1": 3500, "2": 3500, "3": 3500, "4": 3500, "5": 3500,\r
          "6": 4000, "7": 4000, "8": 4000,\r
          "9": 4500, "10": 4500, "11": 5000, "12": 5000\r
        };\r
\r
        const toastColors = {\r
          success: "linear-gradient(135deg,#12805c,#15956b)",\r
          error: "linear-gradient(135deg,#d64c3c,#b42318)",\r
          info: "linear-gradient(135deg,#0f6cbd,#1575c8)"\r
        };\r
\r
        let currentUser = null;\r
        let currentStudent = null;\r
        let recentStudent = null;\r
        let savedMaxPerSection = "";\r
        let feeHistory = [];\r
        let feeConfig = { ...DEFAULT_FEE_CONFIG };\r
        let existingFeeId = null;\r
        let existingFeeData = null;\r
        let editingFeeId = null;\r
        let editingFeeData = null;\r
        let activeSessionId = "";\r
        let activeSessionLabel = "";\r
        let activeSessionLocked = false;\r
\r
        function escapeHtml(value) {\r
          return String(value ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\"": "&quot;", "'": "&#39;" }[m]));\r
        }\r
\r
        const CLOUDINARY_CLOUD_NAME = "fthnumnk";\r
        const CLOUDINARY_UPLOAD_PRESET = "schoolix_student_photos";\r
\r
        function getCloudinaryConfig() {\r
          return {\r
            cloudName: CLOUDINARY_CLOUD_NAME,\r
            uploadPreset: CLOUDINARY_UPLOAD_PRESET\r
          };\r
        };\r
\r
        async function uploadStudentPhoto(file, studentId) {\r
          if (!file) return { photoUrl: "", photoPublicId: "" };\r
          if (!file.type.startsWith("image/")) throw new Error("Please select an image file for student photo.");\r
          if (file.size > 5 * 1024 * 1024) throw new Error("Student photo must be under 5 MB.");\r
          const config = getCloudinaryConfig();\r
          if (!config.cloudName || !config.uploadPreset) {\r
            throw new Error("Cloudinary photo upload is not configured.");\r
          }\r
          const form = new FormData();\r
          form.append("file", file);\r
          form.append("upload_preset", config.uploadPreset);\r
          form.append("folder", \`schoolix/students/\${currentUser.uid}\`);\r
          form.append("public_id", \`\${String(studentId || "student").replace(/[^a-zA-Z0-9_-]/g, "_")}_\${Date.now()}\`);\r
          const response = await fetch(\`https://api.cloudinary.com/v1_1/\${encodeURIComponent(config.cloudName)}/image/upload\`, {\r
            method: "POST",\r
            body: form\r
          });\r
          const data = await response.json().catch(() => ({}));\r
          if (!response.ok) throw new Error(data.error?.message || "Cloudinary photo upload failed.");\r
          return { photoUrl: data.secure_url || data.url || "", photoPublicId: data.public_id || "" };\r
        }\r
\r
        function updateStudentPhotoPreview() {\r
          const preview = $("studentPhotoPreview");\r
          const file = $("studentPhoto")?.files?.[0];\r
          if (!preview) return;\r
          if (!file) {\r
            preview.textContent = "No photo";\r
            return;\r
          }\r
          const reader = new FileReader();\r
          reader.onload = () => { preview.innerHTML = \`<img src="\${reader.result}" alt="Student photo preview">\`; };\r
          reader.readAsDataURL(file);\r
        }\r
\r
        function formatCurrency(value) {\r
          return \`₹\${Number(value || 0).toLocaleString("en-IN")}\`;\r
        }\r
\r
        function toDate(value) {\r
          if (!value) return null;\r
          if (value?.toDate) return value.toDate();\r
          const p = new Date(value);\r
          return isNaN(p.getTime()) ? null : p;\r
        }\r
\r
        function normalizeClassValue(value) {\r
          const cleaned = String(value || "").trim().toUpperCase().replace(/^CLASS\\s+/i, "");\r
          if (!cleaned) return "";\r
          const roman = { I: "1", II: "2", III: "3", IV: "4", V: "5", VI: "6", VII: "7", VIII: "8", IX: "9", X: "10", XI: "11", XII: "12" };\r
          return roman[cleaned] || (/^\\d+$/.test(cleaned) ? String(Number(cleaned)) : cleaned);\r
        }\r
\r
        function normalizeSectionValue(value) {\r
          return String(value || "").trim().toUpperCase().replace(/^SECTION\\s+/i, "");\r
        }\r
\r
        function sameClassSection(student, studentClass, section) {\r
          return normalizeClassValue(student.class) === normalizeClassValue(studentClass) &&\r
            normalizeSectionValue(student.section || "A") === normalizeSectionValue(section || "A");\r
        }\r
\r
        function getSelectedSessionMeta() {\r
          const sel = $("currentYear");\r
          const opt = sel?.options?.[sel.selectedIndex];\r
          return {\r
            sessionId: opt?.dataset?.id || activeSessionId || "",\r
            session: sel?.value || activeSessionLabel || "",\r
            locked: opt?.dataset?.locked === "1" || activeSessionLocked,\r
            classesLocked: opt?.dataset?.classesLocked === "1"\r
          };\r
        }\r
\r
        function makeSessionPlacement(student, meta, overrides = {}) {\r
          const now = Date.now();\r
          return {\r
            ...(student.sessionPlacements?.[meta.sessionId] || {}),\r
            sessionId: meta.sessionId || "",\r
            session: meta.session || student.currentYear || "",\r
            currentYear: meta.session || student.currentYear || "",\r
            class: student.class || "",\r
            section: student.section || "",\r
            roll: student.roll || student.rollNo || "",\r
            locked: Boolean(meta.locked),\r
            classLocked: Boolean(meta.classesLocked),\r
            createdAt: student.createdAt || now,\r
            updatedAt: now,\r
            ...overrides\r
          };\r
        }\r
\r
        function sessionFeeFields() {\r
          const meta = getSelectedSessionMeta();\r
          return { sessionId: meta.sessionId || "", session: meta.session || "" };\r
        }\r
\r
        function ensureSessionEditable(action = "Fee changes") {\r
          if (!getSelectedSessionMeta().locked) return true;\r
          showToast(\`\${action} are blocked because this session is locked.\`, "error");\r
          return false;\r
        }\r
\r
        function feeBelongsToSelectedSession(fee) {\r
          const meta = getSelectedSessionMeta();\r
          if (!meta.sessionId && !meta.session) return true;\r
          if (!fee.sessionId && !fee.session && !fee.currentYear && !fee.academicSession) return false;\r
          return fee.sessionId === meta.sessionId ||\r
            fee.session === meta.session ||\r
            fee.currentYear === meta.session ||\r
            fee.academicSession === meta.session;\r
        }\r
\r
        function formatDate(value) {\r
          const d = toDate(value);\r
          return d ? d.toLocaleDateString("en-IN") : "N/A";\r
        }\r
\r
        function currentMonthName() { return MONTHS[new Date().getMonth()]; }\r
\r
        function academicYearFromToday() {\r
          const t = new Date();\r
          const s = t.getMonth() >= 3 ? t.getFullYear() : t.getFullYear() - 1;\r
          return \`\${s}-\${String((s + 1) % 100).padStart(2, "0")}\`;\r
        }\r
\r
        function showToast(message, type = "success") {\r
          const t = document.createElement("div");\r
          t.className = "toast";\r
          t.textContent = message;\r
          t.style.background = toastColors[type] || toastColors.success;\r
          document.body.appendChild(t);\r
          setTimeout(() => t.remove(), 3600);\r
        }\r
\r
        function getFeeAmounts(fee) {\r
          const total = Number(fee?.originalAmount ?? fee?.amount ?? 0);\r
          const applied = Number(fee?.totalPaidAmount ?? fee?.paidAmount ?? 0);\r
          const explicitExtra = Number(fee?.totalExtraPaidAmount);\r
          const derivedCollected = Number(fee?.totalCollectedAmount ?? applied + (isFinite(explicitExtra) ? explicitExtra : 0));\r
          const extra = isFinite(explicitExtra) ? explicitExtra : Math.max(0, derivedCollected - applied);\r
          const collected = Number(fee?.totalCollectedAmount ?? applied + extra);\r
          const due = isFinite(Number(fee?.remainingAmount)) ? Number(fee.remainingAmount) : Math.max(0, total - applied);\r
          return {\r
            total: Math.max(0, total),\r
            applied: Math.max(0, applied),\r
            extra: Math.max(0, extra),\r
            collected: Math.max(0, collected),\r
            due: Math.max(0, due)\r
          };\r
        }\r
\r
        function getFeeStatusMeta(fee) {\r
          const { total, applied, extra, due } = getFeeAmounts(fee);\r
          if (due === 0 && total > 0 && extra > 0) return { tone: "paid", label: "Paid with extra" };\r
          if (due === 0 && total > 0) return { tone: "paid", label: "Paid" };\r
          if (applied > 0) return { tone: "partial", label: "Partial payment" };\r
          if (fee?.status === "Imposed") return { tone: "imposed", label: "Imposed" };\r
          if (fee?.status === "Unpaid") return { tone: "unpaid", label: "Unpaid" };\r
          return { tone: "pending", label: fee?.status || "Pending" };\r
        }\r
\r
        function calculateStudentFeeSummary(fees) {\r
          return fees.reduce((t, fee) => {\r
            const a = getFeeAmounts(fee);\r
            t.total += a.total; t.applied += a.applied;\r
            t.extra += a.extra; t.collected += a.collected; t.due += a.due;\r
            return t;\r
          }, { total: 0, applied: 0, extra: 0, collected: 0, due: 0 });\r
        }\r
\r
        // Calculate total extra balance across ALL fee entries\r
        function getTotalExtraBalance() {\r
          return feeHistory.reduce((sum, fee) => sum + getFeeAmounts(fee).extra, 0);\r
        }\r
\r
        function updateExtraBalanceBanner() {\r
          const totalExtra = getTotalExtraBalance();\r
          if (totalExtra > 0 && currentStudent) {\r
            $("extraBalanceBanner").style.display = "block";\r
            $("extraBalanceText").innerHTML = \`Total extra balance: <strong>\${formatCurrency(totalExtra)}</strong>. You can apply this towards any month's fee.\`;\r
          } else {\r
            $("extraBalanceBanner").style.display = "none";\r
          }\r
        }\r
\r
        function renderSummaryBanner(fees) {\r
          const s = calculateStudentFeeSummary(fees);\r
          $("studentFeeSummary").innerHTML = \`\r
            <strong style="display:block;font-size:16px;margin-bottom:6px">Fee snapshot</strong>\r
            <div style="color:var(--text-soft);font-size:14px;line-height:1.6">Assigned, applied, collected and extra amounts are shown separately so balances stay accurate.</div>\r
            <div class="stats-grid" style="margin-top:14px">\r
              <div class="stat-tile total"><small>Assigned</small><span>\${formatCurrency(s.total)}</span><strong>Total fee raised</strong></div>\r
              <div class="stat-tile paid"><small>Applied</small><span>\${formatCurrency(s.applied)}</span><strong>Applied against dues</strong></div>\r
              <div class="stat-tile extra"><small>Extra</small><span>\${formatCurrency(s.extra)}</span><strong>Collected above due</strong></div>\r
              <div class="stat-tile due"><small>Due</small><span>\${formatCurrency(s.due)}</span><strong>Remaining balance</strong></div>\r
            </div>\`;\r
          $("studentFeeSummary").style.display = "block";\r
        }\r
\r
        function initializeClasses() {\r
          const classList = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];\r
          $("class").innerHTML = \`<option value="">Select class</option>\${classList.map(v => \`<option value="\${v}">\${v}</option>\`).join("")}\`;\r
        }\r
\r
        function setDefaults() {\r
          if (!$("maxPerSection").value && savedMaxPerSection) $("maxPerSection").value = savedMaxPerSection;\r
          if (!$("yearOfAdmission").value) $("yearOfAdmission").value = String(new Date().getFullYear());\r
          if (!$("currentYear").value) $("currentYear").value = academicYearFromToday();\r
          if (!$("month").value) $("month").value = currentMonthName();\r
        }\r
\r
        async function loadFeeConfig() {\r
          try {\r
            const directDoc = await getDoc(doc(db, "schools", currentUser.uid, "config", "fees_config"));\r
            if (directDoc.exists()) {\r
              feeConfig = { ...feeConfig, ...(directDoc.data().fees || {}) };\r
            } else {\r
              const fallback = await getDocs(query(collection(db, "schools", currentUser.uid, "config"), where("type", "==", "fees")));\r
              if (!fallback.empty) feeConfig = { ...feeConfig, ...(fallback.docs[0].data().fees || {}) };\r
            }\r
          } catch (e) { console.error("Fee config load failed:", e); }\r
          updateFeeDisplay();\r
          showAutoFees();\r
        }\r
\r
        function updateFeeDisplay() {\r
          const map = {\r
            pgAmount: "PG", lkgAmount: "LKG", ukgAmount: "UKG",\r
            class1Amount: "1", class2Amount: "2", class3Amount: "3", class4Amount: "4", class5Amount: "5",\r
            class6Amount: "6", class7Amount: "7", class8Amount: "8", class9Amount: "9", class10Amount: "10",\r
            class11Amount: "11", class12Amount: "12"\r
          };\r
          Object.entries(map).forEach(([id, key]) => { $(id).textContent = formatCurrency(feeConfig[key] || 0); });\r
        }\r
\r
        window.showAutoFees = () => {\r
          const sel = $("class").value;\r
          if (sel && feeConfig[sel]) {\r
            $("autoFeeTitle").textContent = "Auto imposed fee";\r
            $("autoFeeAmount").textContent = \`\${formatCurrency(feeConfig[sel])} will be created for \${currentMonthName()} as an imposed entry.\`;\r
            $("autoFeeInfo").style.display = "block";\r
          } else {\r
            $("autoFeeInfo").style.display = "none";\r
          }\r
        };\r
\r
        async function getExistingStudentIds() {\r
          const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
          return snap.docs.map(d => String(d.data().studentId || "").trim()).filter(Boolean);\r
        }\r
\r
        async function getExistingSrNumbers() {\r
          const [studentSnap, passedOutSnap] = await Promise.all([\r
            getDocs(collection(db, "schools", currentUser.uid, "students")),\r
            getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
          ]);\r
          return [...studentSnap.docs, ...passedOutSnap.docs]\r
            .map(d => String(d.data().srNumber || "").trim())\r
            .filter(Boolean);\r
        }\r
\r
        function splitSrNumber(value) {\r
          const text = String(value || "").trim();\r
          const match = text.match(/^(.*?)(\\d+)(\\D*)$/);\r
          if (!match) return { prefix: "", number: 0, suffix: "", width: 0 };\r
          return {\r
            prefix: match[1] || "",\r
            number: Number(match[2] || 0),\r
            suffix: match[3] || "",\r
            width: match[2].length\r
          };\r
        }\r
\r
        function formatSrNumber(pattern, number) {\r
          const width = Math.max(Number(pattern.width || 0), String(Math.max(0, number)).length);\r
          return \`\${pattern.prefix || ""}\${String(number).padStart(width, "0")}\${pattern.suffix || ""}\`;\r
        }\r
\r
        function getNextSrPattern(existingSrNumbers, seed = "") {\r
          const cleanSeed = String(seed || "").trim();\r
          const seedPattern = splitSrNumber(cleanSeed);\r
          const parsedExisting = existingSrNumbers\r
            .map(splitSrNumber)\r
            .filter((item) => Number.isFinite(item.number) && item.number > 0);\r
\r
          if (cleanSeed && seedPattern.number > 0) {\r
            return seedPattern;\r
          }\r
\r
          const highest = parsedExisting.reduce((best, item) => item.number > best.number ? item : best, { prefix: "", number: 0, suffix: "", width: 0 });\r
          return {\r
            prefix: highest.prefix || "",\r
            number: highest.number + 1,\r
            suffix: highest.suffix || "",\r
            width: Math.max(highest.width || 0, 1)\r
          };\r
        }\r
\r
        async function generateUniqueSrNumbers(count = 1, seed = "", extraTaken = []) {\r
          const existing = await getExistingSrNumbers();\r
          const taken = new Set([...existing, ...extraTaken].map((value) => String(value || "").trim().toLowerCase()).filter(Boolean));\r
          const pattern = getNextSrPattern(existing, seed);\r
          let nextNumber = Math.max(1, Number(pattern.number || 1));\r
          const generated = [];\r
\r
          while (generated.length < count) {\r
            const candidate = formatSrNumber(pattern, nextNumber);\r
            nextNumber += 1;\r
            const key = candidate.toLowerCase();\r
            if (taken.has(key)) continue;\r
            taken.add(key);\r
            generated.push(candidate);\r
          }\r
\r
          return generated;\r
        }\r
\r
        window.generateSrNumber = async () => {\r
          try {\r
            const input = $("srNumber");\r
            const seed = input?.value || "";\r
            const [srNumber] = await generateUniqueSrNumbers(1, seed, seed ? [seed] : []);\r
            if (input) input.value = srNumber;\r
            showToast("SR Number generated.", "info");\r
          } catch (e) {\r
            console.error("SR number generation failed:", e);\r
            showToast("Unable to generate SR number.", "error");\r
          }\r
        };\r
\r
        async function findExistingStudentRecord(studentId = "", email = "", srNumber = "") {\r
          const [studentSnap, passedOutSnap] = await Promise.all([\r
            getDocs(collection(db, "schools", currentUser.uid, "students")),\r
            getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
          ]);\r
          const normalizedStudentId = String(studentId || "").trim();\r
          const normalizedEmail = String(email || "").trim().toLowerCase();\r
          const normalizedSrNumber = String(srNumber || "").trim().toLowerCase();\r
          const activeMatch = studentSnap.docs\r
            .map(d => ({ id: d.id, ...d.data() }))\r
            .find((student) => {\r
              const existingStudentId = String(student.studentId || "").trim();\r
              const existingEmail = String(student.email || "").trim().toLowerCase();\r
              const existingSrNumber = String(student.srNumber || "").trim().toLowerCase();\r
              return (normalizedStudentId && existingStudentId === normalizedStudentId)\r
                || (normalizedEmail && existingEmail === normalizedEmail)\r
                || (normalizedSrNumber && existingSrNumber === normalizedSrNumber);\r
            });\r
          if (activeMatch) return activeMatch;\r
          if (!normalizedSrNumber) return null;\r
          return passedOutSnap.docs\r
            .map(d => ({ id: d.id, ...d.data(), archived: true }))\r
            .find((student) => String(student.srNumber || "").trim().toLowerCase() === normalizedSrNumber) || null;\r
        }\r
\r
        async function generateUniqueStudentId(existing = null) {\r
          const ids = existing || await getExistingStudentIds();\r
          const currentYear = new Date().getFullYear();\r
          const yearPrefix = String(currentYear).slice(-2); // Last 2 digits of current year (e.g., "26" for 2026)\r
\r
          let gen = "";\r
          let attempts = 0;\r
          do {\r
            // Generate 4 random digits\r
            const randomDigits = String(Math.floor(1000 + Math.random() * 9000));\r
            gen = yearPrefix + randomDigits; // Combine year prefix with 4 random digits\r
            attempts++;\r
            if (attempts > 10000) { // Prevent infinite loop\r
              throw new Error("Unable to generate unique student ID after maximum attempts");\r
            }\r
          } while (ids.includes(gen));\r
\r
          return gen;\r
        }\r
\r
        window.generateStudentId = async () => {\r
          try { $("studentId").value = await generateUniqueStudentId(); showToast("Student ID generated.", "info"); }\r
          catch (e) { showToast("Unable to generate student ID.", "error"); }\r
        };\r
\r
        async function assignAutoSection(studentClass, maxPerSection) {\r
          try {\r
            const snap = await getDocs(collection(db, "schools", currentUser.uid, "students"));\r
\r
            const counts = {};\r
            snap.forEach((d) => {\r
              const student = d.data();\r
              if (normalizeClassValue(student.class) !== normalizeClassValue(studentClass)) return;\r
              const section = normalizeSectionValue(student.section || "A") || "A";\r
              counts[section] = (counts[section] || 0) + 1;\r
            });\r
\r
            const capacity = Math.max(1, Number(maxPerSection) || Number(savedMaxPerSection) || 40);\r
            const sections = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));\r
            const available = sections.filter((section) => (counts[section] || 0) < capacity);\r
            const candidates = available.length ? available : sections;\r
            return candidates.sort((a, b) =>\r
              (counts[a] || 0) - (counts[b] || 0) || a.localeCompare(b)\r
            )[0] || "A";\r
\r
          } catch (e) {\r
            return "A";\r
          }\r
        }\r
        async function updateRolls(studentClass, section, preloadedStudents = null) {\r
          const assignedRolls = new Map();\r
          try {\r
            const rawStudents = preloadedStudents || (await getDocs(collection(db, "schools", currentUser.uid, "students"))).docs.map(d => ({ id: d.id, ...d.data() }));\r
            const students = rawStudents.filter(student => sameClassSection(student, studentClass, section));\r
            students.sort((a, b) =>\r
              String(a.name || "").trim().localeCompare(String(b.name || "").trim(), "en", { sensitivity: "base", numeric: true }) ||\r
              String(a.studentId || a.id || "").localeCompare(String(b.studentId || b.id || ""), "en", { numeric: true })\r
            );\r
            const sessionMeta = getSelectedSessionMeta();\r
            const updatePromises = [];\r
            for (let i = 0; i < students.length; i++) {\r
              const roll = String(i + 1).padStart(2, "0");\r
              const student = students[i];\r
              assignedRolls.set(student.id, roll);\r
              const currentPlacementRoll = sessionMeta.sessionId ? student.sessionPlacements?.[sessionMeta.sessionId]?.roll : null;\r
              const rollChanged = (student.roll !== roll) || (student.rollNo !== roll) || (currentPlacementRoll !== null && currentPlacementRoll !== roll);\r
              if (rollChanged && student.id) {\r
                const updatePayload = { roll, rollNo: roll, updatedAt: new Date() };\r
                if (sessionMeta.sessionId) {\r
                  updatePayload[\`sessionPlacements.\${sessionMeta.sessionId}\`] = makeSessionPlacement(\r
                    { ...student, roll, rollNo: roll },\r
                    sessionMeta,\r
                    { roll }\r
                  );\r
                }\r
                updatePromises.push(updateDoc(doc(db, "schools", currentUser.uid, "students", student.id), updatePayload));\r
                const mirrorIds = [student.studentId, student.authUid].map(value => String(value || "").trim()).filter(Boolean);\r
                [...new Set(mirrorIds)].forEach((id) => {\r
                  updatePromises.push(setDoc(doc(db, "users", id), { rollNo: roll, roll, updatedAt: Date.now() }, { merge: true }).catch(() => {}));\r
                });\r
              }\r
            }\r
            if (updatePromises.length > 0) {\r
              await Promise.all(updatePromises);\r
            }\r
          } catch (e) { console.error("Roll update failed:", e); }\r
          return assignedRolls;\r
        }\r
\r
        async function findExistingFeeRecord(studentId, monthName) {\r
          const snap = await getDocs(query(collection(db, "schools", currentUser.uid, "fees"), where("studentId", "==", studentId)));\r
          return snap.docs\r
            .map(d => ({ id: d.id, ...d.data() }))\r
            .filter(f => feeBelongsToSelectedSession(f) && String(f.month || "").toLowerCase() === String(monthName || "").toLowerCase())\r
            .sort((a, b) => (toDate(b.updatedAt) || toDate(b.date) || 0) - (toDate(a.updatedAt) || toDate(a.date) || 0))[0] || null;\r
        }\r
\r
        function feeDocIdPart(value, fallback) {\r
          return String(value || fallback || "")\r
            .trim()\r
            .toLowerCase()\r
            .replace(/[^a-z0-9]+/g, "-")\r
            .replace(/^-+|-+$/g, "")\r
            .slice(0, 70) || fallback;\r
        }\r
\r
        function deterministicMonthlyFeeDocId(studentId, month, feeType = "monthly") {\r
          const meta = getSelectedSessionMeta();\r
          const sessionKey = meta.sessionId || meta.session || "current";\r
          return [\r
            "monthly-fee",\r
            feeDocIdPart(sessionKey, "current"),\r
            feeDocIdPart(studentId, "student"),\r
            feeDocIdPart(month, "month"),\r
            feeDocIdPart(feeType, "monthly")\r
          ].join("_");\r
        }\r
\r
        async function createMonthlyFeeIfMissing(studentId, month, payload, feeType = "monthly") {\r
          const existing = await findExistingFeeRecord(studentId, month);\r
          if (existing) return { created: false, fee: existing };\r
\r
          const feeRef = doc(db, "schools", currentUser.uid, "fees", deterministicMonthlyFeeDocId(studentId, month, feeType));\r
          const feeSnap = await getDoc(feeRef);\r
          if (feeSnap.exists()) return { created: false, fee: { id: feeRef.id, ...feeSnap.data() } };\r
\r
          // Monthly fee records used random addDoc() IDs, so repeated saves could create\r
          // duplicates. This deterministic ID makes student + session + month + fee type\r
          // idempotent while keeping the stored fee payload backward-compatible.\r
          await setDoc(feeRef, payload, { merge: false });\r
          return { created: true, id: feeRef.id, fee: { id: feeRef.id, ...payload } };\r
        }\r
\r
        function showRecentStudent(student) {\r
          recentStudent = student;\r
          $("recentStudentCard").style.display = "block";\r
          $("printRecentBtn").style.display = "inline-flex";\r
          $("recentStudentInfo").innerHTML = \`\r
            \${student.photoUrl ? \`<img src="\${escapeHtml(student.photoUrl)}" alt="\${escapeHtml(student.name || "Student")} photo" style="width:74px;height:74px;border-radius:14px;object-fit:cover;border:1px solid #d7e3f4;margin:0 0 10px;display:block">\` : ""}\r
            <strong>\${escapeHtml(student.name || "")}</strong><br>\r
            \${escapeHtml(student.class || "")}-\${escapeHtml(student.section || "")} | ID: \${escapeHtml(student.studentId || "")}<br>\r
            Father: \${escapeHtml(student.father || "")} (\${escapeHtml(student.fatherPhone || student.phone || "")})<br>\r
            Mother: \${escapeHtml(student.mother || "")} (\${escapeHtml(student.motherPhone || student.phone || "")})\`;\r
        }\r
\r
        function resetStudentForm() {\r
          ["name", "section", "yearOfAdmission", "studentId", "srNumber", "gender", "category", "aadharNumber", "bloodGroup", "religion", "previousSchool", "studentEmail", "parentEmail", "studentPassword", "father", "fatherPhone", "mother", "motherPhone", "phone", "address", "documentList", "dob", "dateOfAdmission"].forEach(id => { const el=$(id); if(el) el.value=""; }); const cls=$("class"); if(cls) cls.value="";\r
          const status = $("studentStatus");\r
          if (status) status.value = "Active";\r
          const photoInput = $("studentPhoto");\r
          if (photoInput) photoInput.value = "";\r
          updateStudentPhotoPreview();\r
          setDefaults();\r
          $("autoFeeInfo").style.display = "none";\r
        }\r
\r
        function normalizeAdmissionDate(value) {\r
          if (!value) return "";\r
          if (value instanceof Date && !isNaN(value.getTime())) return value.toISOString().slice(0, 10);\r
          const text = String(value || "").trim();\r
          if (/^\\d{4}-\\d{2}-\\d{2}$/.test(text)) return text;\r
          const parsed = new Date(text);\r
          return isNaN(parsed.getTime()) ? text : parsed.toISOString().slice(0, 10);\r
        }\r
\r
        function getStudentPayloadFromForm() {\r
          return {\r
            name: $("name").value.trim(),\r
            studentClass: $("class").value,\r
            section: $("section").value.trim(),\r
            maxPerSection: parseInt($("maxPerSection").value, 10) || 0,\r
            yearOfAdmission: $("yearOfAdmission").value.trim(),\r
            currentYear: $("currentYear").value.trim(),\r
            studentId: $("studentId").value.trim(),\r
            srNumber: $("srNumber").value.trim(),\r
            gender: $("gender").value.trim(),\r
            category: $("category").value.trim(),\r
            aadharNumber: $("aadharNumber").value.trim(),\r
            bloodGroup: $("bloodGroup").value.trim(),\r
            religion: $("religion").value.trim(),\r
            previousSchool: $("previousSchool").value.trim(),\r
            status: $("studentStatus").value.trim(),\r
            studentEmail: $("studentEmail").value.trim(),\r
            parentEmail: $("parentEmail").value.trim(),\r
            studentPassword: $("studentPassword").value.trim(),\r
            father: $("father").value.trim(),\r
            fatherPhone: $("fatherPhone").value.trim(),\r
            mother: $("mother").value.trim(),\r
            motherPhone: $("motherPhone").value.trim(),\r
            phone: $("phone").value.trim(),\r
            address: $("address").value.trim(),\r
            documentList: $("documentList").value.trim(),\r
            dob: $("dob").value,\r
            dateOfAdmission: $("dateOfAdmission").value,\r
            photoFile: $("studentPhoto")?.files?.[0] || null\r
          };\r
        }\r
\r
        function validateStudentPayload(payload, label = "Student") {\r
          if (!payload.name || !payload.studentClass || !payload.yearOfAdmission || !payload.currentYear || !payload.father || !payload.fatherPhone || !payload.mother || !payload.motherPhone || !payload.dateOfAdmission) {\r
            throw new Error(\`\${label}: required fields missing.\`);\r
          }\r
          if (payload.aadharNumber && !/^\\d{12}$/.test(payload.aadharNumber)) {\r
            throw new Error(\`\${label}: Aadhaar number must contain 12 digits.\`);\r
          }\r
          if (!payload.studentEmail || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(payload.studentEmail)) {\r
            throw new Error(\`\${label}: valid registered email is required.\`);\r
          }\r
          if (payload.parentEmail && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(payload.parentEmail)) {\r
            throw new Error(\`\${label}: parent email is invalid.\`);\r
          }\r
          if (payload.studentPassword && payload.studentPassword.length < 6) {\r
            throw new Error(\`\${label}: password must be at least 6 characters when entered.\`);\r
          }\r
        }\r
\r
        function generateLoginPassword(studentId = "", srNumber = "") {\r
          const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";\r
          const random = new Uint32Array(6);\r
          crypto.getRandomValues(random);\r
          const token = Array.from(random, (value) => alphabet[value % alphabet.length]).join("");\r
          return \`Sx\${token}\`;\r
        }\r
\r
        async function sendStudentRegistrationEmail(student, temporaryPassword, feeAmount = 0, feeMonth = "") {\r
          if (!student?.email) return { success: false, skipped: true };\r
          const payload = {\r
            recipients: [student.email],\r
            schoolName: student.schoolName || window.SchoolBranding?.getSchoolName?.() || "Schoolix",\r
            studentName: student.name,\r
            studentId: student.studentId,\r
            srNumber: student.srNumber,\r
            className: student.class,\r
            section: student.section,\r
            roll: student.roll || student.rollNo || "",\r
            father: student.father,\r
            fatherPhone: student.fatherPhone,\r
            mother: student.mother,\r
            motherPhone: student.motherPhone,\r
            phone: student.phone,\r
            gender: student.gender,\r
            category: student.category,\r
            bloodGroup: student.bloodGroup,\r
            religion: student.religion,\r
            previousSchool: student.previousSchool,\r
            aadharNumber: student.aadharNumber,\r
            dob: student.dob,\r
            dateOfAdmission: student.dateOfAdmission || student.admissionDate,\r
            yearOfAdmission: student.yearOfAdmission,\r
            academicSession: student.academicSession || student.session || student.currentYear,\r
            loginEmail: student.email,\r
            parentEmail: student.parentEmail,\r
            address: student.address,\r
            documentList: student.documentList || student.documents,\r
            status: student.status,\r
            feeAmount,\r
            feeMonth,\r
            temporaryPassword\r
          };\r
\r
          const response = await fetch(REGISTRATION_EMAIL_FUNCTION_URL, {\r
            method: "POST",\r
            headers: {\r
              "Content-Type": "application/json",\r
              "apikey": SUPABASE_ANON_KEY,\r
              "Authorization": \`Bearer \${SUPABASE_ANON_KEY}\`\r
            },\r
            body: JSON.stringify(payload)\r
          });\r
          const data = await response.json().catch(() => ({}));\r
          if (!response.ok) throw new Error(data.error || data.details || "Registration email failed");\r
          return data;\r
        }\r
\r
        async function createStudentAdmission(rawPayload, options = {}) {\r
          const payload = {\r
            ...rawPayload,\r
            name: String(rawPayload.name || "").trim(),\r
            studentClass: normalizeClassValue(rawPayload.studentClass || rawPayload.class),\r
            section: normalizeSectionValue(rawPayload.section),\r
            maxPerSection: parseInt(rawPayload.maxPerSection, 10) || parseInt(savedMaxPerSection, 10) || 40,\r
            yearOfAdmission: String(rawPayload.yearOfAdmission || "").trim(),\r
            currentYear: String(rawPayload.currentYear || "").trim(),\r
            studentId: String(rawPayload.studentId || "").trim(),\r
            srNumber: String(rawPayload.srNumber || "").trim(),\r
            gender: String(rawPayload.gender || "").trim(),\r
            category: String(rawPayload.category || "").trim(),\r
            aadharNumber: String(rawPayload.aadharNumber || "").trim(),\r
            bloodGroup: String(rawPayload.bloodGroup || "").trim(),\r
            religion: String(rawPayload.religion || "").trim(),\r
            previousSchool: String(rawPayload.previousSchool || "").trim(),\r
            status: String(rawPayload.status || "Active").trim() || "Active",\r
            studentEmail: String(rawPayload.studentEmail || "").trim().toLowerCase(),\r
            parentEmail: String(rawPayload.parentEmail || "").trim().toLowerCase(),\r
            studentPassword: String(rawPayload.studentPassword || "").trim(),\r
            father: String(rawPayload.father || "").trim(),\r
            fatherPhone: String(rawPayload.fatherPhone || "").trim(),\r
            mother: String(rawPayload.mother || "").trim(),\r
            motherPhone: String(rawPayload.motherPhone || "").trim(),\r
            phone: String(rawPayload.phone || rawPayload.fatherPhone || rawPayload.motherPhone || "").trim(),\r
            address: String(rawPayload.address || "").trim(),\r
            documentList: String(rawPayload.documentList || rawPayload.documents || "").trim(),\r
            dob: normalizeAdmissionDate(rawPayload.dob),\r
            dateOfAdmission: normalizeAdmissionDate(rawPayload.dateOfAdmission)\r
          };\r
          validateStudentPayload(payload, options.label || payload.name || "Student");\r
\r
          const sessionMeta = getSelectedSessionMeta();\r
\r
          // 1. Single consolidated prefetch for all validation & ID generation\r
          const [studentSnap, passedOutSnap] = await Promise.all([\r
            getDocs(collection(db, "schools", currentUser.uid, "students")),\r
            getDocs(collection(db, "schools", currentUser.uid, "passedOutStudents"))\r
          ]);\r
          const activeStudents = studentSnap.docs.map(d => ({ id: d.id, ...d.data() }));\r
          const passedOutStudents = passedOutSnap.docs.map(d => ({ id: d.id, ...d.data(), archived: true }));\r
          const allExistingStudents = [...activeStudents, ...passedOutStudents];\r
\r
          // 2. Generate SR number if not provided (in-memory)\r
          const existingSrList = allExistingStudents.map(s => String(s.srNumber || "").trim()).filter(Boolean);\r
          if (!payload.srNumber) {\r
            const pattern = getNextSrPattern(existingSrList, options.srSeed || "");\r
            let nextNum = Math.max(1, Number(pattern.number || 1));\r
            const takenSet = new Set(existingSrList.map(s => s.toLowerCase()));\r
            while (takenSet.has(formatSrNumber(pattern, nextNum).toLowerCase())) {\r
              nextNum++;\r
            }\r
            payload.srNumber = formatSrNumber(pattern, nextNum);\r
          }\r
\r
          // 3. Fast in-memory duplicate check\r
          const normalizedStudentId = String(payload.studentId || "").trim();\r
          const normalizedEmail = String(payload.studentEmail || "").trim().toLowerCase();\r
          const normalizedSrNumber = String(payload.srNumber || "").trim().toLowerCase();\r
          const duplicateMatch = allExistingStudents.find((s) => {\r
            const sId = String(s.studentId || "").trim();\r
            const sEmail = String(s.email || "").trim().toLowerCase();\r
            const sSr = String(s.srNumber || "").trim().toLowerCase();\r
            return (normalizedStudentId && sId === normalizedStudentId) ||\r
                   (normalizedEmail && sEmail === normalizedEmail) ||\r
                   (normalizedSrNumber && sSr === normalizedSrNumber);\r
          });\r
          if (duplicateMatch) {\r
            throw new Error("A student with this ID, email, or SR number already exists in this school.");\r
          }\r
\r
          // 4. Generate Student ID if needed (in-memory)\r
          let studentId = payload.studentId;\r
          const existingIds = activeStudents.map(s => String(s.studentId || "").trim()).filter(Boolean);\r
          if (!studentId) {\r
            studentId = await generateUniqueStudentId(existingIds);\r
          } else if (existingIds.includes(studentId)) {\r
            throw new Error("This student ID is already in use.");\r
          }\r
\r
          if (!payload.studentPassword) {\r
            payload.studentPassword = generateLoginPassword(studentId, payload.srNumber);\r
          }\r
\r
          // 5. Section assignment (in-memory)\r
          let section = payload.section;\r
          if (!section) {\r
            const counts = {};\r
            activeStudents.forEach((student) => {\r
              if (normalizeClassValue(student.class) !== normalizeClassValue(payload.studentClass)) return;\r
              const sec = normalizeSectionValue(student.section || "A") || "A";\r
              counts[sec] = (counts[sec] || 0) + 1;\r
            });\r
            // Test imports intentionally fill a section to 20 before opening the next one.\r
            // Regular admissions continue to use the administrator's configured limit.\r
            const capacity = options.isTestBulkImport\r
              ? 20\r
              : Math.max(1, Number(payload.maxPerSection) || Number(savedMaxPerSection) || 40);\r
            const sections = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));\r
            const available = sections.filter((s) => (counts[s] || 0) < capacity);\r
            if (options.isTestBulkImport) {\r
              // Keep test rows together rather than spreading them across sections.\r
              section = available[0] || sections[sections.length - 1] || "A";\r
            } else {\r
              const candidates = available.length ? available : sections;\r
              section = candidates.sort((a, b) => (counts[a] || 0) - (counts[b] || 0) || a.localeCompare(b))[0] || "A";\r
            }\r
          }\r
\r
          // 6. Pre-calculate roll number BEFORE insert\r
          const classmates = activeStudents.filter(s => sameClassSection(s, payload.studentClass, section));\r
          const sortedClassmates = [...classmates, { id: "NEW_STUDENT", name: payload.name, studentId }];\r
          sortedClassmates.sort((a, b) =>\r
            String(a.name || "").trim().localeCompare(String(b.name || "").trim(), "en", { sensitivity: "base", numeric: true }) ||\r
            String(a.studentId || a.id || "").localeCompare(String(b.studentId || b.id || ""), "en", { numeric: true })\r
          );\r
          const newStudentIndex = sortedClassmates.findIndex(s => s.id === "NEW_STUDENT");\r
          const assignedRoll = String(newStudentIndex + 1).padStart(2, "0");\r
\r
          // 7. Photo upload & Auth user creation in parallel\r
          const [photoUpload, studentAuthCred] = await Promise.all([\r
            uploadStudentPhoto(payload.photoFile, studentId),\r
            createUserWithEmailAndPassword(studentCreatorAuth, payload.studentEmail, payload.studentPassword)\r
          ]);\r
          const studentAuthUid = studentAuthCred.user.uid;\r
          const currentSchoolName = window.SchoolBranding?.getSchoolName?.() || "";\r
          const schoolId = String(currentUser.uid || "").trim();\r
\r
          // 8. Session Placement\r
          const placement = sessionMeta.sessionId ? makeSessionPlacement({\r
            name: payload.name, class: payload.studentClass, section,\r
            roll: assignedRoll, rollNo: assignedRoll\r
          }, sessionMeta, { roll: assignedRoll }) : null;\r
\r
          // 9. Fully-hydrated Student Data (No second getDoc/updateDoc needed!)\r
          const studentData = {\r
            studentId, name: payload.name, class: payload.studentClass, section,\r
            roll: assignedRoll, rollNo: assignedRoll,\r
            srNumber: payload.srNumber,\r
            father: payload.father, fatherPhone: payload.fatherPhone,\r
            mother: payload.mother, motherPhone: payload.motherPhone,\r
            phone: payload.phone || payload.fatherPhone || payload.motherPhone,\r
            address: payload.address, dob: payload.dob,\r
            gender: payload.gender,\r
            category: payload.category,\r
            bloodGroup: payload.bloodGroup,\r
            religion: payload.religion,\r
            previousSchool: payload.previousSchool,\r
            documentList: payload.documentList,\r
            documents: payload.documentList,\r
            status: payload.status,\r
            tcIssued: payload.status === "TC Issued",\r
            dateOfAdmission: payload.dateOfAdmission,\r
            yearOfAdmission: payload.yearOfAdmission,\r
            currentYear: sessionMeta.session || payload.currentYear,\r
            sessionId: sessionMeta.sessionId || "",\r
            session: sessionMeta.session || payload.currentYear,\r
            academicSession: sessionMeta.session || payload.currentYear,\r
            sessionPlacements: placement && sessionMeta.sessionId ? { [sessionMeta.sessionId]: placement } : {},\r
            aadharNumber: payload.aadharNumber || "",\r
            email: payload.studentEmail,\r
            parentEmail: payload.parentEmail || payload.studentEmail,\r
            photoUrl: photoUpload.photoUrl,\r
            photoPublicId: photoUpload.photoPublicId,\r
            authUid: studentAuthUid,\r
            schoolId,\r
            adminId: schoolId,\r
            schoolName: currentSchoolName,\r
            createdAt: new Date(),\r
            updatedAt: new Date()\r
          };\r
\r
          // 10. Insert student & user mirror documents in parallel\r
          const studentRef = await addDoc(collection(db, "schools", currentUser.uid, "students"), studentData);\r
          const userMirror = {\r
            ...studentData,\r
            authUid: studentAuthUid,\r
            studentDocId: studentRef.id,\r
            role: "student",\r
            authProvider: "firebase",\r
            authEmail: payload.studentEmail\r
          };\r
          await Promise.all([\r
            setDoc(doc(db, "users", studentId), { uid: studentId, ...userMirror }),\r
            setDoc(doc(db, "users", studentAuthUid), { uid: studentAuthUid, ...userMirror })\r
          ]);\r
\r
          // 11. Update other classmates whose roll numbers shifted (parallel, fast)\r
          const classmateUpdates = [];\r
          for (let i = 0; i < sortedClassmates.length; i++) {\r
            const item = sortedClassmates[i];\r
            if (item.id === "NEW_STUDENT") continue;\r
            const expectedRoll = String(i + 1).padStart(2, "0");\r
            if (item.roll !== expectedRoll || item.rollNo !== expectedRoll) {\r
              const uPayload = { roll: expectedRoll, rollNo: expectedRoll, updatedAt: new Date() };\r
              if (sessionMeta.sessionId) {\r
                uPayload[\`sessionPlacements.\${sessionMeta.sessionId}\`] = makeSessionPlacement(\r
                  { ...item, roll: expectedRoll, rollNo: expectedRoll },\r
                  sessionMeta,\r
                  { roll: expectedRoll }\r
                );\r
              }\r
              classmateUpdates.push(\r
                updateDoc(doc(db, "schools", currentUser.uid, "students", item.id), uPayload)\r
              );\r
              const mIds = [item.studentId, item.authUid].map(v => String(v || "").trim()).filter(Boolean);\r
              [...new Set(mIds)].forEach(mid => {\r
                classmateUpdates.push(\r
                  setDoc(doc(db, "users", mid), { rollNo: expectedRoll, roll: expectedRoll, updatedAt: Date.now() }, { merge: true }).catch(() => {})\r
                );\r
              });\r
            }\r
          }\r
          if (classmateUpdates.length > 0) {\r
            await Promise.all(classmateUpdates);\r
          }\r
\r
          // Re-read this class-section after the insert. This keeps rolls correct\r
          // even when another admission was saved at nearly the same time.\r
          // Example: Ansh (01), Dhruv (02), Shreshth (03).\r
          await updateRolls(payload.studentClass, section);\r
\r
          // 12. Create auto monthly fee if configured\r
          const feeAmount = Number(feeConfig[payload.studentClass] || 0);\r
          const currentMonth = currentMonthName();\r
          if (feeAmount > 0) {\r
            await createMonthlyFeeIfMissing(studentId, currentMonth, {\r
              studentId, studentDocId: studentRef.id, studentName: payload.name,\r
              roll: assignedRoll, class: payload.studentClass, section,\r
              amount: feeAmount, originalAmount: feeAmount,\r
              paidAmount: 0, totalPaidAmount: 0,\r
              totalExtraPaidAmount: 0, totalCollectedAmount: 0,\r
              remainingAmount: feeAmount,\r
              status: "Imposed", month: currentMonth,\r
              date: new Date(), autoImposed: true, imposedDate: new Date(),\r
              ...sessionFeeFields(),\r
              payments: [], remarks: "",\r
              createdBy: currentUser.email || ""\r
            });\r
          }\r
\r
          const savedStudent = { id: studentRef.id, ...studentData };\r
\r
          // 13. Send registration email asynchronously in the background so it never slows down UI\r
          if (savedStudent.email) {\r
            sendStudentRegistrationEmail(savedStudent, payload.studentPassword, feeAmount, currentMonth)\r
              .catch(err => console.warn("Background registration email notice:", err));\r
          }\r
\r
          return { savedStudent, feeAmount, currentMonth, registrationEmailSent: true, registrationEmailError: "" };\r
        }\r
\r
        window.addStudent = async () => {\r
          const btn = document.querySelector("button[onclick*='addStudent']");\r
          const originalText = btn ? btn.textContent : "";\r
          try {\r
            if (!ensureSessionEditable("Admission and fee creation")) return;\r
            if (btn) {\r
              btn.disabled = true;\r
              btn.textContent = "Adding student...";\r
            }\r
            const result = await createStudentAdmission(getStudentPayloadFromForm());\r
            showRecentStudent(result.savedStudent);\r
            resetStudentForm();\r
            showToast(\`Student added successfully! \${result.feeAmount > 0 ? \`\${formatCurrency(result.feeAmount)} fee imposed for \${result.currentMonth}.\` : ""}\`, "success");\r
          } catch (e) {\r
            console.error("Student add failed:", e);\r
            showToast(e.message || "Unable to add student.", "error");\r
          } finally {\r
            if (btn) {\r
              btn.disabled = false;\r
              btn.textContent = originalText;\r
            }\r
          }\r
        };\r
\r
        const BULK_STUDENT_HEADERS = [\r
          "srNumber", "name", "class", "section", "studentId", "gender", "category", "aadharNumber", "bloodGroup", "religion", "previousSchool", "status", "documentList", "studentEmail", "parentEmail",\r
          "studentPassword", "father", "fatherPhone", "mother", "motherPhone", "phone",\r
          "dob", "dateOfAdmission", "yearOfAdmission", "currentYear", "address", "maxPerSection"\r
        ];\r
\r
        const BULK_HEADER_ALIASES = {\r
          srNumber: ["srnumber", "srno", "scholarregister", "scholarno", "serialnumber"],\r
          name: ["name", "studentname", "student"],\r
          studentClass: ["class", "studentclass", "classname"],\r
          section: ["section", "sec"],\r
          studentId: ["studentid", "admissionno", "admissionnumber", "registrationid"],\r
          gender: ["gender", "sex"],\r
          category: ["category", "castecategory"],\r
          aadharNumber: ["aadharnumber", "aadhaar", "aadhaarnumber", "aadhar"],\r
          bloodGroup: ["bloodgroup", "blood"],\r
          religion: ["religion"],\r
          previousSchool: ["previousschool", "lastschool", "prevschool"],\r
          status: ["status", "studentstatus"],\r
          documentList: ["documentlist", "documents", "docs", "submitteddocuments"],\r
          studentEmail: ["studentemail", "registeredemail", "email", "loginemail"],\r
          parentEmail: ["parentemail", "guardianemail"],\r
          studentPassword: ["studentpassword", "password", "loginpassword"],\r
          father: ["father", "fathername"],\r
          fatherPhone: ["fatherphone", "fatherphonenumber", "fathermobile"],\r
          mother: ["mother", "mothername"],\r
          motherPhone: ["motherphone", "motherphonenumber", "mothermobile"],\r
          phone: ["phone", "primaryphone", "contact", "contactnumber", "mobile"],\r
          dob: ["dob", "dateofbirth", "birthdate"],\r
          dateOfAdmission: ["dateofadmission", "admissiondate", "dateadmission"],\r
          yearOfAdmission: ["yearofadmission", "admissionyear"],\r
          currentYear: ["currentyear", "academicsession", "session", "academicyear"],\r
          address: ["address"],\r
          maxPerSection: ["maxpersection", "sectionlimit", "maxstudentspersection"]\r
        };\r
\r
        function normalizeBulkHeader(value) {\r
          return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");\r
        }\r
\r
        function canonicalBulkKey(header) {\r
          const normalized = normalizeBulkHeader(header);\r
          for (const [key, aliases] of Object.entries(BULK_HEADER_ALIASES)) {\r
            if (aliases.includes(normalized)) return key;\r
          }\r
          return "";\r
        }\r
\r
        function parseCsvText(text) {\r
          const rows = [];\r
          let row = [], value = "", quoted = false;\r
          for (let i = 0; i < text.length; i += 1) {\r
            const ch = text[i];\r
            const next = text[i + 1];\r
            if (ch === '"' && quoted && next === '"') {\r
              value += '"';\r
              i += 1;\r
            } else if (ch === '"') {\r
              quoted = !quoted;\r
            } else if (ch === "," && !quoted) {\r
              row.push(value);\r
              value = "";\r
            } else if ((ch === "\\n" || ch === "\\r") && !quoted) {\r
              if (ch === "\\r" && next === "\\n") i += 1;\r
              row.push(value);\r
              if (row.some((cell) => String(cell).trim())) rows.push(row);\r
              row = [];\r
              value = "";\r
            } else {\r
              value += ch;\r
            }\r
          }\r
          row.push(value);\r
          if (row.some((cell) => String(cell).trim())) rows.push(row);\r
          return rows;\r
        }\r
\r
        function rowsToObjects(rows) {\r
          const headers = rows[0] || [];\r
          return rows.slice(1).map((row) => {\r
            const obj = {};\r
            headers.forEach((header, index) => {\r
              const key = canonicalBulkKey(header);\r
              if (key) obj[key] = row[index] ?? "";\r
            });\r
            return obj;\r
          }).filter((row) => Object.values(row).some((value) => String(value || "").trim()));\r
        }\r
\r
        async function readBulkStudentRows(file) {\r
          const ext = String(file.name || "").split(".").pop().toLowerCase();\r
          if (ext === "csv") {\r
            return rowsToObjects(parseCsvText(await file.text()));\r
          }\r
          if (!window.XLSX) {\r
            throw new Error("Excel parser is still loading. Please try again in a moment, or upload CSV.");\r
          }\r
          const workbook = window.XLSX.read(await file.arrayBuffer(), { type: "array", cellDates: true });\r
          const sheet = workbook.Sheets[workbook.SheetNames[0]];\r
          const rawRows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false });\r
          return rowsToObjects(rawRows);\r
        }\r
\r
        function withBulkDefaults(row) {\r
          const today = new Date().toISOString().slice(0, 10);\r
          const formLimit = parseInt($("maxPerSection")?.value || savedMaxPerSection, 10) || 0;\r
          return {\r
            ...row,\r
            studentClass: row.studentClass || row.class,\r
            maxPerSection: parseInt(row.maxPerSection, 10) || formLimit,\r
            dateOfAdmission: row.dateOfAdmission || $("dateOfAdmission")?.value || today,\r
            yearOfAdmission: row.yearOfAdmission || $("yearOfAdmission")?.value || String(new Date().getFullYear()),\r
            currentYear: row.currentYear || $("currentYear")?.value || academicYearFromToday()\r
          };\r
        }\r
\r
        function isTestBulkStudent(row) {\r
          const studentId = String(row?.studentId || "").trim();\r
          return /^TEST\\d+$/i.test(studentId);\r
        }\r
\r
        async function assignBulkSrNumbers(rows) {\r
          const normalizedRows = rows.map((row) => ({ ...row, srNumber: String(row.srNumber || "").trim() }));\r
          const fileTaken = new Set();\r
          const duplicateInFile = normalizedRows.find((row) => {\r
            if (!row.srNumber) return false;\r
            const key = row.srNumber.toLowerCase();\r
            if (fileTaken.has(key)) return true;\r
            fileTaken.add(key);\r
            return false;\r
          });\r
          if (duplicateInFile) throw new Error(\`Duplicate SR number in import file: \${duplicateInFile.srNumber}\`);\r
\r
          const blankIndexes = normalizedRows\r
            .map((row, index) => row.srNumber ? -1 : index)\r
            .filter((index) => index >= 0);\r
          if (!blankIndexes.length) return normalizedRows;\r
\r
          const seed = normalizedRows.find((row) => row.srNumber)?.srNumber || $("srNumber")?.value || "";\r
          const generated = await generateUniqueSrNumbers(blankIndexes.length, seed, normalizedRows.map((row) => row.srNumber));\r
          blankIndexes.forEach((rowIndex, generatedIndex) => {\r
            normalizedRows[rowIndex].srNumber = generated[generatedIndex];\r
          });\r
          return normalizedRows;\r
        }\r
\r
        function renderBulkResults(results) {\r
          const target = $("bulkImportResults");\r
          if (!target) return;\r
          target.classList.add("show");\r
          const ok = results.filter((item) => item.ok).length;\r
          const failed = results.length - ok;\r
          target.innerHTML = \`\r
            <strong>Import finished: \${ok} added, \${failed} failed.</strong>\r
            <div style="margin-top:10px;display:grid;gap:6px">\r
              \${results.map((item) => \`<div><span class="\${item.ok ? "ok" : "fail"}">\${item.ok ? "Added" : "Failed"}</span> Row \${item.row}: \${escapeHtml(item.name || "")}\${item.studentId ? \` (\${escapeHtml(item.studentId)})\` : ""}\${item.message ? \` - \${escapeHtml(item.message)}\` : ""}</div>\`).join("")}\r
            </div>\`;\r
        }\r
\r
        window.downloadBulkStudentTemplate = () => {\r
          const sample = [\r
            BULK_STUDENT_HEADERS,\r
            ["", "Aarav Sharma", "5", "", "", "Male", "General", "", "B+", "", "", "Active", "", "aarav.student@example.com", "parent@example.com", "student123", "Raj Sharma", "9876543210", "Neha Sharma", "9876543211", "", "2015-04-12", new Date().toISOString().slice(0, 10), String(new Date().getFullYear()), $("currentYear")?.value || academicYearFromToday(), "Student address", $("maxPerSection")?.value || savedMaxPerSection || "40"]\r
          ];\r
          const csv = sample.map((row) => row.map((cell) => \`"\${String(cell ?? "").replace(/"/g, '""')}"\`).join(",")).join("\\n");\r
          const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));\r
          const link = document.createElement("a");\r
          link.href = url;\r
          link.download = "schoolix-student-bulk-template.csv";\r
          link.click();\r
          URL.revokeObjectURL(url);\r
        };\r
\r
        window.importBulkStudents = async () => {\r
          const file = $("bulkStudentFile")?.files?.[0];\r
          if (!file) return showToast("Select an Excel or CSV file first.", "error");\r
          if (!ensureSessionEditable("Bulk admission import")) return;\r
          const button = $("bulkImportBtn");\r
          const previousLabel = button?.textContent || "Import Students";\r
          const results = [];\r
          try {\r
            if (button) { button.disabled = true; button.textContent = "Importing..."; }\r
            const rows = await assignBulkSrNumbers((await readBulkStudentRows(file)).map(withBulkDefaults));\r
            if (!rows.length) throw new Error("No student rows found in the file.");\r
            const seenEmails = new Set();\r
            const seenIds = new Set();\r
            rows.forEach((row, index) => {\r
              const label = \`Row \${index + 2}\`;\r
              validateStudentPayload({\r
                ...row,\r
                studentClass: normalizeClassValue(row.studentClass || row.class),\r
                maxPerSection: parseInt(row.maxPerSection, 10) || 0,\r
                studentEmail: String(row.studentEmail || "").trim().toLowerCase(),\r
                parentEmail: String(row.parentEmail || "").trim().toLowerCase(),\r
                studentPassword: String(row.studentPassword || "").trim(),\r
                dateOfAdmission: normalizeAdmissionDate(row.dateOfAdmission)\r
              }, label);\r
              const email = String(row.studentEmail || "").trim().toLowerCase();\r
              const id = String(row.studentId || "").trim();\r
              if (seenEmails.has(email)) throw new Error(\`\${label}: duplicate email in import file.\`);\r
              if (id && seenIds.has(id)) throw new Error(\`\${label}: duplicate student ID in import file.\`);\r
              seenEmails.add(email);\r
              if (id) seenIds.add(id);\r
            });\r
\r
            for (let index = 0; index < rows.length; index += 1) {\r
              const rowNumber = index + 2;\r
              const row = rows[index];\r
              try {\r
                const result = await createStudentAdmission(row, {\r
                  label: \`Row \${rowNumber}\`,\r
                  isTestBulkImport: isTestBulkStudent(row)\r
                });\r
                results.push({ ok: true, row: rowNumber, name: result.savedStudent.name, studentId: result.savedStudent.studentId });\r
              } catch (error) {\r
                console.error("Bulk student import row failed:", rowNumber, error);\r
                results.push({ ok: false, row: rowNumber, name: row.name, studentId: row.studentId, message: error.message || "Unable to import row." });\r
              }\r
            }\r
            renderBulkResults(results);\r
            const imported = results.filter((item) => item.ok).length;\r
            showToast(\`\${imported} student(s) imported from \${file.name}.\`, imported ? "success" : "error");\r
          } catch (error) {\r
            console.error("Bulk import failed:", error);\r
            showToast(error.message || "Unable to import students.", "error");\r
            if (results.length) renderBulkResults(results);\r
          } finally {\r
            if (button) { button.disabled = false; button.textContent = previousLabel; }\r
          }\r
        };\r
\r
        function setFeeFormMode(isEditing) {\r
          $("month").disabled = Boolean(isEditing);\r
          $("saveBtn").textContent = isEditing ? "Update Fee Entry" : "Save Fee Entry";\r
        }\r
\r
        function clearPreview() {\r
          $("autoUpdateAlert").style.display = "none";\r
          $("autoUpdateAlert").classList.remove("warning");\r
          $("autoUpdateMsg").textContent = "";\r
          $("autoUpdateMetrics").innerHTML = "";\r
          $("previewHint").textContent = "";\r
        }\r
\r
        window.resetFeeForm = () => {\r
          $("amount").value = "";\r
          $("status").value = "";\r
          $("feeRemarks").value = "";\r
          $("month").value = currentMonthName();\r
          existingFeeId = null; existingFeeData = null;\r
          editingFeeId = null; editingFeeData = null;\r
          setFeeFormMode(false);\r
          clearPreview();\r
        };\r
\r
        async function loadFeesForStudent(studentId) {\r
          const snap = await getDocs(query(collection(db, "schools", currentUser.uid, "fees"), where("studentId", "==", studentId)));\r
          return snap.docs\r
            .map(d => ({ id: d.id, ...d.data() }))\r
            .filter(feeBelongsToSelectedSession)\r
            .sort((a, b) => (toDate(b.updatedAt) || toDate(b.date) || 0) - (toDate(a.updatedAt) || toDate(a.date) || 0));\r
        }\r
\r
        function renderPreview(fee, enteredAmount, status) {\r
          if (!fee) { clearPreview(); return; }\r
          const base = getFeeAmounts(fee);\r
          if (status === "Paid") {\r
            const isZeroAssignedEntry = base.total <= 0 && base.due <= 0;\r
            const appliedNow = isZeroAssignedEntry ? enteredAmount : Math.min(enteredAmount, base.due);\r
            const extraNow = isZeroAssignedEntry ? 0 : Math.max(0, enteredAmount - base.due);\r
            const projApplied = base.applied + appliedNow;\r
            const projExtra = base.extra + extraNow;\r
            const projDue = Math.max(0, base.total - projApplied);\r
            $("autoUpdateMsg").textContent = \`\${fee.month} already exists for this student. The payment will update the same entry.\`;\r
            $("autoUpdateMetrics").innerHTML = \`\r
              <div class="preview-metric"><span>Assigned</span><strong>\${formatCurrency(base.total)}</strong></div>\r
              <div class="preview-metric"><span>Already Applied</span><strong>\${formatCurrency(base.applied)}</strong></div>\r
              <div class="preview-metric"><span>Applied Now</span><strong>\${formatCurrency(appliedNow)}</strong></div>\r
              <div class="preview-metric"><span>Extra Now</span><strong>\${formatCurrency(extraNow)}</strong></div>\r
              <div class="preview-metric"><span>Projected Extra</span><strong>\${formatCurrency(projExtra)}</strong></div>\r
              <div class="preview-metric"><span>Projected Due</span><strong>\${formatCurrency(projDue)}</strong></div>\`;\r
            $("previewHint").textContent = extraNow > 0\r
              ? "The received amount exceeds the current due. The excess will be stored as extra collection and can be adjusted to any month."\r
              : "The payment will be appended to the existing payment history.";\r
            $("autoUpdateAlert").classList.remove("warning");\r
          } else {\r
            const projAssigned = base.total + enteredAmount;\r
            const projDue = base.due + enteredAmount;\r
            $("autoUpdateMsg").textContent = \`\${fee.month} already exists. The entered amount will be added to the same month.\`;\r
            $("autoUpdateMetrics").innerHTML = \`\r
              <div class="preview-metric"><span>Current Assigned</span><strong>\${formatCurrency(base.total)}</strong></div>\r
              <div class="preview-metric"><span>Applied Till Now</span><strong>\${formatCurrency(base.applied)}</strong></div>\r
              <div class="preview-metric"><span>Extra Till Now</span><strong>\${formatCurrency(base.extra)}</strong></div>\r
              <div class="preview-metric"><span>Added Now</span><strong>\${formatCurrency(enteredAmount)}</strong></div>\r
              <div class="preview-metric"><span>Projected Assigned</span><strong>\${formatCurrency(projAssigned)}</strong></div>\r
              <div class="preview-metric"><span>Projected Due</span><strong>\${formatCurrency(projDue)}</strong></div>\`;\r
            $("previewHint").textContent = "Existing payment history and applied amounts will stay intact. Only assigned and due amounts will increase.";\r
            $("autoUpdateAlert").classList.remove("warning");\r
          }\r
          $("autoUpdateAlert").style.display = "block";\r
        }\r
\r
        window.checkAutoUpdate = async () => {\r
          try {\r
            const month = $("month").value;\r
            const status = $("status").value;\r
            const enteredAmount = Number($("amount").value || 0);\r
            if (!currentStudent || !month || !status || enteredAmount <= 0) {\r
              if (!editingFeeId) clearPreview();\r
              existingFeeId = null; existingFeeData = null;\r
              return;\r
            }\r
            if (editingFeeId && editingFeeData) { renderPreview(editingFeeData, enteredAmount, status); return; }\r
            const fee = await findExistingFeeRecord(currentStudent.studentId, month);\r
            existingFeeId = fee?.id || null;\r
            existingFeeData = fee || null;\r
            renderPreview(existingFeeData, enteredAmount, status);\r
          } catch (e) { console.error("Preview update failed:", e); clearPreview(); }\r
        };\r
\r
        async function buildPaymentUpdate(enteredAmount, fee, status, remarks) {\r
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
            const paymentStatus = extraNow > 0 ? (appliedNow > 0 ? "Applied with extra" : "Extra collection") : remaining === 0 ? "Paid" : "Partial paid";\r
\r
            return {\r
              updateData: {\r
                amount: current.total, originalAmount: current.total,\r
                paidAmount: totalApplied, totalPaidAmount: totalApplied,\r
                totalExtraPaidAmount: totalExtra,\r
                totalCollectedAmount: totalApplied + totalExtra,\r
                remainingAmount: remaining,\r
                status: remaining === 0 ? "Paid" : "Partial Paid",\r
                payments: [...payments, {\r
                  receivedAmount: enteredAmount, appliedAmount: appliedNow,\r
                  extraAmount: extraNow, amount: appliedNow,\r
                  date: new Date(), status: paymentStatus,\r
                  remarks: remarks || ""\r
                }],\r
                lastPaymentAmount: enteredAmount, lastAppliedAmount: appliedNow,\r
                lastExtraAmount: extraNow, lastPaymentDate: new Date(),\r
                remarks: remarks || fee.remarks || "",\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
              },\r
              message: extraNow > 0\r
                ? \`Payment saved. \${formatCurrency(appliedNow)} applied and \${formatCurrency(extraNow)} stored as extra collection.\`\r
                : \`Payment saved. \${formatCurrency(appliedNow)} applied to \${fee.month}.\`\r
            };\r
          }\r
\r
          return {\r
            updateData: {\r
              amount: current.total + enteredAmount,\r
              originalAmount: current.total + enteredAmount,\r
              paidAmount: current.applied, totalPaidAmount: current.applied,\r
              totalExtraPaidAmount: current.extra, totalCollectedAmount: current.collected,\r
              remainingAmount: current.due + enteredAmount,\r
              status, payments,\r
              remarks: remarks || fee.remarks || "",\r
              lastPaymentAmount: fee.lastPaymentAmount || 0,\r
              lastAppliedAmount: fee.lastAppliedAmount || 0,\r
              lastExtraAmount: fee.lastExtraAmount || 0,\r
              lastPaymentDate: fee.lastPaymentDate || null,\r
              updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
            },\r
            message: \`\${formatCurrency(enteredAmount)} added to \${fee.month}. Total assigned is now \${formatCurrency(current.total + enteredAmount)}.\`\r
          };\r
        }\r
\r
        window.saveFees = async () => {\r
          try {\r
            if (!ensureSessionEditable("Fee changes")) return;\r
            if (!currentStudent) return showToast("Fetch a student first.", "error");\r
            const enteredAmount = Number($("amount").value || 0);\r
            const status = $("status").value;\r
            const month = $("month").value;\r
            const remarks = $("feeRemarks").value.trim();\r
\r
            if (!month || !status || enteredAmount <= 0) {\r
              return showToast("Enter amount, billing month and status.", "error");\r
            }\r
\r
            const targetFeeId = editingFeeId || existingFeeId;\r
            const targetFeeData = editingFeeData || existingFeeData;\r
\r
            if (targetFeeId && targetFeeData) {\r
              const paymentUpdate = await buildPaymentUpdate(enteredAmount, targetFeeData, status, remarks);\r
              if (!paymentUpdate) return;\r
              await updateDoc(doc(db, "schools", currentUser.uid, "fees", targetFeeId), paymentUpdate.updateData);\r
              showToast(paymentUpdate.message);\r
            } else {\r
              const isPaid = status === "Paid";\r
              const assignedAmount = isPaid ? 0 : enteredAmount;\r
              const newFee = {\r
                studentId: currentStudent.studentId,\r
                studentDocId: currentStudent.id,\r
                studentName: currentStudent.name,\r
                roll: currentStudent.roll || "",\r
                class: currentStudent.class, section: currentStudent.section || "",\r
                amount: assignedAmount, originalAmount: assignedAmount,\r
                paidAmount: isPaid ? enteredAmount : 0,\r
                totalPaidAmount: isPaid ? enteredAmount : 0,\r
                totalExtraPaidAmount: 0,\r
                totalCollectedAmount: isPaid ? enteredAmount : 0,\r
                remainingAmount: isPaid ? 0 : assignedAmount,\r
                status: isPaid ? "Paid" : status,\r
                month, date: new Date(), manualEntry: true,\r
                ...sessionFeeFields(),\r
                remarks: remarks || "",\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || "",\r
                payments: isPaid ? [{\r
                  receivedAmount: enteredAmount, appliedAmount: enteredAmount,\r
                  extraAmount: 0, amount: enteredAmount,\r
                  date: new Date(), status: "Paid", remarks: remarks || ""\r
                }] : []\r
              };\r
              const saveResult = await createMonthlyFeeIfMissing(currentStudent.studentId, month, newFee);\r
              if (!saveResult.created) {\r
                const paymentUpdate = await buildPaymentUpdate(enteredAmount, saveResult.fee, status, remarks);\r
                if (!paymentUpdate) return;\r
                await updateDoc(doc(db, "schools", currentUser.uid, "fees", saveResult.fee.id), paymentUpdate.updateData);\r
              }\r
              showToast(isPaid ? \`New paid fee saved for \${month}.\` : \`New \${status.toLowerCase()} fee saved for \${month}.\`);\r
            }\r
\r
            resetFeeForm();\r
            await viewHistory();\r
          } catch (e) {\r
            console.error("Fee save failed:", e);\r
            showToast(e.message || "Unable to save fee entry.", "error");\r
          }\r
        };\r
\r
        function feeCardHtml(fee) {\r
          const amounts = getFeeAmounts(fee);\r
          const meta = getFeeStatusMeta(fee);\r
          const payments = Array.isArray(fee.payments) ? [...fee.payments].reverse() : [];\r
          const progress = amounts.total > 0 ? Math.min(100, Math.round((amounts.applied / amounts.total) * 100)) : 0;\r
          const source = fee.autoImposed ? "Auto imposed" : fee.adjustmentEntry ? "Extra adjustment" : fee.manualEntry ? "Manual entry" : "Updated record";\r
\r
          return \`\r
            <article class="fee-card \${meta.tone}">\r
              <div class="fee-card-top">\r
                <div>\r
                  <div class="fee-title">\${escapeHtml(fee.month || "Fee entry")}</div>\r
                  <div class="fee-meta">\${formatDate(fee.updatedAt || fee.date)} | \${source}</div>\r
                </div>\r
                <div class="button-row" style="gap:10px">\r
                  <span class="status-chip \${meta.tone}">\${meta.label}</span>\r
                  <button class="btn btn-accent" style="min-height:38px;padding:10px 14px;font-size:13px" onclick="openReceiptModalForFee('\${fee.id}')">Receipt</button>\r
                  <button class="btn btn-secondary" style="min-height:38px;padding:10px 14px" onclick="editFee('\${fee.id}')">Edit</button>\r
                  <button class="btn btn-danger" style="min-height:38px;padding:10px 14px" onclick="deleteFee('\${fee.id}')">Delete</button>\r
                </div>\r
              </div>\r
\r
              <div class="money-grid">\r
                <div class="money-box"><span>Assigned</span><strong>\${formatCurrency(amounts.total)}</strong></div>\r
                <div class="money-box"><span>Applied</span><strong>\${formatCurrency(amounts.applied)}</strong></div>\r
                <div class="money-box"><span>Collected</span><strong>\${formatCurrency(amounts.collected)}</strong></div>\r
                <div class="money-box"><span>Extra</span><strong>\${formatCurrency(amounts.extra)}</strong></div>\r
                <div class="money-box"><span>Due</span><strong>\${formatCurrency(amounts.due)}</strong></div>\r
              </div>\r
\r
              <div>\r
                <div class="progress-track"><div class="progress-fill" style="width:\${progress}%"></div></div>\r
                <div style="margin-top:8px;color:var(--text-soft);font-size:13px">\${progress}% of the assigned amount has been applied.</div>\r
              </div>\r
\r
              \${fee.remarks ? \`<div class="fee-remarks"><strong>Remarks</strong>\${escapeHtml(fee.remarks)}</div>\` : ""}\r
\r
              \${payments.length ? \`\r
                <div class="payment-history">\r
                  <h4>Payment History</h4>\r
                  \${payments.map(p => \`\r
                    <div class="payment-item">\r
                      <div>\r
                        <strong>\${formatDate(p.date)}</strong><br>\r
                        <span style="color:var(--text-soft)">Received \${formatCurrency(p.receivedAmount ?? p.fullAmount ?? p.amount ?? 0)}</span>\r
                        \${p.remarks ? \`<br><span style="color:#8a6a00;font-size:12px">\${escapeHtml(p.remarks)}</span>\` : ""}\r
                      </div>\r
                      <div style="text-align:right">\r
                        <div>Applied \${formatCurrency(p.appliedAmount ?? p.amount ?? 0)}</div>\r
                        <div style="color:var(--accent)">Extra \${formatCurrency(p.extraAmount ?? 0)}</div>\r
                        <div style="color:var(--text-soft)">\${escapeHtml(p.status || "Payment recorded")}</div>\r
                      </div>\r
                    </div>\`).join("")}\r
                </div>\` : ""}\r
            </article>\`;\r
        }\r
\r
        window.viewHistory = async () => {\r
          try {\r
            if (!currentStudent) return showToast("Fetch a student first.", "error");\r
            feeHistory = await loadFeesForStudent(currentStudent.studentId);\r
            renderSummaryBanner(feeHistory);\r
            updateExtraBalanceBanner();\r
            $("historySection").innerHTML = feeHistory.length\r
              ? \`<div class="history-list">\${feeHistory.map(fee => feeCardHtml(fee)).join("")}</div>\`\r
              : \`<div class="empty-state">No fee entries found for this student.</div>\`;\r
            $("printBtn").style.display = "inline-flex";\r
            $("printReceiptBtn").style.display = "inline-flex";\r
            $("downloadStatementBtn").style.display = "inline-flex";\r
          } catch (e) {\r
            console.error("History load failed:", e);\r
            showToast(e.message || "Unable to load fee history.", "error");\r
          }\r
        };\r
\r
        window.fetchStudent = async () => {\r
          try {\r
            const studentId = $("searchId").value.trim();\r
            if (!studentId) return showToast("Enter a student ID.", "error");\r
            const snap = await getDocs(query(collection(db, "schools", currentUser.uid, "students"), where("studentId", "==", studentId)));\r
            if (snap.empty) return showToast("Student not found.", "error");\r
            currentStudent = { id: snap.docs[0].id, ...snap.docs[0].data() };\r
            $("studentName").value = currentStudent.name || "";\r
            $("studentClass").value = \`\${currentStudent.class || ""}-\${currentStudent.section || ""}\`;\r
            $("studentFather").value = currentStudent.father || "";\r
            $("studentFatherPhone").value = currentStudent.fatherPhone || currentStudent.phone || "";\r
            $("studentMother").value = currentStudent.mother || "";\r
            $("studentMotherPhone").value = currentStudent.motherPhone || currentStudent.phone || "";\r
            $("feesModal").style.display = "flex";\r
            $("printBtn").style.display = "inline-flex";\r
            resetFeeForm();\r
            await viewHistory();\r
            showToast("Student loaded.", "info");\r
          } catch (e) {\r
            console.error("Student fetch failed:", e);\r
            showToast(e.message || "Unable to fetch student.", "error");\r
          }\r
        };\r
\r
        window.editFee = (feeId) => {\r
          const fee = feeHistory.find(e => e.id === feeId);\r
          if (!fee) return showToast("Fee entry not found.", "error");\r
          editingFeeId = fee.id; editingFeeData = fee;\r
          existingFeeId = fee.id; existingFeeData = fee;\r
          $("amount").value = String(fee.originalAmount ?? fee.amount ?? 0);\r
          $("month").value = fee.month || "";\r
          $("status").value = fee.status === "Partial Paid" ? "Paid" : fee.status || "Pending";\r
          $("feeRemarks").value = fee.remarks || "";\r
          setFeeFormMode(true);\r
          renderPreview(fee, Number($("amount").value || 0), $("status").value);\r
          document.querySelector("#feesModal .modal-card").scrollTop = 0;\r
          showToast("Edit mode enabled for the selected fee.", "info");\r
        };\r
\r
        window.deleteFee = async (feeId) => {\r
          if (!ensureSessionEditable("Fee deletion")) return;\r
          if (!window.confirm("Delete this fee entry?")) return;\r
          try {\r
            await deleteDoc(doc(db, "schools", currentUser.uid, "fees", feeId));\r
            if (editingFeeId === feeId) resetFeeForm();\r
            await viewHistory();\r
            showToast("Fee entry deleted.");\r
          } catch (e) {\r
            console.error("Fee delete failed:", e);\r
            showToast(e.message || "Unable to delete fee entry.", "error");\r
          }\r
        };\r
\r
        // ── EXTRA ADJUSTMENT ──────────────────────────────────────────\r
\r
        window.openAdjustExtraModal = () => {\r
          const totalExtra = getTotalExtraBalance();\r
          if (totalExtra <= 0) return showToast("No extra balance to adjust.", "error");\r
          $("adjustExtraInfo").innerHTML = \`\r
            <strong>Total extra balance available: \${formatCurrency(totalExtra)}</strong><br>\r
            Select the month you want to apply this extra amount to. If a fee entry exists for that month, the amount will be applied against its due. If not, a new paid entry will be created.\`;\r
          $("adjustTargetMonth").value = "";\r
          $("adjustAmount").value = "";\r
          $("adjustRemarks").value = "";\r
          $("adjustExtraModal").style.display = "flex";\r
        };\r
\r
        window.closeAdjustExtraModal = () => {\r
          $("adjustExtraModal").style.display = "none";\r
        };\r
\r
        window.applyExtraAdjustment = async () => {\r
          try {\r
            if (!ensureSessionEditable("Fee adjustments")) return;\r
            const targetMonth = $("adjustTargetMonth").value;\r
            const adjustAmount = Number($("adjustAmount").value || 0);\r
            const remarks = $("adjustRemarks").value.trim();\r
\r
            if (!targetMonth) return showToast("Select a target month.", "error");\r
            if (adjustAmount <= 0) return showToast("Enter a valid amount.", "error");\r
\r
            const totalExtra = getTotalExtraBalance();\r
            if (adjustAmount > totalExtra) {\r
              return showToast(\`Amount exceeds available extra balance of \${formatCurrency(totalExtra)}.\`, "error");\r
            }\r
\r
            // Deduct from fee entries with extra (oldest first)\r
            const feesWithExtra = [...feeHistory]\r
              .filter(f => getFeeAmounts(f).extra > 0)\r
              .sort((a, b) => (toDate(a.updatedAt) || toDate(a.date) || 0) - (toDate(b.updatedAt) || toDate(b.date) || 0));\r
\r
            let remaining = adjustAmount;\r
            for (const fee of feesWithExtra) {\r
              if (remaining <= 0) break;\r
              const amounts = getFeeAmounts(fee);\r
              const deductFromThis = Math.min(remaining, amounts.extra);\r
              const newExtra = amounts.extra - deductFromThis;\r
              const newCollected = amounts.applied + newExtra;\r
              remaining -= deductFromThis;\r
              await updateDoc(doc(db, "schools", currentUser.uid, "fees", fee.id), {\r
                totalExtraPaidAmount: newExtra,\r
                totalCollectedAmount: newCollected,\r
                updatedAt: new Date(),\r
                lastUpdatedBy: currentUser.email || ""\r
              });\r
            }\r
\r
            // Apply to target month\r
            const existingFee = await findExistingFeeRecord(currentStudent.studentId, targetMonth);\r
            if (existingFee) {\r
              const current = getFeeAmounts(existingFee);\r
              const appliedNow = current.total <= 0 && current.due <= 0 ? adjustAmount : Math.min(adjustAmount, current.due);\r
              const totalApplied = current.applied + appliedNow;\r
              const newDue = Math.max(0, current.total - totalApplied);\r
              const payments = Array.isArray(existingFee.payments) ? [...existingFee.payments] : [];\r
              await updateDoc(doc(db, "schools", currentUser.uid, "fees", existingFee.id), {\r
                paidAmount: totalApplied, totalPaidAmount: totalApplied,\r
                totalCollectedAmount: current.collected + appliedNow,\r
                remainingAmount: newDue,\r
                status: newDue === 0 ? "Paid" : "Partial Paid",\r
                payments: [...payments, {\r
                  receivedAmount: adjustAmount, appliedAmount: appliedNow,\r
                  extraAmount: 0, amount: appliedNow,\r
                  date: new Date(), status: "Adjusted from extra",\r
                  remarks: remarks || "Extra balance adjustment"\r
                }],\r
                remarks: existingFee.remarks || "",\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
              });\r
              showToast(\`\${formatCurrency(adjustAmount)} extra adjusted to \${targetMonth}. \${formatCurrency(appliedNow)} applied against dues.\`);\r
            } else {\r
              const newAdjustmentFee = {\r
                studentId: currentStudent.studentId,\r
                studentDocId: currentStudent.id,\r
                studentName: currentStudent.name,\r
                roll: currentStudent.roll || "",\r
                class: currentStudent.class, section: currentStudent.section || "",\r
                amount: 0, originalAmount: 0,\r
                paidAmount: adjustAmount, totalPaidAmount: adjustAmount,\r
                totalExtraPaidAmount: 0, totalCollectedAmount: adjustAmount,\r
                remainingAmount: 0, status: "Paid",\r
                month: targetMonth, date: new Date(),\r
                adjustmentEntry: true, remarks: remarks || "Extra balance adjustment",\r
                ...sessionFeeFields(),\r
                updatedAt: new Date(), lastUpdatedBy: currentUser.email || "",\r
                payments: [{\r
                  receivedAmount: adjustAmount, appliedAmount: adjustAmount,\r
                  extraAmount: 0, amount: adjustAmount,\r
                  date: new Date(), status: "Adjusted from extra",\r
                  remarks: remarks || "Extra balance adjustment"\r
                }]\r
              };\r
              const saveResult = await createMonthlyFeeIfMissing(currentStudent.studentId, targetMonth, newAdjustmentFee);\r
              if (!saveResult.created) {\r
                const current = getFeeAmounts(saveResult.fee);\r
                const appliedNow = current.total <= 0 && current.due <= 0 ? adjustAmount : Math.min(adjustAmount, current.due);\r
                const totalApplied = current.applied + appliedNow;\r
                const newDue = Math.max(0, current.total - totalApplied);\r
                const payments = Array.isArray(saveResult.fee.payments) ? [...saveResult.fee.payments] : [];\r
                await updateDoc(doc(db, "schools", currentUser.uid, "fees", saveResult.fee.id), {\r
                  paidAmount: totalApplied, totalPaidAmount: totalApplied,\r
                  totalCollectedAmount: current.collected + appliedNow,\r
                  remainingAmount: newDue,\r
                  status: newDue === 0 ? "Paid" : "Partial Paid",\r
                  payments: [...payments, {\r
                    receivedAmount: adjustAmount, appliedAmount: appliedNow,\r
                    extraAmount: 0, amount: appliedNow,\r
                    date: new Date(), status: "Adjusted from extra",\r
                    remarks: remarks || "Extra balance adjustment"\r
                  }],\r
                  remarks: saveResult.fee.remarks || "",\r
                  updatedAt: new Date(), lastUpdatedBy: currentUser.email || ""\r
                });\r
              }\r
              showToast(\`\${formatCurrency(adjustAmount)} extra adjusted and new paid entry created for \${targetMonth}.\`);\r
            }\r
\r
            closeAdjustExtraModal();\r
            await viewHistory();\r
          } catch (e) {\r
            console.error("Extra adjustment failed:", e);\r
            showToast(e.message || "Adjustment failed.", "error");\r
          }\r
        };\r
\r
        // ── RECEIPT ─────────────────────────────────────────────────────\r
\r
        function buildReceiptHtml(student, feesToShow, isSingle = false) {\r
          const schoolName = window.SchoolBranding?.getSchoolName() || "Schoolix Academy";\r
          const now = new Date();\r
          const receiptNo = \`RCP-\${student.studentId}-\${now.getTime().toString().slice(-6)}\`;\r
\r
          const rowsHtml = feesToShow.map(fee => {\r
            const a = getFeeAmounts(fee);\r
            const meta = getFeeStatusMeta(fee);\r
            const statusColor = meta.tone === "paid" ? "#12805c" : meta.tone === "partial" ? "#0d9488" : meta.tone === "unpaid" ? "#b42318" : "#b56c00";\r
            return \`\r
              <tr>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;font-weight:700">\${escapeHtml(fee.month || "")}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right">\${formatCurrency(a.total)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right;color:#12805c">\${formatCurrency(a.applied)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right;color:#0d9488">\${formatCurrency(a.extra)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:right;color:#b42318">\${formatCurrency(a.due)}</td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;text-align:center"><span style="background:\${statusColor}20;color:\${statusColor};padding:4px 10px;border-radius:999px;font-size:11px;font-weight:800">\${meta.label}</span></td>\r
                <td style="padding:10px 12px;border-bottom:1px solid #e8eef7;font-size:12px;color:#5e6c80">\${escapeHtml(fee.remarks || "—")}</td>\r
              </tr>\`;\r
          }).join("");\r
\r
          const summary = calculateStudentFeeSummary(feesToShow);\r
\r
          return \`\r
            <div style="font-family:'Aptos','Segoe UI',Tahoma,sans-serif;max-width:860px;margin:0 auto;background:#fff;color:#142033">\r
              <div style="padding:28px 30px;background:linear-gradient(135deg,#0f6cbd,#0b4f8a);color:#fff;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px">\r
                <div>\r
                  <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;opacity:.8;font-weight:700">\${escapeHtml(schoolName)}</div>\r
                  <h1 style="margin:8px 0 4px;font-size:26px;letter-spacing:-.02em">\${isSingle ? "Fee Receipt" : "Full Fee Statement"}</h1>\r
                  <div style="font-size:13px;opacity:.85">Receipt No: \${receiptNo}</div>\r
                </div>\r
                <div style="text-align:right;font-size:13px;opacity:.85;line-height:1.7">\r
                  <div>Date: \${now.toLocaleDateString("en-IN")}</div>\r
                  <div>Generated: \${now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>\r
                </div>\r
              </div>\r
\r
              <div style="padding:20px 30px;background:#eef3fb;border-bottom:1px solid #d7e2f2;display:grid;grid-template-columns:1fr 1fr;gap:20px">\r
                <div>\r
                  <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#3b4b63;font-weight:700;margin-bottom:8px">Student Details</div>\r
                  <table style="font-size:13px;border-collapse:collapse;width:100%">\r
                    <tr><td style="padding:3px 0;font-weight:700;width:38%">Name</td><td>\${escapeHtml(student.name || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Student ID</td><td>\${escapeHtml(student.studentId || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Class</td><td>\${escapeHtml(student.class || "N/A")}-\${escapeHtml(student.section || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Roll No.</td><td>\${escapeHtml(student.roll || "TBA")}</td></tr>\r
                  </table>\r
                </div>\r
                <div>\r
                  <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#5e6c80;font-weight:700;margin-bottom:8px">Parent Details</div>\r
                  <table style="font-size:13px;border-collapse:collapse;width:100%">\r
                    <tr><td style="padding:3px 0;font-weight:700;width:38%">Father</td><td>\${escapeHtml(student.father || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Father Phone</td><td>\${escapeHtml(student.fatherPhone || student.phone || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Mother</td><td>\${escapeHtml(student.mother || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Mother Phone</td><td>\${escapeHtml(student.motherPhone || student.phone || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Phone</td><td>\${escapeHtml(student.phone || "N/A")}</td></tr>\r
                    <tr><td style="padding:3px 0;font-weight:700">Acad. Year</td><td>\${escapeHtml(student.currentYear || "N/A")}</td></tr>\r
                  </table>\r
                </div>\r
              </div>\r
\r
              <div style="padding:0 30px 20px">\r
                <div style="margin:20px 0 12px;font-weight:800;font-size:15px">Fee Details</div>\r
                <div style="overflow-x:auto">\r
                  <table style="width:100%;border-collapse:collapse;font-size:13px">\r
                    <thead>\r
                      <tr style="background:#e8eff8">\r
                        <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Month</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Assigned</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Applied</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Extra</th>\r
                        <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Due</th>\r
                        <th style="padding:10px 12px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Status</th>\r
                        <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5e6c80;border-bottom:2px solid #d8e2f0">Remarks</th>\r
                      </tr>\r
                    </thead>\r
                    <tbody>\${rowsHtml}</tbody>\r
                    <tfoot>\r
                      <tr style="background:#eef5ff;font-weight:800;color:#102a43">\r
                        <td style="padding:12px;border-top:2px solid #d8e2f0">TOTAL</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0">\${formatCurrency(summary.total)}</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0;color:#12805c">\${formatCurrency(summary.applied)}</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0;color:#0f766e">\${formatCurrency(summary.extra)}</td>\r
                        <td style="padding:12px;text-align:right;border-top:2px solid #d8e2f0;color:#991b1b">\${formatCurrency(summary.due)}</td>\r
                        <td style="border-top:2px solid #d8e2f0"></td>\r
                        <td style="border-top:2px solid #d8e2f0"></td>\r
                      </tr>\r
                    </tfoot>\r
                  </table>\r
                </div>\r
              </div>\r
\r
              <div style="padding:16px 30px 24px;border-top:1px solid #e8eef7;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;color:#5e6c80;font-size:12px">\r
                <span>This is a computer generated receipt.</span>\r
                <span>\${escapeHtml(schoolName)} | \${now.toLocaleDateString("en-IN")}</span>\r
              </div>\r
            </div>\`;\r
        }\r
\r
        window.openReceiptModal = () => {\r
          if (!currentStudent || !feeHistory.length) return showToast("No fee data available.", "error");\r
\r
          // Populate single fee selector\r
          $("receiptFeeSelect").innerHTML = feeHistory.map(f => \`<option value="\${f.id}">\${escapeHtml(f.month || f.id)}</option>\`).join("");\r
          document.querySelector('input[name="receiptType"][value="full"]').checked = true;\r
          $("singleMonthSelector").style.display = "none";\r
          renderReceiptPreview();\r
          $("receiptModal").style.display = "flex";\r
        };\r
\r
        window.openReceiptModalForFee = (feeId) => {\r
          if (!currentStudent) return;\r
          $("receiptFeeSelect").innerHTML = feeHistory.map(f => \`<option value="\${f.id}"\${f.id === feeId ? " selected" : ""}>\${escapeHtml(f.month || f.id)}</option>\`).join("");\r
          document.querySelector('input[name="receiptType"][value="single"]').checked = true;\r
          $("singleMonthSelector").style.display = "block";\r
          renderReceiptPreview();\r
          $("receiptModal").style.display = "flex";\r
        };\r
\r
        window.closeReceiptModal = () => {\r
          $("receiptModal").style.display = "none";\r
        };\r
\r
        window.downloadFullStatement = () => {\r
          document.querySelector('input[name="receiptType"][value="full"]').checked = true;\r
          $("singleMonthSelector").style.display = "none";\r
          renderReceiptPreview();\r
          downloadReceiptPDF();\r
        };\r
\r
        window.renderReceiptPreview = () => {\r
          const type = document.querySelector('input[name="receiptType"]:checked')?.value || "full";\r
          $("singleMonthSelector").style.display = type === "single" ? "block" : "none";\r
\r
          let feesToShow = feeHistory;\r
          if (type === "single") {\r
            const selectedId = $("receiptFeeSelect").value;\r
            feesToShow = feeHistory.filter(f => f.id === selectedId);\r
          }\r
\r
          $("receiptPreview").innerHTML = buildReceiptHtml(currentStudent, feesToShow, type === "single");\r
        };\r
\r
        window.printReceipt = () => {\r
          const html = $("receiptPreview").innerHTML;\r
          $("printContent").innerHTML = html;\r
          setTimeout(() => window.print(), 150);\r
        };\r
\r
        window.downloadReceiptPDF = () => {\r
          const type = document.querySelector('input[name="receiptType"]:checked')?.value || "full";\r
          let feesToShow = feeHistory;\r
          if (type === "single") {\r
            const selectedId = $("receiptFeeSelect").value;\r
            feesToShow = feeHistory.filter(f => f.id === selectedId);\r
          }\r
\r
          const html = buildReceiptHtml(currentStudent, feesToShow, type === "single");\r
          const w = window.open("", "_blank");\r
          w.document.write(\`<!DOCTYPE html><html><head>\r
<title>Fee Receipt</title><style>body{margin:0;font-family:'Segoe UI',Tahoma,sans-serif}@media print{body{margin:0}}</style></head><body>\${html}<script>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\\/script></body></html>\`);\r
          w.document.close();\r
        };\r
\r
        // ── REGISTRATION FORM PRINT ────────────────────────────────────\r
\r
        async function getStudentFeeSummary(studentId) {\r
          return calculateStudentFeeSummary(await loadFeesForStudent(studentId));\r
        }\r
\r
        async function buildPrintMarkup(student) {\r
          const feeSummary = await getStudentFeeSummary(student.studentId);\r
          const schoolName = window.SchoolBranding?.getSchoolName() || "Schoolix Academy";\r
          return \`\r
            <div style="font-family:'Aptos','Segoe UI',Tahoma,sans-serif;max-width:900px;margin:0 auto;padding:28px 30px;color:#142033">\r
              <div style="border:2px solid #0f6cbd;border-radius:22px;overflow:hidden">\r
                <div style="padding:24px 30px;background:linear-gradient(135deg,#0f6cbd,#0b4f8a);color:#fff">\r
                  <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;opacity:.88">\${escapeHtml(schoolName)}</div>\r
                  <h1 style="margin:10px 0 6px;font-size:32px;letter-spacing:-.02em">Student Registration Form</h1>\r
                  <p style="margin:0;font-size:14px;opacity:.88">Registration ID: \${escapeHtml(student.studentId || student.id || "N/A")}</p>\r
                </div>\r
                <div style="padding:28px 30px;background:#fff">\r
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px">\r
                    <div>\r
                      <h3 style="margin:0 0 12px;font-size:18px;color:#0b4f8a">Student Details</h3>\r
                      <table style="width:100%;border-collapse:collapse;font-size:14px">\r
                        <tr><td style="padding:8px 0;font-weight:700;width:42%">Name</td><td>\${escapeHtml(student.name || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Student ID</td><td>\${escapeHtml(student.studentId || student.id || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Aadhaar</td><td>\${escapeHtml(student.aadharNumber || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Email</td><td>\${escapeHtml(student.email || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Class</td><td>\${escapeHtml(student.class || "N/A")}-\${escapeHtml(student.section || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Roll no.</td><td>\${escapeHtml(student.roll || "TBA")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Date of Admission</td><td>\${escapeHtml(student.dateOfAdmission || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Year of admission</td><td>\${escapeHtml(student.yearOfAdmission || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Academic year</td><td>\${escapeHtml(student.currentYear || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Date of birth</td><td>\${escapeHtml(student.dob || "N/A")}</td></tr>\r
                      </table>\r
                    </div>\r
                    <div>\r
                      <h3 style="margin:0 0 12px;font-size:18px;color:#0b4f8a">Parent Details</h3>\r
                      <table style="width:100%;border-collapse:collapse;font-size:14px">\r
                        <tr><td style="padding:8px 0;font-weight:700;width:42%">Father</td><td>\${escapeHtml(student.father || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Father Phone</td><td>\${escapeHtml(student.fatherPhone || student.phone || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Mother</td><td>\${escapeHtml(student.mother || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Mother Phone</td><td>\${escapeHtml(student.motherPhone || student.phone || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Phone</td><td>\${escapeHtml(student.phone || "N/A")}</td></tr>\r
                        <tr><td style="padding:8px 0;font-weight:700">Address</td><td>\${escapeHtml(student.address || "N/A")}</td></tr>\r
                      </table>\r
                    </div>\r
                  </div>\r
                  <div style="border:1px solid #d8e2f0;border-radius:18px;padding:18px 20px;background:#f7fbfd">\r
                    <h3 style="margin:0 0 12px;font-size:18px;color:#0b4f8a">Fee Summary</h3>\r
                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">\r
                      <div style="background:#fff;border:1px solid #d8e2f0;border-radius:14px;padding:14px"><div style="font-size:12px;text-transform:uppercase;color:#5e6c80;font-weight:700">Assigned</div><div style="font-size:22px;font-weight:800;margin-top:6px">\${formatCurrency(feeSummary.total)}</div></div>\r
                      <div style="background:#fff;border:1px solid #d8e2f0;border-radius:14px;padding:14px"><div style="font-size:12px;text-transform:uppercase;color:#5e6c80;font-weight:700">Applied</div><div style="font-size:22px;font-weight:800;margin-top:6px;color:#12805c">\${formatCurrency(feeSummary.applied)}</div></div>\r
                      <div style="background:#fff;border:1px solid #d8e2f0;border-radius:14px;padding:14px"><div style="font-size:12px;text-transform:uppercase;color:#5e6c80;font-weight:700">Extra</div><div style="font-size:22px;font-weight:800;margin-top:6px;color:#0d9488">\${formatCurrency(feeSummary.extra)}</div></div>\r
                      <div style="background:#fff;border:1px solid #d8e2f0;border-radius:14px;padding:14px"><div style="font-size:12px;text-transform:uppercase;color:#5e6c80;font-weight:700">Due</div><div style="font-size:22px;font-weight:800;margin-top:6px;color:#b42318">\${formatCurrency(feeSummary.due)}</div></div>\r
                    </div>\r
                  </div>\r
                  <div style="margin-top:24px;padding-top:18px;border-top:1px solid #d8e2f0;color:#5e6c80;font-size:12px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">\r
                    <span>Generated on \${new Date().toLocaleDateString("en-IN")}</span>\r
                    <span>\${escapeHtml(schoolName)} digital admission record</span>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\`;\r
        }\r
\r
        window.printRegistrationForm = async (student = currentStudent) => {\r
          try {\r
            if (!student) return showToast("No student selected.", "error");\r
            $("printContent").innerHTML = await buildPrintMarkup(student);\r
            setTimeout(() => window.print(), 150);\r
          } catch (e) {\r
            console.error("Print failed:", e);\r
            showToast("Unable to prepare registration form.", "error");\r
          }\r
        };\r
\r
        window.printRecentStudent = async () => {\r
          if (!recentStudent) return showToast("No recent student available.", "error");\r
          await printRegistrationForm(recentStudent);\r
        };\r
\r
        window.goToStudents = () => { window.location.href = "#/students.html"; };\r
\r
        window.openFeeConfigModal = () => {\r
          $("pgFeeInput").value = feeConfig.PG || 0;\r
          $("lkgFeeInput").value = feeConfig.LKG || 0;\r
          $("ukgFeeInput").value = feeConfig.UKG || 0;\r
          ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].forEach(v => { $(\`class\${v}FeeInput\`).value = feeConfig[v] || 0; });\r
          $("feeConfigModal").style.display = "flex";\r
        };\r
\r
        window.closeFeeConfigModal = () => { $("feeConfigModal").style.display = "none"; };\r
\r
        window.saveFeeConfig = async () => {\r
          try {\r
            const newConfig = {\r
              PG: Number($("pgFeeInput").value || DEFAULT_FEE_CONFIG.PG),\r
              LKG: Number($("lkgFeeInput").value || DEFAULT_FEE_CONFIG.LKG),\r
              UKG: Number($("ukgFeeInput").value || DEFAULT_FEE_CONFIG.UKG)\r
            };\r
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].forEach(v => { newConfig[v] = Number($(\`class\${v}FeeInput\`).value || 0); });\r
            feeConfig = newConfig;\r
            await setDoc(doc(db, "schools", currentUser.uid, "config", "fees_config"), {\r
              type: "fees", fees: newConfig, updatedAt: new Date(), updatedBy: currentUser.email || ""\r
            });\r
            updateFeeDisplay();\r
            showAutoFees();\r
            closeFeeConfigModal();\r
            showToast("Fee configuration saved.");\r
          } catch (e) {\r
            console.error("Fee config save failed:", e);\r
            showToast(e.message || "Unable to save fee configuration.", "error");\r
          }\r
        };\r
\r
        window.closeModal = () => {\r
          $("feesModal").style.display = "none";\r
          $("printBtn").style.display = "none";\r
          $("printReceiptBtn").style.display = "none";\r
          $("studentFeeSummary").style.display = "none";\r
          $("historySection").innerHTML = "";\r
          $("extraBalanceBanner").style.display = "none";\r
          currentStudent = null;\r
          feeHistory = [];\r
          resetFeeForm();\r
        };\r
\r
        \r
        // ── SESSION DROPDOWN ────────────────────────────────────────────────\r
        async function loadSessionDropdown() {\r
          const sel = $("currentYear");\r
          if (!sel) return;\r
          sel.innerHTML = '<option value="">Loading sessions…</option>';\r
          try {\r
            const snap = await getDocs(collection(db, "schools", currentUser.uid, "sessions"));\r
            // get active session\r
            let activeId = null;\r
            try {\r
              const activeSnap = await getDoc(doc(db, "schools", currentUser.uid, "settings", "activeSession"));\r
              if (activeSnap.exists()) activeId = activeSnap.data().sessionId;\r
            } catch(e) {}\r
            let viewSessionId = "";\r
            try { viewSessionId = localStorage.getItem("schoolix.viewSessionId") || ""; } catch (_) {}\r
            sel.innerHTML = '<option value="">— Select session —</option>';\r
            let defaultVal = "";\r
            snap.forEach(d => {\r
              const data = d.data();\r
              const isViewing = d.id === (viewSessionId || activeId);\r
              const opt = document.createElement("option");\r
              opt.value = data.session;\r
              opt.dataset.id = d.id;\r
              opt.dataset.locked = data.locked ? "1" : "0";\r
              opt.dataset.classesLocked = data.classesLocked ? "1" : "0";\r
              opt.textContent = data.session + (isViewing ? " (Viewing)" : "") + (d.id === activeId ? " (Active)" : "") + (data.locked ? " (Locked)" : "") + (data.classesLocked ? " (Classes Locked)" : "");\r
              if (isViewing) {\r
                opt.selected = true;\r
                defaultVal = data.session;\r
                activeSessionId = d.id;\r
                activeSessionLabel = data.session || "";\r
                activeSessionLocked = data.locked === true;\r
              }\r
              sel.appendChild(opt);\r
            });\r
            if (snap.empty) {\r
              sel.innerHTML = '<option value="">No sessions saved — go to Additional Settings</option>';\r
            }\r
          } catch(e) {\r
            console.error("Session load error:", e);\r
            sel.innerHTML = '<option value="">Error loading sessions</option>';\r
          }\r
        }\r
\r
onAuthStateChanged(auth, async (user) => {\r
          if (!user) { window.location.href = "#/index.html"; return; }\r
          currentUser = user;\r
          initializeClasses();\r
          setDefaults();\r
          await loadSessionDropdown();\r
          await loadFeeConfig();\r
          await loadMaxSectionLimit();\r
        });\r
\r
        $("studentPhoto")?.addEventListener("change", updateStudentPhotoPreview);\r
        $("searchId").addEventListener("keypress", e => { if (e.key === "Enter") fetchStudent(); });\r
        $("amount").addEventListener("input", checkAutoUpdate);\r
        $("month").addEventListener("change", checkAutoUpdate);\r
        $("status").addEventListener("change", checkAutoUpdate);\r
\r
        window.addEventListener("click", e => {\r
          if (e.target === $("feesModal")) closeModal();\r
          if (e.target === $("feeConfigModal")) closeFeeConfigModal();\r
          if (e.target === $("receiptModal")) closeReceiptModal();\r
          if (e.target === $("adjustExtraModal")) closeAdjustExtraModal();\r
\r
        });\r
        window.saveMaxSectionLimit = async () => {\r
          try {\r
            const value = parseInt($("maxPerSection").value, 10);\r
\r
            if (!value || value <= 0) {\r
              return showToast("Enter valid number", "error");\r
            }\r
\r
            await setDoc(\r
              doc(db, "schools", currentUser.uid, "config", "section_config"),\r
              { maxPerSection: value },\r
              { merge: true }\r
            );\r
\r
            savedMaxPerSection = String(value);\r
            $("maxPerSection").value = savedMaxPerSection;\r
            showToast("Saved successfully");\r
          } catch (e) {\r
            console.error(e);\r
            showToast("Failed to save", "error");\r
          }\r
        };\r
        async function loadMaxSectionLimit() {\r
          try {\r
            const snap = await getDoc(\r
              doc(db, "schools", currentUser.uid, "config", "section_config")\r
            );\r
\r
            if (snap.exists() && Number(snap.data().maxPerSection) > 0) {\r
              savedMaxPerSection = String(Number(snap.data().maxPerSection));\r
              $("maxPerSection").value = savedMaxPerSection;\r
            }\r
          } catch (e) {\r
            console.error("Load failed", e);\r
          }\r
        }\r
      `},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
