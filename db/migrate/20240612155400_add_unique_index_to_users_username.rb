class AddUniqueIndexToUsersUsername < ActiveRecord::Migration[7.0]
  def change
    # Adding a unique index to the username column
    add_index :users, :username, unique: true
  end
end
