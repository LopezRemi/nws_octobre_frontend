import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const mockLocalStorage = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = JSON.stringify(value);
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

const time = new Date().getTime();
const mockFakeToken = {
  value: "thisIsDefinitelyNotAFakeToken",
  expiry: time,
};

const mockUser = {
  email: "b@b.bb",
  lastName: "b",
  firstName: "b",
};

const mockuseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockuseNavigate,
}));

beforeEach(() =>
  Object.defineProperty(window, "localStorage", { value: mockLocalStorage })
);

test("renders learn react link", () => {
  //  given
  //  when
  //  then
  render(<App />);
});

describe("App is displayed correctly", () => {
  it("Welcome text is displayed", () => {
    //  given
    render(<App />);

    //  when
    const welcomeText = screen.getByText(/Bienvenue/i);

    //  then
    expect(welcomeText).toBeInTheDocument();
  });

  it("Buttons are displayed", () => {
    //  given
    render(<App />);

    //  when
    const listButton = screen.getByRole("button", {
      name: /Liste des utilisateurs/i,
    });
    const connectionButton = screen.getByRole("button", {
      name: /Se connecter/i,
    });

    //  then
    expect(listButton).toBeInTheDocument();
    expect(connectionButton).toBeInTheDocument();
  });

  it("User list button is disabled", () => {
    //  given
    render(<App />);

    //  when
    const listButton = screen.getByRole("button", {
      name: /Liste des utilisateurs/i,
    });

    //  then
    expect(listButton).toBeDisabled();
  });

  it("User list button is not disabled after connection", () => {
    //  given
    window.localStorage.setItem("fake-token", mockFakeToken);
    render(<App />);

    //  when
    const listButton = screen.getByRole("button", {
      name: /Liste des utilisateurs/i,
    });

    //  then
    expect(listButton).not.toBeDisabled();
  });

  it("Connection button is disabled after connection", () => {
    //  given
    window.localStorage.setItem("fake-token", mockFakeToken);
    render(<App />);

    //  when
    const connectionButton = screen.getByRole("button", {
      name: /Se connecter/i,
    });

    //  then
    expect(JSON.parse(window.localStorage.getItem("fake-token"))).toEqual(
      mockFakeToken
    );
    expect(connectionButton).toBeDisabled();
  });

  it("Hello user text is displayed", () => {
    //  given
    window.localStorage.setItem("fake-token", mockFakeToken);
    window.localStorage.setItem("user", mockUser);
    render(<App />);

    //  when
    const helloText = screen.getByText(/Bonjour/i);

    //  then
    expect(helloText).toBeInTheDocument();
  });

  it("Deconnection button is displayed", () => {
    //  given
    window.localStorage.setItem("fake-token", mockFakeToken);
    window.localStorage.setItem("user", mockUser);
    render(<App />);

    //  when
    const deconnectionButton = screen.getByRole("button", {
      name: /Se déconnecter/i,
    });

    //  then
    expect(deconnectionButton).toBeInTheDocument();
    expect(deconnectionButton).not.toBeDisabled();
  });
});

describe("useNavigate is called when", () => {
  it("connection button is pressed", () => {
    //  given
    window.localStorage.removeItem("fake-token");
    render(<App />);

    //  when
    const connectionButton = screen.getByRole("button", {
      name: /Se connecter/i,
    });
    fireEvent.click(connectionButton);

    //  then
    expect(mockuseNavigate).toBeCalledWith("/login");
    expect(mockuseNavigate).toBeCalledTimes(1);
  });
});
