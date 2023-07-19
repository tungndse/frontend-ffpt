import { httpService } from './httpService';

export const productService = {
	createProduct: (data) => {
		return httpService.post(`/product/CreateProduct`, data);
	},
	updateProductInfo: ({ productID, newproductInfo }) => {
		return httpService.put(`/product/UpdateProduct?productId=${productID}`, newproductInfo);
	},
	getProductList: ({ page, pageSize }) => {
		return httpService.get(`/product?page=${page}&pageSize=${pageSize}`);
	},
	getProductInfo: (productID) => {
		return httpService.get(`/product/GetById?id=${productID}`);
	},

	// product in menu
	getProductListInMenu: ({ page, pageSize }) => {
		return httpService.get(`/product-in-menu?page=1&pageSize=999`);
	},

	getProductListInMenuByMenuId: (menuId) => {
		return httpService.get(`/product-in-menu/GetProductInMenuByMenu?menuId=${menuId}`);
	},

	getProductInMenuInfo: (productID) => {
		return httpService.get(`/product-in-menu/GetProductInMenuById?Id=${productID}`);
	},
	createProductInMenu: (data) => {
		return httpService.post(`/product-in-menu/CreateProductInMenu`, data);
	},
	updateProductInMenu: ({ productID, newproductInfo }) => {
		return httpService.put(`/product-in-menu/UpdateProductInMenu?productInMenuId=${productID}`, newproductInfo);
	},
	deleteProductInMenu: (productID) => {
		console.log('id: ', productID);
		return httpService.delete(`/product-in-menu/DeleteProductInMenu?productInMenuId=${productID}`);
	},
};
