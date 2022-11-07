import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, InfiniteScrollModule, ReactiveFormsModule],
  exports: [CommonModule, InfiniteScrollModule, ReactiveFormsModule],
  providers: [],
})
export class SharedModule {}
