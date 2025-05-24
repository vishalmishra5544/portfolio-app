import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-coding-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coding-profile.component.html',
  styleUrls: ['./coding-profile.component.scss'],
  animations: [
    trigger('cardHover', [
      state('default', style({
        transform: 'scale(1) rotate(0deg)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      })),
      state('hovered', style({
        transform: 'scale(1.05) rotate(2deg)',
        boxShadow: '0 12px 24px rgba(0, 183, 255, 0.3), 0 0 20px rgba(0, 183, 255, 0.2)',
      })),
      transition('default <=> hovered', [
        animate('0.3s ease-in-out'),
      ]),
    ]),
  ],
})
export class CodingProfileComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('profileCard') profileCards!: QueryList<ElementRef>;

  hoverStates: { [key: number]: boolean } = {};
  private observer: IntersectionObserver | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/coding-profile') {
        this.resetAndObserve();
      }
    });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.profileCards.forEach((card) => {
        this.observer!.unobserve(card.nativeElement);
      });
      this.observer = null;
    }
  }

  private resetAndObserve() {
    this.profileCards.forEach((card) => {
      card.nativeElement.classList.remove('visible');
    });
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    if (this.observer) {
      this.profileCards.forEach((card) => {
        this.observer!.unobserve(card.nativeElement);
      });
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer!.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    this.profileCards.forEach((card) => {
      this.observer!.observe(card.nativeElement);
    });
  }

  setHoverState(index: number, isHovered: boolean) {
    this.hoverStates[index] = isHovered;
  }
}