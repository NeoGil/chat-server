import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [
    { id: 1, name: 'Marius', text: 'heyooo', isRead: false },
  ];
  clientToUser = {};

  indentify(name: string, clientId: string) {
    if (Object.keys(this.clientToUser).includes(clientId)) {
      return Object.values(this.clientToUser);
    } else {
      if (Object.values(this.clientToUser).length === 2) {
        throw new Error('The room is full');
      } else {
        this.clientToUser[clientId] = name;
      }
      return Object.values(this.clientToUser);
    }
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clinetId: string) {
    const maxId =
      this.messages.reduce(
        (max, message) => (message.id > max ? message.id : max),
        0,
      ) + 1;
    const message = {
      id: maxId,
      name: this.clientToUser[clinetId],
      text: createMessageDto.text,
      isRead: false,
    };
    this.messages.push(message);
    return message;
  }

  delete(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }

  read(id: number) {
    const message = this.messages.find((message) => message.id === id);
    if (message) {
      message.isRead = true;
    }
  }

  findAll() {
    return this.messages;
  }
}
