# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.order(id: :desc)
    render status: :ok, json: { posts: }
  end

  def create
    Post.create!(post_params)
    render_notice(t("successfully_created"))
  end

  def show
    post = Post.find_by(slug: params[:slug])
    render status: :ok, json: { post: }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
