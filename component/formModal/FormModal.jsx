import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconCheck } from '@/assets/svg';
import Input from '../input/Input';

const schema = Yup.object().shape({
    note: Yup.string().required('Please enter your description'),
});

const FormModal = ({ listColor, dataEdit, color, setColor, error, onSubmit = () => {} }) => {
    useEffect(() => {
        if (dataEdit !== null) {
            setValue('note', dataEdit.title);
            setColor(dataEdit.color);
        }
    }, [dataEdit]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder={'Add a note'}
                type="text"
                name="note"
                register={register}
                isErr={errors?.note}
                notication={errors?.note?.message}
            />
            <div className="flex space-x-4 bg-[#f3f4fa66] py-[10px] px-2">
                {listColor.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => setColor(item)}
                        className={`w-8 h-8 flex shadow-checkbox items-center justify-center cursor-pointer bg-${item} rounded-full`}
                    >
                        {item === color && <IconCheck className="text-gray-600" />}
                    </span>
                ))}
            </div>
            {error.length > 0 && <p className="p-1 text-red-600">{error}</p>}
            <div className="mt-4">
                <button type="submit" className="btn-primary">
                    Save
                </button>
            </div>
        </form>
    );
};

export default FormModal;
