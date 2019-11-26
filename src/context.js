import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
        cart: [],
        modelOpen: false,
        modelProduct: detailProduct,

        cartSubTotal: 0,
        cartTax: 0,
        cartTotal:  0
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

    increment = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        console.log(product.count, product.price);
        product.count += 1;
        product.total = product.count * product.price;
        
        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        }, () => {
            console.log(this.state.cart);
            this.addTotals();
        });
    }

    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count -= 1;
        if (product.count < 0) {
            this.removeItemFromCart(id);
            return;
        } else {
            product.total = product.count * product.price;
        }
        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        }, () => {
            this.addTotals();
        });
    }

    removeItemFromCart = id => {
        console.log('removeItemFromCart');
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        const removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        },
        this.addTotals());

    }

    clearCart = () => {
        this.setState(()=>{
            return {
                cart: []
            }
        },
        ()=>{
            this.setProducts();
            this.addTotals();
        })
        console.log("cart was cleared"); 
    }

    addTotals = () => {
        let cartSubTotal = 0;
        this.state.cart.map(item => cartSubTotal += item.total);
        const tempTax = cartSubTotal * 0.1;
        const cartTax = parseFloat(tempTax.toFixed(2))
        const cartTotal = cartTax + cartSubTotal;
        this.setState(() => {
            return {
                cartSubTotal,
                cartTax,
                cartTotal
            }
        })
    }



    
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
        }, ()=> {
            this.addTotals();
        });


    };

    openModel = id => {
        const product = this.getItem(id);
        this.setState(()=> {
            return {
                modelProduct: product,
                modelOpen: true
            };
        });
    }

    closeModel = () => {
        this.setState(() => {
            return {
                modelOpen: false
            };
        });
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModel: this.openModel,
                closeModel: this.closeModel,
                decrement: this.decrement,
                increment: this.increment,
                removeItemFromCart: this.removeItemFromCart,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
