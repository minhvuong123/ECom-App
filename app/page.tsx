import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NullData title="Oops! No products found. Click 'All' to clear filters" />
  }

  // Fisher-Yates shuffe algorithm
  function shuffeArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }

    return array;
  }

  const shuffedProducts = shuffeArray(products)

  return (
    <div className="mt-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffedProducts.map((product: any) => {
            return (<ProductCard key={product.id} data={product} />)
          })}
        </div>
      </Container>
    </div>
  );
}
