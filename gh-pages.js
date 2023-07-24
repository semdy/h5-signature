const fs = require("fs")
const path = require('path')
const ghPagesDir = path.resolve(__dirname, './gh-pages')
const htmlPath = path.resolve(__dirname, './index.html')
const libjsPath = path.resolve(__dirname, './lib/index.js')

function main() {
  try {
    if (fs.existsSync(ghPagesDir)) {
      fs.rmSync(ghPagesDir, { recursive: true, force: true })
    }
    fs.mkdirSync(ghPagesDir)
    fs.copyFileSync(htmlPath, path.resolve(ghPagesDir, './index.html'))
    fs.copyFileSync(libjsPath, path.resolve(ghPagesDir, './index.js'))
  } catch(e) {
    console.log(e)
    process.exit(1)
  }
}

main()
