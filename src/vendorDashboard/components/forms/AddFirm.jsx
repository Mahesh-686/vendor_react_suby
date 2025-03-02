
import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';
//import { ThreeCircles } from 'react-loader-spinner';


const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); 


  const handleCategoryChange = (event)=>{
      const value = event.target.value;
        if(category.includes(value)){
          setCategory(category.filter((item)=> item !== value));
        }else{
          setCategory([...category, value])
        }
  }
  const handleRegionChange = (event)=>{
      const value = event.target.value;
        if(region.includes(value)){
          setRegion(region.filter((item)=> item !== value));
        }else{
          setRegion([...region, value])
        }
  }
 
  const handleImageUpload =(event)=>{
      const selectedImage = event.target.files[0];
      setFile(selectedImage)
  }

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not authenticated");
        alert("User not authenticated");
        return;
      }
  
      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);
  
      // 🔹 Convert arrays to JSON strings
      category.forEach((value) => formData.append("category", value));
      region.forEach((value) => formData.append("region", value));
      
  
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm added Successfully");
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm Exists 🥗. Only 1 firm can be added");
      } else {
        alert("Failed to add Firm");
      }
  
      const mango = data.firmId;
      const vendorRestaurant = data.vendorFirmName;
  
      localStorage.setItem("firmId", mango);
      localStorage.setItem("firmName", vendorRestaurant);
      window.location.reload();
    } catch (error) {
      console.error("Failed to add Firm", error);
      alert("Failed to add Firm");
    } finally {
      setLoading(false);
    }
  };
  

  return (
        <div className="firmSection">
   {loading &&        <div className="loaderSection">
        {/* <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> */}
      </div>}
         {!loading &&   <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
                <label >Firm Name</label>
                <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
                <label >Area</label>
                <input type="text"  name='area' value={area} onChange={(e)=>setArea(e.target.value)} />
                {/* <label >Category</label>
                <input type="text"  /> */}
    <div className="checkInp">
      <label >Category</label>
          <div className="inputsContainer">
          <div className="checboxContainer">
                  <label>veg</label>
                  <input type="checkbox" checked ={category.includes('veg')}  value="veg" onChange={handleCategoryChange}/>
                </div>
                <div className="checboxContainer">
                  <label>Non-veg</label>
                  <input type="checkbox" checked ={category.includes('Non-veg')} value="Non-veg" onChange={handleCategoryChange}/>
                </div>
          </div>

    </div>
    <label >Offer</label>
                <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
    <div className="checkInp">
      <label >Region</label>
          <div className="inputsContainer">
          <div className="regBoxContainer">
                  <label>South-Indian</label>
                  <input type="checkbox" value="South-Indian"   checked ={region.includes('South-Indian')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>North-Indian</label>
                  <input type="checkbox" value="North-Indian"  checked ={region.includes('North-Indian')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Chinese</label>
                  <input type="checkbox" value="Chinese" checked ={region.includes('Chinese')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Bakery</label>
                  <input type="checkbox" value="Bakery" checked ={region.includes('Bakery')}
                  onChange={handleRegionChange}
                  />
                </div>
          </div>

    </div>
               
                <label >Firm Image</label>
                <input type="file" onChange={handleImageUpload} />
                <br />
            <div className="btnSubmit">
        <button type='submit'>Submit</button>
    </div>
           </form>}
        </div>
  )
}

export default AddFirm