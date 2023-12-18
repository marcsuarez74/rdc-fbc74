import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPlayer } from "@rdc/pages/rdc/settings/components/players-settings/players-settings.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent {
  @Input() playerList: IPlayer[] = [];
  @Input() editMode: boolean = false;


}
