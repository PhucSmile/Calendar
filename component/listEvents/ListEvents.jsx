import React, { useEffect, useState } from 'react';
import ItemEvent from '../itemEvent/ItemEvent';
import { useSelector } from 'react-redux';
import { getListNote } from '@/store/slice/useSlice';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const ModalMore = dynamic(() => import('../modal/ModalMore').then((module) => module), {
    ssr: false,
});
const Modal = dynamic(() => import('../modal/Modal').then((module) => module), {
    ssr: false,
});

const ListEvents = () => {
    const today = dayjs().date();
    const month = dayjs(new Date(dayjs().year(), dayjs().month())).format('MMMM');

    const listNote = useSelector(getListNote);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    useEffect(() => {
        if (listNote?.length > 0) {
            setData(listNote);
        } else {
            setData([]);
        }
    }, [listNote]);

    return (
        <>
            <div className="px-4 py-5 h-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl lg:text-[32px] text-dark_blue font-bold">Upcoming Events</h2>
                    <button className="btn-primary rounded-3xl" onClick={() => setOpenModal(true)}>
                        View All
                    </button>
                </div>
                <h4 className="font-semibold text-lg lg:text-2xl mt-2 mb-6">
                    Today, {today}, {month}
                </h4>
                <div className="flex flex-col space-y-2">
                    {data.length ? (
                        data.slice(0, 6)?.map((item, i) => <ItemEvent key={i} data={item} disable />)
                    ) : (
                        <div className="h-[180px]">
                            <h3 className=" text-center rounded-2xl text-2xl lg:text-3xl bg-primary py-7">
                                {"You don't have any notes"}
                            </h3>
                        </div>
                    )}
                </div>
            </div>

            {openModal && (
                <ModalMore
                    data={data}
                    currentDay={dayjs(new Date(dayjs().year(), dayjs().month()))}
                    setOpenModalMore={setOpenModal}
                    setOpenModalEdit={setOpenModalEdit}
                />
            )}
            {openModalEdit && (
                <Modal
                    setOpenModal={setOpenModalEdit}
                    currentDay={dayjs(new Date(dayjs().year(), dayjs().month()))}
                    title="Edit note"
                    isEdit
                />
            )}
        </>
    );
};

export default ListEvents;
