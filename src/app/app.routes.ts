import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CareerComponent } from './components/career/career.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { InterestsComponent } from './components/interests/interests.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'career', component: CareerComponent },
  { path: 'achievements', component: AchievementsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'education', component: EducationComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];