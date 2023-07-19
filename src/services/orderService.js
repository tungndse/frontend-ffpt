import { httpService } from './httpService';

export const orderService = {
	getOrderList: ({ page, pageSize }) => {
		return httpService.get(`/order?page=${1}&pageSize=${200}`);
	},
	getOrderInfo: (id) => {
		return httpService.get(`/order/${id}`);
	},
	updateOrderStatus: ({ orderId, newOrderInfo }) => {
		return httpService.put(`/order/${orderId}?orderStatus=${newOrderInfo.orderStatus}`);
	},
};
