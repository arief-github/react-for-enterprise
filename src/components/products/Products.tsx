import { useLayout } from '@/hooks/useLayout';
import ProductsGrid from './components/layout/ProductsGrid';
import ProductList from './components/layout/ProductsList';
import ProductGridCard from './components/ProductsGridCard';
import ProductListCard from './components/ProductsListCard';
import products from './products.json';

type Layouts = 'grid' | 'list';

const PRODUCT_LAYOUT_COMPONENTS: Record<
  Layouts,
  typeof ProductsGrid | typeof ProductList
> = {
  grid: ProductsGrid,
  list: ProductList,
} as const;

const PRODUCT_LAYOUT_CARD_COMPONENTS: Record<
  Layouts,
  typeof ProductGridCard | typeof ProductListCard
> = {
  grid: ProductGridCard,
  list: ProductListCard,
} as const;

const Products = () => {
  const {
    layout,
    setLayout,
    LayoutComponent: ProductLayout,
  } = useLayout(PRODUCT_LAYOUT_COMPONENTS, 'grid');
  const ProductCardComponent = PRODUCT_LAYOUT_CARD_COMPONENTS[layout];

  return (
    <>
      <h1 className='text-xl font-semibold mt-8'>Products</h1>

      <div className='space-x-4 mb-8 mx-auto flex justify-center items-center mt-4'>
        <button onClick={() => setLayout('grid')}>Layout Grid</button>
        <button onClick={() => setLayout('list')}>Layout List</button>
      </div>
      <ProductLayout className='mx-auto max-w-7xl'>
        {products.map((product) => {
          return <ProductCardComponent product={product} key={product.id} />;
        })}
      </ProductLayout>
    </>
  );
};

export default Products;
