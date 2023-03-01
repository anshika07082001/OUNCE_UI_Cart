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
    if (searchArr[index].stock > 0) {
      if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].id === searchArr[index].id) {
            cart[i].quantity++;
            break;
          } else if (i === cart.length - 1) {
            var obj = {
              id: searchArr[index].id,
              img:searchArr[index].thumbnail,
              des:searchArr[index].description,
              title: searchArr[index].title,
              price: searchArr[index].price,
              brand:searchArr[index].category,
              quantity: 1,
            };
            cart.push(obj);
            break;
          }
        }
      } else {
        obj = {
          id: searchArr[index].id,
          img:searchArr[index].thumbnail,
          des:searchArr[index].description,
          title: searchArr[index].title,
          price: searchArr[index].price,
          brand:searchArr[index].category,
          quantity: 1,
        };
        cart.push(obj);
      }
      setCart([...cart]);
    }
  };

  const searchHandler = () => {
    setFlag(true);
    var arr = [];
    searchArr = [];

    checkRefs.current.map((item) => {
      if (item.checked) {
        arr.push(item.getAttribute("value"));
      }
    });
    console.log(arr);
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

  const resetFilter = () => {
    checkRefs.current.map((item) => {
      item.checked = false;
    });
    applyFilter();
  };

  return (
    <Routes>
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
      <Route path="/cart" element={<Cart cart={cart}/>} />
    </Routes>
  );
};

export default Main;
