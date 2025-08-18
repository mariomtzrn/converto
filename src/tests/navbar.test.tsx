import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import NavBar from "@/components/NavBar";
import { system } from "@/components/ui/provider";

const renderNavBar = (props = {}) => {
  const defaultProps = {
    handleHome: vi.fn(),
    handleLogout: vi.fn(),
    handleSettings: vi.fn(),
    ...props,
  };

  return render(
    <ChakraProvider value={system}>
      <BrowserRouter>
        <NavBar {...defaultProps} />
      </BrowserRouter>
    </ChakraProvider>,
  );
};

describe("NavBar", () => {
  it("renders CONVERTO title", () => {
    renderNavBar();
    expect(screen.getByText("CONVERTO")).toBeInTheDocument();
  });

  it("calls handleHome when title is clicked", () => {
    const handleHome = vi.fn();
    renderNavBar({ handleHome });

    fireEvent.click(screen.getByText("CONVERTO"));
    expect(handleHome).toHaveBeenCalled();
  });
});
