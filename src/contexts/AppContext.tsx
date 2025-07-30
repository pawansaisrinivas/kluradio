
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
  loading: boolean; // Global loading state
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
  const [recruitmentOpen, setRecruitmentOpen] = useState(false); // Default to false
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const recruitmentRef = doc(db, "settings", "recruitment");
    
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const applicantsQuery = query(collection(db, "applicants"), orderBy("fullName"));

    const unsubRecruitment = onSnapshot(recruitmentRef, (doc) => {
      if (doc.exists()) {
        setRecruitmentOpen(doc.data().isOpen);
      } else {
        setDoc(recruitmentRef, { isOpen: false });
        setRecruitmentOpen(false);
      }
    });

    const unsubPosts = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as Post[];
      setPosts(postsData);
    });
    
    const unsubApplicants = onSnapshot(applicantsQuery, (snapshot) => {
      const applicantsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Applicant[];
      setApplicants(applicantsData);
    });

    // We can consider loading finished once we get the first snapshot of all data.
    // For simplicity, we'll just use a timeout to give Firestore a moment to load.
    // A more robust solution might use Promise.all with getDocs initially.
    const timer = setTimeout(() => setLoading(false), 1500); // Give it 1.5s to load everything


    return () => {
      unsubRecruitment();
      unsubPosts();
      unsubApplicants();
      clearTimeout(timer);
    };
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
    await setDoc(docRef, { isOpen: !recruitmentOpen });
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
    loading,
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
