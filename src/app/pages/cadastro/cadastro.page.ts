/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContatoFirebaseService } from 'src/app/services/contato-firebase.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
form_cadastrar: FormGroup;
isSubmitted: boolean = false;

  constructor(private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private contatoService: ContatoFirebaseService,
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
      this.showLoading("Aguarde", 100000);
      this.contatoService.inserirContato(this.form_cadastrar.value)
      .then(()=>{
        this.loadingCtrl.dismiss();
        this.presentAlert("Agenda", "Cadastrar", "Contato Salvo!");
        this.router.navigate(['/home']);
      })
      .catch((error)=>{
        console.log(error);
        this.loadingCtrl.dismiss();
        this.presentAlert("Agenda", "Cadastrar", "Erro ao salvar Contato!");
      })


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

  async showLoading(message: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duracao,
    });
    loading.present();
  }


}
