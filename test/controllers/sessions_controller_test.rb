# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization, password: "password", password_confirmation: "password")
    @headers = headers(@user)
  end

  def test_should_login_with_valid_credentials
    post session_path, params: {
      login: {
        email: @user.email,
        password: "password"
      }
    }, as: :json

    assert_response :success
    assert_not_nil response.parsed_body["authentication_token"]
    assert_equal @user.name, response.parsed_body["name"]
    assert_equal @user.organization_id, response.parsed_body["organization_id"]
  end

  def test_should_not_login_with_invalid_password
    post session_path, params: {
      login: {
        email: @user.email,
        password: "wrong_password"
      }
    }, as: :json

    assert_response :unauthorized
    assert_equal I18n.t("session.incorrect_credentials"), response.parsed_body["error"]
  end

  def test_should_not_login_with_non_existent_email
    post session_path, params: {
      login: {
        email: "nonexistent@example.com",
        password: "password"
      }
    }, as: :json

    assert_response :not_found
    assert_equal "Couldn't find User", response.parsed_body["error"]
  end

  def test_should_logout_user
    delete session_path, headers: @headers, as: :json

    assert_response :success
  end
end
