import React, { useState } from "react";
import "./SingleCard.css";

function SingleCard(props) {
  console.log(props.data.address);
  const [open, setopen] = useState(false);
  const togglepanel = (e) => {
    setopen(!open);
  };
  return (
    <>
      <div onClick={(e) => togglepanel(e)} className="card">
        <div className="d-flex justify-content-center align-items-center">
          <div className="leftinfo">
            <p>
              <small>({props.data.id})</small>&nbsp;{props.data.name}
            </p>
            <p>{props.data.username}</p>
          </div>
          <div className="rightinfo">
            <div className="btn">Human</div>
          </div>
        </div>
        {open ? (
          <div className="hidden">
            <strong>Address:</strong>
            <p>
              {props.data.address.suite},{props.data.address.street},
              {props.data.address.city}
            </p>
            <p>Zip:{props.data.address.zipcode}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default SingleCard;
