'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import Heading from "@/app/components/products/Heading";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


interface AddRatingProps {
  product: Product & { reviews: Review[] };
  user: (SafeUser & { orders: Order[] }) | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {register, handleSubmit, setValue, reset, formState: { errors }} = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0,
    }
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error('No rating selected')
    }

    const ratingData = {...data, userId: user?.id, product: product};

    axios.post('/api/rating', ratingData).then(() => {
      toast.success('Rating submitted')
      router.refresh();

      reset();
    }).catch((error) => {
      setIsLoading(false);
    })
  }

  if (!user || !product) {
    return null;
  } 

  const deliveredOrder = user.orders.some(order => {
    return order.products.find(item => item.id === product.id) && order.deliveryStatus === 'delivered';
  })

  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user.id
  })

  if (!userReview || !deliveredOrder) {
    return null;
  } 

  return (
    <div className="flex flex-col items-start gap-2 max-w-[500px]">
      <Heading title="Rate this product"  />
      <Rating onChange={(event, newValue) => {
        setCustomValue('rating', newValue);
      }} />
      <Input id='comment' label='Comment' disabled={isLoading} register={register} errors={errors} required />
      <Button label={isLoading ? 'Loading' : 'Rate Product'} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

export default AddRating;