import React, { useContext, /*useEffect,*/ useState } from "react";
//import { useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import PostContext from "../Contexts/PostContext";

function View() {
    let { postContent } = useContext(PostContext);//from the global store PostContext we can get information about desired product post that we want to show (the user is clicked item on the card)
    const [userDetails, setUserDetails] = useState();//we want show the details of who is posted the add and we dont know,so we want retreive user data from firebase who is posted this add
   //const history = useHistory();//if user click the refresh of the page then PostContext data will be erased so it will throws an error so that time we want redirect this page to home page
   //to do get post
    return (
        <div>
            <Navbar />
            <div className="viewParentDiv">
                <div className="imageShowDiv">
                    <img src={postContent.url} alt="" />
                </div>
                {" "}
                <div className="rightSection">
                    <div className="productDetails">
                        <p>&#x20B9; {postContent.price} </p>
                        <span>{postContent.name}</span>
                        <p>{postContent.category}</p>
                        <span>{postContent.createdAt}</span>
                    </div>
                    <div className="productDescription">
                        <p className="p-bold">Product Description</p>
                        <p>{postContent.description}</p>
                    </div>
                    {userDetails && (
                        <div className="contactDetails">
                            <p className="p-bold">Seller details</p>
                            <p>Name : {userDetails.name}</p>
                            <p>Phone : {userDetails.phone}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default View;
