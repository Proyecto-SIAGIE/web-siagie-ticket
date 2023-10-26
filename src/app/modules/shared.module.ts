import { BlockTagHtmlDirective } from "../directives/blocktaghtml.directive";
import { NumericDirective } from "../directives/numeric.directive";
import { TextDirective } from "../directives/text.directive";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { RouterModule } from "@angular/router";
import { BlockUIModule } from "ng-block-ui";

@NgModule({
  declarations: [
    BlockTagHtmlDirective,
    NumericDirective,
    TextDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
    BlockUIModule.forRoot()
  ],
  exports: [
    BlockTagHtmlDirective,
    NumericDirective,
    TextDirective,
  ],
})
export class SharedModule {}
