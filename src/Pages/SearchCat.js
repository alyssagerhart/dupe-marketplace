import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./SearchCat.css"; // Import the CSS file

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

  const groupedData = details.reduce((acc, curr) => {
    if (curr.category in acc) {
      acc[curr.category].push(curr);
    } else {
      acc[curr.category] = [curr];
    }
    return acc;
  }, {});

  return (
    <div className="background">
      {Object.entries(groupedData).map(([category, products]) => (
        <div
          key={category}
          style={{
            border: "1px solid black",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
            {category}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  margin: "10px",
                  flexBasis: "30%",
                }}
              >
                <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0" }}>
                  {product.name}
                </p>
                <p style={{ fontSize: "16px", margin: "0" }}>
                  {product.brandname}
                </p>
                <p style={{ fontSize: "14px", margin: "0" }}>
                  {product.description}
                </p>
                <img
                  style={{ margin: "0", height: "150px", width: "150px" }}
                  src={product.photoUrl}
                  alt="product"
                ></img>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchCat;