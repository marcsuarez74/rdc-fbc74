import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

const RDC_GAME_PATTERN = `/rdc\\/[^\\/]+`;

@Component({
  selector: 'app-rdc-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatSlideToggleModule, MatMenuModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './rdc-navbar.component.html',
  styleUrl: './rdc-navbar.component.scss'
})
export class RdcNavbarComponent {

  get currentUrl(): string {
    return window.location.href;
  }

  get isRdcGamePage(): boolean {
    return new RegExp(`${RDC_GAME_PATTERN}/game`).test(
      this.currentUrl,
    );
  }
}
