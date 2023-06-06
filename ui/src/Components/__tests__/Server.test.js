import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { MockedProvider } from "@apollo/client/testing";

import { GET_DOG_QUERY, Dog } from "./dog";


const mocks = []; // We'll fill this in next


it("renders without error", async () => {

  render(

    <MockedProvider mocks={mocks} addTypename={false}>

      <Dog name="Buck" />

    </MockedProvider>

  );

  expect(await screen.findByText("Loading...")).toBeInTheDocument();

});