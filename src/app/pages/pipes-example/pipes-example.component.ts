import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pipes-example',
  templateUrl: './pipes-example.component.html',
  styleUrls: ['./pipes-example.component.css']
})
export class PipesExampleComponent implements OnInit {
 number:number = 0;
 text = 'hello world!';
 date = new Date;

  constructor(private upperCasePipe:UpperCasePipe) { } 

  

  ngOnInit(): void {

    this.text = this.upperCasePipe.transform(this.text)
  }

}
