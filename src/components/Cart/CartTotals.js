import React from 'react'
import {Link} from 'react-router-dom';
import PayPalButton from '../PayPalButton';

export default function CartTotals({value, history}) {
    const {cartTotal, cartSubTotal, cartTax, clearCart} = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col sm-8 text-capitalize text-right">
                        <Link to='/'>
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={()=>clearCart()}>
                                clear cart
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title">
                                subtotal : <strong>${cartSubTotal}</strong>
                            </span>
                        </h5>
                        <h5>
                            <span className="text-title">
                                cart tax : <strong>${cartTax}</strong>
                            </span>
                        </h5>
                        <h5>
                            <span className="text-title">
                                cart total : <strong>${cartTotal}</strong>
                            </span>
                        </h5>                            
                        <PayPalButton total={cartTotal} clearCart={clearCart} history={history}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
