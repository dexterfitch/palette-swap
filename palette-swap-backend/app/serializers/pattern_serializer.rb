class PatternSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :style, :palettes
end
