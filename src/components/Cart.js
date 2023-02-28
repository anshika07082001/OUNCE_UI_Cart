import { Topbar } from "@cedcommerce/ounce-ui";
import React from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
  console.log(props.cart);
  return (
    <>
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
    </>
  );
};

export default Cart;
