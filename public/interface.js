$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature()

  $('#temperature-up').click(function() { // event listner
    thermostat.increaseTemperature(); // update model
    sendTemp();
    updateTemperature() // update view
  })

  $('#temperature-down').click(function() {
    thermostat.decreaseTemperature();
    sendTemp();
    updateTemperature()
  })

  $('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    sendTemp();
    updateTemperature()
  })

  $('#powersaving-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    updatePowerSaveStatus()
    sendPsm()
    updateTemperature();
  })

  $('#powersaving-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    updatePowerSaveStatus()
    sendPsm()
    updateTemperature();
  })

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  }

  function updatePowerSaveStatus() {
    console.log(thermostat.powerSavingMode)
    if (thermostat.powerSavingMode === true) {
      $('#power-saving-status').text('on')
    }
    else {
      $('#power-saving-status').text('off')
    }
  }

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(city + " is:  " + data.main.temp);
  })
  }

  displayWeather('London');
  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    displayWeather(city);
  })

  function sendTemp() {
    var temperature = { temperature: thermostat.temperature }
    $.post("/temperature", temperature)
  }

  $.get("/temperature", function(response) {
    thermostat.temperature = Number(response)
    //json is returned as text. Number converts to number.
    updateTemperature()
  })
  
  function sendPsm() {
    var psm = { psm: thermostat.powerSavingMode }
    $.post("/psm", psm)
  }

  $.get("/psm", function(response) {
    thermostat.powerSavingMode = JSON.parse(response)
    updatePowerSaveStatus()
  })

})
