class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.text :text
      t.text :weather

      t.timestamps
    end
  end
end
