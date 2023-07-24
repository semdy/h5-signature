const fs = require("fs")
const path = require('path')
const demoDir = path.resolve(__dirname, './demo')
const htmlPath = path.resolve(__dirname, './index.html')
const libjsPath = path.resolve(__dirname, './lib/index.min.js')

function main() {
  try {
    if (fs.existsSync(demoDir)) {
      fs.rmSync(demoDir, { recursive: true, force: true })
    }
    fs.mkdirSync(demoDir)
    fs.copyFileSync(htmlPath, path.resolve(demoDir, './index.html'))
    fs.copyFileSync(libjsPath, path.resolve(demoDir, './index.js'))
  } catch(e) {
    console.log(e)
    process.exit(1)
  }
}

main()
