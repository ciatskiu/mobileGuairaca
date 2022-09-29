
export class Contato {
  private _id: any;
  private _nome: string;
  private _telefone: number;
  private _genero: string;
  private _data_nascimento: string;

  constructor(nome: string, telefone: number,
    genero: string, data_nascimento: string){
    let chave = new Date;
    this._id = chave.getTime();
    this._nome = nome;
    this._telefone = telefone;
    this._genero = genero;
    this._data_nascimento = data_nascimento;
  }

  get id(): any{
    return this._id;
  }

   get nome(): string{
    return this._nome;
   }

   set nome(nome: string){
    this._nome = nome;
   }


   get telefone(): number{
    return this._telefone;
   }

   set telefone(telefone: number){
    this._telefone = telefone;
   }

   get genero(): string{
    return this._genero;
   }

   set genero(genero: string){
    this._genero = genero;
   }

   get data_nascimento(): string{
    return this._data_nascimento;
   }

   set data_nascimento(data_nascimento: string){
    this._data_nascimento = data_nascimento;
   }




}
