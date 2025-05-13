# frozen_string_literal: true

FactoryBot.define do
  factory :category_post do
    association :category
    association :post
  end
end
