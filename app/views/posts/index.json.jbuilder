# frozen_string_literal: true

json.posts @posts do |post|
  json.(post, :id, :title, :description, :user_id, :organization_id, :created_at, :updated_at, :slug)

  json.categories post.categories do |category|
    json.(category, :id, :name)
  end

  json.user do
    json.(post.user, :id, :name)
  end
end
