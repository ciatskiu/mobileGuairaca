import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;
  isSubmitted : boolean = false;

  constructor(private alertController: AlertController,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.formLogar.valid){
      this.presentAlert('Agenda', 'Erro ao Logar', 'Todos os Campos são Obrigatórios');
      return false;
    }else{
     this.logar();
    }
  }

  private logar(){
    console.log(this.formLogar.value);
  }

  signinGoogle(){
    console.log("Logar com Google");
  }

  irParaSignUp(){
    this.router.navigate(['/signup`']);
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
