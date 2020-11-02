# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
tests = Test.create([{ name: 'test1',
                       json_complete: '{test: test}',
                       json_summary: '{test_summary: test}',
                       slug: 'test1' },
                     { name: 'test2',
                       json_complete: '{test2: test}',
                       json_summary: '{test2_summary: test}',
                       slug: 'test2' }])
