import React from "react";
import { db, storage } from "../../firebase/firebase";
import { useState } from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {getDatabase, ref as ref2, set} from "firebase/database";
import {database} from "../../firebase/firebase";
import {collection, doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import "./SuggestForm.css";

const SuggestForm = () => {
    const submitData = async() => {
        // get file from form
        const file = document.getElementById("photos").files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "dupes");

        // upload image to firebase storage
        const productsRef = collection(database, "products");
        const productRef = doc(productsRef);
        const path = `products/${productRef.id}/${file.name}`;
        const storageRef = ref(storage, path);
        const result = await uploadBytes(storageRef, file);
        const uploadedPhotoUrl = await getDownloadURL(result.ref);

        // get data from form and add image url
        const newProduct = {
            category: document.getElementById("category").value,
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            photos: uploadedPhotoUrl,
        };

        // add data to firestore
        await setDoc(productRef, newProduct);
    };

    return (
        <div className="bri">
                <div className="form">
            <form onSubmit = {submitData}>

                <h1>Brand Name Item:</h1>

                    <select id="category" name="category">
                        <option value="">--Please select a category--</option>
                        <option value="Leggings">Leggings</option>
                        <option value="Make-up">Make-up</option>
                        <option value="Perfume">Perfume</option>
                    </select>

                <label for="name">Name:</label>
                    <textarea id="name" name="name"></textarea>
                <label for="photos">Photos:</label>
                    <input type="file" id="photos" name="photos" accept="image/*" multiple></input>

                 <label for="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
           
                <h1>Dupe:</h1>
                    <select id="dupecategory" name="dupecategory">
                        <option value="">--Please select a category--</option>
                        <option value="Leggings">Leggings</option>
                        <option value="Make-up">Make-up</option>
                        <option value="Perfume">Perfume</option>
                    </select>
                <label for="dupename">Name:</label>
                <textarea id="dupename" name="dupename"></textarea>
                <label for="dupephotos">Photos:</label>
                    <input type="file" id="dupephotos" name="dupephotos" accept="image/*" multiple></input>

                 <label for="dupedescription">Description:</label>
                    <textarea id="dupedescription" name="dupedescription"></textarea>

                
                    <input type="submit" onClick={submitData} value="Submit"></input>
            </form>
            </div>
        </div>
    )
}

export default SuggestForm;

