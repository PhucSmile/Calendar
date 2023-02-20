import { IconCamera } from '@/assets/svg';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
const ModalMore = dynamic(() => import('../modal/ModalMore').then((module) => module), {
    ssr: false,
});
const Modal = dynamic(() => import('../modal/Modal').then((module) => module), {
    ssr: false,
});

const listColor = [
    {
        bg: 'light_orange',
    },

    {
        bg: 'dark_blue',
    },
    {
        bg: 'light_orange',
    },
];

const ItemEvent = ({ data, disable = false }) => {
    const { data: session } = useSession();

    const convertArray = [data];
    const [color, setColor] = useState();
    const [openModalItem, setOpenModalItem] = useState(false);
    const [openModalItemEdit, setOpenModalItemEdit] = useState(false);
    useEffect(() => {
        const isCheckColor = listColor.find((item) => item.bg === data.color);
        setColor(isCheckColor);
    }, [data]);

    return (
        <>
            <div
                className={` ${
                    color?.bg === 'dark_blue'
                        ? 'after:bg-light_orange bg-dark_blue'
                        : color?.bg === 'light_orange'
                        ? 'after:bg-light_blue bg-light_orange'
                        : 'after:bg-dark_blue bg-dark_orange'
                } tags__section rounded-2xl py-4 pl-8 pr-2 mb-0 cursor-default after:w-[10px] after:rounded-tl-2xl after:rounded-bl-2xl shadow-2xl `}
            >
                <div className={`flex  justify-between  mt-4`}>
                    <div className="flex flex-col space-y-2 w-[80%]">
                        <h5
                            onClick={() => setOpenModalItem(true)}
                            className={`text-lg md:text-xl ${
                                color?.bg === 'dark_blue' ? 'text-white' : 'text-dark_blue'
                            } font-semibold cursor-pointer`}
                        >
                            {data?.title}
                        </h5>
                        <span className="text-text text-sm md:text-base font-medium ">{data?.formatDate}</span>
                        <div className="flex items-center space-x-2">
                            <Image
                                src={session?.user?.image || '/images/NoUser.png'}
                                alt="Img-user"
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                            <p className="cursor-pointer text-sm md:text-base underline text-light_blue">
                                View Client Profile
                            </p>
                        </div>
                    </div>
                    <span
                        onClick={() => setOpenModalItem(true)}
                        className={`block ${
                            color?.bg === 'dark_blue' ? 'bg-light_orange' : 'bg-dark_blue'
                        } rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] p-2 text-white cursor-pointer`}
                    >
                        <IconCamera />
                    </span>
                </div>
            </div>
            {openModalItem && disable && (
                <ModalMore
                    data={convertArray}
                    currentDay={dayjs(new Date(dayjs().year(), dayjs().month()))}
                    setOpenModalMore={setOpenModalItem}
                    setOpenModalEdit={setOpenModalItemEdit}
                />
            )}
            {openModalItemEdit && disable && (
                <Modal
                    setOpenModal={setOpenModalItemEdit}
                    currentDay={dayjs(new Date(dayjs().year(), dayjs().month()))}
                    title="Edit note"
                    isEdit
                />
            )}
        </>
    );
};

export default ItemEvent;
