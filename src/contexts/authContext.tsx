import React, { createContext, useState, useContext, ReactNode } from "react";

export type Profile = Record<string, string>;

export type User = {
  name: string;
  email: string;
  password: string;
  profile?: Profile;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (profile: Profile) => void;
  logout: () => void;
};


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Usuários registrados (simulação local; troque por API/DB se necessário)
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const signUp = async (name: string, email: string, password: string) => {
    // retorna false se email já cadastrado
    const exists = registeredUsers.some((u) => u.email === email);
    if (exists) return false;

    const newUser: User = { name, email, password, profile: {} };
    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const found = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    // simula um pequeno delay (opcional)
    // await new Promise((r) => setTimeout(r, 300));
    setLoading(false);

    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const updateProfile = (profile: Profile) => {
    if (!user) return;
    const updated: User = { ...user, profile };
    setUser(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.email === user.email ? updated : u))
    );
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

// Hook utilitário — use isso em telas para evitar problemas de tipagem
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return ctx;
};
