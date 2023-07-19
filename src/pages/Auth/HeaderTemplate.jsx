import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderTemplate() {
	return (
		<div className='w-full h-16 shadow fixed top-0 z-[999] bg-white'>
			<div className='w-10/12 h-full mx-auto flex justify-between items-center'>
				<NavLink to='/' className='text-lg text-red-500 font-bold'>
					F-Food
				</NavLink>
			</div>
		</div>
	);
}
