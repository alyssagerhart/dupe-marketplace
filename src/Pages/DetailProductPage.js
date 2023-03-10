import Navbar from '../components/Navbar/Navbar';
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation, Link } from "react-router-dom";
import "./SearchCat.css";


function DetailProductPage(props) {
  const [product, setProduct] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getProduct = async () => {
      const q = query(collection(db, "products"), where("id", "==", props.location.state.product.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const productData = querySnapshot.docs[0].data();
        setProduct(productData);
      }
    };
    getProduct();
  }, [props.location.state.product.id]);

  return (
    <div>
      <Navbar />
      <div className="detailProductPage">
        <div className="detailProductPage__left">
          {product && (
            <div className="detailProductPage__left__image">
              <img src={product.image} alt="product" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;