import React, { useEffect } from 'react';
import { Form, Input, message, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../../redux/productSlice';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
export default function EditProductForm() {
	const dispatch = useDispatch();
	const { categoryList } = useSelector((state) => state.categorySlice);
	const validateMessages = {
		required: '${label} không được để trống',
		whitespace: '${label} không được để trống',
		types: {
			number: '${label} không hợp lệ',
		},
	};
	const onFinish = (values) => {
		console.log('Test create product: ',values);
		dispatch(createProduct(values));
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
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Form.Item
							initialValue=''
							label='Tên'
							name='name'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							initialValue={1}
							label='Danh mục'
							name='categoryId'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Select
								defaultValue={categoryList[0]}
								// name='categoryId'
								// label='Danh mục'
								style={{
									width: '100%',
								}}>
								{categoryList?.map((category, index) => {
									return (
										<Option value={category.id} key={index}>
											{category.categoryName}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Miêu tả'
							name='detail'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Hình ảnh'
							name='image'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							{/* <Upload>
								<Button icon={<UploadOutlined />}>Upload</Button>
							</Upload> */}
							<Input />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Giá'
							name='price'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Số lượng'
							name='quantity'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<InputNumber min={1} max={999} style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Product Code'
							name='code'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Supplier Store ID'
							name='supplierStoreId'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<InputNumber min={1} max={10} style={{ width: '100%' }} />
						</Form.Item>

						<Form.Item className='truncate' style={{ margin: '0' }}>
							<button
								className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
								style={{
									backgroundImage:
										'radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%',
								}}>
								<span>Tạo sản phẩm</span>
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
