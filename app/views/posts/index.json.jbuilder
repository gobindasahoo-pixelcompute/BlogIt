# frozen_string_literal: true

json.array! @posts do |post|
  json.extract! post, :id, :title, :description, :slug, :created_at, :updated_at, :is_bloggable
  json.net_votes post.net_votes
  json.user do
    json.extract! post.user, :id, :name, :email
  end
  json.organization do
    json.extract! post.organization, :id, :name
  end
  json.categories post.categories, :id, :name
end
