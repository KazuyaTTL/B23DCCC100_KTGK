import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { Course } from "@/models/Course";
import { Instructor } from "@/models/Instructor";

interface CourseFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<Course, "id">) => void;
  initialValues?: Course;
  instructors: Instructor[];
}

const CourseForm: React.FC<CourseFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  instructors,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? "Chỉnh sửa khóa học" : "Thêm khóa học"}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Tên khóa học"
          rules={[
            { required: true, message: "Vui lòng nhập tên khóa học" },
            { max: 100, message: "Tên khóa học không được vượt quá 100 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="instructor"
          label="Giảng viên"
          rules={[{ required: true, message: "Vui lòng chọn giảng viên" }]}
        >
          <Select>
            {instructors.map((instructor) => (
              <Select.Option key={instructor.id} value={instructor.name}>
                {instructor.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Mô tả khóa học">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select>
            <Select.Option value="Đang mở">Đang mở</Select.Option>
            <Select.Option value="Đã kết thúc">Đã kết thúc</Select.Option>
            <Select.Option value="Tạm dừng">Tạm dừng</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseForm;