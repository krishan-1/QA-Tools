# frozen_string_literal: true

require 'open3'

# /tests methods
class TestsController < ApplicationController
  before_action :set_test, only: %i[show update destroy]

  # GET /tests
  def index
    check_passed = check_all_params(params, params['type'])
    if check_passed == true
      return_hash(params)
    else
      return_error_hash(check_passed)
    end
  end

  # GET /tests/1
  def show
    render json: @test
  end

  # POST /tests
  def create
    @test = Test.new(test_params)

    if @test.save
      render json: @test, status: :created, location: @test
    else
      render json: @test.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tests/1
  def update
    if @test.update(test_params)
      render json: @test
    else
      render json: @test.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tests/1
  def destroy
    @test.destroy
  end

  private

  # pulls the branch from github and run jest
  def run_jest(branch)
    cd_root = "cd #{Rails.root}/experience-engine/front"
    checkout_branch = "git checkout #{branch}"
    yarn_install = 'yarn install'
    jest = "jest --collectCoverage=true --json --outputFile=results.json --coverageReporters='json-summary'"
    command = "#{cd_root} && #{checkout_branch} && #{yarn_install} && #{jest}"
    system(command)
  end

  # pulls the branch from github and run jest
  def jest(log_type, branch)
    run_jest(branch)
    if log_type == 'complete'
      File.read("#{Rails.root}/experience-engine/front/results.json")
    else
      convert_and_minify(File.read("#{Rails.root}/experience-engine/front/test/jest/coverage/coverage-summary.json"))
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_test
    @test = if id?(params[:id])
              Test.find(params[:id])
            else
              Test.where(slug: params[:id])
            end
  end

  # Checks if the param is a id
  def id?(param)
    param.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) != nil
  end

  # Check if all required parameters exist
  def check_all_params(params, type)
    if type == 'jest'
      if !params['branch'].nil?
        check_if_name_is_unique(params) if check_if_branch_exist(params) == true
      else
        custom_error('a error has occurred', 'branch parameter is required', 'N/A')
      end
    else
      false
    end
  end

  # Checks if name is unique
  def check_if_name_is_unique(params)
    if !params['name'].nil?
      @tests = Test.where(name: params['name'])
      if @tests.nil?
        custom_error('a error has occurred', 'the name must me unique', 'N/A')
      else
        true
      end
    else
      custom_error('a error has occurred', 'the name parameter is required', 'N/A')
    end
  end

  # Check if Github branch exist
  def check_if_branch_exist(params)
    cmd = "cd #{Rails.root}/experience-engine/front && git show-branch remotes/origin/#{params['branch']}"
    stdout_str, error_str, status = Open3.capture3(cmd)
    puts "error is: #{error_str}"
    log = error_str.split(' ')
    if log[0] != 'fatal:' && status.success?
      true
    else
      custom_error('a error has occurred', error_str, stdout_str)
    end
  end

  # Create a custom hash error
  def custom_error(error, log, stdout)
    {
      error: error,
      error_log: log,
      stdout: stdout
    }
  end

  # Renders the returned hash
  def return_hash(params)
    if params['show_all'] == 'true'
      @tests = Test.all
      render json: @tests
    elsif params['type'] == 'jest'
      log = jest(params['log_type'], params['branch'])
      render json: log
    end
  end

  # Renders the error hash
  def return_error_hash(error)
    render json: error, status: 400
  end

  # Only allow a trusted parameter "white list" through.
  def test_params
    params.require(:test).permit(:name, :json_complete, :json_summary, :slug)
  end

  def convert_and_minify(json_file)
    require 'json'
    json_data = JSON.parse(json_file)
    locations = { 'total' => json_data['total'] }
    file_names = {}
    json_data.each do |data|
      location_array = data[0].split('/')
      is_experience_engine_folder = false
      values_to_delete = []
      location_array.each do |folder|
        is_experience_engine_folder = true if folder == 'experience-engine'
        next unless !is_experience_engine_folder || folder.include?('.')

        values_to_delete.push(folder)
        next unless folder.include? '.'

        folder_name_index = location_array.index(folder) - 1
        if file_names.key?(location_array[folder_name_index])
          file_names[location_array[folder_name_index]].push(folder)
        else
          file_names[location_array[folder_name_index]] = [].push(folder)
        end
      end
      values_to_delete.each do |value|
        location_array.delete(value)
      end
      location = ''
      location_array.each do |folder|
        location += "#{folder}/"
      end
      locations[location] = {} if !locations.key?(location) && location != ''
    end
    file_names.each_key do |file_folder|
      locations.each_key do |folder|
        folder_split = folder.split('/')
        next unless folder_split[-1] == file_folder

        json_data.each_key do |key|
          file_names[file_folder].each do |file|
            next unless key.split('/')[-1] == file

            locations[folder][file] = {
              'lines' => json_data[key]['lines'],
              'functions' => json_data[key]['functions'],
              'statements' => json_data[key]['statements'],
              'branches' => json_data[key]['branches']
            }
          end
        end
      end
    end
    locations.to_json
  end
end
