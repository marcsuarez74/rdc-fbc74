import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-start-rdc',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './start-rdc.component.html',
  styleUrl: './start-rdc.component.scss'
})
export class StartRdcComponent {
}
