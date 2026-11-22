import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then((m) => m.AdminPage),
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.page').then((m) => m.MoviesPage),
  },
  {
    path: 'playlist',
    loadComponent: () => import('./pages/playlist/playlist.page').then((m) => m.PlaylistPage),
  },
  {
    path: 'matches',
    loadComponent: () => import('./pages/matches/matches.page').then((m) => m.MatchesPage),
  },
];
