import React, { Fragment, useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../Contexts/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
const Create = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  let [item, setItem] = useState ({name:"", category:"", price:"", description:"", image:""});
  let [loading,setLoading]=useState(false);
  const handleSubmit = () => {
    setLoading(true);
    let date = new Date().toDateString();
    //to do createpost
  };
  const onChange = (e)=>{
      setItem({...item, [e.target.name]: e.target.value})
  }
  return (
    <Fragment>
        <Navbar />
        { loading && <GoLoading/> }
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={item.name} onChange={onChange} id="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Category</label>
                <select
                name="category"
                value={item.category}
                onChange={onChange} className="form-control" 
                > <option >Select Category</option>
                <option value="Cars">Cars</option>
                <option value="Cameras & Lenses">Cameras & Lenses</option>
                <option value="Computers & Laptops">Computers & Laptops</option>
                <option value="Mobile Phones">Mobile Phones</option>
                <option value="Motorcycles">Motorcycles</option>
                <option value="Tablets">Tablets</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="number" className="form-label">Price</label>
                <input type="number" className="form-control" value={item.price} onChange={onChange} id="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Description</label>
                <input type="text" className="form-control" value={item.description} onChange={onChange} id="description"/>
            </div>
            <div>
                <img alt="Posts" width="200px" height="200px" src={item.image ? URL.createObjectURL(item.image) : ""} ></img>
                <br />
                <input type="file" onChange={onChange} />
                <br />
            </div>
            <button type="button" class="btn btn-primary">Upload</button>
        </form>
    </Fragment>
  );
};

export default Create;
