import React, { useEffect, useState } from 'react';
import { Form, Input, message, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditProductModal, updateProduct, updateProductInMenu } from '../../../redux/productSlice';
import _ from 'lodash';
import { getMenuList } from '../../../redux/menuSlice';
const { Option } = Select;
export default function EditProductInMenuForm() {
	const dispatch = useDispatch();
	const { currentProductInMenu } = useSelector((state) => state.productSlice);
	const { menuList } = useSelector((state) => state.menuSlice);

	const [form] = Form.useForm();

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
			productId: currentProductInMenu?.productMenuId,
			menuId: currentProductInMenu?.menuId,
			price: currentProductInMenu?.price,
			active: 0,
		});
		setInitValue([
			{
				name: ['productId'],
				value: currentProductInMenu?.productMenuId,
			},
			{
				name: ['menuId'],
				value: currentProductInMenu?.menuId,
			},
			{
				name: ['price'],
				value: currentProductInMenu?.price,
			},
			{
				name: ['active'],
				value: 0,
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
		console.log('value: ', values);
		dispatch(
			updateProductInMenu({
				productID: currentProductInMenu.productMenuId,
				newproductInfo: values,
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
							label='Menu'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							{/* <Form.Item name='menuId'>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item> */}
							<Form.Item name='menuId'>
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
							label='ID sản phẩm'
							//name='price'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='productId'>
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
								<span>Cập nhật</span>
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
