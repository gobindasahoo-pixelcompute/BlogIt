# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :load_post!, only: %i[create download]

  def create
    ReportsJob.perform_async(current_user.id, @post.slug)
  end

  def download
    unless @post.report.attached?
      render_error(t("not_found", entity: "PDF"), :not_found) and return
    end

    send_data @post.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:post_slug])
    end

    def pdf_path
      @_pdf_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "blog-it-#{@post.slug}.pdf"
    end
end
