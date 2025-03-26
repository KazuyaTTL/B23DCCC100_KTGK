import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Table, Typography, Modal, message, Popconfirm, Tag } from 'antd';
import { useModel } from 'umi';

const { Title } = Typography;
const { Option } = Select;

const predefinedGiangVien = ['Phạm Văn C', 'Lê Thị D', 'Trần Văn E'];

const KhoaHoc = () => {
  const { courses, addOrEditCourse, deleteCourse } = useModel('khoaHoc');
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterGiangVien, setFilterGiangVien] = useState('');
  const [filterTrangThai, setFilterTrangThai] = useState('');

  const handleAddOrEditCourse = (values) => {
    const isDuplicateName = courses.some(
      (course) => course.tenKhoaHoc === values.tenKhoaHoc && course.id !== editingCourse?.id
    );

    if (isDuplicateName) {
      message.error('Tên khóa học đã tồn tại. Vui lòng chọn tên khác.');
      return;
    }

    addOrEditCourse({ ...editingCourse, ...values });
    setIsModalVisible(false);
    setEditingCourse(null);
    form.resetFields();
    message.success(editingCourse ? 'Cập nhật khóa học thành công.' : 'Thêm khóa học thành công.');
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    form.setFieldsValue(course);
    setIsModalVisible(true);
  };

  const handleDeleteCourse = (id) => {
    const course = courses.find((c) => c.id === id);
    if (course && course.soLuongHocVien > 0) {
      message.error('Không thể xóa khóa học đã có học viên.');
      return;
    }
    deleteCourse(id);
    message.success('Xóa khóa học thành công.');
  };

  const filteredCourses = courses
    .filter((course) => course.tenKhoaHoc.toLowerCase().includes(searchText.toLowerCase()))
    .filter((course) => !filterGiangVien || course.giangVien === filterGiangVien)
    .filter((course) => !filterTrangThai || course.trangThai === filterTrangThai);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên khóa học', dataIndex: 'tenKhoaHoc', key: 'tenKhoaHoc' },
    { title: 'Giảng viên', dataIndex: 'giangVien', key: 'giangVien' },
    { title: 'Số lượng học viên', dataIndex: 'soLuongHocVien', key: 'soLuongHocVien', sorter: (a, b) => a.soLuongHocVien - b.soLuongHocVien },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (text) => {
        const color = text === 'Đang mở' ? 'green' : text === 'Đã kết thúc' ? 'red' : 'orange';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditCourse(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khóa học này không?"
            onConfirm={() => handleDeleteCourse(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card style={{ maxWidth: 1200, margin: 'auto', padding: '20px' }}>
      <Title level={2}>Quản lý khóa học</Title>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên khóa học"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          placeholder="Lọc theo giảng viên"
          value={filterGiangVien}
          onChange={(value) => setFilterGiangVien(value)}
          allowClear
        >
          {predefinedGiangVien.map((giangVien) => (
            <Option key={giangVien} value={giangVien}>
              {giangVien}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Lọc theo trạng thái"
          value={filterTrangThai}
          onChange={(value) => setFilterTrangThai(value)}
          allowClear
        >
          <Option value="Đang mở">Đang mở</Option>
          <Option value="Đã kết thúc">Đã kết thúc</Option>
          <Option value="Tạm dừng">Tạm dừng</Option>
        </Select>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Thêm khóa học
        </Button>
      </div>
      <Table dataSource={filteredCourses} columns={columns} rowKey="id" />

      <Modal
        title={editingCourse ? 'Sửa khóa học' : 'Thêm khóa học'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCourse(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrEditCourse} layout="vertical">
          <Form.Item
            name="tenKhoaHoc"
            label="Tên khóa học"
            rules={[
              { required: true, message: 'Vui lòng nhập tên khóa học' },
              { max: 100, message: 'Tên khóa học tối đa 100 ký tự' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="giangVien"
            label="Giảng viên"
            rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
          >
            <Select placeholder="Chọn giảng viên">
              {predefinedGiangVien.map((giangVien) => (
                <Option key={giangVien} value={giangVien}>
                  {giangVien}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="moTa" label="Mô tả khóa học">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Option value="Đang mở">Đang mở</Option>
              <Option value="Đã kết thúc">Đã kết thúc</Option>
              <Option value="Tạm dừng">Tạm dừng</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingCourse ? 'Lưu' : 'Thêm'}
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default KhoaHoc;
