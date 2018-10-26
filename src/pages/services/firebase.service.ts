import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FirebaseService {

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}

  /**
   * Funciones de CRUD para Subject
   */
  //++++++++++++++++++ASIGNATURAS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getSubjects(){//Lista todas las Subject del estudiante que esta loggeado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('users').doc(currentUser.uid).collection('subjects').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateSubject(taskKey, value){//Modificar la asginatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteSubject(taskKey){//Eliminar asignatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createSubject(value){//Crear una asignatura
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').add({
        name: value.name,
        credits: Number(value.credits),
        teacher: value.teacher
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  //++++++++++++++++++FIN-------ASIGNATURAS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
