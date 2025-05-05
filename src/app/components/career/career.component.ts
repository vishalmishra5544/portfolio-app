import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  animations: [
    trigger('timelineAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)', filter: 'blur(3px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)', filter: 'blur(0)' })),
      ]),
    ]),
  ],
})
export class CareerComponent implements AfterViewInit {
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;
  @ViewChildren('careerWrapper') careerWrapper!: QueryList<ElementRef>;

  roles = [
    {
      date: '08/2024-Present',
      title: 'Associate Software Engineer-AI',
      description: [
        'Developed computer vision APIs with YOLO and Flask alongside Java Backend systems.',
      ],
    },
    {
      date: '05/2023-08/2024',
      title: 'Associate Software Engineer',
      description: [
        'Worked on BackEnd side with major focus on .Net Core based APIs creation alongside with Sql server, Angular, Typescript & desktop application with Win Forms UI.',
        'Developed DotNet based APIs along with integration in frontend web application.',
        'Created SDKs for various APIs with Authentication, Encryption/Decryption, Bulk Request Processing, etc.',
      ],
    },
    {
      date: '01/2023-04/2023',
      title: 'Software Engineer Intern',
      description: [
        'Worked on Computer Vision based APIs for Digital Customer Onboarding journey tasks involving classification and parsing data extracted via OCR from Aadhaar, Pan, Passport, Driving License (OVD/Government Issued Id) Cards with backend in Multi-Tenant architecture based Java SpringBoot application that consumes flask AI APIs.',
        'Integrated photo match and extraction libraries in AI APIs that enables extraction and comparing human photo in OVD/Government Issued Id cards with individual image of person.',
        'Integrated Whatsapp Business API to enable a digital customer onboarding journey via a Whatsapp Bot application and deployed the Dockerized app container in Azure Kubernetes Service(AKS).',
        'Developed multiple real time Web Scraping based systems to fetch public available data and provided APIs to consume them.',
        'Integrated third parties like Digilocker for document fetch, NPCI (tied up with UIDAI) for Aadhaar Based Authentication journey for user Digital Onboarding Systems.',
      ],
    },
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
    const wrapper = this.careerWrapper.first.nativeElement;
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