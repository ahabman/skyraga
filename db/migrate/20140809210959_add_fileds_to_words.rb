class AddFiledsToWords < ActiveRecord::Migration
  def change
    add_column :words, :temp, :integer
    add_column :words, :desc, :string
    add_column :words, :humidity, :integer
    add_column :words, :pressure, :integer
    add_column :words, :wind, :integer
    add_column :words, :clouds, :integer
  end
end
