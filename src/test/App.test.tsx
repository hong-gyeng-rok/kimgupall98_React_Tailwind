import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("App Routing", () => {
  it("should render the not found page for a bad route", () => {
    // MemoryRouter를 사용하여 특정 경로에 대한 라우팅을 테스트합니다.
    const badRoute = "/some/bad/route";

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    // "페이지를 찾을 수 없습니다." 텍스트가 화면에 렌더링되는지 확인합니다.
    expect(screen.getByText("페이지를 찾을 수 없습니다.")).toBeInTheDocument();
  });
});
