import {Route} from "@angular/roter";

export default [
    {
        path: 'listaalumnos',
        loadComponent:()=>import('./alumnos/alumnos.component')

    }
] as Routes