import React from "react"
import './Mainbody.css'

const Mainbody = (props) => {
  return (
    <div className="main-body">
        <div className="main-body-top" style={{fontSize:"16px", fontWeight: "500"}}>
            Recent forms
        </div>
      <div className="main-body-docs">
        <div className="doc-card">
            {/* <img src={} className="doc-image"/> */}
            <div className="doc-card-content">
                <h5></h5>
                <div className="doc-content">

                </div>
            </div>
        </div>
      </div>
    </div>
  )
};

export default Mainbody;
