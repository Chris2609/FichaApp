import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from "@ngx-translate/core";
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private authService: AuthService, public dialog: MatDialog, private translate: TranslateService, private router: Router, private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isManager(): boolean {
    if(this.authService.getRol() == "manager") return true;
    return false;
  }

  cerrarSesion(){
    this.authService.cerrarSesion().subscribe(resultado =>{
      if(resultado){
        this.cookieService.delete('token');
        this.cookieService.delete('name');
        this.cookieService.delete('role');
        this.router.navigate(['login']);
      }else{
        let dialogRef = this.dialog.open(AlertComponent, {
          height: '250px',
          width: '400px',
          data: {btn: 2, msg: this.translate.instant('MAIN.error_logout')}
        });
        dialogRef.afterClosed().subscribe(result => {
         if (result == "Ok"){
          this.cookieService.delete('token');
          this.cookieService.delete('name');
          this.cookieService.delete('role');
          this.router.navigate(['login']);
         }
        });
        
      }
    });
  }

  pin(){
    console.log("BtnPin pulsado");
  }

}
