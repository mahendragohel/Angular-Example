import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {User,IUser} from '../../models/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  route:ActivatedRoute;
  isConfirmLoading=false;
  User:User;
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if(this.validateForm.status === "VALID")
    {
      this.isConfirmLoading = true;
      this.User = new User(this.validateForm.value);
      this._AuthService.userAuthentication(this.User).subscribe(
        (success:IUser)=>{
          this.isConfirmLoading = false;
          this.router.navigate(["/myprofile"]);
        },
        error=>{
          console.log(error);
        }
      );
    }
  }

  constructor(private fb: FormBuilder,private _AuthService:AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      usernameOrEmail: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }
}