import { IconArrowLeft, IconArrowRight, IconCalendar } from '@/assets/svg';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

const SmallNavCalendar = ({ navSmallCurrentMonth, setNavSmallCurrentMonth }) => {
    // if event next and prev trigger => then current smallCurrentMonth change
    const handlePrevMonth = () => {
        setNavSmallCurrentMonth((prev) => prev - 1);
    };
    const handleNextMonth = () => {
        setNavSmallCurrentMonth((prev) => prev + 1);
    };
    return (
        <>
            <Link href={'/big-calendar'} className="flex lg:hidden ml-auto mb-4">
                <div className="flex items-center space-x-1  pr-2 text-dark_blue font-semibold cursor-pointer">
                    <span>
                        <IconArrowRight className="w-8 h-8 " />
                    </span>
                    <span>
                        <IconCalendar className="w-10 h-10 " />
                    </span>
                </div>
            </Link>
            <div className="flex items-center space-x-5">
                <button className="h-6 w-6 text-dark_blue font-bold" onClick={handlePrevMonth}>
                    <IconArrowLeft />
                </button>

                <span className="text-xl font-semibold text-dark_blue text-center min-w-[140px]">
                    {dayjs(new Date(dayjs().year(), navSmallCurrentMonth)).format('MMMM YYYY')}
                </span>
                <button className="h-6 w-6 text-dark_blue font-bold" onClick={handleNextMonth}>
                    <IconArrowRight />
                </button>
            </div>
        </>
    );
};

export default SmallNavCalendar;
