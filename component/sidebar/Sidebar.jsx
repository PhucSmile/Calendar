import React from 'react';
import SmallCalendar from '../smallCalendar/SmallCalendar';
import ListEvents from '../listEvents/ListEvents';

const Sidebar = () => {
    return (
        <aside>
            <SmallCalendar />
            <ListEvents />
        </aside>
    );
};

export default Sidebar;
