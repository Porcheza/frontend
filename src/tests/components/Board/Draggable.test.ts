import { describe, expect, it, vi } from "vitest";
import Draggable from "../../../components/Board/Draggable.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

describe("Draggable Component", () => {
  const testPinia = createTestingPinia({
    createSpy: vi.fn(),
    stubActions: false,
  });

  it("Should be defined", () => {
    expect(Draggable).toBeDefined();
  });

  it("Should be rendered properly when has prop tickets", () => {
    const tickets = [
      {
        id: 1,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Test Ticket",
        description: "Test Description",
        contactInfo: "Test Contact",
        status: "PENDING",
      },
    ];

    const wrapper = mount(Draggable, {
      global: {
        plugins: [testPinia],
      },
      props: {
        tickets,
        disabled: false,
      },
    });
    const draggable = wrapper.find(".draggable");
    const ticketCard = wrapper.findComponent({ name: "TicketCard" });

    expect(draggable.exists()).toBe(true);
    expect(ticketCard.exists()).toBe(true);
  });

  it("Should be emit onClick when click ticketCard", async () => {
    const tickets = [
      {
        id: 1,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Test Ticket",
        description: "Test Description",
        contactInfo: "Test Contact",
        status: "PENDING",
      },
    ];

    const wrapper = mount(Draggable, {
      global: {
        plugins: [testPinia],
      },
      props: {
        tickets,
        disabled: false,
      },
    });
    const ticketCard = wrapper.findComponent({ name: "TicketCard" });
    ticketCard.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted("onClick")).toBeTruthy();
  });
});
