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
      File.read("#{Rails.root}/experience-engine/front/test/jest/coverage/coverage-summary.json")
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_test
    @test = if id?(params[:id])
              puts 'is id'
              Test.find(params[:id])
            else
              puts 'is slug'
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
        check_if_branch_exist(params)
      else
        custom_error('a error has occurred', 'branch parameter is required', 'N/A')
      end
    else
      false
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
    params.require(:test).permit(:name, :json_complete, :json_summary, :updated_date, :type, :slug)
  end
end
