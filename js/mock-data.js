/* Frontend demonstration data. Replace CennovaMock values with fetch() calls when APIs exist. */
window.CennovaMock = {
  school: { name: 'Cennova Academy', session: '2025/2026', semester: 'First Semester' },
  student: { name: 'Cenna Presha', initials: 'CP', matric: 'CEN/2023/0142', email: 'cennapresha@cennova.edu.ng', department: 'Computer Science', level: '300 Level', phone: '+234 803 555 0198', gpa: '4.38', cgpa: '4.56' },
  courses: [
    { code: 'CSC 301', title: 'Data Structures & Algorithms', units: 3, semester: 'First', lecturer: 'Dr. Ibrahim Bello', department: 'Computer Science', level: '300', status: 'Active' },
    { code: 'CSC 303', title: 'Database Management Systems', units: 3, semester: 'First', lecturer: 'Mrs. Yetunde Akin', department: 'Computer Science', level: '300', status: 'Active' },
    { code: 'CSC 305', title: 'Operating Systems', units: 3, semester: 'First', lecturer: 'Dr. Samuel Nwosu', department: 'Computer Science', level: '300', status: 'Active' },
    { code: 'MTH 311', title: 'Numerical Analysis', units: 2, semester: 'First', lecturer: 'Dr. Grace Obi', department: 'Computer Science', level: '300', status: 'Active' },
    { code: 'GST 301', title: 'Entrepreneurship Studies', units: 2, semester: 'First', lecturer: 'Mr. David Eze', department: 'General Studies', level: '300', status: 'Active' }
  ],
  results: [
    { student: 'Adaeze Okafor', matric: 'CEN/2023/0142', course: 'CSC 201', title: 'Object-Oriented Programming', units: 3, score: 86, grade: 'A', point: 5, semester: 'Second', session: '2024/2025' },
    { student: 'Adaeze Okafor', matric: 'CEN/2023/0142', course: 'CSC 203', title: 'Computer Architecture', units: 3, score: 78, grade: 'A', point: 5, semester: 'Second', session: '2024/2025' },
    { student: 'Adaeze Okafor', matric: 'CEN/2023/0142', course: 'MTH 211', title: 'Linear Algebra', units: 3, score: 73, grade: 'A', point: 5, semester: 'Second', session: '2024/2025' },
    { student: 'Adaeze Okafor', matric: 'CEN/2023/0142', course: 'GST 202', title: 'Communication in English II', units: 2, score: 68, grade: 'B', point: 4, semester: 'Second', session: '2024/2025' }
  ],
  assignments: [
    { title: 'Binary Search Tree implementation', course: 'CSC 301', lecturer: 'Dr. Ibrahim Bello', due: '2026-10-24', status: 'Pending', created: '2026-10-14', description: 'Implement insertion, search and traversal methods for a binary search tree.' },
    { title: 'Database schema design', course: 'CSC 303', lecturer: 'Mrs. Yetunde Akin', due: '2026-10-29', status: 'In progress', created: '2026-10-13', description: 'Model the supplied clinic system using an ER diagram and normalized relations.' },
    { title: 'Process scheduling worksheet', course: 'CSC 305', lecturer: 'Dr. Samuel Nwosu', due: '2026-11-03', status: 'Submitted', created: '2026-10-09', description: 'Compare FCFS, SJF and Round Robin using the given process table.' }
  ],
  announcements: [
    { title: 'First semester course registration', text: 'Course registration remains open through Friday, 31 October. Confirm your registered courses with your adviser before the deadline.', date: '2026-10-18', category: 'Academic', priority: 'Important', published: true },
    { title: 'Library orientation for 300 level', text: 'The university library orientation holds in the digital library on Wednesday at 10:00 AM.', date: '2026-10-16', category: 'Event', priority: 'Normal', published: true },
    { title: 'Scheduled maintenance notice', text: 'The student portal will be unavailable from 11:00 PM to midnight on Saturday for routine maintenance.', date: '2026-10-14', category: 'System', priority: 'Normal', published: true }
  ],
  timetable: [
    { day: 'Monday', start: '09:00', end: '11:00', course: 'CSC 301', title: 'Data Structures & Algorithms', lecturer: 'Dr. Ibrahim Bello', venue: 'LT 2', level: '300' },
    { day: 'Monday', start: '13:00', end: '15:00', course: 'CSC 303', title: 'Database Management Systems', lecturer: 'Mrs. Yetunde Akin', venue: 'Lab 1', level: '300' },
    { day: 'Tuesday', start: '10:00', end: '12:00', course: 'MTH 311', title: 'Numerical Analysis', lecturer: 'Dr. Grace Obi', venue: 'B 204', level: '300' },
    { day: 'Wednesday', start: '09:00', end: '11:00', course: 'CSC 305', title: 'Operating Systems', lecturer: 'Dr. Samuel Nwosu', venue: 'LT 1', level: '300' },
    { day: 'Thursday', start: '11:00', end: '13:00', course: 'GST 301', title: 'Entrepreneurship Studies', lecturer: 'Mr. David Eze', venue: 'Auditorium', level: '300' }
  ],
  students: [
    { name: 'Adaeze Okafor', initials: 'AO', matric: 'CEN/2023/0142', email: 'adaeze.okafor@cennova.edu.ng', department: 'Computer Science', level: '300', status: 'Active', registered: '2023-10-09' },
    { name: 'Chinedu Okoye', initials: 'CO', matric: 'CEN/2023/0198', email: 'chinedu.okoye@cennova.edu.ng', department: 'Computer Science', level: '300', status: 'Active', registered: '2023-10-10' },
    { name: 'Fatima Musa', initials: 'FM', matric: 'CEN/2024/0331', email: 'fatima.musa@cennova.edu.ng', department: 'Business Administration', level: '200', status: 'Active', registered: '2024-10-07' },
    { name: 'Emeka Nwankwo', initials: 'EN', matric: 'CEN/2022/0074', email: 'emeka.nwankwo@cennova.edu.ng', department: 'Accounting', level: '400', status: 'Inactive', registered: '2022-10-12' },
    { name: 'Blessing John', initials: 'BJ', matric: 'CEN/2025/0430', email: 'blessing.john@cennova.edu.ng', department: 'Computer Science', level: '100', status: 'Pending', registered: '2025-10-01' }
  ],
  users: [
    { name: 'Cenna Presha', email: 'cennapresha@cennova.edu.ng', role: 'Student', status: 'Active', created: '2023-10-09' },
    { name: 'Dr. Ibrahim Bello', email: 'ibrahim.bello@cennova.edu.ng', role: 'Lecturer', status: 'Active', created: '2021-03-18' },
    { name: 'Amina Lawal', email: 'amina.lawal@cennova.edu.ng', role: 'Admin', status: 'Active', created: '2020-08-03' },
    { name: 'Emeka Nwankwo', email: 'emeka.nwankwo@cennova.edu.ng', role: 'Student', status: 'Suspended', created: '2022-10-12' }
  ]
};
