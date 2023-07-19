import React, { useEffect, useState } from 'react';
import { Form, Input, message, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, createProductInMenu, updateProduct } from '../../../redux/productSlice';
import { UploadOutlined } from '@ant-design/icons';
import { getMenuList } from '../../../redux/menuSlice';

const { Option } = Select;
export default function AddProductInMenuForm() {
	const dispatch = useDispatch();
	const { currentProduct } = useSelector((state) => state.productSlice);
	const { menuList } = useSelector((state) => state.menuSlice);

	const [initValue, setInitValue] = useState([]);
	const [menuData, setMenuData] = useState([]);

	useEffect(() => {
		setMenuData(menuList.results);
	}, [menuList]);

	useEffect(() => {
		dispatch(getMenuList({ page: 1, pageSize: 50 }));
	}, []);

	useEffect(() => {
		setInitValue({
			name: currentProduct?.name,
			categoryId: currentProduct?.categoryId,
			detail: currentProduct?.detail,
			image: currentProduct?.image,
			price: currentProduct?.price,
			quantity: currentProduct?.quantity,
			code: currentProduct?.code,
			supplierStoreId: currentProduct?.supplierStoreId,
		});
		setInitValue([
			{
				name: ['name'],
				value: currentProduct?.name,
			},
			{
				name: ['categoryId'],
				value: currentProduct?.categoryId,
			},
			{
				name: ['detail'],
				value: currentProduct?.detail,
			},
			{
				name: ['image'],
				value: currentProduct?.image,
			},
			{
				name: ['price'],
				value: currentProduct?.price,
			},
			{
				name: ['quantity'],
				value: currentProduct?.quantity,
			},
			{
				name: ['code'],
				value: currentProduct?.code,
			},
			{
				name: ['supplierStoreId'],
				value: currentProduct?.supplierStoreId,
			},
		]);
	}, []);

	const validateMessages = {
		required: '${label} không được để trống',
		whitespace: '${label} không được để trống',
		types: {
			number: '${label} không hợp lệ',
		},
	};

	const onFinish = (values) => {
		console.log(values);
		let data = {
			menuId: values.menuId,
			products: [
				{
					productId: currentProduct?.id,
					price: values.price,
				},
			],
		};
		dispatch(createProductInMenu(data));
	};

	const onFinishFailed = (errorInfo) => {
		message.error('Tạo sản phẩm thất bại, vui lòng kiểm tra lại thông tin');
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
							// initialValue=''
							label='Menu ID'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Form.Item name='menuId'>
								{/* <Input /> */}
								<Select
									//defaultValue={menuData[0]}
									// name='categoryId'
									// label='Danh mục'
									style={{
										width: '100%',
									}}>
									{menuData?.map((menu, index) => {
										return (
											<Option value={menu.id} key={index}>
												{menu.menuName}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.price}
							label='Tên sản phẩm'
							//name='price'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='name'>
								<Input style={{ width: '100%' }} disabled />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.price}
							label='Giá'
							//name='price'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='price'>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Form.Item>

						<Form.Item className='truncate' style={{ margin: '0' }}>
							<button
								className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
								style={{
									backgroundImage:
										'radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%',
								}}>
								<span>Tạo sản phẩm vào menu</span>
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
