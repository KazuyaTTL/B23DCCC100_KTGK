import React, { useState } from 'react';
import {
	Button,
	Card,
	Form,
	Input,
	Select,
	List,
	Typography,
	DatePicker,
	TimePicker,
	Modal,
	message,
	Rate,
	Table,
	Row,
	Col,
	Tag,
} from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

const initialServices = [
	{ id: 1, name: 'Cắt tóc', price: 100000, duration: 60 },
	{ id: 2, name: 'Spa', price: 200000, duration: 90 },
	// ...other services...
];

const initialEmployees = [
	{ id: 1, name: 'Nhân viên A', maxAppointmentsPerDay: 5, workingHours: '09:00-17:00', ratings: [], averageRating: 0 },
	{ id: 2, name: 'Nhân viên B', maxAppointmentsPerDay: 3, workingHours: '10:00-18:00', ratings: [], averageRating: 0 },
	// ...other employees...
];

const ThucHanh3 = () => {
	const [appointments, setAppointments] = useState([]);
	const [services, setServices] = useState(initialServices);
	const [employees, setEmployees] = useState(initialEmployees);
	const [form] = Form.useForm();
	const [employeeForm] = Form.useForm();
	const [serviceForm] = Form.useForm();
	const [ratingForm] = Form.useForm();
	const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);
	const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
	const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
	const [isReportModalVisible, setIsReportModalVisible] = useState(false);
	const [editingEmployee, setEditingEmployee] = useState(null);
	const [editingService, setEditingService] = useState(null);
	const [currentAppointment, setCurrentAppointment] = useState(null);

	const handleCreateAppointment = (values) => {
		const { date, time, employee, service } = values;
		const newAppointment = {
			date: date.format('YYYY-MM-DD'),
			time: time.format('HH:mm'),
			employee,
			service,
			status: 'Chờ duyệt',
		};

		// Check for overlapping appointments
		const isOverlapping = appointments.some(
			(appointment) =>
				appointment.date === newAppointment.date &&
				appointment.time === newAppointment.time &&
				appointment.employee === newAppointment.employee,
		);

		if (isOverlapping) {
			message.error('Lịch hẹn bị trùng. Vui lòng chọn thời gian khác.');
			return;
		}

		setAppointments([...appointments, newAppointment]);
		message.success('Đặt lịch hẹn thành công.');
	};

	const handleUpdateStatus = (index, status) => {
		const updatedAppointments = [...appointments];
		updatedAppointments[index].status = status;
		setAppointments(updatedAppointments);
		message.success('Cập nhật trạng thái thành công.');
	};

	const handleAddOrEditEmployee = (values) => {
		if (editingEmployee) {
			setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? { ...editingEmployee, ...values } : emp)));
			message.success('Cập nhật nhân viên thành công.');
		} else {
			setEmployees([...employees, { id: Date.now(), ...values, ratings: [], averageRating: 0 }]);
			message.success('Thêm nhân viên thành công.');
		}
		setIsEmployeeModalVisible(false);
		setEditingEmployee(null);
		employeeForm.resetFields();
	};

	const handleEditEmployee = (employee) => {
		setEditingEmployee(employee);
		employeeForm.setFieldsValue(employee);
		setIsEmployeeModalVisible(true);
	};

	const handleDeleteEmployee = (id) => {
		setEmployees(employees.filter((emp) => emp.id !== id));
		message.success('Xóa nhân viên thành công.');
	};

	const handleAddOrEditService = (values) => {
		if (editingService) {
			setServices(services.map((svc) => (svc.id === editingService.id ? { ...editingService, ...values } : svc)));
			message.success('Cập nhật dịch vụ thành công.');
		} else {
			setServices([...services, { id: Date.now(), ...values }]);
			message.success('Thêm dịch vụ thành công.');
		}
		setIsServiceModalVisible(false);
		setEditingService(null);
		serviceForm.resetFields();
	};

	const handleEditService = (service) => {
		setEditingService(service);
		serviceForm.setFieldsValue(service);
		setIsServiceModalVisible(true);
	};

	const handleDeleteService = (id) => {
		setServices(services.filter((svc) => svc.id !== id));
		message.success('Xóa dịch vụ thành công.');
	};

	const handleRateAppointment = (values) => {
		const { rating, comment } = values;
		const updatedAppointments = [...appointments];
		const appointmentIndex = updatedAppointments.findIndex((app) => app === currentAppointment);
		updatedAppointments[appointmentIndex].rating = rating;
		updatedAppointments[appointmentIndex].comment = comment;
		setAppointments(updatedAppointments);

		const employeeIndex = employees.findIndex((emp) => emp.name === currentAppointment.employee);
		const updatedEmployees = [...employees];
		updatedEmployees[employeeIndex].ratings.push(rating);
		updatedEmployees[employeeIndex].averageRating =
			updatedEmployees[employeeIndex].ratings.reduce((a, b) => a + b, 0) /
			updatedEmployees[employeeIndex].ratings.length;
		setEmployees(updatedEmployees);

		setIsRatingModalVisible(false);
		setCurrentAppointment(null);
		ratingForm.resetFields();
		message.success('Đánh giá thành công.');
	};

	const generateReport = () => {
		const appointmentsByDate = appointments.reduce((acc, appointment) => {
			const date = appointment.date;
			if (!acc[date]) {
				acc[date] = 0;
			}
			acc[date]++;
			return acc;
		}, {});

		const revenueByService = services.reduce((acc, service) => {
			acc[service.name] = appointments.filter((app) => app.service === service.name).length * service.price;
			return acc;
		}, {});

		const revenueByEmployee = employees.reduce((acc, employee) => {
			acc[employee.name] = appointments
				.filter((app) => app.employee === employee.name)
				.reduce((sum, app) => {
					const service = services.find((svc) => svc.name === app.service);
					return sum + (service ? service.price : 0);
				}, 0);
			return acc;
		}, {});

		return { appointmentsByDate, revenueByService, revenueByEmployee };
	};

	const reportData = generateReport();

	return (
		<Card
			style={{
				maxWidth: 1200,
				margin: 'auto',
				textAlign: 'center',
				backgroundColor: '#f0f2f5',
				borderRadius: '10px',
				padding: '20px',
			}}
		>
			<Title level={2} style={{ color: '#1890ff' }}>
				Quản lý lịch hẹn
			</Title>
			<Form form={form} onFinish={handleCreateAppointment} layout='vertical'>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name='date' label='Ngày' rules={[{ required: true }]}>
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='time' label='Giờ' rules={[{ required: true }]}>
							<TimePicker format='HH:mm' style={{ width: '100%' }} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name='employee' label='Nhân viên' rules={[{ required: true }]}>
							<Select placeholder='Chọn nhân viên' style={{ width: '100%' }}>
								{employees.map((employee) => (
									<Option key={employee.id} value={employee.name}>
										{employee.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='service' label='Dịch vụ' rules={[{ required: true }]}>
							<Select placeholder='Chọn dịch vụ' style={{ width: '100%' }}>
								{services.map((service) => (
									<Option key={service.id} value={service.name}>
										{service.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Button type='primary' htmlType='submit' style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
					Đặt lịch hẹn
				</Button>
			</Form>
			<Title level={3} style={{ marginTop: 20, color: '#1890ff' }}>
				Lịch hẹn
			</Title>
			<List
				bordered
				dataSource={appointments}
				renderItem={(item, index) => (
					<List.Item key={index} style={{ backgroundColor: '#fff', borderRadius: '5px', marginBottom: '10px' }}>
						<Text>
							{item.date} {item.time} - {item.service} với {item.employee} ({item.status})
						</Text>
						<Select
							defaultValue={item.status}
							style={{ width: 120, marginLeft: 10 }}
							onChange={(value) => handleUpdateStatus(index, value)}
						>
							<Option value='Chờ duyệt'>
								<Tag color='blue'>Chờ duyệt</Tag>
							</Option>
							<Option value='Xác nhận'>
								<Tag color='green'>Xác nhận</Tag>
							</Option>
							<Option value='Hoàn thành'>
								<Tag color='gold'>Hoàn thành</Tag>
							</Option>
							<Option value='Hủy'>
								<Tag color='red'>Hủy</Tag>
							</Option>
						</Select>
						{item.status === 'Hoàn thành' && !item.rating && (
							<Button
								type='link'
								onClick={() => {
									setCurrentAppointment(item);
									setIsRatingModalVisible(true);
								}}
							>
								Đánh giá
							</Button>
						)}
					</List.Item>
				)}
			/>
			<Title level={3} style={{ marginTop: 20, color: '#1890ff' }}>
				Quản lý nhân viên
			</Title>
			<Button
				type='primary'
				onClick={() => setIsEmployeeModalVisible(true)}
				style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
			>
				Thêm nhân viên
			</Button>
			<List
				bordered
				dataSource={employees}
				renderItem={(item) => (
					<List.Item key={item.id} style={{ backgroundColor: '#fff', borderRadius: '5px', marginBottom: '10px' }}>
						<Text>
							{item.name} - Giới hạn: {item.maxAppointmentsPerDay} khách/ngày - Giờ làm việc: {item.workingHours} - Đánh
							giá trung bình: {item.averageRating.toFixed(1)}
						</Text>
						<Button type='link' onClick={() => handleEditEmployee(item)}>
							Sửa
						</Button>
						<Button type='link' danger onClick={() => handleDeleteEmployee(item.id)}>
							Xóa
						</Button>
					</List.Item>
				)}
			/>
			<Title level={3} style={{ marginTop: 20, color: '#1890ff' }}>
				Quản lý dịch vụ
			</Title>
			<Button
				type='primary'
				onClick={() => setIsServiceModalVisible(true)}
				style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
			>
				Thêm dịch vụ
			</Button>
			<List
				bordered
				dataSource={services}
				renderItem={(item) => (
					<List.Item key={item.id} style={{ backgroundColor: '#fff', borderRadius: '5px', marginBottom: '10px' }}>
						<Text>
							{item.name} - Giá: {item.price} VND - Thời gian: {item.duration} phút
						</Text>
						<Button type='link' onClick={() => handleEditService(item)}>
							Sửa
						</Button>
						<Button type='link' danger onClick={() => handleDeleteService(item.id)}>
							Xóa
						</Button>
					</List.Item>
				)}
			/>
			<Button
				type='primary'
				onClick={() => setIsReportModalVisible(true)}
				style={{ marginTop: 20, backgroundColor: '#1890ff', borderColor: '#1890ff' }}
			>
				Xem báo cáo
			</Button>
			<Modal
				title={editingEmployee ? 'Sửa nhân viên' : 'Thêm nhân viên'}
				visible={isEmployeeModalVisible}
				onCancel={() => {
					setIsEmployeeModalVisible(false);
					setEditingEmployee(null);
					employeeForm.resetFields();
				}}
				footer={null}
			>
				<Form form={employeeForm} onFinish={handleAddOrEditEmployee} layout='vertical'>
					<Form.Item name='name' label='Tên nhân viên' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='maxAppointmentsPerDay' label='Giới hạn khách/ngày' rules={[{ required: true }]}>
						<Input type='number' min={1} />
					</Form.Item>
					<Form.Item name='workingHours' label='Giờ làm việc' rules={[{ required: true }]}>
						<Select placeholder='Chọn giờ làm việc'>
							<Option value='09:00-17:00'>09:00-17:00</Option>
							<Option value='10:00-18:00'>10:00-18:00</Option>
							<Option value='11:00-19:00'>11:00-19:00</Option>
						</Select>
					</Form.Item>
					<Button type='primary' htmlType='submit'>
						{editingEmployee ? 'Lưu' : 'Thêm'}
					</Button>
				</Form>
			</Modal>
			<Modal
				title={editingService ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}
				visible={isServiceModalVisible}
				onCancel={() => {
					setIsServiceModalVisible(false);
					setEditingService(null);
					serviceForm.resetFields();
				}}
				footer={null}
			>
				<Form form={serviceForm} onFinish={handleAddOrEditService} layout='vertical'>
					<Form.Item name='name' label='Tên dịch vụ' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='price' label='Giá (VND)' rules={[{ required: true }]}>
						<Input type='number' min={0} />
					</Form.Item>
					<Form.Item name='duration' label='Thời gian (phút)' rules={[{ required: true }]}>
						<Input type='number' min={0} />
					</Form.Item>
					<Button type='primary' htmlType='submit'>
						{editingService ? 'Lưu' : 'Thêm'}
					</Button>
				</Form>
			</Modal>
			<Modal
				title='Đánh giá dịch vụ'
				visible={isRatingModalVisible}
				onCancel={() => {
					setIsRatingModalVisible(false);
					setCurrentAppointment(null);
					ratingForm.resetFields();
				}}
				footer={null}
			>
				<Form form={ratingForm} onFinish={handleRateAppointment} layout='vertical'>
					<Form.Item name='rating' label='Đánh giá' rules={[{ required: true }]}>
						<Rate />
					</Form.Item>
					<Form.Item name='comment' label='Nhận xét'>
						<Input.TextArea />
					</Form.Item>
					<Button type='primary' htmlType='submit'>
						Gửi đánh giá
					</Button>
				</Form>
			</Modal>
			<Modal
				title='Báo cáo'
				visible={isReportModalVisible}
				onCancel={() => setIsReportModalVisible(false)}
				footer={null}
			>
				<Title level={4}>Thống kê số lượng lịch hẹn theo ngày</Title>
				<Table
					dataSource={Object.entries(reportData.appointmentsByDate).map(([date, count]) => ({ date, count }))}
					columns={[
						{ title: 'Ngày', dataIndex: 'date', key: 'date' },
						{ title: 'Số lượng lịch hẹn', dataIndex: 'count', key: 'count' },
					]}
					pagination={false}
				/>
				<Title level={4} style={{ marginTop: 20 }}>
					Thống kê doanh thu theo dịch vụ
				</Title>
				<Table
					dataSource={Object.entries(reportData.revenueByService).map(([service, revenue]) => ({ service, revenue }))}
					columns={[
						{ title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
						{ title: 'Doanh thu (VND)', dataIndex: 'revenue', key: 'revenue' },
					]}
					pagination={false}
				/>
				<Title level={4} style={{ marginTop: 20 }}>
					Thống kê doanh thu theo nhân viên
				</Title>
				<Table
					dataSource={Object.entries(reportData.revenueByEmployee).map(([employee, revenue]) => ({
						employee,
						revenue,
					}))}
					columns={[
						{ title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
						{ title: 'Doanh thu (VND)', dataIndex: 'revenue', key: 'revenue' },
					]}
					pagination={false}
				/>
			</Modal>
		</Card>
	);
};

export default ThucHanh3;
