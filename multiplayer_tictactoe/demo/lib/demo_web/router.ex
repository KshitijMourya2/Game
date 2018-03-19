defmodule DemoWeb.Router do
  use Demo.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug DemoWeb.Auth
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DemoWeb do
    pipe_through :browser

    get "/", PlayerController, :new
    resources "/players", PlayerController, only: [:create, :delete]
  end

  scope "/", DemoWeb do
    pipe_through [:browser, :authenticate_player]
    resources "/games", GameController, only: [:new, :create, :show], param: "name"
  end
end
