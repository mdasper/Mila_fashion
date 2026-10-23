import React from 'react';

export default function MarqueeStream() {
  const items = [
    "MILA FASHIONS HAUTE COUTURE",
    "PURE HANDLOOM KANJIVARAM",
    "120+ HOURS ARTISAN ZARDOZI",
    "ORGANIC SILKS & RAW WEAVES",
    "BESPOKE BRIDAL CAPSULE",
    "COMPLIMENTARY EXPRESS DISPATCH",
    "AUTUMN / FESTIVE '26 EDIT"
  ];

  return (
    <div className="fullwidth-marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((text, i) => (
          <span key={i} className="marquee-pill">
            <span className="marquee-dot">✦</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
