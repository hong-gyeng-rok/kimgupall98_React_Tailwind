import { createContext, useContext, useState, useEffect } from "react";
import { AllImageData, ImageDataProviderProps } from "../types/imageData";

// 1. Context 생성 - 타입은 제네릭(<>)으로 전달합니다.
const ImageDataContext = createContext<AllImageData | null>(null);

// 2. Provider 컴포넌트 생성
export function ImageDataProvider({ children }: ImageDataProviderProps) {
  // useState에도 타입을 지정하여 null 또는 AllImageData를 가질 수 있음
  const [imageData, setImageData] = useState<AllImageData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}imageData.json`)
      .then((response) => response.json())
      // fetch로 받아온 데이터가 AllImageData 타입임을 명시합니다.
      .then((data: AllImageData) => setImageData(data))
      .catch((error) => console.error("Error fetching image data:", error));
  }, []);

  // Provider의 value prop에는 상태(imageData)를 그대로 전달합니다.
  return (
    <ImageDataContext.Provider value={imageData}>
      {children}
    </ImageDataContext.Provider>
  );
}

// 3. 커스텀 훅 생성 - 반환 타입을 명시
export function useImageData(): AllImageData | null {
  return useContext(ImageDataContext);
}

