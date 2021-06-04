/*
 * @Author: zhaotao
 * @Date: 2021-06-05 05:25:18
 * @LastEditTime: 2021-06-05 05:42:37
 * @LastEditors: zhaotao
 * @Description: 预加载脚本 通过预加载脚本从渲染器访问Node.js。
 * @FilePath: \SignTool\preload.js
 * A journey of a thousand miles begins with the first step.
 */

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})