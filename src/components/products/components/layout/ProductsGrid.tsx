import clsx from 'clsx';
import styles from './productsLayout.module.css';
import React from 'react';

type ProductsGridProps = {
  children: React.ReactNode;
  className?: string;
};

const ProductsGrid = (props: ProductsGridProps) => {
  const { children, className, ...productsGridProps } = props;

  return (
    <div
      {...productsGridProps}
      className={clsx(styles.productsGridLayout, className)}
    >
      {children}
    </div>
  );
};

export default ProductsGrid;
