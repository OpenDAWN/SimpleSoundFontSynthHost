/*
*  copyright 2015 James Ingram
*  http://james-ingram-act-two.de/
*
*  Code licensed under MIT
*/

/*global WebMIDI, performance */

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
		soundFontURL = "http://james-ingram-act-two.de/soundFonts/Arachno/Arachno1.0selection-grand piano.sf2",
		// The name used to identify the soundFont in the GUI (can be chosen ad lib.).
		soundFontName = "grand piano",		
		// The preset indices in the soundFont (only one in this case).
		presets = [0];

		function onLoad()
		{
			function switchToFontLoadedDiv()
			{
				var
				cursorControlDiv = document.getElementById("cursorControlDiv"),
				waitingForFontDiv = document.getElementById("waitingForFontDiv"),
				fontLoadedDiv = document.getElementById("fontLoadedDiv");

				if(waitingForFontDiv.style.display !== "none")
				{
					cursorControlDiv.style.cursor = "auto";
					waitingForFontDiv.style.display = "none";
					fontLoadedDiv.style.display = "block";
				}
			}

			soundFont.init();

			synth = new WebMIDI.sf2Synth1.Sf2Synth1();
			synth.init();
			synth.setSoundFont(soundFont);

			// For some reason, the first noteOn to be sent by the host, reacts only after a delay.
			// This noteOn/noteOff pair is sent so that the *next* noteOn will react immediately.
			// This is actually a kludge. I have been unable to solve the root problem.
			// (Is there an uninitialized buffer somewhere?)
			if(synth.setMasterVolume)
			{
				// consoleSf2Synth can't/shouldn't do this.
				// (It has no setMasterVolume function)
				synth.setMasterVolume(0);
				synth.noteOn(0, 64, 100);
				synth.noteOff(0, 64, 100);
				// Wait for the above noteOn/noteOff kludge to work.
				setTimeout(function()
				{
					synth.setMasterVolume(16384);
					switchToFontLoadedDiv();
				}, 2400);
			}
		}

		soundFont = new WebMIDI.soundFont.SoundFont(soundFontURL, soundFontName, presets, onLoad);
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
