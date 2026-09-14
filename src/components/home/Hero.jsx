import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useGame } from "../../context/GameContext";
import { CASE_FILE } from "../../data/speakers";
import { useDocumentVisible } from "../../hooks/useDocumentVisible";
import { useFinePointer } from "../../hooks/useFinePointer";

export default function Hero() {
  const { openNameEntry } = useGame();

  const frameRef = useRef(null);
  const rectRef = useRef(null);

  const finePointer = useFinePointer();
  const tabVisible = useDocumentVisible();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 120,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 20,
  });

  const cacheRect = () => {
    const el = frameRef.current;
    if (!el) return;

    rectRef.current = el.getBoundingClientRect();
  };

  const onMove = (e) => {
    if (!finePointer) return;

    const rect = rectRef.current;
    if (!rect) return;

    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const startGame = () => {
    openNameEntry();
  };

  return (
    <section
      className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-black bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/Images/Hero Bg Mobile.png")',
      }}
    >
      {/* DESKTOP BACKGROUND */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{
          backgroundImage: 'url("/Images/Hero Bg Desktop.png")',
        }}
      />

      {/* MOBILE BACKGROUND ANIMATION */}
      <motion.div
        initial={{ scale: 1.02 }}
        animate={
          tabVisible
            ? {
                scale: [1.02, 1.07, 1.02],
              }
            : {
                scale: 1.02,
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: 'url("/Images/Hero Bg Mobile.png")',
        }}
      />

      {/* DARK OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-black/50" />

      {/* CINEMATIC VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,transparent_10%,rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.8)_100%)]" />

      {/* MOBILE RED GLOW */}
      <motion.div
        animate={
          tabVisible
            ? {
                opacity: [0.1, 0.22, 0.1],
                scale: [1, 1.12, 1],
              }
            : {
                opacity: 0.14,
                scale: 1,
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-[42%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/20 blur-[100px] md:h-[500px] md:w-[500px]"
      />

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:45px_45px]" />

      {/* SCANLINES */}
      <div className="pointer-events-none absolute inset-0 scanlines opacity-20" />

      {/* GLOBAL SCAN */}
      <motion.div
        animate={
          tabVisible
            ? {
                y: ["-15vh", "115vh"],
              }
            : {
                y: "40vh",
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-0 top-0 h-20 w-full bg-gradient-to-b from-transparent via-red/10 to-transparent md:h-24"
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-5 py-8 md:px-8 lg:py-6">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
          {/* LEFT */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center gap-3"
            >
              <motion.span
                animate={
                  tabVisible
                    ? {
                        width: [28, 44, 28],
                        opacity: [0.5, 1, 0.5],
                      }
                    : {
                        width: 28,
                        opacity: 0.7,
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-px bg-red"
              />

              <span className="text-[10px] font-medium tracking-[0.28em] text-white/55 uppercase">
                DEVTALKS · DYPIT
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-4xl font-bold leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.7rem]"
            >
              EVERY CLUE
              <br />
              <span className="text-red">TELLS A STORY.</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 70, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-5 h-[2px] bg-red"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-5 max-w-md text-sm leading-6 text-white/65 md:text-base"
            >
              A mystery speaker. Five clues. One chance to solve the case.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link
                to="/guess"
                onClick={startGame}
                className="btn-3d inline-flex min-h-11 items-center justify-center rounded-sm bg-red px-6 py-3 text-[10px] font-semibold tracking-[0.16em] text-white uppercase"
              >
                ENTER THE CASE
              </Link>

              <Link
                to="/leaderboard"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/15 bg-black/30 px-6 py-3 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm transition-colors hover:border-red/40 hover:bg-black/50"
              >
                LEADERBOARD
              </Link>
            </motion.div>

            {/* STATUS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] tracking-[0.2em] text-white/40 uppercase"
            >
              <span className="flex items-center gap-2">
                <motion.span
                  animate={
                    tabVisible
                      ? {
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.35, 1],
                        }
                      : {
                          opacity: 0.7,
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-red shadow-[0_0_8px_rgba(229,9,20,0.8)]"
                />
                CASE OPEN
              </span>

              <span>05 CLUES</span>
              <span>01 SPEAKER</span>
              <span>DT-001</span>
            </motion.div>
          </div>

          {/* RIGHT CASE FILE */}
          <motion.div
            ref={frameRef}
            onMouseEnter={finePointer ? cacheRect : undefined}
            onMouseMove={finePointer ? onMove : undefined}
            onMouseLeave={finePointer ? onLeave : undefined}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ perspective: 1200 }}
            className="relative mx-auto w-full max-w-[330px] sm:max-w-sm lg:max-w-[370px]"
          >
            <motion.div
              style={
                finePointer
                  ? {
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }
                  : {
                      transformStyle: "preserve-3d",
                    }
              }
              animate={
                finePointer || !tabVisible
                  ? undefined
                  : {
                      y: [0, -7, 0],
                      rotateZ: [0, 0.25, 0],
                    }
              }
              transition={
                finePointer || !tabVisible
                  ? undefined
                  : {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="relative overflow-hidden rounded-sm border border-red/40 bg-black/60 shadow-2xl backdrop-blur-md"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-[9px] tracking-[0.2em] text-red">
                  {CASE_FILE}
                </span>

                <motion.span
                  animate={
                    tabVisible
                      ? { opacity: [0.35, 0.9, 0.35] }
                      : { opacity: 0.5 }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="text-[9px] tracking-[0.2em] text-white/35"
                >
                  CLASSIFIED
                </motion.span>
              </div>

              {/* MAIN EVIDENCE */}
              <div className="relative aspect-[4/4.7] overflow-hidden">
                {/* Inner grid */}
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

                {/* Center glow */}
                <motion.div
                  animate={
                    tabVisible
                      ? {
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.15, 1],
                        }
                      : {
                          opacity: 0.25,
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/10 blur-3xl"
                />

                {/* SCANNING BEAM */}
                <motion.div
                  animate={
                    tabVisible
                      ? {
                          top: ["-20%", "120%"],
                        }
                      : {
                          top: "50%",
                        }
                  }
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-0 z-10 h-20 w-full bg-gradient-to-b from-transparent via-red/25 to-transparent"
                />

                {/* CORNERS */}
                <motion.div
                  animate={
                    tabVisible
                      ? { opacity: [0.45, 1, 0.45] }
                      : { opacity: 0.65 }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute left-4 top-4 h-7 w-7 border-l border-t border-red/60"
                />

                <motion.div
                  animate={
                    tabVisible
                      ? { opacity: [0.45, 1, 0.45] }
                      : { opacity: 0.65 }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                  className="absolute right-4 top-4 h-7 w-7 border-r border-t border-red/60"
                />

                <div className="absolute bottom-4 left-4 h-7 w-7 border-b border-l border-red/60" />

                <div className="absolute bottom-4 right-4 h-7 w-7 border-b border-r border-red/60" />

                {/* CENTER QUESTION MARK */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    animate={
                      tabVisible
                        ? {
                            opacity: [0.4, 1, 0.4],
                            scale: [1, 1.07, 1],
                            textShadow: [
                              "0 0 0px rgba(229,9,20,0)",
                              "0 0 24px rgba(229,9,20,0.8)",
                              "0 0 0px rgba(229,9,20,0)",
                            ],
                          }
                        : {
                            opacity: 0.8,
                          }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="font-display text-8xl font-bold leading-none text-red"
                  >
                    ?
                  </motion.span>

                  <motion.p
                    animate={
                      tabVisible
                        ? {
                            opacity: [0.4, 0.8, 0.4],
                          }
                        : {
                            opacity: 0.6,
                          }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="mt-4 text-[10px] tracking-[0.22em] text-white uppercase"
                  >
                    IDENTITY UNKNOWN
                  </motion.p>

                  <p className="mt-3 text-[8px] tracking-[0.18em] text-white/35 uppercase">
                    EVIDENCE REQUIRED
                  </p>
                </div>

                {/* TAG */}
                <motion.div
                  animate={
                    tabVisible
                      ? {
                          opacity: [0.6, 1, 0.6],
                        }
                      : {
                          opacity: 0.7,
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute left-3 top-3 rounded-sm border border-red/30 bg-black/60 px-2 py-1 text-[8px] tracking-[0.16em] text-red uppercase backdrop-blur-sm"
                >
                  EVIDENCE 01
                </motion.div>

                <div className="absolute bottom-3 right-3 rounded-sm border border-white/10 bg-black/60 px-2 py-1 text-[8px] tracking-[0.16em] text-white/40 uppercase backdrop-blur-sm">
                  0% REVEALED
                </div>
              </div>

              {/* FOOTER */}
              <div className="grid grid-cols-3 border-t border-white/10 bg-black/45 px-4 py-3 text-[8px] tracking-[0.16em] text-white/35 uppercase">
                <span>OPEN</span>

                <motion.span
                  animate={
                    tabVisible
                      ? {
                          opacity: [0.3, 1, 0.3],
                        }
                      : {
                          opacity: 0.6,
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-center text-red"
                >
                  SCANNING
                </motion.span>

                <span className="text-right">DT-001</span>
              </div>
            </motion.div>

            {/* FLOATING EVIDENCE */}
            <motion.div
              animate={
                tabVisible
                  ? {
                      y: [0, -8, 0],
                      rotate: [-5, -7, -5],
                    }
                  : {
                      y: 0,
                      rotate: -5,
                    }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -left-2 top-12 rounded-sm border border-white/10 bg-black/75 px-2.5 py-1.5 text-[8px] font-semibold tracking-[0.18em] text-white/45 uppercase shadow-lg backdrop-blur-sm sm:-left-5"
            >
              EVIDENCE
            </motion.div>

            {/* FLOATING CLASSIFIED */}
            <motion.div
              animate={
                tabVisible
                  ? {
                      y: [0, 6, 0],
                      rotate: [4, 6, 4],
                    }
                  : {
                      y: 0,
                      rotate: 4,
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
              className="pointer-events-none absolute -right-2 bottom-16 rounded-sm border border-red/25 bg-black/75 px-2.5 py-1.5 text-[8px] font-semibold tracking-[0.18em] text-red uppercase shadow-lg backdrop-blur-sm sm:-right-5"
            >
              CLASSIFIED
            </motion.div>

            {/* MOBILE FLOATING DOT */}
            <motion.div
              animate={
                tabVisible
                  ? {
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.5, 1],
                    }
                  : {
                      opacity: 0.5,
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute -right-1 top-1/3 h-1.5 w-1.5 rounded-full bg-red shadow-[0_0_12px_rgba(229,9,20,0.9)]"
            />
          </motion.div>
        </div>
      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-3 left-5 right-5 z-20 flex items-center justify-between text-[8px] tracking-[0.18em] text-white/30 uppercase md:left-8 md:right-8">
        <span>DEVTALKS // CASE FILE SYSTEM</span>

        <motion.span
          animate={
            tabVisible ? { opacity: [0.25, 0.8, 0.25] } : { opacity: 0.4 }
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="text-red"
        >
          SYSTEM ONLINE
        </motion.span>
      </div>
    </section>
  );
}
