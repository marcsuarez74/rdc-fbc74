import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from "rxjs";
import { RdcGameService } from "@rdc/services/rdc-game.service";
import { ActivatedRoute } from "@angular/router";
import { IRdcPartySettings } from "@rdc/pages/rdc/settings/settings.component";
import { IPlayer } from "@rdc/pages/rdc/settings/components/players-settings/players-settings.component";
import { MatButtonModule } from "@angular/material/button";
import { RdcGamePlayersService } from "@rdc/pages/rdc/game/game.service";

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
  readonly rdcGamePlayerService = inject(RdcGamePlayersService)

  listOfRandomMatch: IPlayer[][] = [];
  rdcGameSetting: IRdcPartySettings;
  gameRunning = false;
  gamePause = false;
  rdcTimer: string | null;
  currentTime: number | undefined;

  waitingList: IPlayer[] = [];

  #intervalId: number | null = null;

  #subs = new Subscription();

  ngOnInit() {

    const rdcGame: IRdcPartySettings = JSON.parse(localStorage.getItem(`rdc-fbc74-game`) ?? '');

    if (rdcGame) {
      this.rdcGameService.gameSetting$.next(rdcGame);
    }

    // Prevent re-loading page
    window.onbeforeunload = (event) => {
      event.returnValue = 'Attention si vous rechargez la page, tout sera perdu'
    };


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
    if (!this.currentTime) {
      this.currentTime = this.rdcGameSetting.match_time
    }

    this.gameRunning = true;
    if (this.#intervalId === null) {
      this.#intervalId = setInterval(() => {
        if (this.currentTime) {
          this.currentTime--;
          if (this.currentTime <= 0) {
            this.stopGame();
          }
          this.updateDisplay(this.currentTime);
        }

      }, 1000);
    }
  }

  stopGame(): void {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
      this.rdcTimer = null;
      this.currentTime = undefined;
      this.gameRunning = false
    }
  }

  pauseGame(): void {
    this.gamePause = true
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  playGame(): void {
    this.gamePause = false
    this.runGame()
  }

  updateDisplay(duration: number = this.rdcGameSetting.match_time): void {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    this.rdcTimer = formattedTime
  }


  generatePlayerLists(players: IPlayer[] = this.rdcGameSetting.players, numberOfLists: number = this.rdcGameSetting.count_field): void {
    this.listOfRandomMatch = [];
    if (players.length < 4 || numberOfLists === 0) {
      return;
    }

    const result = this.rdcGamePlayerService.assignTeams(this.rdcGameSetting.players, this.rdcGameSetting.count_field)
    this.listOfRandomMatch = result.teams;
    this.waitingList = result.waitingList;

    const flatMatch = result.teams.flatMap(v => v);
    const intersection = flatMatch.filter(pl1 => result.waitingList.includes(pl1))
    console.log('intersection', intersection);

    
  }

  ngOnDestroy() {
    this.#subs.unsubscribe()
  }


}
