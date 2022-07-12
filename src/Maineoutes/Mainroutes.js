import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import CreatePost from "../Pages/CreatePost"
import ViewMore from "../Pages/Viewmore"
import View from "../Pages/View"

function MainRoutes() {
    return (
       <Router>
           <Route exact path="/">
               <Home/>
           </Route>
           <Route path="/login">
               <Login/>
           </Route>
           <Route path="/signup">
               <Signup/>
           </Route>
           <Route path="/create">
               <CreatePost/>
           </Route>
           <Route path="/view">
               <View/>
           </Route>
           <Route path="/viewmore">
               <ViewMore/>
           </Route>
                      
       </Router>
    )
}

export default MainRoutes