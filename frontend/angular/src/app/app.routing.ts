import {AdminLayoutComponent, AuthLayoutComponent} from "./core";

import {Routes} from "@angular/router";
import {AuthGuard} from "@app/_helpers/auth.guards";
import {Role} from "@app/_helpers/role";

export const AppRoutes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: "crud",
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import("./crud/crud.module").then(m => m.CrudModule),
      //   data: { roles: [Role.Admin] }
      // },
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "session",
        loadChildren: () =>
          import("./session/session.module").then(m => m.SessionModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "session/404"
  }
];
