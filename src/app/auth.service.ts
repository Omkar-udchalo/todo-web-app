import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pipe, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { User } from './model/user.model';
import { TodoItem } from './model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  todo$: Observable<any>;

  todoItems: TodoItem[] = [];

  todoList: AngularFirestoreCollection<TodoItem>;

  currentUID: string;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: User) => {
        if (user) {
          this.currentUID = user.uid;
          return this.afs.doc<User>(`users/${user.uid}/`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async updateNewTaskData(todoItem: TodoItem) {
    const res = await this.afs
      .collection(`users/${this.currentUID}/todo`)
      .add({ task: todoItem.task, status: todoItem.status })
      .then((data) => {
        console.log('Added Task');
        // this.retriveDataFromFireStore();
      });

    // this.todoItems.splice(0, this.todoItems.length);
    this.retriveDataFromFireStore();
  }

  async deleteItem(docId: string) {
    const res = await this.afs
      .collection(`users/${this.currentUID}/todo`)
      .doc(docId)
      .delete()
      .then((data) => {
        console.log('Successfully Deleted');
      });

    // this.todoItems.splice(0, this.todoItems.length);
    this.retriveDataFromFireStore();
  }

  async retriveDataFromFireStore() {
    // this.todoItems = [];

    this.todoList = this.afs.collection(`users/${this.currentUID}/todo`);
    this.todoList
      .snapshotChanges()
      .pipe(
        take(1),
        map((changes) => {
          this.todoItems.splice(0, this.todoItems.length);
          changes.map((a) => {
            // console.log(a.payload.doc.id, '===>>>', a.payload.doc.data());

            let newTodoItem: TodoItem = a.payload.doc.data();
            newTodoItem.docId = a.payload.doc.id;

            this.todoItems.push(newTodoItem);
          });
        })
      )
      .subscribe((data) => {
        console.log(this.todoItems);
      });
  }

  async updateStatus(todoItem: TodoItem) {
    const res = await this.afs
      .collection(`users/${this.currentUID}/todo`)
      .doc(todoItem.docId)
      .update({ task: todoItem.task, status: todoItem.status })
      .then((data) => {
        // console.log('Successfully Updated Status');
      });
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
