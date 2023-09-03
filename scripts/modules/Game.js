import { GENERATE_WORLD } from '../Models/UI.js' // the textures instance of tiles
import { Tools } from '../Models/Tools-constance.js'
// import { toolCursors } from '../Models/Tools-constance.js'
import { Tile } from '../modules/tile.js'
import { Tool } from '../modules/Tools.js'
import { Inventory } from '../modules/Inventory.js'

export class Game {
  constructor() {
    this.tile = new Tile()
    this.tool = new Tool()
    this.inventory = new Inventory()
  }

  startGame() {
    const introScreen = document.querySelector('.start-game')
    const gameScreen = document.querySelector('.game-part')

    // Hide intro screen
    introScreen.classList.add('display-none')

    // Show the game screen
    gameScreen.classList.remove('display-none')
  }

  renderWorld() {
    const worldContainer = document.getElementById('world')

    // Loop through the rows
    GENERATE_WORLD.forEach((row) => {
      const rowDiv = document.createElement('div')
      rowDiv.classList.add('row')

      // Loop through the columns
      row.forEach((texture) => {
        const tileDiv = document.createElement('div')
        tileDiv.classList.add('tile', texture) // texture as CSS class
        rowDiv.appendChild(tileDiv)
      })

      worldContainer.appendChild(rowDiv)
    })
  }

  renderTools() {
    const toolsContainer = document.querySelector('.tools')
    const availableTools = Object.keys(Tools)

    availableTools.forEach((tool) => {
      const newElement = document.createElement('div')
      newElement.classList.add('tool', tool) // Adds class ('shovel', 'axe', 'pickaxe' and tool class (css)

      toolsContainer.appendChild(newElement)
    })
  }

  addTilesListener() {
    const tiles = document.querySelectorAll('.tile')

    tiles.forEach((tile) => {
      tile.addEventListener('click', (event) => {
        console.log('click')
        console.log('this.inventory.activeTile', this.inventory.activeTile)

        if (this.inventory.activeTile) {
          const tileTypeToPlace = this.inventory.activeTile
          this.inventory.removeFromInventory(tileTypeToPlace)

          tile.classList.remove(tile.classList[1])
          tile.classList.add(tileTypeToPlace)
        } else {
          const currentTool = this.tool.getCurrentTool()

          this.tile.onTileClick(event, currentTool, (collectedTileType) => {
            this.inventory.addToInventory(collectedTileType)
          })
        }
      })
    })
  }

  renderMouseIcon(posX, posY) {
    const mouseIconImg = document.querySelector('img.mouse-icon')
    let icon
    if (this.inventory.activeTile) icon = this.inventory.activeTile
    else if (this.tool.currentTool) icon = this.tool.currentTool
    else icon = 'display-none'
    mouseIconImg.className = `mouse-icon ${icon}`
    mouseIconImg.style.top = `${posY + 5}px`
    mouseIconImg.style.left = `${posX + 5}px`
    mouseIconImg.style.backgroundColor = 'transparent'
  }

  addListeners() {
    // click on tile
    this.addTilesListener()

    // click on tool
    const tools = document.querySelectorAll('.tool')
    tools.forEach((tool) => {
      tool.addEventListener('click', (event) => {
        this.tool.onToolClick(event)
        // Set the cursor to the current tool's image
        // this.tool.ToolCursor();
      })
    })

    // click on inventory
    const inventory = document.querySelector('.inventory-box')
    inventory.addEventListener('click', (event) => {
      console.log(event.target)
      if (event.target === inventory) {
        this.inventory.toggleInventoryBox()
      }
    })

    // start game button
    const startButton = document.querySelector('.btn-start')
    startButton.addEventListener('click', (e) => {
      e.preventDefault() // Prevent default behavior of anchor tag (if there's any)
      this.startGame()
    })

    window.addEventListener('mousemove', (ev) => {
      const { clientX, clientY } = ev
      // console.log(`X: ${clientX} Y: ${clientY}`)
      this.renderMouseIcon(clientX, clientY)
    })

    // reset button
    const resetButton = document.querySelector('.reset-game-btn')
    resetButton.addEventListener('click', () => {
      this.resetGame()
    })

    // back button
    const backButton = document.querySelector('.backButton button')
    backButton.addEventListener('click', () => {
      this.returnToStartScreen()
    })
  }

  resetGame() {
    this.tool.resetTools()

    this.inventory.resetInventory()
    if (this.inventory.isBoxOpen) {
      this.inventory.closeInventory()
    }

    const worldContainer = document.getElementById('world')
    worldContainer.innerHTML = ''
    this.renderWorld()

    this.addTilesListener()
  }

  returnToStartScreen() {
    const introScreen = document.querySelector('.start-game')
    const gameScreen = document.querySelector('.game-part')

    // Show the intro screen
    introScreen.classList.remove('display-none')

    // Hide the game screen
    gameScreen.classList.add('display-none')
  }
}
