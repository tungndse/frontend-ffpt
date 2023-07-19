import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { orderService } from '../services/orderService';
import { BASE_URL } from '../services/httpService';

export const getOrderList = createAsyncThunk('orderSlice/getOrderList', async (pagination, thunkAPI) => {
	try {
		const result = await fetch('https://webapp-ffpt.azurewebsites.net/api/v1.0/order');
		const data = await result.json();
		console.log('getOrderList', data.results);
		let sortedOrder = data.results;
		sortedOrder.sort(function (a, b) {
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(b.checkInDate) - new Date(a.checkInDate);
		});
		return sortedOrder;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});

export const getOrderInfo = createAsyncThunk('orderSlice/getOrderInfo', async (id, thunkAPI) => {
	try {
		const res = await fetch(BASE_URL + `/order/${id}`);
		const data = await res.json();
		console.log('getOrderInfo', data);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});

export const updateStatusOrder = createAsyncThunk(
	'orderSlice/updateStatusOrder',
	async ({ orderId, newOrderInfo }, thunkAPI) => {
		try {
			const requestOptions = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json', // Adjust the content type according to your API requirements
				},
				body: JSON.stringify(newOrderInfo),
			};
			const url = BASE_URL + `/order/${orderId}?orderStatus=${newOrderInfo.orderStatus}`;
			const response = await fetch(url, requestOptions);
			if (!response.ok) {
				throw new Error('Failed to update status'); // Handle non-2xx response status
			}

			thunkAPI.dispatch(toggleEditOrderModal());
			thunkAPI.dispatch(getOrderList({ page: 1, pageSize: 10 }));
			message.success('Cập nhật trạng thái thành công!');
			const data = await response.json();
			return data;
		} catch (error) {
			message.error(error.response.data.message);
			return thunkAPI.rejectWithValue();
		}
	}
);

const orderSlice = createSlice({
	name: 'orderSlice',
	initialState: {
		orderList: [],
		currentOrder: {},
		modalEditOrder: false,
		modalAdd: false,

		modalViewOrderDetail: false,
	},
	reducers: {
		toggleEditOrderModal: (state, action) => {
			state.modalEditOrder = !state.modalEditOrder;
		},
		toggleAddOrderModal: (state, action) => {
			state.modalAdd = !state.modalAdd;
		},
		toggleViewOrderDetail: (state, action) => {
			state.modalViewOrderDetail = !state.modalViewOrderDetail;
		},
	},
	extraReducers: {
		[getOrderList.pending]: (state, action) => {
			state.orderList = [];
		},
		[getOrderList.fulfilled]: (state, action) => {
			state.orderList = action.payload;
		},
		[getOrderList.rejected]: (state, action) => {},
		[getOrderInfo.pending]: (state, action) => {
			state.currentOrder = action.payload;
		},
		[getOrderInfo.fulfilled]: (state, action) => {
			state.currentOrder = action.payload;
		},
		[getOrderInfo.rejected]: (state, action) => {},
	},
});
const { reducer, actions } = orderSlice;
export const { toggleEditOrderModal, toggleAddOrderModal, toggleViewOrderDetail } = actions;
export default reducer;
