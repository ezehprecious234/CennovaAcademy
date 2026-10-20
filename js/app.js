/* Cennova Academy UI layer. All actions are local demonstrations only. */
(function () {
  "use strict";
  var D = window.CennovaMock;
  if (!D) return;
  var body = document.body,
    portal = body.dataset.portal || "student",
    page = body.dataset.page || "dashboard";
  var isAdmin = portal === "admin";
  var studentLinks = [
    ["dashboard", "Dashboard", "⌂"],
    ["courses", "My Courses", "▣"],
    ["results", "Results & Grades", "◫"],
    ["timetable", "Timetable", "▤"],
    ["assignments", "Assignments", "✓"],
    ["announcements", "Announcements", "♢"],
    ["profile", "My Profile", "◉"],
    ["settings", "Settings", "⚙"],
  ];
  var adminLinks = [
    ["dashboard", "Dashboard", "⌂"],
    ["students", "Students", "♙"],
    ["courses", "Courses", "▣"],
    ["results", "Results", "◫"],
    ["assignments", "Assignments", "✓"],
    ["announcements", "Announcements", "♢"],
    ["timetable", "Timetable", "▤"],
    ["users", "Users & Admins", "♧"],
    ["settings", "Settings", "⚙"],
  ];
  var links = isAdmin ? adminLinks : studentLinks;
  var names = {
    dashboard: "Dashboard",
    courses: isAdmin ? "Course Management" : "My Courses",
    results: isAdmin ? "Results Management" : "Results & Grades",
    timetable: isAdmin ? "Timetable Management" : "Timetable",
    assignments: isAdmin ? "Assignment Management" : "Assignments",
    announcements: isAdmin ? "Announcement Management" : "Announcements",
    students: "Student Management",
    users: "User & Admin Management",
    profile: "My Profile",
    settings: "Settings",
    "course-details": "Course Details",
  };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>'"]/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[c];
    });
  };
  var fmtDate = function (s) {
    if (!s) return "—";
    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(s + "T12:00:00"));
  };
  var cap = function (s) {
    return String(s).replace(/\b\w/g, function (x) {
      return x.toUpperCase();
    });
  };
  var badge = function (s) {
    return (
      '<span class="badge ' +
      String(s).toLowerCase().replace(/\s+/g, "-") +
      '">' +
      esc(s) +
      "</span>"
    );
  };
  var avatar = function (initials, admin) {
    return (
      '<span class="avatar ' +
      (admin ? "admin" : "") +
      '">' +
      esc(initials) +
      "</span>"
    );
  };
  var href = function (key) {
    return key === "course-details" ? "course-details.html" : key + ".html";
  };
  var button = function (text, action, extra, cls) {
    return (
      '<button type="button" class="btn ' +
      (cls || "btn-light") +
      '" data-action="' +
      action +
      '" ' +
      (extra || "") +
      ">" +
      text +
      "</button>"
    );
  };

  function brand() {
    return '<a class="brand" href="dashboard.html"><span class="brand-mark">C</span><span>CENNOVA<br>ACADEMY</span></a>';
  }
  function nav() {
    return (
      '<aside class="sidebar" id="sidebar">' +
      brand() +
      '<div class="portal-tag">' +
      (isAdmin ? "Administration" : "Student portal") +
      '</div><nav><div class="nav-group"><div class="nav-label">Menu</div>' +
      links
        .map(function (l) {
          return (
            '<a class="nav-link ' +
            (page === l[0] ? "active" : "") +
            '" href="' +
            href(l[0]) +
            '"><span class="nav-icon">' +
            l[2] +
            "</span>" +
            l[1] +
            "</a>"
          );
        })
        .join("") +
      '</div></nav><div class="sidebar-foot">Cennova Academy Portal<a href="' +
      (isAdmin ? "login.html" : "login.html") +
      '">↪ Demo sign out</a></div></aside>'
    );
  }
  function shell(content) {
    var person = isAdmin
      ? { name: "Amina Lawal", initials: "AL", role: "System Administrator" }
      : D.student;
    body.className = "portal " + (isAdmin ? "admin-portal" : "student-portal");
    body.innerHTML =
      '<div class="shell">' +
      nav() +
      '<header class="topbar"><button class="mobile-menu" data-action="menu" aria-label="Open navigation">☰</button><div class="crumb">' +
      (isAdmin ? "Admin Portal" : "Student Portal") +
      " <span> / </span><strong>" +
      names[page] +
      '</strong></div><div class="top-actions"><button class="icon-btn" data-action="notifications" aria-label="Show notifications">♢<i class="notification-dot"></i></button><button class="profile-chip" data-action="profile-menu">' +
      avatar(person.initials, isAdmin) +
      "<span><strong>" +
      esc(person.name) +
      "</strong><small>" +
      esc(person.role || person.matric) +
      '</small></span></button></div></header><main class="main">' +
      content +
      '</main></div><div id="modal-root"></div><div id="toast-root" aria-live="polite"></div>';
  }
  function heading(title, text, action) {
    return (
      '<div class="page-head"><div><h1>' +
      title +
      "</h1><p>" +
      text +
      "</p></div>" +
      (action || "") +
      "</div>"
    );
  }
  function card(title, content, note) {
    return (
      '<section class="card"><div class="card-head"><div><h2 class="section-title">' +
      title +
      "</h2>" +
      (note ? '<p class="section-subtitle">' + note + "</p>" : "") +
      '</div></div><div class="card-body">' +
      content +
      "</div></section>"
    );
  }
  function stat(label, value, note, icon) {
    return (
      '<section class="card stat-card"><p class="stat-label">' +
      label +
      '</p><p class="stat-value">' +
      value +
      '</p><p class="stat-note ' +
      (note && note.indexOf("No ") === 0 ? "neutral" : "") +
      '">' +
      (note || "") +
      '</p><span class="stat-icon">' +
      icon +
      "</span></section>"
    );
  }
  function row(icon, title, sub, right) {
    return (
      '<div class="row-item"><span class="course-dot">' +
      icon +
      '</span><div><div class="row-title">' +
      title +
      '</div><div class="row-sub">' +
      sub +
      "</div></div>" +
      (right ? '<div class="row-meta">' + right + "</div>" : "") +
      "</div>"
    );
  }
  function empty(text) {
    return '<div class="empty"><b>Nothing to show yet</b>' + text + "</div>";
  }
  function searchFilter(entity, filters) {
    return (
      '<div class="toolbar"><div class="tool-left"><label class="search-box"><span>⌕</span><input data-search="' +
      entity +
      '" placeholder="Search ' +
      entity +
      '..."></label>' +
      (filters || "") +
      '</div><div class="tool-right">' +
      button(
        "+ Add " + cap(entity.slice(0, -1)),
        "modal",
        'data-entity="' + entity + '"',
        "btn-primary",
      ) +
      "</div></div>"
    );
  }
  function table(headers, rows, entity) {
    var count = (rows.match(/<tr/g) || []).length;
    return (
      '<section class="card"><div class="table-wrap"><table class="data-table" data-table="' +
      (entity || "") +
      '"><thead><tr>' +
      headers
        .map(function (x) {
          return "<th>" + x + "</th>";
        })
        .join("") +
      "</tr></thead><tbody>" +
      rows +
      '</tbody></table></div><div class="pagination"><span>Showing ' +
      (count ? "1–" + Math.min(5, count) : "0") +
      " of " +
      count +
      ' records</span><div class="pages"><button class="page-no active">1</button><button class="page-no">2</button><button class="page-no">›</button></div></div></section>'
    );
  }
  function studentDashboard() {
    var a = D.assignments,
      an = D.announcements;
    return (
      heading(
        "Welcome back, " + D.student.name.split(" ")[0] + "!",
        "Here is a snapshot of your academic progress this semester.",
      ) +
      '<div class="stat-grid">' +
      stat("Current CGPA", D.student.cgpa, "Excellent standing", "◫") +
      stat("Registered Courses", D.courses.length, "13 credit units", "▣") +
      stat(
        "Pending Assignments",
        a.filter(function (x) {
          return x.status !== "Submitted";
        }).length,
        "Due this week",
        "✓",
      ) +
      stat("Upcoming Classes", 2, "Next: CSC 301, 9:00 AM", "▤") +
      "</div>" +
      '<div class="overview-grid"><div class="stack">' +
      card(
        "Upcoming assignments",
        a
          .slice(0, 2)
          .map(function (x) {
            return row(
              "✓",
              x.title,
              x.course + " · Due " + fmtDate(x.due),
              badge(x.status),
            );
          })
          .join(""),
        "Stay ahead of your deadlines",
      ) +
      card(
        "Recent results",
        D.results
          .slice(0, 3)
          .map(function (x) {
            return row(
              x.grade,
              x.course,
              x.title,
              "<b>" + x.score + "%</b><br>" + badge(x.grade),
            );
          })
          .join(""),
        "Second Semester · 2024/2025",
      ) +
      '</div><div class="stack">' +
      card(
        "Academic profile",
        '<div class="row-list">' +
          row("ID", "Matriculation no.", D.student.matric) +
          row(
            "L3",
            "Programme",
            D.student.department + " · " + D.student.level,
          ) +
          row("G", "Current GPA", D.student.gpa + " / 5.00") +
          "</div>",
      ) +
      card(
        "Quick actions",
        '<div class="quick-grid"><a class="quick-link" href="courses.html">▣ View courses</a><a class="quick-link" href="results.html">◫ Check results</a><a class="quick-link" href="assignments.html">✓ My assignments</a><a class="quick-link" href="profile.html">◉ Update profile</a></div>',
      ) +
      card(
        "Latest announcement",
        an.length
          ? '<div class="row-title">' +
              an[0].title +
              '</div><p class="row-sub" style="margin:6px 0">' +
              an[0].text +
              '</p><a href="announcements.html" style="font-size:12px;color:var(--blue);font-weight:650">Read all announcements →</a>'
          : empty(""),
      ) +
      "</div></div>"
    );
  }
  function studentCourses() {
    return (
      heading(
        "My Courses",
        "Your registered courses for " +
          D.school.semester +
          ", " +
          D.school.session,
      ) +
      '<div class="toolbar"><div class="tool-left"><label class="search-box"><span>⌕</span><input data-search="course-card" placeholder="Search courses..."></label><select class="filter" data-filter="course-card"><option value="">All courses</option><option>CSC</option><option>MTH</option><option>GST</option></select></div><div class="tool-right">' +
      badge(D.courses.length + " Courses") +
      '</div></div><div class="course-grid" data-course-grid>' +
      D.courses
        .map(function (c) {
          return (
            '<article class="card course-card" data-filter-row="' +
            c.code +
            " " +
            c.title +
            '"><div class="course-code">' +
            c.code +
            "</div><h3>" +
            c.title +
            '</h3><div class="course-info"><div>Lecturer <b>' +
            c.lecturer +
            "</b></div><div>Semester <b>" +
            c.semester +
            "</b></div><div>Credit units <b>" +
            c.units +
            '</b></div></div><div class="course-footer">' +
            badge("Active") +
            '<a class="btn btn-light btn-sm" href="course-details.html">View details →</a></div></article>'
          );
        })
        .join("") +
      "</div>"
    );
  }
  function courseDetails() {
    var c = D.courses[0];
    return (
      '<a href="courses.html" class="row-sub">← Back to my courses</a><div style="height:12px"></div><section class="detail-hero"><div><div class="course-code" style="color:#bfe1ff">' +
      c.code +
      "</div><h1>" +
      c.title +
      "</h1><p>" +
      c.department +
      " · " +
      c.level +
      ' Level</p></div><div class="detail-tags"><span>' +
      c.units +
      " units</span><span>" +
      c.semester +
      ' Semester</span><span>Active</span></div></section><div class="detail-grid"><div class="stack">' +
      card(
        "Course overview",
        '<p class="detail-copy">This course introduces foundational ideas and hands-on problem solving. Course content, lecture material, attendance and submissions will be connected to your future learning API.</p>',
      ) +
      card(
        "Assessment breakdown",
        '<div class="info-list"><div><span>Continuous assessment</span><b>30%</b></div><div><span>Practical / laboratory</span><b>20%</b></div><div><span>Final examination</span><b>50%</b></div></div>',
      ) +
      "</div>" +
      card(
        "Course information",
        '<div class="info-list"><div><span>Lecturer</span><b>' +
          c.lecturer +
          "</b></div><div><span>Credit units</span><b>" +
          c.units +
          "</b></div><div><span>Semester</span><b>" +
          c.semester +
          "</b></div><div><span>Venue</span><b>Lecture Theatre 2</b></div></div>",
      ) +
      "</div>"
    );
  }
  function studentResults() {
    var rows = D.results.map(function (r) {
      return (
        '<tr data-filter-row="' +
        r.course +
        " " +
        r.title +
        " " +
        r.semester +
        '"><td><div class="table-main">' +
        r.course +
        '</div><div class="table-sub">' +
        r.title +
        "</div></td><td>" +
        r.units +
        "</td><td><b>" +
        r.score +
        "</b></td><td>" +
        badge(r.grade) +
        "</td><td>" +
        r.point +
        "</td><td>" +
        r.semester +
        '<div class="table-sub">' +
        r.session +
        "</div></td></tr>"
      );
    });
    return (
      heading(
        "Results & Grades",
        "Your published academic records. These are demonstration values only.",
      ) +
      '<div class="stat-grid"><div class="card stat-card"><p class="stat-label">Semester GPA</p><p class="stat-value">4.50</p><p class="stat-note">Second semester · 2024/2025</p></div><div class="card stat-card"><p class="stat-label">Cumulative GPA</p><p class="stat-value">' +
      D.student.cgpa +
      '</p><p class="stat-note">Across four semesters</p></div></div><div class="toolbar"><div class="tool-left"><label class="search-box"><span>⌕</span><input data-search="results" placeholder="Search results..."></label><select class="filter"><option>2024/2025</option><option>2025/2026</option></select></div></div>' +
      table(
        ["Course", "Units", "Score", "Grade", "Point", "Semester"],
        rows,
        "results",
      )
    );
  }
  function studentTimetable() {
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      times = ["09:00", "11:00", "13:00"];
    var cells =
      '<div class="tt-cell tt-head">Time</div>' +
      days
        .map(function (d) {
          return '<div class="tt-cell tt-head">' + d + "</div>";
        })
        .join("");
    times.forEach(function (t) {
      cells += '<div class="tt-cell tt-time">' + t + "</div>";
      days.forEach(function (d) {
        var e = D.timetable.find(function (x) {
          return x.day === d && x.start === t;
        });
        cells +=
          '<div class="tt-cell">' +
          (e
            ? '<div class="tt-course"><b>' +
              e.course +
              "</b><small>" +
              e.title +
              "</small><small>" +
              e.venue +
              "</small></div>"
            : "") +
          "</div>";
      });
    });
    return (
      heading("Class Timetable", D.school.semester + " · " + D.student.level) +
      '<section class="card"><div class="card-head"><div><h2 class="section-title">Weekly schedule</h2><p class="section-subtitle">Times shown in West Africa Time (WAT)</p></div>' +
      button("Print timetable", "print", "", "btn-light") +
      '</div><div class="card-body" style="padding:0;overflow:auto"><div class="timetable">' +
      cells +
      '</div><div class="timetable-mobile">' +
      days
        .map(function (d) {
          var es = D.timetable.filter(function (x) {
            return x.day === d;
          });
          return (
            '<div class="day-block"><div class="day-name">' +
            d +
            "</div>" +
            (es.length
              ? es
                  .map(function (e) {
                    return (
                      '<div class="class-line"><b>' +
                      e.course +
                      " · " +
                      e.title +
                      "</b><span>" +
                      e.start +
                      "–" +
                      e.end +
                      " · " +
                      e.venue +
                      "</span></div>"
                    );
                  })
                  .join("")
              : '<span class="row-sub">No scheduled class</span>') +
            "</div>"
          );
        })
        .join("") +
      "</div></div></section>"
    );
  }
  function studentAssignments() {
    return (
      heading(
        "Assignments",
        "Track your course work and demonstrate submission status.",
      ) +
      '<div class="assignment-list">' +
      D.assignments
        .map(function (a, i) {
          return (
            '<article class="card assignment-card"><div><h3>' +
            a.title +
            "</h3><p>" +
            a.description +
            '</p><div class="assignment-info"><span><b>' +
            a.course +
            "</b></span><span>Due " +
            fmtDate(a.due) +
            "</span><span>" +
            a.lecturer +
            '</span></div></div><div class="assignment-actions">' +
            badge(a.status) +
            " " +
            button(
              "View",
              "detail",
              'data-kind="assignment" data-index="' + i + '"',
              "btn-light btn-sm",
            ) +
            (a.status !== "Submitted"
              ? button(
                  "Mark submitted",
                  "submit-assignment",
                  'data-index="' + i + '"',
                  "btn-primary btn-sm",
                )
              : "") +
            "</div></article>"
          );
        })
        .join("") +
      "</div>"
    );
  }
  function studentAnnouncements() {
    return (
      heading("Announcements", "Important information from Cennova Academy.") +
      '<div class="toolbar"><div class="tool-left"><label class="search-box"><span>⌕</span><input data-search="announcement" placeholder="Search announcements..."></label><select class="filter"><option>All categories</option><option>Academic</option><option>Event</option><option>System</option></select></div></div><div class="announcement-list">' +
      D.announcements
        .filter(function (a) {
          return a.published;
        })
        .map(function (a, i) {
          return (
            '<article class="card announcement ' +
            a.priority.toLowerCase() +
            '" data-filter-row="' +
            a.title +
            " " +
            a.category +
            '"><div class="announcement-meta">' +
            badge(a.category) +
            " " +
            (a.priority === "Important" ? badge("Important") : "") +
            " <span>" +
            fmtDate(a.date) +
            "</span></div><h3>" +
            a.title +
            "</h3><p>" +
            a.text +
            '</p><button class="btn btn-light btn-sm" data-action="detail" data-kind="announcement" data-index="' +
            i +
            '">Read announcement</button></article>'
          );
        })
        .join("") +
      "</div>"
    );
  }
  function studentProfile() {
    var s = D.student;
    return (
      heading(
        "My Profile",
        "Keep your contact information up to date. Changes are only shown locally in this demo.",
      ) +
      '<div class="profile-layout"><aside class="card profile-summary">' +
      avatar(s.initials) +
      "<div><h2>" +
      s.name +
      "</h2><p>" +
      s.matric +
      " · " +
      s.department +
      "</p>" +
      badge("Active student") +
      "</div></aside>" +
      card(
        "Personal information",
        '<form data-form="profile"><div class="form-grid"><div class="form-group"><label>First name</label><input required value="Adaeze"></div><div class="form-group"><label>Last name</label><input required value="Okafor"></div><div class="form-group"><label>School email</label><input type="email" required value="' +
          s.email +
          '"></div><div class="form-group"><label>Phone number</label><input required value="' +
          s.phone +
          '"></div><div class="form-group"><label>Department</label><input value="' +
          s.department +
          '" readonly></div><div class="form-group"><label>Level</label><input value="' +
          s.level +
          '" readonly></div></div><div class="form-actions">' +
          button("Reset", "reset-form", "", "btn-light") +
          '<button class="btn btn-primary" type="submit">Save demo changes</button></div></form>',
      ) +
      "</div>"
    );
  }
  function studentSettings() {
    return (
      heading(
        "Settings",
        "Manage your display and notification preferences for this browser demo.",
      ) +
      '<div class="stack">' +
      card(
        "Notifications",
        '<div class="settings-list">' +
          setting(
            "Email announcements",
            "Receive school-wide announcement emails",
            true,
          ) +
          setting(
            "Assignment reminders",
            "Get a reminder three days before a deadline",
            true,
          ) +
          setting(
            "Result updates",
            "Be notified when a result is published",
            false,
          ) +
          "</div>",
      ) +
      card(
        "Display preferences",
        '<form data-form="settings"><div class="form-grid"><div class="form-group"><label>Preferred timetable view</label><select><option>Weekly view</option><option>Daily view</option></select></div><div class="form-group"><label>Language</label><select><option>English</option></select></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save demo preferences</button></div></form>',
      ) +
      "</div>"
    );
  }
  function setting(a, b, on) {
    return (
      '<div class="setting"><div><h3>' +
      a +
      "</h3><p>" +
      b +
      '</p></div><input class="toggle" type="checkbox" ' +
      (on ? "checked" : "") +
      ' aria-label="' +
      a +
      '"></div>'
    );
  }
  function adminDashboard() {
    return (
      heading(
        "Administration dashboard",
        "An overview of Cennova Academy portal activity.",
      ) +
      '<div class="stat-grid">' +
      stat("Total students", "1,248", "+42 this semester", "♙") +
      stat("Active courses", "86", "Across 9 departments", "▣") +
      stat("Active students", "1,167", "93.5% of total", "◉") +
      stat("Pending assignments", "24", "Across 18 courses", "✓") +
      '</div><div class="overview-grid"><div class="stack">' +
      card(
        "Recent student registrations",
        D.students
          .slice(0, 4)
          .map(function (s) {
            return row(
              s.initials,
              s.name,
              s.matric + " · " + s.department,
              badge(s.status),
            );
          })
          .join(""),
        "Latest registrations",
      ) +
      card(
        "Recent results",
        D.results
          .slice(0, 3)
          .map(function (r) {
            return row(
              r.grade,
              r.student,
              r.course + " · " + r.title,
              "<b>" + r.score + "%</b>",
            );
          })
          .join(""),
        "Recently entered results",
      ) +
      '</div><div class="stack">' +
      card(
        "Quick actions",
        '<div class="quick-grid"><button class="quick-link" data-action="modal" data-entity="students">+ Add student</button><button class="quick-link" data-action="modal" data-entity="courses">+ Add course</button><button class="quick-link" data-action="modal" data-entity="announcements">+ New announcement</button><a class="quick-link" href="results.html">◫ Enter result</a></div>',
      ) +
      card(
        "Recent announcements",
        D.announcements
          .slice(0, 2)
          .map(function (a) {
            return row(
              "!",
              a.title,
              a.category + " · " + fmtDate(a.date),
              badge(a.published ? "Published" : "Draft"),
            );
          })
          .join(""),
      ) +
      "</div></div>"
    );
  }
  function management(entity) {
    var data = D[entity] || [],
      conf = {
        students: {
          title: "Student Management",
          desc: "View and manage demonstration student records.",
          headers: [
            "Student",
            "Matriculation no.",
            "Department",
            "Level",
            "Status",
            "Registered",
          ],
          row: function (s, i) {
            return (
              '<tr data-filter-row="' +
              s.name +
              " " +
              s.matric +
              " " +
              s.department +
              " " +
              s.status +
              '"><td><div class="table-main">' +
              s.name +
              '</div><div class="table-sub">' +
              s.email +
              "</div></td><td>" +
              s.matric +
              "</td><td>" +
              s.department +
              "</td><td>" +
              s.level +
              "</td><td>" +
              badge(s.status) +
              "</td><td>" +
              fmtDate(s.registered) +
              "</td>" +
              actions(entity, i) +
              "</tr>"
            );
          },
          filters:
            '<select class="filter" data-filter="students"><option value="">All departments</option><option>Computer Science</option><option>Accounting</option></select><select class="filter"><option>All statuses</option><option>Active</option><option>Pending</option></select>',
        },
        courses: {
          title: "Course Management",
          desc: "Manage programme courses and their availability.",
          headers: [
            "Course",
            "Department",
            "Level",
            "Units",
            "Lecturer",
            "Status",
          ],
          row: function (c, i) {
            return (
              '<tr data-filter-row="' +
              c.code +
              " " +
              c.title +
              " " +
              c.department +
              " " +
              c.status +
              '"><td><div class="table-main">' +
              c.code +
              '</div><div class="table-sub">' +
              c.title +
              "</div></td><td>" +
              c.department +
              "</td><td>" +
              c.level +
              "</td><td>" +
              c.units +
              "</td><td>" +
              c.lecturer +
              "</td><td>" +
              badge(c.status) +
              "</td>" +
              actions(entity, i) +
              "</tr>"
            );
          },
          filters:
            '<select class="filter"><option>All levels</option><option>100</option><option>300</option></select>',
        },
        results: {
          title: "Results Management",
          desc: "Enter, review and correct demonstration academic results.",
          headers: ["Student", "Course", "Score", "Grade", "Point", "Semester"],
          row: function (r, i) {
            return (
              '<tr data-filter-row="' +
              r.student +
              " " +
              r.matric +
              " " +
              r.course +
              " " +
              r.grade +
              '"><td><div class="table-main">' +
              r.student +
              '</div><div class="table-sub">' +
              r.matric +
              "</div></td><td>" +
              r.course +
              '<div class="table-sub">' +
              r.title +
              "</div></td><td>" +
              r.score +
              "</td><td>" +
              badge(r.grade) +
              "</td><td>" +
              r.point +
              "</td><td>" +
              r.semester +
              '<div class="table-sub">' +
              r.session +
              "</div></td>" +
              actions(entity, i) +
              "</tr>"
            );
          },
          filters:
            '<select class="filter"><option>2024/2025</option><option>2025/2026</option></select>',
        },
        assignments: {
          title: "Assignment Management",
          desc: "Create and monitor course assignments.",
          headers: [
            "Assignment",
            "Course",
            "Lecturer",
            "Deadline",
            "Status",
            "Created",
          ],
          row: function (a, i) {
            return (
              '<tr data-filter-row="' +
              a.title +
              " " +
              a.course +
              " " +
              a.status +
              '"><td><div class="table-main">' +
              a.title +
              "</div></td><td>" +
              a.course +
              "</td><td>" +
              a.lecturer +
              "</td><td>" +
              fmtDate(a.due) +
              "</td><td>" +
              badge(a.status) +
              "</td><td>" +
              fmtDate(a.created) +
              "</td>" +
              actions(entity, i) +
              "</tr>"
            );
          },
          filters:
            '<select class="filter"><option>All statuses</option><option>Pending</option><option>Submitted</option></select>',
        },
        announcements: {
          title: "Announcement Management",
          desc: "Prepare, preview and publish school communications.",
          headers: [
            "Announcement",
            "Category",
            "Audience",
            "Publication date",
            "Status",
            "Actions",
          ],
          row: function (a, i) {
            return (
              '<tr data-filter-row="' +
              a.title +
              " " +
              a.category +
              " " +
              (a.published ? "Published" : "Draft") +
              '"><td><div class="table-main">' +
              a.title +
              '</div><div class="table-sub">' +
              a.text.slice(0, 55) +
              "…</div></td><td>" +
              badge(a.category) +
              "</td><td>All students</td><td>" +
              fmtDate(a.date) +
              "</td><td>" +
              badge(a.published ? "Published" : "Draft") +
              '</td><td class="actions"><button class="action-btn" title="Preview" data-action="detail" data-kind="announcement" data-index="' +
              i +
              '">◉</button><button class="action-btn" title="' +
              (a.published ? "Unpublish" : "Publish") +
              '" data-action="toggle-publish" data-index="' +
              i +
              '">↻</button><button class="action-btn" title="Edit" data-action="modal" data-entity="announcements" data-index="' +
              i +
              '">✎</button><button class="action-btn" title="Delete" data-action="delete" data-entity="announcements" data-index="' +
              i +
              '">⌫</button></td></tr>'
            );
          },
          filters:
            '<select class="filter"><option>All categories</option><option>Academic</option><option>Event</option></select>',
        },
        timetable: {
          title: "Timetable Management",
          desc: "Create and adjust scheduled classes.",
          headers: [
            "Day / Time",
            "Course",
            "Lecturer",
            "Venue",
            "Level",
            "Actions",
          ],
          row: function (t, i) {
            return (
              '<tr data-filter-row="' +
              t.day +
              " " +
              t.course +
              " " +
              t.lecturer +
              " " +
              t.level +
              '"><td><div class="table-main">' +
              t.day +
              '</div><div class="table-sub">' +
              t.start +
              " – " +
              t.end +
              "</div></td><td>" +
              t.course +
              '<div class="table-sub">' +
              t.title +
              "</div></td><td>" +
              t.lecturer +
              "</td><td>" +
              t.venue +
              "</td><td>" +
              t.level +
              "</td>" +
              actions(entity, i) +
              "</tr>"
            );
          },
          filters:
            '<select class="filter"><option>All levels</option><option>300</option></select>',
        },
        users: {
          title: "User & Admin Management",
          desc: "View portal user accounts and demonstrate role/status changes.",
          headers: ["User", "Role", "Status", "Date created", "Actions"],
          row: function (u, i) {
            return (
              '<tr data-filter-row="' +
              u.name +
              " " +
              u.email +
              " " +
              u.role +
              " " +
              u.status +
              '"><td><div class="table-main">' +
              u.name +
              '</div><div class="table-sub">' +
              u.email +
              "</div></td><td>" +
              badge(u.role) +
              "</td><td>" +
              badge(u.status) +
              "</td><td>" +
              fmtDate(u.created) +
              "</td>" +
              actions(entity, i) +
              "</tr>"
            );
          },
          filters:
            '<select class="filter"><option>All roles</option><option>Student</option><option>Lecturer</option><option>Admin</option></select>',
        },
      };
    var c = conf[entity],
      headers = c.headers.slice();
    if (entity !== "announcements") headers.push("Actions");
    var rows =
      data.map(c.row).join("") ||
      '<tr><td colspan="' +
        headers.length +
        '">' +
        empty("Create a demonstration record to begin.") +
        "</td></tr>";
    return (
      heading(c.title, c.desc) +
      searchFilter(entity, c.filters) +
      table(headers, rows, entity)
    );
  }
  function actions(entity, i) {
    return (
      '<td class="actions"><button class="action-btn" title="View" data-action="detail" data-kind="' +
      entity +
      '" data-index="' +
      i +
      '">◉</button><button class="action-btn" title="Edit" data-action="modal" data-entity="' +
      entity +
      '" data-index="' +
      i +
      '">✎</button><button class="action-btn" title="Delete" data-action="delete" data-entity="' +
      entity +
      '" data-index="' +
      i +
      '">⌫</button></td>'
    );
  }
  function adminSettings() {
    return (
      heading(
        "Administration Settings",
        "School preferences in this page are a frontend-only demonstration.",
      ) +
      '<div class="stack">' +
      card(
        "School information",
        '<form data-form="settings"><div class="form-grid"><div class="form-group"><label>School name</label><input required value="Cennova Academy"></div><div class="form-group"><label>Support email</label><input type="email" required value="support@cennova.edu.ng"></div><div class="form-group"><label>Current academic session</label><select><option>2025/2026</option><option>2026/2027</option></select></div><div class="form-group"><label>Current semester</label><select><option>First Semester</option><option>Second Semester</option></select></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save demo settings</button></div></form>',
      ) +
      card(
        "Portal preferences",
        '<div class="settings-list">' +
          setting(
            "New-registration alerts",
            "Notify administrators about new student registrations",
            true,
          ) +
          setting(
            "Result publishing review",
            "Require a confirmation before demonstration result publication",
            true,
          ) +
          setting(
            "Maintenance notice",
            "Show maintenance messages in the portal",
            false,
          ) +
          "</div>",
      ) +
      "</div>"
    );
  }
  function auth() {
    var register = page === "register",
      admin = isAdmin,
      title = register
        ? "Create your student account"
        : admin
          ? "Administrator sign in"
          : "Welcome back";
    body.className = "auth";
    body.innerHTML =
      '<div class="auth-page"><aside class="auth-side">' +
      brand() +
      "<h1>" +
      (admin
        ? "Manage learning, simply."
        : "Your academic journey, organised.") +
      "</h1><p>" +
      (admin
        ? "Monitor students, courses and school activity from one clear workspace."
        : "Access courses, grades, assignments and important announcements in one place.") +
      '</p><div class="auth-points"><span>Clear, student-centred portal</span><span>Demo data ready for your future API</span><span>Cennova Academy community</span></div></aside><main class="auth-main"><div class="auth-box"><div class="mobile-brand">' +
      brand() +
      "</div><h2>" +
      title +
      "</h2><p>" +
      (register
        ? "Fill in your details to create a demonstration account."
        : admin
          ? "Use any valid email format and a password to open the admin demonstration."
          : "Sign in to continue to your student portal.") +
      '</p><form class="auth-form" data-form="auth">' +
      (register
        ? '<div class="auth-split"><div class="form-group"><label>First name</label><input required placeholder="Adaeze"></div><div class="form-group"><label>Last name</label><input required placeholder="Okafor"></div></div><div class="form-group"><label>Matriculation number</label><input required placeholder="CEN/2023/0142"></div><div class="form-group"><label>School email</label><input type="email" required placeholder="name@cennova.edu.ng"></div>'
        : '<div class="form-group"><label>Email address</label><input type="email" required placeholder="name@cennova.edu.ng"></div>') +
      '<div class="form-group"><label>Password</label><div class="password-wrap"><input type="password" required minlength="6" placeholder="At least 6 characters"><button type="button" data-action="password">Show</button></div></div>' +
      (register
        ? '<div class="form-group"><label>Confirm password</label><input type="password" required minlength="6" placeholder="Repeat your password"></div>'
        : '<label class="row-sub"><input type="checkbox"> Keep me signed in on this device</label>') +
      '<button class="btn btn-primary" type="submit">' +
      (register
        ? "Create demo account"
        : admin
          ? "Open admin dashboard"
          : "Sign in to demo") +
      " →</button></form>" +
      (!register && !admin
        ? '<p class="form-note">New to Cennova? <a href="register.html">Create an account</a></p>'
        : "") +
      (register
        ? '<p class="form-note">Already registered? <a href="login.html">Sign in</a></p>'
        : "") +
      '<p class="form-hint">Demo only — this form does not authenticate you or store passwords. Your future backend will replace it.</p></div></main></div><div id="toast-root" aria-live="polite"></div>';
  }
  function render() {
    if (page === "login" || page === "register") {
      auth();
      bind();
      return;
    }
    var content = "";
    if (!isAdmin) {
      var map = {
        dashboard: studentDashboard,
        courses: studentCourses,
        "course-details": courseDetails,
        results: studentResults,
        timetable: studentTimetable,
        assignments: studentAssignments,
        announcements: studentAnnouncements,
        profile: studentProfile,
        settings: studentSettings,
      };
      content = (map[page] || studentDashboard)();
    } else {
      content =
        page === "dashboard"
          ? adminDashboard
          : page === "settings"
            ? adminSettings
            : management(
                page in
                  {
                    students: 1,
                    courses: 1,
                    results: 1,
                    assignments: 1,
                    announcements: 1,
                    timetable: 1,
                    users: 1,
                  }
                  ? page
                  : "students",
              );
    }
    shell(content);
    bind();
  }
  function toast(msg, type) {
    var root = document.getElementById("toast-root");
    if (!root) return;
    root.innerHTML =
      '<div class="toast ' + (type || "success") + '">' + msg + "</div>";
    window.setTimeout(function () {
      root.innerHTML = "";
    }, 3100);
  }
  function closeModal() {
    var root = document.getElementById("modal-root");
    if (root) root.innerHTML = "";
  }
  function modal(title, content, foot) {
    document.getElementById("modal-root").innerHTML =
      '<div class="modal-wrap" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true"><header class="modal-head"><h2>' +
      title +
      '</h2><button class="modal-close" data-action="close-modal" aria-label="Close">×</button></header><div class="modal-body">' +
      content +
      "</div>" +
      (foot ? '<footer class="modal-foot">' + foot + "</footer>" : "") +
      "</section></div>";
  }
  function entityForm(entity, index) {
    var title =
      index == null
        ? "Add " + cap(entity.slice(0, -1))
        : "Edit " + cap(entity.slice(0, -1));
    var content =
      '<form id="entity-form" data-entity="' +
      entity +
      '"><div class="form-grid">';
    if (entity === "students")
      content +=
        '<div class="form-group"><label>Full name</label><input name="name" required placeholder="Student name"></div><div class="form-group"><label>Matriculation number</label><input name="matric" required placeholder="CEN/2026/0001"></div><div class="form-group full"><label>Email</label><input name="email" type="email" required placeholder="name@cennova.edu.ng"></div><div class="form-group"><label>Department</label><input name="department" required placeholder="Computer Science"></div><div class="form-group"><label>Level</label><select name="level"><option>100</option><option>200</option><option selected>300</option><option>400</option></select></div>';
    else if (entity === "courses")
      content +=
        '<div class="form-group"><label>Course code</label><input name="code" required placeholder="CSC 401"></div><div class="form-group"><label>Credit units</label><input name="units" type="number" min="1" max="6" required value="3"></div><div class="form-group full"><label>Course title</label><input name="title" required placeholder="Course title"></div><div class="form-group"><label>Department</label><input name="department" required placeholder="Computer Science"></div><div class="form-group"><label>Lecturer</label><input name="lecturer" required placeholder="Lecturer name"></div>';
    else if (entity === "results")
      content +=
        '<div class="form-group"><label>Student</label><input name="student" required placeholder="Student name"></div><div class="form-group"><label>Course</label><input name="course" required placeholder="CSC 301"></div><div class="form-group"><label>Score (0–100)</label><input name="score" type="number" min="0" max="100" required></div><div class="form-group"><label>Academic session</label><input name="session" required value="2025/2026"></div>';
    else if (entity === "assignments")
      content +=
        '<div class="form-group full"><label>Assignment title</label><input name="title" required></div><div class="form-group"><label>Course</label><input name="course" required placeholder="CSC 301"></div><div class="form-group"><label>Deadline</label><input name="due" type="date" required></div><div class="form-group full"><label>Description</label><textarea name="description" rows="3" required></textarea></div>';
    else if (entity === "announcements")
      content +=
        '<div class="form-group full"><label>Title</label><input name="title" required></div><div class="form-group full"><label>Content</label><textarea name="text" rows="4" required></textarea></div><div class="form-group"><label>Category</label><select name="category"><option>Academic</option><option>Event</option><option>System</option></select></div><div class="form-group"><label>Publication date</label><input name="date" type="date" required></div>';
    else if (entity === "timetable")
      content +=
        '<div class="form-group"><label>Day</label><select name="day"><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option></select></div><div class="form-group"><label>Course</label><input name="course" required placeholder="CSC 301"></div><div class="form-group"><label>Start time</label><input name="start" type="time" required></div><div class="form-group"><label>End time</label><input name="end" type="time" required></div><div class="form-group"><label>Lecturer</label><input name="lecturer" required></div><div class="form-group"><label>Venue</label><input name="venue" required></div>';
    else
      content +=
        '<div class="form-group"><label>Name</label><input name="name" required></div><div class="form-group"><label>Email</label><input name="email" type="email" required></div><div class="form-group"><label>Role</label><select name="role"><option>Student</option><option>Lecturer</option><option>Admin</option></select></div><div class="form-group"><label>Status</label><select name="status"><option>Active</option><option>Suspended</option></select></div>';
    content = content.replace(
      'id="entity-form" data-entity="' + entity + '"',
      'id="entity-form" data-entity="' +
        entity +
        '" data-index="' +
        (index == null ? "" : index) +
        '"',
    );
    content += "</div></form>";
    modal(
      title,
      content,
      button("Cancel", "close-modal", "", "btn-light") +
        '<button class="btn btn-primary" type="submit" form="entity-form">' +
        (index == null
          ? "Add demonstration record"
          : "Save demonstration change") +
        "</button>",
    );
    if (index != null) {
      var current = D[entity][index];
      Object.keys(current).forEach(function (key) {
        var field = document.querySelector('#entity-form [name="' + key + '"]');
        if (field) field.value = current[key];
      });
    }
  }
  function detail(kind, index) {
    var o = (D[kind] || D.assignments)[index];
    if (!o) return;
    var bits = Object.keys(o)
      .filter(function (k) {
        return (
          k !== "text" &&
          k !== "description" &&
          k !== "initials" &&
          k !== "published"
        );
      })
      .map(function (k) {
        return (
          "<div><span>" +
          cap(k) +
          "</span><b>" +
          esc(
            typeof o[k] === "string" && /^202\d-/.test(o[k])
              ? fmtDate(o[k])
              : o[k],
          ) +
          "</b></div>"
        );
      })
      .join("");
    modal(
      esc(o.title || o.name || "Record details"),
      (o.description
        ? '<p class="detail-copy">' + esc(o.description) + "</p>"
        : "") +
        (o.text ? '<p class="detail-copy">' + esc(o.text) + "</p>" : "") +
        '<div class="info-list" style="margin-top:18px">' +
        bits +
        "</div>",
      button("Close", "close-modal", "", "btn-light"),
    );
  }
  function confirmDelete(entity, index) {
    modal(
      "Delete demonstration record",
      '<p class="detail-copy">This removes the record only from the current browser session. It does not affect a database.</p>',
      button("Cancel", "close-modal", "", "btn-light") +
        '<button class="btn btn-danger" data-action="confirm-delete" data-entity="' +
        entity +
        '" data-index="' +
        index +
        '">Delete record</button>',
    );
  }
  function submitEntity(form) {
    if (!form.reportValidity()) return;
    var entity = form.dataset.entity,
      index = form.dataset.index === "" ? null : Number(form.dataset.index),
      f = Object.assign(
        {},
        index == null ? {} : D[entity][index],
        Object.fromEntries(new FormData(form).entries()),
      );
    if (entity === "students") {
      f.initials = f.name
        .split(" ")
        .map(function (x) {
          return x[0];
        })
        .join("")
        .slice(0, 2);
      f.status = f.status || "Active";
      f.registered = f.registered || "2026-10-20";
    }
    if (entity === "courses") {
      f.semester = f.semester || "First";
      f.level = f.level || "300";
      f.status = f.status || "Active";
    }
    if (entity === "results") {
      var n = Number(f.score),
        g = n >= 70 ? "A" : n >= 60 ? "B" : n >= 50 ? "C" : n >= 45 ? "D" : "F";
      f = Object.assign(f, {
        matric: f.matric || "CEN/2026/DEMO",
        title: f.title || "Demonstration course",
        units: f.units || 3,
        score: n,
        grade: g,
        point:
          g === "A" ? 5 : g === "B" ? 4 : g === "C" ? 3 : g === "D" ? 2 : 0,
        semester: f.semester || "First",
      });
    }
    if (entity === "assignments") {
      f.lecturer = f.lecturer || "Demo lecturer";
      f.status = f.status || "Pending";
      f.created = f.created || "2026-10-20";
    }
    if (entity === "announcements") {
      f.priority = f.priority || "Normal";
      if (typeof f.published !== "boolean") f.published = false;
    }
    if (entity === "timetable") {
      f.title = f.title || "Demonstration class";
      f.level = f.level || "300";
    }
    if (entity === "users") {
      f.created = f.created || "2026-10-20";
    }
    if (index == null) D[entity].unshift(f);
    else D[entity][index] = f;
    closeModal();
    toast(
      index == null
        ? "Demonstration record added. It will reset when the page reloads."
        : "Demonstration record updated.",
    );
    render();
  }
  function bind() {
    if (window.CennovaUiBound) return;
    window.CennovaUiBound = true;
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-action]");
      if (!el) return;
      var a = el.dataset.action;
      if (a === "menu") {
        document.getElementById("sidebar").classList.toggle("open");
      } else if (a === "notifications") {
        toast("You have 3 demonstration notifications.", "success");
      } else if (a === "profile-menu") {
        toast("Profile options are represented by the Profile page.");
      } else if (a === "password") {
        var input = el.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        el.textContent = input.type === "password" ? "Show" : "Hide";
      } else if (a === "modal") {
        entityForm(
          el.dataset.entity,
          el.dataset.index === "" ? null : Number(el.dataset.index),
        );
      } else if (a === "close-modal") {
        if (e.target === el || el.tagName === "BUTTON") closeModal();
      } else if (a === "detail") {
        detail(el.dataset.kind, Number(el.dataset.index));
      } else if (a === "delete") {
        confirmDelete(el.dataset.entity, el.dataset.index);
      } else if (a === "confirm-delete") {
        D[el.dataset.entity].splice(Number(el.dataset.index), 1);
        closeModal();
        toast("Demonstration record deleted.");
        render();
      } else if (a === "toggle-publish") {
        var an = D.announcements[Number(el.dataset.index)];
        an.published = !an.published;
        toast(
          "Announcement is now " +
            (an.published ? "published" : "a draft") +
            ".",
        );
        render();
      } else if (a === "submit-assignment") {
        D.assignments[Number(el.dataset.index)].status = "Submitted";
        toast("Assignment marked as submitted for this demo.");
        render();
      } else if (a === "print") {
        window.print();
      } else if (a === "reset-form") {
        el.closest("form").reset();
        toast("Form reset.");
      }
    });
    document.addEventListener("input", function (e) {
      if (!e.target.matches("[data-search]")) return;
      var q = e.target.value.toLowerCase(),
        type = e.target.dataset.search;
      if (type === "course-card") {
        document
          .querySelectorAll("[data-course-grid] .course-card")
          .forEach(function (r) {
            r.style.display = r.textContent.toLowerCase().includes(q)
              ? "block"
              : "none";
          });
      } else {
        document
          .querySelectorAll(
            '[data-table="' + type + '"] tbody tr,[data-filter-row]',
          )
          .forEach(function (r) {
            r.style.display = r.textContent.toLowerCase().includes(q)
              ? ""
              : "none";
          });
      }
    });
    document.addEventListener("change", function (e) {
      if (!e.target.matches("[data-filter]")) return;
      var q = e.target.value.toLowerCase();
      document.querySelectorAll("[data-filter-row]").forEach(function (r) {
        r.style.display =
          !q || r.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
    document.addEventListener("submit", function (e) {
      var form = e.target;
      if (!form.matches("form")) return;
      e.preventDefault();
      if (form.id === "entity-form") submitEntity(form);
      else if (form.dataset.form === "auth") {
        if (form.reportValidity()) {
          toast("Demo access confirmed. Opening portal…");
          setTimeout(function () {
            location.href = isAdmin ? "dashboard.html" : "dashboard.html";
          }, 500);
        }
      } else if (form.dataset.form) {
        if (form.reportValidity())
          toast("Saved locally for this demonstration.");
      }
    });
  }
  body.innerHTML =
    '<div class="loading"><div><div class="spinner"></div><p>Opening Cennova Academy…</p></div></div>';
  window.setTimeout(render, 80);
})();
