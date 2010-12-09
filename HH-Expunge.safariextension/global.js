//add a trim method to the string object's prototype
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};

//wait for messages from expunge.js
safari.application.addEventListener("message", respondToMessage, false);

// getter and setter function for settings used by expunge.js
function respondToMessage(messageEvent) {
    if (messageEvent.name == "getSettingValue") {
        // getItem("foo");
        var value = safari.extension.settings.getItem(messageEvent.message);
		value = value.trim();
        // return value of foo to expunge.js
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("settingValueIs", value);
    }
    else if (messageEvent.name == "setSettingValue") {
	var tmp = messageEvent.message;
	tmp = tmp.trim();
	tmp = tmp.split('?'); //using ? as a delimiter
	safari.extension.settings.setItem(tmp[0], tmp[1]);
    }
    else return; //unknown message, do nothing
}

