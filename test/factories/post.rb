# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph(sentence_count: 3) }
    is_bloggable { [true, false].sample }
    status { "draft" }
    slug { Faker::Internet.slug }
    association :user
    association :organization
  end
end
