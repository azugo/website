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
  })

  server.Run(app)
}
```

## Default middlewares

When using Azugo [server package](https://pkg.go.dev/azugo.io/azugo/server) it is created with provided server options using default middlewares:

* Client IP address detection from trusted proxies (by default single proxy from localhost are trusted)
* Request logging
* Prometheus metrics
* CORS headers based on configuration

To see how to get started follow this guide: {{< docs/link "getting-started.md" >}}.

## Default configuration environment variables

There are multiple built-in environment variables that
can be used to configure your application.

This is the list of most commonly needed environment variables:

* `ENVIRONMENT` - Current environment the service is run in. By default production environment will be used. Allowed values are:
  * `Development`
  * `Staging`
  * `Production`
* `SERVER_URLS` - List of URLs that server will listen on separated by semicolon (`;`), ex. `http://localhost:3000`. By default server will listen on `http://0.0.0.0:80/`.
* `BASE_PATH` - If service will be hosted under subpath this will be used as base path for all routes.
* `REVERSE_PROXY_TRUSTED_IPS` - list of trusted proxy server IP addresses or network masks separated by semicolon (`;`). By default only `127.0.0.1` is trusted.
* `REVERSE_PROXY_LIMIT` - Number of chained reverse proxy servers trusted. By default only `1` reverse proxy is trusted.
