export interface StatQuizz {
    idQuizz: string;
    nbClicks: number[];
    timeResponses: number[];
    nameQuizz?: string;
    correctResponses: boolean[];
}