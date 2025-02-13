"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim"; // Install this package for slim configuration
import { useTheme } from "next-themes";

interface ParticlesComponentProps {
  id: string;
}

const ParticlesComponent = (props: ParticlesComponentProps): JSX.Element => {
  const { theme } = useTheme(); // Access the current theme

  // Initialize particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {});
  }, []);

  // Dynamic particle options based on theme
  const options = useMemo(
    () => ({
      fpsLimit: 120,
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
          value: theme === "dark" ? "#A9A9A9" : "#333333", // Adjust particle colors based on theme
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
          value: 150,
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [theme] // Recompute options when the theme changes
  );

  return (
    <Particles
      className="bg-transparent dark:bg-transparent"
      id={props.id}
      options={options}
    />
  );
};

export default ParticlesComponent;
