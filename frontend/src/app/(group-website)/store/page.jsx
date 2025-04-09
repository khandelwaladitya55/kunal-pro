import React from 'react';
import ProductCard from '@/components/website/ProductCard';
import { getProductData } from "@/library/api-call";

export default async function page({ searchParams: rawSearchParams }) {
  const searchParams = await rawSearchParams;
  const productJson = await getProductData(
    null,
    true,
    null,
    searchParams.sortByName ?? null,
    searchParams.sortByPrice ?? null,
    searchParams.sortByLimit ?? null,
    searchParams.color ?? null,
    searchParams?.min ?? null,
    searchParams?.max ?? null
  );
  const products = productJson.products;

  // const filteredProducts = products.filter((prod) =>
  //   prod.name.toLowerCase().includes((searchParams.search ?? "").toLowerCase())
  // );

  // console.log('Filtered Products:', filteredProducts);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 bg-slate-100 p-4">
      {products.length != 0 && products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}
