import { screen, render, fireEvent } from "@testing-library/react";
import { DeleteModal } from "..";

const mockUser = {
  email: "b@b.bb",
  lastName: "b",
  firstName: "b",
};

const mockMutate = jest.fn();
jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useMutation: () => ({ mutate: mockMutate }),
  useQueryClient: () => jest.fn(),
}));

const mockSetOpen = jest.fn();
const mockDeleteModal = (
  <DeleteModal
    open={true}
    setOpen={mockSetOpen}
    delUser={mockUser}
    notify={jest.fn()}
  />
);

it("should render", () => {
  //  given
  //  when
  //  then
  render(mockDeleteModal);
});

describe("DeleteModal is displayed correctly", () => {
  it("title is displayed", () => {
    //  given
    render(mockDeleteModal);

    //  when
    const title = screen.getByText(
      /Êtes-vous sûr de vouloir supprimer cet utilisateur ?/i
    );

    //  then
    expect(title).toBeInTheDocument();
  });

  it("buttons are displayed", () => {
    //  given
    render(mockDeleteModal);

    //  when
    const validateButton = screen.getByRole("button", { name: "Valider" });
    const cancelButton = screen.getByRole("button", { name: "Annuler" });

    //  then
    expect(validateButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});

describe("methods are called when", () => {
  it("cancel button is pressed", () => {
    //  given
    render(mockDeleteModal);

    //  when
    const cancelButton = screen.getByRole("button", { name: "Annuler" });
    fireEvent.click(cancelButton);

    //  then
    expect(mockSetOpen).toBeCalledWith(false);
    expect(mockSetOpen).toBeCalledTimes(1);
  });

  it("validate button is pressed", () => {
    //  given
    render(mockDeleteModal);

    //  when
    const validateButton = screen.getByRole("button", { name: "Valider" });
    fireEvent.click(validateButton);

    //  then
    expect(mockMutate).toBeCalledTimes(1);
  });
});
