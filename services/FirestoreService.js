import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app, auth } from "./FirebaseAuthServices";

const db = getFirestore(app);

export const getCurrentUser = () => {
  return auth.currentUser;
};
export const saveRequests = async (request) => {
  const user = auth.currentUser;
  const uid = user.uid;
  const requestWithUser = {
    ...request,
    createrUid: uid,
  };

  try {
    const docRef = await addDoc(collection(db, "requests"), requestWithUser);
    return {
      success: true,
      message: "Document saved successfully",
      docId: docRef.id,
    };
  } catch (error) {
    console.error("Error adding document: ", error);
    return {
      success: false,
      message: "Error saving document: " + error.message,
    };
  }
};

export const getAllRequests = async () => {
  const user = auth.currentUser;
  const uid = user.uid;

  try {
    if (uid == "w3EYb4YJBigraJyFW2zBNvj9btk2") {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const requests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (requests.length === 0) {
        return { success: true, message: "No documents found", requests: [] };
      }

      return {
        success: true,
        message: "Documents retrieved successfully",
        requests,
      };
    } else {
      const querySnapshot = await getDocs(
        query(collection(db, "requests"), where("createrUid", "==", uid))
      );
      const requests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (requests.length === 0) {
        return { success: true, message: "No documents found", requests: [] };
      }

      return {
        success: true,
        message: "Documents retrieved successfully",
        requests,
      };
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
    return {
      success: false,
      message: "Error getting documents: " + error.message,
    };
  }
};

export const updateRequestStatus = async (documentId, fieldValue) => {
  try {
    const docRef = doc(db, "requests", documentId);
    await updateDoc(docRef, {
      ["status"]: fieldValue,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteRequest = async (documentId, navigation) => {
  try {
    const docRef = doc(db, "requests", documentId);
    await deleteDoc(docRef);
    navigation.navigate("Home")
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
