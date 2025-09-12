"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

type Cell = {
  row: number;
  col: number;
  isMine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
};
type Board = Cell[][];

function inBounds(r: number, c: number, rows: number, cols: number) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}
function neighbors(r: number, c: number) {
  const dirs = [-1, 0, 1];
  const out: [number, number][] = [];
  for (const dr of dirs) {
    for (const dc of dirs) {
      if (dr === 0 && dc === 0) continue;
      out.push([r + dr, c + dc]);
    }
  }
  return out;
}
function emptyBoard(rows: number, cols: number): Board {
  return Array.from({ length: rows }, (_, r) =>
    Array.from(
      { length: cols },
      (_, c): Cell => ({
        row: r,
        col: c,
        isMine: false,
        adjacent: 0,
        revealed: false,
        flagged: false,
      })
    )
  );
}
function placeMines(
  board: Board,
  mineCount: number,
  safe: { r: number; c: number }
) {
  const rows = board.length;
  const cols = board[0].length;

  const coords: [number, number][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) coords.push([r, c]);

  const safeKey = `${safe.r},${safe.c}`;
  const pool = coords.filter(([r, c]) => `${r},${c}` !== safeKey);

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const mines = pool.slice(0, mineCount);

  mines.forEach(([r, c]) => (board[r][c].isMine = true));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let cnt = 0;
      for (const [nr, nc] of neighbors(r, c)) {
        if (inBounds(nr, nc, rows, cols) && board[nr][nc].isMine) cnt++;
      }
      board[r][c].adjacent = cnt;
    }
  }
}
function floodReveal(board: Board, startR: number, startC: number) {
  const rows = board.length;
  const cols = board[0].length;
  const stack: [number, number][] = [[startR, startC]];
  while (stack.length) {
    const [r, c] = stack.pop()!;
    const cell = board[r][c];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adjacent === 0 && !cell.isMine) {
      for (const [nr, nc] of neighbors(r, c)) {
        if (inBounds(nr, nc, rows, cols) && !board[nr][nc].revealed) {
          stack.push([nr, nc]);
        }
      }
    }
  }
}

export default function Minesweeper({
  rows = 9,
  cols = 9,
  mines = 10,
}: {
  rows?: number;
  cols?: number;
  mines?: number;
}) {
  const [board, setBoard] = useState<Board>(() => emptyBoard(rows, cols));
  const [firstClickAt, setFirstClickAt] = useState<{
    r: number;
    c: number;
  } | null>(null);
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null);
  const [flagMode, setFlagMode] = useState(false);

  const flagsUsed = useMemo(
    () => board.flat().filter((c) => c.flagged).length,
    [board]
  );
  const minesLeft = Math.max(mines - flagsUsed, 0);

  const reset = useCallback(() => {
    setBoard(emptyBoard(rows, cols));
    setFirstClickAt(null);
    setGameOver(null);
    setFlagMode(false);
  }, [rows, cols]);

  useEffect(() => {
    reset();
  }, [rows, cols, mines, reset]);

  const revealCell = useCallback(
    (r: number, c: number) => {
      if (gameOver) return;
      setBoard((prev) => {
        const next = prev.map((row) => row.map((cell) => ({ ...cell })));

        if (!firstClickAt) {
          placeMines(next, mines, { r, c });
          setFirstClickAt({ r, c });
        }

        const cell = next[r][c];
        if (cell.flagged || cell.revealed) return next;

        cell.revealed = true;

        if (cell.isMine) {
          for (const c of next.flat()) if (c.isMine) c.revealed = true;
          setGameOver("lose");
          return next;
        }

        if (cell.adjacent === 0) floodReveal(next, r, c);

        const totalSafe = rows * cols - mines;
        const opened = next
          .flat()
          .filter((c) => c.revealed && !c.isMine).length;
        if (opened >= totalSafe) {
          setGameOver("win");
          for (const c of next.flat()) if (c.isMine) c.flagged = true;
        }

        return next;
      });
    },
    [firstClickAt, gameOver, mines, rows, cols]
  );

  const toggleFlag = useCallback(
    (r: number, c: number) => {
      if (gameOver) return;
      setBoard((prev) => {
        const next = prev.map((row) => row.map((cell) => ({ ...cell })));
        const cell = next[r][c];
        if (cell.revealed) return next;
        cell.flagged = !cell.flagged;
        return next;
      });
    },
    [gameOver]
  );

  const handleCellPrimary = (r: number, c: number) => {
    if (flagMode) toggleFlag(r, c);
    else revealCell(r, c);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm rounded bg-gray-800/60 px-3 py-1">
          Mines: {minesLeft}
        </span>

        {gameOver && (
          <span
            className={`text-sm rounded px-3 py-1 ${
              gameOver === "win" ? "bg-green-600/70" : "bg-red-600/70"
            }`}
          >
            {gameOver === "win" ? "You Win!" : "Game Over"}
          </span>
        )}

        <button
          onClick={() => setFlagMode((v) => !v)}
          className={`text-sm rounded px-3 py-1 transition ${
            flagMode
              ? "bg-yellow-500/80 hover:bg-yellow-500 text-black"
              : "bg-slate-700/80 hover:bg-slate-700"
          }`}
          aria-pressed={flagMode}
        >
          {flagMode ? "🚩 깃발 모드 On" : "🚩 깃발 모드 Off"}
        </button>

        <button
          onClick={reset}
          className="text-sm rounded bg-blue-600/80 hover:bg-blue-600 px-3 py-1"
        >
          Reset
        </button>
      </div>

      <div
        className="grid gap-1 p-2 rounded-lg bg-slate-900/60"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {board.flat().map((cell) => {
          const key = `${cell.row}-${cell.col}`;
          const base =
            "w-8 h-8 md:w-9 md:h-9 select-none grid place-items-center rounded text-sm font-semibold";
          const unrevealed =
            "bg-slate-700 hover:bg-slate-600 active:bg-slate-500 cursor-pointer";
          const revealed = "bg-slate-800";
          const txt =
            cell.adjacent === 0
              ? "text-slate-300"
              : [
                  "",
                  "text-blue-400",
                  "text-green-400",
                  "text-red-400",
                  "text-purple-400",
                  "text-yellow-400",
                  "text-pink-400",
                  "text-teal-400",
                  "text-orange-400",
                ][cell.adjacent];

          return (
            <button
              key={key}
              onClick={() => handleCellPrimary(cell.row, cell.col)}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleFlag(cell.row, cell.col);
              }}
              disabled={cell.revealed && !cell.isMine}
              className={[
                base,
                cell.revealed ? revealed : unrevealed,
                cell.isMine && cell.revealed ? "bg-red-700" : "",
                cell.flagged && !cell.revealed
                  ? "bg-slate-700 ring-2 ring-yellow-400"
                  : "",
              ].join(" ")}
              aria-label={
                cell.revealed
                  ? cell.isMine
                    ? "Mine"
                    : `${cell.adjacent} adjacent`
                  : cell.flagged
                    ? "Flagged"
                    : "Hidden"
              }
            >
              {!cell.revealed && cell.flagged ? "🚩" : null}
              {cell.revealed && cell.isMine ? "💣" : null}
              {cell.revealed && !cell.isMine && cell.adjacent > 0 ? (
                <span className={txt}>{cell.adjacent}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
