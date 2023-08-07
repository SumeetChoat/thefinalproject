/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  StaveConnector,
  Formatter,
  Voice,
  Beam,
} from "vexflow";
function StaveComponent({ note }) {
  const noteStrings = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const score = useRef(null);
  useEffect(() => {
    if (document.querySelector("svg")) document.querySelector("svg").remove();
    const noteArr = note.map((n) => {
      const octave = n < 24 ? 0 : Math.floor((n - 24) / 12) + 1;
      const noteName = n % 12;
      return new StaveNote({
        keys: [`${noteStrings[noteName][0]}/${octave}`],
        duration: "4",
      });
    });

    const renderer = new Renderer(score.current, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(430, 260);
    const context = renderer.getContext();

    // Create a stave1 of width 400 at position 10, 40 on the canvas.
    const stave1 = new Stave(20, 20, 200);
    const stave2 = new Stave(20, 120, 200);

    stave1.addClef("treble");
    stave2.addClef("bass");

    stave1.setContext(context);
    stave2.setContext(context);
    const connector = new StaveConnector(stave1, stave2);
    const line = new StaveConnector(stave1, stave2);
    connector.setType("brace");
    connector.setContext(context);
    connector.setText("Piano");
    line.setType("single");
    connector.setContext(context);
    line.setContext(context);
    // Create a voice in 4/4 and add above notes
    stave1.draw();
    stave2.draw();
    connector.draw();
    line.draw();
    const voice = new Voice({ num_beats: note.length, beat_value: 4 });
    voice.addTickables(noteArr);
    const beams = Beam.generateBeams(noteArr);
    new Formatter().joinVoices([voice]).format([voice]);
    beams.forEach((b) => {
      b.setContext(context).draw();
    });
    voice.draw(context, stave1);
  }, [note]);
  return (
    <div ref={score}>
      <div className="svg-container" id="output"></div>
    </div>
  );
}

export default StaveComponent;
