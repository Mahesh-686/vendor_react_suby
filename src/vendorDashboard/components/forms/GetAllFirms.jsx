import React, { useEffect, useState } from "react";
import { API_URL } from "../../data/apiPath";

const GetAllFirms = () => {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFirms();
  }, []);

  const fetchFirms = async () => {
    try {
      const response = await fetch(`${API_URL}/firm/firms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setFirms(data);
      } else {
        console.error("Error fetching firms:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch firms", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update local storage and reload the page
  const handleFirmClick = (firm) => {
    localStorage.setItem("firmName", firm.firmName);
    localStorage.setItem("firmId", firm._id);  // Store firmId in localStorage
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">All Firms</h3>

      {loading ? (
        <p className="text-center text-gray-600">Loading firms...</p>
      ) : firms.length === 0 ? (
        <p className="text-center text-gray-600">No firms found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="py-2 px-4 border">Firm Name</th>
                <th className="py-2 px-4 border">Area</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Region</th>
                <th className="py-2 px-4 border">Offer</th>
                <th className="py-2 px-4 border">Image</th>
              </tr>
            </thead>
            <tbody>
              {firms.map((firm) => (
                <tr
                  key={firm._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleFirmClick(firm)}
                >
                  <td className="py-2 px-4 border">{firm.firmName}</td>
                  <td className="py-2 px-4 border">{firm.area}</td>
                  <td className="py-2 px-4 border">{firm.category.join(", ")}</td>
                  <td className="py-2 px-4 border">{firm.region.join(", ")}</td>
                  <td className="py-2 px-4 border">{firm.offer || "No Offer"}</td>
                  <td className="py-2 px-4 border">
                    {firm.image ? (
                      <img
                        src={`${API_URL}/uploads/${firm.image}`}
                        alt="Firm"
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllFirms;
