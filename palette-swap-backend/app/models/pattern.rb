class Pattern < ApplicationRecord
  has_many :palettes, :dependent => :destroy
end
