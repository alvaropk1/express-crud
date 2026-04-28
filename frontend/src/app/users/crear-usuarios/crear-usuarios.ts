import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user';

@Component({
  selector: 'app-crear-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuarios.html',
  styleUrl: './crear-usuarios.css',
})
export class CrearUsuarios {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  
  constructor() {
  effect(() => {
    const user = this.userService.selectedUser();

    if (user) {
      this.modo = 'edit';
      this.editingUserId = user.id;

      this.userForm.setValue({
        email: user.email ?? '',
        name: user.name
      });
    }
  });
}

  userForm = this.fb.group({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  modo: 'create' | 'edit' = 'create';
  editingUserId: string | null = null;

  onSubmit() {
  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
    return;
  }

  const { name, email } = this.userForm.getRawValue();

  if (this.modo === 'create') {
    this.userService.createUser(email, name).subscribe({
        next: () => {
          console.log("Creación terminada");
          this.resetForm();
          this.userService.refreshUsers.update(v => v + 1);
        },
        error: (err) => console.error('No se pudo crear el usuario', err),
      });
  } else {
    this.userService.updateUser(this.editingUserId!, { email, name }).subscribe({
      next: () => {
        console.log("Actualización terminada");
        this.resetForm();
        this.userService.refreshUsers.update(v => v + 1);
      },
      error: (err) => console.error('No se pudo actualizar el usuario', err),
    });
  }
}

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.userForm.reset({ email: '', name: '' });
    this.modo = 'create';
    this.editingUserId = null;
    this.userService.selectedUser.set(null);
  }
}
