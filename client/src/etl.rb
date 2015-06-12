require "csv"
require "json"

src_data_path = File.expand_path("../../heritage_data.csv", __FILE__)
dest_data_path = File.expand_path("../../heritage_data.json", __FILE__)

lines = CSV.open(src_data_path).readlines
keys = lines.delete lines.first
data_array = []

lines.map do |row|
  src_hash = Hash[keys.zip(row)]
  dest_hash = Hash.new

  dest_hash["type"]                     = "Feature"

  dest_hash["properties"]               = Hash.new
  dest_hash["properties"]["type"]       = src_hash["type"]
  dest_hash["properties"]["title"]      = src_hash["title"]
  dest_hash["properties"]["author"]     = src_hash["author"]
  dest_hash["properties"]["year"]       = src_hash["year"]
  dest_hash["properties"]["image_name"] = src_hash["image_name"]

  dest_hash["geometry"]                 = Hash.new
  dest_hash["geometry"]["type"]         = "Point"
  dest_hash["geometry"]["coordinates"]  = Array.new [src_hash["longitude"], src_hash["latitude"]]

  data_array << dest_hash
end

File.open(dest_data_path, "w") do |f|
  f.write JSON.pretty_generate data_array
end
