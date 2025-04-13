import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('timelineAnimation', [
      transition('* => *', [
        query('.timeline-item', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          stagger(200, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class HomeComponent {}