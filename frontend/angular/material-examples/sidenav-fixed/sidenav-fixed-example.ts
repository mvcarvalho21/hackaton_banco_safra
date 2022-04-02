import {FormBuilder, FormGroup} from "@angular/forms";

import {Component} from "@angular/core";

/** @title Fixed sidenav */
@Component({
  selector: "sidenav-fixed-example",
  templateUrl: "sidenav-fixed-example.html",
  styleUrls: ["sidenav-fixed-example.css"]
})
export class SidenavFixedExample {
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );
}
