# frozen_string_literal: true

class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :value, inclusion: { in: [-1, 1] }
  validates :user_id, uniqueness: { scope: :post_id }

  after_save :update_me
  after_destroy :update_me

  private

    def update_me
    end
end
