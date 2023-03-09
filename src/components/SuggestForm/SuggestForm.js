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
    description: '',
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
    const {category, name, description} = formData
    const newProduct = {
      category,
      name,
      description,
      photoUrl: uploadedPhotoUrl,
    }

    console.log('newProduct', newProduct)

    // add data to firestore
    await setDoc(productRef, newProduct)
  }

return(
 <div className="bri">
      <div className="form">
        <form onSubmit={submitData}>
          <h1>Dupe:</h1>
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
          <label for="dupename">Name:</label>
          <textarea
            onChange={handleInputChange}
            id="dupename"
            name="name"
          ></textarea>
          <label for="dupephotos">Photos:</label>
          <input
            type="file"
            id="dupephotos"
            name="dupephotos"
            accept="image/*"
            onChange={handleFileSelect}
          ></input>

          <label for="dupedescription">Description:</label>
          <textarea
            onChange={handleInputChange}
            id="dupedescription"
            name="description"
          ></textarea>

          <input type="submit" onClick={submitData} value="Submit"></input>
        </form>
      </div>
    </div>
)
}
export default SuggestForm;