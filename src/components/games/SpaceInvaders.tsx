import React, { useState, useEffect, useRef } from 'react';

const WIDTH = 40;
const HEIGHT = 20;
const ALIEN_ROWS = 3;
const ALIEN_COLS = 8;
const PLAYER_START_X = 20;
const PLAYER_Y = HEIGHT - 1;
const ALIEN_START_Y = 2;
const ALIEN_START_X = 5;
const ALIEN_MOVE_INTERVAL = 60; // frames
const BULLET_SPEED = 1;

type Position = { x: number; y: number };
type Entity = { x: number; y: number; alive: boolean };

export default function SpaceInvaders({ onExit }: { onExit: () => void }) {
  const [playerX, setPlayerX] = useState(PLAYER_START_X);
  const [aliens, setAliens] = useState<Entity[]>(() => {
    const initialAliens: Entity[] = [];
    for (let r = 0; r < ALIEN_ROWS; r++) {
      for (let c = 0; c < ALIEN_COLS; c++) {
        initialAliens.push({ x: ALIEN_START_X + c * 3, y: ALIEN_START_Y + r, alive: true });
      }
    }
    return initialAliens;
  });
  const [bullets, setBullets] = useState<Position[]>([]);
  const [alienDir, setAlienDir] = useState(1);
  const [alienY, setAlienY] = useState(ALIEN_START_Y);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const requestRef = useRef<number>();
  const frameCountRef = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        onExit();
        return;
      }
      keysPressed.current.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onExit]);

  useEffect(() => {
    const gameLoop = () => {
      if (gameOver || win) return;

      frameCountRef.current++;

      // Player Movement
      if (frameCountRef.current % 4 === 0) {
        if (keysPressed.current.has('ArrowLeft') && playerX > 0) {
          setPlayerX(prev => prev - 1);
        }
        if (keysPressed.current.has('ArrowRight') && playerX < WIDTH - 1) {
          setPlayerX(prev => prev + 1);
        }
      }

      // Fire Bullet
      if (keysPressed.current.has('Space')) {
        setBullets(prev => {
          // Only allow one bullet on screen at a time for simplicity
          if (prev.length === 0) {
            return [...prev, { x: playerX, y: PLAYER_Y - 1 }];
          }
          return prev;
        });
        keysPressed.current.delete('Space');
      }

      // Update Bullets
      setBullets(prev => {
        const nextBullets = prev
          .map(b => ({ ...b, y: b.y - BULLET_SPEED }))
          .filter(b => b.y >= 0);
        return nextBullets;
      });

      // Alien Movement
      if (frameCountRef.current % ALIEN_MOVE_INTERVAL === 0) {
        setAliens(prevAliens => {
          const hitEdge = prevAliens.some(a => a.alive && (a.x <= 0 || a.x >= WIDTH - 1));
          if (hitEdge) {
            setAlienDir(prevDir => -prevDir);
            setAlienY(prevY => prevY + 1);
          } else {
            setAlienDir(dir => dir); // just trigger update
          }

          // We use a state update for the actual move, but we need the current direction
          // This is a bit tricky with React state in a loop.
          // Better way: use a ref for direction if it changes frequently.
          return prevAliens;
        });
      }

      // Move aliens based on current state
      // Note: For a smooth loop, a ref for position is better, but we'll use functional updates.

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [playerX, gameOver, win]);

  // Separate effect for Alien Movement to avoid closure issues with requestAnimationFrame
  useEffect(() => {
    const alienInterval = setInterval(() => {
      if (gameOver || win) return;

      setAliens(prevAliens => {
        const aliveAliens = prevAliens.filter(a => a.alive);
        if (aliveAliens.length === 0) {
          setWin(true);
          return prevAliens;
        }

        const hitEdge = aliveAliens.some(a => a.x + (alienDir === 1 ? 1 : -1) <= 0 || a.x + (alienDir === 1 ? 1 : -1) >= WIDTH - 1);

        if (hitEdge) {
          setAlienDir(prevDir => -prevDir);
          setAlienY(prevY => prevY + 1);
          // Move them down and shift direction, but don't move horizontally this frame
          return prevAliens.map(a => ({ ...a, y: a.y + 1 }));
        }

        return prevAliens.map(a => ({ ...a, x: a.x + alienDir }));
      });
    }, ALIEN_MOVE_INTERVAL * 16); // approximate frames to ms

    return () => clearInterval(alienInterval);
  }, [alienDir, gameOver, win]);

  // Collision Detection
  useEffect(() => {
    setBullets(prevBullets => {
      let hitSomething = false;
      const nextBullets = prevBullets.filter(b => {
        const alienIndex = aliens.findIndex(a => a.alive && a.x === b.x && a.y === b.y);
        if (alienIndex !== -1) {
          setAliens(prevAliens => {
            const newAliens = [...prevAliens];
            newAliens[alienIndex].alive = false;
            return newAliens;
          });
          setScore(s => s + 10);
          hitSomething = true;
          return false;
        }
        return true;
      });
      return nextBullets;
    });
  }, [bullets, aliens]);

  // Game Over Check
  useEffect(() => {
    if (aliens.some(a => a.alive && a.y >= PLAYER_Y)) {
      setGameOver(true);
    }
  }, [aliens]);

  // Rendering the Grid
  const renderGrid = () => {
    let grid = Array(HEIGHT).fill(null).map(() => Array(WIDTH).fill(' '));

    // Player
    if (!gameOver && !win) {
      grid[PLAYER_Y][playerX] = '▲';
    }

    // Aliens
    aliens.forEach(a => {
      if (a.alive) grid[a.y][a.x] = 'M';
    });

    // Bullets
    bullets.forEach(b => {
      if (b.y >= 0 && b.y < HEIGHT) {
        grid[b.y][b.x] = '|';
      }
    });

    return grid.map(row => row.join('')).join('\n');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full font-mono text-green-500 bg-black p-4">
      <div className="mb-4 text-xl font-bold">SCORE: {score}</div>
      <pre className="leading-none text-xs border border-green-900 p-2 bg-black">
        {renderGrid()}
      </pre>
      {gameOver && (
        <div className="mt-4 text-red-500 text-center animate-pulse">
          <p className="text-2xl font-bold">GAME OVER</p>
          <p className="text-sm">Press Ctrl+C to return to terminal</p>
        </div>
      )}
      {win && (
        <div className="mt-4 text-green-400 text-center animate-pulse">
          <p className="text-2xl font-bold">YOU WIN!</p>
          <p className="text-sm">Press Ctrl+C to return to terminal</p>
        </div>
      )}
      <div className="mt-6 text-gray-500 text-xs text-center">
        <p>ARROWS to move | SPACE to fire</p>
        <p>Ctrl+C to exit</p>
      </div>
    </div>
  );
}
