
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc,
  setDoc,
  getDoc,
  query,
  orderBy
} from "firebase/firestore";

interface User {
  name: string;
  role: "admin" | "member";
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface Applicant {
  id: string;
  fullName: string;
  regdId: string;
  email: string;
  mobileNumber: string;
  department: string;
  regulation: string;
  wing: string;
  reason: string;
}

interface AppContextType {
  user: User | null;
  posts: Post[];
  recruitmentOpen: boolean;
  applicants: Applicant[];
  login: (username: string) => void;
  logout: () => void;
  addPost: (post: Omit<Post, "id" | "createdAt">) => void;
  deletePost: (postId: string) => void;
  toggleRecruitment: () => void;
  addApplicant: (applicant: Omit<Applicant, "id">) => void;
  deleteApplicant: (applicantId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [recruitmentOpen, setRecruitmentOpen] = useState<boolean>(true);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch recruitment status from Firestore
    const docRef = doc(db, "settings", "recruitment");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setRecruitmentOpen(doc.data().isOpen);
      } else {
        // If the document doesn't exist, create it with a default value
        setDoc(docRef, { isOpen: true });
        setRecruitmentOpen(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch posts from Firestore in real-time
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as Post[];
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    // Fetch applicants from Firestore in real-time
    const q = query(collection(db, "applicants"), orderBy("fullName"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const applicantsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Applicant[];
      setApplicants(applicantsData);
    });
    return () => unsubscribe();
  }, []);


  const login = (username: string) => {
    const role = username.toLowerCase() === "admin" ? "admin" : "member";
    setUser({ name: username, role });
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/");
  };

  const addPost = async (post: Omit<Post, "id" | "createdAt">) => {
    await addDoc(collection(db, "posts"), {
      ...post,
      createdAt: new Date()
    });
  };

  const deletePost = async (postId: string) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  const toggleRecruitment = async () => {
    const docRef = doc(db, "settings", "recruitment");
    const currentStatus = recruitmentOpen;
    // Optimistically update the UI
    setRecruitmentOpen(!currentStatus);
    // Then update Firestore
    try {
        await setDoc(docRef, { isOpen: !currentStatus });
    } catch (error) {
        // If the update fails, revert the UI
        setRecruitmentOpen(currentStatus);
        console.error("Error toggling recruitment status: ", error);
    }
  };
  
  const addApplicant = async (applicant: Omit<Applicant, "id">) => {
    await addDoc(collection(db, "applicants"), applicant);
  };

  const deleteApplicant = async (applicantId: string) => {
    await deleteDoc(doc(db, "applicants", applicantId));
  }

  const value = {
    user,
    posts,
    recruitmentOpen,
    applicants,
    login,
    logout,
    addPost,
    deletePost,
    toggleRecruitment,
    addApplicant,
    deleteApplicant,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
