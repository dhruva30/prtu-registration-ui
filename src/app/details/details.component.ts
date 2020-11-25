import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrtuService } from './../prtu.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  mandals = [
    "Bhanswada","Bhiknoor","Bibipet","Bhichkunda","Birkoor","Domakonda",
    "Gandhaari","Jukkal","Kamareddy","Lingampet","Machareddy","Madnoor","Nagireddypet",
    "Nasrullabad","Nizamsagar","Pedda Kodagal","Pitlam","Rajampet","Ramareddy","Sadashivanagar",
    "Tadvai","Yellareddy"
  ];

  mandalDetails : any = [];
  total = 0;

  constructor(private service : PrtuService, private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    let body = {
      mandals : this.mandals
    }
    this.service.getMandalDetails(body).subscribe((response) => {
      this.constructMandalDetails(response);
      this.spinner.hide();
    })
    
  }

  constructMandalDetails(response){
    let keys = Object.keys(response);
    for(let i=0;i<keys.length;i++){
      let obj = {};
      obj["Mandal"] = keys[i];
      obj["Registered_Teachers"] = response[keys[i]].length
      this.total += (+response[keys[i]].length);
      this.mandalDetails.push(obj);
    }
  }

}
