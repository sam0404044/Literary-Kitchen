import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import QrReader from "@/components/QrReader.vue";

describe("QrReader.vue", () => {
  it("renders component", () => {
    const wrapper = mount(QrReader);
    expect(wrapper.exists()).toBe(true);
  });
  // 可根據實際功能擴充互動測試
});
