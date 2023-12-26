/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

/**
 * 从状态列表生成状态映射对象。
 *
 * @param statusList 包含标签和值的对象数组。
 * @returns 映射对象，其中键是状态值的字符串表示，值是对应的标签。
 * @throws 如果 statusList 不是数组或数组元素不符合预期格式，抛出错误。
 */
export function generateStatusMap(
  statusList: OptionType[]
): Record<string | number, string> {
  if (!Array.isArray(statusList)) {
    throw new Error("statusList must be an array");
  }

  const map: Record<string | number, string> = {};

  for (const option of statusList) {
    if (
      option &&
      typeof option.label === "string" &&
      (typeof option.value === "string" || typeof option.value === "number")
    ) {
      if (map.hasOwnProperty(option.value)) {
        console.warn(
          `Duplicate value detected in statusList: ${option.value}. Only the first occurrence will be used.`
        );
      } else {
        map[option.value] = option.label;
      }
    } else {
      throw new Error(
        "Each item in statusList must have a string label and a non-null value"
      );
    }
  }

  return map;
}
