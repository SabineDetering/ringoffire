import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
