import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatProgressBarModule,
    MatDatepickerModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatProgressBarModule,
    MatDatepickerModule
  ],
  declarations: []
})
export class MaterialModule { }
