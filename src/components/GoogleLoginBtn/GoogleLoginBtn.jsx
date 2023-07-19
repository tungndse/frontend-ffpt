import React from 'react';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { loginWithGoogle } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

export default function GoogleLoginBtn() {
	const dispatch = useDispatch();
	const onSuccess = (res) => {
		dispatch(loginWithGoogle(res.credential));
	};
	const onError = (res) => {
		console.log(res);
	};

	return (
		<div>
			<GoogleOAuthProvider clientId={'336558258554-0kocf8i3i9arsv4ik9h0jc2clft4u36s.apps.googleusercontent.com'}>
				<GoogleLogin
					onSuccess={onSuccess}
					onError={onError}
					locale='VN'
					cancel_on_tap_outside={false}
					useOneTap
					auto_select
				/>
			</GoogleOAuthProvider>
		</div>
	);
}
