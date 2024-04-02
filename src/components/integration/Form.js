import React from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
let renderCount=0;
const Form = () => {
    renderCount++;
    const schema=yup.object().shape({
        email:yup.string().email().required('email is required'),
        name:yup.string().required('name is required'),
        age:yup.number().positive().typeError('Age must be an integer').integer().min(18,"Age should be greather than or equal 18").required('this is required field')

    })

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

   

    const onSubmit=(data)=>{
        console.log(data)

    }

    const onError=(err)=>{
        console.log(err)
    }
  return (
    <div className='flex justify-center  '>
        <form  onSubmit={handleSubmit(onSubmit,onError)} className='w-[400px] mt-12  bg-white p-12 rounded-lg shadow-lg  '>
        <p className="mb-12">re-rendercount :{renderCount}</p>
            <div className='mb-10'>
                <label className='text-md font-medium text-gray-700'>Email</label>
                <input type="email" {...register('email')} className='mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500' />
                <p className="text-red-700">{errors?.email?.message}</p>
            </div>
            <div className='mb-10'>
                <label className='text-md font-medium text-gray-700'>Name</label>
                <input type="text" {...register('name')} className='mt-1 p-2 w-full border rounded-md ring-blue-500 focus:border-blue-500' />
                <p className="text-red-700">{errors?.name?.message}</p>
            </div>
            <div className='mb-10'>
                <label className='text-md font-medium text-gray-700'>Age</label>
                <input type="number" {...register('age',{
                    defaultValue:0,
                    valueAsNumber:true

                })} className='mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500' />
                <p className="text-red-700">{errors?.age?.message}</p>
            </div>
            <button
              type="submit"
              className="w-1/2 ml-16  bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-opacity-50"
            >
              Add User
            </button>
        </form>
    </div>
  )
}

export default Form