import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService, private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map (appUser => appUser.isAdmin)
    );
   }

}
