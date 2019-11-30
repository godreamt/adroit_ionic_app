import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpenseViewPage } from './expense-view.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: ':id',
    component: ExpenseViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ExpenseViewPage]
})
export class ExpenseViewPageModule {}
