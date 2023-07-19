import React, { useEffect } from 'react';
import AddProductInMenuModal from './AddProductInMenu/AddProductInMenuModal';

import EditProductInMenuModal from './EditProductInMenu/EditProductInMenuModal';
import TableProductInMenu from './TableProductInMenu';
import _ from 'lodash';
function ProductInMenu(props) {
	return (
		<>
			<EditProductInMenuModal />
			<AddProductInMenuModal />
			<div className='pl-72 pr-12 space-y-5'>
				<TableProductInMenu />
			</div>
		</>
	);
}

export default ProductInMenu;
