import { Component } from '@angular/core';
import { MessageService, Message } from 'primeng/api';

@Component({
  templateUrl: './messages.component.html'
})
export class MessagesComponent {

  messages: Message[];

  constructor(private messageService: MessageService) {}

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
