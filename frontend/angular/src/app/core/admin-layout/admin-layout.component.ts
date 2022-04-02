import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import {filter, map} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";
import {AuthenticationService} from "@app/_services/authentication.service";

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: "app-layout",
  template: `
    <app-layout-inner
      [isScreenSmall]="isScreenSmall | async"
    ></app-layout-inner>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent {
  isScreenSmall: Observable<boolean>;

  constructor(public breakpoints: BreakpointObserver,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.isScreenSmall = breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));

    // if (authenticationService.currentUserValue !== null && this.route.snapshot['_routerState'].url == '/') {
    //   this.router.navigate(['/']);
    // }
  }
}

@Component({
  selector: "app-layout-inner",
  templateUrl: "./admin-layout.component.html"
})
export class LayoutComponent implements OnInit, OnDestroy {
  private layoutRouter: Subscription;
  @Input() isScreenSmall: boolean;

  url: string;
  sidePanelOpened;
  options = {
    collapsed: true,
    boxed: false,
    dark: false,
    dir: "ltr"
  };

  @ViewChild("sidemenu", { static: true }) sidemenu;
  @ViewChild(PerfectScrollbarDirective, { static: true })
  directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.url = this.router.url;

    this.layoutRouter = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        document.querySelector(
          ".app-inner > .mat-drawer-content > div"
        ).scrollTop = 0;
        this.url = event.url;
        this.runOnRouteChange();
      });
  }

  ngOnDestroy(): void {
    this.layoutRouter.unsubscribe();
  }

  openCloseSideBar() {
    this.sidemenu.toggle();
    this.options.collapsed = false
  }


  runOnRouteChange(): void {
    if (this.isScreenSmall) {
      this.options.collapsed = false;
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
    if (this.isScreenSmall) {
      if (this.options.collapsed) {
        this.sidemenu.open();
      } else {
        this.sidemenu.toggle();
      }
    }
  }

  menuMouseOver(): void {
    if (this.isScreenSmall && this.options.collapsed) {
      this.sidemenu.mode = "over";
    }
  }

  menuMouseOut(): void {
    if (this.isScreenSmall && this.options.collapsed) {
      this.sidemenu.mode = "side";
    }
  }

  updatePS(): void {
    setTimeout(() => {
      this.directiveScroll.scrollable('y');
      this.directiveScroll.update();
    }, 350);
  }
}
