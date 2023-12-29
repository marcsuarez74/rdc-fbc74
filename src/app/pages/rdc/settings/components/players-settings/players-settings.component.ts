import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { debounce, debounceTime, Subscription } from "rxjs";

export interface IPlayer {
  name: string;
  score: number;
  selected?: boolean;
  inWaitingList: boolean;
}

@Component({
  selector: 'app-players-settings',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './players-settings.component.html',
  styleUrl: './players-settings.component.scss'
})
export class PlayersSettingsComponent {

  @Output() onAddNewUser: EventEmitter<IPlayer> = new EventEmitter<IPlayer>()

  readonly fb = inject(FormBuilder)

  playersForm: FormControl = new FormControl('' )


  addNewPlayer(): void {
    if (this.playersForm.valid && this.playersForm?.value?.length >= 1) {
      this.onAddNewUser.emit({
        name: this.playersForm.value,
        score: 0,
        selected: false,
        inWaitingList: true,
      });
      this.playersForm.reset();
    }


  }

}
