defmodule Demo.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use DemoWeb, :controller
      use DemoWeb, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      # Define common model functionality
    end
  end

  def controller do
    quote do
      use Phoenix.Controller, namespace: DemoWeb

      import DemoWeb.Router.Helpers
      import DemoWeb.Gettext
    end
  end

  def view do
    quote do

      use Phoenix.View, root: "lib/demo_web/templates",
                        namespace: DemoWeb

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import DemoWeb.Router.Helpers
      import DemoWeb.ErrorHelpers
      import DemoWeb.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router

      import DemoWeb.Auth, only: [authenticate_player: 2]
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import DemoWeb.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
