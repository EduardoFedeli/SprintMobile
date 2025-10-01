// src/screens/SignUp/StepProfile.tsx

import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Title, RadioButton, Button, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native"; // Para pegar os dados das etapas anteriores
import { useAuth } from "../../contexts/AuthContext"; // Para finalizar o cadastro

interface Question {
  id: string;
  text: string;
  options: { label: string; value: string }[];
}

// A interface StepProfileProps não é mais necessária
// interface StepProfileProps { onFinish: (answers: Record<string, string>) => void; }

const questions: Question[] = [
  // ... (Suas perguntas permanecem as mesmas)
  {
    id: "horizon",
    text: "Por quanto tempo você pretende manter a maioria dos seus investimentos?",
    options: [
      { label: "Menos de 1 ano. (Curto Prazo / Preservação)", value: "curto1" },
      { label: "De 1 a 3 anos. (Curto a Médio Prazo)", value: "curto2" },
      { label: "De 3 a 7 anos. (Médio Prazo)", value: "medio" },
      { label: "Mais de 7 anos. (Longo Prazo / Crescimento)", value: "longo" },
    ],
  },
  {
    id: "riskReaction",
    text: "Como você reagiria se seus investimentos caíssem 20% em 1 ano?",
    options: [
      { label: "Resgataria tudo imediatamente. (Conservador)", value: "conservador" },
      { label: "Ficaria preocupado e reduziria risco. (Moderado)", value: "moderado" },
      { label: "Manteria esperando recuperação. (Arrojado)", value: "arrojado" },
      { label: "Aportaria mais aproveitando preços baixos. (Agressivo)", value: "agressivo" },
    ],
  },
  {
    id: "knowledge",
    text: "Qual seu nível de conhecimento sobre o mercado financeiro?",
    options: [
      { label: "Pouco ou nenhum. (Iniciante/Conservador)", value: "iniciante" },
      { label: "Básico. Conheço conceitos mas não acompanho. (Moderado)", value: "basico" },
      { label: "Médio. Já invisto em ações/FIIs. (Arrojado)", value: "medio" },
      { label: "Avançado. Opero ativos de alto risco. (Agressivo)", value: "avancado" },
    ],
  },
  {
    id: "goal",
    text: "Qual o foco principal do dinheiro investido?",
    options: [
      { label: "Preservar capital e liquidez. (Conservador)", value: "conservador" },
      { label: "Gerar renda estável no médio prazo. (Moderado)", value: "moderado" },
      { label: "Acumular patrimônio no longo prazo. (Arrojado)", value: "arrojado" },
      { label: "Maximizar retorno aceitando alto risco. (Agressivo)", value: "agressivo" },
    ],
  },
  {
    id: "allocation",
    text: "Qual proporção você se sentiria confortável em sua carteira?",
    options: [
      { label: "90% RF / 10% RV ou menos. (Conservador)", value: "90_10" },
      { label: "60% RF / 40% RV. (Moderado)", value: "60_40" },
      { label: "30% RF / 70% RV. (Arrojado)", value: "30_70" },
      { label: "10% RF / 90% RV ou mais. (Agressivo)", value: "10_90" },
    ],
  },
];

const StepProfile: React.FC = ({ navigation }: any) => {
  const { signUp, updateProfile } = useAuth();
  const route = useRoute<any>(); // Para acessar os dados de login
  
  // Coleta os dados essenciais passados pelas rotas anteriores
  const { name, email, password } = route.params || {};

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = questions.every((q) => answers[q.id]);

  // FUNÇÃO DE FINALIZAÇÃO AGORA ESTÁ DENTRO DO COMPONENTE
  const handleFinish = async () => {
    if (!email || !password || !name) {
       Alert.alert("Erro", "Faltam dados essenciais. Por favor, reinicie o cadastro.");
       return;
    }

    const ok = await signUp(name, email, password);
    if (!ok) {
      Alert.alert("Erro", "Email já cadastrado. Faça login ou use outro email.");
      return;
    }
    updateProfile(answers);
    Alert.alert("Sucesso", "Cadastro realizado!");
    
    // Navegação para Home, exatamente como no seu código original
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Seu Perfil de Investidor</Title>
      {questions.map((q) => (
        <View key={q.id} style={styles.block}>
          <Text style={styles.question}>{q.text}</Text>
          <RadioButton.Group
            onValueChange={(val) => handleSelect(q.id, val)}
            value={answers[q.id]}
          >
            {q.options.map((opt, idx) => (
              <View key={idx} style={styles.option}>
                <RadioButton value={opt.value} color="#952FC1" />
                <Text style={styles.optionText}>{opt.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>
      ))}

      <Button
        mode="contained"
        disabled={!allAnswered}
        onPress={handleFinish} // Chama a nova função interna
        style={styles.button}
      >
        Finalizar Cadastro
      </Button>
    </ScrollView>
  );
};

export default StepProfile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F6EEFD",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#952FC1",
  },
  block: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  question: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "600",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  optionText: {
    fontSize: 15,
    flexShrink: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#952FC1",
  },
});