import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CreateOrUpdateTicketModal from "../../../components/Modal/CreateOrUpdateTicketModal.vue";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import dayjs from "dayjs";
import { useTicketStore } from "../../../stores/ticket.store";

describe("CreateOrUpdateTicketModal Component", () => {
  const testPinia = createTestingPinia({
    createSpy: vi.fn(),
    stubActions: false,
  });

  const mockTicketStore = useTicketStore(testPinia);

  beforeEach(() => {
    vi.spyOn(mockTicketStore, "createTicket");
    vi.spyOn(mockTicketStore, "updateTicket");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(CreateOrUpdateTicketModal).toBeDefined();
  });

  it("Should be rendered properly when has prop ticket is null", () => {
    const wrapper = shallowMount(CreateOrUpdateTicketModal, {
      global: {
        plugins: [testPinia],
      },
      props: {
        id: "modalId",
        ticket: null,
        status: "PENDING",
      },
    });

    const modal = wrapper.find(".modal");
    const modalHeader = wrapper.find(".modal-header");
    const modalBody = wrapper.find(".modal-body");
    const modalTitle = wrapper.find(".modal-title");
    const modalBadge = wrapper.find(".badge");
    const inputTitle = wrapper.find(".input__title");
    const inputDescription = wrapper.find(".input__description");
    const inputContactInfo = wrapper.find(".input__contact-info");
    const timeCreatad = wrapper.find(".time__created");
    const timeUpdated = wrapper.find(".time__updated");
    const closeBtn = wrapper.find(".btn__close");
    const submitBtn = wrapper.find(".btn__submit");

    expect(modal.exists()).toBe(true);
    expect(modalHeader.exists()).toBe(true);
    expect(modalBody.exists()).toBe(true);
    expect(modalTitle.text()).toBe("Create Ticket");
    expect(modalBadge.text()).toBe("PENDING");
    expect(inputTitle.element.value).toBe("");
    expect(inputDescription.element.value).toBe("");
    expect(inputContactInfo.element.value).toBe("");
    expect(timeCreatad.text()).toBe("-");
    expect(timeUpdated.text()).toBe("-");
    expect(closeBtn.text()).toBe("Close");
    expect(submitBtn.text()).toBe("Create");
  });

  it("Should be rendered properly when has prop ticket is not null", () => {
    const ticket = {
      id: 1,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: "Test Ticket",
      description: "Test Description",
      contactInfo: "Test Contact",
      status: "PENDING",
    };
    const wrapper = shallowMount(CreateOrUpdateTicketModal, {
      global: {
        plugins: [testPinia],
      },
      props: {
        id: "modalId",
        ticket,
        status: "PENDING",
      },
    });

    const modal = wrapper.find(".modal");
    const modalHeader = wrapper.find(".modal-header");
    const modalBody = wrapper.find(".modal-body");
    const modalTitle = wrapper.find(".modal-title");
    const modalBadge = wrapper.find(".badge");
    const inputTitle = wrapper.find(".input__title");
    const inputDescription = wrapper.find(".input__description");
    const inputContactInfo = wrapper.find(".input__contact-info");
    const timeCreatad = wrapper.find(".time__created");
    const timeUpdated = wrapper.find(".time__updated");
    const closeBtn = wrapper.find(".btn__close");
    const submitBtn = wrapper.find(".btn__submit");

    expect(modal.exists()).toBe(true);
    expect(modalHeader.exists()).toBe(true);
    expect(modalBody.exists()).toBe(true);
    expect(modalTitle.text()).toBe("Edit Ticket");
    expect(modalBadge.text()).toBe("PENDING");
    expect(inputTitle.element.value).toBe("Test Ticket");
    expect(inputDescription.element.value).toBe("Test Description");
    expect(inputContactInfo.element.value).toBe("Test Contact");
    expect(timeCreatad.text()).toBe(
      dayjs(ticket.createdAt).format("MMM D, YYYY h:mm A")
    );
    expect(timeUpdated.text()).toBe(
      dayjs(ticket.updatedAt).format("MMM D, YYYY h:mm A")
    );
    expect(closeBtn.text()).toBe("Close");
    expect(submitBtn.text()).toBe("Save");
  });

  it("Should be emit event when click submit button", async () => {
    const wrapper = shallowMount(CreateOrUpdateTicketModal, {
      global: {
        plugins: [testPinia],
      },
      props: {
        id: "modalId",
        ticket: null,
        status: "PENDING",
      },
    });

    const submitBtn = wrapper.find(".btn__submit");
    submitBtn.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
