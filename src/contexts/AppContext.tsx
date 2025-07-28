"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
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

interface AppContextType {
  user: User | null;
  posts: Post[];
  recruitmentOpen: boolean;
  login: (username: string) => void;
  logout: () => void;
  addPost: (post: Omit<Post, "id">) => void;
  toggleRecruitment: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialPosts: Post[] = [
  {
    id: "1",
    title: "Welcome to the New KL Radio Hub!",
    content:
      "This is the official new portal for all things KL Radio. Stay tuned for exciting updates, events, and music!",
  },
  {
    id: "2",
    title: "Annual Music Fest Auditions Open",
    content:
      "Dream of performing? Auditions for the annual campus Music Fest are now open. Sign up in the music room before Friday.",
  },
  {
    id: "3",
    title: "Special Guest DJ This Weekend",
    content:
      "Get ready! A renowned guest DJ will be taking over our weekend broadcast. Don't miss out on the electrifying mixes.",
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [recruitmentOpen, setRecruitmentOpen] = useState<boolean>(false);
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

  const addPost = (post: Omit<Post, "id">) => {
    const newPost = { ...post, id: new Date().toISOString() };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const toggleRecruitment = () => {
    setRecruitmentOpen((prev) => !prev);
  };

  const value = {
    user,
    posts,
    recruitmentOpen,
    login,
    logout,
    addPost,
    toggleRecruitment,
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
