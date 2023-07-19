export const TOKEN_CYBERSOFT = process.env.REACT_APP_CYBERSOFT_TOKEN;

export const getAccessToken = () => {
	let adminLogin = null;
	if (adminLogin) {
		return adminLogin.accessToken;
	} else {
		return null;
	}
};
export const getRequestConfig = () => {
	const config = {
		headers: {},
	};
	const accessToken = getAccessToken();
	if (accessToken) {
		config.headers.token = accessToken;
	}
	return config;
};
