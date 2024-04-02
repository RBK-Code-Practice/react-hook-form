import React from 'react'
import { useController } from 'react-hook-form';
import Select from "react-select";
import { useFormContext } from 'react-hook-form';
const SelectController = ({ options, name,label,rules }) => {
    const {control}=useFormContext()

    const { field, fieldState: { invalid, isDirty,error }, formState: { touchedFields, dirtyFields } } = useController({
        name,
        control,
        rules
    })
    console.log(field)
    return (
        <div className='mb-10'>
            <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
            >
                {label}

            </label>
            <select
                {...field}
                className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    )
                })}
            </select>
            <Select className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500" options={options} {...field} value={options.find(option => option.value === field.value)}  onChange={(selectedValue)=>field.onChange(selectedValue.value)}/>
            <p className="text-red-700">{error?.message}</p>

        </div>
    )
}

export default SelectController