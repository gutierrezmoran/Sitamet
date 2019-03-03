import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MovementValidatorProvider {

  private _validator: FormGroup;
  private _messages;

  constructor(private translate: TranslateService) {
    this.initializeValidator();
  }

  private async initializeValidator() {
    this._messages = {
      'concept': [
        { type: 'required', message: this.translate.instant("CONCEPT_REQUIRED") },
        { type: 'minlength', message: this.translate.instant("CONCEPT_MIN_LENGTH") },
        { type: 'maxlength', message: this.translate.instant("CONCEPT_MAX_LENGTH") },
        { type: 'pattern', message: this.translate.instant("CONCEPT_PATTERN") },
      ],
      'value': [
        { type: 'required', message: this.translate.instant("VALUE_REQUIRED") },
        { type: 'pattern', message: this.translate.instant("VALUE_PATTERN") }
      ]
    }

    this._validator = new FormGroup({
      concept: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("[A-Za-z0-9\\s\\.\\,]+")]),
      value: new FormControl('', [Validators.required, Validators.pattern("^(\\-|\\+)?\\d+(\\.\\d+)?$")])
    });
  }

  hasError(control: AbstractControl): boolean {
    if (control.dirty) {
      return control.errors != null;
    }
  }

  get errors(): boolean {
    if (this._validator.dirty) {
      return !this._validator.valid;
    }

    return true;
  }

  get validator(): FormGroup {
    return this._validator;
  }

  get messages(): object {
    return this._messages;
  }

  reset() {
    this.initializeValidator();
  }

}
