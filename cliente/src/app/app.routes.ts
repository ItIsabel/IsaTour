import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'circuitos', loadComponent: () => import('./circuitos/circuito/circuito.component').then(m=>m.CircuitoComponent)},
    {path: 'ciudades', loadComponent: () => import('./ciudades/ciudad.component').then(m=>m.CiudadComponent)},
    {path: 'buscar', loadComponent: () => import('./buscar/buscar.component').then(m=>m.BuscarComponent)}

];
