/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { Contato } from '../../models/contato';
import { ContatosService } from '../../services/contatos.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
form_cadastrar: FormGroup;
isSubmitted: boolean = false;

  constructor(private alertController: AlertController,
    private router: Router,
    private contatoService: ContatosService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form_cadastrar = this.formBuilder.group({
      nome: ["",[Validators.required]],
      telefone:  ["",[Validators.required, Validators.minLength(10)]],
      genero:  ["",[Validators.required]],
      data_nascimento:  ["",[Validators.required]]
    });
  }

  get errorControl(){
    return this.form_cadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert('Agenda', 'Erro no Cadastro', 'Todos os Campos são Obrigatórios');
      return false;
    }else{
      this.cadastrar();
    }
  }


  private cadastrar() : void{
      this.contatoService.inserir(this.form_cadastrar.value);
      this.router.navigate(['/home']);
  }

  async presentAlert(titulo : string, subtitulo: string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK'],
    })
        await alert.present();
  }


}
