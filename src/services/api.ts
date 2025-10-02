// Simulação de API fake com promessas
// Depois só trocamos pelo axios apontando pra Node+Oracle real

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
  profile?: Record<string, string>;
};

let mockDB: User[] = [];
let idCounter = 1;

export const api = {
  signup: async (name: string, email: string, password: string) => {
    const exists = mockDB.find((u) => u.email === email);
    if (exists) throw new Error("Email já cadastrado");

    const newUser: User = {
      id: idCounter++,
      name,
      email,
      password,
      balance: 1000, // saldo inicial fictício
      profile: {},
    };

    mockDB.push(newUser);
    return newUser;
  },

  login: async (email: string, password: string) => {
    const user = mockDB.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Credenciais inválidas");
    return user;
  },

  updateProfile: async (email: string, profile: Record<string, string>) => {
    const user = mockDB.find((u) => u.email === email);
    if (!user) throw new Error("Usuário não encontrado");
    user.profile = profile;
    return user;
  },
};
