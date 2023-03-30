import { Question } from './question.model'

export interface Quiz {
  hovered: boolean| undefined;
    id: string;
    name: string;
    desc: string;
    theme?: string;
    questions: Question[];
}

