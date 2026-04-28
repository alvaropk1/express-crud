import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../user-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../user';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-listar-usuarios',
  imports: [DatePipe],
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css',
})
export class ListarUsuarios {
  userService = inject(UserService);

  refresh = signal(0);
  usuarios = toSignal(
    toObservable(this.refresh).pipe(
      switchMap(() => this.userService.getAllUsers())
    ), 
    {initialValue: [] as User[]}
  );

  editUser(user: User) {
    this.userService.selectedUser.set(user);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log("Borrado terminado");
        this.refresh.update((v) => v + 1);
      }
    });
  }
}
