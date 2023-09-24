import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { QuestionModel } from 'src/app/models/question.model';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleChoiceComponent {
  @Input() question!: QuestionModel;

  constructor(private markdownService: MarkdownService) { }

  setQuestion(question: string) {
    this.question.question = question;
  }

  update() {
    this.markdownService.reload();
  }
}
