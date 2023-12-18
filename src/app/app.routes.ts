import { Routes } from '@angular/router';
import { StartRdcComponent } from "./pages/start-rdc/start-rdc.component"
import { SettingsComponent } from "@rdc/pages/rdc/settings/settings.component";
import { GameComponent } from "@rdc/pages/rdc/game/game.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'start'
  },
  {
    path: 'start',
    component: StartRdcComponent
  },
  {
    path: "rdc",
    redirectTo: "rdc/settings"
  },
  {
    path: 'rdc',
    children: [
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: ':id/game',
        component: GameComponent
      }
    ]
  }
];
