//내부 페이지 이동하는 버튼 컴포넌트

import React from "react";
import { Link } from "react-router-dom";
import { InternalLinkProps } from "../../types/internalLink";

export default function InternalLink({
  to, //string
  children, //ReactNode
  className, // string?
  style, //CSSProperties
}: InternalLinkProps) {
  return (
    <Link
      to={to}
      className={className}
      style={style}
      target="_self"
      rel="noreferrer noopener"
    >
      {children}
    </Link>
  );
}
