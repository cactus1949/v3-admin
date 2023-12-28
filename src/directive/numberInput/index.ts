import { Directive } from "vue";

export const numberFormatDirective: Directive = {
  mounted(el) {
    // 确保 el 是输入元素
    const inputElement =
      el instanceof HTMLInputElement ? el : el.querySelector("input");

    if (!inputElement) {
      console.warn(
        "numberFormatDirective should be used with an input element."
      );
      return;
    }

    const formatToFixed = (value: string) =>
      value === "" ? "0.00" : (parseFloat(value) || 0).toFixed(2);

    const handleInput = (e: any) => {
      e.target.value = e.target.value
        .replace(/[^\d.]/g, "")
        .replace(/^\./g, "")
        .replace(/\.{2,}/g, ".")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
    };

    const handleBlur = () => {
      inputElement.value = formatToFixed(inputElement.value);
    };

    const handleFocus = () => {
      inputElement.select();
    };

    // 注册事件监听器
    inputElement.addEventListener("input", handleInput);
    inputElement.addEventListener("blur", handleBlur);
    inputElement.addEventListener("focus", handleFocus);

    // 保存事件监听器的引用，以便以后卸载
    inputElement._numberFormatHandlers = {
      handleInput,
      handleBlur,
      handleFocus,
    };
  },
  unmounted(el) {
    // 确保 el 是输入元素
    const inputElement =
      el instanceof HTMLInputElement ? el : el.querySelector("input");

    if (inputElement && inputElement._numberFormatHandlers) {
      // 注销事件监听器
      const { handleInput, handleBlur, handleFocus } =
        inputElement._numberFormatHandlers;
      inputElement.removeEventListener("input", handleInput);
      inputElement.removeEventListener("blur", handleBlur);
      inputElement.removeEventListener("focus", handleFocus);
    }
  },
};
