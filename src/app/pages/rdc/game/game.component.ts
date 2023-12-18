import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from "rxjs";
import { RdcGameService } from "@rdc/services/rdc-game.service";
import { ActivatedRoute } from "@angular/router";
import { IRdcPartySettings } from "@rdc/pages/rdc/settings/settings.component";
import { IPlayer } from "@rdc/pages/rdc/settings/components/players-settings/players-settings.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
  readonly rdcGameService = inject(RdcGameService);
  readonly route = inject(ActivatedRoute);

  listOfRandomMatch: IPlayer[][] = [];
  rdcGameSetting: IRdcPartySettings;
  gameRunning = false;
  rdcTimer: string | null ;

  #intervalId: number | null = null;

  #subs = new Subscription();

  ngOnInit() {

    const rdcGame: IRdcPartySettings = JSON.parse(localStorage.getItem(`rdc-fbc74-game`) ?? '');

    if (rdcGame) {
      this.rdcGameService.gameSetting$.next(rdcGame);
    }

    // Prevent re-loading page
    // window.onbeforeunload = (event) => {
    //   event.returnValue = 'Attention si vous rechargez la page, tout sera perdu'
    // };


    this.#subs.add(
      this.rdcGameService._gameSetting.subscribe(res => {
        if (res) {
          this.rdcGameSetting = res;
          this.generatePlayerLists()
        }
      })
    )
  }

  runGame(): void {
    let time = this.rdcGameSetting.match_time;
    this.gameRunning = true;
    if (this.#intervalId === null) {
      this.#intervalId = setInterval(() => {
        time--;
        if (time <= 0) {
          this.stopGame();
        }
        this.updateDisplay(time);
      }, 1000);
    }
  }

  stopGame(): void {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
      this.rdcTimer = null;
      this.gameRunning = false
    }
  }

  updateDisplay(duration: number = this.rdcGameSetting.match_time): void {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    this.rdcTimer = formattedTime
  }

  generatePlayerLists(players: IPlayer[] = this.rdcGameSetting.players, numberOfLists: number = this.rdcGameSetting.count_field): void {
    if (players.length < 4 || numberOfLists === 0) {
      return;
    }

    const result: IPlayer[][] = [];
    const playersCopy = [...players]; // Copie de la liste de joueurs

    for (let i = 0; i < numberOfLists; i++) {
      const shuffledPlayers = playersCopy.sort(() => Math.random() - 0.5);
      result.push(shuffledPlayers.splice(0, 4));
    }

    // Le reste des joueurs dans des tableaux de 4 joueurs maximum
    while (playersCopy.length > 0) {
      result.push(playersCopy.splice(0, 4));
    }

    this.listOfRandomMatch = result;
    console.log('this.listOfRandomMatch', this.listOfRandomMatch);
  }

  ngOnDestroy() {
    this.#subs.unsubscribe()
  }


}
