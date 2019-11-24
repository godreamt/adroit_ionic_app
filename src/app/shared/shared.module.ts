import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule
  ]
})
export class SharedModule { }
