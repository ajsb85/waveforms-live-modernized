import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

//Services
import { UtilityService } from '../../services/utility/utility.service';

@Directive({
    standalone: false,
    selector: '[formatInput]'
})
export class FormatInputDirective {
    @Output('valChange') valChange: EventEmitter<number> = new EventEmitter<number>();
    public ignoreFocusOut: boolean = false;

    constructor(
        public utilService: UtilityService
    ) {

    }

    @HostListener('focusout', ['$event']) onFocusOut(event) {
        if (!this.ignoreFocusOut) {
            this.parseAndEmit(event);
        }
        this.ignoreFocusOut = false;
    }

    @HostListener('keypress', ['$event']) onkeypress(event) {
        if (event.key === 'Enter') {
            this.parseAndEmit(event);
            this.ignoreFocusOut = true;
        }
    }

    public parseAndEmit(event) {
        let val: number = this.utilService.parseBaseNumberVal(event);
        this.valChange.emit(val);
    }
}