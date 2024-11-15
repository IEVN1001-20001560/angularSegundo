import { Routes } from '@angular/router';

export const routes: Routes=[
    // {
    //     path:'auth',
    //     loadChildren:() => import ('./auth/freatures/auth.routes')
    // },
    {
        path:'formulario',
        loadChildren:() => import ('./formulario/formulario.routes')
    }, 
    {
        path: 'utl',
        loadChildren:()=>import('./utl/utl.routes')
    }
];
