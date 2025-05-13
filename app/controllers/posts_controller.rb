# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]
  def index
    @posts = PostFilterService.new(current_organization:, params:).process!
  end

  def create
    current_user.posts.create!(post_params.merge(organization: current_organization))
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
  end

  def update
    @post.update!(post_params)
    puts("status: #{post_params[:status]}")
    render_notice(t("successfully_updated", entity: "Post"))
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :status, :slug, category_ids: [])
    end

    def load_post!
      @post = Post.find_by(slug: params[:slug])
    end
end
