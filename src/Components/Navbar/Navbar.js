import React, { useContext,useState } from "react";
import { useHistory } from "react-router";
import AllPostContext from "../../Contexts/AllPostContext";
import PostContext from "../../Contexts/PostContext";
import "./navbar.css";
import OlxLogo from "../../HelpingNavbarComponent/olxLogo";
import SearchIcon from "../../HelpingNavbarComponent/searchIcon"
import Arrow from "../../HelpingNavbarComponent/arrow";
import SellButton from "../../HelpingNavbarComponent/sellButton";
import SellButtonPlus from "../../HelpingNavbarComponent/sellButtonPlus";
import { Link } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import Search from "../Search/search";
function Navbar() {
  const{allPost}=useContext(AllPostContext)
  const{setPostContent}=useContext(PostContext)
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch=(value)=>{
       setPostContent(value)
       history.push("/view")

  }
  const handleEmptyClick=()=>{
     alert("No items found.., please search by product name");
  }
  const { user } = useContext(AuthContext);
  
  const logoutHandler = () => {
    // to do logout
   /* Firebase.auth().signOut().then(() => {
      history.push("/login");
    });*/
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <input type="text" 
          placeholder="Search specific product..."
          value={wordEntered}
          onChange={handleFilter}
        />{filteredData.length === 0 ? (
          <div onClick={handleEmptyClick}> <SearchIcon /> </div>
         ) : (
           <div id="clearBtn"  onClick={clearInput} > <Arrow></Arrow></div>
         )}
          {filteredData.length !== 0 && (
        <div className="dataResult-header">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div key={key} className="dataItem-header" onClick={()=>handleSelectedSearch(value)}>
                <p>{value.name} </p>
              </div>
            );
          })}
        </div>
      )}
         
        </div>
        <div className="productSearch">
          <Search />
        </div>
        
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            user.displayName
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
        )}
        
        <Link to="/create">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
