import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nome!: string;
  sobrenome!: string;
  

  ngOnInit(){
    this.nome = JSON.parse(JSON.stringify(window.sessionStorage.getItem('nome'))!);
    this.sobrenome = JSON.parse(JSON.stringify(window.sessionStorage.getItem('sobrenome'))!);
  }

  logOut(){
    window.sessionStorage.clear()
    window.location.reload()
  }
}
