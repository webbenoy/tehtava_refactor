import React, {FC, useEffect, useState} from "react";
import {IProduct} from "src/interfaces/product";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "../components/base/button";
import { Posts } from "src/components/elements/productList";
import { AddProductForm } from "../components/elements/addProductForm";
import img1 from "../images/img1.webp";
import img2 from "../images/img2.webp";
import styles from "./shop.module.css";

export const Shop: FC = () => {
	const [products, setProducts] = useState<IProduct[]>([]),
	[favProducts, setFavProducts] = useState<number>(0),
	[isOpen, setIsOpen] = useState<boolean>(false),
	[showMessage, setShowMessage] = useState<boolean>(false);

	const addProductMessage = 'Adding product...';

	useEffect(() => {
		const fetchProducts = async () => {
			const request = await fetch('https://fakestoreapi.com/products');
			const data: IProduct[] = await request.json();
			setProducts(data);
		}
		fetchProducts()
	}, []);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const onSubmit = async (payload: { title: string; description: string, price: string }) => {
		/**this POST request doesn't actually post anything to any database**/
		/** 
		 * If this is intended for simulating sending the product to the API I will leave it here
		 * but I want to note that I could have removed it and improved the speed by 2 sec...
		 */
		const request = await fetch('https://fakestoreapi.com/products', {
			method:"POST",
			body:JSON.stringify({
				title: payload.title,
				price: payload.price,
				description: payload.description,
			})
		});
		
		const data = await request.json();
		setTimeout(() => {
        // I'm loggigng the data here just to use the variable.
			console.log(data);
			setShowMessage(false);
		}, 2000);


		const updated: Array<IProduct> = lodash.clone(products);
		updated.push({
		  title: payload.title,
		  description: payload.description,
		  price: parseFloat(payload.price),
		  isFav: false,
		});
	
		setProducts(updated);
		setIsOpen(false);
	}

	const toggleFavProduct = (product: IProduct) => {
		const copiedProducts: IProduct[] = products;
		const productUpdate: number = copiedProducts.findIndex((p: IProduct) => p.title === product.title);
		if (productUpdate) {
			copiedProducts[productUpdate].isFav = !copiedProducts[productUpdate].isFav;
		}

		setProducts(copiedProducts);
		setFavProducts(products.filter((p: IProduct) => p.isFav).length);
	}

	return (
		<React.Fragment>
			<>
				<span
					className={['container', styles.main].join(' ')}
					style={{margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly'}}
				>
					<img src={img1} style={{maxHeight: "15em", display: 'block'}} />
					<img src={img2} style={{maxHeight: "15rem", display: 'block'}} />
				</span>
			</>
			<div className={['container', styles.main].join(' ')} style={{paddingTop: 0}}>
				<div className={styles.buttonWrapper}>
					<span role="button">
						<Button onClick={toggleOpen}>Send product proposal</Button>
					</span>
					{showMessage && <div className={styles.messageContainer}>
						<i>{addProductMessage}</i>
					</div>}
				</div>
				<div className={styles.statsContainer}>
					<span>Total products: {products.length}</span>
					{' - '}
					<span>Number of favorites: {favProducts}</span>
				</div>
				{products && !!products.length ? <Posts products={products} toggleFav={toggleFavProduct} /> : <div></div>}
			</div>
			<>
				<Modal
					isOpen={isOpen}
					className={styles.reactModalContent}
					overlayClassName={styles.reactModalOverlay}
				>
					<div className={styles.modalContentHelper}>
						<div
							className={styles.modalClose}
							onClick={toggleOpen}
						>
							<FaTimes />
						</div>
						<AddProductForm onSubmit={onSubmit}/>
					</div>
				</Modal>
			</>
		</React.Fragment>
	)
}