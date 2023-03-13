import React from 'react'
import {firebaseApp} from '../../firebase/firebase'
import {useState} from 'react'
import {getDownloadURL, ref, uploadBytes, getStorage} from 'firebase/storage'
import {collection, doc, getFirestore, setDoc} from 'firebase/firestore'
import './SuggestForm.css'

const SuggestForm = () => {
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    brandname: '',
    description: '',
    link: '',
  })

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const submitData = async (e) => {
    alert('Your item has been submitted! View now by clicking "Browse"')
    e.preventDefault()

    const database = getFirestore(firebaseApp)
    const storage = getStorage(firebaseApp)

    // upload image to firebase storage
    const productRef = doc(collection(database, 'products'))

    const path = `products/${productRef.id}/${file.name}`
    // upload image to firebase storage
    const storageRef = ref(storage, path)
    const result = await uploadBytes(storageRef, file)
    const uploadedPhotoUrl = await getDownloadURL(result.ref)

    // get data from form and add image url
    const {brandname, category, name, description, link} = formData
    const newProduct = {
      brandname,
      category,
      name,
      description,
      link,
      photoUrl: uploadedPhotoUrl,
    }

    console.log('newProduct', newProduct)

    // add data to firestore
    await setDoc(productRef, newProduct)

    setFormData({
      category: '',
      name: '',
      brandname: '',
      description: '',
      link: '',
    });
  }

return(
 <div className="bri">
      <div className="form">
        <form onSubmit={submitData} style={{position: "absolute", top:"100px", left:"580px"}}>
          <select
            onChange={handleInputChange}
            id="dupecategory"
            name="category"
          >
            <option value="">--Please select a category--</option>
            <option value="Leggings">Leggings</option>
            <option value="Make-up">Make-up</option>
            <option value="Perfume">Perfume</option>
          </select>
          <label for="dupename">Dupe Name:</label>
          <textarea
            onChange={handleInputChange}
            id="dupename"
            name="name"
          ></textarea>
           <label for="brandname">Brand Name Item:</label>
          <textarea
            onChange={handleInputChange}
            id="brandname"
            name="brandname"
          ></textarea>
          <label for="dupephotos">Dupe Photo:</label>
          <input
            type="file"
            id="dupephotos"
            name="dupephotos"
            accept="image/*"
            onChange={handleFileSelect}
          ></input>

          <label for="dupedescription">Review of Item:</label>
          <textarea
            onChange={handleInputChange}
            id="dupedescription"
            name="description"
          ></textarea>

           <label for="link">Link to Item:</label>
          <textarea
            onChange={handleInputChange}
            id="link"
            name="link"
          ></textarea>

          <input type="submit" onClick={submitData} value="Submit"></input>
        </form>
      </div>
    </div>
)
}
export default SuggestForm;