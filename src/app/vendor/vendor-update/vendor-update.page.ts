import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-update',
  templateUrl: './vendor-update.page.html',
  styleUrls: ['./vendor-update.page.scss'],
})
export class VendorUpdatePage implements OnInit {
  form: FormGroup;
  userId: any;
  currentImage: any;
  mainCategory: any[]=[];
  countryList;
  stateList;
  regionList;
  areaList;
  userData;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.userId = this.route.snapshot.params.id;
    

    this.form = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      password: ['1234567'],
      isActive: ['yes', [Validators.required]],
      roles: ['vendors', [Validators.required]],
      monthlySalary: [''],
      salesTarget: [''],
      collectionTarget: [''],
      fatherName: [''],
      motherName: [''],
      alternativeMobileNumber: [''],
      alternativeEmail: [''],
      alternativeAddress: [''],
      panNumber: [''],
      adharNumber: [''],
      drivingLicence: [''],
      dateOfBirth: [null],
      country_id: [''],
      state_id: [''],
      region_id: [''],
      area_id: [''],
      address: [''],
    })

    if(this.userId) {
      this.route.data.subscribe(response => {
        this.userData = response['user'];
        this.processResponse();
        console.log(this.userData);
        
    })
    }

  }

  ngOnInit() {
    this.getCountries();
  }

  processResponse() {
    this.form.patchValue({
      id: this.userData.id,
      firstName:this.userData.firstName,
      lastName:this.userData.lastName,
      email:this.userData.email,
      mobileNumber:this.userData.mobileNumber,
      password:this.userData.password,
      isActive:(this.userData.isActive)?"yes":"no",
      roles:this.userData.roles,
      monthlySalary:this.userData.monthlySalary,
      salesTarget:this.userData.salesTarget,
      collectionTarget:this.userData.collectionTarget,
      country_id:this.userData.country_id,
      state_id:this.userData.state_id,
      region_id:this.userData.region_id,
      area_id:this.userData.area_id,
      address:this.userData.address,
    })

    if(this.userData.extraInfo) {
      this.form.patchValue({
        fatherName:this.userData.extraInfo.fatherName,
        motherName:this.userData.extraInfo.motherName,
        alternativeMobileNumber:this.userData.extraInfo.alternativeMobileNumber,
        alternativeEmail:this.userData.extraInfo.alternativeEmail,
        alternativeAddress:this.userData.extraInfo.alternativeAddress,
        panNumber:this.userData.extraInfo.panNumber,
        adharNumber:this.userData.extraInfo.adharNumber,
        drivingLicence:this.userData.extraInfo.drivingLicence,
        dateOfBirth:this.userData.extraInfo.dateOfBirth,
      })
    }
    if(this.userData.country_id) {
      this.getStates();
    }
    if(this.userData.state_id) {
      this.getRegions();
    }
    if(this.userData.region_id) {
      this.getArea();
    }
  }

  updateUser() {
    this._serv.markFormGroupTouched(this.form);
    
    if(this.form.invalid)return;
    this._serv.url = "user";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      if(this.userId)
        this.router.navigate(['/view-my-vendors/'+this.userId]);
      else 
        this.router.navigate(['/my-vendors']);
    }, error => {
      this.alert.showApiError(error)
    })
  }

  get roles() {
    return this.form.get('roles').value;
  }

  

  getCountries() {
    this._serv.url="countrys";
    this._serv.get().subscribe(response => {
      this.countryList = response;
    })
  }

  getStates() {
    let data = this.form.value;
    this._serv.url = "states?country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.stateList = response;
    })
  }

  getRegions() {
    let data = this.form.value;
    this._serv.url = "regions?country_id="+data.country_id+"&state_id="+data.state_id;
    this._serv.get().subscribe(response => {
      this.regionList = response;
    })
  }


  getArea() {
    let data = this.form.value;
    this._serv.url = "areas?country_id="+data.country_id+"&state_id="+data.state_id+"&region_id="+data.region_id;
    this._serv.get().subscribe(response => {
      this.areaList = response;
    })
  }
}
