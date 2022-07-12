import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SignupLoading from "../Components/Loading/SignupLoading";

function Signup(props) {
    const [credentials, setCredentials] = useState({name : "", phone: "", email: "", password: "", cpassword: ""})
    let [loading,setLoading]=useState(false)
    let history = useHistory();

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        if(credentials.password===credentials.cpassword)
        {
            const {name, phone, email, password} = credentials;
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, phone, email, password})
            });
            const json = await response.json()
            console.log(json);
            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                history.push("/");
                props.showAlert("Successfully Account Created", "success")
            }
            else{
                props.showAlert("User already exist with this email", "denger")
            } 
        }else{
            props.showAlert("Confirm Password is not equal to Password", "denger")
        }
       
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
            {loading && <SignupLoading />}
            <div className="container">
                <div>
                    <form  onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Phone No.</label>
                            <input type="number" className="form-control" value={credentials.phone} onChange={onChange} id="number"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="cpassword" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </>    
    );
}

export default Signup;
