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

							<AddProductForm
								on-submit={onSubmit}
							/>
						</div>
					</Modal>
				</>
		</React.Fragment>
	)
}

/*export class Shop extends React.Component<
  {},
  { products: any[]; isOpen: boolean; isShowingMessage: boolean; message: string; numFavorites: number; prodCount: number }
> {
  constructor(props: any) {
    super(props);

    this.favClick = this.favClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { products: [], isOpen: false, isShowingMessage: false, message: '', numFavorites: 0, prodCount: 0 };

    fetch('https://fakestoreapi.com/products').then((response) => {
      let jsonResponse = response.json();

      jsonResponse.then((rawData) => {
        let data = [];

        for (let i = 0; i < rawData.length; i++) {
          let updatedProd = rawData[i];
          data.push(updatedProd);
        }
        this.setState({
          products: data,
        });
        this.setState({
          prodCount: data.length
        })
      });
    });
  }

   componentDidMount(){
      document.title = "Droppe refactor app"
   }

  favClick(title: string) {
    const prods = this.state.products;
    const idx = lodash.findIndex(prods, {title: title})
    let currentFavs = this.state.numFavorites
    let totalFavs: any;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs
    } else {
      totalFavs = ++currentFavs
      prods[idx].isFavorite = true;
    }

    this.setState(() => ({ products: prods, numFavorites: totalFavs }));
  }

  onSubmit(payload: { title: string; description: string, price: string }) {
    const updated = lodash.clone(this.state.products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price
    });

    this.setState({
      products: updated,
      prodCount: lodash.size(this.state.products) + 1
    });

    this.setState({
      isOpen: false,
    });

    this.setState({
      isShowingMessage: true,
      message: 'Adding product...'
    })

    // **this POST request doesn't actually post anything to any database**
    fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: payload.title,
                    price: payload.price,
                    description: payload.description,
                }
            )
        })
            .then(res=>res.json())
            .then(json => {
               (function (t) {
                 setTimeout(()=>{
                    t.setState({
                       isShowingMessage: false,
                       message: ''
                    })
                 }, 2000)
              })(this);
            })
  }

  render() {
    const { products, isOpen } = this.state;
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
               <Button
                  onClick={function (this: any) {
                     this.setState({
                        isOpen: true,
                     });
                  }.bind(this)}
               >Send product proposal</Button>
            </span>
             {this.state.isShowingMessage && <div className={styles.messageContainer}>
                <i>{this.state.message}</i>
             </div>}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {this.state.prodCount}</span>
            {' - '}
            <span>Number of favorites: {this.state.numFavorites}</span>
          </div>

          {products && !!products.length ? <ProductList products={products} onFav={this.favClick} /> : <div></div>}
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
                    onClick={function (this: any) {
                       this.setState({
                          isOpen: false,
                       });
                    }.bind(this)}
                 ><FaTimes /></div>

                 <Form
                    on-submit={this.onSubmit}
                 />
              </div>
           </Modal>
        </>
      </React.Fragment>
    );
  }
}*/
