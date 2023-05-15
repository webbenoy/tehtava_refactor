import React, {FC} from "react";
import { FaStar } from "react-icons/fa";
import { IProduct } from "src/interfaces/product";
import styles from './productCard.module.css';

interface IComponentProps {
  product: IProduct,
  toggleFav(product: IProduct): void,
}

export const ProductCard: FC<IComponentProps> = ({ product, toggleFav }) => {
    const toggleFavorite = () => {
        toggleFav(product);
    }
    
    // Problem: Now product title can be too long, I just put overflowX as fix now
    return (
      <span className={styles.productClass} style={{display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both'}}>
        <span className={styles['product-title']} style={{overflowX: 'hidden'}}>{product.title}</span>
  
        <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>
  
        <p><b>Price: ${+product.price}</b></p>
  
        <p className={styles.productBody}>
          <span><b>Description:</b></span>
          <br/>
          {product.description}
       </p>
  
        <span className={styles['action_bar']} style={{display: 'table', width: "100%"}}>
          <button
            className={`${styles.actionBarItem} ${
              product.isFav ? "active" : ""
            }`}
            onClick={toggleFavorite}
          >
            <FaStar /> <span className={styles.actionBarItemLabel}>{!!(!!(product.isFav)) ? 'Remove from favorites' : 'Add to favorites'}</span>
          </button>
        </span>
      </span>
    );
  };