# Simple Sound Font Synth Host
A simple demonstration of how to include a Web MIDI Synth [1] in a Web application.<br />
It can be tried out at http://james-ingram-act-two.de/open-source/SimpleSoundFontSynthHost/host.html.

This and my WebMIDISynthHost [2] projects are unofficial, but are aimed at furthering the discussion about software synths at
[3].<br />

This demo uses a version of the gree sf2synth [4] which I have adapted forremoved the original GUI. 
Instead, I have provided it with an API that turns it into a Web MIDI Synth.<br />
This is not a standard MIDI Synth (it has non-standard controls), but MIDI can control <em>anything</em> so that is no problem.<br />

Web MIDI Synths can be used without invoking the browser's implementation of the Web MIDI API.
Standard MIDI Web MIDI Synths can also be used interchangeably with the hardware devices supplied by those 
browser implementations.<br />

The Sf2Synth1, included on the WebMIDISynthHost project, <em>is</em> a standard MIDI synth, and it is soon going to be included in a separate simple demo project.<br />

To use a Web MIDI Synth in a new Web application:<br />
1. Copy the synthesizer and WebMIDI files from the WebMIDISynthHost project [2].<br />
2. Call the synth's constructor and its init() function.<br />
3. Send the synth MIDI messages using its send(...) function in the usual way.<br />

The messages that can be sent to a Web MIDI Synth are declared in the its <em>commands</em> and <em>controls</em> attributes.

November 2015,
James Ingram

[1] My definition: A "Web MIDI Synth" is a software synth that implements the Web MIDI API for Output Devices.<br />
[2] https://github.com/notator/WebMIDISynthHost<br />
[3] https://github.com/WebAudio/web-midi-api/issues/124<br />
[4] https://webaudiodemos.appspot.com/midi-synth/index.html
