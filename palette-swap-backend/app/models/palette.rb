class Palette < ApplicationRecord
  belongs_to :pattern

  validates :name, presence: true, length: { maximum: 16 }
end
