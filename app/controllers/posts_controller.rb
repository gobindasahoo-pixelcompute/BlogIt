# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = PostFilterService.new(current_user:, params:).process!
  end

  def create
    current_user.posts.create!(post_params.merge(organization: current_organization))
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.find_by!(slug: params[:slug])
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, category_ids: [])
    end
end
