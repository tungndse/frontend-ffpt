import { httpService } from './httpService';
import { localStorageService } from './localService';
export const authService = {
	login: (token) => {
		return httpService.post(`/customer/login`, { idToken: token });
	},
};
