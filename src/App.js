import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { sellerRoutes } from './routes/sellerRoutes';
import Loading from './components/Loading';
function App() {
	return (
		<div className='App relative'>
			<Loading />
			<BrowserRouter>
				<Routes>
					{sellerRoutes.map((route, index) => {
						return <Route key={index} path={route.path} element={route.component} />;
					})}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
