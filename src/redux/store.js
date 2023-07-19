import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import loadingSlice from './loadingSlice';
import categorySlice from './categorySlice';
import menuSlice from './menuSlice';
import orderSlice from './orderSlice';
import settingSlice from './settingSlice';

export const store = configureStore({
	reducer: {
		authSlice,
		loadingSlice,
		productSlice,
		categorySlice,
		menuSlice,
		orderSlice,
		settingSlice,
	},
});
