/*
 * @Author: zhaotao
 * @Date: 2021-06-05 05:06:51
 * @LastEditTime: 2021-06-05 05:42:10
 * @LastEditors: zhaotao
 * @Description: entry file(Modules to control application life and create native browser window)
 * @FilePath: \SignTool\main.js
 * A journey of a thousand miles begins with the first step.
 */
const { app, BrowserWindow } = require('electron')
const path = require('path')

// create the browser window
function createWindow(params) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // __dirname 字符串指向当前正在执行脚本的路径 (本例中，你的项目的根文件夹)。  path.join API 将多个路径段联结在一起， 创建一个跨平台的组合路径字符串。
    }
  })

  // load the index.html of the app
  win.loadFile('index.html')

  // open the devTools
  win.webContents.openDevTools()
}


// 关闭所有窗口时退出应用 (Windows & Linux)
// 监听 app 模块的 'window-all-closed' 事件，并在用户不是在 macOS (darwin) 上运行时调用 [app.quit()][app-quit]
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口。 您可以通过使用 app.whenReady() API来监听此事件。 在whenReady()成功后调用createWindow()。
// 如果没有窗口打开则打开一个窗口 (macOS)
// 当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。
// 监听 app 模块的 activate 事件，并在没有浏览器窗口打开的情况下调用你仅存的 createWindow() 方法
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindow().length === 0) {
      createWindow()
    }
  })
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
