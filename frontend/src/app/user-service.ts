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
}
