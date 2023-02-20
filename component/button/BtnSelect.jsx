import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { IconBottom } from '@/assets/svg';
import { useDispatch } from 'react-redux';
import { selectMonth } from '@/store/slice/useSlice';

const listMonth = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 },
];

export default function BtnSelect() {
    const [selected, setSelected] = useState(listMonth[0]);
    const dispatch = useDispatch();
    const handleChange = async (e) => {
        setSelected(e);
        await dispatch(selectMonth(e.value));
    };

    return (
        <Listbox value={selected} onChange={(e) => handleChange(e)}>
            <div className="relative mt-1 ">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-light_blue text-white font-medium py-[11px] pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-light_blue sm:text-sm">
                    <span className="block truncate text-sm">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-4">
                        <IconBottom className="h-5 w-5 " aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {listMonth.map((person, personIdx) => (
                            <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative select-none py-2 px-2 cursor-pointer ${
                                        active ? 'bg-light_blue text-white' : 'text-gray-900'
                                    }`
                                }
                                value={person}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {person.name}
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}
