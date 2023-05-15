import React, {FC} from "react";
import { IProduct } from "src/interfaces/product";
import { ProductCard } from "../productCard";

interface IComponentProps {
	products: IProduct[],
	toggleFav(product: IProduct):void,
}
  
  
  export const Posts: FC<IComponentProps> = ({products, toggleFav}) => {
		return (
			<>
			{products.slice(0).reverse().map((product: IProduct) => (
				<ProductCard key={product.title} product={product} toggleFav={toggleFav} />
			))}
			</>
		)
  }