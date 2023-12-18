import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-count-field-settings',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './count-field-settings.component.html',
  styleUrl: './count-field-settings.component.scss'
})
export class CountFieldSettingsComponent implements OnInit {
  @Input() field: number | null = 5;
  @Output() onUpdateCountField: EventEmitter<number> = new EventEmitter<number>()

  countFieldFormControl = new FormControl(this.field, [Validators.required]);

  ngOnInit() {
    this.countFieldFormControl.valueChanges.subscribe((value) => {
      if (value) {
        this.onUpdateCountField.emit(value);
      }
    })
  }

}
