import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { productService } from '../services/productService';
import { message } from 'antd';
import { BASE_URL } from '../services/httpService';
export const createProduct = createAsyncThunk('productSlice/createProduct', async (productInfo, thunkAPI) => {
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productInfo),
		};

		const url = BASE_URL + `/product/CreateProduct`;
		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Failed to create product'); // Handle non-2xx response status
		}

		thunkAPI.dispatch(toggleAddProductModal());
		thunkAPI.dispatch(getProductList({ page: 1, pageSize: 10 }));
		message.success('Tạo sản phẩm thành công!');

		const data = await response.json();
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});

export const getProductList = createAsyncThunk('locatiohSlice/getProductList', async (pagination, thunkAPI) => {
	try {
		const res = await fetch('https://webapp-ffpt.azurewebsites.net/api/v1.0/product');
		const data = await res.json();
		console.log('getProductList', data.results);
		return data.results;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});
export const getProductInfo = createAsyncThunk('productSlice/getProductById', async (productID, thunkAPI) => {
	try {
		const res = await fetch(BASE_URL + `/product/GetById?id=${productID}`);
		const data = await res.json();
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});

export const deleteProduct = createAsyncThunk('productSlice/deleteProduct', async (ProductID, thunkAPI) => {
	try {
		const response = await fetch(BASE_URL + `/product/DeleteProduct?productId=${ProductID}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			thunkAPI.dispatch(getProductList({ page: 1, pageSize: 10 }));
			message.success('Xoá sản phẩm thành công!');
		} else {
			const result = await response.text();
			throw new Error(result);
		}
	} catch (error) {
		message.error(error.message);
		return thunkAPI.rejectWithValue();
	}
});

export const updateProduct = createAsyncThunk(
	'productSlice/updateProduct',
	async ({ productID, newproductInfo }, thunkAPI) => {
		try {
			const requestOptions = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json', // Adjust the content type according to your API requirements
				},
				body: JSON.stringify(newproductInfo),
			};

			const url = BASE_URL + `/product/UpdateProduct?productId=${productID}`;
			const response = await fetch(url, requestOptions);

			if (!response.ok) {
				throw new Error('Failed to update product'); // Handle non-2xx response status
			}

			thunkAPI.dispatch(toggleEditProductModal());
			thunkAPI.dispatch(getProductList({ page: 1, pageSize: 10 }));
			message.success('Cập nhật sản phẩm thành công!');
			const data = await response.json();
			return data;
		} catch (error) {
			message.error(error.response.data.message);
			return thunkAPI.rejectWithValue();
		}
	}
);
export const filterProduct = createAsyncThunk('productSlice/filterProduct', async (searchKey, thunkAPI) => {
	try {
		const productList = thunkAPI.getState().productSlice.productList;
		let filterredList = productList.filter((item) => {
			if (typeof item.name === 'string' && item.name.trim().toUpperCase().includes(searchKey.trim().toUpperCase())) {
				return item;
			}
		});
		return filterredList;
	} catch (err) {
		message.error('Có lỗi xảy ra vui lòng thử lại');
		return thunkAPI.rejectWithValue();
	}
});

// product in menu
export const getProductListInMenu = createAsyncThunk(
	'productList/getProductListInMenu',
	async (pagination, thunkAPI) => {
		try {
			const res = await fetch('https://webapp-ffpt.azurewebsites.net/api/v1.0/product-in-menu');
			const data = await res.json();
			// console.log('getProductListInMenu', data);
			return data;
		} catch (error) {
			message.error(error.response.data.message);
			return thunkAPI.rejectWithValue();
		}
	}
);

// get product in menu by menu id
export const getProductListInMenuByMenuId = createAsyncThunk(
	'productList/getProductListInMenuByMenuId',
	async (menuId, thunkAPI) => {
		try {
			const res = await fetch(
				BASE_URL + `/product-in-menu/GetProductInMenuByMenu?menuId=${menuId}`
			);
			const data = await res.json();
			// console.log('getProductListInMenuByMenuId: ', data);
			return data;
		} catch (error) {
			message.error(error.response.data.message);
			return thunkAPI.rejectWithValue();
		}
	}
);

export const getProductInMenuInfo = createAsyncThunk(
	'productSlice/getProductInMenuInfo',
	async (productID, thunkAPI) => {
		console.log('Data api:', productID);
		try {
			const result = await fetch(
				BASE_URL + `/product-in-menu/GetProductInMenuById?Id=${productID}`
			);
			const data = await result.json();
			// console.log('getProductInMenuInfo: ', data);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue();
		}
	}
);

export const createProductInMenu = createAsyncThunk(
	'productSlice/createProductInMenu',
	async (productInfo, thunkAPI) => {
		try {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(productInfo),
			};

			const url = BASE_URL + `/product-in-menu/CreateProductInMenu`;
			const response = await fetch(url, requestOptions);

			if (!response.ok) {
				throw new Error('Failed to create product'); // Handle non-2xx response status
			}
			thunkAPI.dispatch(toggleAddProductInMenu());
			thunkAPI.dispatch(getProductListInMenu({ page: 1, pageSize: 10 }));
			message.success('Tạo sản phẩm vào menu thành công!');
			const data = await response.json();
			return data;
			// return result.data;
		} catch (error) {
			return thunkAPI.rejectWithValue();
		}
	}
);

export const updateProductInMenu = createAsyncThunk(
	'productSlice/updateProductInMenu',
	async ({ productID, newproductInfo }, thunkAPI) => {
		try {
			const requestOptions = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newproductInfo),
			};

			const url = BASE_URL + `/product-in-menu/UpdateProductInMenu?productInMenuId=${productID}`;
			const response = await fetch(url, requestOptions);

			if (!response.ok) {
				throw new Error('Failed to update product'); // Handle non-2xx response status
			}
			thunkAPI.dispatch(toggleEditProductInMenu());
			thunkAPI.dispatch(getProductListInMenu({ page: 1, pageSize: 10 }));
			message.success('Cập nhật sản phẩm thành công!');

			const data = await response.json();
			return data;
		} catch (error) {
			message.error(error.response.data.message);
			return thunkAPI.rejectWithValue();
		}
	}
);

export const deleteProductInMenu = createAsyncThunk('productSlice/deleteProductInMenu', async (productID, thunkAPI) => {
	try {
		const response = await fetch(
			BASE_URL + `/product-in-menu/DeleteProductInMenu?productInMenuId=${productID}`,
			{
				method: 'DELETE',
			}
		);
		if (response.ok) {
			thunkAPI.dispatch(getProductListInMenu({ page: 1, pageSize: 10 }));
			message.success('Xoá sản phẩm thành công!');
		} else {
			const result = await response.text();
			throw new Error(result);
		}
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});

const productSlice = createSlice({
	name: 'productSlice',
	initialState: {
		productList: [],
		productFilterredList: [],
		currentProduct: {},
		modalEdit: false,
		modalAdd: false,

		productListInMenu: [],
		currentProductInMenu: {},
		modalAddProductInMenu: false,
		modalEditProductInMenu: false,

		productListInMenuByMenuId: [],
		isSelect: undefined,
	},
	reducers: {
		toggleEditProductModal: (state, action) => {
			state.modalEdit = !state.modalEdit;
		},
		toggleAddProductModal: (state, action) => {
			state.modalAdd = !state.modalAdd;
		},
		toggleAddProductInMenu: (state, action) => {
			state.modalAddProductInMenu = !state.modalAddProductInMenu;
		},
		toggleEditProductInMenu: (state, action) => {
			state.modalEditProductInMenu = !state.modalEditProductInMenu;
		},
	},
	extraReducers: {
		[getProductList.pending]: (state, action) => {
			state.productList = [];
			state.productFilterredList = [];
		},
		[getProductList.fulfilled]: (state, action) => {
			state.productList = action.payload;
			state.productFilterredList = action.payload;
		},
		[getProductList.rejected]: (state, action) => {},
		[getProductInfo.pending]: (state, action) => {
			state.currentProduct = action.payload;
		},
		[getProductInfo.fulfilled]: (state, action) => {
			state.currentProduct = action.payload;
		},
		[getProductInfo.rejected]: (state, action) => {},
		[filterProduct.pending]: (state, action) => {},
		[filterProduct.fulfilled]: (state, action) => {
			state.productFilterredList = action.payload;
		},

		// get product list in menu
		[getProductListInMenu.pending]: (state, action) => {
			state.productListInMenu = [];
			state.isSelect = false;
		},
		[getProductListInMenu.fulfilled]: (state, action) => {
			state.productListInMenu = action.payload;
			state.isSelect = false;
		},
		[getProductListInMenu.rejected]: (state, action) => {},

		// get product list in menu by menu id
		[getProductListInMenuByMenuId.pending]: (state, action) => {
			state.productListInMenuByMenuId = [];
			state.isSelect = true;
		},
		[getProductListInMenuByMenuId.fulfilled]: (state, action) => {
			state.productListInMenuByMenuId = action.payload;
			state.isSelect = true;
		},
		[getProductListInMenuByMenuId.rejected]: (state, action) => {},

		[getProductInMenuInfo.pending]: (state, action) => {
			state.currentProductInMenu = action.payload;
		},
		[getProductInMenuInfo.fulfilled]: (state, action) => {
			state.currentProductInMenu = action.payload;
		},
		[getProductInMenuInfo.rejected]: (state, action) => {},
	},
});
const { reducer, actions } = productSlice;
export const { toggleEditProductModal, toggleAddProductModal, toggleAddProductInMenu, toggleEditProductInMenu } =
	actions;
export default reducer;
