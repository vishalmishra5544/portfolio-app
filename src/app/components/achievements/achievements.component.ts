import { Component } from '@angular/core';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-achievements',
  standalone: true,
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  animations: [
    trigger('gridAnimation', [
      transition('* => *', [
        query('.achievement', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class AchievementsComponent {}