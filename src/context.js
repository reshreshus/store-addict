import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer



const handleDetail = () => {
    console.log('hello from handle detail');
}

const addToCart = () => {
    console.log('hello from add to cart');
}

class ProductProvider extends Component {
    state = {
        products: storeProducts,
        detailProduct,
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.state.handleDetail,
                addToCart: this.state.addToCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
