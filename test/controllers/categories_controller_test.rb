# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @auth_headers = headers(@user)
    @category = create(:category)
  end

  def test_should_get_all_categories
    get categories_url, headers: @auth_headers, as: :json

    assert_response :success
    response_body = response.parsed_body
    assert_equal Category.count, response_body.length
  end

  def test_should_create_category
    assert_difference "Category.count", 1 do
      post categories_url, params: { category: { name: "Technology" } }, headers: @auth_headers, as: :json
    end

    assert_response :success
    assert_includes response.parsed_body["notice"], "successfully created"
  end

  def test_should_not_create_category_without_name
    post categories_url, params: { category: { name: "" } }, headers: @auth_headers, as: :json

    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Name can't be blank"
  end
end
