import { inventoryData } from '../Models/Inventory-constance.js'

export class Inventory {
  constructor() {
    this.InventoryData = { ...inventoryData }
    this.isBoxOpen = false
    this.activeTile = null
  }

  toggleInventoryBox() {
    this.isBoxOpen = !this.isBoxOpen
    if (this.isBoxOpen) {
      this.openInventory()

      // Allow tiles in the inventory to be clicked and set as the active tile
      document.querySelectorAll('.tile-bg.item').forEach((tile) => {
        tile.addEventListener('click', this.selectTile.bind(this)) // Use binding to ensure 'this' context
      })
    } else {
      // Remove tile click event listeners to ensure no double bindings
      document.querySelectorAll('.tile-bg.item').forEach((tile) => {
        tile.removeEventListener('click', this.selectTile.bind(this))
      })

      this.closeInventory()
      this.activeTile = null // reset any previously selected tile
    }
  }

  // Separate tile selection logic into its own function
  selectTile(e) {
    const tileType = e.target.classList[2] // Assuming class structure is "tile-bg item <tileType>"
    if (!this.InventoryData[tileType]) return
    this.activeTile = tileType
  }

  attachTileListeners() {
    // Allow tiles in the inventory to be clicked and set as the active tile
    document.querySelectorAll('.tile-bg.item').forEach((tile) => {
      tile.removeEventListener('click', this.selectTile.bind(this)) // First, remove any previous listeners to prevent double bindings
      tile.addEventListener('click', this.selectTile.bind(this)) // Now, add the listener
    })
  }

  openInventory() {
    const inventoryList = document.createElement('div')
    inventoryList.className = 'inventory-open'
    console.log('this.InventoryData', this.InventoryData)
    inventoryList.innerHTML = this.getHtml()
    const inventoryBox = document.querySelector('.inventory-box')

    // Clear out the old inventory data.
    while (inventoryBox.firstChild) {
      inventoryBox.removeChild(inventoryBox.firstChild)
    }

    inventoryBox.appendChild(inventoryList)

    this.attachTileListeners() // Add this line
  }

  closeInventory() {
    console.log('closing')
    const inventoryList = document.querySelector('.inventory-open')
    if (inventoryList) {
      inventoryList.remove()
    }
  }

  getHtml() {
    console.log('this.InventoryData', this.InventoryData)
    const srtHtl = Object.entries(this.InventoryData)
      .map((data) => {
        console.log(data)
        return `<div>
      <div class="tile-bg item ${data[0]}">
            <span class= "item-amount">${data[1]}</span>
      </div>
    </div>`
      })
      .join('')
    return srtHtl
  }

  addToInventory(tileType) {
    // If the tileType already exists in the InventoryData
    if (this.InventoryData[tileType]) {
      this.InventoryData[tileType] += 1
    } else {
      this.InventoryData[tileType] = 1
    }

    // Check and remove tileType from inventory if its count becomes 0
    if (this.InventoryData[tileType] <= 0) {
      delete this.InventoryData[tileType]
    }

    // Since the inventory data has been updated, if the inventory is open, refresh its display.
    if (this.isBoxOpen) {
      const inventoryList = document.querySelector('.inventory-open')
      if (inventoryList) {
        inventoryList.innerHTML = this.getHtml()
        this.attachTileListeners() // Add this line
      }
    }
  }

  resetInventory() {
    this.InventoryData = { ...inventoryData }
    this.activeTile = null
  }

  // In the Inventory class

  removeFromInventory(tileTypeToPlace) {
    // Reduce the tile count in the inventory
    if (this.InventoryData[tileTypeToPlace] <= 0) {
      return // reset the active tile if none left
    } else {
      this.InventoryData[tileTypeToPlace] -= 1
      if (!this.InventoryData[tileTypeToPlace]) {
        this.activeTile = null
      }
    }

    // Update the inventory display to reflect the changed counts
    this.closeInventory()
    this.openInventory()
  }
}
