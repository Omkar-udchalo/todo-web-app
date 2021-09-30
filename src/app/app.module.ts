import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import {Font} from 'font-awesome';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRouting } from './app.routing';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TodoItemComponent,
    TodoCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRouting,
    AngularFireModule.initializeApp(environment.config),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
