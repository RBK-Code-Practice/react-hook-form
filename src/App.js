
import './App.css';
import { useState } from 'react';
import HookForm from './components/useController/HookForm';
import FormRHF from "./components/FormRHF";
import NormalForm from "./components/NormalForm";
import MUIComponent from "./components/Controller/MUIComponent";
import Form from "./components/integration/Form"

function App() {
  return (
    <div >
    
      {/* <NormalForm/> */}
      {/* <MUIComponent/> */}
      {/* <Form /> */}
      {/* <HookForm/> */}
      <FormRHF/>
    

    </div>
  )

}
  
export default App;
