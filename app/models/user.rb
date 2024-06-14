class User < ApplicationRecord
  # authenticate against BCrypt password
  has_secure_password 

  validates :username, presence: true, length: { in: 10..50 }
  validates :password, presence: true, length: { minimum: 8 }

  def validate_username
    username.present? && username.length.between?(10, 50)
  end

  def validate_password
    password.present? && password.length >= 8
  end
end