# frozen_string_literal: true

require "test_helper"

class UserPostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @user.save!
    @organization = @user.organization
    @auth_headers = headers(@user)

    @post1 = create(:post, user: @user, created_at: 1.day.ago)
    @post2 = create(:post, user: @user, created_at: 2.days.ago)
    @other_user_post = create(:post)
  end

  def test_should_list_all_posts_for_authenticated_user
    get user_posts_url, headers: @auth_headers, as: :json

    assert_response :success
    response_data = response.parsed_body

    assert_equal 2, response_data.size
    assert_equal @post1.id, response_data.first["id"]
    assert_equal @post2.id, response_data.last["id"]

    post_ids = response_data.map { |post| post["id"] }
    assert_includes post_ids, @post1.id
    assert_includes post_ids, @post2.id
    assert_not_includes post_ids, @other_user_post.id
  end

  def test_should_not_allow_unauthenticated_access
    get user_posts_url, as: :json
    assert_response :unauthorized
    assert_includes response.parsed_body["error"], "Could not authenticate with the provided credentials."
  end
end
