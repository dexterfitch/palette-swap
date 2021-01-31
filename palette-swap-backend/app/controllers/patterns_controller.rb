class PatternsController < ApplicationController
  def index
    patterns = Pattern.all
    render json: PatternSerializer.new(patterns)
  end

  def show
    pattern = Pattern.find(params[:id])
    render json: PatternSerializer.new(pattern)
  end
end
