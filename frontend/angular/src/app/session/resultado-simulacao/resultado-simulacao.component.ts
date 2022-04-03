import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-resultado-simulacao",
  templateUrl: "./resultado-simulacao.component.html",
  styleUrls: ["./resultado-simulacao.component.scss"]
})
export class ResultadoSimulacaoComponent implements OnInit {
  formSimulacao: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  data = {
    valorPagoAtual: "",
    taxaAtual: "",
    valorPagoNovo: "",
    taxaNovo: "",
  }
  userid = null;

  constructor(
    translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.params.subscribe(params => {
      this.userid = this.route.snapshot.paramMap.get('id');
    });
  }

  ngOnInit() {
    this.formSimulacao = this.formBuilder.group({
      valorCreditoFinanciado: ["", Validators.compose([])],
      valorParcelaAtual: ["", Validators.compose([])],
      numeroTotalPrestacoes: ["", Validators.compose([])],
      numeroPrestacoesRestantes: ["", Validators.compose([])],
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

    console.log('ddd', this.f.cpf.value, this.f.email.value, this.f.telefone.value);
  }
}
