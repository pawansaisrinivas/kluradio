
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc,
  setDoc,
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
  login: (username: string) => void;
  logout: () => void;
  addPost: (post: Omit<Post, "id" | "createdAt">) => void;
  deletePost: (postId: string) => void;
  toggleRecruitment: (currentStatus: boolean) => void;
  addApplicant: (applicant: Omit<Applicant, "id">) => void;
  deleteApplicant: (applicantId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

  const toggleRecruitment = async (currentStatus: boolean) => {
    const docRef = doc(db, "settings", "recruitment");
    await setDoc(docRef, { isOpen: !currentStatus });
  };
  
  const addApplicant = async (applicant: Omit<Applicant, "id">) => {
    await addDoc(collection(db, "applicants"), applicant);
  };

  const deleteApplicant = async (applicantId: string) => {
    await deleteDoc(doc(db, "applicants", applicantId));
  }

  const value = {
    user,
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
