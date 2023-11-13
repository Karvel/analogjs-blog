---
title: Creating a Multi-Control Custom Validator in Angular
author: Elanna Grossman
date: 2021-06-22T20:56:30-07:00
description: In this post I make a multi-control custom validator that compares if two fields match to show what is possible with forms in Angular.
canonical_url: https://hapax-legomenon.net/2021/06/creating-a-multi-control-custom-validator-in-angular/?utm_source=rss&utm_medium=rss&utm_campaign=creating-a-multi-control-custom-validator-in-angular
cover_image: https://live.staticflickr.com/2504/3760365901_ccbfae1188_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://flickr.com/photos/jadeilyn/3760365901
cover_image_title: Sunset
category: development
tags: angular,custom validator,form validation,reactive forms
slug: creating-a-multi-control-custom-validator-in-angular
published: true
---

Custom validators in Angular’s reactive form library are one of the most powerful (and in my opinion overlooked) tools a developer has to create better form UI/UX. Custom validators aren’t just limited to a single control. It is easy to evaluate an entire group. This is great for comparing multiple controls. In this article I create a multi-control custom validator that validates two fields if their values match to show an example of what is possible.

As I mentioned in my [previous article about custom validators](https://hapax-legomenon.net/2021/06/exploring-custom-form-validators-in-angular/), I like using them to both handle custom logic that the built-in validators don’t, and to be able to create the validation error messages in one spot. This makes custom validators powerful and very reusable.

## Creating a Multi-Control Custom Validator

![Animated image demonstrating the multi-control custom validator](https://hapax-legomenon.net/wp-content/uploads/2021/06/match-field-validator-1.gif)

Creating a multi-control custom validator is very similar to creating a single-control one. The validator needs a passed in [`AbstractControl`](https://angular.io/api/forms/AbstractControl) parameter. In single-control validators, the control is normally a [`FormControl`](https://angular.io/api/forms/FormControl). However, for multi-control validators, I need to pass in the parent [`FormGroup`](https://angular.io/api/forms/FormGroup) as the control. Doing this gives me the scope of all of the children controls inside of the `FormGroup`. To make this validator more reusable, I also pass in the names of the controls I want to compare. I also can pass in the name of the kind of values I am comparing to make the error messages more dynamic.

I then create variables for the values from the form controls. Once I have those, I set up some simple conditionals. Since I passed in the `FormGroup` as the `AbstractControl` instead of a specific `FormControl`, if I want to set errors on the `FormControls`, I need to call [`setErrors()`](https://angular.io/api/forms/AbstractControl#seterrors) on the specific control. Otherwise, if I just return the [`ValidationErrors`](https://angular.io/api/forms/ValidationErrors), they will apply to the `FormGroup`, which isn’t what I want here.

```ts
export class MatchFieldValidator {
  static validFieldMatch(
    controlName: string,
    confirmControlName: string,
    fieldName: string = 'Password',
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue: unknown | null = control.get(controlName)?.value;
      const confirmControlValue: unknown | null = control.get(
        confirmControlName,
      )?.value;

      if (!confirmControlValue) {
        control.get(confirmControlName)?.setErrors({
          confirmFieldRequired: `Confirm ${fieldName} is required.`,
        });
      }

      if (controlValue !== confirmControlValue) {
        control
          .get(confirmControlName)
          ?.setErrors({ fieldsMismatched: `${fieldName} fields do not match.` });
      }

      if (controlValue && controlValue === confirmControlValue) {
        control.get(confirmControlName)?.setErrors(null);
      }

      return null;
    };
  }
}
```

Now that I have a working validator, I need to wire it up to the component. Since I want to be to interact with multiple `FormControls`, I need to attach the validator to the parent `FormGroup`. The [`FormBuilder`](https://angular.io/api/forms/FormBuilder) takes an options argument after the control config where I can pass in validators. I add the match field validator, along with the names of the controls I want to compare, and what kind of field I’m comparing. I’ve simplified the below code to just focus on what is relevant:

```ts
private createForm(): FormGroup {
  const form = this.fb.group({
    password: [
      '',
      Validators.compose([PasswordValidator.validPassword(true)]),
    ],
    confirmPassword: [''],
  },
  {
    validators: Validators.compose([
      MatchFieldValidator.validFieldMatch('password', 'confirmPassword', 'Password'),
    ]),
  });

  return form;
}
```

As I now having working validation, I can bind the errors to the template. I am still using the loop through the errors object via the `KeyValuePipe` for simplicity.

```html
<div class="field-group">
  <mat-form-field>
    <input
      name="password"
      id="password"
      type="password"
      matInput
      placeholder="Password"
      formControlName="password"
    />
    <mat-error *ngIf="form.get('password')?.errors">
      <ng-container *ngFor="let error of form.get('password')?.errors | keyvalue">
        <div *ngIf="error.key !== 'required'">{{ error.value }}</div>
      </ng-container>
    </mat-error>
  </mat-form-field>
  <mat-form-field>
    <input
      name="confirmPassword"
      id="confirmPassword"
      type="password"
      matInput
      placeholder="Confirm Password"
      formControlName="confirmPassword"
      required
    />
    <mat-error *ngIf="form.get('confirmPassword')?.errors">
      <ng-container *ngFor="let error of form.get('confirmPassword')?.errors | keyvalue">
        <div *ngIf="error.key !== 'required'">{{ error.value }}</div>
      </ng-container>
    </mat-error>
  </mat-form-field>
</div>
```

## Testing the Validator

Like other custom validators, it is easy to test multi-control custom validators. Writing unit tests for this validator helped me find and handle an edge case that I wasn’t handling initially also. Here are some of the example tests:

```ts
  describe('validFieldMatch() default field name', () => {
    const matchFieldValidator = MatchFieldValidator.validFieldMatch(
      'controlName',
      'confirmControlName',
    );
    const form = new FormGroup({
      controlName: new FormControl(''),
      confirmControlName: new FormControl(''),
    });
    const controlName = form.get('controlName');
    const confirmControlName = form.get('confirmControlName');

    it(`should set control error as { confirmFieldRequired: 'Confirm Password is required.' } when value is an empty string`, () => {
      controlName?.setValue('');
      confirmControlName?.setValue('');
      matchFieldValidator(form);
      const expectedValue = {
        confirmFieldRequired: 'Confirm Password is required.',
      };
      expect(confirmControlName?.errors).toEqual(expectedValue);
    });

    it(`should set control error as { fieldsMismatched: 'Password fields do not match.' } when values do not match`, () => {
      controlName?.setValue('password123!');
      confirmControlName?.setValue('password123');
      matchFieldValidator(form);
      const expectedValue = {
        fieldsMismatched: 'Password fields do not match.',
      };
      expect(confirmControlName?.errors).toEqual(expectedValue);
    });

    it(`should set control error as null when values match`, () => {
      controlName?.setValue('password123!');
      confirmControlName?.setValue('password123!');
      matchFieldValidator(form);
      expect(controlName?.errors).toEqual(null);
      expect(confirmControlName?.errors).toEqual(null);
    });

    it(`should set control error as null when control matches confirm after not matching`, () => {
      controlName?.setValue('password123!');
      confirmControlName?.setValue('password123!');
      matchFieldValidator(form);
      controlName?.setValue('password123');
      matchFieldValidator(form);
      controlName?.setValue('password123!');
      matchFieldValidator(form);
      expect(controlName?.errors).toEqual(null);
      expect(confirmControlName?.errors).toEqual(null);
    });

    it(`should set control error as null when confirm matches control after not matching`, () => {
      controlName?.setValue('password123!');
      confirmControlName?.setValue('password123!');
      matchFieldValidator(form);
      controlName?.setValue('password123');
      matchFieldValidator(form);
      confirmControlName?.setValue('password123');
      matchFieldValidator(form);
      expect(controlName?.errors).toEqual(null);
      expect(confirmControlName?.errors).toEqual(null);
    });
  });
```

Custom validators are easy to make and very powerful. Since they can be made at any level of a reactive form, it is possible to make multi-control custom validators like this one that can interact with multiple controls. This helps developers craft highly reactive UI/UX for users.

## Resources

The repository includes [unit tests for the validator](https://github.com/Karvel/angular-password-strength/blob/main/src/app/infrastructure/utils/validators/match-field-validator.spec.ts) to help dial in the desired behavior. [Here](https://github.com/Karvel/angular-password-strength) is the repository on GitHub, and [here](https://stackblitz.com/github/Karvel/angular-password-strength) is a working demo of the code on StackBlitz.
