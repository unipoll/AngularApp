import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { SingleChoiceComponent } from '../questions/single-choice/single-choice.component';
import { MultipleChoiceComponent } from '../questions/multiple-choice/multiple-choice.component';
import { AddQuestionComponent } from '../dialogs/add-question/add-question.component';

@Component({
  selector: 'app-poll-editor',
  templateUrl: './poll-editor.component.html',
  styleUrls: ['./poll-editor.component.scss']
})
export class PollEditorComponent {
  @ViewChild('pollsContainer', { read: ViewContainerRef }) pollsContainer!: ViewContainerRef;

  polls: ComponentRef<any>[] = [];

  constructor(private dialog: MatDialog) { }

  replacePoll(data: string) {
    // Use regex to extract the poll content
    let regexp = /\[poll\](.*?)\[\/poll\]/g;
    return data.replaceAll(regexp, "");
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
    let pollData = [];
    for (let poll of this.polls) {
      pollData.push(poll.instance.getQuestion());
    }
    console.log(JSON.stringify(pollData));
  }

}
