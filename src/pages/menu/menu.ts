import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { NewSubjectModalPage } from '../new-subject-modal/new-subject-modal';
import { DetailsPage } from '../details/details';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {

  items: Array<any>;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) {}

  ionViewWillEnter(){
    this.getData();
  }

  getData(){
    this.firebaseService.getSubjects()
    .then(tasks => {
      this.items = tasks;
    })
  }

  viewDetails(id, item){
    // debugger
    let data = {
      name: item.name,
      credits: Number(item.credits),
      teacher: item.teacher,
      id: id
    }
    this.navCtrl.push(DetailsPage, {
      data: data
    })
  }

  openNewUserModal(){
    let modal = this.modalCtrl.create(NewSubjectModalPage);
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.navCtrl.push(LoginPage);
    })
  }

}
