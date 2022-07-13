import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { identifierName } from '@angular/compiler';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  myForm :any;
  error;
  errorMsg;
  errorStatus;
  user: SocialUser;
  loggedIn: boolean;
  recaptcha;

  constructor(
    private router:Router,
    private service: HttpService,
    private authService: SocialAuthService,
    private recaptchaV3Service: ReCaptchaV3Service,
    ) { }

  ngOnInit(): void {
    // window.location.reload();

    if(this.service.loggedIn){
      this.router.navigateByUrl('/user/profile');
    }

    this.executeImportantAction();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      // console.log(this.user.idToken);
      // console.log(this.user.authToken);


    if(this.user?.idToken && this.user?.idToken != null)
      this.log();
    if(this.user?.authToken && this.user?.authToken != null)
      this.logf();

    })
      // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log(user.idToken);
    // });
    // this.error = this.service.handleError;

    // console.log(this.error);


    this.myForm = new FormGroup({
      // name: new FormControl('',[Validators.required]),
      // company:new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      captcha: new FormControl('',[Validators.required]),
    })
  }
  // get name(){
  //   return this.myForm.get('name');
  // }


  // get company(){
  //   return this.myForm.get('company');
  // }


  get email(){
    return this.myForm.get('email');
  }


  get password(){
    return this.myForm.get('password');
  }

  get captcha(){
    return this.myForm.get('captcha');
  }

  login(){
    // console.log(this.myForm.value)
    console.log(this.recaptcha);
    this.myForm.patchValue({
      captcha : this.recaptcha,
    });
    console.log(this.myForm.value);
    this.service.post('auth/login?captcha=true', this.myForm.value).subscribe({
      next: (data:any)=>{
      // console.log(data);
      // localStorage.setItem('profileData', JSON.stringify(data));
      localStorage.setItem('token',data.token);
      // console.log('LogIn dkjsfhsiudghfo');
      this.router.navigateByUrl('/user/profile');
      },
      error: (error:any)=>
      {
        // console.log('Erroytyhfd', error);
        this.errorMsg= error.error.message;
        this.errorStatus=error.code;
        this.executeImportantAction();
        // console.log(error.message);
      }
    })

    // this.service.login().subscribe(
    //   err =>{
    //     console.log(err)
    //   }
    // )
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  log(){

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log(user.idToken);


    this.service.post('auth/login/google?captcha=false', { "token": this.user.idToken }).subscribe(
      (data:any)=>{
      // console.log(data);
      // localStorage.setItem('profileData', JSON.stringify(data));
      localStorage.setItem('token',data.token);
      // console.log('LogIn dkjsfhsiudghfo');
      this.router.navigateByUrl('/user/profile');
      },
      (error:any)=>
      {
        // console.log('Erroytyhfd', error);
        this.errorMsg= error.message;
        this.errorStatus=error.code;
      }
    )
  };
  logf(){
    this.service.post('auth/login/facebook?captcha=false', { "token": this.user.authToken }).subscribe(
      (data:any)=>{
      // console.log(data.token);
      // localStorage.setItem('profileData', JSON.stringify(data));
      localStorage.setItem('token',data.token);
      // console.log('LogIn dkjsfhsiudghfo');
      this.router.navigateByUrl('/user/profile');
      },
      (error:any)=>
      {
        // console.log('Erroytyhfd', error);
        this.errorMsg= error.error.message;
        this.errorStatus=error.error.code;
      }
    )
  }
  // handleToken;

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) =>{
        this.recaptcha=token,
        console.log(this.recaptcha)
  });
      // console.log(this.recaptcha);
  }
}
