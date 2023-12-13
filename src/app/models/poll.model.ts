import { PolicyModel } from './policy.model';
import { QuestionModel } from './question.model';
import { WorkspaceModel } from './workspace.model';

export interface PollModel {
    id: string;
    name: string;
    description: string;
    workspace: WorkspaceModel;
    published: boolean;
    public: boolean;
    questions: QuestionModel[];
    policies: PolicyModel[];
}


export interface NewPollRequestBody {
    name: string;
    description: string;
    questions: QuestionModel[];
    published: boolean;
    public: boolean;
}

export interface PollListModel {
    polls: PollModel[];
}