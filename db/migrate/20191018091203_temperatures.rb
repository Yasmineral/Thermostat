class Temperatures < ActiveRecord::Migration[5.2]
  def change
    create_table :temperatures do |t|
        t.integer :temperature, :default => 20
        t.boolean :psm, :default => true
    end
  end
end

