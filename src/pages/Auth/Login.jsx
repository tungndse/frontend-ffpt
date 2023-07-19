import React from 'react';
import SignIn from './SignIn';
import './style.css';
export default function Login() {
	document.title = 'F-Food | Product Management';
	return (
		<div className='container'>
			<div className='auth-container flex items-center justify-center'>
				<div className='form-container'>
					<SignIn />
				</div>
			</div>
		</div>
	);
}
