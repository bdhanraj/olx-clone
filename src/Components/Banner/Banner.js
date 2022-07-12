import React, { useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";
import "./Banner.css";

function Banner() {
  let [category, setCategory] = useState();
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">

          <div className="nav-item dropdown">
            <select
            name="Category"
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            onChange= {(e) => {
             setCategory(e.target.value);
            }}
            >
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <option className="dropdown-item" value="null">ALL CATEGORIES</option>
                <option className="dropdown-item" value="Cars">Cars</option>
                <option className="dropdown-item" value="Cameras & Lenses">Cameras & Lenses</option>
                <option className="dropdown-item" value="Computers & Laptops">Computers & Laptops</option>
                <option className="dropdown-item" value="Mobile Phones">Mobile Phones</option>
                <option className="dropdown-item" value="Motorcycles">Motorcycles</option>
                <option className="dropdown-item" value="Tablets">Tablets</option>
              </ul>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("Cars")} >Cars</span>
            <span onClick={()=>setCategory("Cameras & Lenses")} >Cameras & Lenses</span>
            <span onClick={()=>setCategory("Computers & Laptops")} >Computers & Laptops</span>
            <span onClick={()=>setCategory("Mobile Phones")} >Mobile Phones</span>
            <span onClick={()=>setCategory("Motorcycles")} >Motorcycles</span>
            <span onClick={()=>setCategory("Tablets")} >Tablets</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
     { category!=null && <DynamicPosts category={category}/>  }
    </div>
  );
}

export default Banner;