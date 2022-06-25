import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

apiURL = 'https://sheet.best/api/sheets/9557847a-cf7a-4bf2-b3e9-9160e67a86be' //'https://sheet.best/api/sheets/d3dfa413-b653-4eb0-a58a-963fe1b20df2'; url usuario anderson.silvab
httpOptions = {
  headers: new HttpHeaders({
    'content-type':'application/json',
  })
}
// Necessário instaciar no serviço o modulo de requisições http

  constructor(private httpClient:HttpClient) { }

//retorna a lista de usuarios READ


getUsersFromServe():Observable<Users[]>{

  return this.httpClient.get<Users[]>(this.apiURL);
}


//salva usuario no banco de dados CREATE
createUserServe(userCreate:Users):Observable<Users>{
  return this.httpClient.post<Users>(this.apiURL,userCreate, this.httpOptions)
}

// Exclui o usuário do banco DELETE

deleteUserServe(id:number):Observable<Users> {
  return this.httpClient.delete<Users>(`${this.apiURL}/id/${id}`)
}


//atualiza o usuário no banco UPDATE

updateUser(id:string, user:Users):Observable<Users>{
  return this.httpClient.put<Users>(`${this.apiURL}/id/${id}`,user,this.httpOptions);
}

//lista usuário único
getUser(id:string):Observable<Users[]>{

  return this.httpClient.get<Users[]>(`${this.apiURL}/id/${id}`);
}

}
