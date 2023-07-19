import React, { useEffect, useState } from 'react';
import { Input, Select, Table } from 'antd';
import { columnsProductManagement } from '../../utils/productManagement';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	deleteProductInMenu,
	getProductInfo,
	getProductInMenuInfo,
	getProductList,
	getProductListInMenu,
	getProductListInMenuByMenuId,
	toggleAddProductInMenu,
	toggleEditProductInMenu,
	toggleEditProductModal,
} from '../../redux/productSlice';
import { getMenuList } from '../../redux/menuSlice';
import { vndCurrencyFormat } from '../../utils/currency';
export default function TableProductInMenu() {
	const { productListInMenu, isSelect, productListInMenuByMenuId } = useSelector((state) => state.productSlice);
	const { menuList } = useSelector((state) => state.menuSlice);

	const [productData, setProductData] = useState([]);
	const [menuData, setMenuData] = useState([]);
	const [filteredInfo, setFilteredInfo] = useState({});

	const handleChange = (pagination, filters, sorter) => {
		setFilteredInfo(filters);
	};

	const handleChangeSelectMenu = (value) => {
		// console.log(`selected ${value}`);
		dispatch(getProductListInMenuByMenuId(value));
	};

	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		if (isSelect) {
			dispatch(getProductListInMenuByMenuId(1));
		} else {
			dispatch(getProductListInMenu({ page: 1, pageSize: 1000 }));
		}
	}, []);

	useEffect(() => {
		if (isSelect) {
			setProductData(productListInMenuByMenuId?.results);
		} else {
			setProductData(productListInMenu?.results);
		}
	}, [productListInMenuByMenuId, productListInMenu]);

	// console.log('product list: ', productListInMenu);

	useEffect(() => {
		dispatch(getMenuList({ page: 1, pageSize: 30 }));
	}, []);

	useEffect(() => {
		setMenuData(menuList.results);
	}, [menuList]);

	const columnsProductManagement1 = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
			align: 'left',
			sorter: true,
			sorter: (a, b) => {
				if (a.productName > b.productName) {
					return 1;
				}
				if (a.productName < b.productName) {
					return -1;
				}
				return 0;
			},
			width: '25%',
			filteredValue: [searchText],
			onFilter: (value, record) => {
				return String(record.productName).toLowerCase().includes(value.toLowerCase());
			},
		},

		{
			title: 'Danh mục',
			dataIndex: 'categoryName',
			key: 'categoryName',
			align: 'center',
			width: '15%',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'image',
			key: 'image',
			align: 'center',
			width: '15%',
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
			width: '15%',
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
							className='text-white bg-blue-600 px-4 py-2 rounded'
							onClick={() => {
								dispatch(getProductInMenuInfo(record.productMenuId));
								dispatch(toggleEditProductInMenu());
							}}>
							Sửa
						</button>
						<button
							className='text-white bg-red-600 px-4 py-2 rounded'
							onClick={() => dispatch(deleteProductInMenu(record.productMenuId))}>
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

			<Select
				//defaultValue='Buổi sáng'
				placeholder='Chọn menu'
				style={{
					width: 240,
					marginBottom: '20px',
				}}
				onChange={handleChangeSelectMenu}
				options={menuData?.map((item) => ({
					label: item.menuName,
					value: item.id,
				}))}
			/>

			<Table
				bordered
				dataSource={productData}
				columns={columnsProductManagement1}
				rowKey={'_id'}
				onChange={handleChange}></Table>
		</div>
	);
}
