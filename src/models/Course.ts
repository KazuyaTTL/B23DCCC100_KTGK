export interface Course {
    id: string;               // ID duy nhất của khóa học
    name: string;             // Tên khóa học
    instructor: string;       // Tên giảng viên
    enrolledStudents: number; // Số lượng học viên
    status: "Đang mở" | "Đã kết thúc" | "Tạm dừng"; // Trạng thái
    description?: string;     // Mô tả (tùy chọn)
  }