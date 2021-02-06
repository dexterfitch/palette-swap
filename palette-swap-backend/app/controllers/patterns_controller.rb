class PatternsController < ApplicationController
  def index
    patterns = Pattern.all
    render json: PatternSerializer.new(patterns)
  end
end
