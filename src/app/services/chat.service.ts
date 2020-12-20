import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Aqui vamos a colocar una arreglo de char para no ulitizar async 
  // de firebase  wowowo

  public chats: Mensaje[] = [];

  // Esto ya lo hemos utilizado hay que traer una referencia 
  // para traer los datos de
  private itemDoc: AngularFirestoreCollection<Mensaje>;

  // Vamos a verificar con esta variable que el user is login
  userlog = false;

  datosuserio: any = {}

  constructor(private firedb: AngularFirestore,
              public afAuth: AngularFireAuth) 
  {
    afAuth.authState.subscribe(datosuser => 
      {
        if(datosuser == null)
        {
          console.log('No hay datos');
          this.userlog = false;
        }
        else
        {
          this.userlog = true;

          // Aqui asigno datos de usuario
          
          // eSTO ES PARA VERIFICAR USER EN EL CHAT

          this.datosuserio.nombre = datosuser.displayName;
          this.datosuserio.uid = datosuser.uid;
          console.log('Datos', datosuser);
        }
      })
  }

  login() 
  {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logintuder() 
  {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider);
  }

  logout() 
  {
    this.afAuth.auth.signOut();
  }


  cargarMensajes()
  {  
    // Referencia obligatoria para traer data de firebase
    // OJO con las collection and Documents, it is different
    this.itemDoc = this.firedb.collection<Mensaje>('chats',
      ref=> ref.orderBy('fecha', 'desc')
                .limit(8));

    // Retorno la data de firebase, esto es una promesa
    // lo que significa que hay que susucribirse
    return this.itemDoc.valueChanges()
               .pipe(map((mensajes: Mensaje[])=>{
                  //console.log('AuiSERVCIO',mensajes);
                  // this.chat = mensajes;

                  // Limpio la vatiable por si tiene algo
                  this.chats = [];

                  // Vamos a construir un arrglo
                  // pero para que los ultimos 5 aparescan como un chat ??
                  // Hay varias maneras de hacer esto. esta sol es de Feer
                  for (let mensaje of mensajes) {
                      this.chats.unshift(mensaje);
                  }
      
                  return this.chats;
               }));
  }

  addmessague(messaguenew: string)
  {
    let mensaje: Mensaje = 
    {
      nombre: this.datosuserio.nombre,
      mensaje: messaguenew,
      fecha: new Date().getTime(),
      uid: this.datosuserio.uid
    }

    return this.itemDoc.add(mensaje);
  }
}
