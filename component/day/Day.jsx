import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { clickMonthSmall, clickSelectDaySmall, getListNote } from '@/store/slice/useSlice';
import { ActiveDay, CurrentDay } from '../utill';

import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('../modal/Modal').then((module) => module), {
    ssr: false,
});
const ModalMore = dynamic(() => import('../modal/ModalMore').then((module) => module), {
    ssr: false,
});

const Day = ({ currentDay, isSmall = false, MonthIndex }) => {
    const dispatch = useDispatch();
    const getActiveNotes = useSelector(getListNote);
    const [activeNote, setActiveNote] = useState([]);
    const [activeBg, setActiveBg] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalMore, setOpenModalMore] = useState(false);

    useEffect(() => {
        if (getActiveNotes.length > 0) {
            const activeBackground = getActiveNotes.filter((note) => note.time === currentDay.format('DD-MM-YY'));
            // console.log('activeBackground', activeBackground);
            if (activeBackground?.length) {
                setActiveBg(true);
                setActiveNote(activeBackground);
            } else {
                setActiveBg(false);
                setActiveNote([]);
            }
        } else {
            setActiveNote([]);
        }
    }, [getActiveNotes, currentDay]);

    const handleClick = async () => {
        if (isSmall) {
            // click on month small -> then get index month
            await dispatch(clickMonthSmall(MonthIndex));
            console.log('small get day', currentDay.format('DD-MM-YY'));
            // get day calendar small to active  calendar big
            await dispatch(clickSelectDaySmall(currentDay.format('DD-MM-YY')));
        } else {
            // click on month big -> then open modal input
            console.log('even big calendar', currentDay.format('DD-MM'));
            await dispatch(clickSelectDaySmall(currentDay.format('DD-MM-YY')));
            setOpenModal(true);
        }
    };

    const handleClickMobile = async () => {
        if (isSmall) {
            await dispatch(clickMonthSmall(MonthIndex));
            await dispatch(clickSelectDaySmall(currentDay.format('DD-MM-YY')));
            setOpenModal(true);
        }
    };

    return (
        <div
            className={`${ActiveDay({ currentDay })} ${activeBg && 'bg-light_orange'} flex flex-col   ${
                !isSmall
                    ? 'h-[120px] md:h-[140px] border border-gray-300 lg:border-gray-200 rounded-none mt-0'
                    : 'mt-4 rounded-full'
            } `}
        >
            {/* click Calendar mobile or PC */}
            {/* pc calendar*/}
            {!isSmall && (
                <p
                    onClick={handleClick}
                    className={`${
                        !isSmall ? 'mt-4' : 'mt-0'
                    }  mx-auto text-lg text-center w-[30px] h-[30px] cursor-pointer leading-[30px]  mb-1 hover:font-bold  ${CurrentDay(
                        {
                            currentDay,
                        },
                    )}`}
                >
                    {currentDay.format('DD')}
                </p>
            )}

            {/* mobile calendar */}
            {isSmall && (
                <>
                    {/* mobile */}
                    <p
                        onClick={handleClickMobile}
                        className={`${
                            !isSmall ? 'mt-4' : 'mt-0'
                        } block lg:hidden mx-auto text-lg text-center w-[30px] h-[30px] cursor-pointer leading-[30px]  mb-1 hover:font-bold  ${CurrentDay(
                            {
                                currentDay,
                            },
                        )}`}
                    >
                        {currentDay.format('DD')}
                    </p>

                    {/* pc */}
                    <p
                        onClick={handleClick}
                        className={`${
                            !isSmall ? 'mt-4' : 'mt-0'
                        } hidden lg:block mx-auto text-lg text-center w-[30px] h-[30px] cursor-pointer leading-[30px]  mb-1 hover:font-bold  ${CurrentDay(
                            {
                                currentDay,
                            },
                        )}`}
                    >
                        {currentDay.format('DD')}
                    </p>
                </>
            )}

            {!isSmall && (
                <>
                    {activeNote.length > 0 &&
                        activeNote.slice(0, 2).map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setOpenModalMore(true)}
                                className={`limit__text shadow tags__section text-xs md:text-sm  bg-${item.color} ${
                                    item.color === 'dark_blue'
                                        ? 'text-white after:bg-light_orange'
                                        : item?.color === 'light_orange'
                                        ? 'after:bg-light_blue text-dark_blue'
                                        : 'text-dark_blue after:bg-dark_blue'
                                } `}
                            >
                                {item.title}
                            </div>
                        ))}

                    {activeNote.length > 0 && (
                        <span
                            onClick={() => setOpenModalMore(true)}
                            className="text-dark_blue pl-1 font-medium cursor-pointer mt-auto text-xs md:text-sm"
                        >
                            {activeNote.length} more
                        </span>
                    )}
                </>
            )}
            {openModal && <Modal setOpenModal={setOpenModal} currentDay={currentDay} />}
            {openModalMore && (
                <ModalMore
                    data={activeNote}
                    currentDay={currentDay}
                    setOpenModalMore={setOpenModalMore}
                    setOpenModalEdit={setOpenModalEdit}
                />
            )}
            {openModalEdit && (
                <Modal setOpenModal={setOpenModalEdit} currentDay={currentDay} title="Edit note" isEdit />
            )}
        </div>
    );
};

export default Day;
