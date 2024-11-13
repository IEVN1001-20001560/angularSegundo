import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ResistenciasComponent from "./formulario/resistencia/resistencia.component"
import EmpleadosComponent from "./formulario/empleados/empleados.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResistenciasComponent, EmpleadosComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angularSegundo';
}
