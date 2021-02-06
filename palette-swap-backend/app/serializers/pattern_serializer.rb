class PatternSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :style
  has_many :palettes, serializer: PaletteSerializer
end