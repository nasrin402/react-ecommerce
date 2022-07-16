import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";


const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProduct = ({ product, onStarRating, star }) => {
  const { title, images, description, _id } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoplay infiniteLoop>
            {images &&
              images.map((i) => <img src={i.url} key={i.product_id} />)}
          </Carousel>
        ) : (
          <Card hoverable cover={<img alt={title} src={laptop} />}></Card>
        )}
      </div>
      <div className="col-md-5">
        {/* {JSON.stringify(product)}
    */}
        <Card
          actions={[
            <div>
              <ShoppingCartOutlined className="text-warning" /> <br />
              Add to cart
            </div>,
            <Link to="/">
              <HeartOutlined />
              <br />
              Add to wishlist
            </Link>,
            <RatingModal>
            <StarRatings
              rating={star}
              starRatedColor="#FE980F"
              changeRating={onStarRating}
              numberOfStars={5}
              name={_id}
              isSelectable={true}
            />
          </RatingModal>
          ]}
        >
        <h2 style={{display:"inline-block", marginRight:"50px"}}>{title}</h2>  {product && product.ratings && product.ratings.length > 0 ? (showAverage(product)) : (<h5 style={{display:"inline-block", }}>No ratings yet</h5>)}
     
    
          <ProductListItems product={product} />
          {/*<Meta title={title} description={description} />  */}
        </Card>
      </div>
      <hr />
      <div className="col-md-12">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="Shipping" key="2">
            Shipping info
          </TabPane>
          <TabPane tab="More info" key="3">
            Call us: 01616209034 to know more product info.
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default SingleProduct;
