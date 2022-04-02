import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/_services/authentication.service";
import {User} from "@app/_helpers/user";

@Component({
  selector: 'app-root',
  template: "<router-outlet></router-outlet>"
})
export class AppComponent {
  
  currentUser: User;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    translate: TranslateService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }

}
