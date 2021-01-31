class PatternsController < ApplicationController
  def index
    @patterns = Pattern.all
    render json: @patterns
  end

  def show
    @pattern = Pattern.find(params[:id])
    render json: @pattern
  end
end
