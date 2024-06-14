# app/helpers/jwt_helper.rb
module JwtHelper
    SECRET_KEY = Rails.application.credentials.jwt_secret_key
  
    def encode_token(payload)   
      ttl  = 24.hours.from_now.to_i
      payload[:exp] = ttl 
      JWT.encode(payload, SECRET_KEY)
    end
  
    def decode_token(token)
      body = JWT.decode(token, SECRET_KEY)[0]
      HashWithIndifferentAccess.new body
    rescue
      nil
    end
  end
  