
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  role: "admin" | "member";
}

interface Post {
  id: string;
  title: string;
  content: string;
}

export interface Applicant {
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
  addPost: (post: Omit<Post, "id">) => void;
  deletePost: (postId: string) => void;
  toggleRecruitment: () => void;
  addApplicant: (applicant: Omit<Applicant, 'otherDepartment'>) => void;
  deleteApplicant: (regdId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialPosts: Post[] = [
  {
    id: "1",
    title: "B.Tech. EEE (VLSI Design and Technology) in collaboration with TESSOLVE",
    content:
      "KL Deemed to be University, in collaboration with TESSOLVE, offers a B.Tech. program in EEE (VLSI Design and Technology).",
  },
  {
    id: "2",
    title: "NIRF Ranking 2023",
    content:
      "KLU has been ranked 28th among all public and private universities in India by the NIRF Ranking 2023.",
  },
  {
    id: "3",
    title: "KL University Admission 2024",
    content:
      "Admissions are open for the academic year 2024. Apply now for various undergraduate and postgraduate programs.",
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [recruitmentOpen, setRecruitmentOpen] = useState<boolean>(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
        const storedPosts = localStorage.getItem("klradio-posts");
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        } else {
            setPosts(initialPosts);
        }

        const storedApplicants = localStorage.getItem("klradio-applicants");
        if (storedApplicants) {
            setApplicants(JSON.parse(storedApplicants));
        }

        const storedRecruitmentStatus = localStorage.getItem("klradio-recruitment-open");
        if (storedRecruitmentStatus) {
            setRecruitmentOpen(JSON.parse(storedRecruitmentStatus));
        }
    } catch (error) {
        console.error("Failed to parse from localStorage", error);
        setPosts(initialPosts);
    }
  }, []);
  
  useEffect(() => {
    try {
        localStorage.setItem("klradio-posts", JSON.stringify(posts));
    } catch (error) {
        console.error("Failed to save posts to localStorage", error);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem("klradio-applicants", JSON.stringify(applicants));
    } catch (error) {
        console.error("Failed to save applicants to localStorage", error);
    }
  }, [applicants]);

  useEffect(() => {
    try {
      localStorage.setItem("klradio-recruitment-open", JSON.stringify(recruitmentOpen));
    } catch (error) {
        console.error("Failed to save recruitment status to localStorage", error);
    }
  }, [recruitmentOpen]);


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

  const addPost = (post: Omit<Post, "id">) => {
    const newPost = { ...post, id: new Date().toISOString() };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const deletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const toggleRecruitment = () => {
    setRecruitmentOpen((prev) => !prev);
  };
  
  const addApplicant = (applicant: Applicant) => {
    setApplicants((prevApplicants) => [...prevApplicants, applicant]);
  };

  const deleteApplicant = (regdId: string) => {
    setApplicants((prevApplicants) => prevApplicants.filter((applicant) => applicant.regdId !== regdId));
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
