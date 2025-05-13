# frozen_string_literal: true

json.extract! @post, :id, :title, :description, :slug, :created_at, :updated_at, :status
json.user do
  json.extract! @post.user, :id, :name, :email
end
json.organization do
  json.extract! @post.organization, :id, :name
end
json.categories @post.categories, :id, :name
