import clsx from 'clsx';
import styles from './productsLayout.module.css';
import React from 'react';

type ProductsListProps = {
  children: React.ReactNode;
  className?: string;
};

const ProductList = (props: ProductsListProps) => {
  const { children, className, ...productsListProps } = props;

  return (
    <div
      {...productsListProps}
      className={clsx(styles.productsListLayout, className)}
    >
      {children}
    </div>
  );
};

export default ProductList;
