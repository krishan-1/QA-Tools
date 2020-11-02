class AddSlugToTests < ActiveRecord::Migration[6.0]
  def change
    add_column :tests, :slug, :string
  end
end
