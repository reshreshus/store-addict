import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
    }

    componentDidMount() {
        this.setProducts();
    }


    setProducts = () => {
        //copy each item
        let products = [];
        storeProducts.forEach(item => {
            products = [...products, {...item}]
        })
        this.setState(() => {
            return {products}
        })
    }



    handleDetail = () => {
        console.log('hello from handle detail');
    };
    
    addToCart = (id) => {
        console.log(`hello from add to cart. id: ${id}`);
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
