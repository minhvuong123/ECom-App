'use client'

import { useState } from "react";
import Input from "../components/input/Input";
import Heading from "../components/products/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data)
  }

  return (
    <>
      <Heading title="Sign up for Ecom-Shop" />
      <Button outline label="Sign up with Google" icon={AiOutlineGoogle} onClick={() => {}} />
      <hr className="bg-slate-300 w-full h-px" />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
      <Button label={isLoading ? 'Loading' : 'Sign up'} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm">Already have an account ? <Link className="underline" href="/login">Log in</Link></p>
    </>
  )
}

export default RegisterForm;