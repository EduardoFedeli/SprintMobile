import React, { createContext, useState, useContext, ReactNode } from "react";
import { api, User as ApiUser } from "../services/api";

export type Profile = Record<string, string>;

export type User = ApiUser;

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (profile: Profile) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const newUser = await api.signup(name, email, password);
      setUser(newUser);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const logged = await api.login(email, password);
      setUser(logged);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profile: Profile) => {
    if (!user) return;
    try {
      const updated = await api.updateProfile(user.email, profile);
      setUser(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
};
