import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, skipWhile } from "rxjs";

@Component({
  selector: 'app-match-time-settings',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './match-time-settings.component.html',
  styleUrl: './match-time-settings.component.scss'
})
export class MatchTimeSettingsComponent implements OnInit {
  @Input() time: number = 300

  @Output() onUpdateMatchTime: EventEmitter<number> = new EventEmitter<number>();
  matchTimeFormControl = new FormControl(this.convertTimeInString(this.time));

  ngOnInit() {
    this.matchTimeFormControl.valueChanges.pipe(
      skipWhile(v => !v),
      debounceTime(500)
    ).subscribe((value) => {
      if (value) {
        this.convertInSecond(value)
      }
    })
  }

  convertTimeInString(value: number): string {
    const min = value / 60;
    const sec = value - min * 60;
    return `${ min < 10 ? '0'+ min : min }:${sec < 10 ? '0'+ sec : sec}`;

  }

  convertInSecond(duration: string): void {
    const min = Number(duration.split(':')[0]) * 60;
    const sec = Number(duration.split(':')[1]);
    const timeInSecond = min + sec

    this.onUpdateMatchTime.emit(timeInSecond)

  }

}
