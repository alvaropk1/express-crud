import { Component, inject, signal } from '@angular/core';
import { UserService } from '../user-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar-usuarios',
  imports: [DatePipe],
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css',
})
export class ListarUsuarios {
  userService = inject(UserService);

  usuarios = toSignal(this.userService.getAllUsers(), {initialValue: [] as User[]});
}
