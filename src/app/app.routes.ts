import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage) },
  { path: 'movies', canActivate: [authGuard], loadComponent: () => import('./pages/movies/movies.page').then(m => m.MoviesPage) },
  { path: 'playlist', canActivate: [authGuard], loadComponent: () => import('./pages/playlist/playlist.page').then(m => m.PlaylistPage) },
  { path: 'matches', canActivate: [authGuard], loadComponent: () => import('./pages/matches/matches.page').then(m => m.MatchesPage) },
  { path: 'admin', canActivate: [authGuard, adminGuard], loadComponent: () => import('./pages/admin/admin.page').then(m => m.AdminPage) },
]  