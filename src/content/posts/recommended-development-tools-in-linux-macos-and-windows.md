---
title: Recommended Development Tools in Linux, MacOS, and Windows
author: Elanna Grossman
date: 2023-02-17T18:39:42-08:00
description: In this article I list my recommended development tools in Linux, MacOS, and Windows as a web developer.
canonical_url: https://hapax-legomenon.net/2023/02/recommended-development-tools-in-linux-macos-and-windows/?utm_source=rss&utm_medium=rss&utm_campaign=recommended-development-tools-in-linux-macos-and-windows
cover_image: https://live.staticflickr.com/626/21245815482_6015e70d8a_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://flickr.com/photos/jadeilyn/21245815482/
cover_image_title: Kendrick Peak
category: development
tags: development,codeeditor,git,ide
slug: recommended-development-tools-in-linux-macos-and-windows
published: true
---

I use Linux, MacOS, and Windows, and I like all three operating systems. There might be a tool I like more in one than the others, but I can write code and spin up environments regardless of which OS I’m using. In this article I have put together a list of my recommended development tools.

I have a work-provided Macbook Pro that runs MacOS. It is based on Apple Silicon and I have found that the ecosystem is a lot better than it was in 2021 when I first switched. Most applications I need are now native or universal and even NodeJS runs decently well on the native architecture.

My personal computer is a desktop that runs Windows 10 and [Manjaro](https://manjaro.org/) (Manjaro is an arch-derivative rolling release distro. I use the [Cinnamon DE](https://manjaro.org/download/#cinnamon) because I can keep my window-snapping muscle memory). Since the desktop is my personal machine, I have found it useful to do most of my programming there on Linux. This helps me separate coding time mentally. I deliberately did not install anything like games in Linux so it could be a focused environment.

## Development Tools

### Package Manager

- [yay](https://github.com/Jguer/yay)
  - Linux
  - yay wraps the built-in [pacman](https://wiki.archlinux.org/title/pacman). I use it to install all of the Linux software.
  - This is only available for arch and arch-derivative distros.
- [homebrew](https://brew.sh/)
  - MacOS
  - Install most software available on homebrew with it.
  - Since I’m on Apple Silicon, I check if the homebrew packages are native or universal, and if they still point to Darwin, I install manually. In the past year, this situation has gotten a lot better.
- I don’t use a package manager on Windows. I have been watching the development of [winget](https://github.com/microsoft/winget-cli/) and I plan to try it out now that it is out of preview.

### Terminal

- [Terminator](https://terminator-gtk3.readthedocs.io/en/latest/)
  - Linux
- [iTerm](https://iterm2.com/)
  - MacOS
- [Windows Terminal](https://github.com/microsoft/terminal)
  - Windows

### IDE

- [Visual Studio](https://visualstudio.microsoft.com/downloads/)
  - Windows
  - I like to use Visual Studio in Windows for .NET projects , but I think that for .NET Core API projects Visual Studio Code works very well. I do not use Visual Studio for front end projects.
  - I also don’t use Visual Studio on MacOS unless I am working with Xamarin. It is not the same product under the hood as the original Visual Studio on Windows and I use Visual Studio Code instead.

### Code Editor

- [Visual Studio Code](https://code.visualstudio.com/)
  - Linux
  - MacOS
  - Windows
  - I listed my recommended extensions [here](https://hapax-legomenon.net/2023/01/recommended-vs-code-extensions/).

### Git Client

- [GitKraken](https://www.gitkraken.com/)
  - Linux
  - MacOS
  - Windows
  - I like using Git GUI clients because I have a very visual memory. GitKraken helps me commit only final code and not debug stuff. I also like to use it to commit specific lines which helps me do atomic commits.

### Database Tools

- [DBeaver](https://dbeaver.io/)
  - Linux
  - MacOS
  - Windows
  - I most frequently use Postgres and MSSQL. DBeaver does not work as well for non-relational databases. 
- [SQL Server Management Studio (SSMS)](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
  - Windows

### HTTP

- [Postman](https://www.postman.com/)
  - Linux
  - MacOS
  - Windows

### Notes

- [Boost Note](https://github.com/BoostIO/Boostnote)
  - Linux
  - MacOS
  - Windows
  - There is an older and a newer version of Boost Note. I still use the older version because I prefer the feature set. The older version is in maintenance mode and might be an acquired taste at this point, but I really like it.

### Sync

- [Dropbox](https://www.dropbox.com)
  - Linux
  - MacOS
  - Windows

If I find any other recommended development tools, I will add them here.
