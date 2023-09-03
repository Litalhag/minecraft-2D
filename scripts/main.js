import { Game } from './modules/game.js'

const world = document.getElementById('world')
const tools = document.querySelector('.tools')
const inventory = document.querySelector('.inventory')
const inventoryWindow = document.querySelector('.inventory-box')
const resetBtn = document.querySelector('.reset-btn')

// Create a new instance of the Game class
const gameInstance = new Game()

// renderWorld method using the instance
gameInstance.renderWorld()

gameInstance.renderTools()

gameInstance.addListeners()
