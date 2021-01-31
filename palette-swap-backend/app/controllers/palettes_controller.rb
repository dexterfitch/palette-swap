class PalettesController < ApplicationController
  def index
    palettes = Palette.all
    render json: PaletteSerializer.new(palettes)
  end

  def create
    palette = Palette.new(palette_params)

    if palette.save
      render json: PaletteSerializer.new(palette)
    else
      render json: palette.errors, status: :unprocessable_entity
    end
  end

  def destroy
    palette = Palette.find(params[:id])
    palette.destroy
  end

  private

  def palette_params
    params.require(:palette).permit(:name, :color1, :color2, :color3, :pattern_id)
  end
end
