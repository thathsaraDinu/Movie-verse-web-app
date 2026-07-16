"use client";
import { memo, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

interface ParticlesComponentProps {
  id: string;
}

const ParticlesComponent = memo(function ParticlesComponent(props: ParticlesComponentProps): JSX.Element {
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {});
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 30, 
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: theme === "dark" ? "#A9A9A9" : "#333333",
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: true,
          speed: 0.2, 
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80, 
        },
        opacity: {
          value: 0.5, 
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  return (
    <Particles
      className="bg-transparent dark:bg-transparent"
      id={props.id}
      options={options}
    />
  );
});

export default ParticlesComponent;
