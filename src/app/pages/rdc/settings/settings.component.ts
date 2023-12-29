import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  IPlayer,
  PlayersSettingsComponent
} from "@rdc/pages/rdc/settings/components/players-settings/players-settings.component";
import { PlayersListComponent } from "@rdc/pages/rdc/settings/components/players-list/players-list.component";
import {
  CountFieldSettingsComponent
} from "@rdc/pages/rdc/settings/components/count-field-settings/count-field-settings.component";
import {
  MatchTimeSettingsComponent
} from "@rdc/pages/rdc/settings/components/match-time-settings/match-time-settings.component";
import { debounceTime } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { RdcGameService } from "@rdc/services/rdc-game.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

export interface IRdcPartySettings {
  id?: string;
  players: IPlayer[],
  count_field: number,
  match_time: number,
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatStepperModule, ReactiveFormsModule, MatInputModule, MatButtonModule, PlayersSettingsComponent, PlayersListComponent, CountFieldSettingsComponent, MatchTimeSettingsComponent, RouterModule, MatSnackBarModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  readonly router = inject(Router);
  readonly rdcGameService = inject(RdcGameService)
  readonly snackBar = inject(MatSnackBar);

  playerList: IPlayer[] = [];
  isEditionMode: boolean = false;
  filteredPlayerList: IPlayer[] = [];

  rdcPartySettings: IRdcPartySettings = {
    players: this.filteredPlayerList,
    count_field: 5,
    match_time: 300, // default 5min
  }


  searchPlayerForm = new FormControl({value: '', disabled: this.playerList.length === 0});

  get disabledBtnRemoveSelection(): boolean {
    return !this.filteredPlayerList.some(player => player.selected)
  }

  ngOnInit(): void {


    const rdcGameStore = localStorage.getItem('rdc-fbc74-game')

    if (rdcGameStore && rdcGameStore !== '') {

      this.snackBar.open('Nous avons trouvé une partie existante, souhaitez vous la garder ? Cliquer sur "Non" pour réinitialiser la partie', 'Non', {duration: 10000, }).onAction().subscribe((v) => {
        this.resetParty()
      })

      const rdcGame = JSON.parse(rdcGameStore);

      if (rdcGame) {
        this.rdcPartySettings = rdcGame;
        this.filteredPlayerList = this.rdcPartySettings.players;
        this.playerList = this.rdcPartySettings.players;
      }
    }

    this.searchPlayerForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (!value) {
        this.filteredPlayerList = this.playerList;
      } else {
        this.searchPlayer(value);
      }
    })
  }

  addNewPlayer(player: IPlayer) {
    this.playerList.push(player);
    this.searchPlayerForm.enable();
    this.updatePlayers(this.playerList);

  }

  removeAllPlayers(): void {
    this.playerList = [];
    this.searchPlayerForm.disable();
    this.updatePlayers([]);

  }

  updatePlayerList(): void {
    this.isEditionMode = !this.isEditionMode
    if (!this.isEditionMode) {
      this.filteredPlayerList = this.filteredPlayerList.map((player) => {
        return {
          ...player,
          selected :false
        }
      })
    }
  }

  searchPlayer(value: string): void {
    this.filteredPlayerList = this.playerList.filter(player => player.name.includes(value.trim().toLowerCase()))
  }

  removeSelection(): void {
    this.filteredPlayerList = this.filteredPlayerList.filter((player) => !player.selected);
    this.isEditionMode = false;
    this.updatePlayers(this.filteredPlayerList);
  }

  updatePlayers(players: IPlayer[]): void {
    this.rdcPartySettings.players = players;
  }

  updateCountField(count: number): void {
    this.rdcPartySettings.count_field = count;
  }

  updateMatchTime(time: number): void {
    this.rdcPartySettings.match_time = time;
  }

  runGame(): void {
    const partyId = Array.from({ length: 6 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('');
    this.rdcGameService.gameSetting$.next({...this.rdcPartySettings, id: partyId});

    if (localStorage.getItem('rdc-fbc74-game')) {
      localStorage.removeItem('rdc-fbc74-game')
    }

    localStorage.setItem(`rdc-fbc74-game`, JSON.stringify({...this.rdcPartySettings, id: partyId}))
    void this.router.navigate([`/rdc/${partyId}/game`])
  }

  resetParty(): void  {
    localStorage.removeItem('rdc-fbc74-game');
    this.rdcPartySettings = {
      players: [],
      count_field: 5,
      match_time: 500
    }

    this.filteredPlayerList = [];
    this.playerList = [];
    this.rdcGameService.gameSetting$.next(this.rdcPartySettings)
  }



}
