import { Component, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { QuestionModel } from "src/app/models/question.model";
import { SingleChoiceComponent } from "../questions/single-choice/single-choice.component";
import { MultipleChoiceComponent } from "../questions/multiple-choice/multiple-choice.component";



@Component({
    selector: 'app-poll-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
  })
  export class QuestionComponent implements OnInit {

    @Input() question!: QuestionModel;

    @ViewChild('questionContainer', {static: true, read: ViewContainerRef}) questionContainer!: ViewContainerRef;

    ngOnInit(): void {
        this.createQuestionComponent();
    }

    createQuestionComponent() {
        const viewContainerRef = this.questionContainer;
        let componentRef;

        switch (this.question.question_type) {
            case 'single-choice':
                componentRef = viewContainerRef.createComponent(SingleChoiceComponent);
                componentRef.instance.question = this.question;
                break;
            case 'multiple-choice':
                componentRef = viewContainerRef.createComponent(MultipleChoiceComponent);
                componentRef.instance.question = this.question;
                break;
        }
    };
}