'use client'

import { useEffect, useState } from "react";
import Input from "../components/input/Input";
import Heading from "../components/products/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginProps {
  currentUser: SafeUser
}

const LoginForm:React.FC<LoginProps> = ({ currentUser }) => {
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

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/cart')
      router.refresh();
    }
  }, [currentUser, router])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push('/cart')
        router.refresh()
        toast.success('Logged in')
      }

      if (callback?.error) {
        toast.success(callback.error)
      }
    })
  }

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>
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