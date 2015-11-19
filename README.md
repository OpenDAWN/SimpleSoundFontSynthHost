# Simple Sound Font Synth Host
This is a simple demonstration of how to include a Web MIDI Synth [1] that uses soundFonts in a Web application.<br/>
It can be tried out at<br />
http://james-ingram-act-two.de/open-source/SimpleSoundFontSynthHost/host.html.

To use the Synth in a new project, do the following:<br />
1. copy the WebMIDI and sf2Synth1 folders from here or from [2] to the new project<br />
2. upload a soundFont (that may contain one or more presets) to the project<br />
3. follow the sequence of calls in this project to
  * create the SoundFont<br />
  * create the Synth<br />
  * load the Synth with the SoundFont<br>

Then just send the Synth MIDI messages in the usual way by calling its send() function.

This and my WebMIDISynthHost [2] projects are unofficial, but are aimed at furthering the discussion about software synths at
[3].<br />

The synth used in this demo is a version of the gree sf2synth.js [4] to which I have added an API that includes the Web MIDI API for Output Devices. I have also enhanced the original synth to enable soundFonts to be cached and changed at runtime.<br />
This synth implements standard MIDI controls. The messages that can be sent are declared in its <em>commands</em> and <em>controls</em> attributes.
<br />

Web MIDI Synths can be used without invoking the browser's implementation of the Web MIDI API.
Standard MIDI Web MIDI Synths (like this one) can also be used interchangeably with the hardware devices supplied by those 
browser implementations.<br />

I am not a Web Audio specialist, and there are currently some issues. Help would be much appreciated in ironing them out.

November 2015,
James Ingram

[1] My definition: A "Web MIDI Synth" is a software synth that implements the Web MIDI API for Output Devices.<br />
[2] https://github.com/notator/WebMIDISynthHost<br />
[3] https://github.com/WebAudio/web-midi-api/issues/124<br />
[4] https://github.com/gree/sf2synth.js
