import { Quiz } from '../models/quizz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    id: '1',
    label: 'Quel est le président actuel de la France ?',
    answers: [
        {
            value: 'Francis Ngannou',
            isCorrect: false,
        },
        {
            value: 'Stevie Wonder',
            isCorrect: false,
        },
        {
            value: 'Emmanuel Macron',
            isCorrect: true,
        },
        {
            value: 'Vladimir Poutine',
            isCorrect: false,
        }
    ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les présidents', // What's happening if I change this value..?
        theme: 'President',
        desc: 'Vous allez pouvoir tester vos connaissances sur les présidents actuels du monde !',
        questions: [QUESTION_ACTOR],
    },
    {
        id: '2',
        name: 'Les films',
        desc:'Les bons films beaufs des années 80, on les aime',
        questions: [],
    }, {
        id: '3',
        name: 'Les Aliments',
        desc:'Quel est le poids de cet aliment ? Un quizz assez sympa à faire en famille',
        questions: [],
    }
    
];

