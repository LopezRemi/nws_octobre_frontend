import { screen, render } from "@testing-library/react";
import Snack from "../Snack";

const MockSnack = (type, message) => (
  <Snack open={true} setOpen={jest.fn()} type={type} message={message} />
);

it("should render", () => {
  //  given
  //  when
  //  then
  render(MockSnack("success", "Hello World"));
});

it("Snack message is displayed correctly", () => {
  //  given
  render(MockSnack("success", "Hello World"));

  //  when
  const message = screen.getByRole("presentation", { value: /Hello World/i });

  //  then
  expect(message).toBeInTheDocument();
});
