import { Routes } from '@angular/router';

export const routes: Routes=[
    {
        path:'auth',
        loadChildren:() => import ('./auth/freatures/auth.routes')
    },
    {
        path:'resistencias',
        loadChildren:() => import ('./formulario/resistencias/resistencias.routes')
    }
];
