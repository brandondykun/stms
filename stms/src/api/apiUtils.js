import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const apiCalls = {};

const usersCollection = collection(db, "users");
const commentsCollection = collection(db, "comments");

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
    const docRef = doc(db, "users", id);
    const user = await getDoc(docRef);
    if (user.exists()) {
      return { ...user.data(), id: user.id };
    } else {
      return { error: "That user does not exist." };
    }
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

apiCalls.editUserInfo = async (id, data) => {
  try {
    const userRef = doc(db, "users", id);
    const res = await updateDoc(userRef, data);
    return { status: 200 };
  } catch (error) {
    return { status: 400, error };
  }
};

apiCalls.getComments = async (id) => {
  try {
    const q = query(commentsCollection, where("user_id", "==", id));
    const comments = await getDocs(q);
    const commentsList = comments.docs.map((comment) => ({
      ...comment.data(),
      id: comment.id,
    }));
    return commentsList;
  } catch (error) {
    return { error };
  }
};

apiCalls.addComment = async (data) => {
  try {
    const newComment = await addDoc(commentsCollection, data);
    if (newComment.id) {
      return { status: 201 };
    }
  } catch (error) {
    return { error };
  }
};

apiCalls.getComment = async (id) => {
  try {
    const docRef = doc(db, "comments", id);
    const comment = await getDoc(docRef);
    if (comment.exists()) {
      return { ...comment.data(), id: comment.id };
    }
  } catch (error) {
    return { error };
  }
};

apiCalls.editComment = async (id, data) => {
  try {
    const commentRef = doc(db, "comments", id);
    const res = await updateDoc(commentRef, data);
    return { status: 200, data: res };
  } catch (error) {
    return { status: 400, error };
  }
};

export default apiCalls;
