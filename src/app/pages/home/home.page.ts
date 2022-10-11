import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContatoFirebaseService } from 'src/app/services/contato-firebase.service';
import { Contato } from '../../models/contato';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos : Contato[];

  constructor(private router: Router,
    private contatoService: ContatoFirebaseService) {
      this.contatoService.getContatos()
      .subscribe(resp=> {
        this.contatos = resp.map(contato=>{
          return{
            id : contato.payload.doc.id,
            ...contato.payload.doc.data() as Contato
          }as Contato
        });
      });
  }

  irParaCadastroPage(): void{
    this.router.navigate(['/cadastro']);
  }

  irParaDetalharPage(contato: Contato):void{
    this.router.navigateByUrl('/detalhar', {
      state: { objeto:contato }
    });
  }

}
