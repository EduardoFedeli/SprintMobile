import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
  riskProfile: 'conservador' | 'moderado' | 'agressivo';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  signUp: (name: string, email: string, password: string, riskProfile: User['riskProfile']) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type StoredUser = User & { password: string };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const USERS_KEY = '@MyApp:users';
  const CURRENT_USER_KEY = '@MyApp:user';

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const storedUsersJson = await AsyncStorage.getItem(USERS_KEY);
      const storedUsers: StoredUser[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];

      const foundUser = storedUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        return true;
      }
    } catch (error) {
      console.error('Erro no login:', error);
    }
    return false;
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      setUser(null);
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    riskProfile: User['riskProfile']
  ): Promise<boolean> => {
    try {
      const storedUsersJson = await AsyncStorage.getItem(USERS_KEY);
      const storedUsers: StoredUser[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];

      const alreadyExists = storedUsers.some(u => u.email === email);
      if (alreadyExists) return false;

      const newUser: StoredUser = { name, email, password, riskProfile };
      const updatedUsers = [...storedUsers, newUser];

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      const { password: _, ...userWithoutPassword } = newUser;
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return true;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
