import{ Route, Routes } from "@angular/router";

export default[
    {
        path: 'resistencias',
        loadComponent:()=>import('./resistencia/resistencia.component'),
    },
    {
        path: 'empleados',
        loadComponent:()=>import('./empleados/empleados.component'),
    },
]as Routes