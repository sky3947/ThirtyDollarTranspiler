# ThirtyDollarTranspiler

[Pages demo](https://st3v1sh.github.io/ThirtyDollarTranspiler/)

This application assists in making [thirtydollar.website](https://thirtydollar.website/) songs by allowing the process to be done with a text editor instead of messing around with emojis on a website.

Paste the contents of dancing-in-the-moonlight.moyai into index.html to see an example.

## Text Editor Features

- Hide and show line numbers
- Current line indicator
- Visible highlighted space characters
- Adjustable undo stack size
- Adjustable font size
- Adjustable tab size
- New line indent preservation
- Line cut and line paste
- Intuitive block selection cursor positioning
- White space and word backspace delete
- Multi-line tab indenting and outdenting
- Space replacing (default off)
- File saving (ctrl + s) and opening (ctrl + o)
- Editor color themes

## Transpiler

The moyai file has two sections: configurations and song

### Note Syntax

Notes are a key followed optionally by an octave number. If no octave number is provided, it's assumed to be 0. Absolute pitch values can also be provided. If your pitch is between zero and one, you should provide the leading zero as a best practice. (This is to avoid confusion with a rest note.) For example:

- `c` `c0` `a5` `g-10` are valid notes with keys and octaves.
- `0` `0.2` `-1` `-0.6` are valid absolute pitch values.

There is also the default note and the rest note, notated by `/` and `.`, to play the default pitch of an instrument and to signal no action, respectively.

Rest notes can be given a length greater than zero, i.e. `.4` defines a rest of length four.

Some modifiers accept multipliers, notated by an integer or decimal number followed by an `x`. For example:

- `2x` `1.5x` `.5x`

Any line starting with the character `-` will be regarded as a comment.

### Configurations Section Symbols

General song configuration:

- `name [songname]` Define the song's name
- `bpm [value]` Define the song's BPM
- `sharp [note] [...]` Define the song's scale using sharp notes
- `flat [note] [...]` Define the song's scale using flat notes
- `transpose [value]` Define the song's semitone offset

Instruments configuration:

- `inst [alias] set [instrument]` Define an alias for an instrument
- `inst [alias] vol [value]` Define the default volume for an instrument
- `inst [alias] pit [note]` Define the default pitch for an instrument
- `inst [alias] pos [value]` Define the semitone offset for an instrument

### Song Section Symbols

- `start` Defines the start of the song section
- `tempo: [value] [or .] [or /] [or multiplier] [...]` Modifies the global tempo of the entire song
- `gvol: [value] [or .] [or /] [or multiplier] [...]` Modifies the global volume of the entire song
- `inst [alias] ([value or /] [value]): [value] [or note] [or .] [or /] [...]` Defines an instrument track
  - Only an alias is required- however you may optionally override the default volume and define the track transpose, respectively
- `vol: [value] [or .] [or /] [...]` Modifies the volume of the previous instrument track
- `clear: [.] [or /] [...]` Defines when to clear the sounds of the notes currently playing

Song section symbols have an order of operations each beat (note that `tempo` changes are always first and sound `clear`ing is always last):

`tempo > gvol > inst > clear`

Segments allow the reuse of repeated song sections. Segments cannot be nested or called within other segments.

- `segstart [label]` Defines the start of a segment
- `segend` Defines the end of the segment
- `seg [label]` Plays a previously defined segment

Sometimes you may want to skip instrument tracks the first time it's played in a segment. Ghost tracks are used for this purpose. Ghost tracks must be defined above any instrument tracks in a group of instrument tracks. (Multi-level ghosting is not implemented yet):

`ghst [alias] ([value or /] [value or note]): [value] [note] [or .] [or /] [...]`

Groups of instrument tracks are played simultaneously. New groups can be split out in two ways:

- `div` Finalizes the current track and creates a divider.
- `br` Finalizes the current track without any visual indicators.

For extra control, the `override` keyword can be used together with a string (i.e. `override !bg@#000000,0.5`) to insert it directly into the song. An override must be alone in its own line.

Check out examples in the `/songs/` folder of this repository.
