import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "input[textDirective]",
})
export class TextDirective {
  constructor(
    private readonly elRef: ElementRef,
    private ngControl: NgControl
  ) {}
  @HostListener("input", ["$event"])
  onInputChange(event: Event): void {
    const numbersOnly = /[^a-zA-ZñÑá-úÁ-Ú, ]*/g;

    const initValue = this.elRef.nativeElement.value;
    const newValue = initValue.replace(numbersOnly, "");
    this.elRef.nativeElement.value = newValue;

    // Updates the model
    this.ngControl.control?.patchValue(newValue);
    if (initValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
