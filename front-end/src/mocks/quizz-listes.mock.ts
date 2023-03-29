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

export const QUESTION_US: Question = {
    id: '2',
    label: 'Qui était le président des États-Unis en 2020 ?',
    answers: [
        {
            value: 'Joe Biden',
            isCorrect: false,
        },
        {
            value: 'Barack Obama',
            isCorrect: false,
        },
        {
            value: 'Donald Trump',
            isCorrect: true,
        },
        {
            value: 'George W. Bush',
            isCorrect: false,
        }
    ]
};

export const QUESTION_FR: Question = {
    id: '2',
    label: 'Qui est la présdient de popo actuellement ?',
    answers: [
        {
            value: 'Joe Biden',
            isCorrect: false,
        },
        {
            value: 'Barack Obama',
            isCorrect: false,
        },
        {
            value: 'CAMINADA',
            isCorrect: true,
        },
        {
            value: 'George W. Bush',
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
      questions: [QUESTION_ACTOR, QUESTION_US],
    },
    {
      id: '2',
      name: 'Les films',
      theme: 'Cinema',
      desc: 'Les bons films beaufs des années 80, on les aime',
        questions: [],
    }, {
      id: '3',
      name: 'Les Aliments',
      theme: 'Vie quotidienne',
      desc:'Quel est le poids de cet aliment ? Un quizz assez sympa à faire en famille',
      questions: [],
    }

];

