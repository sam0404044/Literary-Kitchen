import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SystemAlert from "@/components/SystemAlert.vue";

describe("SystemAlert.vue", () => {
  it("renders when visible", () => {
    const wrapper = mount(SystemAlert, {
      props: { show: true, message: "警告訊息" },
    });
    expect(wrapper.text()).toContain("警告訊息");
  });

  it("does not render when not visible", () => {
    const wrapper = mount(SystemAlert, {
      props: { show: false, message: "警告訊息" },
    });
    // 檢查 alert dom 是否未出現
    expect(wrapper.html()).not.toContain("警告訊息");
  });
});
