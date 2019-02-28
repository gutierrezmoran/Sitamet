import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

const MESSAGES = {
  'concept': [
    { type: 'required', message: 'The concept is required.' },
    { type: 'minlength', message: 'Must be at least 5 characters long.' },
    { type: 'maxlength', message: 'Cannot be more than 50 characters long.' },
    { type: 'pattern', message: 'Your concept must contain only numbers, letters, whitespaces, points and commas.' },
  ],
  'value': [
    { type: 'required', message: 'The value is required.' },
    { type: 'pattern', message: 'Must contain only numbers and optional part decimal.' }
  ]
}

@Injectable()
export class MovementValidatorProvider {

  private _validator: FormGroup;

  constructor() {
    this.initializeValidator();
  }

  private async initializeValidator() {
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
    return MESSAGES;
  }

  reset() {
    this._validator.reset();
  }

}
