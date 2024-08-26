import { describe, expect, it, vi } from "vitest";
import TicketCard from "../../../components/Card/TicketCard.vue";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";

describe("TicketCard Component", () => {
  it("Should be defined", () => {
    expect(TicketCard).toBeDefined();
  });

  const testPinia = createTestingPinia({
    createSpy: vi.fn(),
    stubActions: false,
  });

  it("Should be rendered properly when has prop ticket", () => {
    const wrapper = shallowMount(TicketCard, {
      global: {
        plugins: [testPinia],
      },
      props: {
        ticket: {
          id: 1,
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          title: "Test Ticket",
          description: "Test Description",
          contactInfo: "Test Contact",
          status: "PENDING",
        },
      },
    });

    expect(wrapper.text()).toContain("Test Ticket");
    expect(wrapper.text()).toContain("Test Description");
  });
});
