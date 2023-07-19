import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProduct } from '../../redux/productSlice';
import _ from 'lodash';
import TableOrderManagement from './TableOrderManagement';
import OrderDetailModal from './OrderDetail/OrderDetailModal';
import EditOrderModal from './EditOrder/EditOrderModal';

export default function OrderManagement() {
	const dispatch = useDispatch();
	const [searchKey, setSearchKey] = useState('');

	const handleSearch = (searchValue) => {
		setSearchKey(searchValue);
		dispatch(filterProduct(searchValue));
	};

	document.title = 'F-Food | Product Management';
	return (
		<div>
			<EditOrderModal />
			<OrderDetailModal />
			<div className='pl-72 pr-12 space-y-5'>
				<TableOrderManagement />
			</div>
		</div>
	);
}
