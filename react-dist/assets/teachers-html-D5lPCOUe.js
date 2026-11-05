const e={file:"teachers.html",title:"Teacher Operations",htmlClass:"",bodyClass:"",body:`\r
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
        <header class="panel hero">\r
            <div class="hero-copy">\r
                <div class="eyebrow">Faculty Operations</div>\r
                <h1 id="heroSchoolName">Teacher Operations Hub</h1>\r
                <p id="heroSubtitle">Create teacher accounts, mark daily attendance with check-in and check-out time,\r
                    and manage month-wise salary payout records.</p>\r
            </div>\r
            <div class="hero-actions">\r
                <button type="button" class="btn btn-light" onclick="goBack()">Back to Dashboard</button>\r
            </div>\r
        </header>\r
\r
        <section class="stats-grid">\r
            <div class="panel stat-card">\r
                <div class="stat-label">Total Teachers</div>\r
                <div class="stat-value" id="teacherCountStat">0</div>\r
                <div class="stat-note">Active teacher accounts under this school panel.</div>\r
            </div>\r
            <div class="panel stat-card">\r
                <div class="stat-label">Today Present</div>\r
                <div class="stat-value" id="todayPresentStat">0</div>\r
                <div class="stat-note" id="todayAttendanceNote">Attendance appears after the selected date is loaded.\r
                </div>\r
            </div>\r
            <div class="panel stat-card">\r
                <div class="stat-label">This Month Paid</div>\r
                <div class="stat-value" id="monthlyPaidStat">₹0</div>\r
                <div class="stat-note">Total salary already paid in the selected salary month.</div>\r
            </div>\r
            <div class="panel stat-card">\r
                <div class="stat-label">Pending Payroll</div>\r
                <div class="stat-value" id="monthlyPendingStat">₹0</div>\r
                <div class="stat-note">Remaining salary balance across generated salary records.</div>\r
            </div>\r
        </section>\r
\r
        <section class="panel tabs-panel">\r
            <div class="tabs">\r
                <button type="button" class="tab-btn active" data-tab="directory"\r
                    onclick="switchTab('directory')">Teacher Accounts</button>\r
                <button type="button" class="tab-btn" data-tab="attendance" onclick="switchTab('attendance')">Daily\r
                    Attendance</button>\r
                <button type="button" class="tab-btn" data-tab="salary" onclick="switchTab('salary')">Salary\r
                    Desk</button>\r
            </div>\r
        </section>\r
\r
        <section class="panel tab-panel active" id="directoryTab">\r
            <div class="section-grid">\r
                <div class="section-card">\r
                    <div class="section-header">\r
                        <div>\r
                            <h2>Create Teacher Account</h2>\r
                            <p>Assign login access, class responsibility, and base monthly salary in one go.</p>\r
                        </div>\r
                    </div>\r
                    <form id="addTeacherForm">\r
                        <div class="form-grid">\r
                            <div class="field">\r
                                <label for="teacherName">Teacher Name</label>\r
                                <input type="text" id="teacherName" placeholder="Enter full name" required>\r
                            </div>\r
                            <div class="field">\r
                                <label for="teacherEmail">Email Address</label>\r
                                <input type="email" id="teacherEmail" placeholder="teacher@school.com" required>\r
                            </div>\r
                            <div class="field">\r
                                <label for="teacherPassword">Password</label>\r
                                <input type="password" id="teacherPassword" placeholder="Minimum 6 characters"\r
                                    minlength="6" required>\r
                            </div>\r
                            <div class="field">\r
                                <label for="teacherSalary">Monthly Salary</label>\r
                                <input type="number" id="teacherSalary" placeholder="45000" min="0" required>\r
                            </div>\r
                            <div class="field">\r
                                <label for="classSelect">Assigned Class</label>\r
                                <select id="classSelect" onchange="updateSections()">\r
                                    <option value="">Select class</option>\r
                                </select>\r
                            </div>\r
                            <div class="field">\r
                                <label for="sectionSelect">Assigned Section</label>\r
                                <select id="sectionSelect">\r
                                    <option value="">Select section</option>\r
                                </select>\r
                            </div>\r
                            <div class="field full">\r
                                <label>Class Teacher Assignments</label>\r
                                <div class="assignment-picker">\r
                                    <button type="button" class="btn btn-secondary" onclick="addTeacherAssignment()">Add\r
                                        Selected Class</button>\r
                                    <div id="teacherAssignmentsList" class="assignment-list"></div>\r
                                </div>\r
                                <div class="helper-text">Add one or more class-section responsibilities. Teacher will\r
                                    see only these classes in their panel.</div>\r
                            </div>\r
                            <div class="field full">\r
                                <label>Assigned Subjects for Teaching</label>\r
                                <div class="assignment-picker">\r
                                    <div style="display:flex; gap:8px; width:100%;">\r
                                        <select id="teacherSubjectSelect" style="flex:1;">\r
                                            <option value="">Select subject</option>\r
                                        </select>\r
                                        <button type="button" class="btn btn-secondary" onclick="addDraftTeacherSubject()">Add Subject</button>\r
                                    </div>\r
                                    <div id="teacherSubjectsList" class="assignment-list" style="margin-top:8px;"></div>\r
                                </div>\r
                                <div class="helper-text">Assign one or multiple subjects for this teacher. These subjects will link to this teacher in timetable slots.</div>\r
                            </div>\r
                            <div class="field full">\r
                                <label for="teacherPhoto">Teacher Photo</label>\r
                                <input type="file" id="teacherPhoto" accept="image/*">\r
                                <div class="helper-text">Optional. The photo appears on the teacher dashboard and admin\r
                                    teacher panel.</div>\r
                            </div>\r
                            <div class="field full">\r
                                <button type="submit" class="btn btn-primary" id="createTeacherBtn">Create Teacher\r
                                    Account</button>\r
                            </div>\r
                        </div>\r
                    </form>\r
                </div>\r
\r
                <div class="section-card">\r
                    <div class="section-header">\r
                        <div>\r
                            <h2>Quick School Snapshot</h2>\r
                            <p>The current teacher and payroll summary refreshes as you work.</p>\r
                        </div>\r
                    </div>\r
                    <div class="summary-box">\r
                        <div class="pill-row">\r
                            <span class="pill" id="schoolNamePill">School panel</span>\r
                            <span class="pill" id="salaryMonthPill">Salary month</span>\r
                        </div>\r
                        <div class="summary-grid">\r
                            <div class="mini-stat"><span>Teachers</span><strong id="summaryTeacherCount">0</strong>\r
                            </div>\r
                            <div class="mini-stat"><span>Attendance Marked</span><strong\r
                                    id="summaryAttendanceMarked">0</strong></div>\r
                            <div class="mini-stat"><span>Paid Out</span><strong id="summaryPaidOut">₹0</strong></div>\r
                            <div class="mini-stat"><span>Pending</span><strong id="summaryPendingOut">₹0</strong></div>\r
                        </div>\r
                    </div>\r
\r
                    <div class="policy-card">\r
                        <div class="policy-header">\r
                            <div class="policy-icon"></div>\r
                            <div>\r
                                <div class="policy-title">No Deduction Absent Policy</div>\r
                                <div class="policy-subtitle">Absent days up to this limit won't deduct salary</div>\r
                            </div>\r
                        </div>\r
                        <div class="form-grid" style="margin-top:14px;">\r
                            <div class="field">\r
                                <label for="noDeductionDays">No Deduction Absent Days / Month</label>\r
                                <input type="number" id="noDeductionDays" placeholder="e.g. 2" min="0" max="31"\r
                                    value="0">\r
                            </div>\r
                            <div class="field">\r
                                <label>&nbsp;</label>\r
                                <button type="button" class="btn btn-primary" onclick="saveLeavePolicy()">Save\r
                                    Policy</button>\r
                            </div>\r
                        </div>\r
                        <div class="helper-text info-note" id="leavePolicyNote">\r
                            Currently: <strong id="currentLeavePolicy">0 days</strong> absent days per month are allowed\r
                            without deduction. Extra absent days will be deducted from salary.\r
                        </div>\r
                    </div>\r
\r
                    <div class="helper-text info-note">Removing a teacher hides them from active attendance and salary\r
                        generation, while keeping their old attendance and salary records searchable in Removed\r
                        Teachers.</div>\r
                </div>\r
            </div>\r
\r
            <div class="section-card">\r
                <div class="section-header">\r
                    <div>\r
                        <h3>Teachers Directory</h3>\r
                        <p>Update monthly salary, jump straight into salary management, edit teacher details, or remove\r
                            a teacher record.</p>\r
                    </div>\r
                    <div class="search-wrap">\r
                        <input type="text" id="teacherSearch"\r
                            placeholder="Search by name, email, ID, class, section or status">\r
                        <div class="button-row top-gap teacher-directory-switch">\r
                            <button type="button" class="btn btn-primary" id="activeTeacherViewBtn"\r
                                onclick="setTeacherDirectoryView('active')">Active Teachers</button>\r
                            <button type="button" class="btn btn-light" id="removedTeacherViewBtn"\r
                                onclick="setTeacherDirectoryView('removed')">Removed Teachers</button>\r
                        </div>\r
                    </div>\r
                </div>\r
                <div id="teachersList" class="teacher-list"></div>\r
            </div>\r
        </section>\r
\r
        <section class="panel tab-panel" id="attendanceTab">\r
            <div class="section-card">\r
                <div class="section-header">\r
                    <div>\r
                        <h2>Teacher Daily Attendance</h2>\r
                        <p>Mark teacher attendance day by day, store check-in and check-out time, and keep remarks with\r
                            the record.</p>\r
                    </div>\r
                    <!-- ─── NEW: Monthly Report Button ─── -->\r
                    <div>\r
                        <button type="button" class="btn btn-secondary" onclick="openMonthlyReportModal()">Monthly\r
                            Report</button>\r
                    </div>\r
                </div>\r
                <div class="attendance-toolbar">\r
                    <div class="field">\r
                        <label for="attendanceDate">Attendance Date</label>\r
                        <input type="date" id="attendanceDate">\r
                    </div>\r
                    <div class="field">\r
                        <label>Bulk Status</label>\r
                        <div class="button-row">\r
                            <button type="button" class="btn btn-secondary"\r
                                onclick="fillTeacherAttendanceStatus('Present')">All Present</button>\r
                            <button type="button" class="btn btn-warning"\r
                                onclick="fillTeacherAttendanceStatus('Half Day')">All Half Day</button>\r
                            <button type="button" class="btn btn-danger"\r
                                onclick="fillTeacherAttendanceStatus('Absent')">All Absent</button>\r
                        </div>\r
                    </div>\r
                    <div class="field">\r
                        <label>Quick Time</label>\r
                        <div class="button-row">\r
                            <button type="button" class="btn btn-light" onclick="setBulkCheckInNow()">Set Check-In\r
                                Now</button>\r
                            <button type="button" class="btn btn-light" onclick="clearBulkTimes()">Clear Times</button>\r
                        </div>\r
                    </div>\r
                    <div class="field">\r
                        <label>Actions</label>\r
                        <div class="button-row">\r
                            <button type="button" class="btn btn-secondary"\r
                                onclick="loadTeacherAttendanceForDate()">Reload Date</button>\r
                            <button type="button" class="btn btn-warning" onclick="markRemainingTeachersAbsent()">Mark\r
                                Remaining Absent</button>\r
                            <button type="button" class="btn btn-success" onclick="saveTeacherAttendance()">Save\r
                                Attendance</button>\r
                        </div>\r
                    </div>\r
                </div>\r
\r
                <div class="mini-grid attendance-mini-grid">\r
                    <div class="mini-stat"><span>Present</span><strong id="attendancePresentCount">0</strong></div>\r
                    <div class="mini-stat"><span>Half Day</span><strong id="attendanceHalfCount">0</strong></div>\r
                    <div class="mini-stat"><span>Absent</span><strong id="attendanceAbsentCount">0</strong></div>\r
                </div>\r
\r
                <div id="teacherAttendanceList" class="attendance-list"></div>\r
            </div>\r
        </section>\r
\r
        <section class="panel tab-panel" id="salaryTab">\r
            <div class="section-grid">\r
                <div class="section-card">\r
                    <div class="section-header">\r
                        <div>\r
                            <h2>Monthly Salary Generator</h2>\r
                            <p>Generate payroll from monthly salary plus marked attendance. Absent days follow the\r
                                no-deduction limit, and half-day deducts half-day value.</p>\r
                        </div>\r
                    </div>\r
                    <div class="salary-toolbar">\r
                        <div class="field">\r
                            <label for="salaryTeacherSelect">Teacher</label>\r
                            <select id="salaryTeacherSelect">\r
                                <option value="">Select teacher</option>\r
                            </select>\r
                        </div>\r
                        <div class="field">\r
                            <label for="salaryMonth">Salary Month</label>\r
                            <input type="month" id="salaryMonth">\r
                        </div>\r
                        <div class="field">\r
                            <label for="salaryStatusFilter">Payment Status</label>\r
                            <select id="salaryStatusFilter">\r
                                <option value="">All records</option>\r
                                <option value="due">Due / unpaid</option>\r
                                <option value="unpaid">Unpaid only</option>\r
                                <option value="partial">Partial due</option>\r
                                <option value="paid">Paid only</option>\r
                            </select>\r
                        </div>\r
                        <div class="field">\r
                            <label>Actions</label>\r
                            <div class="button-row">\r
                                <button type="button" class="btn btn-primary"\r
                                    onclick="generateSelectedSalaryRecord()">Generate Selected</button>\r
                                <button type="button" class="btn btn-secondary"\r
                                    onclick="loadSalaryPreview()">Preview</button>\r
                                <button type="button" class="btn btn-warning"\r
                                    onclick="generateAllSalaryRecords()">Generate All</button>\r
                            </div>\r
                        </div>\r
                    </div>\r
                    <div id="salaryPreviewBox" class="summary-box">\r
                        <strong>Select a teacher and month to preview salary.</strong>\r
                        <div class="helper-text top-gap">Generated salary records stay editable through payment history\r
                            below.</div>\r
                    </div>\r
                </div>\r
\r
                <div class="section-card">\r
                    <div class="section-header">\r
                        <div>\r
                            <h2>Salary Payment Entry</h2>\r
                            <p>Add salary payments to the selected salary record. Status updates automatically to paid\r
                                or partial paid.</p>\r
                        </div>\r
                    </div>\r
\r
                    <div class="form-grid">\r
                        <div class="field">\r
                            <label for="paymentAmount">Payment Amount</label>\r
                            <input type="number" id="paymentAmount" placeholder="0" min="0">\r
                        </div>\r
                        <div class="field">\r
                            <label for="paymentDate">Payment Date</label>\r
                            <input type="date" id="paymentDate">\r
                        </div>\r
                        <div class="field full">\r
                            <label for="paymentNote">Payment Note</label>\r
                            <textarea id="paymentNote" placeholder="Optional note for this salary payment"></textarea>\r
                        </div>\r
                        <div class="field full">\r
                            <button type="button" class="btn btn-success" id="recordPaymentBtn"\r
                                onclick="recordSalaryPayment()">Record Salary Payment</button>\r
                        </div>\r
                    </div>\r
                    <div class="helper-text top-gap" id="activeSalaryHint">Pick a generated salary record from the list\r
                        below before recording payment.</div>\r
                </div>\r
            </div>\r
\r
            <div class="section-card">\r
                <div class="section-header">\r
                    <div>\r
                        <h3>Salary Records</h3>\r
                        <p>Inspect attendance-linked salary, payment history, and remaining payable balance.</p>\r
                    </div>\r
                </div>\r
                <div id="salaryRecordsList" class="salary-records"></div>\r
            </div>\r
        </section>\r
    </div>\r
\r
    <!-- ═══════════════════════════════════════════════\r
     MODAL: Monthly Attendance Report\r
═══════════════════════════════════════════════ -->\r
    <div id="teacherQrModal" class="modal-overlay" style="display:none;" onclick="closeTeacherQrModal(event)">\r
        <div class="modal-box qr-modal-box" onclick="event.stopPropagation()">\r
            <div class="modal-header">\r
                <div>\r
                    <h2 id="qrModalTitle">Teacher QR</h2>\r
                    <p id="qrModalSubtitle">Scan this QR from the teacher dashboard to mark today's attendance.</p>\r
                </div>\r
                <button type="button" class="btn btn-light modal-close" onclick="closeTeacherQrModal()">Close</button>\r
            </div>\r
            <div class="field top-gap">\r
                <label for="teacherQrMode">QR Attendance Type</label>\r
                <select id="teacherQrMode">\r
                    <option value="checkin">Check-In Present</option>\r
                    <option value="halfday">Half Day Check-Out</option>\r
                    <option value="checkout">Check-Out</option>\r
                </select>\r
            </div>\r
            <div class="button-row top-gap">\r
                <button type="button" class="btn btn-primary" id="confirmGenerateQrBtn"\r
                    onclick="confirmGenerateTeacherAttendanceQr()">Generate Selected QR</button>\r
            </div>\r
            <div class="qr-display">\r
                <img id="teacherQrImage" alt="Teacher attendance QR code">\r
                <div class="qr-code-text" id="teacherQrCodeText"></div>\r
            </div>\r
            <div class="helper-text top-gap" id="teacherQrMeta"></div>\r
        </div>\r
    </div>\r
\r
    <div id="monthlyReportModal" class="modal-overlay" style="display:none;" onclick="closeMonthlyReportModal(event)">\r
        <div class="modal-box" onclick="event.stopPropagation()">\r
            <div class="modal-header">\r
                <div>\r
                    <h2> Monthly Attendance Report</h2>\r
                    <p>Full month-wise attendance breakdown for each teacher.</p>\r
                </div>\r
                <button type="button" class="btn btn-light modal-close" onclick="closeMonthlyReportModal()">✕\r
                    Close</button>\r
            </div>\r
            <div class="modal-toolbar">\r
                <div class="field">\r
                    <label for="reportMonth">Select Month</label>\r
                    <input type="month" id="reportMonth">\r
                </div>\r
                <div class="field">\r
                    <label for="reportTeacherFilter">Filter by Teacher</label>\r
                    <select id="reportTeacherFilter">\r
                        <option value="">All Teachers</option>\r
                    </select>\r
                </div>\r
                <div class="field">\r
                    <label>&nbsp;</label>\r
                    <button type="button" class="btn btn-primary" onclick="loadMonthlyReport()">Load Report</button>\r
                </div>\r
            </div>\r
            <div id="monthlyReportContent" class="report-content">\r
                <div class="empty-state">Select a month and click Load Report to see attendance summary.</div>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <!-- ═══════════════════════════════════════════════\r
     MODAL: Edit Teacher Details\r
═══════════════════════════════════════════════ -->\r
    <div id="editTeacherClassesModal" class="modal-overlay" hidden aria-hidden="true" role="dialog" aria-modal="true"\r
        aria-labelledby="editTeacherClassesTitle">\r
        <div class="modal-box">\r
            <div class="modal-header">\r
                <div>\r
                    <h2 id="editTeacherClassesTitle">Edit Assigned Classes</h2>\r
                    <p id="editTeacherClassesSubtitle">Add or remove class-section assignments only.</p>\r
                </div>\r
                <button type="button" class="teacher-dialog-close" onclick="closeEditTeacherClassesModal()"\r
                    aria-label="Close class editor" title="Close">&times;</button>\r
            </div>\r
            <input type="hidden" id="editClassesTeacherUid">\r
            <div class="form-grid" style="margin-top:18px;">\r
                <div class="field">\r
                    <label for="editClassesClassSelect">Assigned Class</label>\r
                    <select id="editClassesClassSelect" onchange="updateEditClassSections()">\r
                        <option value="">Select class</option>\r
                    </select>\r
                </div>\r
                <div class="field">\r
                    <label for="editClassesSectionSelect">Assigned Section</label>\r
                    <select id="editClassesSectionSelect">\r
                        <option value="">Select section</option>\r
                    </select>\r
                </div>\r
                <div class="field full">\r
                    <label>Current Assignments</label>\r
                    <div class="assignment-picker">\r
                        <button type="button" class="btn btn-secondary" onclick="addTeacherClassOnlyAssignment()">Add\r
                            Selected Class</button>\r
                        <div id="editClassesAssignmentsList" class="assignment-list"></div>\r
                    </div>\r
                    <div class="helper-text">Only assigned classes will change. Name, email, salary, photo and other\r
                        details stay untouched.</div>\r
                </div>\r
                <div class="field full">\r
                    <div class="edit-teacher-actions">\r
                        <button type="button" class="btn btn-light"\r
                            onclick="closeEditTeacherClassesModal()">Cancel</button>\r
                        <button type="button" class="btn btn-success" id="saveEditClassesBtn"\r
                            onclick="saveTeacherClassAssignments()">Save Classes</button>\r
                    </div>\r
                </div>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <div id="editTeacherModal" class="modal-overlay" hidden aria-hidden="true" role="dialog" aria-modal="true"\r
        aria-labelledby="editTeacherModalTitle">\r
        <div class="modal-box">\r
            <div class="modal-header">\r
                <div>\r
                    <h2 id="editTeacherModalTitle">Edit Teacher Details</h2>\r
                    <p>Update name, email, class, and section assignments.</p>\r
                </div>\r
                <button type="button" class="teacher-dialog-close" id="editTeacherCloseBtn"\r
                    aria-label="Close edit teacher dialog" title="Close">&times;</button>\r
            </div>\r
            <input type="hidden" id="editTeacherUid">\r
            <input type="hidden" id="removeTeacherPhotoFlag" value="0">\r
            <div class="form-grid" style="margin-top:18px;">\r
                <div class="field full">\r
                    <label>Teacher Photo</label>\r
                    <div class="teacher-photo-editor">\r
                        <button type="button" class="teacher-photo-preview" id="editTeacherPhotoPreview"\r
                            onclick="previewCurrentTeacherPhoto()">No photo</button>\r
                        <div class="teacher-photo-controls">\r
                            <input type="file" id="editTeacherPhoto" accept="image/*"\r
                                onchange="previewEditedTeacherPhoto()">\r
                            <div class="button-row">\r
                                <button type="button" class="btn btn-light" onclick="previewCurrentTeacherPhoto()">View\r
                                    Photo</button>\r
                                <button type="button" class="btn btn-secondary" onclick="removeTeacherPhoto()">Remove\r
                                    Photo</button>\r
                            </div>\r
                        </div>\r
                    </div>\r
                </div>\r
                <div class="field">\r
                    <label for="editTeacherName">Teacher Name</label>\r
                    <input type="text" id="editTeacherName" placeholder="Full name" required>\r
                </div>\r
                <div class="field">\r
                    <label for="editTeacherEmail">Email Address</label>\r
                    <input type="email" id="editTeacherEmail" placeholder="teacher@school.com" required>\r
                </div>\r
                <div class="field">\r
                    <label for="editClassSelect">Assigned Class</label>\r
                    <select id="editClassSelect" onchange="updateEditSections()">\r
                        <option value="">Select class</option>\r
                    </select>\r
                </div>\r
                <div class="field">\r
                    <label for="editSectionSelect">Assigned Section</label>\r
                    <select id="editSectionSelect">\r
                        <option value="">Select section</option>\r
                    </select>\r
                </div>\r
                <div class="field full">\r
                    <label>Class Teacher Assignments</label>\r
                    <div class="assignment-picker">\r
                        <button type="button" class="btn btn-secondary" onclick="addEditTeacherAssignment()">Add\r
                            Selected Class</button>\r
                        <div id="editTeacherAssignmentsList" class="assignment-list"></div>\r
                    </div>\r
                    <div class="helper-text">Use this when a teacher is class teacher for more than one class-section.\r
                    </div>\r
                </div>\r
                <div class="field full">\r
                    <label>Assigned Subjects for Teaching</label>\r
                    <div class="assignment-picker">\r
                        <div style="display:flex; gap:8px; width:100%;">\r
                            <select id="editTeacherSubjectSelect" style="flex:1;">\r
                                <option value="">Select subject</option>\r
                            </select>\r
                            <button type="button" class="btn btn-secondary" onclick="addEditTeacherSubject()">Add Subject</button>\r
                        </div>\r
                        <div id="editTeacherSubjectsList" class="assignment-list" style="margin-top:8px;"></div>\r
                    </div>\r
                    <div class="helper-text">Assign one or multiple subjects taught by this teacher.</div>\r
                </div>\r
                <div class="field full">\r
                    <div class="edit-teacher-actions">\r
                        <button type="button" class="btn btn-light" id="editTeacherCancelBtn">Cancel</button>\r
                        <button type="button" class="btn btn-success" id="saveEditTeacherBtn"\r
                            onclick="saveEditedTeacher()">Save Changes</button>\r
                    </div>\r
                </div>\r
            </div>\r
            <div class="helper-text top-gap">Note: Changing email here updates the Firestore profile only. Firebase Auth\r
                email is not changed automatically.</div>\r
        </div>\r
    </div>\r
\r
    <div id="photoPreviewModal" class="modal-overlay" style="display:none;" onclick="closePhotoPreviewModal(event)">\r
        <div class="modal-box photo-preview-box" onclick="event.stopPropagation()">\r
            <div class="modal-header">\r
                <div>\r
                    <h2 id="photoPreviewTitle">Photo</h2>\r
                    <p>Click outside or close to return.</p>\r
                </div>\r
                <button type="button" class="btn btn-light modal-close"\r
                    onclick="closePhotoPreviewModal()">Close</button>\r
            </div>\r
            <div class="photo-preview-stage">\r
                <img id="photoPreviewImage" alt="Preview">\r
            </div>\r
        </div>\r
    </div>\r
\r
    <script src="school-branding.js"><\/script>\r
    <script type="module" src="teachers-ops.js"><\/script>\r
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
`},{tag:"link",attributes:{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",rel:"stylesheet"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"teachers-ops.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"schoolix-polish.css"},text:""},{tag:"link",attributes:{rel:"stylesheet",href:"admin-shell.css?v=navbar-20260721"},text:""}],scripts:[{attributes:{id:"sxCriticalLoaderScript"},text:`\r
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
                } catch (_) { }\r
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
    `},{attributes:{src:"school-branding.js"},text:""},{attributes:{type:"module",src:"teachers-ops.js"},text:""},{attributes:{type:"module",src:"access-control.js"},text:""},{attributes:{src:"schoolix-polish.js"},text:""},{attributes:{src:"admin-shell.js?v=navbar-20260721"},text:""}]};export{e as default};
