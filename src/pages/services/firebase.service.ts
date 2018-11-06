import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { dateDataSortValue } from "ionic-angular/umd/util/datetime-util";

@Injectable()
export class FirebaseService {

  /*
  Servicio de Firestore.
  Se manejan todas las funciones para interactuar con la base de datos.
  Hay grupos de funciones CRUD para las diferentes entidades de la bd.
  */
  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}
  
  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }

  //---------------------------------------------------------------------CRUD-ASIGNATURAS-------------------------------------------------------------------------------------
  getSubjects(){//Lista todas las Subject del estudiante que esta loggeado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('users').doc(currentUser.uid).collection('subjects').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  updateSubject(subjectKey, value){//Modificar la asginatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(subjectKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteSubject(subjectKey){//Eliminar asignatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(subjectKey).delete()
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
        teacher: value.teacher,
        days: String(value.days)
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  //-----------------------------------------------------------------FIN-CRUD-ASIGNATURAS-------------------------------------------------------------------------------------

  //---------------------------------------------------------------------CRUD-ACTIVIDADES-------------------------------------------------------------------------------------
  createActivity(value,subjectKey){//Crear una actividad, a la asignatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(subjectKey).collection('activities').add({
        name: value.name,
        value: value.value,
        date: value.date
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteActivity(subjectKey,activityKey){//Eliminar la actividad con id dado de la asignatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(subjectKey).collection('activities').doc(activityKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  updateActivity(value,subjectKey,activityKey){//Actualizar la actividad con id dado de la asignatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(subjectKey).collection('activities').doc(activityKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  getActivities(subjectKey){//Lista todas las Actividades de la Asignatura con id dado
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('users').doc(currentUser.uid).collection('subjects').doc(subjectKey).collection('activities').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

}
