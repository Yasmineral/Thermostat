require 'sinatra'
require 'sinatra/base'
require 'sinatra/activerecord'
require 'json'
require_relative 'model'


set :database_file, 'config/database.yml'

  # get '/time.json' do 
    # headers 'Access-Control-Allow-Origin' => '*' 
    # you are only supposed ot make AJAX requests back to the server you originally loaded from
    # adds a header to the http response which gets around the security issues
    # { time: Time.now.to_s}.to_json
  # end

class Thermostat < Sinatra::Base
  enable :sessions 
  register Sinatra::ActiveRecordExtension


  get '/' do
    erb :index
  end
  
  get '/temperature' do
    Temperatures.find(1).temperature.to_json
  end

  get '/psm' do
    Temperatures.find(1).psm.to_json
  end

  post '/temperature' do
    Temperatures.find(1).update_attribute(:temperature, params[:temperature])
  end

  post '/psm' do
    p params
    Temperatures.find(1).update_attribute(:psm, params[:psm])
  end

run! if app_file == $0
end

