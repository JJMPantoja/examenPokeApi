import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/interfaces/general-interfaces';
import { UtilsService } from 'src/app/services/utils.service';
import { Mensajes } from 'src/assets/common/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public messages: Mensajes = new Mensajes();

  public loginform = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/'),
      ],
    ],
    pass: ['', [Validators.required]],
  });
  JSON: any;

  constructor(private utilService: UtilsService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  public login(form: LoginForm): void {
    this.utilService.login(form.email!, form.pass!);
  }
}
