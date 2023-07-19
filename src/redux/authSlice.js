import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { googleLogout } from '@react-oauth/google';
const initialState = {
	accessToken: '',
	user: {},
	loginLoading: false,
	updateUserInfoSuccess: false,
};

// async action
const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (token) => {
	console.log(token);
	const result = await authService.login(token);
	return result.data;
});
// normal action
const logout = createAction('authSlice/logout', () => {
	googleLogout();

	return {
		payload: {},
	};
});

const authSlice = createSlice({
	name: 'authSlice',
	initialState: initialState,
	reducers: {
		logout: (state, { payload }) => {
			state.accessToken = '';
			state.user = {};
		},
	},
	extraReducers: (builder) => {
		// get user info
		builder.addCase(loginWithGoogle.pending, (state) => ({
			...state,
			loginLoading: true,
		}));
		builder.addCase(loginWithGoogle.fulfilled, (state, { payload }) => ({
			...state,
			user: payload,
		}));
		builder.addCase(loginWithGoogle.rejected, (state) => ({
			...state,
		}));
	},
});
const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
export { loginWithGoogle, logout };
