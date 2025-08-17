import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'console';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Api } from '../service/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private api: Api, private router: Router) {}

  message: string | null = null;


  async onSubmit( forma: NgForm ) {

    if ( forma.invalid  || forma.value.username === '' || forma.value.password === '' ) {
      console.log('Invalid form submission:', forma.value);
      this.showMessage('Please fill in all fields');
    }
    try{
      const response: any = await firstValueFrom(
        this.api.login(forma.value));
        console.log("Login response:", response);
        
      if (response.status === 'success') {
        console.log('entro');
        
        this.api.encryptstorage("auth_token", response.auth_token);
        this.api.encryptstorage("role", response.role);
        this.router.navigate(['/menu']);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      alert(error?.error?.message || error.message || 'Login failed. Please try again.' + error);
    }

  }

  private showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, 1000);
  }

}


