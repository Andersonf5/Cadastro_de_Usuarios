import { Component, OnInit } from '@angular/core';

import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
users:Array<Users> =  [];
  constructor(private userService:UserService ) { }

  ngOnInit(): void {
   this.getUsersLocal();
  }

getUsersLocal():void{
  this.userService.getUsersFromServe().subscribe(responseFromServe =>{
    this.users = responseFromServe;
   
  })
}

deleteUser(id:number):void{
  this.userService.deleteUserServe(id).subscribe(response =>{
    console.log('Usuário excluido com sucesso!');}, (err) =>{ //segundo parametro do subscribe é a função error
      console.log(err.status)}, ()=>{this.getUsersLocal(); alert('Usuário excluido com sucesso!')}  //terceiro parametro do subscribe é a função complete que roda após o subcribe ter sido completado
   
      )}
    
    
}


