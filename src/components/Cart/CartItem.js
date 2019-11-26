import React from 'react'

export default function CartItem({item, value}) {
    const {id, title, img, price, total, count} = item;
    const {increment, decrement, removeItemFromCart} = value;
    // console.log(value);
    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} alt="Product image" style={{width: '5rem', height: '5rem'}} className="img-fluid"/>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product:  </span>   {title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price:  </span>   <strong>${price}</strong>
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="f-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" onClick={()=>decrement(id)}> - </span>
                        <div className="span btn btn-black mx-1">{count}</div>
                        <span className="btn btn-black mx-1" onClick={()=>increment(id)}> + </span>
                    </div>
                </div>

           
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon">
                    <i className="fas fa-trash" onClick={()=>removeItemFromCart(id)}/>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <strong>
                    item total : $ {total}
                </strong>
            </div>
        </div>
    )
}
