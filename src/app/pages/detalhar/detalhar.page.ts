import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatosService } from 'src/app/services/contatos.service';

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
    private router: Router,
    private contatoService: ContatosService,
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
    if(this.contatoService.editar(this.contato, this.form_cadastrar.value['nome'],
    this.form_cadastrar.value['telefone'], this.form_cadastrar.value['genero'],
    this.form_cadastrar.value['data_nascimento'])){
            this.presentAlert('Agenda', 'Editar', 'Contato editado com Sucesso!');
            this.router.navigate(['/home']);
          }else{
            this.presentAlert('Agenda', 'Editar', 'Contato não encontrado!');
          }
  }

  excluir(){
    this.presentConfirmAlert("Agenda", "Excluir Contato",
    "Você deseja realmente excluir o contato?");
  }

  private excluirContato(){
    if(this.contatoService.excluir(this.contato)){
      this.presentAlert('Agenda', 'Excluir', 'Contato excluído com Sucesso!');
      this.router.navigate(['/home']);
    }else{
      this.presentAlert('Agenda', 'Erro - Excluir', 'Contato não Encontrado!');
    }
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
