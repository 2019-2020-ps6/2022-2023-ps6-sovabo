export interface Answer {
  type?: string;
  id?: string; // Rendre l'identifiant optionnel
  value: string;
  isCorrect: boolean;
}

export interface Question {
  id?: string; // Rendre l'identifiant optionnel
  label: string;
  answers: Answer[];
}
