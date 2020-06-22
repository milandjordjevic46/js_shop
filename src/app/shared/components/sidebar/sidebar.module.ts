import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
