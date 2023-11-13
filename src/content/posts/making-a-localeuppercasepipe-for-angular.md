---
title: Making a LocaleUpperCasePipe for Angular
author: Elanna Grossman
date: 2021-03-22T04:57:04-07:00
description: In Angular, I recently realized the UpperCasePipe is not locale aware. Since it is easy to create custom pipes in Angular, I made a LocaleUpperCasePipe.
canonical_url: https://hapax-legomenon.net/2021/03/making-a-localeuppercasepipe-for-angular/?utm_source=rss&utm_medium=rss&utm_campaign=making-a-localeuppercasepipe-for-angular
cover_image: https://live.staticflickr.com/2262/2290027938_268e2f34c4_z.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://www.flickr.com/photos/jadeilyn/2290027938/
cover_image_title: Métro graffiti
category: development
tags: angular,angular pipe,toLocaleUpperCase, pipe
slug: making-a-localeuppercasepipe-for-angular
published: true
---

## The Problem

Angular uses pipes to help transform how data appears in the template. It provides a number of [built-in pipes](https://angular.io/api?type=pipe) like `DatePipe` and `UpperCasePipe`. However, while working on a localization feature for a work project, a coworker pointed out that `UpperCasePipe` uses [`toUpperCase()` under the hood.](https://github.com/angular/angular/blob/master/packages/common/src/pipes/case_conversion_pipes.ts#L100) `toUpperCase()` is not locale aware, and will fail at capitalizing letters for certain locales correctly, [namely Turkish](http://www.moserware.com/2008/02/does-your-code-pass-turkey-test.html). Since it is easy to create custom pipes in Angular, I decided to create one that is locale-aware. In this post, I will share the code for the LocaleUpperCasePipe, explain how to use it, and provide links to the repository and a demo.

When given a lowercase value like “ılıman ilik”, the `UpperCasePipe` will return `ILIMAN ILIK`, which is wrong. The correct result should be `ILIMAN İLİK`. (I apologize for the silly Turkish. I am not a speaker and I was looking for an easy test value).

## The LocaleUpperCasePipe

Pipes can take arguments. I have designed this one to accept an optional locale argument. If it receives no argument, it uses a fallback value of a default language.

```ts
import { Pipe, PipeTransform } from '@angular/core';

import { Constants } from '../../utils/constants';

@Pipe({ name: 'localeuppercase' })
export class LocaleUpperCasePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    language?: string
  ): string | null {
    if (value == null) {
      return null;
    }
    if (typeof value !== 'string') {
      return '';
    }
    const locale = language || Constants.defaultLanguage;

    try {
      return value.toLocaleUpperCase(locale);
    } catch (error) {
      console.warn(error);
      return value.toLocaleUpperCase(Constants.defaultLanguage);
    }
  }
}
```

I designed the pipe to prefer a passed-in locale argument to the fallback value. If the locale argument is an invalid value, the pipe catches the error, outputs it as a warning to the console, and falls back to using the default locale value. There is a default language value so in cases where the default language would be something like Turkish, it can be set, and then the pipe can be used without needing to pass in an argument (unless capitalizing a word from a different language).

The constants file looks like this:

```ts
export interface IConstant {
  defaultLanguage: string;
}

export const Constants: IConstant = {
  defaultLanguage: 'en-US',
};
```

## Using the Pipe

Here is an example of using the pipe with no argument:

```js
{{ testValue | localeuppercase }}
```

And here is the pipe with a locale argument:

```js
{{ testValue | localeuppercase: "tr-TR" }}
```

## Resources

The repository includes [unit tests for the pipe](https://github.com/Karvel/angular-locale-uppercase-pipe/blob/development/src/app/infrastructure/shared/pipes/locale-upper-case.pipe.spec.ts) to help dial in the desired behavior, and shows [multiple examples](https://github.com/Karvel/angular-locale-uppercase-pipe/blob/development/src/app/features/sandbox/test/test.component.html) of the pipe being used.

[Here](https://github.com/Karvel/angular-locale-uppercase-pipe) is the repository on GitHub, and [here](https://stackblitz.com/github/Karvel/angular-locale-uppercase-pipe) is a working demo of the code on StackBlitz.
