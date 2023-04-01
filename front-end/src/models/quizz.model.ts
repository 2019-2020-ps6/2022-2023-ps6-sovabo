import { Question } from './question.model'
import { StatQuizz } from './quizz.stat.model';

export interface Quiz {
  hovered: boolean| undefined;
    id: string;
    name: string;
    desc: string;
    theme?: string;
    statQuiz: StatQuizz;
    questions: Question[];
    difficulty: number;
}



