import React, { useState } from "react";
import { API_URL } from "../../data/apiPath"; // Import API_URL

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }

  const loginHandler = async (e) => {
    e.preventDefault();
  setLoading(true);
    //setError("");

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login success");
        localStorage.setItem("loginToken", data.token);
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token);
        showWelcomeHandler()     
      }
      const vendorId = data.vendorId
      console.log("checking for VendorId:",vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      window.location.reload()
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName', vendorFirmName)
      }
    } catch (error) {
        alert("login fail")
    } finally {
      setLoading(false); 
    }
}
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler} autoComplete="off">
        <h3>Vendor Login</h3>

        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error messages */}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <br />

        <label>Password</label>
        <input
          type="password" // Changed from text to password
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <br />

        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
