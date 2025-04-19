# frozen_string_literal: true

class UsersController < ApplicationController
  def index
  end

  def create
    User.create!(user_params)
    render_notice(t("successfully_created", entity: "User"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
