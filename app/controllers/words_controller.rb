  class WordsController < ApplicationController
  before_action :set_word, only: [:show, :edit, :update, :destroy]

  # GET /query
  # GET /query.json
  def query
    temp_range =      params[:temp].to_i-1..params[:temp].to_i+1
    humidity_range =  params[:humidity].to_i-1..params[:humidity].to_i+1
    pressure_range =  params[:pressure].to_i-1..params[:pressure].to_i+1
    wind_range =      params[:wind].to_i-1..params[:wind].to_i+1
    clouds_range =    params[:clouds]

    exact_matches = Word.where(
       temp: params[:temp],
       humidity: params[:humidity],
       pressure: params[:pressure],
       wind: params[:wind],
       clouds: params[:clouds]
     )

    range_matches = Word.where(
       temp: temp_range,
       humidity: humidity_range,
       pressure: pressure_range,
       wind: wind_range,
       clouds: clouds_range
     )
    
    temp_clouds_range = Word.where(temp: params[:temp], clouds: clouds_range)
    temp_humidity_range = Word.where(temp: params[:temp], humidity: humidity_range)
    temp_pressure_range = Word.where(temp: params[:temp], pressure: pressure_range)
    temp_wind_range = Word.where(temp: params[:temp], wind: wind_range)

    @words = [exact_matches, range_matches, temp_clouds_range, temp_humidity_range, temp_pressure_range, temp_wind_range].flatten.uniq

    render json: @words

  end

  # GET /words
  # GET /words.json
  def index
    @words = Word.order(temp: :desc, text: :asc).all
  end

  # GET /words/1
  # GET /words/1.json
  def show
  end

  # GET /words/new
  def new
    @word = Word.new
  end

  # GET /words/1/edit
  def edit
  end

  # POST /words
  # POST /words.json
  def create
    @word = Word.new(word_params)

    respond_to do |format|
      if @word.save
        format.html { redirect_to root_path, notice: 'Success' }
        format.json { render :show, status: :created, location: @word }
      else
        format.html { render :new }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /words/1
  # PATCH/PUT /words/1.json
  def update
    respond_to do |format|
      if @word.update(word_params)
        format.html { redirect_to @word, notice: 'Word was successfully updated.' }
        format.json { render :show, status: :ok, location: @word }
      else
        format.html { render :edit }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /words/1
  # DELETE /words/1.json
  def destroy
    @word.destroy
    respond_to do |format|
      format.html { redirect_to words_url, notice: 'Word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_word
      @word = Word.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def word_params
      params.require(:word).permit(:query, :text, :weather, :temp, :desc, :humidity, :pressure, :wind, :clouds)
    end
end
