import { createContext, useContext, useState, useEffect } from "react";

// 1. Context 생성 (데이터를 담을 공간, 즉 '우물'을 만듭니다)
const ImageDataContext = createContext(null);

// 2. Provider 컴포넌트 생성 (데이터를 fetch해서 '우물'을 채웁니다)
export function ImageDataProvider({ children }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 한 번만 public/imageData.json 파일을 fetch 합니다.
    fetch(`${import.meta.env.BASE_URL}imageData.json`)
      .then((response) => response.json())
      .then((data) => setImageData(data)) // fetch 성공 시, 가져온 데이터를 state에 저장합니다.
      .catch((error) => console.error("Error fetching image data:", error));
  }, []);

  // Provider는 value prop으로 공유할 데이터를 내려보냅니다.
  // 이 Provider로 감싸진 모든 자식 컴포넌트들은 이 value에 접근할 수 있습니다.
  return (
    <ImageDataContext.Provider value={imageData}>
      {children}
    </ImageDataContext.Provider>
  );
}

// 3. 커스텀 훅 생성 (컴포넌트에서 '우물'의 물을 쉽게 길어올 수 있게 합니다)
export function useImageData() {
  return useContext(ImageDataContext);
}
