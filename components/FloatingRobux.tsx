'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingRobux({
  top, left, right, bottom, size = 80, delay = 0
}: {
  top?: string, left?: string, right?: string, bottom?: string, size?: number, delay?: number
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top, left, right, bottom,
        zIndex: 0,
        perspective: 1000,
        pointerEvents: 'auto',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.8, scale: 1 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -20 : [0, -15, 0],
          rotateX: isHovered ? 20 : [15, 30, 15],
          rotateY: isHovered ? 40 : [0, 180, 360],
          scale: isHovered ? 1.2 : 1
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.3 }
        }}
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.2, // Slightly rounded edges
          border: `${size * 0.25}px solid rgba(140, 82, 255, 0.8)`, // Purple Color
          boxShadow: '0 0 30px rgba(140, 82, 255, 0.4), inset 0 0 15px rgba(140, 82, 255, 0.5)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(5px)',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Inner glow piece to give it more 3D depth */}
        <div style={{
           position: 'absolute',
           top: '50%', left: '50%',
           width: size * 0.3, height: size * 0.3,
           transform: 'translate(-50%, -50%) translateZ(10px)',
           background: 'rgba(255, 255, 255, 0.3)',
           filter: 'blur(8px)'
        }}></div>
      </motion.div>
    </motion.div>
  );
}
