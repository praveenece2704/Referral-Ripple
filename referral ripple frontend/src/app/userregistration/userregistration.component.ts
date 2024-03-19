import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent {

  registrationForm: FormGroup;
  user: User = new User('','','');

  constructor(private formBuilder: FormBuilder,private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted:', this.registrationForm.value);
      this.user.fullName=this.registrationForm.value.fullName;
      this.user.email=this.registrationForm.value.email;
      this.user.password=this.registrationForm.value.password;
      console.log(this.user);
      this.userService.registerUser(this.user)
      .subscribe(
        response => {
          console.log('API Response:', response);
          // Handle the response from the backend
        },
        error => {
          console.error('API Error:', error);
          // Handle error response from the backend
        }
      );

    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

    return null;
  }

}
