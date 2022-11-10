import { fireEvent, render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

it("Should render correctly", () => {
  //  given
  //  when
  //  then
  render(<NotFound />);
});

describe("NotFound page is displayed correctly", () => {
  it("texts are displayed", () => {
    //  given
    render(<NotFound />);

    //  when
    const h1Text = screen.getByRole("heading", { level: 1 });
    const h2Text = screen.getByRole("heading", { level: 2 });

    //  then
    expect(h1Text).toBeInTheDocument();
    expect(h2Text).toBeInTheDocument();
  });

  it("button is displayed", () => {
    //  given
    render(<NotFound />);

    //  when
    const button = screen.getByRole("button", { name: /Accueil/i });

    //  then
    expect(button).not.toBeDisabled();
    expect(button).toBeInTheDocument();
  });
});

it("Button should redirect on press", () => {
  //  given
  render(<NotFound />);

  //  when
  const button = screen.getByRole("button", { name: /Accueil/i });
  fireEvent.click(button);

  //  then
  expect(mockUseNavigate).toBeCalledWith("/");
  expect(mockUseNavigate).toBeCalledTimes(1);
});
