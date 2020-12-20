import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Mensaje } from 'src/app/interfaces/mensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit 
{

  mensaje: string = '';
  chats: Mensaje [] = [];

  // Este elemnto sirve para controlar el scroll
  elemento: any;

  constructor(public chatservice: ChatService)
  {
    this.chatservice.cargarMensajes().subscribe((datos: Mensaje [] )=>{
      //.log('Datos', datos);
      this.chats = datos;
      
      // Aqui espera a que se renderiza la data, para mover el scroll
      setTimeout(()=> {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20)
    })
  }

  ngOnInit() 
  {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje()
  {
    console.log(this.mensaje);

    // Verificamos que el mensaje no este vacio
    if(this.mensaje.length > 0)
    {
      this.chatservice.addmessague(this.mensaje)
          .then(()=> this.mensaje = '');
    }
    
  }
}
