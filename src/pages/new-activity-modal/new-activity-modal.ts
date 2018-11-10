import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'page-new-activity-modal',
  templateUrl: 'new-activity-modal.html',
})
export class NewActivityModalPage {
  
  validations_form: FormGroup;
  loading: any;
  item: any;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
    ) {
      this.loading = this.loadingCtrl.create();
      this.item = viewCtrl.data;
  }

  ionViewWillLoad(){
    this.resetFields()
  }

  resetFields(){
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required)
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      name: value.name,
      value: Number(value.value),
      date: new Date(value.date),
      score: Number(value.score)
    }
    this.firebaseService.createActivity(data,this.item.id)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss();
      }
    )
  }



}
