# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_should_create_user_with_valid_params
    post users_url, params: {
      user: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        password_confirmation: "password123",
        organization_id: @organization.id
      }
    }, as: :json

    assert_response :success
    assert_includes response.parsed_body["notice"], "User was successfully created"
  end

  def test_should_not_create_user_with_invalid_params
    post users_url, params: {
      user: {
        name: "",
        email: "invalid-email",
        password: "short",
        password_confirmation: "mismatch",
        organization_id: nil
      }
    }, as: :json

    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Name can't be blank"
    assert_includes response.parsed_body["error"], "Email is invalid"
    assert_includes response.parsed_body["error"], "Password confirmation doesn't match Password"
    assert_includes response.parsed_body["error"], "Organization must exist"
  end
end
