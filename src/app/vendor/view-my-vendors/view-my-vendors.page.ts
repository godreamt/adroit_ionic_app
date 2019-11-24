import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-view-my-vendors',
  templateUrl: './view-my-vendors.page.html',
  styleUrls: ['./view-my-vendors.page.scss'],
})
export class ViewMyVendorsPage implements OnInit {
  vendorData;
  constructor(private route: ActivatedRoute, private router: Router, private _serv:DataService) { 
    this.route.data.subscribe(data => {
      this.vendorData = data['vendor'];
    })
  }

  ngOnInit() {
  }

}
