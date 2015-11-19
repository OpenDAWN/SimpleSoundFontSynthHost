/*
*  copyright 2015 James Ingram
*  http://james-ingram-act-two.de/
*
*  Code licensed under MIT
*/

/*jslint bitwise: false, nomen: true, plusplus: true, white: true */
/*global WebMIDI: false,  WebMIDISynth: false, window: false,  document: false, performance: false, console: false, alert: false, XMLHttpRequest: false */

WebMIDI.namespace('WebMIDI.host');

WebMIDI.host = (function()
{
	"use strict";

	var
	synth,

	// Note that the SoundFont constructor uses XMLHttpRequest, which
	// does not work with local files (localhost:).
	// To make it work, run the app from the web (http:).
	// The sound font must be on the same website as the host app.
	loadSoundFontAsynch = function ()
	{
		var
		soundFont,
		soundFontPresets,
		soundFontURL = "http://james-ingram-act-two.de/open-source/WebMIDISynthHost/soundFonts/Arachno/Arachno1.0selection-grand piano.sf2",
		// The name used to identify the soundFont in the GUI (can be chosen ad lib.).
		soundFontName = "grand piano",		
		// The preset indices in the soundFont (only one in this case).
		presets = [0];

		function getSoundFontPresets(presets)
		{
			var i, name, presetIndex, soundFontPresets = [];
			for(i = 0; i < presets.length; ++i)
			{
				presetIndex = presets[i];
				name = WebMIDI.constants.GeneralMIDIInstrumentNames[presetIndex];

				soundFontPresets.push({ name: name, presetIndex: presetIndex });
			}
			return soundFontPresets;
		}

		function onLoad()
		{
			var
			cursorControlDiv = document.getElementById("cursorControlDiv"),
			waitingForFontDiv = document.getElementById("waitingForFontDiv"),
			fontLoadedDiv = document.getElementById("fontLoadedDiv");

			soundFont.getAttributes();

			synth = new WebMIDI.sf2Synth1.Sf2Synth1();
			synth.init();
			synth.setSoundFont(soundFont);

			cursorControlDiv.style.cursor = "auto";
			waitingForFontDiv.style.display = "none";
			fontLoadedDiv.style.display = "block";
		}

		// the soundFontPresets become the soundFont.presets attribute, usable by the host.
		soundFontPresets = getSoundFontPresets(presets);

		soundFont = new WebMIDI.soundFont.SoundFont(soundFontURL, soundFontName, soundFontPresets, onLoad);
	},

	gitHubButtonClick = function()
	{
		var
		win = window.open("https://github.com/notator/SimpleSoundFontSynthHost", "_blank");
		win.focus();
	},

	doMouseOver = function(e)
	{
		var	NOTE_ON = WebMIDI.constants.COMMAND.NOTE_ON,
		channel = 0,
		key = parseInt(e.target.id, 10),
		velocity = 100,
		status = NOTE_ON + channel,
		message = new Uint8Array([status, key, velocity]);

		synth.send(message, performance.now());	
	},

	doMouseOut = function(e)
	{
		var
		NOTE_OFF = WebMIDI.constants.COMMAND.NOTE_OFF,
		channel = 0,
		key = parseInt(e.target.id, 10),
		velocity = 100,
		status = NOTE_OFF + channel,
		message = new Uint8Array([status, key, velocity]);

		synth.send(message, performance.now());
	},

	publicAPI =
    {
    	gitHubButtonClick: gitHubButtonClick,

    	doMouseOver: doMouseOver,
    	doMouseOut: doMouseOut
    };

	loadSoundFontAsynch();

	return publicAPI;

}());
