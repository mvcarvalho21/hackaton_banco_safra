import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {RequestSimulacao, ReturnSimulacao} from "@app/session/sension.model";
import {SessionService} from "@app/session/session.service";

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
  userid = null;
  parcelaVariavel = true;
  parcelaFixa = false;
  resultadoSimulacao = null;
  dadosIniciaisSimulacao = true;
  dadosResultadoSimulacao = false;
  fimSimulacao = false;
  isMobile = true;
  public bancoSafraUrl: string = 'https://www.safra.com.br/';

  constructor(
    translate: TranslateService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.params.subscribe(params => {
      this.userid = this.route.snapshot.paramMap.get('id');
    });
  }

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

    let data: RequestSimulacao = {
      amount_installment: this.f.numeroTotalPrestacoes.value,
      amount_of_rest_installment: this.f.numeroPrestacoesRestantes.value,
      actual_value_installment: this.f.valorParcelaAtual.value,
      financed_value_without_fee: this.f.valorCreditoFinanciado.value,
      type: this.parcelaVariavel ? 'variable' : (this.parcelaFixa ? 'fixed' : '')
    }

    this.sessionService.cadastraSolicitacao(this.userid, data)
        .subscribe(
            response => {
              if (response != null && String(response) != "-1") {
                this.resultadoSimulacao = {
                  actual_tax: (response.actual_tax).toFixed(2).replace(".", ","),
                  actual_value_installment: (response.actual_value_installment).toFixed(2).replace(".", ","),
                  new_value_installment: (response.new_value_installment).toFixed(2).replace(".", ","),
                  new_tax: (response.new_tax).toFixed(2).replace(".", ","),
                  saved_value: (response.saved_value).toFixed(2).replace(".", ","),
                  new_total_value: (response.new_total_value).toFixed(2).replace(".", ","),
                  id_offer: response.id_offer,
                  num_parcelas_restantes: data.amount_of_rest_installment
                }
                if (this.resultadoSimulacao != null) {
                  this.dadosIniciaisSimulacao = false;
                  this.dadosResultadoSimulacao = true;
                }
              } else {
                this.dadosIniciaisSimulacao = false;
                this.dadosResultadoSimulacao = false;
                this.fimSimulacao = true;
              }
            }, error => {
              console.log("error", error);
            }
        );

    // this.router.navigate([`/session/resultadosimulacao/${this.userid}`]);
  }

  changeParcela() {
    this.parcelaVariavel = !this.parcelaVariavel;
    this.parcelaFixa = !this.parcelaFixa;
  }

  portabilizar() {
    this.dadosIniciaisSimulacao = false;
    this.dadosResultadoSimulacao = false;
    this.fimSimulacao = true;
  }

  goBancoSafra() {
    window.location.href = "";
  }
}
