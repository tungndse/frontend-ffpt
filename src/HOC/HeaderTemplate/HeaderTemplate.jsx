import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuHeader from './MenuHeader';

export default function HeaderTemplate() {
	return (
		<div className='w-full h-20 shadow fixed top-0 z-[999] bg-white'>
			<div className='w-10/12 h-full mx-auto flex justify-between items-center'>
				<NavLink to='' className='text-xl text-red-500 font-bold'>
					F-Food
				</NavLink>
				<MenuHeader />
			</div>
		</div>
	);
}
