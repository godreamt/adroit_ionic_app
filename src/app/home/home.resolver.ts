import { DataService } from 'src/app/shared/services/data.service';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class HomeResolver implements Resolve<any> {
  constructor(private _serv: DataService) {}

  resolve(route:ActivatedRouteSnapshot) {
      
    let userId = route.params.id;
    this._serv.url = "sales-executive/stat";
    return this._serv.get();
}
}