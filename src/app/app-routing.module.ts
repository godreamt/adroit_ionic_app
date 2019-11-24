import { AuthGaurd } from './shared/services/auth-gaurd.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'home',
    canActivate: [AuthGaurd],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { 
    path: 'purchase-vendor-list', 
    canActivate: [AuthGaurd],
    loadChildren: './purchase/purchase-update/vendor-list/vendor-list.module#VendorListPageModule' 
  },
  { 
    path: 'new-purchase',
    canActivate: [AuthGaurd], 
    loadChildren: './purchase/purchase-update/new-purchase/new-purchase.module#NewPurchasePageModule' 
  },
  { 
    path: 'purchase-list', 
    canActivate: [AuthGaurd],
    loadChildren: './purchase/purchase-list/purchase-list.module#PurchaseListPageModule' 
  },
  { path: 'purchase-view', loadChildren: './purchase/view-purchase/view-purchase.module#ViewPurchasePageModule' },
  { path: 'my-vendors', loadChildren: './vendor/my-vendors/my-vendors.module#MyVendorsPageModule' },
  { path: 'view-my-vendors', loadChildren: './vendor/view-my-vendors/view-my-vendors.module#ViewMyVendorsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
