# frozen_string_literal: true

require "test_helper"

class CategoryPostTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @post = create(:post, user: @user, organization: @organization)
    @category = create(:category)
    @category_post = build(:category_post, post: @post, category: @category)
  end

  def test_category_post_should_be_valid_with_valid_post_and_category
    assert @category_post.valid?
  end

  def test_category_post_should_not_be_valid_without_post
    @category_post.post = nil
    assert_not @category_post.valid?
    assert_includes @category_post.errors.full_messages, "Post must exist"
  end

  def test_category_post_should_not_be_valid_without_category
    @category_post.category = nil
    assert_not @category_post.valid?
    assert_includes @category_post.errors.full_messages, "Category must exist"
  end

  def test_category_post_should_allow_multiple_categories_per_post
    category2 = create(:category)

    create(:category_post, post: @post, category: @category)
    category_post2 = build(:category_post, post: @post, category: category2)

    assert category_post2.valid?
  end

  def test_category_post_should_allow_multiple_posts_per_category
    post2 = create(:post, user: @user, organization: @organization)

    create(:category_post, post: @post, category: @category)
    category_post2 = build(:category_post, post: post2, category: @category)

    assert category_post2.valid?
  end
end
