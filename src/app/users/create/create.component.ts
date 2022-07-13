import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  constructor(private router:Router,private service: HttpService) { }

  error;
  errorMsg;
  myForm:UntypedFormGroup;

  ngOnInit(): void {
    this.myForm = new UntypedFormGroup({
      name: new UntypedFormControl('',[Validators.required]),
      email: new UntypedFormControl('',[Validators.required]),
      password:new UntypedFormControl('',[Validators.required]),
      role:new UntypedFormControl('',[Validators.required]),
    })

  }

  get name(){
    return this.myForm.get('name');
  }


  get role(){
    return this.myForm.get('role');
  }


  get email(){
    return this.myForm.get('email');
  }


  get password(){
    return this.myForm.get('password');
  }

  submit(){
    // console.log(this.myForm.value)

    this.service.post('users',this.myForm.value).subscribe(
      (data:any)=>{
      // console.log(data.token);
      // console.log(this.tokenId);
      // this.verifyMail = 'Check your email for verification link';
      // this.router.navigate(['/login']);
    },
    (error)=>{
      // console.log('Error in login is: ', error);
      this.errorMsg = error.message;
      // this.registerForm.markAsPristine();
    }
    )
      // this.register=false;
      // this.verify=true;
  }
}
