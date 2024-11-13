import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Def interfaz de empleado
interface EmpleadoBase {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
}

// Def interfaz extendida empleado
interface Empleado extends EmpleadoBase {
  horasPorPagar: number;
  horasExtras: number;
  subtotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export default class EmpleadosComponent implements OnInit {
  // Declaracion del formulario
  formularioEmpleado: FormGroup;
  // List de empleados
  listaEmpleados: Empleado[] = [];
  // Total a pagar a todos los empleados
  totalPagar: number = 0;

  constructor(private formBuilder: FormBuilder) {
    // Iniciamos formulario con validaciones
    this.formularioEmpleado = this.formBuilder.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horasTrabajadas: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    // Carga empleados desde el almacenamiento local al iniciar el componente
    this.cargarEmpleados();
  }

  // Calcular campos adicionales del empleado
  calcularCamposEmpleado(empleadoBase: EmpleadoBase): Empleado {
    const horasNormales = Math.min(empleadoBase.horasTrabajadas, 40) * 70;
    const horasExtra = Math.max(empleadoBase.horasTrabajadas - 40, 0) * 140;
    const totalSubtotal = horasNormales + horasExtra;

    return {
      ...empleadoBase,
      horasPorPagar: horasNormales,
      horasExtras: horasExtra,
      subtotal: totalSubtotal
    };
  }

  // manejar el envio del formulario
  onSubmit() {
    if (this.formularioEmpleado.valid) {
      const empleadoBase: EmpleadoBase = this.formularioEmpleado.value;
      const empleadoCompleto = this.calcularCamposEmpleado(empleadoBase);
      
      this.listaEmpleados.push(empleadoCompleto);
      this.guardarEmpleados();
      this.formularioEmpleado.reset();
    }
  }

  // Modific un empleado existente
  modificarEmpleado() {
    const matriculaModificar = (document.getElementById('matricula_modificar') as HTMLInputElement).value;
    const indiceEmpleado = this.listaEmpleados.findIndex(e => e.matricula === matriculaModificar);
    if (indiceEmpleado !== -1) {
      this.formularioEmpleado.patchValue(this.listaEmpleados[indiceEmpleado]);
      this.listaEmpleados.splice(indiceEmpleado, 1);
      this.guardarEmpleados();
    } else {
      alert('Empleado no encontrado');
    }
  }

  // Eliminar un empleado existente
  eliminarEmpleado() {
    const matriculaEliminar = (document.getElementById('matricula_modificar') as HTMLInputElement).value;
    const indiceEmpleado = this.listaEmpleados.findIndex(e => e.matricula === matriculaEliminar);
    if (indiceEmpleado !== -1) {
      this.listaEmpleados.splice(indiceEmpleado, 1);
      this.guardarEmpleados();
    } else {
      alert('Empleado no encontrado');
    }
  }

  // Generar la tabla de empleados
  generarTabla() {
    this.calcularTotalPagar();
  }

  // Imprimir la tabla de empleados
  imprimirTabla() {
    window.print();
  }

  // Guardar empleados en el almacenamiento local
  private guardarEmpleados() {
    const empleadosBase: EmpleadoBase[] = this.listaEmpleados.map(({ matricula, nombre, correo, edad, horasTrabajadas }) => ({
      matricula,
      nombre,
      correo,
      edad,
      horasTrabajadas
    }));
    localStorage.setItem('empleados', JSON.stringify(empleadosBase));
  }

  // Cargar empleados desde el almacenamiento local
  private cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      const empleadosBase: EmpleadoBase[] = JSON.parse(empleadosGuardados);
      this.listaEmpleados = empleadosBase.map(empleadoBase => this.calcularCamposEmpleado(empleadoBase));
      this.calcularTotalPagar();
    }
  }

  // Calcular el total a pagar a todos los empleados
  private calcularTotalPagar() {
    this.totalPagar = this.listaEmpleados.reduce((total, empleado) => total + empleado.subtotal, 0);
  }
}