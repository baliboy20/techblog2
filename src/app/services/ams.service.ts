import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {AsyncSubject} from "rxjs/AsyncSubject";
import 'rxjs/add/operator/filter';

 enum MESSAGE_TYPES { DB = "DatabaseServiceRegister"}
export class Message {
  constructor(public data: any, public messageId: number, public clazz?: string){}
}

@Injectable()
export class AmsService {


  private _messageQueue: Subject<Message> = new BehaviorSubject(null);
  private _messageId: number = 1;

  get messageId () {
    return ++ this._messageId;
  }
  constructor() { }

  public send(value: any): number {

    const tkn =  this.newToken(value).messageId;
    this._messageQueue.next( this.newToken(value));
    return tkn;
  }
  public listen(): Observable<Message> {
    return this._messageQueue.filter(a=> a !== null);
  }

  public newToken(data: any): Message {
    return new Message(data, this.messageId);
  }

}
