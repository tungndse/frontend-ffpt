import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderInfo, getOrderList, toggleEditOrderModal, toggleViewOrderDetail } from '../../redux/orderSlice';
import { formatColorStatus } from '../../utils/formatColorStatus';
import { vndCurrencyFormat } from '../../utils/currency';
import { getListTimeSlot } from '../../redux/settingSlice';
export default function TableOrderManagement() {
	const { orderList } = useSelector((state) => state.orderSlice);
	const { listTimeSlot } = useSelector((state) => state.settingSlice);
	const [filteredInfo, setFilteredInfo] = useState({});
	const handleChange = (pagination, filters, sorter) => {
		setFilteredInfo(filters);
	};
	const clearFilters = () => {
		setFilteredInfo({});
	};
	const ORDER_STATUS_ENUM = [
		{
			id: 0,
			name: 'lorem',
		},

		{
			id: 1,
			name: 'Đã huỷ',
		},
		{
			id: 2,
			name: 'Chờ xác nhận',
		},
		{
			id: 3,
			name: 'Chờ lấy hàng',
		},
		{
			id: 4,
			name: 'Đã giao',
		},
	];

	const [orderData, setOrderData] = useState([]);
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		dispatch(getListTimeSlot());
		dispatch(getOrderList({ page: 1, pageSize: 20 }));
	}, []);

	useEffect(() => {
		setOrderData(orderList);
	}, [orderList]);

	useEffect(() => {
		dispatch(getListTimeSlot());
	}, []);

	const handleChangePage = (page) => {
		const currentPage = page?.current ?? 1;
		const pageSize = page?.pageSize ?? 10;
		dispatch(getOrderList({ page: currentPage, pageSize: pageSize }));
	};

	const columnsOrderManagement = [
		{
			title: 'Mã đơn hàng',
			dataIndex: 'orderName',
			key: 'orderName',
			align: 'center',
			sorter: true,
			sorter: (a, b) => {
				if (a.orderName > b.orderName) {
					return 1;
				}
				if (a.orderName < b.orderName) {
					return -1;
				}
				return 0;
			},
			width: '15%',
			filteredValue: [searchText],
			onFilter: (value, record) => {
				return String(record.orderName).toLowerCase().includes(value.toLowerCase());
			},
		},
		{
			title: 'Phòng',
			dataIndex: 'roomNumber',
			key: 'roomNumber',
			align: 'center',
			width: '10%',
		},
		{
			title: 'Time slot',
			dataIndex: 'timeSlotId',
			key: 'timeSlotId',
			align: 'center',
			width: '15%',
			sorter: (a, b) => {
				if (a.timeSlotId > b.timeSlotId) {
					return 1;
				}
				if (a.timeSlotId < b.timeSlotId) {
					return -1;
				}
				return 0;
			},
			render: (value, record) => {
				const timeSlotMapped = listTimeSlot?.find((time) => time.id === record.timeSlotId);
				return (
					<span>
						{timeSlotMapped?.arriveTime} - {timeSlotMapped?.checkoutTime}
					</span>
				);
			},
		},
		{
			title: 'Tổng số tiền',
			dataIndex: 'finalAmount',
			key: 'finalAmount',
			align: 'center',
			width: '10%',
			render: (value, record) => {
				return <span>{vndCurrencyFormat(value)}</span>;
			},
		},
		{
			title: 'SĐT đặt hàng',
			dataIndex: 'deliveryPhone',
			key: 'deliveryPhone',
			align: 'center',
			width: '15%',
		},

		{
			title: 'Trạng thái đơn hàng',
			dataIndex: 'orderStatus',
			key: 'orderStatus',
			align: 'center',
			width: '15%',
			filters: [
				{
					text: 'Đã hủy',
					value: 1,
				},
				{
					text: 'Chờ xác nhận',
					value: 2,
				},
				{
					text: 'Chờ lấy hàng',
					value: 3,
				},
				{
					text: 'Đã giao',
					value: 4,
				},
			],
			filteredValue: filteredInfo.orderStatus || null,
			onFilter: (value, record) => {
				console.log({ record, value });
				return record.orderStatus === value;
			},
			render: (value, record) => {
				return (
					<span style={{ color: formatColorStatus(ORDER_STATUS_ENUM[record?.orderStatus]?.id) }}>
						{ORDER_STATUS_ENUM[record?.orderStatus]?.name}
					</span>
				);
			},
		},

		{
			title: 'Thao tác',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			render: (_, record) => {
				return (
					<div className='flex justify-center space-x-4 w-full h-full'>
						<button
							className='text-white bg-green-600 px-4 py-2 rounded'
							onClick={() => {
								dispatch(getOrderInfo(record.id));
								dispatch(toggleViewOrderDetail());
							}}>
							Chi tiết
						</button>
						<button
							className='text-white bg-blue-600 px-4 py-2 rounded'
							onClick={() => {
								dispatch(getOrderInfo(record.id));
								dispatch(toggleEditOrderModal());
							}}>
							Sửa
						</button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Input
				style={{ border: '2px solid black', marginBottom: '20px', borderRadius: '5px', padding: '10px' }}
				placeholder='Nhập vào sản phẩm bạn muốn tìm'
				allowClear
				onSearch={(value) => {
					setSearchText(value);
				}}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<Table
				bordered
				dataSource={orderData}
				columns={columnsOrderManagement}
				rowKey={'_id'}
				onChange={handleChange}></Table>
		</div>
	);
}
