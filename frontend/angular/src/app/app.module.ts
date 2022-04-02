import {
  AdminLayoutComponent,
  AuthLayoutComponent,
  HeaderComponent,
  LayoutComponent,
  MenuComponent,
  NotificationComponent,
  OptionsComponent,
  SidebarComponent
} from "./core";
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
// import {AgmCoreModule} from "@agm/core";
import {AppComponent} from "./app.component";
import {AppRoutes} from "./app.routing";
import {BidiModule} from "@angular/cdk/bidi";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgMaterialMultilevelMenuModule} from "ng-material-multilevel-menu";
import {NgxMaskModule} from 'ngx-mask';
import {NgModule} from "@angular/core";
import {PERFECT_SCROLLBAR_CONFIG} from "ngx-perfect-scrollbar";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {RouterModule} from "@angular/router";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {JwtInterceptor} from "@app/_interceptors/jwt.interceptor";
import {ErrorInterceptor} from "@app/_interceptors/error.interceptor";
// import {fakeBackendProvider} from "@app/_helpers/fake-backend";
import {FooterComponent} from "@app/footer/footer.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotificationComponent,
    OptionsComponent,
    MenuComponent,
    AdminLayoutComponent,
    LayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    NgxMaskModule.forRoot(),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    FlexLayoutModule,
    BidiModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "YOUR_GOOGLE_API_KEY"
    // }),
    PerfectScrollbarModule,
    NgMaterialMultilevelMenuModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
