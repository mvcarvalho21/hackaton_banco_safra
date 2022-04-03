import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {ErrorComponent} from "./error/error.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ForgotComponent} from "./forgot/forgot.component";
import {LockscreenComponent} from "./lockscreen/lockscreen.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from "./not-found/not-found.component";
import {RouterModule} from "@angular/router";
import {SessionRoutes} from "./session.routing";
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {SimulacaoComponent} from "@app/session/simulacao/simulacao.component";
import {ResultadoSimulacaoComponent} from "@app/session/resultado-simulacao/resultado-simulacao.component";

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  declarations: [
    NotFoundComponent,
    ErrorComponent,
    ForgotComponent,
    LockscreenComponent,
    SigninComponent,
    SignupComponent,
    SimulacaoComponent,
    ResultadoSimulacaoComponent
  ]
})
export class SessionModule {}
