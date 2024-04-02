import React from 'react'
import { useForm } from 'react-hook-form';
import InputController from './InputController';
import SelectController from './SelectController';
import { FormProvider } from 'react-hook-form';

let renderCount=0;
const HookForm = () => {
    renderCount++;
    console.log('root form called')

    const onSubmit=(data)=>{
        console.log(data)
    }

    const onError=(err)=>{
        console.log(err)
    }
    // const {register,control,handleSubmit,formState:{errors}}=useForm({
    //     mode:'all'
    // })
    const methods=useForm({
        mode:"all"
    })

    const options=[
        {
            label:'1',value:'poor'
        },
        {
            label:'2',value:'fair'
        },
        {
            label:'3',value:'good'
        },
        {
            label:'4',value:'Very good'
        },
        {
            label:'5',value:'Excellent'
        }
    ]
  return (
    <div className='flex justify-center  '>
        <p>re-renderCount:{renderCount}</p>
        <FormProvider {...methods}>
        <form  onSubmit={methods.handleSubmit(onSubmit,onError)} className='w-[400px] mt-12  bg-white p-12 rounded-lg shadow-lg  '>
               <InputController name="email" type="email" label="Email" rules={{
                  required: "Email is required",
                  validate: (value) => {
                    const [, domain] = value.split("@");
                    const allowedDomains = [
                      "nulogic.io",
                      "nutechnologyinc.com",
                    ];
                    return (
                      allowedDomains.includes(domain) ||
                      "Email domain not allowed"
                    );
                  },
                }}/>
                
               <InputController name="age" type="number" label="age"  rules={{
                required:'Age is required',
                validate:(val)=>val>=18 || 'Minimum age of 18 years is required'
               }}/>
                <SelectController label="rating" name="rating" options={options}  rules={{
                    required:'rating is required'
                }}/>
           
            
            <button
              type="submit"
              className="w-1/2 ml-16  bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-opacity-50"
            >
              Add User
            </button>
        </form>
        </FormProvider>
    </div>
  )
}

export default HookForm