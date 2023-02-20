import React from 'react';
import { Container } from '../common';

import Sidebar from '../sidebar/Sidebar';
import BiggerCalendar from '../biggerCalendar/BiggerCalendar';

const LandingPage = () => {
    return (
        <Container>
            <div className="grid grid-cols-12 gap-8 h-[100%] mt-6 pb-12">
                <div className="w-full col-span-12 lg:col-span-4   lg:bg-white lg:border-l lg:border-t lg:border-r lg:border-solid lg:border-[#cccc]">
                    <Sidebar />
                </div>
                <div className="hidden lg:block w-full lg:col-span-8  ">
                    <BiggerCalendar />
                </div>
            </div>
        </Container>
    );
};

export default LandingPage;
