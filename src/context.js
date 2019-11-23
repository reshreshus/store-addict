import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
        cart: []
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

    getItem = id => {
        return this.state.products.find(item => item.id === id);
    }

    handleDetail = (id) => {
         const product = this.getItem(id);
         this.setState(()=>{
             return {detailProduct: product}
         });

    };
    
    addToCart = (id) => {
        console.log(`hello from add to cart. id: ${id}`);

        let tempProducts = [...this.state.products];

        // went with thing indexOf in order for the product to remain in the same place
        const index = tempProducts.indexOf(this.getItem(id));

        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;

        this.setState(() => {
            return {products: tempProducts, cart: [...this.state.cart, product]}
        }, ()=> console.log(this.state));
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
