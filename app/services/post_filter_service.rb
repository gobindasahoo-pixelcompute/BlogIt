# frozen_string_literal: true

class PostFilterService
  attr_reader :posts, :params
  def initialize(current_user:, params:)
    @posts = current_user.posts.includes(:categories).order(id: :desc)
    @params = params
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
