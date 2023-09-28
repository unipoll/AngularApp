export interface QuestionModel {
    id: number;
    question_type: string;
    question: string;
    options: string[];
    correct_answer: number[];
}