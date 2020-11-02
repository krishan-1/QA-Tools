class CreateTests < ActiveRecord::Migration[6.0]
  def change
    create_table :tests do |t|
      t.string :name
      t.text :json_complete
      t.text :json_summary
      t.date :updated_date
      t.string :type

      t.timestamps
    end
  end
end
