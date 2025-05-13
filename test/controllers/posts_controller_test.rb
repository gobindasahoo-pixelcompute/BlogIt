# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @post = create(:post, user: @user, organization: @organization, slug: "test-post")

    @category1 = create(:category)
    @category2 = create(:category)

    @auth_headers = headers(@user)
  end

  def test_should_list_all_posts
    get posts_path,
      params: { category_ids: [@category1.id, @category2.id], organization_id: @organization.id },
      headers: @auth_headers, as: :json

    assert_response :success
    assert_kind_of Array, response.parsed_body
  end

  def test_should_filter_posts_by_category
    @post.categories << [@category1, @category2]

    get posts_path,
      params: { organization_id: @organization.id, category_ids: [@category1.id] },
      headers: @auth_headers, as: :json

    assert_response :success
    assert_equal 1, response.parsed_body.size
  end

  def test_should_return_empty_if_no_organization_id
    get posts_path, headers: @auth_headers, as: :json

    assert_response :success
    assert_empty response.parsed_body
  end

  def test_should_create_post_with_valid_params
    post_params = {
      title: "New Post",
      description: "This is a new post",
      user_id: @user.id,
      organization_id: @organization.id,
      category_ids: [@category1.id, @category2.id]
    }

    assert_difference "Post.count", 1 do
      post posts_path, params: { post: post_params }, headers: @auth_headers, as: :json
    end

    assert_response :success
    assert_includes response.parsed_body["notice"], "successfully created"
  end

  def test_should_not_create_post_with_invalid_params
    post_params = { title: "", description: "" }

    assert_no_difference "Post.count" do
      post posts_path, params: { post: post_params }, headers: @auth_headers, as: :json
    end

    assert_response :unprocessable_entity
    assert_equal "User must exist, Organization must exist, Title can't be blank, Description can't be blank",
      response.parsed_body["error"]
  end

  def test_should_show_post
    get post_path(@post.slug), headers: @auth_headers, as: :json

    assert_response :success
    assert_equal @post.slug, response.parsed_body["slug"]
  end

  def test_should_update_post_with_valid_params
    patch post_path(@post.slug),
      params: {
        post: {
          title: "Updated Title",
          description: "Updated description",
          category_ids: [@category1.id, @category2.id]
        }
      },
      headers: @auth_headers, as: :json

    assert_response :success
    assert_equal "Updated Title", @post.reload.title
  end

  def test_should_not_update_post_with_invalid_params
    patch post_path(@post.slug), params: { post: { title: "" } }, headers: @auth_headers, as: :json

    assert_response :unprocessable_entity
    assert_match "Title can't be blank", response.parsed_body["error"]
  end

  def test_should_delete_post
    assert_difference "Post.count", -1 do
      delete post_path(@post.slug), headers: @auth_headers, as: :json
    end

    assert_response :success

    expected_notice = I18n.t("successfully_deleted", entity: "Post")
    assert_equal expected_notice, response.parsed_body["notice"]
  end

  def test_should_return_error_when_deleting_non_existent_post
    delete post_path("non-existent-slug"), headers: @auth_headers, as: :json

    assert_response :not_found
    assert_match(/Couldn't find Post/, response.parsed_body["error"])
  end

  def test_should_set_published_at_when_status_is_published
    patch post_path(@post.slug),
      params: {
        post: {
          title: "Publish Me",
          description: "Time to go live",
          status: "publish"
        }
      },
      headers: @auth_headers, as: :json

    assert_response :success
    assert_equal "publish", @post.reload.status
    assert_not_nil @post.reload.published_at
  end
end
