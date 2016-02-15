exports.defineAutoTests = function() {
    describe('plugin', function() {
        it('should be exposed as plugins.appPreferences object', function() {
            expect(window.plugins.appPreferences).toBeDefined();
            expect(cordova.require('cordova-plugin-app-preferences.apppreferences'))
                .toBe(window.plugins.appPreferences);
        });

        it('should have corresponding methods defined', function() {
            ['store', 'fetch', 'remove', 'show', 'iosSuite'].forEach(function(methodName) {
                expect(window.plugins.appPreferences[methodName]).toBeDefined();
                expect(window.plugins.appPreferences[methodName]).toEqual(jasmine.any(Function));
            });
        });
    });
};

exports.defineManualTests = function(contentEl, createActionButton) {

    var device_tests =
        '<h3>Press "Open preferences" button to show preferences pane</h3>' +
        '<div id="open_prefs"></div>' +
        'Expected result: Status box will get updated with device info. (i.e. platform, version, uuid, model, etc)';

    contentEl.innerHTML = '<div id="info"></div>' + device_tests;

    var log = document.getElementById('info');
    var logMessage = function (message) {
        var logLine = document.createElement('div');
        logLine.innerHTML = message;
        log.appendChild(logLine);
    };

    createActionButton('Open preferences', function() {
        log.innerHTML = ''; // cleanup log area
        plugins.appPreferences.show(function(result) {
            logMessage(result);
        }, function(error) {
            logMessage(error);
        });
    }, "open_prefs");
};
