import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]); // send this ids to backend
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(true);
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  let dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
  //2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //3. load products on user price input
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([])
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  //4. load products based on categories
  //show categories list in a checkbox
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    //console.log(e.target.value)
    let inTheState = [...categoryIds];
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked)// index or -1
    // if not found return -1 else return index [1, 2, 3, 4,]
    if(foundInTheState === -1){
      inTheState.push(justChecked)
    }else{
      // if found pull out from the item
      inTheState.splice(foundInTheState, 1)
    }
    setCategoryIds(inTheState);
    //console.log(inTheState);
    fetchProducts({category: inTheState})
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h3>Search/ Filter</h3>
          <hr />
          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="mx-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Categories
                </span>
              }
            >
              <div className="mt-3">
                {categories.map((c) => (
                  <div key={c._id}>
                    <Checkbox
                      className="pb-2 pl-4 pr-4"
                      value={c._id}
                      name="category"
                      onChange={handleCheck}
                      checked={categoryIds.includes(c._id)}
                    >
                      {c.name}
                    </Checkbox>
                    <br />
                  </div>
                ))}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-3">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className="container">
            <div className="row">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 my-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
