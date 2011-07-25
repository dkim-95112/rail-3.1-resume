# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)

posts = Post.create([
  { :title => "jQuery plugin", :body => "image gallery, javascript, jQuery plugin, bind, event, mouseenter, trigger, animate" },
  { :title => "Apple Quartz composition", :body => "interactive, perspective view of the alphabet, 3d graphics, lighting, lexicon, hieroglyphs" },
  { :title => 'bash shell script', :body => 'http://en.wikipedia.org/wiki/Levenshtein_distance, grep, regular expressions' },
  { :title => 'Google O3D-WebGL sample', :body => 'javascript, zsorting, transparency' }
]);
