import React, { useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
    handleCategoryChange,
    subOptions,
    handleSubmit,
    handleChange,
    values,
    setValues,
    categories,
    arrayOfSubIds,
    setArrayOfSubIds,
    selectedCategory
}) => {
  // Destructure
  const {
    title,
    description,
    price,
    images,
    colors,
    brands,
    category,
    subs,
    shipping,
    quantity,
    color,
    brand,
  } = values;
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          className="form-control"
          name="title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          value={description}
          onChange={handleChange}
          type="text"
          className="form-control"
          name="description"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          value={price}
          onChange={handleChange}
          type="text"
          className="form-control"
          name="price"
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          value={shipping === 'Yes'? 'Yes' : 'No'}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          value={quantity}
          onChange={handleChange}
          type="number"
          className="form-control"
          name="quantity"
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option value={color} >{color}</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option value={brand}> {brand}</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
  <div className="form-group">
        <label> Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
       
         {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
          <label>Sub Category</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select sub categories"
            value={arrayOfSubIds}
            onChange={(value) => setArrayOfSubIds(value )}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id} >
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
