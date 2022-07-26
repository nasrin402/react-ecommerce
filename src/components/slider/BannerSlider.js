import React from "react";

const BannerSlider = () => {
  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3">
            
          </div>
          <div className="col-lg-9">
            <div
              id="header-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item active"
                  style={{ height: "410px" }}
                >
                  <img
                    className="img-fluid"
                    src="assets/img/carousel-1.jpg"
                    alt="Image"
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: "700px" }}>
                      <h4 className="text-light text-uppercase font-weight-medium mb-3">
                        10% Off Your First Order
                      </h4>
                      <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                        Fashionable Dress
                      </h3>
                      <a href="" className="btn btn-light py-2 px-3">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" style={{ height: "410px" }}>
                  <img
                    className="img-fluid"
                    src="assets/img/carousel-2.jpg"
                    alt="Image"
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: "700px" }}>
                      <h4 className="text-light text-uppercase font-weight-medium mb-3">
                        10% Off Your First Order
                      </h4>
                      <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                        Reasonable Price
                      </h3>
                      <a href="" className="btn btn-light py-2 px-3">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#header-carousel"
                data-slide="prev"
              >
                <div
                  className="btn btn-dark"
                  style={{ width: "45px", height: "45px" }}
                >
                  <span className="carousel-control-prev-icon mb-n2"></span>
                </div>
              </a>
              <a
                className="carousel-control-next"
                href="#header-carousel"
                data-slide="next"
              >
                <div
                  className="btn btn-dark"
                  style={{ width: "45px", height: "45px" }}
                >
                  <span className="carousel-control-next-icon mb-n2"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerSlider;
