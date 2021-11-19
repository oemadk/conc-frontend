import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class StorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  ngOnDestroy() {
    this.stop();
  }

  public getStorage() {
    let s = [];
    for (let i = 0; i < localStorage.length; i++) {
      // @ts-ignore
      s.push({
        key: localStorage.key(i),
        // @ts-ignore
        value: JSON.parse(localStorage.getItem(localStorage.key(i)))
      });
    }
    return s;
  }

  public store(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    // the local application doesn't seem to catch changes to localStorage...
    // @ts-ignore
    this.onSubject.next({key, value: data});
  }

  public clear(key: string) {
    localStorage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({key, value: null});
  }


  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    // tslint:disable-next-line:triple-equals
    if (event.storageArea == localStorage) {
      let v;
      try {
        if (event.newValue != null) {
          v = JSON.parse(event.newValue);
        }
      } catch (e) {
        v = event.newValue;
      }
      // @ts-ignore
      this.onSubject.next({key: event.key, value: v});
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
