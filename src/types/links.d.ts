import { ReactNode, CSSProperties } from "react"; // CSSProperties import

export interface Link {
  id: number;
  title: string;
  bgColor?: string;
  url: string;
  styleVariant: string; // 스타일 변형을 지정
  path: string;
}

export interface test {
  [key: number]: Link[];
}
