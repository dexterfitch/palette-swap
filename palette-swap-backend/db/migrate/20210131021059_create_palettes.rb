class CreatePalettes < ActiveRecord::Migration[5.2]
  def change
    create_table :palettes do |t|
      t.string :name
      t.string :color1
      t.string :color2
      t.string :color3
      t.references :pattern, foreign_key: true
    end
  end
end
