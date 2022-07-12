import React from "react";
import "./App.css";
import AllPostContext from "./Contexts/AllPostContext";
import AuthContext from "./Contexts/AuthContext";
import PostContext from "./Contexts/PostContext";
import MainRoutes from "./Maineoutes/Mainroutes";

function App() {
  return (
    <>
      <div>
        <AuthContext>
          <AllPostContext>
            <PostContext>
              <MainRoutes/>
            </PostContext>
          </AllPostContext>
        </AuthContext>
      </div>
    </>
  );
}

export default App;
