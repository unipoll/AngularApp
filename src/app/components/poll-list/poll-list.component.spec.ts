import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollListComponent } from './poll-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

import { WorkspaceModel } from 'src/app/models/workspace.model';
import { PollModel } from 'src/app/models/poll.model';
import { QuestionModel } from 'src/app/models/question.model';


let mockWorkspace: WorkspaceModel = {
  id: "1a2b3c4d5e6f7g8h9i0j",
  name: "Mock Workspace",
  description: "Mock Workspace Description",
  members: [],
  groups: [],
  policies: [],
  polls: []
}

let mockQuestion: QuestionModel = {
  id: 1,
  question_type: "single-choice",
  question: "Mock Question",
  options: ["option1", "option2", "option3"],
  correct_answer: [1],
}

let mockPoll: PollModel = {
  id: "1a2b3c4d5e6f7g8h9i0j",
  name: "Mock Poll",
  description:"Mock Poll Description",
  workspace: mockWorkspace,
  public: true,
  published: false,
  questions: [mockQuestion]
}

describe('PollListComponent', () => {
  let component: PollListComponent;
  let fixture: ComponentFixture<PollListComponent>;
  let pollList = [mockPoll];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [PollListComponent]
    });
    fixture = TestBed.createComponent(PollListComponent);
    component = fixture.componentInstance;
    component.workspace = mockWorkspace;
    component.pollList = pollList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
