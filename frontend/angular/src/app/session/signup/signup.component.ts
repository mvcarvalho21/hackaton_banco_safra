import {Component, OnInit} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/_services/authentication.service";
import {UserService} from "@app/_services/user.service";
import {first} from "rxjs/operators";
import {AlertService} from "@app/_services/alert.service";
let md5 = require('md5');

const senha = new FormControl("", Validators.required);
const confirmSenha = new FormControl("", CustomValidators.equalTo(senha));

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      senha,
      confirmSenha
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register({ email: this.f.email.value, senha: md5(this.f.senha.value) })
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registrado com sucesso!', true);
          this.router.navigate(['/session/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
