import { Injectable } from '@angular/core';
import { IPlayer } from "@rdc/pages/rdc/settings/components/players-settings/players-settings.component";


export type Team = {
  id: number;
  players: IPlayer[];
};

type Result = {
  teams: Team[];
  waitingList: IPlayer[];
};


@Injectable({
  providedIn: 'root'
})
export class RdcGamePlayersService {


  assignTeams(players: IPlayer[], numberOfFields: number): Result {
    console.log('numberOfFields', numberOfFields);
    console.log('players', players.length);

    // Mélanger les joueurs de manière aléatoire
    // const shuffledPlayers = players.sort(() => Math.random() - 0.5)

    const shuffledPlayers = players.sort(() => Math.random() - 0.5).sort((p1: IPlayer, p2: IPlayer) => {
      return Number(p2.inWaitingList) - Number(p1.inWaitingList)
    });


    let teams: Team[] = Array.from({length: numberOfFields}, (_, index) => ({
      id: index + 1,
      players: [],
    }));

    let waitingList: IPlayer[] = [];


    // Répartir les joueurs sur les équipes
    for (let i = 0; i < shuffledPlayers.length; i++) {
      const currentPlayer = shuffledPlayers[i];
      const isLast = currentPlayer === shuffledPlayers[shuffledPlayers.length - 1];

      // Vérifier si toutes les equipes sont complètes
      const allTeamsFull = teams.every((team) =>
        team.players.length === 4
      );

      // Si le joueur est déjà dans une équipe, ajouter à la liste d'attente uniquement s'il n'est pas déjà marqué comme inWaitingList
      if (allTeamsFull && !currentPlayer.inWaitingList) {
        waitingList.push({...currentPlayer, inWaitingList: true});
      } else if (currentPlayer.inWaitingList && !allTeamsFull) {
        // Répartir sur les équipes uniquement si le joueur n'est pas déjà dans la liste d'attente et si toutes les équipes ne sont pas complètes
        for (let j = 0; j < numberOfFields; j++) {
          if (teams[j].players.length < 4) {
            teams[j].players.push({...currentPlayer, inWaitingList: false});
            break;
          }
        }
      } else {
        const teamWithSpace = teams.find((team) => team.players.length < 4);
        if (currentPlayer.inWaitingList) {
          if (teamWithSpace) {
            teamWithSpace.players.push({...currentPlayer, inWaitingList: false});
          } else {
            waitingList.push({...currentPlayer, inWaitingList: true})
          }
        } else if (!isLast) {
          waitingList.push({...currentPlayer, inWaitingList: true})
        } else {
          if (teamWithSpace) {
            teamWithSpace.players.push({...currentPlayer, inWaitingList: false});
          }
        }
      }
    }


    // si certain terrain sont vides et qu'il y a des joueurs dans liste d'attente alors je complete les terrain
    if (teams.some((team) => team.players.length < 4) && waitingList.length > 0) {

      const waitingListCopy = waitingList
      const sufflePlayerList = waitingList.sort(() => Math.random() - 0.5)

      for (let i = 0; i < sufflePlayerList.length; i++) {
        for (let j = 0; j < numberOfFields; j++) {
          if (teams[j].players.length < 4) {
            if (waitingList.length > 0) {
              waitingList = waitingList.filter((player) => player.name !== waitingListCopy[i].name)
            }
            teams[j].players.push({...sufflePlayerList[i], inWaitingList: false});
            break;
          }
        }
      }
    }

    return {teams, waitingList};

  }


}
