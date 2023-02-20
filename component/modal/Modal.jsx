import { IconClose } from '@/assets/svg';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import FormModal from '../formModal/FormModal';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, getDataEdit, getListNote, updateNote } from '@/store/slice/useSlice';
import { toast } from 'react-toastify';
const listColor = ['dark_orange', 'dark_blue', 'light_orange'];
export default function Modal({ setOpenModal, currentDay, title = 'Note', isEdit = false }) {
    const dispatch = useDispatch();
    const dataEdit = useSelector(getDataEdit);
    const getListNotes = useSelector(getListNote);
    const [color, setColor] = useState(listColor[0]);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    function closeModal() {
        setOpenModal(false);
    }

    // get dataListNote check repeat
    useEffect(() => {
        if (getListNotes?.length > 0) {
            setData(getListNotes);
        } else {
            setData([]);
        }
    }, [getListNotes]);

    const onSubmit = async (values) => {
        const repeat = data.find((item) => item.title === values.note);

        if (!repeat) {
            if (!isEdit) {
                // add
                await dispatch(
                    addNote({
                        title: values.note,
                        color: color,
                        time: currentDay.format('DD-MM-YY'),
                        formatDate: currentDay.format('dddd, MMMM Do YYYY, h:mm a'),
                    }),
                );

                setOpenModal(false);
                setError('');
                toast.success('Save Note successfully');
            } else {
                // edit
                await dispatch(
                    updateNote({
                        id: dataEdit.id,
                        title: values.note,
                        color: color,
                        time: currentDay.format('DD-MM-YY'),
                        formatDate: currentDay.format('dddd, MMMM Do YYYY, h:mm a'),
                    }),
                );
                toast.success('Edit Note successfully');
                setOpenModal(false);
                setError('');
            }
        } else {
            setError('Duplicate content. please enter new content');
            toast.error('Duplicate content. please enter new content');
        }
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="w-8 h-8 ml-auto cursor-pointer p-1" onClick={closeModal}>
                                        <IconClose />
                                    </div>
                                    <div className="flex flex-col lg:flex-row justify-between items-center gap-2 mb-4">
                                        <h3 className="text-lg font-semibold leading-6 text-dark_blue">{title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {currentDay.format('dddd, MMMM Do YYYY, h:mm a')}
                                        </p>
                                    </div>
                                    <FormModal
                                        onSubmit={onSubmit}
                                        listColor={listColor}
                                        dataEdit={dataEdit}
                                        color={color}
                                        setColor={setColor}
                                        error={error}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
