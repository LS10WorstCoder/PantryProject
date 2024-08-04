import { useEffect, useState } from "react";
import './App.css';
import { Auth } from "./components/auth.js";
import { auth, db, storage } from "./configs/firebaseConfig";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [itemList, setItemList] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newNumberOf, setNewNumberOf] = useState("");
  const [updatedNumberOf, setUpdatedNumberOf] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const itemsCollectionRef = collection(db, "FoodItems");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setItemList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteItem = async (id) => {
    const itemDoc = doc(db, "FoodItems", id);
    await deleteDoc(itemDoc);
    getItemList();
  };

  useEffect(() => {
    getItemList();
  }, []);

  const onSubmitItem = async () => {
    try {
      await addDoc(itemsCollectionRef, {
        name: newItemName,
        numberOf: newNumberOf,
        userId: auth?.currentUser?.uid,
      });
      getItemList();
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeNumberOf = async (id) => {
    const itemDoc = doc(db, "FoodItems", id);
    await updateDoc(itemDoc, { numberOf: updatedNumberOf });
    getItemList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <Auth />
      <div>
        <input
          placeholder="Item Name"
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          placeholder="Number Of"
          type="number"
          onChange={(e) => setNewNumberOf(e.target.value)}
        />
        <button className="primary" onClick={onSubmitItem}>Submit Item</button>
      </div>
      <div className="items-container">
        {itemList.map((item) => (
          <div key={item.id}>
            <h2>Name: {item.name}</h2>
            <p>Number Stored: {item.numberOf}</p>
            <button className="delete" onClick={() => onDeleteItem(item.id)}>Delete Item</button>
            <input placeholder="Change # of items"
              onChange={(e) => setUpdatedNumberOf(e.target.value)}
            />
            <button className="secondary" onClick={() => onChangeNumberOf(item.id)}>Update # Of</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button className="primary" onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
