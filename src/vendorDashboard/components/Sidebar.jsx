import React from 'react'

const Sidebar = ({showFirmHandler,showProductHandler,showAllProductsHandler,showFirmTitle, showAllFirmsHandler}) => {
  return (
    <div className="sidebarSection">
        <ul>
        {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : "" }
            <li onClick={showFirmHandler}>Add Firm</li>
            <li onClick={showAllFirmsHandler}>All Firm</li>
            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={showAllProductsHandler}>All Product</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default Sidebar