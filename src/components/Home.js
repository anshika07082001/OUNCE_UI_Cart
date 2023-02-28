import {
  AutoComplete,
  Card,
  Filter,
  FormElement,
  Topbar,
} from "@cedcommerce/ounce-ui";
import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
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
          <Link to="/cart">
            Cart <i className="fa fa-shopping-cart"></i>
          </Link>
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
          options={[]}
          thickness="thick"
          placeHolder="Search Your Items here..."
            onChange={(e) => props.setVal(e)}
          onEnter={props.searchHandler}
          value={props.val}
          clearButton={<i className="fa fa-close close__icon"></i>}
          clearFunction={() => {
            props.setVal("");
            props.setSearchArr(props.products);
          }}
        ></AutoComplete>
        {/* filters the products array */}
        <Filter
          filters={props.filterArr}
          icon={<i className="fa fa-filter"></i>}
          onApply={props.applyFilter}
          resetFilter={props.resetFilter}
          disableApply={false}
          disableReset={false}
        ></Filter>
      </div>
      {/* rendering of products array */}
      {props.searchArr.length > 0 ? (
        <div className="cards">
          {props.searchArr.map((item, index) => {
            return (
              <Card
                key={item.id}
                primaryAction={{
                  content: "Add to Cart",
                  type: "Primary",
                  onClick: () => props.addCart(index),
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
      {props.flag ? (
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

export default Home;
