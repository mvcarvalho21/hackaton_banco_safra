import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "@app/_services/authentication.service";
import {AppRoutes} from "@app/app.routing";

@Injectable()
export class MenuService {
  constructor(public translate: TranslateService,
              private authenticationService: AuthenticationService) {}

  canActivate(url_route) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      let route_values = AppRoutes[0].children;
      for (let e in route_values) {
        if (route_values[e].path == url_route && route_values[e].data) {
          return route_values[e].data.roles.indexOf(currentUser.role) === -1;
        }
      }
      return false;
    }
    return true;
  }

  getAll() {
    return [
      {
        link: "/cotacoes",
        hidden: this.canActivate('cotacoes'),
        label: this.translate.instant("Cotações"),
        icon: "directions_run",
        // disabled: true
      },
      // {
      //   link: "/",
      //   label: this.translate.instant("Calendário"),
      //   icon: "video_library",
      //   // disabled: true
      // },
    ];
  }
}
