import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from "@angular/common";
import { Tooltip } from "./Tooltip";
import { TooltipContent } from "./TooltipContent";

export * from "./Tooltip";
export * from "./TooltipContent";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        CommonModule
    ],
    declarations: [
        Tooltip,
        TooltipContent,
    ],
    exports: [
        Tooltip,
        TooltipContent,
    ]})
export class TooltipModule {

}