import { useState, useEffect } from "react";
import { useImageData } from "../../context/ImageDataContext";

export default function BannerImg() {
  const allImageData = useImageData();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // allImageData가 아직 로드되지 않았으면(null이면) 아무것도 하지 않고 종료
    if (!allImageData) {
      return;
    }

    // allImageData가 로드된 후에 bannerData를 사용
    const bannerData = allImageData.banner;
    const timer = setTimeout(
      () =>
        setCount((prevCount) =>
          prevCount < bannerData.length - 1 ? prevCount + 1 : 0,
        ),
      3000,
    );

    // 컴포넌트가 언마운트되거나, 의존성(count, allImageData)이 변경되기 전에이전 타이머를 정리
    return () => clearTimeout(timer);
  }, [count, allImageData]);

  //이미지를 불러오지 못했을 때 에러 메세지 랜더링
  if (!allImageData) {
    return (
      <div className="flex items-center justify-center bg-gray-900 text-white h-[25rem] w-[20rem]">
        이미지 데이터 로딩 중...
      </div>
    );
  }
  //banner 이미지만 따로 저장
  const bannerData = allImageData.banner;

  return (
    <article className=" w-xs flex justify-center items-center">
      {bannerData && bannerData.length > 0 ? (
        <div className="rounded-lg p-2 shadow-xl/50 ">
          <img
            src={bannerData[count].urlConverted}
            alt={bannerData[count].title}
            className=" w-xs rounded object-cover"
            loading="lazy"
            fetchPriority="high"
          />
        </div>
      ) : (
        <p className="h-150">표시할 배너 데이터가 없습니다.</p>
      )}
    </article>
  );
}
