# frozen_string_literal: true

json.organizations @organizations do |organization|
  json.extract! organization, :id, :name, :created_at, :updated_at
end
