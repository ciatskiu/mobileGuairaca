import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar: FormGroup;
  isSubmitted : boolean = false;

  constructor(private alertController: AlertController,
    private router: Router,
    private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.formCadastrar = this.formBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        senha: ["", [Validators.required, Validators.minLength(6)]],
        confSenha: ["", [Validators.required, Validators.minLength(6)]]
      });
    }

    get errorControl(){
      return this.formCadastrar.controls;
    }

    submitForm(){
      this.isSubmitted = true;
      if(!this.formCadastrar.valid){
        this.presentAlert('Agenda', 'Erro ao Logar', 'Todos os Campos são Obrigatórios');
        return false;
      }else{
       this.cadastrar();
      }
    }

    private cadastrar(){
      console.log(this.formCadastrar.value);
      this.router.navigate(['/signin']);
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
