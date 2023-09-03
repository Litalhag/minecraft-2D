import { toolTileInteractions } from '../Models/tool-tile-interaction.js'

export class Tile {
  static toolTileInteractions = {
    shovel: ['mainDesertGround', 'desertGround'],
    axe: ['grass', 'rock'],
    pickaxe: ['groundGrassTop', 'ground'],
    waterPump: ['water', 'waterRock', 'cloud'],
  }

  onTileClick(event, currentTool, collectCallback) {
    const tileType = event.target.classList[1] // [tile, tileType]

    // Check if a tool is selected
    if (!currentTool || currentTool.trim() === '') {
      return
    }

    // Check if the current tool can interact with the clicked tile
    if (Tile.toolTileInteractions[currentTool].includes(tileType)) {
      this.replaceTileWithSkies(event.target)

      // Notify about tile collection ONLY if the tool could interact with the tile
      if (collectCallback) {
        collectCallback(tileType)
      }
    }
  }

  replaceTileWithSkies(tileElement) {
    // Remove the existing tile type
    tileElement.classList.remove(tileElement.classList[1])

    // Add the 'skies' tile type
    tileElement.classList.add('skies')
  }
}

// shovel - mainDesertGround, desertGround;
// axe - grass, rock;
// pickaxe - groundGrassTop, ground, rock, waterRock;
