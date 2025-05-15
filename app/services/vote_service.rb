# frozen_string_literal: true

class VoteService
  attr_reader :user, :post, :vote_type
  def initialize(user:, post:, vote_type:)
    @vote_type = vote_type
    @post = post
    @user = user
  end

  def process!
    filter_by_category_ids
  end

  private

    def filter_by_category_ids
      return posts unless params[:category_ids].present?

      posts.joins(:categories)
        .where(categories: { id: params[:category_ids] })
        .distinct if params[:category_ids].present?
    end
end
