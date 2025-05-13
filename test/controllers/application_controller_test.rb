# frozen_string_literal: true

require "test_helper"

class ApplicationControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @headers = headers(@user)
  end

  def test_should_authenticate_user_with_valid_credentials
    get posts_path, headers: @headers, as: :json
    assert_response :success
  end

  def test_should_reject_authentication_with_invalid_token
    @headers["X-Auth-Token"] = "invalid_token"

    get posts_path, headers: @headers, as: :json
    assert_response :unauthorized
    assert_match "Could not authenticate", response.parsed_body["error"]
  end

  def test_should_reject_authentication_with_missing_credentials
    get posts_path, headers: {}, as: :json
    assert_response :unauthorized
    assert_match "Could not authenticate", response.parsed_body["error"]
  end

  def test_should_return_404_for_missing_record
    get post_path(slug: "non-existent-post"), headers: @headers, as: :json
    assert_response :not_found
    assert_match "Couldn't find Post", response.parsed_body["error"]
  end

  def test_should_return_422_for_validation_errors
    post posts_path,
      params: { post: { title: "", description: "", is_bloggable: nil } },
      headers: @headers,
      as: :json

    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Title can't be blank"
    assert_includes response.parsed_body["error"], "Description can't be blank"
  end

  def test_should_return_500_for_missing_parameters
    post posts_path, params: { post: { title: "Test", description: "Test desc" } }, headers: @headers, as: :json
    assert_response :unprocessable_entity
    assert_match "User must exist, Organization must exist", response.parsed_body["error"]
  end

  def test_should_return_422_for_record_invalid
    post posts_path,
      params: { post: { title: "", description: "", is_bloggable: nil } },
      headers: @headers,
      as: :json

    assert_response :unprocessable_entity
    assert_equal "User must exist, Organization must exist, Title can't be blank, Description can't be blank",
      response.parsed_body["error"]
  end
end
