# frozen_string_literal: true

class VotesController < ApplicationController
  before_action :load_post!
  def create
    @vote = @post.votes.find_or_initialize_by(user: current_user)
    type = params[:type] || ""
    if (type == "upvote" && @vote.value == 1) || (type == "downvote" && @vote.value == -1)
      @vote.destroy!
    else
      type == "upvote" ? upvote : downvote
    end
    @posts = Post.all
  end

  private

    def upvote
      @vote.value = 1
      @vote.save!
    end

    def downvote
      @vote.value = -1
      @vote.save!
    end

    def load_post!
      @post = Post.find_by!(slug: params[:post_slug])
    end
end
