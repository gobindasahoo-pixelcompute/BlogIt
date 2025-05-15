# frozen_string_literal: true

class UserPostsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    @posts = current_user.posts
    @posts = @posts.where("LOWER(title) LIKE ?", "%#{params[:title]}%") if params[:title].present?

    @posts = @posts.joins(:categories).where(categories: { id: params[:category_ids] }) if params[:category_ids].present? # rubocop:disable Layout/LineLength
    @posts = @posts.where(status: params[:status]) if params[:status].present?

    @posts = @posts.distinct.order(created_at: :desc)
  end
end
