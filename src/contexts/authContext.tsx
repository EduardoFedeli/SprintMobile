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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao iniciar app, tenta recuperar usuário salvo
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem('@MyApp:user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simula autenticação, aqui vc pode integrar backend real
    if (email && password) {
      const fakeUser = {
        name: 'Usuário de Exemplo',
        email,
        riskProfile: 'moderado' as User['riskProfile']
      };
      await AsyncStorage.setItem('@MyApp:user', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@MyApp:user');
    setUser(null);
  };

  const signUp = async (name: string, email: string, password: string, riskProfile: User['riskProfile']) => {
    // Simula cadastro
    if (name && email && password) {
      const newUser = { name, email, riskProfile };
      await AsyncStorage.setItem('@MyApp:user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
