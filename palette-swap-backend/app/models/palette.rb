class Palette < ApplicationRecord
  belongs_to :pattern

  validates :name, presence: true, length: { maximum: 16 }, uniqueness: true, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
end
