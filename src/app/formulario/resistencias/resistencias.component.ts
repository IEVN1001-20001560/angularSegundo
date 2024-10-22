import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
interface Resistencias {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: string;
  valor: number;
  valorMaximo: number;
  valorMinimo: number;
}
 
@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styles: ``
})
export default class ResistenciasComponent implements OnInit {
  formGroup!: FormGroup;
  colors: string[] = ['Rojo', 'Negro', 'Café', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  tolerancias: string[] = ['Oro', 'Plata'];
  resistencias!: Resistencias | null; // Para los datos de la resistencia
  mostrarResultados = false;  // Variable para controlar la visibilidad de los resultados
 
  constructor(private readonly fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.formGroup = this.initForm();
  }
 
  initForm(): FormGroup {
    return this.fb.group({
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      color3: ['', Validators.required],
      tolerancia: ['', Validators.required]
    });
  }
 
  calcular(): void {
    const valorColor1 = this.colors.indexOf(this.formGroup.get('color1')?.value);
    const valorColor2 = this.colors.indexOf(this.formGroup.get('color2')?.value);
    const multiplicador = Math.pow(10, this.colors.indexOf(this.formGroup.get('color3')?.value));
 
    const valor = (valorColor1 * 10 + valorColor2) * multiplicador;
    const tolerancia = this.formGroup.get('tolerancia')?.value;
    const toleranceFactor = tolerancia === 'Oro' ? 0.05 : 0.10;
    const valorMaximo = valor * (1 + toleranceFactor);
    const valorMinimo = valor * (1 - toleranceFactor);
 
    // Guardar en el objeto Resistencias
    this.resistencias = {
      color1: this.formGroup.get('color1')?.value,
      color2: this.formGroup.get('color2')?.value,
      color3: this.formGroup.get('color3')?.value,
      tolerancia,
      valor,
      valorMaximo,
      valorMinimo
    };
 
    // Convertir a JSON y guardar en localStorage
    localStorage.setItem('resistencia', JSON.stringify(this.resistencias));
 
    console.log("Datos guardados en Local Storage:", this.resistencias);
  }
 
  subImprime(): void {
    const resistenciaGuardada = localStorage.getItem('resistencia');
    if (resistenciaGuardada) {
      this.resistencias = JSON.parse(resistenciaGuardada);
      this.mostrarResultados = true;  // Mostrar los resultados después de hacer clic en "Imprimir"
    } else {
      this.resistencias = null;
      this.mostrarResultados = false;  // Ocultar los resultados si no hay datos guardados
    }
  }
 
  // Método para obtener la clase de color para las bandas
  colorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'Rojo': 'bg-red-500 text-white',
      'Negro': 'bg-black text-white',
      'Café': 'bg-brown-500 text-white',
      'Naranja': 'bg-orange-500 text-white',
      'Amarillo': 'bg-yellow-500 text-black',
      'Verde': 'bg-green-500 text-white',
      'Azul': 'bg-blue-500 text-white',
      'Violeta': 'bg-purple-500 text-white',
      'Gris': 'bg-gray-500 text-white',
      'Blanco': 'bg-white text-black'
    };
    return colorMap[color] || '';
  }
 
  // Método para obtener la clase de color para la tolerancia
  toleranciaClass(tolerancia: string): string {
    const toleranciaMap: { [key: string]: string } = {
      'Oro': 'bg-yellow-400 text-black',
      'Plata': 'bg-gray-400 text-black'
    };
    return toleranciaMap[tolerancia] || '';
  }
}