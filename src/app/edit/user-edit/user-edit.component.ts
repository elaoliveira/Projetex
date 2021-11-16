import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  usuario: Usuario = new Usuario();
  idUser: number;
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private rota: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.rota.navigate(['/entrar']);
    }

    this.idUser = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUser);
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  atualizar(){
    if (this.usuario.senha != this.confirmarSenha) {
      alert('SENHA INCORRETA!');
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.rota.navigate(['/inicio']);
        alert('Usuário atualizado com sucesso, faça o login novamente!');
        environment.token = '';
        environment.nome = '';
        environment.foto = '';
        environment.id = 0;
        this.rota.navigate(['/entrar']);
      });
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }
}
