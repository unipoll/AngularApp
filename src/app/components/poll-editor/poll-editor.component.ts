import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { PollComponent } from '../poll/poll.component';

@Component({
  selector: 'app-poll-editor',
  templateUrl: './poll-editor.component.html',
  styleUrls: ['./poll-editor.component.scss']
})
export class PollEditorComponent {
  @Input() markdownData: string = 
  `# My Poll
  `;
  @ViewChild('exampleContainer', { read: ViewContainerRef }) exampleContainer!: ViewContainerRef;

  replacePoll(data: string) {
    // Use regex to extract the poll content
    let regexp = /\[poll\](.*?)\[\/poll\]/g;
    return data.replaceAll(regexp, "");
  }

  // Add app-poll component if poll tag is found
  addPollComponent(data: string) {
    // Use regex to extract the poll content
    let regexp = /(?<poll_open>\[poll\])(?<content>.*?)(?<poll_close>\[\/poll\])/g;
    this.exampleContainer.clear();
    let match = data.match(regexp)
    if (match) {
      console.log(match);
      for (let i of match) {
        this.exampleContainer.createComponent(PollComponent);
      }
      // this.markdownData = this.replacePoll(this.markdownData);
    }

  }
}
