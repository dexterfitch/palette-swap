class PaletteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :color1, :color2, :color3, :patterns
end
