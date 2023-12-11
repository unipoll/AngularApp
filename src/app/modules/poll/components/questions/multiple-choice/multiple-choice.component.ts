import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChoiceComponent {
  @Input() question!: QuestionModel;
}
