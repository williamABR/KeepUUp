import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { NewActivityModalPage } from '../new-activity-modal/new-activity-modal';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  validations_form: FormGroup;
  item: any;
  loading: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    this.item = this.navParams.get('data');
    this.validations_form = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    credits: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required)
    });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      name: value.name,
      credits: Number(value.credits),
      teacher: value.teacher
    }
    this.firebaseService.updateSubject(this.item.id,data)
    .then(
      res => {
        this.viewCtrl.dismiss();
      }
    )
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Quieres eliminar ' + this.item.name + '?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Si',
          handler: () => {
            this.firebaseService.deleteSubject(this.item.id)
            .then(
              res => this.viewCtrl.dismiss(),
              err => console.log(err)
            )
          }
        }
      ]
    });
    confirm.present();
  }

  openNewActivityModal(){
    let modal = this.modalCtrl.create(NewActivityModalPage, { id: this.item.id });
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }
}
