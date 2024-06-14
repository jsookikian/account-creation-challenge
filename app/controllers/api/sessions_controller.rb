module Api
    class SessionsController < ApplicationController
        include JwtHelper

        protect_from_forgery with: :null_session

        def create
            user = User.find_by(username: params[:username])
            if user && user.authenticate(params[:password])
                token = encode_token({ user_id: user.id })
                render json: { message: 'Logged in successfully', user: user}, status: :ok
            else
                render json: { message: 'Invalid username or password'}, status: :ok
            end
        end

        def logged_in
            token = request.headers['Authorization']&.split(' ')&.last
            if token && (decoded_token = decode_token(token))
                user = User.find_by(id: decoded_token[:user_id])
                if user
                render json: { logged_in: true, user: user }
                else
                render json: { logged_in: false }
                end
            else
                render json: { logged_in: false }
            end
          
        end

        def verify_token
            token = request.headers['Authorization']&.split(' ')&.last
            Rails.logger.info "Authorization header: #{request.headers['Authorization']}"
            Rails.logger.info "Extracted token: #{token}"
      
            if token
              decoded_token = decode_token(token)
              Rails.logger.info "Decoded token: #{decoded_token}"
              if decoded_token
                render json: { valid: true }
              else
                Rails.logger.warn "Invalid token: #{token}"
                render json: { valid: false }, status: :unauthorized
              end
            else
              Rails.logger.warn "No token provided"
              render json: { valid: false }, status: :unauthorized
            end
          rescue => e
            Rails.logger.error "Error verifying token: #{e.message}"
            render json: { valid: false }, status: :unauthorized
        end
    end
end

