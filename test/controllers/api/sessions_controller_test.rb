# test/controllers/api/sessions_controller_test.rb

require 'test_helper'

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  include JwtHelper

  setup do
    @user = users(:valid_user)
  end

  test "should create session with valid credentials" do
    post '/api/login', params: { username: @user.username, password: 'password' }
    assert_response :success
    assert_equal JSON.parse(response.body)['message'], 'Logged in successfully'
  end

  test "should not create session with invalid credentials" do
    post '/api/login', params: { username: @user.username, password: 'wrongpassword' }
    assert_response :success
    assert_equal JSON.parse(response.body)['message'], 'Invalid username or password'
  end

  test "should return logged_in true with valid token" do
    token = encode_token(user_id: @user.id)
    get '/api/logged_in', headers: { 'Authorization': "Bearer #{token}" }
    assert_response :success
    assert JSON.parse(response.body)['logged_in']
  end

  test "should return logged_in false with invalid token" do
    get '/api/logged_in', headers: { 'Authorization': 'Bearer invalid_token' }
    assert_response :success
    assert_not JSON.parse(response.body)['logged_in']
  end

  test "should return logged_in false without token" do
    get '/api/logged_in'
    assert_response :success
    assert_not JSON.parse(response.body)['logged_in']
  end

  test "should verify token with valid token" do
    token = encode_token(user_id: @user.id)
    post '/api/verify_token', headers: { 'Authorization': "Bearer #{token}" }
    assert_response :success
    assert JSON.parse(response.body)['valid']
  end

  test "should not verify token with invalid token" do
    post '/api/verify_token', headers: { 'Authorization': 'Bearer invalid_token' }
    assert_response :unauthorized
    assert_not JSON.parse(response.body)['valid']
  end

  test "should not verify token without token" do
    post '/api/verify_token'
    assert_response :unauthorized
    assert_not JSON.parse(response.body)['valid']
  end
end
