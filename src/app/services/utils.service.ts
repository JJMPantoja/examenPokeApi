import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Mensajes } from 'src/assets/common/messages';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GetPokemonsGlobal, ItemsArr } from '../interfaces/general-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public messages: Mensajes = new Mensajes();
  isLoading = false;
  arrPokemons!: GetPokemonsGlobal;

  // Para acceder a las pantallas protegidas se requiere del usuario y contraseña
  // user: entrenadorpokemon@pokeapi.com
  // pass: entrenadormaster

  constructor(
    private auth: Auth,
    public router: Router,
    public http: HttpClient
  ) {}

  public login(email: string, pass: string): Promise<any> {
    this.setLoading(true);

    this.showLoading(this.messages.validity, this.messages.wait, 'info');
    return signInWithEmailAndPassword(this.auth, email, pass)
      .then((res: any) => {
        const decoded = jwtDecode(res.user.accessToken);
        localStorage.setItem('token', res.user.accessToken);
        // Falta agregar el estado global con el token de firebase
        Swal.close();
        this.router.navigate(['inicio', 'list']);
      })
      .catch((error) => {
        const message = error.message;
        this.showMessages(
          this.messages.errorAuth,
          message,
          false,
          true,
          'error'
        );
      });
  }

  public logOut(): any {
    signOut(this.auth);
    localStorage.removeItem('token');
    return this.router.navigate(['login']);
  }

  public getLoading(): boolean {
    return this.isLoading;
  }

  public setLoading(setloading: boolean): void {
    this.isLoading = setloading;
  }

  public showLoading(message: string, bodyMessage: string, icon: string): void {
    const iconMessage =
      icon === 'error' ? 'error' : icon === 'info' ? 'info' : 'success';
    Swal.fire({
      allowOutsideClick: false,
      title: message,
      text: bodyMessage,
      icon: iconMessage,
    });
    Swal.showLoading();
  }

  public showMessages(
    message: string,
    bodyMessage: string,
    btnClose: boolean,
    btnConfirm: boolean,
    icon: string
  ): void {
    const iconMessage =
      icon === 'error' ? 'error' : icon === 'info' ? 'info' : 'success';
    Swal.fire({
      allowOutsideClick: false,
      title: message,
      text: bodyMessage,
      icon: iconMessage,
      showCloseButton: btnClose,
      showConfirmButton: btnConfirm,
      confirmButtonText: this.messages.close,
    });
  }

  public getToken(): string {
    return localStorage.getItem('token')!;
  }

  public getPokemons(limit: string): Observable<any> {
    this.showLoading(this.messages.waitMoment, this.messages.getData, 'info');
    return this.http.get(`${environment.pokemonsGlobal}?limit=${limit}`);
  }

  public pokemonOneByOne(pokemonsArr: ItemsArr): Observable<any> {
    return this.http.get(pokemonsArr.url);
  }

  public detailPokemon(name: string): Observable<any> {
    return this.http.get(`${environment.pokemonsGlobal}/${name}`);
  }
}
