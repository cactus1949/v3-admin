import { Directive, nextTick } from "vue";

export const numberFormatDirective: Directive = {
  beforeMount(el) {
    const formatToFixed = (value: string) => {
      if (value === "") return "0.00"; // 空值设置为 "0.00"
      const num = parseFloat(value);
      return isNaN(num) ? "0.00" : num.toFixed(2);
    };

    const inputHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value
        .replace(/[^\d.]/g, "") // 只允许数字和小数点
        .replace(/^\./g, "") // 不允许以小数点开头
        .replace(/\.{2,}/g, ".") // 不允许输入多个小数点
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      target.dispatchEvent(new Event("input"));
    };

    const blurHandler = () => {
      const inputElement = el.querySelector("input") as HTMLInputElement;
      inputElement.value = formatToFixed(inputElement.value);
      inputElement.dispatchEvent(new Event("input"));
    };

    const focusHandler = () => {
      const inputElement = el.querySelector("input") as HTMLInputElement;
      inputElement.select();
    };

    nextTick(() => {
      const inputElement = el.querySelector("input");
      if (inputElement) {
        inputElement.addEventListener("input", inputHandler);
        inputElement.addEventListener("blur", blurHandler);
        inputElement.addEventListener("focus", focusHandler);
      }
    });
  },
};
