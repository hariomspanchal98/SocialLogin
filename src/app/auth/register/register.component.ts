import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable, throwError } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
// import { HttpService } from '../../http.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm :any;
  error;
  errorMsg;
  register:boolean = true;
  verify:boolean = false;
  tokenId:string;
  recaptcha;

  constructor(private router:Router,private service: HttpService,
    private recaptchaV3Service: ReCaptchaV3Service,) { }


  ngOnInit(): void {

    this.executeImportantAction();

    this.myForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      company:new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      captcha: new FormControl('', [Validators.required]),
    })
  }

  get name(){
    return this.myForm.get('name');
  }


  get company(){
    return this.myForm.get('company');
  }


  get email(){
    return this.myForm.get('email');
  }


  get password(){
    return this.myForm.get('password');
  }

  get captcha(){
    return this.myForm.get('captcha');
  }

  submit(){
    // console.log(this.myForm.value)



    console.log(this.myForm.value);

    this.service.post('auth/register',this.myForm.value).subscribe({
      next:(data:any)=>{
      // console.log(data.token);
      this.tokenId=data.token;
      // console.log(this.tokenId);
      this.service.securePost('auth/send-verification-email',this.tokenId).subscribe(
        ()=>{
          // console.log('email req sent')
        }
      );
      // this.verifyMail = 'Check your email for verification link';
      // this.router.navigate(['/login']);
      this.register=false;
      this.verify=true;
    },
    error:(error)=>{
      // console.log('Error in login is: ', error);
      this.errorMsg = error.error.message;
      this.executeImportantAction();
      // this.registerForm.markAsPristine();
    }
    })
      // this.register=false;
      // this.verify=true;
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => {
        this.recaptcha= token;
        // console.log(this.recaptcha),
        this.myForm.patchValue({
          captcha : this.recaptcha,
        });
      });
  }
  // submit(){
  //   console.log(this.myForm.value)
  //   this.service.register(this.myForm.value).subscribe(
  //     (data:any)=>{
  //     // console.log(data);
  //     console.log('tegjfkhskuhhkgsuiehfkhsdekhc segedgg',data);
  //     // this.tokenId=data.token;
  //     // console.log(this.tokenId);
  //     // this.service.verification(this.tokenId);
  //     // this.router.navigateByUrl('/login');
  // },
  // (error:any)=>
  //     {
  //       // console.log('Erroytyhfd', error);
  //       this.errorMsg= error;
  //     }
  //   );
  //   // this.service.login(this.myForm.value).subscribe(
  //   //   (data:any)=>{
  //   //   // console.log(data);
  //   //   // localStorage.setItem('profileData', JSON.stringify(data));
  //   //   // localStorage.setItem('tokenId',JSON.stringify(data.token))
  //   //   this.tokenId=(data.token)
  //   //   ;})
  //   // console.log(this.tokenId);
  //   this.register=false;
  //   this.verify=true;
  //   }
  }
