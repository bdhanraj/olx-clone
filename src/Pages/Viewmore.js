import React, { useContext,useState } from "react";
import { useHistory } from "react-router";
import AllPostContext from "../Contexts/AllPostContext";
import Pagination from "../Components/Pagination/Pagination";
import PostCards from "../Components/PostCards/Postcard";
import "./allposts.css";
import Navbar from "../Components/Navbar/Navbar"

function ViewMore() {
    const { allPost } = useContext(AllPostContext);
    // let displayAllPosts = allPost.map((product, index) => {
    //   return (
    //     <div className="all-post-card">
    //       {" "}
    //       <PostCards product={product} index={index} />{" "}
    //     </div>
    //   );
    // });
    
    let length = allPost.length; //if user refresh the whole page context will be empty so we want to redirect the user to the home page
    const history = useHistory();
  
    //pagination logic and implementation will start here
    let [currentPage,setCurrentPage]=useState(1)
    let itemsPerPage=8
    let indexOfLastDish=currentPage*itemsPerPage
    let indexOfFirstDish=indexOfLastDish-itemsPerPage
    let showTheseItems=allPost.slice(indexOfFirstDish,indexOfLastDish)
  
    let displayThesePosts = showTheseItems.map((product, index) => {
      return (
        <div className="all-post-card" key={index}>
          {" "}
          <PostCards product={product} index={index} />{" "}
        </div>
      );
    });
    return (
        <div>
         <Navbar/>
      {length !== 0 ? (
        <div className="display-all-parent">
          <div className="container-allpost">{displayThesePosts}</div>
          <Pagination setCurrentPage={setCurrentPage}/>
        </div>
      ) : (
        history.push("/")
      )}       
        </div>
    )
}

export default ViewMore
