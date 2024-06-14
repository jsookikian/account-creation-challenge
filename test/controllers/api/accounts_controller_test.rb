# test/controllers/api/accounts_controller_test.rb

require 'test_helper'

class Api::AccountsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_params = { username: 'newusername', password: 'password123' }
  end

  test "should create account with valid parameters" do
    assert_difference('User.count') do
      post '/api/create_account', params: { user: @user_params }
    end
    assert_response :created
    json_response = JSON.parse(response.body)
    assert json_response['token']
    assert json_response['user']
  end

  test "should not create account with missing username" do
    post '/api/create_account', params: { user: { password: 'password123' } }
    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert_equal 'Error creating account', json_response['message']
    assert_includes json_response['errors'], "Username can't be blank"
  end

  test "should not create account with missing password" do
    post '/api/create_account', params: { user: { username: 'newuser' } }
    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert_equal 'Error creating account', json_response['message']
    assert_includes json_response['errors'], "Password can't be blank"
  end

  test "should not create account with taken username" do
    existing_user = users(:valid_user)
    post '/api/create_account', params: { user: { username: existing_user.username, password: 'password' } }
    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert_equal 'Username already exists', json_response['message']
  end
end
