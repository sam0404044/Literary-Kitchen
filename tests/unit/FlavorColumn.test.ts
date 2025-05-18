import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FlavorColumn from "@/components/FlavorColumn.vue";

describe("FlavorColumn.vue", () => {
  it("renders with props", () => {
    const wrapper = mount(FlavorColumn, {
      props: { title: "Test Title", items: [{ name: "a" }, { name: "b" }] },
    });
    expect(wrapper.text()).toContain("Test Title");
    expect(wrapper.text()).toContain("a");
    expect(wrapper.text()).toContain("b");
  });
});
