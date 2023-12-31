'use client'

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomerCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomerCheckBox: React.FC<CustomerCheckBoxProps> = ({ id, label, disabled, register }) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input 
        autoComplete="off" 
        placeholder=""
        id={id} 
        disabled={disabled} 
        {...register(id)}  
        type="checkbox"
        className="cursor-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
    </div>
  )
}

export default CustomerCheckBox;