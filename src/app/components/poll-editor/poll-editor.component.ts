import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { SingleChoiceComponent } from '../questions/single-choice/single-choice.component';
import { MultipleChoiceComponent } from '../questions/multiple-choice/multiple-choice.component';
import { AddQuestionComponent } from '../dialogs/add-question/add-question.component';
import { DialogCancelComponent } from '../dialogs/cancel/cancel.component';


@Component({
  selector: 'app-poll-editor',
  templateUrl: './poll-editor.component.html',
  styleUrls: ['./poll-editor.component.scss']
})
export class PollEditorComponent {
  @ViewChild('pollsContainer', { read: ViewContainerRef }) pollsContainer!: ViewContainerRef;

  polls: ComponentRef<any>[] = [];
  
  constructor(private dialog: MatDialog, private router: Router,
    private location: Location) { }

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
    let pollData = [];
    for (let poll of this.polls) {
      poll.instance.questionForm.markAllAsTouched();
      // poll.instance.questionForm.updateValueAndValidity();
      if (poll.instance.questionForm.invalid) {
        console.log("Invalid form");
        return;
      }
      pollData.push(poll.instance.getQuestion());
    }
    console.log(JSON.stringify(pollData));
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
