import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {


  constructor(public chatservice: ChatService) 
  {     
  }
  
  login() 
  {
   this.chatservice.login(); 
  }

  logintui()
  {
    this.chatservice.logintuder();
  }

  logout() 
  {
    this.chatservice.logout();     
  }

}
