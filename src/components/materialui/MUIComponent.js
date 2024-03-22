import React from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import { Autocomplete } from "@mui/material";

const MUIComponent = () => {
  const { register, handleSubmit, control } = useForm();

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log(error);
  };

  const cities = [
    'Chennai','Bangalore','Hyderabad','Pune','New Delhi'
  ];

  return (
    <div className="flex flex-col items-center">
      <form
        className="w-[400px] m-12"
        onSubmit={handleSubmit(onSuccess, onError)}
      >
        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Controller name="email" control={control} render={({field})=>{
            return(
                <OutlinedInput id="email" {...field} />

            )
          }}/>
         
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Controller name="firstName" control={control} render={({field})=>{
            return(
                <OutlinedInput id="firstName" {...field} />

            )
          }}/>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Controller name="lastName" control={control} render={({field})=>{
            return(
                <OutlinedInput id="lastName" name="lastName" {...field} />

            )
          }}/>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
        <Controller
  name="city"
  control={control}
  render={({ field }) => (
    <Autocomplete
      {...field}
      options={cities} 
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="city"  />
      )}
      onChange={field.onChange} // Capture the selected value and update the field
    />
  )}
/>


        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default MUIComponent;
