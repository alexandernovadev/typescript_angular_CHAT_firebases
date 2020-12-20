import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule,FirestoreSettingsToken  } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} }
    // Esta linea es nueva =??? siginifica que usara firebasde una
    // configuracion por defecto
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
