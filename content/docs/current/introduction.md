---
date: ""
title: "Introduction"
weight: 10
showtoc: true
sidetoc: true
draft: false
---

Azugo is **web framework** built on top of [Fasthttp](https://github.com/valyala/fasthttp) and multiple
other libraries to be **fast** and **memory efficient**. It's designed to allow fast development but still
be easily extendable where it makes sense.

<!--more-->

## Installation

It requires Go 1.18 or higher. You can install it using command:

```sh
go get azugo.io/azugo
```

## First steps

Simple web application using [default middlewares](#default-middlewares) can be created using such code:

```go
package main

import (
  "azugo.io/azugo"
  "azugo.io/azugo/server"
)

func main() {
  app, err := server.New(nil, server.ServerOptions{
    AppName: "Simple web app",
  })
  if err != nil {
    panic(err)
  }

  app.Get("/", func(ctx *azugo.Context) {
    ctx.Text("Hello, World!")
  })<!--more-->

  azugo.Run(app)
}
```

## Default middlewares

When using Azugo [server package](https://pkg.go.dev/azugo.io/azugo/server) it is created with provided server options using default middlewares:

* Client IP address detection from trusted proxies (by default single proxy from localhost are trusted)
* Request logging
* Prometheus metrics
* CORS headers based on configuration

To see how to get started follow this guide: {{< docs/link "getting-started.md" >}}.
