module Api
  class AccountsController < ApplicationController
    include JwtHelper

    protect_from_forgery with: :null_session 

    def create
      user = User.new(user_params)
      if user.save
        token = encode_token({ user_id: user.id })
        Rails.logger.info "Created token: #{token}"
        render json: { token: token, user: user }, status: :created
      else
        render json: { message: 'Error creating account', errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotUnique => e
      render json: { message: 'Username already exists', errors: [e.message] }, status: :unprocessable_entity
    end

    private

    def user_params
      params.require(:user).permit(:username, :password)
    end
  end
end
