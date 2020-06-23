import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
