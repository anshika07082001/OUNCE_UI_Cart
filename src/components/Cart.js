import { Card, Topbar } from "@cedcommerce/ounce-ui";
import React from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
  return (
    <>
    {/* rendering of navbar */}
      <Topbar
        connectLeft={
          <Link to="/">
            <img
              src="https://e7.pngegg.com/pngimages/287/216/png-clipart-black-and-red-wings-logo-illustration-logo-phoenix-art-phoenix-leaf-logo.png"
              alt=""
            />
          </Link>
        }
        account={
          <img
            src="https://www.pngitem.com/pimgs/m/0-6243_user-profile-avatar-scalable-vector-graphics-icon-woman.png"
            alt=""
          />
        }
      ></Topbar>
      {/* rendering of carts products in cards format */}
      {props.cart.length > 0 ? (
        <div className="cartCards">
          {props.cart.map((item) => {
            return (
              <Card key={item.id} title={item.brand}>
                <div className="carts">
                  <img src={item.img} alt="" className="carts__img" />
                  <div className="carts__content">
                    <h2>{item.title}</h2>
                    <label>{item.des}</label>
                    <label className="cart__price">Price: ₹{item.price}</label>
                    <span className="cart__quant">
                      Quantity: {item.quantity}
                    </span>
                    <div className="cart__images">
                      <div>
                        <img
                          src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png"
                          alt=""
                        />
                        <span className="images__content">Free Delivery</span>
                      </div>
                      <div>
                        <img
                          src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png"
                          alt=""
                        />
                        <span className="images__content">Pay on Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        // rendering of image if cart is empty
        <img
          src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png"
          alt=""
        />
      )}
    </>
  );
};

export default Cart;
