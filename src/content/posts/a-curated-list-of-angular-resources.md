---
title: A Curated List of Angular Resources
author: Elanna Grossman
date: 2021-08-09T19:18:41-07:00
last_updated: 2021-10-20T19:18:41-07:00
description: In this article I share a curated list of Angular resources, with topics ranging from simple to advanced.
canonical_url: https://hapax-legomenon.net/2021/08/a-curated-list-of-angular-resources
cover_image: https://live.staticflickr.com/7029/6811030363_456a9347db_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://www.flickr.com/photos/jadeilyn/6811030363/
cover_image_title: Sky Lodge view
category: development
tags: development,angular,rxjs
slug: a-curated-list-of-angular-resources
published: true
---

Having worked with Angular since mid-2017, I have collected many resources that I have found useful. I will keep this list up to date.

*Updated Oct 21, 2021* - fixed broken links.

## Angular Resources

### General Documentation

- [Angular.io](https://angular.io/docs/ts/latest/) Includes good tutorials, detailed documentation, and API references along with interactive code snippets. This should be the default destination for Angular questions. Note: There are multiple versions of the “Tour of Heroes” tutorial demonstrating different concepts.
- [Angular.io Resources](https://angular.io/resources) The official and hopefully maintained list of resources from the Angular team.
- [John Papa style guide](https://angular.io/docs/ts/latest/guide/style-guide.html) The de facto style guide for Angular has been officially adopted by the Angular team and is now hosted on the official website. It is highly opinionated, but makes good cases for its suggestions. I follow most of it and do not disagree strongly with any of its suggestions.
- [Netanel Basal](https://netbasal.com/) Another skilled Angular developer with useful tutorials and deep dive articles.
- [Angular University](https://blog.angular-university.io/) Has multiple tutorials and deep dives for all things Angular.
- [inDepth.dev community](https://indepth.dev/) Formerly Angular In Depth. Covers RxJS, NgRX and Angular in depth – has articles explaining how and why Angular is architected.
- [Todd Motto](https://ultimatecourses.com/blog/) A Google Developer Expert who writes detailed articles explaining Angular functionality and convention. His writing and explanation style differ sufficiently from the official documentation that it is a good supplemental resource.
- [Strong Brew](https://blog.strongbrew.io/) Technical high level articles for Angular, RxJS, and coding practices.

### Essential articles

- [Angular Dependency Injection Infographic](https://christiankohler.net/angular-dependency-injection-infographic) A visual explanation of how Dependency Injection works (and used to work) in Angular, and the different strategies available.
- [The 7-step process of Angular router navigation](https://www.jvandemo.com/the-7-step-process-of-angular-router-navigation/) Helps demystify the Angular routing lifecycle.
- [Angular Architecture – Smart Components vs Presentational Components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/) This explains the thought process behind the container/presenter pattern (also referred to as smart/dumb components) very well.
- [Container components with Angular](https://dev.to/this-is-angular/container-components-with-angular-4o05)
- [Everything you need to know about the `ExpressionChangedAfterItHasBeenCheckedError` error](https://indepth.dev/posts/1001/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error) Here is an explanation of how to prevent an error that learning Angular developers run into a lot.
- [How to architect epic Angular app in less than 10 minutes!](https://dev.to/angular/how-to-architect-epic-angular-app-in-less-than-10-minutes-35j2) Explanation of the project organization that I prefer.
- [Choosing The Right File Structure for Angular in 2020 and Beyond !](https://itnext.io/choosing-the-right-file-structure-for-angular-in-2020-and-beyond-a53a71f7eb05)

### Angular Best Practices

- [Clean Code Checklist in Angular](https://itnext.io/clean-code-checklist-in-angular-%EF%B8%8F-10d4db877f74)
- [Angular Best Practices](https://codeburst.io/angular-best-practices-4bed7ae1d0b7)
- [2 years of Angular: lessons learned – Craftsmen](https://craftsmen.nl/2-years-of-angular-lessons-learned/)

### Performance

- [10 Tricks to Optimize Your Angular App – Bits and Pieces](https://blog.bitsrc.io/10-tricks-to-optimize-your-angular-app-44208f616bf0)
- [Angular – Lazy-loading feature modules](https://angular.io/guide/lazy-loading-ngmodules) Lazy loading splits the app into chunks that are only loaded on demand. This both reduces bundle size, and helps separate discrete features (e.g. the admin dashboard from the user dashboard).
- [Reduce Change Detection Cycles with Event Coalescing in Angular](https://netbasal.com/reduce-change-detection-cycles-with-event-coalescing-in-angular-c4037199859f)
- [Angular OnPush Change Detection and Component Design – Avoid Common Pitfalls](https://blog.angular-university.io/onpush-change-detection-how-it-works/)
- [Everything you need to know about change detection in Angular](https://indepth.dev/posts/1053/everything-you-need-to-know-about-change-detection-in-angular) A deep dive into how Angular’s change detection works.
- [The Last Guide For Angular Change Detection You’ll Ever Need – Mokkapps (Michael Hoffmann) – Freelance Angular Software Engineer](https://www.mokkapps.de/blog/the-last-guide-for-angular-change-detection-you-will-ever-need/) This is a wonderful article that explains change detection and provides a lot of visual examples and a working sandbox to test different change detection strategies.
- [Angular Change Detection Demos](https://angular-change-detection-demo.netlify.app/complex-demo) Code demo that goes with the above article.
- [Angular ngFor – Learn All Features, Not Only For Arrays](https://blog.angular-university.io/angular-2-ngfor/) Angular’s template looping directive `*ngFor` has a lot of neat features, and one of them, `trackBy`, can help a lot with performance.

### Unit Testing

- [Angular University – Testing Course](https://angular-university.io/course/angular-testing-course)
- [GitHub – angular-university/angular-testing-course: Angular Testing Course – A complete guide to Angular Unit Testing and E2E Testing](https://github.com/angular-university/angular-testing-course)
- [Angular University – Spies](https://angular-university.io/lesson/angular-testing-jasmine-spies)
- [The Complete Guide to Angular Testing and a Weird Trick for Faster Unit Tests (2019) – Christian Lüdemann](https://christianlydemann.com/complete-guide-to-angular-testing/)
- [Unit Testing Overview • Angular](https://codecraft.tv/courses/angular/unit-testing/overview/)
- [Testing with Mocks & Spies • Angular](https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/)
- [Angular Testing: A Developer’s Introduction — SitePoint](https://www.sitepoint.com/angular-testing-introduction/)
- [Testing Angular with Jasmine and Karma (Part 1) ― Scotch.io](https://scotch.io/tutorials/testing-angular-with-jasmine-and-karma-part-1)
- [Angular Unit Testing Code-Coverage Lies – ngconf – Medium](https://medium.com/ngconf/angular-unit-testing-code-coverage-lies-603c6c85f801)
- [Unit Testing in Angular: Stubs vs Spies vs Mocks](https://www.amadousall.com/unit-testing-angular-stubs-vs-spies-vs-mocks/)
- [Create a component harness for your tests with Angular CDK](https://dev.to/this-is-angular/create-a-component-harness-for-your-tests-with-angular-cdk-46bg)
- [Lars Gyrup Brink Nielsen – WebDev inDepth](https://indepth.dev/author/layzee/)
- [angular – Can’t seem to catch error when using Jasmine toThrowError – Stack Overflow](https://stackoverflow.com/questions/40727581/cant-seem-to-catch-error-when-using-jasmine-tothrowerror)
- [Simplified example to demonstrate how to Mock a FileList for unit testing purposes. · GitHub](https://gist.github.com/amabes/88324d68690e0e7b8e313cd0cafaa219)
- [jasmine – Testing file upload in Angular with HttpClient. Unable to get hold of HTTP POST body – Stack Overflow](https://stackoverflow.com/questions/54804034/testing-file-upload-in-angular-with-httpclient-unable-to-get-hold-of-http-post)

#### Testing Tools

- [GitHub – ike18t/ng-mocks: Angular 5+ component, directive, and pipe mocking library](https://github.com/ike18t/ng-mocks)
- [Towards Better Testing In Angular. Part 1 — Mocking Child Components | by Abdul Wahab Rafehi | Medium](https://medium.com/@abdul_74410/towards-better-testing-in-angular-part-1-mocking-child-components-b51e1fd571da)

### Error Handling

- [Expecting the Unexpected — Best practices for Error handling in Angular – Angular inDepth](https://indepth.dev/posts/1465/expecting-the-unexpected-best-practices-for-error-handling-in-angular-2)

### Security

- [Angular.io Security](https://angular.io/guide/security) This is the official documentation on security in Angular, best practices, and how to avoid creating vulnerabilities.
- [6 Angular Security Best Practices – Snyk](https://snyk.io/blog/angular-security-best-practices/)
- [Angular Security Best Practices – Ordina JWorks Tech Blog](https://ordina-jworks.github.io/angular/2018/03/30/angular-security-best-practices.html)

## RxJS

### Getting Started

- [Official documentation](http://reactivex.io/rxjs/manual/index.html) The official guide for Observables. Easier to read than the API reference on the same site.
- [Angular.io Observables](https://angular.io/guide/observables) Angular documentation of Observables and RxJS. All examples are within Angular, and the guide explains how Angular uses RxJS beyond http calls.
- [RxJS Best Practices](https://blog.strongbrew.io/rxjs-best-practices-in-angular/)

### Understanding Higher Order Observable Operators

- [Comprehensive Guide to Higher-Order RxJs Mapping Operators: switchMap, mergeMap, concatMap (and exhaustMap)](https://blog.angular-university.io/rxjs-higher-order-mapping/)
- [A Super Ninja Trick To Learn RxJS’s “switchMap”, “mergeMap”, “concatMap” and “exhaustMap”, FOREVER!](https://medium.com/@shairez/a-super-ninja-trick-to-learn-rxjss-switchmap-mergemap-concatmap-and-exhaustmap-forever-88e178a75f1b)
- [Building a safe autocomplete operator in RxJS](https://blog.strongbrew.io/building-a-safe-autocomplete-operator-with-rxjs/)

### Pitfalls

- [3 Common Rxjs Pitfalls that you might find while building Angular Applications](https://blog.angular-university.io/angular-2-rxjs-common-pitfalls/)
- [RxJS Antipatterns](https://brianflove.com/2017-11-01/ngrx-anti-patterns/)
- [Angular pitfall: Multiple HTTP requests with RxJS and observable$ | async](https://blog.novanet.no/angular-pitfall-multiple-http-requests-with-rxjs-and-observable-async/)
- [3 Common Mistakes I see people use in Rx and the Observable Pattern](https://medium.com/@paynoattn/3-common-mistakes-i-see-people-use-in-rx-and-the-observable-pattern-ba55fee3d031)

### Subscriptions

- [Handling Observables with NgIf and the Async Pipe](https://toddmotto.com/angular-ngif-async-pipe)
- [The Ultimate Answer To The Very Common Angular Question: subscribe() vs | async Pipe](https://netbasal.com/why-its-important-to-unsubscribe-from-rxjs-subscription-a7a6455d6a02)

### Understanding Hot and Cold Observables

- [Cold vs Hot Observables](https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html)
- [My favorite metaphor for hot vs cold observables](https://blog.strongbrew.io/my-favorite-metaphor-for-hot-vs-cold-observables/)
- [Visualizing Reactive Streams: Hot and Cold Observables](https://jaredforsyth.com/posts/visualizing-reactive-streams-hot-and-cold/)
- [Multicasting operators in RxJS](https://blog.strongbrew.io/multicasting-operators-in-rxjs/)
- [Getting Started With RxJS – Part 3: Hot And Cold Observables](https://codingthesmartway.com/getting-started-with-rxjs-part-3-hot-and-cold-observables/)

### RxJS Error Handling

- [RxJs Error Handling: Complete Practical Guide](https://blog.angular-university.io/rxjs-error-handling/)

### Advanced RxJS

- [Rx Book](https://xgrommx.github.io/rx-book/content/guidelines/introduction/index.html) This is out of date but it is still one of the best deep dives into how ReactiveX works.
- [What are schedulers in RxJS](https://blog.strongbrew.io/what-are-schedulers-in-rxjs/)

## TypeScript

### Introduction

- [Documentation · TypeScript](https://www.typescriptlang.org/docs/home.html) Official documentation resource for TypeScript. Regularly updated.

### Advanced Types

- [Advanced Types · TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [When to use `never` and `unknown` in TypeScript – LogRocket Blog](https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/)

### Generics

- [Generics · TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html) Generics are a great way of avoiding having to use `any` because they enact ‘generic’ behavior on the type passed in.
