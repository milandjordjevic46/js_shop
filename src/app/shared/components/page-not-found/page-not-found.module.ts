import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
