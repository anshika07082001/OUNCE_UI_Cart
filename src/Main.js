import {
  AutoComplete,
  Card,
  Filter,
  FormElement,
  Topbar,
} from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";

const Main = () => {
  var [products, setProducts] = useState([]);
  var [cart, setCart] = useState([]);
  var [searchArr, setSearchArr] = useState([]);
  var [val, setVal] = useState("");
  var [flag, setFlag] = useState(true);
  var rest = [{ label: "ff", value: "ff" }];
  var filterObj = [{}];

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.products);
        setSearchArr(result.products);
        setFlag(false);
      });
  }, []);

  const addCart = (index) => {
    if (products[index].stock > 0) {
      if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].id === products[index].id) {
            cart[i].quantity++;
            break;
          } else if (i === cart.length - 1) {
            var obj = {
              id: products[index].id,
              title: products[index].title,
              price: products[index].price,
              quantity: 1,
            };
            cart.push(obj);
            break;
          }
        }
      } else {
        obj = {
          id: products[index].id,
          title: products[index].title,
          price: products[index].price,
          quantity: 1,
        };
        cart.push(obj);
      }
      setCart([...cart]);
    }
  };

  const searchHandler = () => {
    setFlag(true);
    searchArr = [];
    products.map((item) => {
      if (
        item.title.toString().slice(0, val.length).toLocaleLowerCase() ==
        val.toLocaleLowerCase()
      ) {
        searchArr.push(item);
        setFlag(false);
      }
    });
    setSearchArr(searchArr);
  };

  const filterHandler=()=>{

  }

  return (
    <>
      {/* rendering of header */}
      <Topbar
        connectLeft={
          <img
            src="https://e7.pngegg.com/pngimages/287/216/png-clipart-black-and-red-wings-logo-illustration-logo-phoenix-art-phoenix-leaf-logo.png"
            alt=""
          />
        }
        connectRight={
          <a href="d">
            Cart <i className="fa fa-shopping-cart"></i>
          </a>
        }
        account={
          <img
            src="https://www.pngitem.com/pimgs/m/0-6243_user-profile-avatar-scalable-vector-graphics-icon-woman.png"
            alt=""
          />
        }
      ></Topbar>
      {/* rendering of search bar searches the products on Enter */}
      <div className="search">
        <AutoComplete
          options={rest}
          thickness="thick"
          placeHolder="Search Your Items here..."
          onChange={(e) => setVal(e)}
          onEnter={searchHandler}
          value={val}
          clearButton={<i className="fa fa-close close__icon"></i>}
          clearFunction={() => {
            setVal("");
            setSearchArr(products);
          }}
        ></AutoComplete>
        {/* filters the products array */}
        <Filter
          filters={filterObj}
          icon={<i className="fa fa-filter"></i>}
          onApply={filterHandler}
        ></Filter>
      </div>
      {/* rendering of products array */}
      {searchArr.length > 0 ? (
        <div className="cards">
          {searchArr.map((item, index) => {
            return (
              <Card
                key={item.id}
                primaryAction={{
                  content: "Add to Cart",
                  type: "Primary",
                  onClick: () => addCart(index),
                }}
                title={item.title}
              >
                <FormElement>
                  <img src={item.thumbnail} alt="" />
                  <label>{item.description}</label>
                  <div className="icons__block">
                    <span className="percent">
                      Discount: {item.discountPercentage}%
                    </span>
                    <span className="rating">
                      Rating:
                      {item.rating}
                      <span className="fa fa-star"></span>
                    </span>
                  </div>
                  <span>Price: ₹{item.price}</span>
                </FormElement>
              </Card>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {/* rendering of image if no search results found */}
      {flag ? (
        <img
          src="https://cdn.dribbble.com/users/308895/screenshots/2598725/no-results.gif"
          alt=""
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Main;
