import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-simulacao",
  templateUrl: "./simulacao.component.html",
  styleUrls: ["./simulacao.component.scss"]
})
export class SimulacaoComponent implements OnInit {
  formSimulacao: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.formSimulacao = this.formBuilder.group({
      valorCreditoFinanciado: ["", Validators.required],
      valorParcelaAtual: ["", Validators.required],
      numeroTotalPrestacoes: ["", Validators.required],
      numeroPrestacoesRestantes: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.formSimulacao.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formSimulacao.invalid) {
      return;
    }

  }
}
