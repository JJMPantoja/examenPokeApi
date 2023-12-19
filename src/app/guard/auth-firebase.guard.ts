import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseGuard implements CanActivate {
  constructor(private utilService: UtilsService, public router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.utilService.getToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
