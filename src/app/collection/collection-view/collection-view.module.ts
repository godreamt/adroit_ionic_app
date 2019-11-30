import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CollectionViewPage } from './collection-view.page';
import { CollectionResolver } from './collection.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: CollectionViewPage,
    resolve: {order: CollectionResolver}
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CollectionViewPage]
})
export class CollectionViewPageModule {}
