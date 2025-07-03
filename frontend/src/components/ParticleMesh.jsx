// components/ParticleMesh.js
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // or 'tsparticles' for more features

const ParticleMesh = () => {
  // useCallback is used to memoize the init function for performance
  // It ensures the Particles component doesn't re-initialize unnecessarily
  const particlesInit = useCallback(async (engine) => {
    // You can initialize the tsParticles instance here, adding plugins or other methods
    // (e.g., loadAll, loadFull, loadSlim, loadBasic)
    await loadSlim(engine); // 'loadSlim' is a lightweight version with core features
  }, []);

  // Not strictly needed for this basic setup, but good practice for event handling
  const particlesLoaded = useCallback(async (container) => {
    // You can perform actions once particles are loaded, e.g., container.play();
    console.log("Particles container loaded", container);
  }, []);

  const options = {
    // --- Background Configuration ---
    background: {
      color: {
        value: "#0A0B1A", // Very dark blue/black background
      },
    },
    // --- General Interactivity ---
    interactivity: {
      detectsOn: "window", // Particles react to mouse/touch over the entire window
      events: {
        onHover: {
          enable: true,
          mode: "repulse", // Particles push away from the cursor
          parallax: {
            enable: true, // Adds a subtle parallax effect
            force: 60,
            smooth: 10,
          },
        },
        onClick: {
          enable: true,
          mode: "push", // New particles are pushed out on click
        },
        resize: true, // Particles adapt to window resizing
      },
      modes: {
        repulse: {
          distance: 100, // How far particles are repulsed
          duration: 0.4,
        },
        push: {
          quantity: 4, // Number of particles pushed on click
        },
      },
    },
    // --- Particles Configuration ---
    particles: {
      color: {
        value: "#00ffff", // Bright cyan for particles (glowing effect)
      },
      links: {
        color: "#0077ff", // Slightly deeper blue for connecting lines
        distance: 150, // Max distance for lines to connect particles
        enable: true, // Enable lines between particles
        opacity: 0.3, // Opacity of the lines (make them subtle)
        width: 1, // Thickness of the lines
        triangles: { // Optional: Add subtle triangles between connected particles
            enable: true,
            color: "#00ffff", // Cyan triangles
            opacity: 0.05 // Very subtle
        }
      },
      collisions: {
        enable: true, // Particles bounce off each other
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce", // Particles bounce off screen edges
        },
        random: false,
        speed: 1, // Speed of particle movement
        straight: false,
        attract: { // Add a subtle attract effect to make them cluster/disperse
          enable: false, // Set to true to experiment
          rotateX: 600,
          rotateY: 1200
        }
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // Number of particles (adjust based on density and area)
      },
      opacity: {
        value: 0.7, // Overall particle opacity
        random: { enable: true, minimumValue: 0.1 }, // Randomize particle opacity
        animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
        }
      },
      shape: {
        type: "circle", // Particles are circles
        // Other shapes like "square", "triangle", "polygon", "star", "image"
      },
      size: {
        value: { min: 1, max: 3 }, // Randomize particle size
        random: true,
        animation: {
            enable: true,
            speed: 40,
            minimumValue: 0.1,
            sync: false
        }
      },
    },
    // --- Performance Optimization ---
    detectRetina: true, // Adjusts for high-DPI screens
    fpsLimit: 60, // Limit frames per second for performance
  };

  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
        className="w-full h-full" // Ensure the canvas fills its container
      />
    </div>
  );
};

export default ParticleMesh;