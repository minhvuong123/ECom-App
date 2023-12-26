'use client'

import { useState } from "react";
import Input from "../components/input/Input";
import Heading from "../components/products/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
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
      <Heading title="Sign in to Ecom-Shop" />
      <Button outline label="Continue with Google" icon={AiOutlineGoogle} onClick={() => {}} />
      <hr className="bg-slate-300 w-full h-px" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
      <Button label={isLoading ? 'Loading' : 'Login'} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm">Do not have an account ? <Link className="underline" href="/register">Sign up</Link></p>
    </>
  )
}

export default LoginForm;