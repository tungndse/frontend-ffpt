import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';
const { Title } = Typography;

export default function SignIn() {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onFinish = (values) => {
		const email = values.email;
		const password = values.password;

		if (email === 'nichi56@gmail.com' && password === 'Admin@56') {
			setIsLoading(true);
			setTimeout(() => {
				form.resetFields();
				navigate('/product');
			}, 2000);
		} else {
			message.error('Access Denied');
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<div className='container'>
				<Form
					name='login'
					form={form}
					initialValues={{
						remember: false,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<Title level={2} className='text-center'>
						Welcome Back 👋
					</Title>

					<Form.Item
						name='email'
						hasFeedback
						label='Email address'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: 'Please input your email.',
							},
							{
								type: 'email',
								message: 'Your email is invalid.',
							},
						]}>
						<Input placeholder='Email' size='large' />
					</Form.Item>

					<Form.Item
						name='password'
						hasFeedback
						label='Password'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: 'Please input your password.',
							},
							{ min: 6, message: 'Password must be minimum 6 characters.' },
						]}>
						<Input.Password placeholder='Password' size='large' />
					</Form.Item>
					<button
						type='submit'
						class='rounded-full mt-6 font-bold text-base p-2 bg-gradient-to-r from-green-400 to-[#162D3A] hover:from-red-500 hover:to-yellow-300 ...'>
						SIGN IN
					</button>
				</Form>
			</div>
		</>
	);
}
