'use client'

import { formatPrice } from "@/ultis/formatPrice";
import { truncateText } from "@/ultis/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;
  return (
    <div onClick={() => router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm transition hover:scale-105 text-center">
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image src={data.images[0].image} fill className="w-full h-full object-contain" alt={data.name} />
        </div>
        <div className="mt-4">{ truncateText(data.name) }</div>
        <div className=""><Rating value={productRating} readOnly /></div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  )
}

export default ProductCard;