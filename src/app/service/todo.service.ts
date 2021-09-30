import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { TodoItem } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoCollection: AngularFirestoreCollection = null;
  todo$: Observable<any>;
  currentUserId: string;
  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.auth.user$.subscribe((userData) => {
      this.currentUserId = userData.uid;
    });
    this.todo$ = this.afs.doc(`users/${this.currentUserId}/`).valueChanges();
  }

  getListOfTodos() {
    this.todo$.subscribe((data) => {
      console.log(data);
    });
  }
}
