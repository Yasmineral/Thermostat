describe("Thermostat", function() {

  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe("Temperature", function() {
    it("starts at 20 degrees", function() {
      expect(thermostat.currentTemperature()).toEqual(20); 
    });

    it("increases the temperature", function() {
     thermostat.increaseTemperature()
     expect(thermostat.currentTemperature()).toEqual(21)
    });

    it("decreases the temperature", function() {
      thermostat.decreaseTemperature()
      expect(thermostat.currentTemperature()).toEqual(19)
    });

    it("initializes with a minimum temperature", function() {
      expect(thermostat.MINIMUM_TEMPERATURE).toEqual(10);
    });

    it("returns true if temperature has reached minimum temperature", function() {
      thermostat.temperature = 10
      expect(thermostat.isMinimumTemperature()).toEqual(true);
    });

    it("has a minimum of 10 degrees", function(){
      for (var i = 0; i < 11; i++) {
        thermostat.decreaseTemperature();
      }
      expect(thermostat.currentTemperature()).toEqual(10)
    });
  });

  describe("power saving mode", function() {
    it("initializes with power saving mode ON", function(){
      expect(thermostat.powerSavingMode).toBe(true)
    });

    it("returns true if power saving mode is on", function() {
      expect(thermostat.isPowerSavingOn()).toBe(true); 
    })

    it("can switch power saving mode off", function() {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingOn()).toBe(false); 
    })

    it("can switch power saving back on", function() {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingOn()).toBe(false);
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingOn()).toBe(true); 
    })
  });

  describe("when power saving mode is on", function() {
    it("has a max of 25 degrees", function(){
      for (var i = 0; i < 6; i++) {
        thermostat.increaseTemperature();
      }
      expect(thermostat.currentTemperature()).toEqual(25)
    });
  }); 

  describe("when power saving mode is off", function() {
    it("has a max of 32 degrees", function() {
      thermostat.switchPowerSavingModeOff(); 
      for (var i = 0; i < 12; i++) {
        thermostat.increaseTemperature();
      }
      expect(thermostat.currentTemperature()).toEqual(32);
    });
  }); 

  it('can be reset to the default temperature', function() {
    for (var i = 0; i < 6; i++) {
      thermostat.increaseTemperature();
    }
    thermostat.resetTemperature();
    expect(thermostat.currentTemperature()).toEqual(20);
  });

  describe('displaying usage levels', function() {
    describe('when the temperature is below 18 degrees', function() {
      it('it is considered low-usage', function() {
        for (var i = 0; i < 3; i++) {
          thermostat.decreaseTemperature();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    
      describe('when the temperature is between 18 and 25 degrees', function() {
        it('it is considered medium-usage', function() {
          expect(thermostat.energyUsage()).toEqual('medium-usage');
        });
      });

      describe('when the temperature is anything else', function() {
        it('it is considered high-usage', function() {
          thermostat.powerSavingMode = false;
          for (var i = 0; i < 6; i++) {
            thermostat.increaseTemperature();
          }
          expect(thermostat.energyUsage()).toEqual('high-usage');
        });
      });
    });
  });
});