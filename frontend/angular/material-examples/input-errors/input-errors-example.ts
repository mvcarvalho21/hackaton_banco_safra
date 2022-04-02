import {FormControl, Validators} from "@angular/forms";

import {Component} from "@angular/core";

/**
 * @title Input with error messages
 */
@Component({
  selector: "input-errors-example",
  templateUrl: "input-errors-example.html",
  styleUrls: ["input-errors-example.css"]
})
export class InputErrorsExample {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
}
