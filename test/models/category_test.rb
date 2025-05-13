# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_be_valid_with_valid_name
    assert @category.valid?
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_should_have_many_posts_through_category_posts
    @category.save!
    organization = create(:organization)
    user = create(:user, organization: organization)

    post1 = create(:post, user: user, organization: organization)
    post2 = create(:post, user: user, organization: organization)

    create(:category_post, category: @category, post: post1)
    create(:category_post, category: @category, post: post2)

    assert_equal 2, @category.posts.count
    assert_includes @category.posts, post1
    assert_includes @category.posts, post2

    category_post_records = CategoryPost.where(category: @category)
    assert_equal 2, category_post_records.count
    assert category_post_records.exists?(post: post1)
    assert category_post_records.exists?(post: post2)
  end
end
