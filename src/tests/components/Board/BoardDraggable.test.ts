import { describe, expect, it, vi } from "vitest";
import BoardDraggable from "../../../components/Board/BoardDraggable.vue";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";

describe("BoardDraggable Component", () => {
  const testPinia = createTestingPinia({
    createSpy: vi.fn(),
    stubActions: false,
  });

  it("Should be defined", () => {
    expect(BoardDraggable).toBeDefined();
  });

  it("Should be rendered properly when has prop boards", async () => {
    const boards = [
      {
        name: "Test Board",
        tickets: [
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
        ],
      },
    ];

    const wrapper = shallowMount(BoardDraggable, {
      global: {
        plugins: [testPinia],
      },
      props: {
        boards,
      },
    });
    const iconAddTicket = wrapper.find(".icon__add-ticket");
    const draggableComponent = wrapper.findComponent({ name: "draggable" });

    expect(wrapper.text()).toContain("Test Board");
    expect(iconAddTicket.exists()).toBe(true);
    expect(draggableComponent.exists()).toBe(true);
  });
});
