import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [categoryIds, setCategoryIds] = useState([]); // send this ids to backend
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(true);
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const [star, setStar] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    getCategories().then((c) => {
      setCategories(c.data);
    });
    getSubs().then((res) => setSubs(res.data));
  }, []);

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
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
    setCategoryIds([]);
    setSub("");
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
    setStar("");
    setSub("");
    //console.log(e.target.value)
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    // if not found return -1 else return index [1, 2, 3, 4,]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out from the item
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    //console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  //5. load products based on ratings
  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setStar(num);
    fetchProducts({ stars: num });
  };

  //6. load products based on sub categories
  const handleSub = (s) => {
    //console.log("SUB", s);
    setSub(s);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    fetchProducts({ sub: s });
  };

  const showStars = () => (
    <div className="px-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} /> <br />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <br />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <br />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <br />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h3>Search/ Filter</h3>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h3">
                  <DollarOutlined /> Price
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
                <span className="h3">
                  <DownSquareOutlined /> Categories
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
            <SubMenu
              key="3"
              title={
                <span className="h3">
                  <StarOutlined /> Ratings
                </span>
              }
            >
              <div className="mt-3">{showStars()}</div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h3">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div className="mt-3">
                {subs.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => handleSub(s)}
                    className="p-3 m-1 badge badge-secondary"
                    style={{ cursor: "pointer" }}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-3">
          {loading ? (
            <h3>Loading......</h3>
          ) : (
            <h2 style={{ color: "#FE980F" }}>Products</h2>
          )}
          <div className="container">
            <div className="row">
              {products.length > 1 &&
                products.map((p) => (
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
