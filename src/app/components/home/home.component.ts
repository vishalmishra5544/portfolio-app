import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, Renderer2 } from '@angular/core';
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
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)', filter: 'blur(3px)' }), // Start further left
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)', filter: 'blur(0)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;
  @ViewChildren('timelineWrapper') timelineWrapper!: QueryList<ElementRef>;

  timelineData = [
    { date: '2016-06-01', title: '2016-2017: High School', description: 'Excelled with 93.20% at Manav Mandir High School, Mumbai.', img: 'school.jpg' },
    { date: '2018-06-01', title: '2018-2019: Junior College', description: 'Scored 79.38% in Science Stream with 92% in Mathematics at Navneet Jr. College, Mumbai.', img: 'college.jpg' },
    { date: '2019-06-01', title: '2019-2023: B.E. Computer Engineering', description: 'Graduated with 9.6 GPA from Atharva College, Mumbai.', img: 'university.jpg' },
    { date: '2023-01-01', title: '01/2023-04/2023: Software Engineer Intern at TSS Consultancy', description: 'Developed Desktop based applications from scratch using WinForm in C#,.NET with SQL Server Database connection, Excel/PDF generation, etc.', img: 'tsslogo.jpg' },
    { date: '2023-05-01', title: '05/2023-08/2024: Associate Software Engineer at TSS Consultancy', description: 'Developed multiple backend .NET APIs and Angular frontend applications at TSS Consultancy.', img: 'tsslogo.jpg' },
    { date: '2024-08-01', title: '08/2024-Present: Associate Software Engineer-AI at TSS Consultancy', description: 'Developed computer vision APIs with YOLO and Flask alongside Java Backend systems.', img: 'tsslogo.jpg' },
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Card visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    this.timelineItems.forEach((item) => {
      observer.observe(item.nativeElement);
    });

    // Progress bar animation (vertical scroll)
    const wrapper = this.timelineWrapper.first.nativeElement;
    const progressBar = wrapper.querySelector('.progress-bar');
    const timeline = wrapper.querySelector('.timeline');
    const firstItem = wrapper.querySelector('.timeline-item:first-child');
    const lastItem = wrapper.querySelector('.timeline-item:last-child');

    window.addEventListener('scroll', () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const firstItemRect = firstItem.getBoundingClientRect();
      const lastItemRect = lastItem.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate the start and end of the timeline
      const timelineStart = firstItemRect.top + scrollTop;
      const timelineEnd = lastItemRect.bottom + scrollTop;
      const timelineHeight = timelineEnd - timelineStart;

      // Calculate scroll position relative to the timeline
      const scrollPosition = Math.max(scrollTop + windowHeight - timelineStart, 0);
      const progress = Math.min(scrollPosition / timelineHeight, 1) * 100;

      this.renderer.setStyle(progressBar, 'height', `${progress}%`);
    });
  }
}