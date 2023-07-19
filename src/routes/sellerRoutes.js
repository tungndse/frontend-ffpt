import ThemeLayout from '../HOC/ThemeLayout';
import Login from '../pages/Auth/Login';
import MenuManagement from '../pages/MenuManagement/MenuManagement';
import OrderManagement from '../pages/Order/OrderManagement';
import ProductInMenu from '../pages/ProductInMenu/ProductInMenu';
import ProductManagement from '../pages/ProductManagement/ProductManagement';
export const sellerRoutes = [
	{
		path: '/',
		component: <Login />,
	},

	{
		path: '/product',
		component: <ThemeLayout Component={ProductManagement} />,
	},
	{
		path: '/product-in-menu',
		component: <ThemeLayout Component={ProductInMenu} />,
	},
	{
		path: '/menu',
		component: <ThemeLayout Component={MenuManagement} />,
	},
	{
		path: '/order',
		component: <ThemeLayout Component={OrderManagement} />,
	},
];
