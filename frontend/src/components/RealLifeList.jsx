import React from 'react';

// RealLifeList — the <ul>/<ol> styling that's repeated identically across
// all 9 reallife/*.jsx pages (`body-font text-lg text-[#6C757D] space-y-*
// list-*-inside`), pulled into one place instead of copy-pasted per file.
//
// `ordered` switches between the "Bahan"/"Tips" sections (always <ul>,
// space-y-2, list-disc) and the "Langkah-langkah" section (always <ol>,
// space-y-3, list-decimal) — the one structural difference across the
// 9 pages' otherwise-identical 4-section layout.
//
// Children are arbitrary <li> JSX, not strings — some pages need <strong>
// inside a step, or a <br/>-separated sub-list inside a single <li> (e.g.
// CauseEffectRealLife's "Buat 2 set kartu" step), so RealLifeList stays a
// pure layout wrapper and never tries to special-case content.

const RealLifeList = ({ ordered = false, children }) => {
  const Tag = ordered ? 'ol' : 'ul';
  const listStyle = ordered ? 'space-y-3 list-decimal list-inside' : 'space-y-2 list-disc list-inside';

  return (
    <Tag className={`body-font text-lg text-[#6C757D] ${listStyle}`}>
      {children}
    </Tag>
  );
};

export default RealLifeList;
