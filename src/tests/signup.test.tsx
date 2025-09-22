import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import SignUpForm from "@/components/SignUpForm";
import { system } from "@/components/ui/provider";

const renderSignInForm = () => {
  render(
    <ChakraProvider value={system}>
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    </ChakraProvider>,
  );
};

describe("Sign up form", () => {
  it("renders form title", () => {
    renderSignInForm();
    expect(screen.getByRole("heading")).toHaveTextContent("Sign up");
  });

  it("renders username input", () => {
    renderSignInForm();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });
});
