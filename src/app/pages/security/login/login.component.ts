import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { Captcha } from 'src/app/interface/captcha';
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { CaptchaService } from 'src/app/services/captcha.service';
import { SecurityService } from 'src/app/services/security.service';
import { FormBuilder, Validators } from "@angular/forms";
import { HelperService } from 'src/app/services/helper.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  unsuscribe = new Subject<void>();
  captcha: Captcha = { image: '', icon: '' };
  inputTextType: boolean = false;
  submitted: boolean = false;
  svg: SafeHtml | undefined;
  public formLogin = this.fb.group({
    user: [
      "",
      [Validators.required, Validators.minLength(3)],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
    captcha: [
      "",
      [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
    ],
    tokenCaptcha: ["", [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private securityService: SecurityService,
    private captchaService: CaptchaService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.generateCaptcha();
  }


  login() {
    this.submitted = true;
    this.formLogin.controls["tokenCaptcha"].setValue(this.captcha.icon);
    if (!this.formLogin.valid) {
      for (const controlKey of Object.keys(this.formLogin.controls) as (keyof typeof this.formLogin.controls)[]) {
        this.formLogin.controls[controlKey].markAsTouched();
      }
      return;
    }

    //console.log(this.formLogin.value);

    const data = {
      data: this.helperService.encriptData(this.formLogin.value),
    };

    this.blockUI.start();
    this.securityService.loginPassport(data)
    .pipe(takeUntil(this.unsuscribe))
    .subscribe({
      next: (resp: any) => {
        this.blockUI.stop();

        if(resp.HasErrors){

          this.helperService.getMessage(resp.Messages[0].Message, 'info');
          this.generateCaptcha();
          this.formLogin.controls["captcha"].setValue(null);
        }

      },
      error: (e: any) => {
        this.blockUI.stop();
        console.log(e);
        this.helperService.getMessage(e.error.message, 'notice');
        this.generateCaptcha();
      }
    })

  }

  toggleInputTextType() {
    this.inputTextType = !this.inputTextType;
  }

  generateCaptcha() {
    this.captchaService.getCaptcha()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (resp: any) => {

          this.captcha.icon = resp.data.icon;
          this.svg = this.sanitizer.bypassSecurityTrustHtml(resp.data.image);
          //console.log(this.svg);
        }
      })
  }

  ngOnDestroy(): void {
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }


}
