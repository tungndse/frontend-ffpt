import { httpService } from './httpService';

export const categoryService = {
	getAllCategory: () => {
		return httpService.get(`/category/GetListCategory`);
	},
};
