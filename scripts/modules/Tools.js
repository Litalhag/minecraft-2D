// import { toolCursors } from '../Models/Tools-constance.js'
import { Tools } from '../Models/Tools-constance.js'
import { textures } from '../Models/tiles-constance.js'

export class Tool {
  constructor() {
    this.currentTool = ''
  }

  getCurrentTool() {
    return this.currentTool
  }

  onToolClick(event) {
    this.currentTool = event.target.classList[1]
    console.log(this.currentTool) // [tool, shovel/axe/pickaxe]
  }

  resetTools() {
    this.currentTool = ''
  }
}
