import React from "react";
import * as motion from "motion/react-client";

interface MasonryProps {
  images: string[];
  columns?: number;
  renderImage?: (src: string, style: React.CSSProperties) => React.ReactNode;
}

const Masonry: React.FC<MasonryProps> = ({
  images,
  columns = 3,
  renderImage,
}) => {
  return (
    <div style={{ columnCount: columns }} className="gap-4 space-y-4">
      {images.map((src, idx) => {
        const height = 150 + Math.floor(Math.random() * 150);
        const style = { height, width: "100%" };

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="break-inside-avoid mb-4"
          >
            {renderImage ? (
              renderImage(src, style)
            ) : (
              <img
                src={src}
                style={style}
                className="w-full object-cover rounded-lg shadow-lg"
                alt="masonry"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Masonry;
