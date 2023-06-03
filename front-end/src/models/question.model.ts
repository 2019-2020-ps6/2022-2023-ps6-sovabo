export interface Answer {
    type?: string;
    id?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    label: string;
    answers: Answer[];
}
