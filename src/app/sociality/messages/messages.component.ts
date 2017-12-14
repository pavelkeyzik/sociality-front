import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../shared/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit {
  private messages;
  private id = "lol";

  constructor(private messagesService: MessagesService) {}

  ngOnInit() {
    this.messagesService.get(this.id).subscribe(data => this.messages = data);
  }
}
