import { describe, expect, it, vi } from "vitest";
import FilterTicket from "../../../components/Board/FilterTicket.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

describe("FilterTicket Component", () => {
  const testPinia = createTestingPinia({
    createSpy: vi.fn(),
    stubActions: false,
  });

  it("Should be defined", () => {
    expect(FilterTicket).toBeDefined();
  });

  it("Should be rendered properly is correct", async () => {
    const wrapper = mount(FilterTicket, {
      global: {
        plugins: [testPinia],
      },
    });
    const sortBy = wrapper.find(".sort-by");
    const selectWrapper = wrapper.find("select");
    const options = selectWrapper.findAll("option");

    expect(sortBy.exists()).toBe(true);
    expect(selectWrapper.exists()).toBe(true);
    expect(options.length).toBe(3);
    expect(options[0].text()).toBe("None");
    expect(options[1].text()).toBe("Created");
    expect(options[2].text()).toBe("Last updated");
    expect(selectWrapper.element.value).toBe(options[0].element.value);

    await selectWrapper.setValue(options[1].element.value);
    expect(selectWrapper.element.value).toBe(options[1].element.value);

    const btnDropdown = wrapper.find(".dropdown__filter");
    await btnDropdown.trigger("click");

    const menuDropdownWrapper = wrapper.find(".dropdown-menu");
    expect(menuDropdownWrapper.exists()).toBe(true);

    const menu = menuDropdownWrapper.findAll(".form-check");
    expect(menu.length).toBe(4);
    expect(menu[0].text()).toContain("PENDING");
    expect(menu[1].text()).toContain("ACCEPTED");
    expect(menu[2].text()).toContain("RESOLVED");
    expect(menu[3].text()).toContain("REJECTED");
  });
});
