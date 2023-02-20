import { IconClose, IconEdit } from '@/assets/svg';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ItemEvent from '../itemEvent/ItemEvent';
import { useDispatch } from 'react-redux';
import { deleteNote, setDataEdit } from '@/store/slice/useSlice';
import { toast } from 'react-toastify';

export default function ModalMore({ setOpenModalMore, setOpenModalEdit, data, currentDay }) {
    const dispatch = useDispatch();
    function closeModal() {
        setOpenModalMore(false);
    }

    const handleDelete = async (item) => {
        await dispatch(deleteNote(item?.id));
        toast.success('Delete successfully');
    };

    const handleEdit = async (item) => {
        await dispatch(setDataEdit(item));
        setOpenModalEdit(true);
    };

    return (
        <>
            <Transition appear show as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="w-8 h-8 ml-auto cursor-pointer p-1" onClick={closeModal}>
                                        <IconClose />
                                    </div>
                                    <div className="flex flex-col lg:flex-row justify-between items-center gap-2 mb-4">
                                        <h3 className="text-xl lg:text-lg font-semibold leading-6 text-dark_blue">
                                            List notes
                                        </h3>
                                        <p className="text-base lg:text-sm text-gray-500">
                                            {currentDay.format('dddd, MMMM Do YYYY, h:mm a')}
                                        </p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        {data.length ? (
                                            data?.map((item, i) => (
                                                <div key={i} className="grid grid-cols-10 gap-2">
                                                    <div className="col-span-9">
                                                        <ItemEvent data={item} />
                                                    </div>
                                                    <div className="col-span-1 flex flex-col justify-center items-center space-y-3">
                                                        <div
                                                            className="w-8 h-8 text-dark_blue hover:text-light_blue"
                                                            onClick={() => handleDelete(item)}
                                                        >
                                                            <IconClose />
                                                        </div>
                                                        <div
                                                            className="w-8 h-8 text-dark_blue hover:text-light_blue"
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            <IconEdit />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h3 className="text-center text-3xl bg-primary py-7">
                                                {"You don't have any notes"}
                                            </h3>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
