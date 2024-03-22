import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Select from "react-select";

let renderCount = 0;
const FormRHF = () => {
  renderCount++;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      name: "",
      address: "",
      country: "",
      state: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "contacts",
    control,
    rules: {
      required: "Please add atleast one Contact number",
    },
  });

  const countryOptions = [
    {
      label: "USA",
      value: "USA",
    },
    {
      label: "Canada",
      value: "Canada",
    },
  ];
  const selectedCountry = useWatch({control,name:'country'})

  const stateOptions = {
    USA: ["New York", "California", "Texas"],
    Canada: ["Ontario", "Quebec", "British Columbia"],
    UK: ["England", "Scotland", "Wales"],
  };
  //   let subscription;
  //   useEffect(()=>{
  //     subscription=watch((data)=>data)

  //     return ()=>subscription.unsubscribe()
  //   },[watch])
  // console.log('subscription',subscription);
  const onSubmit = (data) => {
    console.log(data);
    reset()
   
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <>
      <div>
        <div className="flex flex-col items-center">
          <p className="mr-12">rendercount :{renderCount}</p>
          <h1 className="text-center text-3xl font-semibold mb-8">
            User Details
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                {...register("email", {
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
                })}
                className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
              <p className="text-red-700">{errors?.email?.message}</p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                {...register("name", {
                  validate: {
                    Capital: (value) =>
                      value.charAt(0) === value.charAt(0).toUpperCase() ||
                      "First letter should be capital",
                    NoSpaces: (value) =>
                      !value.includes(" ") ||
                      "Name cannot contain spaces between letters",
                    spaceCheck: (value) =>
                      value.length > 7 || "Minimum 8 characters",
                  },
                })}
                className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
              <p className="text-red-700">{errors?.name?.message}</p>
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                {...register("address", {
                  required: "address field is mandatory",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters long",
                  },
                })}
                className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your address"
                rows="3"
              ></textarea>
              <p className="text-red-700">{errors?.address?.message}</p>
            </div>
            <div className="mb-6">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                {...register("country", {
                  disabled: watch("address") === "",
                  required: "address field is mandatory",
                })}
                className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
              </select>
              {/* <Select {...register('country')} onChange={(e,value)=>console.log(e)} options={countryOptions} defaultValue={'select a country'}/>  */}
 
           <Controller name="country" control={control} render={({field})=>{
            return (
                <Select {...field} options={countryOptions} onChange={(selected)=>field.onChange(selected.value)}/>
            )
          }}/>  
            </div>
            <div className="mb-6">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State/Province
              </label>
              <select
                {...register("state")}
                className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select State/Province</option>
                {stateOptions[selectedCountry]?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">

              {fields.map((field, index) => {
                return (
                  <div>
                    <label
                      htmlFor="contactno"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact {index + 1}
                    </label>
                    <input
                      type="number"
                      key={field.id}
                      {...register(`contacts.${index}.contactNo`, {
                        required: "Contact no is required",
                        valueAsNumber: true,
                        maxLength: {
                          value: 10,
                          message: "Invalid mobile number",
                        },
                      })}
                      className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your contact number"
                    />

                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded mb-4 mt-4"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  append({ contactNo: "" });
                }}
              >
                Add Contacts
              </button>
              <p className="text-red-700">{errors?.contacts?.message}</p>
            </div>

            <button
              type="submit"
            //   disabled={!isValid}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
            >
              Add User
            </button>
          </form>
        </div>
      </div>
      <DevTool control={control} />
    </>
  );
};

export default FormRHF;
