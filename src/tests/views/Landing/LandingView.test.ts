import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LandingView from "../../../views/Landing/LandingView.vue";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { useTicketStore } from "../../../stores/ticket.store";

describe("LandingView Component", () => {
  const testPinia = createTestingPinia({
    createSpy: vi.fn(),
    stubActions: false,
  });

  const mockTicketStore = useTicketStore(testPinia);

  beforeEach(() => {
    vi.spyOn(mockTicketStore, "fetchTickets");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(LandingView).toBeDefined();
  });

  it("Should be rendered properly", () => {
    const wrapper = shallowMount(LandingView, {
      global: {
        plugins: [testPinia],
      },
    });

    const filterTicket = wrapper.findComponent({ name: "FilterTicket" });
    const boardDraggable = wrapper.findComponent({ name: "BoardDraggable" });

    expect(filterTicket.exists()).toBe(true);
    expect(boardDraggable.exists()).toBe(true);
  });
});
