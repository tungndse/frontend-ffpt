import { deleteProduct, toggleEditProductModal, getProductInfo } from '../redux/productSlice';

export const columnsProductManagement = [
	{
		title: 'Tên',
		dataIndex: 'name',
		key: 'name',
		align: 'center',
		sorter: true,
		sorter: (a, b) => {
			if (a.name > b.name) {
				return 1;
			}
			if (a.name < b.name) {
				return -1;
			}
			return 0;
		},
	},

	{
		title: 'Danh mục',
		dataIndex: 'categoryId',
		key: 'categoryId',
		align: 'center',
	},
	{
		title: 'Miêu tả',
		dataIndex: 'detail',
		key: 'detail',
		align: 'center',
	},
	{
		title: 'Hình ảnh',
		dataIndex: 'image',
		key: 'image',
		align: 'center',
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
	},

	{
		title: 'Thao tác',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		render: (dispatch, record) => {
			return (
				<div className='flex justify-center space-x-4 w-full h-full'>
					<button
						className='text-white bg-blue-600 px-4 py-2 rounded'
						onClick={() => {
							console.log("id: ", record.id)
							dispatch(getProductInfo(record.id));
							dispatch(toggleEditProductModal());
						}}>
						Sửa
					</button>
					<button
						className='text-white bg-red-600 px-4 py-2 rounded'
						onClick={() => dispatch(deleteProduct(record._id))}>
						Xóa
					</button>
				</div>
			);
		},
	},
];
