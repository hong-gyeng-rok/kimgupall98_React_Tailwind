import Masonry from "react-masonry-css"; // react-masonry-css에서 임포트

export default function GalleryContents({ filteredImages }) {
  // 반응형 컬럼 개수 설정
  const breakpointColumnsObj = {
    default: 4, // 기본값 (가장 큰 화면)
    1280: 4, // 1280px 이하
    1024: 2, // 1024px 이하
    800: 1, // 768px 이하
    640: 1, // 640px 이하
  };

  return (
    <div>
      <div className=" max-h-230 overflow-y-auto ">
        {filteredImages && filteredImages.length > 0 ? ( //filteredImages라는 값은 GalleryContainer 함수에서 받아옴, 이를 통해 특정 시즌 이미지만 출력되도록함
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex gap-4" // flex 컨테이너 클래스 이미지 열 갭
            columnClassName="my-masonry-grid_column gap-4 bg-clip-padding " // 각 컬럼에 적용될 클래스 (gap-4는 gutter 역할)
          >
            {filteredImages.map((image) => (
              <div key={image.id} className=" rounded shadow mb-4">
                <img
                  src={image.urlConverted}
                  alt={image.title}
                  className="w-full  object-cover"
                  fetchPriority="high"
                  loading="lazy"
                />
              </div>
            ))}
          </Masonry>
        ) : (
          <p className="text-black">No images found for the selected season.</p>
        )}
      </div>
    </div>
  );
}
