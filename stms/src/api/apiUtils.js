import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const apiCalls = {};

const usersCollection = collection(db, "users");

apiCalls.getAllUsers = async () => {
  try {
    const users = await getDocs(usersCollection);
    const usersList = users.docs.map((user) => ({
      ...user.data(),
      id: user.id,
    }));
    return usersList;
  } catch (error) {
    return { error };
  }
};

apiCalls.getUser = async (id) => {
  try {
    const q = query(usersCollection, where("id", "==", id));
    const user = await getDocs(q);
    return { ...user.data(), id: user.id };
  } catch (error) {
    return { error };
  }
};

apiCalls.logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return { error };
  }
};

apiCalls.createUser = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res?.user;
    return user;
  } catch (error) {
    console.error(error.message);
  }
};

apiCalls.logOut = async () => {
  signOut(auth).catch((error) => {
    console.error(error);
  });
};

apiCalls.addUserInfo = async (data) => {
  try {
    const newUser = await addDoc(usersCollection, data);
    if (newUser.id) {
      return { id: newUser.id };
    }
  } catch (error) {
    return { error };
  }
};

export default apiCalls;
