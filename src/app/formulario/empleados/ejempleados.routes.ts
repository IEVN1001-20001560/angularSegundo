import{ Route, Routes} from "@angular/router";

export default[
    {
        path: 'resistencias',
        loadComponent:()=>import('./empleados.component'),
    },
]as Routes