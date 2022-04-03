import {ErrorComponent} from "./error/error.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {LockscreenComponent} from "./lockscreen/lockscreen.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {Routes} from "@angular/router";
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {SimulacaoComponent} from "@app/session/simulacao/simulacao.component";
import {ResultadoSimulacaoComponent} from "@app/session/resultado-simulacao/resultado-simulacao.component";

export const SessionRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "404",
        component: NotFoundComponent
      },
      {
        path: "error",
        component: ErrorComponent
      },
      {
        path: "forgot",
        component: ForgotComponent
      },
      {
        path: "lockscreen",
        component: LockscreenComponent
      },
      {
        path: "login",
        component: SigninComponent
      },
      {
        path: "simulacao/:id",
        component: SimulacaoComponent
      },
      {
        path: "resultadosimulacao/:id",
        component: ResultadoSimulacaoComponent
      },
      // {
      //   path: "register",
      //   component: SignupComponent
      // }
    ]
  }
];
