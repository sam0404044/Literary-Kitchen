import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ExitButton from "@/components/ExitButton.vue";

describe("ExitButton.vue", () => {
  it("renders button", () => {
    const wrapper = mount(ExitButton);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(ExitButton);
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
