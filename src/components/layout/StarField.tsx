import React, { useMemo } from "react";
import { css } from "@emotion/react";

interface Star {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDelay: string;
}

const StarField: React.FC = () => {
  const stars = useMemo(() => generateStars(50), []);

  return (
    <div css={starFieldStyle}>
      {stars.map((star) => (
        <div
          key={star.id}
          css={css`
            ${starStyle}
            width: ${star.size}px;
            height: ${star.size}px;
            left: ${star.left};
            top: ${star.top};
            animation-delay: ${star.animationDelay};
          `}
        />
      ))}
    </div>
  );
};

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
  }));
};

const starFieldStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const starStyle = css`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 2s infinite alternate;

  @keyframes twinkle {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default React.memo(StarField);
