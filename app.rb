# require 'sinatra'
# require 'json'

# set :database_file, 'config/database.yml'



  # get '/time.json' do 
    # headers 'Access-Control-Allow-Origin' => '*' 
    # you are only supposed ot make AJAX requests back to the server you originally loaded from
    # adds a header to the http response which gets around the security issues
    # { time: Time.now.to_s}.to_json
  # end


# run! if app_file == $0
# end