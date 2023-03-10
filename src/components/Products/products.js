import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const docRef = doc(db,"brandname", "category", "name", "description", "link", "photoUrl");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
