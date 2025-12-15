import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ImageDataProvider, useImageData } from "../context/ImageDataContext";
import { AllImageData } from "../types/imageData";

// 테스트를 위한 가짜 이미지 데이터 (실제 구조와 일치해야 함)
const mockImageData: AllImageData = {
  banner: [
    {
      id: 99,
      title: "Test Banner Title",
      url: "test/banner.webp",
      description: "A test banner image",
      group: "배너",
      urlConverted: "test/banner_converted.webp",
    },
  ],
  "25ss": [], // 다른 시즌 데이터도 포함될 수 있으므로, 테스트 데이터에 추가해줍니다.
};

// `useImageData` hook을 사용해 데이터를 소비하는 테스트용 컴포넌트
const TestComponent = () => {
  const imageData = useImageData();

  // imageData가 null일 경우 (로딩 중)
  if (!imageData) {
    return <div>Loading...</div>;
  }

  // imageData 로딩 완료 후 (단, banner 데이터가 없을 수도 있음을 고려)
  if (!imageData.banner || imageData.banner.length === 0) {
    return <div>No banner data</div>;
  }

  // 최종적으로 데이터가 있을 경우, 제목을 표시
  return <div>{imageData.banner[0].title}</div>;
};

describe("ImageDataContext", () => {
  // 각 테스트가 실행되기 전에 `fetch` 함수를 모킹(가짜 함수로 대체)합니다.
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockImageData),
    });
  });

  // 각 테스트가 끝난 후, 모킹된 함수를 원래대로 복원합니다.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("초기 렌더링 시 로딩 상태를 표시해야 합니다.", () => {
    render(
      <ImageDataProvider>
        <TestComponent />
      </ImageDataProvider>
    );
    // 비동기 fetch가 완료되기 전에는 "Loading..." 텍스트가 있어야 합니다.
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("데이터 fetch가 완료된 후, 컨텍스트 데이터를 화면에 표시해야 합니다.", async () => {
    render(
      <ImageDataProvider>
        <TestComponent />
      </ImageDataProvider>
    );

    // `waitFor`를 사용해 비동기 작업이 완료되고 DOM이 업데이트될 때까지 기다립니다.
    await waitFor(() => {
      // 모킹된 데이터의 제목이 화면에 정상적으로 표시되는지 확인합니다.
      expect(screen.getByText(mockImageData.banner[0].title)).toBeInTheDocument();
    });

    // `fetch` 함수가 올바른 경로로 호출되었는지 확인합니다.
    expect(global.fetch).toHaveBeenCalledWith("/imageData.json");
  });
});