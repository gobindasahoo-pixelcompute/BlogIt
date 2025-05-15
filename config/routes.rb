# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug do
      resource :vote, only: :create, on: :member
      resource :report, only: :create, controller: :reports do
        get :download
      end
    end
    resources :users, only: %i[index create]
    resources :categories, only: %i[index create]
    resource :session, only: [:create, :destroy]
    resources :user_posts, only: [:index]
    resources :organizations, only: :index
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
