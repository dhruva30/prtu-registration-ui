import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrtuService } from './../prtu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  mandals = [
    "Bhanswada","Bhiknoor","Bibipet","Bhichkunda","Birkoor","Domakonda",
    "Gandhaari","Jukkal","Kamareddy","Lingampet","Machareddy","Madnoor","Nagireddypet",
    "Nasrullabad","Nizamsagar","Pedda Kodagal","Pitlam","Rajampet","Ramareddy","Sadashivanagar",
    "Tadvai","Yellareddy"
  ]
  selectedMandal = this.mandals[0];
  teacherName = '';
  designation = '';
  membershipNumber = '';
  placeOfWork = '';
  phoneNumber = '';
  errorMessage = "";
  successmessage = "";

  constructor(private service : PrtuService, private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.service.health().subscribe((response) => {
      console.log("Service Up and Running");
    })
  }

  setMandal(event){
    this.selectedMandal = event.target.value;
  }

  validateInputs(){
    if(this.teacherName.trim().length > 0 && this.designation.trim().length > 0
      && this.membershipNumber.trim().length > 0 && this.placeOfWork.trim().length > 0 
      && this.phoneNumber.length === 10){
        return true;
      }
      return false;
  }

  submit(){
    this.spinner.show();
    let inputValid = this.validateInputs();
    if(inputValid){
      this.regsiter();
    }
    else{
      this.spinner.hide();
      this.errorMessage = "Please Check The Input Values"
      setTimeout(() => {
        this.errorMessage = ""
      },5000);
    }
  }

  regsiter(){
    let body = {
      mandal : this.selectedMandal,
      phoneNumber : this.phoneNumber,
      teacherName : this.teacherName,
      designation : this.designation,
      placeOfWork : this.placeOfWork,
      membershipNumber: this.membershipNumber
    }
    this.service.register(body).subscribe((response) => {
      console.log("Registered");
      this.spinner.hide();
      this.successmessage = "Registered Successfully";
      setTimeout(() => {
        this.successmessage = "";
      },5000);
    },(error) => {
      this.spinner.hide();
      this.errorMessage = "Error Occurred, Please Try Again"
      setTimeout(() => {
        this.errorMessage = "";
      },3000);
    });

  }

}
