
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { products } from "@/ultis/products";
import ListRating from "./ListRating";

interface IPrams {
  productId?: string;
}

const Product = ({ params }: { params: IPrams }) => {
  console.log(params)
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product = {products[1]} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={products[1]} />
        </div>
      </Container>
    </div>
  )
}

export default Product;