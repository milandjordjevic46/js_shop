import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
