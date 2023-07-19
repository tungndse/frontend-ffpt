import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import { Dialog } from '@headlessui/react';
import AddMenuForm from './AddMenuForm';
import { toggleAddMenuModal } from '../../../redux/menuSlice';

export default function AddMenuModal() {
	const dispatch = useDispatch();
	const { modalAddMenu } = useSelector((state) => state.menuSlice);
	let onClose = () => {
		dispatch(toggleAddMenuModal());
	};
	return (
		<div>
			<Modal
				isOpen={modalAddMenu}
				onClose={onClose}
				children={
					<Dialog.Panel className='w-full md:max-w-[30rem] lg:max-w-[35rem] max-w-[21rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
						<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b'>
							Tạo menu
						</Dialog.Title>
						<div className='my-5'>
							<div className='p-5 space-y-3 overflow-y-scroll'>
								<AddMenuForm />
							</div>
						</div>
					</Dialog.Panel>
				}
			/>
		</div>
	);
}
