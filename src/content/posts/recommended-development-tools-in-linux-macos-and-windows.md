---
title: Recommended Development Tools in Linux, MacOS, and Windows
author: Elanna Grossman
date: 2023-02-17T18:39:42-08:00
last_updated: 2025-11-09T12:58:57-08:00
description: In this article I list my recommended development tools in Linux, MacOS, and Windows as a web developer.
canonical_url: https://elanna.me/blog/2023/02/recommended-development-tools-in-linux-macos-and-windows
cover_image: https://live.staticflickr.com/2458/21245815482_6431167871_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://flickr.com/photos/jadeilyn/21245815482/
cover_image_title: Kendrick Peak
category: development
tags: development,codeeditor,git,ide
slug: recommended-development-tools-in-linux-macos-and-windows
published: true
ignore_update_on_sort: true
---

*Updated Nov 09, 2025* - I updated my preferred development tools.

I use Linux, MacOS, and Windows, and I like all three operating systems (I don't mind Windows 10, but I am not interesting in switching to Windows 11). There might be a tool I like more in one than the others, but I can write code and spin up environments regardless of which OS I’m using. In this article I have put together a list of my recommended development tools.

My personal Macbook Pro is an Intel-based model, but it still works well as a development computer.

My personal computer is a desktop with system drives for both Linux and Windows 10. I have steadily been moving away from Windows, and recently switched my Linux distro from [Manjaro](https://manjaro.org/) to [CachyOS](https://cachyos.org/) with KDE Plasma (CachyOS is an Arch-derivative rolling release distro).

## Development Tools

### Package Manager

- [paru](https://github.com/Morganamilo/paru)
  - Linux
  - paru wraps the built-in [pacman](https://wiki.archlinux.org/title/pacman). I use it to install Linux software.
  - This is only available for Arch and Arch-derivative distros.
  - I used to use yay but CachyOS came with paru, and I prefer how it shows PKGBUILD diffs.
- [homebrew](https://brew.sh/)
  - MacOS
  - Install most software available on homebrew with it.
  - Since I’m on Apple Silicon, I check if the homebrew packages are native or universal, and if they still point to Darwin, I install manually. In the past year, this situation has gotten a lot better.
- I don’t use a package manager on Windows.

### Terminal

- [Ghostty](https://ghostty.org/)
  - Linux
- [iTerm](https://iterm2.com/)
  - MacOS
- [Windows Terminal](https://github.com/microsoft/terminal)
  - Windows

### IDE

- [Visual Studio](https://visualstudio.microsoft.com/downloads/)
  - Windows
  - I like to use Visual Studio in Windows for .NET projects , but I think that for .NET Core API projects Visual Studio Code works very well. I do not use Visual Studio for JavaScript projects.
  - I also don’t use Visual Studio on MacOS unless I am working with Xamarin. It is not the same product under the hood as the original Visual Studio on Windows and I use Visual Studio Code instead.

### Code Editor

- [Visual Studio Code](https://code.visualstudio.com/)
  - Linux
  - MacOS
  - Windows
  - I listed my recommended extensions [here](https://elanna.me/blog/2023/01/recommended-vs-code-extensions/).

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

- [Yaak](https://yaak.app/)
  - Linux
  - MacOS
  - Windows
  - I used to use Postman but I have not enjoyed their recent changes.

### Notes

- [Obsidian](https://obsidian.md/)
  - Linux
  - MacOS
  - Windows
  - I still prefer aspects of Boost Note more, but it is no longer maintained and I lost patience with the bugs.

### Sync

- [Dropbox](https://www.dropbox.com)
  - Linux
  - MacOS
  - Windows
  - Dropbox support for Linux is not great so I might be trading this for a different service, but I haven't found a satisfactory replacement yet.

If I find any other recommended development tools, I will add them here.
