
export const outsideHandler = (target: HTMLElement, handler: (event?: MouseEvent) => void) => {
  // 点击事件的处理函数
  const handleClickOutside = (event: MouseEvent) => {
    if (target && !target.contains(event.target as Node)) {
      // 如果点击发生在组件外部
      handler(event)
    }
  };

  // 添加点击事件监听器到document
  document.addEventListener("mousedown", handleClickOutside);

  // 组件卸载时移除事件监听器
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}