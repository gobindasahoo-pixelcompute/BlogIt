# frozen_string_literal: true

json.array! @posts do |post|
  json.extract! post, :id, :title, :status, :slug, :updated_at, :created_at
  json.categories post.categories, :name
end
