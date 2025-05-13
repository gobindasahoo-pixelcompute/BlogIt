# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_organization_should_be_valid_with_valid_name
    assert @organization.valid?
  end

  def test_organization_should_not_be_valid_without_name
    @organization.name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_organization_should_have_many_users
    @organization.save!

    user1 = create(:user, organization: @organization)
    user2 = create(:user, organization: @organization)

    assert_equal 2, @organization.users.count
    assert_includes @organization.users, user1
    assert_includes @organization.users, user2
  end

  def test_organization_should_have_many_posts
    @organization.save!

    user = create(:user, organization: @organization)

    post1 = create(:post, user: user, organization: @organization)
    post2 = create(:post, user: user, organization: @organization)

    assert_equal 2, @organization.posts.count
    assert_includes @organization.posts, post1
    assert_includes @organization.posts, post2
  end
end
