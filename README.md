# Simple Sound Font Synth Host
A simple demonstration of how to include a Web MIDI Synth [1] that uses soundFonts in a Web application.<br />
It can be tried out at http://james-ingram-act-two.de/open-source/SimpleSoundFontSynthHost/host.html.

This and my WebMIDISynthHost [2] projects are unofficial, but are aimed at furthering the discussion about software synths at
[3].<br />

This demo uses a version of the gree sf2synth [4] to which I have added an API that includes the Web MIDI API for Output Devices.
I have also enhanced the synth to enable soundFonts to be cached and changed at runtime.<br />
This is a standard MIDI Synth, implementing the standard MIDI controls.<br />

Web MIDI Synths can be used without invoking the browser's implementation of the Web MIDI API.
Standard MIDI Web MIDI Synths (like this one) can also be used interchangeably with the hardware devices supplied by those 
browser implementations.<br />

The messages that can be sent to a Web MIDI Synth are declared in the its <em>commands</em> and <em>controls</em> attributes.

November 2015,
James Ingram

[1] My definition: A "Web MIDI Synth" is a software synth that implements the Web MIDI API for Output Devices.<br />
[2] https://github.com/notator/WebMIDISynthHost<br />
[3] https://github.com/WebAudio/web-midi-api/issues/124<br />
[4] https://github.com/gree/sf2synth.js
