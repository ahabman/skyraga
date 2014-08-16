json.array!(@words) do |word|
  json.extract! word, :id, :text, :weather
  json.url word_url(word, format: :json)
end
