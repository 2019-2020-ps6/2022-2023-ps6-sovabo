import { Question } from './question.model'

export interface Quiz {
    id: string;
    name: string;
    desc: string;
    theme?: string;
    questions: Question[];
}

