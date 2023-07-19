import React, { useEffect, useState } from 'react';
import { Form, Input, message, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditProductModal } from '../../../redux/productSlice';
import _ from 'lodash';
import { updateStatusOrder } from '../../../redux/orderSlice';
const { Option } = Select;
export default function EditOrderForm() {
	const dispatch = useDispatch();

	const { currentOrder } = useSelector((state) => state.orderSlice);

	const [initValue, setInitValue] = useState([]);

	const ORDER_STATUS_ENUM = [
		{
			id: 0,
			name: 'lorem',
		},
		{
			id: 1,
			name: 'Đã huỷ',
		},
		{
			id: 2,
			name: 'Chờ xác nhận',
		},
		{
			id: 3,
			name: 'Chờ lấy hàng',
		},
		{
			id: 4,
			name: 'Đã giao',
		},
	];

	useEffect(() => {
		setInitValue({
			orderId: currentOrder?.id,
			orderStatus: currentOrder?.orderStatus,
		});
		setInitValue([
			{
				name: ['orderId'],
				value: currentOrder?.id,
			},
			{
				name: ['orderStatus'],
				value: currentOrder?.orderStatus,
			},
		]);
	}, []);

	const onFinish = (values) => {
		console.log('value: ', values);
		dispatch(
			updateStatusOrder({
				orderId: currentOrder?.id,
				newOrderInfo: values,
			})
		);
	};

	const onFinishFailed = (errorInfo) => {
		message.error('Sửa thông tin thất bại, vui lòng kiểm tra lại thông tin');
		dispatch(toggleEditProductModal());
	};
	return (
		<div>
			<div className='rounded-xl'>
				<div>
					<Form
						className='font-medium'
						labelCol={{ span: 5 }}
						name='basic'
						initialValues={{
							remember: true,
						}}
						fields={initValue}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Form.Item
							//initialValue={currentProduct?.price}
							label='ID đơn hàng'
							//name='price'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='orderId'>
								<Input style={{ width: '100%' }} disabled />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.price}
							label='Order Status'
							//name='price'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='orderStatus'>
								{/* <Input style={{ width: '100%' }} /> */}
								<Select
									//defaultValue={menuData[0]}
									// name='categoryId'
									// label='Danh mục'
									style={{
										width: '100%',
									}}>
									{ORDER_STATUS_ENUM?.map((status, index) => {
										if (index >= 1) {
											return (
												<Option value={status.id} key={index}>
													{status.name}
												</Option>
											);
										}
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
