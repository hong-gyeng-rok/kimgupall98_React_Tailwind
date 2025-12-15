import { ReactNode, CSSProperties } from "react"; // CSSProperties import

export interface InternalLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
