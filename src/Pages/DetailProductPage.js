import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DetailProductPage = () => {

  //set up state variables
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  // Call product category from firebase
  // set the product state variable to the data from the product
  useEffect(() => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("id", "==", productId));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setProduct(doc.data());
      });
    });
  }, [productId]);

  return (
    <div style={{ maxWidth: "1200px", marginLeft: "auto", marginRight: "auto", paddingLeft: "20px", paddingRight: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "10px", marginBottom: "10px" }}>
        <div style={{ width: "100%", paddingRight: "10px" }}>
          <img
            src={product.photoUrl}
            alt={product.name}
            style={{ height: "40%", width: "20%", borderRadius: "0.5rem", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",position: "absolute", top: "110px", left:"650px" }}
          />
        </div>
        <div style={{ width: "80%", marginTop: "10px", marginRight: "10px", position: "absolute", top: "450px", left:"175px", textAlign:"center" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{product.name}</h1>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "500", marginBottom: "0.5rem" }}>Brand name item: {product.brandname}</h2>
          <p style={{ fontSize: "1rem", marginBottom: ".5rem" }}>Review: {product.description}</p>
          <br></br>
          <a href={product.link}>Click Here To Buy</a>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
