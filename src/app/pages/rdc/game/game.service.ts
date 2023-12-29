import { Injectable } from '@angular/core';
import { IPlayer } from "@rdc/pages/rdc/settings/components/players-settings/players-settings.component";

@Injectable({
  providedIn: 'root'
})
export class RdcGamePlayersService {


  assignTeams(playerArray: IPlayer[], numTerrains: number): { teams: IPlayer[][], waitingList: IPlayer[] } {
    const shuffledPlayers = [...playerArray].sort(() => Math.random() - 0.5);

    // Calculate the number of teams based on the number of terrains
    const numTeams = Math.min(numTerrains, Math.ceil(shuffledPlayers.length / 4));

    // Generate teams
    const teams: IPlayer[][] = [];
    for (let i = 0; i < numTeams; i++) {
      const startIndex = i * 4;
      const endIndex = startIndex + 4;
      const team = shuffledPlayers.slice(startIndex, endIndex);
      teams.push(team);
    }

    // Determine waiting list, avoiding consecutive appearances
    const waitingList: IPlayer[] = [];
    for (let i = 0; i < shuffledPlayers.length && waitingList.length < numTeams * 4; i++) {
      const player = shuffledPlayers[i];
      if (!teams.some(team => team.includes(player)) && (i === 0 || player !== shuffledPlayers[i - 1])) {
        if (!player.inWaitingList) {
          waitingList.push(player);
          player.inWaitingList = true; // Update inWaitingList status
        }
      }
    }

    return { teams, waitingList };

  }




}
