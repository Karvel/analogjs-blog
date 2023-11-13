---
title: Making a Password Strength Component in Angular
author: Elanna Grossman
date: 2021-06-09T00:28:38-07:00
description: In this post I show how to use Angular's Reactive Forms and RxJS to make a password strength component and requirement checker.
canonical_url: https://hapax-legomenon.net/2021/06/making-a-password-strength-component-in-angular/?utm_source=rss&utm_medium=rss&utm_campaign=making-a-password-strength-component-in-angular
cover_image: https://live.staticflickr.com/3672/10356922586_7a62f75bfb_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://flickr.com/photos/jadeilyn/10356922586
cover_image_title: Western Diamond-backed Rattlesnake
category: development
tags: angular,reactive forms,rxjs
slug: making-a-password-strength-component-in-angular
published: true
---

## The Situation

Reactive Forms in Angular are incredibly powerful and let developers design experiences that provide immediate feedback to users. In this post I show how to use RxJS in a reactive form to provide useful UI feedback for a common use case: creating a password strength component to show password indicators to users creating passwords.

![Password Strength Component animation](https://hapax-legomenon.net/wp-content/uploads/2021/06/Peek-2021-06-15-01-43.gif)

## The Register Form

First, I decided to create distinct check box form controls for each password requirement and strength indicator. This lets me update the control for each indicator independently. I set the controls to disabled, so that the values can only be triggered programmatically, rather than directly by the user. The requirement indicator values start as false since none of them should be checked at first. I like to set this up in the parent component where I set up my reactive form. That is because I believe the parent component should be the source of truth for the controls in a form.

I go over creating custom validators like `PasswordValidator.validPassword()` in a [follow up post](https://hapax-legomenon.net/2021/06/exploring-custom-form-validators-in-angular/). For the sake of simplicity in this example, I combined using both password requirement indicators with a validator and the password strength indicator. In a real world scenario, I don’t think I would use the validator with the password strength indicator. To achieve that effect, it would be easy enough to remove `Validators.compose([PasswordValidator.validPassword(true)]),` below:

```ts
private createForm(): FormGroup {
  const form = this.fb.group({
    email: [''],
    password: [
      '',
      Validators.compose([PasswordValidator.validPassword(true)]),
    ],
    passwordMin: { value: false, disabled: true },
    passwordDigit: { value: false, disabled: true },
    passwordSpecial: { value: false, disabled: true },
    passwordSlider: { value: 0, disabled: true },
  });

  return form;
}
```

The register template is very straightforward. I moved the password strength part to its own component to make it easier to reuse. I pass the form instance with an input binding to `app-password-strength`.

```html
<form [formGroup]="form">
  <div class="register-field">
    <mat-form-field>
      <input
        name="email"
        id="email"
        type="text"
        matInput
        placeholder="Email"
        formControlName="email"
        required
      />
    </mat-form-field>
  </div>
  <div>
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
    </mat-form-field>
  </div>
  <button
    class="submit-button"
    type="submit"
    mat-raised-button
    color="primary"
    [disabled]="!form.valid"
  >
    Register
  </button>
  <app-password-strength [form]="form"></app-password-strength>
</form>
```

## The PasswordStrengthComponent

In `PasswordStrengthComponent`, most of the work happens in `setupConditionalValidators()`. Reactive forms can expose observable streams for individual form controls or the form itself. There are two stream choices: [`statusChanges`](https://angular.io/api/forms/AbstractControl#statusChanges) and [`valueChanges`](https://angular.io/api/forms/AbstractControl#valueChanges). Here, I use `valueChanges` because I want to update the password requirement and strength indicators as specific values change. `setupConditionalValidators()` creates a subscription that listens to the `valueChanges` stream on the password form control. This way it can listen to the values emitted by the password field and update the requirement and strength indicators for each value.

The method then calls `setIndicatorValues()`, which sets each of the indicator values based on simple checks. As I find some regular expressions hard to read, I moved them to a constants file and gave them descriptive names. The subscription needs to be actively managed, so I added it to an array that is managed by `ngOnDestroy`. I prefer managing subscriptions this way instead of by using [`takeUntil()`](https://www.learnrxjs.io/learn-rxjs/operators/filtering/takeuntil). `takeUntil()` marks subscriptions as complete as a side effect, and I prefer not to do that. There is a little more code in the component like the control getter methods that I removed here for brevity.

```ts
public ngOnInit(): void {
  this.setInitialIndicatorValues();
  this.setupConditionalValidators();
}

private setIndicatorValues(controlValue: string): void {
  let passwordSliderMinValue = 0;
  let passwordSliderSpecialValue = 0;
  let passwordSliderDigitValue = 0;

  if (controlValue.length >= 8) {
    this.passwordMin.setValue(true);
    passwordSliderMinValue = 1;
  } else {
    this.passwordMin.setValue(false);
    passwordSliderMinValue = 0;
  }
  if (CONSTANTS.SYMBOL_REGEX.test(controlValue)) {
    this.passwordSpecial.setValue(true);
    passwordSliderSpecialValue = 1;
  } else {
    this.passwordSpecial.setValue(false);
    passwordSliderSpecialValue = 0;
  }
  if (CONSTANTS.DIGIT_REGEX.test(controlValue)) {
    this.passwordDigit.setValue(true);
    passwordSliderDigitValue = 1;
  } else {
    this.passwordDigit.setValue(false);
    passwordSliderDigitValue = 0;
  }
  this.passwordSlider.setValue(
    passwordSliderMinValue +
      passwordSliderSpecialValue +
      passwordSliderDigitValue
  );
  switch (this.passwordSlider.value) {
    case 0:
      this.strengthHint.message = 'Weak';
      this.strengthHint.color = 'red';
      break;
    case 1:
      this.strengthHint.message = 'Okay';
      this.strengthHint.color = 'orange';
      break;
    case 2:
      this.strengthHint.message = 'Good';
      this.strengthHint.color = 'yellow';
      break;
    case 3:
      this.strengthHint.message = 'Strong';
      this.strengthHint.color = 'green';
      break;
  }
}

/** Set the indicator values based on the initial password form control value. */
private setInitialIndicatorValues(): void {
  this.setIndicatorValues(this.password.value);
}

/** Listens to the password input in the form and updates the requirements list. */
private setupConditionalValidators(): void {
  const passwordControlSubscription: Subscription = this.password.valueChanges.subscribe(
    (controlValue: string) => this.setIndicatorValues(controlValue)
  );

  this.subscriptions.push(passwordControlSubscription);
}
```

The constants file with the regular expressions looks like this:

```ts
interface Constants {
  readonly DIGIT_REGEX: RegExp;
  readonly SYMBOL_REGEX: RegExp;
}

export const CONSTANTS: Constants = {
  DIGIT_REGEX: /[0-9]/,
  SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
};
```

The password strength template just contains the styling for the component along with the form controls:

```html
<form [formGroup]="form">
  <div class="password-container">
    <h2>Password Requirements</h2>
    <div class="password-requirements-row">
      <mat-checkbox formControlName="passwordMin">
        Password length
      </mat-checkbox>
      <mat-checkbox formControlName="passwordDigit">
        Contains at least 1 digit
      </mat-checkbox>
      <mat-checkbox formControlName="passwordSpecial">
        Contains at least 1 symbol
      </mat-checkbox>
    </div>
    <mat-slider
      class="password-strength"
      [max]="3"
      [min]="0"
      formControlName="passwordSlider"
    >
    </mat-slider>
    <mat-hint class="hint-text" [ngStyle]="{ color: strengthHint.color }">{{ strengthHint.message }}</mat-hint>
  </div>
</form>
```

I made a simple UI using checkboxes for the password strength indicators. Using the password `valueChanges` subscription above though, it would be easy to design any number of highly reactive UIs to help the user as they set up a password.

I made this as a simple tutorial example. If I were to use this in production, I would also pass a config object to `PasswordStrengthComponent` which gives the names for the indicator controls. That way, I could have that implementation come from the parent component.

## Resources

The repository includes [unit tests for the indicator controls](https://github.com/Karvel/angular-password-strength/blob/main/src/app/infrastructure/shared/components/password-strength/password-strength.component.spec.ts) to help dial in the desired behavior. [Here](https://github.com/Karvel/angular-password-strength) is the repository on GitHub, and [here](https://stackblitz.com/github/Karvel/angular-password-strength) is a working demo of the code on StackBlitz.
