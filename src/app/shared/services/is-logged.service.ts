import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class IsLoggedService {
  abstract setLogged(logged: boolean);
  abstract getLogged(): Observable<boolean>;
}

@Injectable()
export class IsLoggedServiceImpl implements IsLoggedService {
  constructor() {}

  isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  setLogged(logged: boolean) {
    this.isLogged.next(logged);
  }

  getLogged() {
    return this.isLogged.asObservable();
  }
}
