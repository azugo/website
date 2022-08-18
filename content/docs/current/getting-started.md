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

This is project file structure that will be used in this guide and is **recommended** for using also in
your projects but **is not** enforced by framework in any way.

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

## Create server entry point

Azugo framework is using [Cobra](https://github.com/spf13/cobra) library for CLI interaction configuration
so in this step we will create web subcommand that will start server.

* Create directory `cmd` with subdirectory `server`.
* Create file `main.go` in `server` directory will be application main entry point.

```go
package main

import (
  "fmt"
  "os"

  "github.com/spf13/cobra"
)

// Version holds the current application version.
//
// This can be set using build tag to set real version number.
var Version = "0.0.1-dev"

// RootCmd represents the base command when called without any subcommands
var RootCmd *cobra.Command

// Execute adds all child commands to the root command sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
  if err := RootCmd.Execute(); err != nil {
    fmt.Println(err)
    os.Exit(-1)
  }
}

func initRootCmd() {
  if RootCmd != nil {
    return
  }
  RootCmd = &cobra.Command{
    Use:   "server",
    Short: "Server",
    Long: `By default, server will start serving using the web server with no
  arguments - which can alternatively be run by running the subcommand web.`,
    RunE: runWeb,
  }
}

func main() {
  initRootCmd()
  RootCmd.Version = Version
  Execute()
}
```

* Create file `web.go` in directory `server` that will contain code to start web server.

```go
package main

import (
  "azugo.io/azugo"
  "azugo.io/azugo/server"

  "github.com/spf13/cobra"
)

// webCmd represents the web command
var webCmd = &cobra.Command{
  Use:   "web",
  Short: "Start web server",
  Long: `Web server is the only thing you need to run,
and it takes care of all the other things for you`,
  RunE: runWeb,
}

func runWeb(cmd *cobra.Command, args []string) error {
  app, err := server.New(cmd, server.ServerOptions{
    AppName:       "Example application",
    AppVer:        Version,
  })
  if err != nil {
    return err
  }

  app.Get("/", func(ctx *azugo.Context) {
    ctx.Text("Hello, World!")
  })

  azugo.Run(app)
  return nil
}

func init() {
  initRootCmd()
  RootCmd.AddCommand(webCmd)
}
```

* Now run `go mod tidy` to clean and download needed dependencies.
* To run project in development mode first we need to set environment variables:

{{% tabs %}}
{{% tab "Linux" %}}

```sh
export ENVIRONMENT=Development
export SERVER_URLS=http://localhost:3000/
```

{{% /tab %}}
{{% tab "Windows" %}}

```sh
SET ENVIRONMENT=Development
SET SERVER_URLS=http://localhost:3000/
```

{{% /tab %}}
{{% /tabs %}}

* Now project can be started and accessed on address http://localhost:3000/

```sh
go run cmd/server/*.go
```

Output will look something like:

```console
❯ go run cmd/server/*.go
2022-08-18T14:24:55.916+0300    INFO    azugo@v0.0.0-20220705105615-c3579be99ebb/app.go:225     Starting Example application 0.0.1-dev...       {"service.name": "Example application", "service.version": "0.0.1-dev", "service.environment": "development"}
2022-08-18T14:24:55.916+0300    INFO    azugo@v0.0.0-20220705105615-c3579be99ebb/app.go:253     Listening on http://localhost:3000/...  {"service.name": "Example application", "service.version": "0.0.1-dev", "service.environment": "development"}
```
