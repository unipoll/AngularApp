import { Component, ComponentFactory, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SingleChoiceComponent } from '../questions/single-choice/single-choice.component';
import { MultipleChoiceComponent } from '../questions/multiple-choice/multiple-choice.component';
import { DialogAddQuestionComponent } from '../dialog-add-question/dialog-add-question.component';
import { DialogExitComponent } from '../dialog-exit/dialog-exit.component';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/core/services/api.service';
import { NewPollRequestBody, PollModel } from 'src/app/models/poll.model';
import { QuestionModel } from 'src/app/models/question.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snackbar.service';


@Component({
    selector: 'app-poll-editor',
    templateUrl: './poll-editor.component.html',
    styleUrls: ['./poll-editor.component.scss']
})
export class PollEditorComponent {
    @ViewChild('pollsContainer', { read: ViewContainerRef }) pollsContainer!: ViewContainerRef;

    @Input() workspace_id!: string;
    @Input() poll_id!: string;

    polls: ComponentRef<any>[] = [];

    newPollForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
        public: new FormControl(false, Validators.required),
        published: new FormControl(false, Validators.required),
    });

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private location: Location,
        private apiService: ApiService,
        private snackBar: SnackBarService
    ) { }

    ngOnInit(): void {
        this.apiService.getPoll(this.poll_id, true, false).subscribe(
            (response: PollModel) => {
                console.log(response);
                this.newPollForm.get('name')?.setValue(response.name);
                this.newPollForm.get('description')?.setValue(response.description);
                this.newPollForm.get('public')?.setValue(response.public);
                this.newPollForm.get('published')?.setValue(response.published);
                for (let question of response.questions) {
                    this.addQuestion(question.question_type, question);
                }
            }
        );
    }

    addQuestionDialog() {
        const dialogRef = this.dialog.open(DialogAddQuestionComponent);
        dialogRef.afterClosed().subscribe(
            (result) => {
                if (result) {
                    this.addQuestion(result);
                }
            }
        );
    }

    addQuestion(question_type: string, question?: QuestionModel) {
        let newPoll: ComponentRef<any>;
        switch (question_type) {
            case "single-choice":
                newPoll = this.addSingleChoice();
                break;
            case "multiple-choice":
                newPoll = this.addMultipleChoice();
                break;
            default:
                console.log("Unknown question type");
                return;
        }
        this.polls.push(newPoll);
        newPoll.setInput("question_number", this.polls.length);
        if (question){
            newPoll.instance.setQuestion(question);
        }
        newPoll.instance.delete.subscribe((index: number) => {
            this.removePoll(index);
        });
    }

    addSingleChoice(): ComponentRef<any> {
        return this.pollsContainer.createComponent(SingleChoiceComponent)
    }

    addMultipleChoice(): ComponentRef<any> {
        return this.pollsContainer.createComponent(MultipleChoiceComponent);
    }

    removePoll(index: number) {
        // Remove the poll from the array
        this.polls[index].destroy();
        this.polls.splice(index, 1);
        // Update the question numbers
        for (let i = index; i < this.polls.length; i++) {
            this.polls[i].instance.question_number = i + 1;
        }
    }

    savePoll() {
        if (this.polls.length == 0) {
            console.log("No polls");
            return;
        }
        let newPoll: NewPollRequestBody;
        let questions: QuestionModel[] = [];
        for (let poll of this.polls) {
            poll.instance.questionForm.markAllAsTouched();
            // poll.instance.questionForm.updateValueAndValidity();
            if (poll.instance.questionForm.invalid) {
                console.log("Invalid form");
                return;
            }
            questions.push(poll.instance.getQuestion());
        }
        newPoll = {
            name: this.newPollForm.get('name')?.value as string,
            description: this.newPollForm.get('description')?.value as string,
            public: this.newPollForm.get('public')?.value as boolean,
            published: this.newPollForm.get('published')?.value as boolean,
            questions: questions,
        };
        console.log(newPoll);

        this.apiService.updatePoll(this.poll_id, newPoll).subscribe(
            (response: PollModel) => {
                console.log(response);
                // this.location.back();
            }
        );

        // this.apiService.up
    }

    cancel() {
        const dialogRef = this.dialog.open(DialogExitComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.location.back();
            }
        });
    }

}
