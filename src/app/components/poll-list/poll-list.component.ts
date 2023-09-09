import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { PollComponent } from '../poll/poll.component';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PollListComponent {

  
}

