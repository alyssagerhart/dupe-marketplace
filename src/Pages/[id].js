import React from 'react';
import {useRouter} from 'next/router';
import {useState, useEffect} from "react";
import Navbar from '../components/Navbar/Navbar';
import { firebaseApp } from '../firebase/firebase';
import { getFirestore,doc,getDoc } from "firebase/firestore";

export async function getProduct(productId){
  const db = getFirestore(firebaseApp);

  const docRef = doc(db, "products", productId);
  const snapshots = await getDoc(docRef);
  const docs = snapshots.data() 
      return docs
}

export default function ProductPage(){
  const router = useRouter()
  const productId = router.query.id
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if(productId){
    getProduct(productId).then(data => setProduct(data))
  }
  },[productId])


  return (
    <main className='videoplayer' >
        <Navbar showElement></Navbar>
    </main>
    
  )
  
}