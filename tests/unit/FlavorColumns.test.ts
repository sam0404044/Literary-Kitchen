import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FlavorColumns from "@/components/FlavorColumns.vue";

describe("FlavorColumns.vue", () => {
  it("renders without error", () => {
    const wrapper = mount(FlavorColumns, {
      props: {
        columns: [
          { type: "A", title: "A", items: [{ name: "a1" }, { name: "a2" }] },
          { type: "B", title: "B", items: [{ name: "b1" }, { name: "b2" }] },
        ],
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("A");
    expect(wrapper.text()).toContain("B");
  });
});
