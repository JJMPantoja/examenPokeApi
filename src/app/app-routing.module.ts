import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthFirebaseGuard } from './guard/auth-firebase.guard';
import { HomeComponent } from './components/home/home.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inicio',
    component: HomeComponent,
    canActivate: [AuthFirebaseGuard],
    children: [
      { path: 'list', component: ListPokemonComponent },
      { path: 'detail/:name', component: DetailPokemonComponent },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
