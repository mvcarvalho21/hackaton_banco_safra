import * as Screenfull from "screenfull";
import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/_services/authentication.service";
import {User} from "@app/_helpers/user";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  options = {
    collapsed: true,
    boxed: false,
    dark: false,
    dir: "ltr"
  };

  @Output()
  toggleSidenav = new EventEmitter<void>();
  @Output()
  toggleNotificationSidenav = new EventEmitter<void>();
  @Output()
  changeSettings = new EventEmitter();
  isMobile = false;

  constructor(private router: Router,
              private deviceService: DeviceDetectorService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

  fullScreenToggle(): void {
    if (Screenfull.isEnabled) {
      Screenfull.toggle();
    }
  }

  criarUsuario() {
    this.router.navigate(['/session/register']);
  }

  alterarSenha() {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/session/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
  }

  darkMode() {
    this.options.dark = !this.options.dark;
    this.changeSettings.emit(this.options);
  }

  collapsedLayout() {
    this.options.collapsed = !this.options.collapsed;
    this.changeSettings.emit(this.options);
  }

  boxLayout() {
    this.options.boxed = !this.options.boxed;
    this.changeSettings.emit(this.options);
  }
}
