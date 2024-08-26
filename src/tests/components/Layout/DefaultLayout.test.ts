import { shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import router from "../../../router";
import DefaultLayout from "../../../components/Layout/DefaultLayout.vue";

describe("DefaultLayout Component", () => {
  const testPinia = createTestingPinia({
    createSpy: vi.fn(),
  });

  beforeEach(() => {});

  it("Should be rendered properly ", async () => {
    const wrapper = shallowMount(DefaultLayout, {
      global: {
        plugins: [testPinia, router],
        stubs: {
          RouterView: { template: "<div />" },
        },
      },
    });

    expect(wrapper).toBeDefined();

    await wrapper.vm.$nextTick();

    expect(wrapper.attributes("style")?.includes("padding-top")).toBeTruthy();
  });
});
