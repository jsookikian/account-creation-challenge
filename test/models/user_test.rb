require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without username" do
    user = User.new(password: '12345678')
    assert_not user.save
  end

  test "should not save user without password" do
    user = User.new(username: 'validusername')
    assert_not user.save
  end

  test "should save user with valid username and password" do
    user = User.new(username: 'validusername', password: 'validpassword')
    assert user.save
  end

  test "should validate username" do
    user = User.new(username: 'short', password: 'validpassword')
    assert_not user.validate_username, "Username is too short"

    user.username = 'validusername'
    assert user.validate_username, "Username is valid"

    user.username = 'a' * 51
    assert_not user.validate_username, "Username is too long"
  end

  test "should validate password" do
    user = User.new(username: 'validusername', password: 'short')
    assert_not user.validate_password, "Password is too short"

    user.password = 'validpassword'
    assert user.validate_password, "Password is valid"

    user.password = 'a' * 7
    assert_not user.validate_password, "Password is too short"
  end
end
