import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/v1/users';

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(email: string, name: string): Observable<User> {
    console.log("Crear usuario iniciado...");
    return this.httpClient.post<User>(`${this.apiUrl}`, {email: email, name: name});
  }

  updateUser(id: string, patch: { email?: string; name?: string }): Observable<User> {
    console.log("Actualización de Usuario iniciada...");
    return this.httpClient.patch<User>(`${this.apiUrl}/${id}`, patch);
  }

  deleteUser(id: string): Observable<Object | undefined>{
    console.log("Borrado de Usuario iniciado...");
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
