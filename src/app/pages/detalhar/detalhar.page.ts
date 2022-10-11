import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatoFirebaseService } from 'src/app/services/contato-firebase.service';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
contato: Contato;
edicao: boolean = true;
form_cadastrar: FormGroup;
isSubmitted: boolean = false;

  constructor(private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private contatoService: ContatoFirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.contato = nav.extras.state.objeto;
    this.form_cadastrar = this.formBuilder.group({
      nome: [this.contato.nome,[Validators.required]],
      telefone:  [this.contato.telefone,[Validators.required, Validators.minLength(10)]],
      genero:  [this.contato.genero,[Validators.required]],
      data_nascimento:  [this.contato.data_nascimento,[Validators.required]]
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
      this.salvar();
    }
  }

  alterarEdicao(): void{
    if(this.edicao == false){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }

  salvar(){
    this.contatoService.editarContato(this.form_cadastrar.value, this.contato.id)
    .then(()=>{
      this.presentAlert('Agenda', 'Editar', 'Contato editado com Sucesso!');
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      this.presentAlert('Agenda', 'Editar', 'Erro ao editar!');
    })
  }

  excluir(): void{
    this.presentConfirmAlert("Agenda", "Excluir Contato",
    "Você deseja realmente excluir o contato?");
  }

  private excluirContato(){
     this.contatoService.excluirContato(this.contato.id)
     .then(()=>{
      this.presentAlert('Agenda', 'Excluir', 'Contato excluído com Sucesso!');
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      this.presentAlert('Agenda', 'Excluir', 'Erro ao excluir!');
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

  async presentConfirmAlert(titulo : string, subtitulo: string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: [
        {text: 'Cancelar',
         role: 'cancelar',
         handler: ()=>{console.log("cancelou")}},
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler:(acao) =>{
            this.excluirContato();
          }
        }
      ],
    })
        await alert.present();
  }

  private validar(campo: any) : boolean{
    if(!campo){
      return false;
    }else{
      return true;
    }
  }

}
