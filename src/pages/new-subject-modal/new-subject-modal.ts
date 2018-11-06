import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'page-new-subject-modal',
  templateUrl: 'new-subject-modal.html'
})
export class NewSubjectModalPage {

  validations_form: FormGroup;
  loading: any;
  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.resetFields()
  }

  resetFields(){
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      credits: new FormControl('', Validators.required),
      teacher: new FormControl('', Validators.required)
      //days: new FormControl('', Validators.required)
    });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      name: value.name,
      credits: Number(value.credits),
      teacher: value.teacher,
      days: String(value.days)
    }
    this.firebaseService.createSubject(data)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss();
      }
    )
  }

}
