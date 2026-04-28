import { Component, signal } from '@angular/core';
import { ListarUsuarios } from './users/listar-usuarios/listar-usuarios';
import { CrearUsuarios } from './users/crear-usuarios/crear-usuarios';

@Component({
  selector: 'app-root',
  imports: [ListarUsuarios, CrearUsuarios],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  ngOnInit(){
    this.title.set('App Usuarios');
  }
}
