import { Question } from './question.model'
import { StatQuizz } from './quizz.stat.model';

export interface Quiz {
    id: string;
    name: string;
    desc: string;
    theme?: string;
    statQuiz: StatQuizz;
    questions: Question[];

    
}



