// 9. Student Controller ke functions

// Student module ke liye minimum CRUD:

// createStudent()
// getStudents()
// getStudentById()
// updateStudent()
// deleteStudent()
// Student.find()
// Student.findOne()
// Student.create()
// Student.findById()
// Student.findByIdAndUpdate()
// Student.findByIdAndDelete()

// Aur search:

// searchStudents()

// Lekin search ko separate endpoint banana zaroori nahi.

// Example:

// GET /api/students?search=102341

// ya:

// GET /api/students?search=Ali

// Controller query handle kar sakta hai.

// Documentation live debounced search by Name or Roll Number specifically require karti hai