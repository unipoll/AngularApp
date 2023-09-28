import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SingleChoiceComponent } from './questions/single-choice/single-choice.component';
import { MultipleChoiceComponent } from './questions/multiple-choice/multiple-choice.component';
import { AddQuestionComponent } from '../dialogs/add-question/add-question.component';
import { DialogCancelComponent } from '../dialogs/cancel/cancel.component';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/services/api.service';
import { NewPollRequestBody, PollModel } from 'src/app/models/poll.model';
import { QuestionModel } from 'src/app/models/question.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poll-editor',
  templateUrl: './poll-editor.component.html',
  styleUrls: ['./poll-editor.component.scss']
})
export class PollEditorComponent {
  @ViewChild('pollsContainer', { read: ViewContainerRef }) pollsContainer!: ViewContainerRef;

  polls: ComponentRef<any>[] = [];
  private workspace_id: string;

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
    private workspaceService: WorkspaceService,
    private apiService: ApiService,
  ) {
    // this.workspace = this.workspaceService.getWorkspace();
    this.workspace_id = this.router.getCurrentNavigation()?.extras.state?.['workspace_id'];
    if (!this.workspace_id) {
      console.log("No workspace_id");
      this.location.back();
    }
  }

  addQuestion() {
    const dialogRef = this.dialog.open(AddQuestionComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        switch (result) {
          case "single-choice":
            this.addSingleChoice();
            break;
          case "multiple-choice":
            this.addMultipleChoice();
            break;
        }
      }
    );
  }

  addSingleChoice() {
    const newPoll = this.pollsContainer.createComponent(SingleChoiceComponent)
    this.polls.push(newPoll);
    newPoll.setInput("question_number", this.polls.length);
    newPoll.instance.delete.subscribe((index: number) => {
      this.removePoll(index);
    });
  }

  addMultipleChoice() {
    const newPoll = this.pollsContainer.createComponent(MultipleChoiceComponent)
    this.polls.push(newPoll);
    newPoll.setInput("question_number", this.polls.length);
    newPoll.instance.delete.subscribe((index: number) => {
      this.removePoll(index);
    });
  }

  removePoll(index: number) {
    console.log("Removing poll at index: " + index);
    console.log(this.polls[index]);
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
      published: this.newPollForm.get('published')?.value  as boolean,
      questions: questions,
    };
    // console.log(JSON.stringify(newPoll));

    this.apiService.createPoll(this.workspace_id, newPoll).subscribe(
      (response: PollModel) => {
        console.log(response);
        this.location.back();
      }
    );
  }

  cancel() {
    const dialogRef = this.dialog.open(DialogCancelComponent, {
      data: {
        dialogTitle: "Cancel creating a poll?",
        dialogMessage: "Are you sure you want to cancel creating a poll? All unsaved changes will be lost."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.router.
        this.location.back();
      }
    });
  }

}
