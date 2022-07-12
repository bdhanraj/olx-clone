import React, {/* useEffect,*/ useContext } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Banner from "../Components/Banner/Banner";
import Posts from "../Components/Posts/Posts";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../Contexts/AuthContext";

function Home() {
  // eslint-disable-next-line
  const {setUser}=useContext(AuthContext)
  //to do get logged in user details 
  useEffect(()=>{
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
    Firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
      
    })
    
 
  },[setUser])
  
  return (
    <div className="homeParent">
      <Navbar />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
