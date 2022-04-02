import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "@app/_services/authentication.service";
import {first} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {CPFValidator} from "@app/_util/validator";
let md5 = require('md5');

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    translate: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.form = this.fb.group({
      cpf: this.fb.control({value: null, disabled: false},
          Validators.compose([Validators.required, CPFValidator.isValidCpf()])),
      email: ["", Validators.compose([Validators.email])],
      telefone: ["", Validators.compose([])],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.authenticationService.login(this.f.email.value, md5(this.f.senha.value))
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }
}
