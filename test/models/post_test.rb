# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @post = build(:post, user: @user, organization: @organization)
  end

  def test_post_should_be_valid_with_valid_attributes
    assert @post.valid?
  end

  def test_post_should_not_be_valid_without_title
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_post_title_should_not_exceed_maximum_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title is too long (maximum is 125 characters)"
  end

  def test_post_should_not_be_valid_without_description
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  def test_post_description_should_not_exceed_maximum_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description is too long (maximum is 10000 characters)"
  end

  def test_post_should_not_be_valid_without_is_bloggable
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Is bloggable is not included in the list"
  end

  def test_post_should_not_be_valid_without_user_id
    @post.user = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_post_should_not_be_valid_without_organization_id
    @post.organization = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Organization must exist"
  end

  def test_post_slug_should_be_unique
    @post.save!
    duplicate_post = @post.dup
    duplicate_post.title = "Sample Post"
    assert_not duplicate_post.valid?
    assert_includes duplicate_post.errors.full_messages, "Slug has already been taken"
  end

  def test_post_slug_should_be_generated_from_title
    @post.title = "Sample Post"
    @post.save!
    assert_equal "sample-post", @post.slug
  end

  def test_slug_should_increment_if_title_already_exists
    first_post = create(:post, title: "Sample Post")
    second_post = create(:post, title: "Sample Post")
    assert_match(/sample-post-\d+/, second_post.slug)
  end

  def test_slug_should_not_change_after_creation
    @post.save!
    original_slug = @post.slug
    @post.update(title: "Updated Title")
    assert_equal original_slug, @post.reload.slug
  end

  def test_can_not_change_slug_manually
    @post.save!
    @post.slug = "new-custom-slug"
    assert_not @post.valid?
    assert_includes @post.errors[:slug], I18n.t("post.slug.immutable")
  end

  def test_status_should_have_valid_values
    assert_includes Post.statuses.keys, "draft"
    assert_includes Post.statuses.keys, "publish"
  end

  def test_post_published_at_should_be_nil_when_draft
    @post.save!
    assert_nil @post.published_at
  end

  def test_post_published_at_should_be_set_when_published
    @post.update!(status: "publish")
    assert_not_nil @post.published_at
  end

  def test_post_published_at_should_not_change_if_not_published
    @post.save!
    assert_nil @post.published_at
    @post.update!(title: "Updated Title")
    assert_nil @post.published_at
  end

  def test_post_should_have_many_categories_through_category_posts
    category1 = create(:category)
    category2 = create(:category)

    @post.save!
    @post.categories << [category1, category2]

    assert_equal 2, @post.categories.count
    assert @post.categories.include?(category1), "Post should include Tech category"
    assert @post.categories.include?(category2), "Post should include Science category"

    category_post_records = CategoryPost.where(post_id: @post.id)
    assert_equal 2, category_post_records.count, "CategoryPost join records should be 2"
    assert category_post_records.exists?(category_id: category1.id), "CategoryPost record for Tech should exist"
    assert category_post_records.exists?(category_id: category2.id), "CategoryPost record for Science should exist"
  end
end
