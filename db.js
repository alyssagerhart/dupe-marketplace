import {
    getFirestore,
    doc,
    collection,
    getDoc,
    updateDoc,
    addDoc,
    deleteDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import { firebaseApp } from "./src/firebase";
  
  // Initialize Firestore
  const db = getFirestore(firebaseApp);
  
  // Fetch item data once
  export async function getItem(id) {
      const docRef = doc(db, "product", id)
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        return docSnap.data()
      }
      else{
        return null
      }
  
  }
  
  // Create a new item
  export function createItem(data) {
    return addDoc(collection(db, "products"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  }
  
  // Update an item
  export function updateItem(id, data) {
    return updateDoc(doc(db, "products", id), data);
  }
  
  // Delete an item
  export function deleteItem(id) {
    return deleteDoc(doc(db, "products", id));
  }