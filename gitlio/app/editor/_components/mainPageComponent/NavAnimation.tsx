'use client';
import React from 'react';

export default function BrandTextSlider() {
  const text = 'Make Your Own Portfolio with GITLIO! Team 5-4. 2024 ◡̈';
  const repeatCount = 10; // Number of times to repeat the text
  const texts = Array.from({ length: repeatCount }, () => text);
  const totalTexts = texts.length;
  const duplicateTexts = [...texts, ...texts]; // Duplicate the text array for continuous effect

  return (
    <div
      className="swiper-container"
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <div className="continuous-slider">
        {duplicateTexts.map((text, index) => (
          <div key={index} className="slide">
            <span>{text}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .continuous-slider {
          display: flex;
          white-space: nowrap;
          animation: slide 30s linear infinite;
        }

        .slide {
          flex: 0 0 auto;
          width: 100%; // Ensure each text spans the full width of the container
          text-align: center; // Center text within each slide
        }

        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(
              -${100 * totalTexts}%
            ); // Move the entire text set
          }
        }
      `}</style>
    </div>
  );
}
