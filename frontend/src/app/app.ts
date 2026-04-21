import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListarUsuarios } from './listar-usuarios/listar-usuarios';

@Component({
  selector: 'app-root',
  imports: [ListarUsuarios],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  ngOnInit(){
    this.title.set('App Usuarios');
  }
}
