import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
userForm: FormGroup;
lastUserId:Array<Users> = [];
userId:any = '';


  constructor(private fb: FormBuilder, 
    private userService:UserService, 
    private actRoute: ActivatedRoute,
    private router: Router
    ) {
    this.userForm = this.fb.group({
      id: 0,
      nome:'',
      sobrenome:'',
      idade:'',
      profissao:''

    })
     
   }
    
  

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe(params =>{
      this.userId = params.get('id');
      console.log(this.userId);
      if(this.userId !== null){
        this.userService.getUser(this.userId).subscribe(result =>{
          this.userForm.patchValue({
            id: result[0].id,
            nome:result[0].nome,
            sobrenome:result[0].sobrenome,
            idade:result[0].idade,
            profissao:result[0].profissao
          })
        })
      }
    })
    
    this.getLastIdFromServe();

  }


 getLastIdFromServe(){
 this.userService.getUsersFromServe().subscribe(response =>{
 this.lastUserId = response;
})
 
 } 

 createUser(){
  this.userForm.get('id')?.patchValue(this.lastUserId.length+1);
  this.userService.createUserServe(this.userForm.value).subscribe(result =>{
    let resultados = result
    
    console.log(resultados.nome);
    alert (`Usuário foi cadastrado com sucesso`);
  },(err)=>{ console.log(err.status)},
  ()=>{
  
    this.router.navigate(['/']);
  })
 } 

 updateUser() {
  let userName='';
  this.userService.updateUser(this.userId,this.userForm.value).subscribe(result =>{
   userName=result.nome
    console.log(`Usuário atualizado`,result);
  },(err)=>{ console.log(err.status)},
    ()=>{
      alert (`O usuário atualizado com sucesso`)
      this.router.navigate(['/']);
    })
}

  actionButton(){
    if(this.userId !== null){
      this.updateUser();
    }else{ this.createUser();}
  }

}
