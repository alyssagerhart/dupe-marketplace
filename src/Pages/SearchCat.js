import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function SearchCat() {
  const [details, setDetails] = useState([]);

  const userData = async () => {
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(data);
  };

  useEffect(() => {
    userData();
  }, []);

  const boxStyle = {
      top: "40%",
      left: "42%",
    border: "1px solid black",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    margin: "20px 0",
    position: "absolute",
  };

  const textStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
    paddingBottom: "5px",
  };

  const productStyle = {
    fontSize: "14px",
    margin: "0",
    paddingLeft: "10px",
  };

  return (
    <div>
      <div style={boxStyle}>
        <p style={textStyle}>Products</p>
        <div>
          {details.map((val, id) => {
            return (
              <p key={id} style={productStyle} className="pt-2">
                {val.id}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchCat;