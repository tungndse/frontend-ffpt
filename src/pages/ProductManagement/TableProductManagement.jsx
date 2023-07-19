import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { columnsProductManagement } from '../../utils/productManagement';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getProductInfo,
	getProductList,
	toggleAddProductInMenu,
	toggleEditProductModal,
} from '../../redux/productSlice';
import { vndCurrencyFormat } from '../../utils/currency';
export default function TableProductManagement() {
	const { productFilterredList, productList } = useSelector((state) => state.productSlice);
	const { categoryList } = useSelector((state) => state.categorySlice);
	const [productData, setProductData] = useState([]);
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		dispatch(getProductList({ page: 1, pageSize: 10 }));
	}, []);

	useEffect(() => {
		setProductData(productList);
	}, [productList]);
	const handleChangePage = (page) => {
		const currentPage = page?.current ?? 1;
		const pageSize = page?.pageSize ?? 10;
		dispatch(getProductList({ page: currentPage, pageSize: pageSize }));
	};

	const columnsProductManagement1 = [
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			//sorter: true,
			sorter: (a, b) => {
				if (a.name > b.name) {
					return 1;
				}
				if (a.name < b.name) {
					return -1;
				}
				return 0;
			},
			width: '25%',
			filteredValue: [searchText],
			onFilter: (value, record) => {
				return String(record.name).toLowerCase().includes(value.toLowerCase());
			},
		},

		{
			title: 'Danh mục',
			dataIndex: 'categoryId',
			key: 'categoryId',
			align: 'center',
			width: '15%',
			render: (value, record) => {
				const filterCategory = categoryList.filter((item) => item.id === record.categoryId);
				const results = filterCategory.map((item) => {
					return <>{item.categoryName}</>;
				});
				return results;
			},
		},
		{
			title: 'Miêu tả',
			dataIndex: 'detail',
			key: 'detail',
			align: 'center',
			width: '20%',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'image',
			key: 'image',
			align: 'center',
			width: '10%',
			render: (img) => {
				return (
					<div className='flex justify-center'>
						<img className='h-16 w-24' src={img} alt={img} />
					</div>
				);
			},
		},

		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
			width: '10%',
			render: (value, record) => {
				return <span>{vndCurrencyFormat(value)}</span>;
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
								dispatch(getProductInfo(record.id));
								dispatch(toggleAddProductInMenu());
							}}>
							Thêm vào menu
						</button>
						<button
							className='text-white bg-blue-600 px-4 py-2 rounded'
							onClick={() => {
								dispatch(getProductInfo(record.id));
								dispatch(toggleEditProductModal());
							}}>
							Sửa
						</button>
						<button
							className='text-white bg-red-600 px-4 py-2 rounded'
							onClick={() => dispatch(deleteProduct(record.id))}>
							Xóa
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
				dataSource={productData}
				columns={columnsProductManagement1}
				rowKey={'_id'}
				pagination={{
					total: productList?.totalNumberOfRecords,
					showTotal: (total) => `Total ${total} products`,
					current: productList?.pageNumber,
					pageSize: productList?.pageSize,
					onChange: (page, pageSize) => {
						handleChangePage({ current: page, pageSize: pageSize });
					},
				}}></Table>
		</div>
	);
}
