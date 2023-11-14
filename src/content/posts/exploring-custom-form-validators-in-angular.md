---
title: Exploring Custom Form Validators In Angular
author: Elanna Grossman
date: 2021-06-15T21:42:07-07:00
description: In this article I show how to create custom form validators in Angular's Reactive Form library and how to use them.
canonical_url: https://hapax-legomenon.net/2021/06/exploring-custom-form-validators-in-angular
cover_image: https://live.staticflickr.com/5635/30961256076_198998e721_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://flickr.com/photos/jadeilyn/30961256076/
cover_image_title: Lonely Road
category: development
tags: angular,custom validator,form validation,reactive forms
slug: exploring-custom-form-validators-in-angular
published: true
---

I believe that the reactive form library in Angular is one of the most powerful tools in the framework. Developers can create performant and reactive forms that provide great UI/UX. One part of the reactive form toolkit that I think people often overlook is creating custom validators. In this article I show how to create a custom password field validator and how to use it.

Reactive forms create objects that all inherit from the same [`AbstractControl`](https://angular.io/api/forms/AbstractControl). The `AbstractControl` has an [`errors`](https://angular.io/api/forms/AbstractControl#errors) object property, which is where I can get or set validation errors for the form or particular control. This `errors` object contains key value pairs. When using the default built-in validation, these key value pairs are predefined with specific (often boolean) values. That means that I would need to evaluate the error value and decide what error message to show the user. However, it is possible to create [custom validators](https://angular.io/guide/form-validation#defining-custom-validators), and they can return key value pairs with error message values instead of booleans. This means that I can set up reusable validators to both perform validation, and handle setting up their own human-readable error messages.

## Using the Built-in Validators

The built-in validators are powerful and easy to use. The [official documentation](https://angular.io/api/forms/Validators#validators) shows each one and how to use it. For this example, I want to add the following validation to the password field:

1. Make the field required.
2. Require a minimum of 8 characters.
3. Require at least one number.
4. Require at least one special character.

In my sample register form, I could add four of the built-in validators to do this:

```ts
private createForm(): FormGroup {
  const form = this.fb.group({
    email: [''],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[-+_!@#$%^&*,.?]/),
        Validators.pattern(/[0-9]/),
      ],
    ],
  });

  return form;
}
```

Then I would bind the error properties to the template, and write messages based on which errors are active:

```html
<mat-form-field>
  <input
    name="password"
    id="password"
    type="password"
    matInput
    placeholder="Password"
    formControlName="password"
    required
  />
  <mat-error *ngIf="form.get('password')?.errors">
    <div *ngIf="form.get('password')?.errors?.required">
      Password is required.
    </div>
    <div *ngIf="form.get('password')?.errors?.minlength">
      Password must be at least 8 characters.
    </div>
    <div *ngIf="form.get('password')?.errors?.pattern?.requiredPattern === '/[-+_!@#$%^&*,.?]/'">
      Password requires at least one special character.
    </div>
    <div *ngIf="form.get('password')?.errors?.pattern?.requiredPattern === '/[0-9]/'">
      Password requires at least one number.
    </div>
  </mat-error>
</mat-form-field>
```

This works fine, and gives the user reactive feedback on if their password meets the requirements. There are two reasons that I prefer using custom validators, however. The first is that the built-in validators only handle the most common use cases. The second is that I like to consolidate where I create validation error messages. The built-in validators provide me the tools I need to write error messages, but the properties are not readable by regular users. So I need to write the messages by hand, it makes this code hard to reuse. It would be nice to have code where I can keep the responsibility of creating human-readable error messages, and handle any complex validation logic.

## Creating a Custom PasswordValidator

Custom form validators are simply functions. I prefer to put them in classes, and I usually make them static because of how straightforward the logic is to write. Custom validators act on the passed in `AbstractControl`. This is where the I can evaluate whatever I want about the `AbstractControl`. Custom validators expect one of two values returned. `null` means that validation passed, and there are no errors. [`ValidationErrors`](https://angular.io/api/forms/ValidationErrors) is just a wrapping for a key value pair and is how I return error messages. These error messages can be static and hard coded, or dynamic. Below I show an example for some simple validation I could do for creating a new password:

```ts
export class PasswordValidator {
  static validPassword(isRequired: boolean = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return isRequired ? { invalidPassword: `Password is required.` } : null;
      }
      if (control.value.length < 8) {
        return { invalidPassword: `Password is too short.` };
      }
      if (!CONSTANTS.SYMBOL_REGEX.test(control.value)) {
        return {
          invalidPassword: `Password requires at least one special character.`,
        };
      }
      if (!CONSTANTS.DIGIT_REGEX.test(control.value)) {
        return {
          invalidPassword: `Password requires at least one numeric character.`,
        };
      }

      return null;
    };
  }
}
```

This custom password validator checks for the same four requirements that I listed separately with the built-in validators. If I know that I will want to always check for those four requirements, it is nice to have them collected in a single method.

I like putting a amount of logic to handle if the field is required or not here (as seen with `if (!control.value)`) so I don’t need to bind multiple validators to a single control, but that’s personal preference. I moved the regular expressions to a constants file and named them since I can find them hard to read. The default behavior is that form validators update whenever a user changes a value on the form. However, it is possible to do something like add a debounce to tweak how often it fires.

## Using the Validator

Custom validators are easy to use. In the component where I set up my reactive form, I can use my custom validators at any level of the form. This means that I can apply the validator to a [`FormControl`](https://angular.io/api/forms/FormControl), a [`FormArray`](https://angular.io/api/forms/FormArray), or an entire [`FormGroup`](https://angular.io/api/forms/FormGroup). In a future post I will show how to create a validator that can evaluate and compare multiple control values. Here though, I just need to pass the validator to the FormControl value I am creating. I am using [`FormBuilder`](https://angular.io/api/forms/FormGroup) in this example:

```ts
private createForm(): FormGroup {
  const form = this.fb.group({
    email: [''],
    password: [
      '',
      Validators.compose([PasswordValidator.validPassword(true)]),
    ],
  });

  return form;
}
```

Since I made my method static, I invoke it as `PasswordValidator.validPassword(true)`. If I had used a service, I would inject like `this.passwordValidator.validPassword(true)` instead. As I like to handle if it’s required or not with a single validator, I pass true to the method (again, this is just personal preference and not required when making a custom validator).

Now that I have moved the logic of figuring out what message to show to the user out of the template, I can simplify what is in the template a lot:

```html
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
```

I added the second check of `error.key !== 'required'` here to skip over the required error that Angular adds automatically when I add the `required` attribute to the input element. For non-example projects, I normally use a custom pipe to handle traversing the errors object rather than the [`keyvalue`](https://angular.io/api/common/KeyValuePipe) pipe here. I’ll explain that in more detail in a follow up article.

## Testing the Validator

It is really easy to write unit tests for these kinds of validators. This way I can write custom logic and feel confident that it does what I expect and that I am handling edge cases. Below are some example test snippets, and the rest are [here](https://github.com/Karvel/angular-password-strength/blob/main/src/app/infrastructure/utils/validators/password-validator.spec.ts):

```ts
it(`should return null if value matches RegEx`, () => {
  passwordControl.setValue('passwordTest1!');
  expect(passwordValidator(passwordControl)).toEqual(null);
});

it(`should return { invalidPassword: 'Password is too short.' } when value is too short`, () => {
  passwordControl.setValue('test');
  const expectedValue = { invalidPassword: 'Password is too short.' };
  expect(passwordValidator(passwordControl)).toEqual(expectedValue);
});

it(`should return { invalidPassword: 'Password requires at least one special character.' } when missing special characters`, () => {
  passwordControl.setValue('passwordTest1');
  const expectedValue = {
    invalidPassword: 'Password requires at least one special character.',
  };
  expect(passwordValidator(passwordControl)).toEqual(expectedValue);
});

it(`should return { invalidPassword: 'Password requires at least one numeric character.' } when missing numeric characters`, () => {
  passwordControl.setValue('passwordTest!');
  const expectedValue = {
    invalidPassword: 'Password requires at least one numeric character.',
  };
  expect(passwordValidator(passwordControl)).toEqual(expectedValue);
});
```

Between creating custom validators like this and then [listening to the form state](https://hapax-legomenon.net/2021/06/making-a-password-strength-component-in-angular/), developers can create reactive and engaging content for users.

## Resources

The repository includes [unit tests for the validator](https://github.com/Karvel/angular-password-strength/blob/main/src/app/infrastructure/utils/validators/password-validator.spec.ts) to help dial in the desired behavior. [Here](https://github.com/Karvel/angular-password-strength) is the repository on GitHub, and [here](https://stackblitz.com/github/Karvel/angular-password-strength) is a working demo of the code on StackBlitz.
