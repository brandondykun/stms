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
const joinCodeCollection = collection(db, "joinCode");

apiCalls.getAllUsers = async () => {
  try {
    const users = await getDocs(usersCollection);
    const usersList = users.docs.map((user) => ({
      ...user.data(),
      id: user.id,
    }));
    return { status: 200, data: usersList };
  } catch (error) {
    return { status: 400, error };
  }
};

apiCalls.getUser = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    const user = await getDoc(docRef);
    if (user.exists()) {
      return { found: true, data: { ...user.data(), id: user.id } };
    } else {
      return { found: false, error: "That user does not exist." };
    }
  } catch (error) {
    return { error };
  }
};

apiCalls.getAccountByUserId = async (id) => {
  try {
    const q = query(usersCollection, where("user_id", "==", id));
    const user = await getDocs(q);
    const userList = user.docs.map((user) => ({
      ...user.data(),
      id: user.id,
    }));

    if (userList[0]) {
      const foundUser = userList[0];
      return { found: true, data: { ...foundUser } };
    } else {
      return { found: false, error: "That user does not exist." };
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
    return { status: 200, data: userCredential.user };
  } catch (error) {
    return { status: 400, error: error.message };
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

apiCalls.getCurrentJoinCode = async () => {
  try {
    const codes = await getDocs(joinCodeCollection);
    const codeList = codes.docs.map((item) => ({
      ...item.data(),
    }));
    if (codeList.length > 0) {
      const code = codeList[0];
      return { status: 200, data: code };
    } else {
      return {
        status: 400,
        data: null,
        error: "There was a problem with the join code.",
      };
    }
  } catch (error) {
    return { status: 400, data: null, error: error.message };
  }
};

apiCalls.addUserInfo = async (data) => {
  try {
    const newUser = await addDoc(usersCollection, data);
    if (newUser.id) {
      return { status: 201, id: newUser.id };
    } else {
      return {
        status: 400,
        error: "There was a problem adding your info. Please try again.",
      };
    }
  } catch (error) {
    return { status: 500, error };
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
