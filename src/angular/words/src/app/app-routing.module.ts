import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { GoComponent } from './go/go.component';
import { SettingsComponent } from './settings/settings.component';
import { AddWordsComponent } from './add-words/add-words.component';

const routes: Routes = [
  { path: '', redirectTo: 'recently-added', pathMatch: 'full' },
  { path: 'recently-added', component: RecentlyAddedComponent },
  { path: 'go', component: GoComponent },
  { path: 'add-words', component: AddWordsComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
