import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { menuService } from '../services/menuService.js';
import { BASE_URL } from '../services/httpService';

export const createMenu = createAsyncThunk('menuSlice/createMenu', async (menuInfo, thunkAPI) => {
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(menuInfo),
		};

		const url = BASE_URL + '/menu/CreateMenu';
		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Failed to create menu'); // Handle non-2xx response status
		}
		thunkAPI.dispatch(toggleAddMenuModal());
		thunkAPI.dispatch(getMenuList({ page: 1, pageSize: 10 }));
		message.success('Tạo menu thành công!');
		const data = await response.json();
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});

export const getMenuList = createAsyncThunk('menuSlice/getMenuList', async (pagination, thunkAPI) => {
	try {
		const res = await fetch('https://webapp-ffpt.azurewebsites.net/api/v1.0/menu/GetListMenu');
		const data = await res.json();
		// console.log('getMenuList', data);
		return data;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});

export const getMenuInfo = createAsyncThunk('menuSlice/getMenuInfo', async (menuId, thunkAPI) => {
	try {
		const res = await fetch(BASE_URL + '/menu/GetMenuById?menuId=${menuId}');
		const data = await res.json();
		// console.log('getMenuInfo', data);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});

export const updateMenu = createAsyncThunk('menuSlice/updateMenu', async ({ menuID, newMenu }, thunkAPI) => {
	try {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json', // Adjust the content type according to your API requirements
			},
			body: JSON.stringify(newMenu),
		};

		const url = BASE_URL + '/menu/UpdateMenu?menuId=${menuID}';
		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Failed to update product'); // Handle non-2xx response status
		}

		thunkAPI.dispatch(toggleEditMenuModal());
		thunkAPI.dispatch(getMenuList({ page: 1, pageSize: 10 }));
		message.success('Cập nhật menu thành công!');
		const data = await response.json();
		return data;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});

const menuSlice = createSlice({
	name: 'menuSlice',
	initialState: {
		menuList: [],
		currentMenu: {},
		modalAddMenu: false,
		modalEditMenu: false,
	},
	reducers: {
		toggleAddMenuModal: (state, action) => {
			state.modalAddMenu = !state.modalAddMenu;
		},
		toggleEditMenuModal: (state, action) => {
			state.modalEditMenu = !state.modalEditMenu;
		},
	},
	extraReducers: {
		[getMenuList.pending]: (state, action) => {
			state.menuList = [];
		},
		[getMenuList.fulfilled]: (state, action) => {
			state.menuList = action.payload;
		},
		[getMenuList.rejected]: (state, action) => {},

		[getMenuInfo.pending]: (state, action) => {
			state.currentMenu = action.payload;
		},
		[getMenuInfo.fulfilled]: (state, action) => {
			state.currentMenu = action.payload;
		},
		[getMenuInfo.rejected]: (state, action) => {},
	},
});

const { reducer, actions } = menuSlice;
export const { toggleEditMenuModal, toggleAddMenuModal } = actions;
export default reducer;
