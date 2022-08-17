---
date: ""
title: "Getting started"
weight: 20
showtoc: true
sidetoc: true
draft: false
---

This guide will show you how to create basic web application and show most useful features of Azugo framework.

<!--more-->

## Create project

In empty directory initialize your Go project:

```sh
go mod init example.com/project
```

Add Azugo framework dependency:

```sh
go get -u azugo.io/azugo
```

## Project file structure

This is project file structure that will be used in this guide and is **recommended** for using also in your projects but **is not** enforced by framework in any way.

```text
.
├─ cmd
|  └─ server
|     ├─ main.go
|     └─ web.go
├─ routes
|  └─ router files
└─ main project files
```

