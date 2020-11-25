import { Component, OnInit } from '@angular/core';
import { PrtuService } from './../prtu.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  email = "";
  password = "";
  isLoggedIn = false;
  success = false;
  mandals = [
    "Bhanswada","Bhiknoor","Bibipet","Bhichkunda","Birkoor","Domakonda",
    "Gandhaari","Jukkal","Kamareddy","Lingampet","Machareddy","Madnoor","Nagireddypet",
    "Nasrullabad","Nizamsagar","Pedda Kodagal","Pitlam","Rajampet","Ramareddy","Sadashivanagar",
    "Tadvai","Yellareddy"
  ]
  selectedMandal = this.mandals[0];
  mandalDetails : any = [];
  exportAsConfig: ExportAsConfig = {
    type: 'csv', 
    elementIdOrContent: 'table'
  }
  constructor(private service : PrtuService,private exportAsService: ExportAsService, private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    
  }

  login(){
    if(this.email === "kanthjapala@gmail.com" && this.password === "samhitha2010"){
      console.log("Logged In");
      this.isLoggedIn = true;
    }
  }

  setMandal(event){
    this.selectedMandal = event.target.value;
    this.success = false;
  }

  getMandalDetails(){
    this.spinner.show();
    this.service.getSingleMandalDetails(this.selectedMandal).subscribe((response) => {
      this.mandalDetails = response;
      this.success = true;
      this.spinner.hide();
    },(error) => {
      this.spinner.hide();
    })
  }

  saveAsCSV(){
    this.exportAsService.save(this.exportAsConfig,this.selectedMandal+"-Details").subscribe((response) => {
      console.log("Successfully Saved");
    })
  }

}
