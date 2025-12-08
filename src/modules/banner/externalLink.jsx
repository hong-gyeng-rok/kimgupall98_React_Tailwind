//외부 링크로 연결되는 버튼 컴포넌트

import React from "react";

export default function ExternalLink({ href, children, className, style }) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}
