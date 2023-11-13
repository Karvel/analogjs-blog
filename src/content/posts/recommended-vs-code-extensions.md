---
title: Recommended VS Code Extensions
author: Elanna Grossman
date: 2023-01-06T18:10:54-08:00
description: In this article I share my recommended VS Code Extensions and settings for development with Typescript, .NET, and Angular.
canonical_url: https://hapax-legomenon.net/2023/01/recommended-vs-code-extensions/?utm_source=rss&utm_medium=rss&utm_campaign=recommended-vs-code-extensions
cover_image: https://live.staticflickr.com/2458/3776870085_fe285e9698_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://flickr.com/photos/jadeilyn/3776870085
cover_image_title: So cool
category: development
tags: development,linux,macos,osx
slug: recommended-vs-code-extensions
published: true
---

[Visual Studio Code](https://code.visualstudio.com/) is my code editor of choice. I regularly use Linux, MacOS, and Windows, and it is very nice to have a consistent tool between each operating system. I have listed my recommended VS Code extensions below. [In this post](https://hapax-legomenon.net/2023/02/recommended-development-tools-in-linux-macos-and-windows/), I talk about general development tools I like to use in each operating system.

## General

- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)  
Awesome parsing of the project’s git information. This extension pulls in the git history and blame from the project, and can show git history on the highlighted line.
- [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)  
An easy way to change the case of selected text.
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)  
A regular spell checker. It’s smart enough to parse most words separately in a variable name.
- [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)  
Auto-completion for CSS names based on existing rules.
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)  
Path auto-completions.
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)  
Useful tooling for Docker.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
The de facto Javascript linter.
- [Excel Viewer](https://marketplace.visualstudio.com/items?itemName=GrapeCity.gc-excelviewer)  
Can parse CSV as a table.
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)  
Shortcuts and tooling to help write Markdown in the VS Code editor. My personal favorite utility here is creating and keeping an up to date a table of contents based on the header structure.
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  
An easy way to launch a server from inside the project.
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)  
Helps organize TODOs so they don’t get lost.
- [Live Share Extension Pack](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack)  
This is a really powerful paired programming tool. It works and is cross-compatible Visual Studio Code, Visual Studio, or in a browser (the session host has to use Visual Studio or Visual Studio Code).

## Angular

- [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)  
A pack of extensions maintained by John Papa, one of the celebrities in the Angular world. I have found this to be a comprehensive set of extensions for Angular, especially since I don’t use snippets much.

## C# #

- [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)  
This is the official C# extension from Microsoft and handles everything including syntax highlighting, IntelliSense, and debugging. It is a dogfooded tool and it shows.

## Settings

In addition to the above extensions, I have some settings I configure in Visual Studio Code:

- CodeLens for Javascript and Typescript. This parses projects for class, method, and property references and shows them above the class/method/property declaration. It does cause slight slowdown when loading a file, but I consider it a worthy tradeoff.
- [Breadcrumbs](https://code.visualstudio.com/docs/editor/editingevolved#_breadcrumbs). These show file path breadcrumbs above the editor window.

If I find any other recommended VS Code extensions, I will add them here.
