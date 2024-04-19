import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor {
    @Input() type = 'text';
    @Input() label = '';
  
    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
    }
  
    writeValue(obj: any): void { }
    
    registerOnChange(fn: any): void { }
    
    registerOnTouched(fn: any): void { }
  
    get control(): FormControl {
        return this.controlDir.control as FormControl;
    }
}
