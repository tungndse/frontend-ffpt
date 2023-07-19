import React, { useEffect, useState } from 'react';
import { Form, Input, message, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { toggleEditMenuModal, updateMenu } from '../../../redux/menuSlice';
import { getListTimeSlot } from '../../../redux/settingSlice';
const { Option } = Select;
export default function EditMenuForm() {
	const dispatch = useDispatch();
	const { currentMenu } = useSelector((state) => state.menuSlice);
	console.log('currentMenu: ', currentMenu);
	const { listTimeSlot } = useSelector((state) => state.settingSlice);

	const [initValue, setInitValue] = useState([]);

	useEffect(() => {
		setInitValue({
			menuName: currentMenu?.menuName,
			type: currentMenu?.type,
			timeSlotId: currentMenu?.timeSlotId,
		});
		setInitValue([
			{
				name: ['menuName'],
				value: currentMenu?.menuName,
			},
			{
				name: ['type'],
				value: currentMenu?.type,
			},
			{
				name: ['timeSlotId'],
				value: currentMenu?.timeSlotId,
			},
		]);
	}, []);

	useEffect(() => {
		dispatch(getListTimeSlot());
	}, []);

	const validateMessages = {
		required: '${label} không được để trống',
		whitespace: '${label} không được để trống',
		types: {
			number: '${label} không hợp lệ',
		},
	};
	const onFinish = (values) => {
		console.log('value: ', values);
		dispatch(
			updateMenu({
				menuID: currentMenu.id,
				newMenu: values,
			})
		);
	};

	const onFinishFailed = (errorInfo) => {
		message.error('Sửa thông tin thất bại, vui lòng kiểm tra lại thông tin');
		dispatch(toggleEditMenuModal());
	};
	return (
		<div>
			<div className='rounded-xl'>
				<div>
					<Form
						className='font-medium'
						labelCol={{ span: 5 }}
						validateMessages={validateMessages}
						name='basic'
						initialValues={{
							remember: true,
						}}
						fields={initValue}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Form.Item
							label='Tên menu'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Form.Item name='menuName'>
								<Input />
							</Form.Item>
						</Form.Item>

						<Form.Item
							label='Time slot'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='timeSlotId'>
								<Select
									style={{
										width: '100%',
									}}>
									{listTimeSlot?.map((timeSlot, index) => {
										return (
											<Option value={timeSlot.id} key={index}>
												{timeSlot?.arriveTime} - {timeSlot?.checkoutTime}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</Form.Item>

						<Form.Item className='truncate' style={{ margin: '0' }}>
							<button
								className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
								style={{
									backgroundImage:
										'radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%',
								}}>
								<span>Cập nhật</span>
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
