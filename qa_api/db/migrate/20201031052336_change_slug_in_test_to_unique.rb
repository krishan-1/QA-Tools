class ChangeSlugInTestToUnique < ActiveRecord::Migration[6.0]
  def change
    change_column :tests, :slug, :string, unique: true
  end
end
