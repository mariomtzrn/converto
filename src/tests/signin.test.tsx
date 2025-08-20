import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import SignInForm from "@/components/SignInForm";
import { system } from "@/components/ui/provider";

const renderSignInForm = (props = {}) => {
  return render(
    <ChakraProvider value={system}>
      <MemoryRouter>
        <SignInForm {...props} />
      </MemoryRouter>
    </ChakraProvider>,
  );
};

describe("Sign in form", () => {
  it("renders form title", () => {
    renderSignInForm();
    expect(screen.getByRole("heading")).toHaveTextContent("Sign in");
  });

  it("renders username input", () => {
    renderSignInForm();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });
});
