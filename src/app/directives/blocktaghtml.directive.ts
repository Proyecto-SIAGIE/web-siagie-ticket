import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[blockTagHtml]",
})
export class BlockTagHtmlDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener("input", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    const regex = /[<>]/;
    let newValue = value.replace(regex, "");

    // Updates the model
    this.ngControl.control?.patchValue(newValue);
  }
}
