import AutoComplete from "./AutoComplete.vue";
import { fireEvent, render } from "@testing-library/vue";
import type { RenderResult } from "@testing-library/vue";

export interface AutoCompleteFactoryProps {
  search?: string;
  searchKey?: string;
  data?: (Record<string, string | number> | string)[];
  resultSlot?: string;
}

const label = "Test Label";

function autoCompleteFactory(props?: AutoCompleteFactoryProps): RenderResult {
  return render(AutoComplete, {
    props: {
      id: "testComponent",
      label,
      search: "",
      data: [
        "Audi",
        "Audi Fancy",
        "Audi Basic",
        "Caudid",
        "Extreme Audi",
        "BMW",
        "Bentley",
        "Cadillac",
      ],
      ...props,
    },
    slots: props?.resultSlot
      ? {
          result: props.resultSlot,
        }
      : {},
  });
}

describe("Auto Complete Component", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = autoCompleteFactory({});
  });

  test("displays less than 3 characters message by default", async () => {
    const { findByText } = component;
    await findByText("Type at least 3 characters");
  });

  test("do nothing if less than 3 characters", async () => {
    const { findByText, getByLabelText } = component;
    const titleInput = getByLabelText(label);

    await fireEvent.update(titleInput, "Au");
    await findByText("Type at least 3 characters");
  });

  test("displays results expecting single result", async () => {
    const { getByText, getByLabelText } = component;

    const input = getByLabelText(label);

    await fireEvent.update(input, "Audi");
    getByText("Audi");

    await fireEvent.update(input, "BMW");
    getByText("BMW");
  });

  test("displays results expecting multiple results", async () => {
    const { getByText, getByLabelText } = component;

    const input = getByLabelText(label);

    await fireEvent.update(input, "Audi");
    getByText("Audi");
    getByText("Audi Fancy");
    getByText("Caudid");
    getByText("Extreme Audi");
  });

  test("displays results with different data structure", async () => {
    const slot = `<template #result="result">
         {{ result.item.first_name }}
        </template>`;

    const { getByText } = autoCompleteFactory({
      search: "Leonard",
      searchKey: "first_name",
      resultSlot: slot,
      data: [
        {
          id: 1,
          first_name: "Leonard",
          last_name: "Ailward",
          email: "lailward0@nytimes.com",
          gender: "Female",
        },
        {
          id: 2,
          first_name: "Cassie",
          last_name: "Caws",
          email: "ccaws1@altervista.org",
          gender: "Genderfluid",
        },
        {
          id: 3,
          first_name: "Allx",
          last_name: "Bloxham",
          email: "abloxham2@php.net",
          gender: "Bigender",
        },
        {
          id: 4,
          first_name: "Aleen",
          last_name: "Simanenko",
          email: "asimanenko3@state.tx.us",
          gender: "Male",
        },
        {
          id: 5,
          first_name: "Tommy",
          last_name: "Sagg",
          email: "tsagg4@gnu.org",
          gender: "Bigender",
        },
        {
          id: 6,
          first_name: "Gareth",
          last_name: "Housby",
          email: "ghousby5@hubpages.com",
          gender: "Bigender",
        },
        {
          id: 7,
          first_name: "Fanny",
          last_name: "Crossingham",
          email: "fcrossingham6@seesaa.net",
          gender: "Bigender",
        },
        {
          id: 8,
          first_name: "Archy",
          last_name: "Ren",
          email: "aren7@businesswire.com",
          gender: "Genderfluid",
        },
        {
          id: 9,
          first_name: "Moses",
          last_name: "Jaulme",
          email: "mjaulme8@webmd.com",
          gender: "Male",
        },
        {
          id: 10,
          first_name: "Amalea",
          last_name: "Knocker",
          email: "aknocker9@seesaa.net",
          gender: "Male",
        },
      ],
    });

    getByText("Leonard");
  });

  test("displays no results message", async () => {
    const { getByText, getByLabelText } = component;

    const titleInput = getByLabelText(label);

    await fireEvent.update(titleInput, "This is not an item");
    getByText("No results");
  });
});
