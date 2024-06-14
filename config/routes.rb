Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  
  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup

  get '/create-account', to: 'application#render_react', as: :createaccount

  # Create accounts
  
  namespace :api do
    post 'create_account', to: 'accounts#create'
   
    # User Session storage
    post 'login', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'
    get 'logged_in', to: 'sessions#logged_in'
    post 'verify_token', to: 'sessions#verify_token'
  end
end
