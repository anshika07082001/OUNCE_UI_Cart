import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";

const Main = () => {
  var [products, setProducts] = useState([]);
  var [cart, setCart] = useState([]);
  var [searchArr, setSearchArr] = useState([]);
  var [val, setVal] = useState("");
  var [flag, setFlag] = useState(true);
  var checkRefs = useRef([]);

  // dynamically rendering of array in a filter box
  var filterArr = [
    {
      name: "Brand",
      children: (
        <div className="check__block">
          {[
            "smartphones",
            "laptops",
            "fragrances",
            "skincare",
            "groceries",
            "home-decoration",
          ].map((item, i) => {
            return (
              <div>
                <input
                  type="checkbox"
                  ref={(ref) => (checkRefs.current[i] = ref)}
                  value={item}
                />
                <label>{item}</label>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  // fetching the data from dummy json
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.products);
        setSearchArr(result.products);
        setFlag(false);
      });
  }, []);

  // function adds the product to cart array
  const addCart = (index) => {
    if (searchArr[index].stock > 0) {
      if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].id === searchArr[index].id) {
            cart[i].quantity++;
            break;
          } else if (i === cart.length - 1) {
            var obj = {
              id: searchArr[index].id,
              img: searchArr[index].thumbnail,
              des: searchArr[index].description,
              title: searchArr[index].title,
              price: searchArr[index].price,
              brand: searchArr[index].category,
              quantity: 1,
            };
            cart.push(obj);
            break;
          }
        }
      } else {
        obj = {
          id: searchArr[index].id,
          img: searchArr[index].thumbnail,
          des: searchArr[index].description,
          title: searchArr[index].title,
          price: searchArr[index].price,
          brand: searchArr[index].category,
          quantity: 1,
        };
        cart.push(obj);
      }
      setCart([...cart]);
    }
  };

  // function searches the products
  const searchHandler = () => {
    setFlag(true);
    var arr = [];
    searchArr = [];
    checkRefs.current.map((item) => {
      if (item.checked) {
        arr.push(item.getAttribute("value"));
      }
    });
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

  // function filters the products on the basis of brands
  const applyFilter = () => {
    var flag = false;
    searchArr = [];
    var arr = [];
    checkRefs.current.map((item) => {
      if (item.checked) {
        flag = true;
        arr.push(item.getAttribute("value"));
      }
    });
    if (flag === false) {
      searchArr = products;
    }
    products.map((item) => {
      arr.map((ele) => {
        if (ele == item.category) {
          searchArr.push(item);
        }
      });
    });
    setSearchArr(searchArr);
  };

  // function resets the filter applied on products array
  const resetFilter = () => {
    checkRefs.current.map((item) => {
      item.checked = false;
    });
    applyFilter();
  };

  return (
    <Routes>
      {/* rendering of home page */}
      <Route
        path="/"
        element={
          <Home
            val={val}
            setVal={setVal}
            flag={flag}
            resetFilter={resetFilter}
            products={products}
            cart={cart}
            addCart={addCart}
            searchArr={searchArr}
            setSearchArr={setSearchArr}
            applyFilter={applyFilter}
            searchHandler={searchHandler}
            filterArr={filterArr}
          />
        }
      />
      {/* rendering of cart page */}
      <Route path="/cart" element={<Cart cart={cart} />} />
    </Routes>
  );
};

export default Main;
