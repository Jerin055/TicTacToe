import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle from "../assets/o.png";
import cross from "../assets/x.png";

let data = ["", "", "", "", "", "", "", "", ""];

export const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleref = useRef(null);

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const toggle = (e, num) => {
    if (lock) return;
    if (data[num] !== "") return;

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross}' class='sym' />`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle}' class='sym' />`;
      data[num] = "o";
    }

    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    for (let pattern of wins) {
      const [a, b, c] = pattern;
      if (data[a] !== "" && data[a] === data[b] && data[b] === data[c]) {
        won(data[a], pattern);
        return;
      }
    }

    if (!data.includes("")) {
      won("draw", []);
    }
  };

  const won = (winner, pattern) => {
    setLock(true);

    document
      .querySelectorAll(".boxes")
      .forEach((box) => box.classList.add("filled"));

    if (pattern && pattern.length === 3) {
      pattern.forEach((idx) => {
        const box = document.querySelectorAll(".boxes")[idx];
        if (box) box.classList.add("win-small");
      });
    }

    if (winner === "x") {
      titleref.current.innerHTML = `Congratulations : <img src='${cross}' class='res' /> wins`;
    } else if (winner === "o") {
      titleref.current.innerHTML = `Congratulations : <img src='${circle}' class='res' /> wins`;
    } else {
      titleref.current.innerHTML = `Game Tied`;
    }
  };

  const reset = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".boxes").forEach((box) => {
      box.innerHTML = "";
      box.classList.remove("filled");
      box.classList.remove("win-small");
    });
    setCount(0);
    setLock(false);
    titleref.current.innerHTML = "Tic Tac Toe Game By <span>Jerin</span>";
  };

  return (
    <>
      <div className="container small-board">
        <h1 className="title" ref={titleref}>
          Tic Tac Toe Game By <span>Jerin</span>
        </h1>

        <div className="board">
          <div className="row1">
            <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
          </div>

          <div className="row2">
            <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
          </div>

          <div className="row3">
            <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
          </div>
        </div>

        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};
