import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleChoiceComponent {
  @Input() question!: QuestionModel;
}
