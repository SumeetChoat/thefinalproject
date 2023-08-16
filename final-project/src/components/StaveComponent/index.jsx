/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./styles.css";
import {
  Renderer,
  Stave,
  StaveNote,
  StaveConnector,
  Formatter,
  Voice,
  Beam,
  Accidental,
} from "vexflow";
import { noteStrings } from "../../assets/pattern";
function StaveComponent({ challenge, form }) {
  const score = useRef(null);
  useEffect(() => {
    if (document.querySelector("svg")) document.querySelector("svg").remove();

    const renderer = new Renderer(score.current, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(430, 260);
    const context = renderer.getContext();

    // Create a stave1 of width 400 at position 10, 40 on the canvas.
    const stave1 = new Stave(20, 20, 250).addClef("treble").setContext(context);
    const stave2 = new Stave(20, 120, 250).addClef("bass").setContext(context);

    const noteArr = challenge.map((n, i) => {
      const octave = n.note < 24 ? 0 : Math.floor((n.note - 24) / 12) + 1;
      const noteName = n.note % 12;

      if (noteStrings[noteName].length === 1) {
        const newNote = new StaveNote({
          clef: form.clef === "treble" ? undefined : "bass",
          keys: [`${noteStrings[noteName][0]}/${octave}`],
          duration: "4",
          auto_stem: true,
        }).setStyle({
          fillStyle: n.isCorrect ? "green" : "",
          strokeStyle: n.isCorrect ? "green" : "",
        });
        return newNote;
      } else if (noteStrings[noteName].length > 1) {
        const localStorageAccidentals = localStorage.getItem("accidentals");
        const newNote = new StaveNote({
          clef: form.clef === "treble" ? undefined : "bass",
          keys: [
            `${
              localStorageAccidentals[i] === "b"
                ? noteStrings[noteName + 1]
                : noteStrings[noteName]
            }/${octave}`,
          ],
          duration: "4",
          auto_stem: true,
        })
          .setStyle({
            fillStyle: n.isCorrect ? "green" : "",
            strokeStyle: n.isCorrect ? "green" : "",
          })
          .addModifier(
            new Accidental(`${localStorageAccidentals[i] === "b" ? "b" : "#"}`),
            0
          );
        return newNote;
      }
    });

    const connector = new StaveConnector(stave1, stave2);
    const line = new StaveConnector(stave1, stave2);
    connector.setType("brace");
    connector.setContext(context);
    line.setType("single");
    connector.setContext(context);
    line.setContext(context);
    // Create a voice in 4/4 and add above notes
    stave1.draw();
    stave2.draw();
    connector.draw();
    line.draw();
    const voice = new Voice({
      num_beats: 4,
      beat_value: 4,
    });
    voice.addTickables(noteArr);
    const beams = Beam.generateBeams(noteArr);
    form.clef === "treble"
      ? Formatter.FormatAndDraw(context, stave1, noteArr)
      : Formatter.FormatAndDraw(context, stave2, noteArr);
    beams.forEach((b) => {
      b.setContext(context).draw();
    });
  }, [challenge]);
  return <div className="svg-container" id="output" ref={score}></div>;
}

export default StaveComponent;
