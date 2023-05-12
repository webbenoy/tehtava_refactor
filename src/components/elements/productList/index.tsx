import React from "react";
import lodash from 'lodash'
import { ProductCard } from "../productCard";

interface IPostsProps {
    products: any;
    onFav: (title: string) => void;
  }
  
  
  export default class Posts extends React.Component<IPostsProps, {}> {
    constructor(props: any) { super(props) }
    render(){
      let productsarr = []
        for (const [i, p] of this.props.products.entries()) {
          productsarr.push(
            <ProductCard key={i} index={i} product={p} onFav={this.props.onFav} />
          );
      }
      return <div>{lodash.reverse(productsarr)}</div>
    }
  }