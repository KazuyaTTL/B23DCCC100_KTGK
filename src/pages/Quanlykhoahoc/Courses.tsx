import React, { useState } from "react";
import { Table, Input, Select, Button, notification } from "antd";
import { useCourses } from "../../hooks/useCourses";
import { CourseForm } from "../../components/GK2/CourseForm";
import DeleteConfirmation from "../../components/GK2/DeleteConfirmation";

const { Search } = Input;
const { Option } = Select;

const Courses: React.FC = () => {
  const { courses, instructors, addCourse, updateCourse, deleteCourse } = useCourses();
  const [searchText, setSearchText] = useState("");
  const [filterInstructor, setFilterInstructor] = useState<string | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined);

  // Lọc và sắp xếp dữ liệu
  const filteredCourses = courses
    .filter((course) => course.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter((course) => (filterInstructor ? course.instructor === filterInstructor : true))
    .filter((course) => (filterStatus ? course.status === filterStatus : true))
    .sort((a, b) => {
      if (sortOrder === "ascend") return a.enrolledStudents - b.enrolledStudents;
      if (sortOrder === "descend") return b.enrolledStudents - a.enrolledStudents;
      return 0;
    });

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên khóa học", dataIndex: "name", key: "name" },
    { title: "Giảng viên", dataIndex: "instructor", key: "instructor" },
    {
      title: "Số lượng học viên",
      dataIndex: "enrolledStudents",
      key: "enrolledStudents",
      sorter: true,
    },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Course) => (
        <>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <DeleteConfirmation
            onConfirm={() => handleDelete(record.id)}
            disabled={record.enrolledStudents > 0}
          />
        </>
      ),
    },
  ];

  const handleSearch = (value: string) => setSearchText(value);
  const handleFilterInstructor = (value: string) => setFilterInstructor(value);
  const handleFilterStatus = (value: string) => setFilterStatus(value);
  const handleSort = (pagination: any, filters: any, sorter: any) => setSortOrder(sorter.order);

  const handleAdd = () => {
    setEditingCourse(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteCourse(id);
    notification.success({ message: "Xóa khóa học thành công" });
  };

  const handleFormSubmit = (values: Omit<Course, "id">) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, values);
      notification.success({ message: "Cập nhật khóa học thành công" });
    } else {
      addCourse(values);
      notification.success({ message: "Thêm khóa học thành công" });
    }
    setIsModalVisible(false);
  };

  return (
    <div>
      <Search
        placeholder="Tìm kiếm theo tên khóa học"
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Select
        placeholder="Lọc theo giảng viên"
        onChange={handleFilterInstructor}
        style={{ width: 200, marginRight: 16 }}
        allowClear
      >
        {instructors.map((instructor) => (
          <Option key={instructor.id} value={instructor.name}>
            {instructor.name}
          </Option>
        ))}
      </Select>
      <Select
        placeholder="Lọc theo trạng thái"
        onChange={handleFilterStatus}
        style={{ width: 200, marginRight: 16 }}
        allowClear
      >
        <Option value="Đang mở">Đang mở</Option>
        <Option value="Đã kết thúc">Đã kết thúc</Option>
        <Option value="Tạm dừng">Tạm dừng</Option>
      </Select>
      <Button type="primary" onClick={handleAdd}>
        Thêm khóa học
      </Button>
      <Table columns={columns} dataSource={filteredCourses} rowKey="id" onChange={handleSort} />
      <CourseForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleFormSubmit}
        initialValues={editingCourse}
        instructors={instructors}
      />
    </div>
  );
};

export default Courses;