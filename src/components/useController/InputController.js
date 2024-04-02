import { useController, useForm, useFormContext, useFormState, useWatch } from "react-hook-form";
const InputController=({name,label,type,rules})=>{

    console.log('Input controller called')
    const {control,watch,formState:{errors,isDirty}}=useFormContext()

    const {field,fieldState:{error},formState:{touchedFields,dirtyFields}}=useController({
        name,
        control,
        rules
    })


    // const {isDirty}=useFormState({
    //     control,
    //     name
    // })
    // const watchName=watch(name);
    const watchName=useWatch({name})
    console.log('Input Controlled called')
    console.log(watchName)

    return(
        <div className='mb-10'> 
             <label className='text-md font-medium text-gray-700'>{label}</label>
        
        <input 
        type={type}
        {...field}
        onChange={field.onChange}
        className='mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500'
        
        />
        <p>{isDirty?'modified':"unmodified"}</p>
           <p className="text-red-700">{error?.message}</p>

        </div>
    )



}


export default InputController;