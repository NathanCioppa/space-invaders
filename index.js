const canvas = document.querySelector('canvas')
const cols = 125
const rows = 125
const blockSize = 4
canvas.width = cols * blockSize
canvas.height = rows * blockSize
const c = canvas.getContext('2d')

function drawPlayer(x) {
    const startX = Math.round(cols / 2) - 4
    const startY = (rows - 3)
    c.beginPath
    c.fillStyle='black'
    c.fillRect((startX + x) * blockSize, startY * blockSize, blockSize * 9, blockSize * 2)
    c.fillRect((startX + (x + 0.5)) * blockSize, (startY - 0.5) * blockSize, blockSize * 8, blockSize)
    c.fillRect((startX + (x + 1)) * blockSize, (startY - 1) * blockSize, blockSize * 7, blockSize)
    c.fillRect((startX + (x + 3)) * blockSize, (startY - 2) * blockSize, blockSize * 3, blockSize)
    c.fillRect((startX + (x + 4)) * blockSize, (startY - 3) * blockSize, blockSize, blockSize)
    c.stroke()
}

let shotX = 0
let shotY = 10
let ready = true
let hit = false

function shoot(x, y) {
    c.beginPath
    c.fillStyle='black'
    c.fillRect(((x + 0.75)* blockSize), y * blockSize, 0.5 * blockSize, 3 * blockSize)
    c.stroke()
}

let alienShotCol
let alienShotRow
let alignShotX
let alienShotX = 1
let alienShotY = 1

function alienShoot(x, y) {
    let draw = 0
    c.beginPath
    c.fillStyle='blue'
    for (i = 0; i < 4; i++) {
        if (i % 2 === 0) {
            c.fillRect(x * blockSize, (y + draw) * blockSize, blockSize, blockSize)
        }
        if (i % 2 !== 0) {
            c.fillRect((x + 1) * blockSize, (y + draw) * blockSize, blockSize, blockSize)
        }
        draw += 1
    }
    c.stroke()
}

function barriers(barrier, barrierArray, n, y) {
    c.fillRect(barrier * blockSize, (rows - y) * blockSize, blockSize, blockSize)
        for (let i = 0; i < barrierArray.length; i++) {
            if (n === barrierArray[i]) {
                c.clearRect(barrier * blockSize, (rows - y) * blockSize, blockSize, blockSize)
            }
        }
}

function hitBarrier(checkBarrier, clearBarrier) {
    for (let i = 11; i <= 20; i++) {
        if (shotY === i && clearBarrier.includes(shotX + checkBarrier) === false) {
            hit = true
            clearBarrier.push(shotX + checkBarrier)
            i = 22
        }
        else if (shotY - 1 === i && clearBarrier.includes(shotX + checkBarrier) === false) {
            hit = true
            clearBarrier.push(shotX + checkBarrier)
            i = 22
        }
        checkBarrier += 20
    }
}

function drawAlien(x, y, n, alienArray) {
    c.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
    for (let i = 0; i < alienArray.length; i++) {
        if (n === alienArray[i]) {
            c.clearRect(x * blockSize, y * blockSize, blockSize, blockSize)
        }
    }
}

let d = 1
let dy = 20
let alienX
let alienY
let moveAlien = 0
let pose = 1
let alienColor = 'green'
let rightBound = 37
let leftBound = 2

function moveAliens(alienArea, alienWidth, distApart, distFromTop, alienArray, align, row) {
    alienY = dy
    alienX = 1 + moveAlien
    if (countFrames % alienSpeed === 0 && countFrames > 0) {
        moveAlien += d
        pose += 1
    }

    if (alienX > rightBound && d > 0) {
        d = -d
        dy += 10
    }
        if (alienX < leftBound && d < 0) {
            d = -d
            dy += 10
        }

    c.beginPath
    c.fillStyle=alienColor
    
    for (let ii = 0; ii < alienArea; ii++) {
        if (ii % alienWidth === 0 && ii > 0) {
            alienY += 1
            alienX = 1 + moveAlien
        }
        for (i = 0; i <= 5; i++) {
            if (row[i] !== 0) {
                drawAlien((alienX + align) + (i * distApart), alienY + distFromTop, ii, alienArray)
            }   
        }
        alienX += 1
    }
    c.stroke
}

function alienAnimations() {
    if (pose % 2 !== 0) {
        alienTop[15] = 41; alienTop[16] = 43; alienTop[17] = 44; alienTop[18] = 46
        alienTop[20] = 48; alienTop[23] = 55
        alienTop[24] = 57; alienTop[25] = 57; alienTop[28] = 62; alienTop[29] = 62

        alienMiddle[9] = 11; alienMiddle[17] = 21
        alienMiddle[18] = 22; alienMiddle[21] = 32
        alienMiddle[22] = 33; alienMiddle[25] = 43
        alienMiddle[26] = 56; alienMiddle[27] = 64
        alienMiddle[36] = 78; alienMiddle[39] = 82; alienMiddle[40] = 82; alienMiddle[42] = 86;

        alienBottom[16] = 61; alienBottom[19] = 70
        alienBottom[23] = 75; alienBottom[26] = 80
        alienBottom[28] = 84; alienBottom[29] = 85; alienBottom[34] = 94; alienBottom[35] = 95
        
    }
    else if (pose % 2 === 0) {
        alienTop[15] = 42; alienTop[16] = 51; alienTop[17] = 52; alienTop[18] = 45
        alienTop[20] = 49; alienTop[23] = 54
        alienTop[24] = 56; alienTop[25] = 58; alienTop[28] = 61; alienTop[29] = 63
        
        alienMiddle[9] = 66; alienMiddle[17] = 76
        alienMiddle[18] = 55; alienMiddle[21] = 23
        alienMiddle[22] = 55; alienMiddle[25] = 65
        alienMiddle[26] = 55; alienMiddle[27] = 65
        alienMiddle[36] = 80; alienMiddle[39] = 81; alienMiddle[40] = 83; alienMiddle[42] = 84;

        alienBottom[16] = 62; alienBottom[19] = 69
        alienBottom[23] = 73; alienBottom[26] = 82
        alienBottom[28] = 86; alienBottom[29] = 87; alienBottom[34] = 92; alienBottom[35] = 93        
    }
}

let topAliensLife = [1, 2, 3, 4, 5, 6]
let midAliensLife = [1, 2, 3, 4, 5, 6]
let bottomAliensLife = [1, 2, 3, 4, 5, 6]
let alienSpeed = 50
let kills = 0

function hitAlien(row, distApart, width, align) {
    for (let i = 0; i <= 5; i++) {
        if (row[i] !== 0 &&
            shotX + Math.round(cols/2) >= moveAlien + (distApart * i) + align && 
            shotX + Math.round(cols/2) <= moveAlien + (distApart * i) + width + align) {
                hit = true
                row[i] = 0
                kills += 1
                
                if (kills > 0 && kills % 3 === 0 && kills <= 12) {
                    alienSpeed -= 10
                }
                else if (kills > 12 && kills < 17) {
                    alienSpeed -= 1
                }
                else if (kills === 17) {
                    alienSpeed -= 4
                    alienColor = 'red'
                }

                for (let i = 0; i <= 5; i++) {
                    if (topAliensLife[i] !== 0 || midAliensLife[i] !== 0 || bottomAliensLife[i] !== 0) {
                        leftBound = 2 - (i * 15)
                        i = 7
                    }
                }
                    for (let i = 5; i >= 0; i--) {
                        if (topAliensLife[i] !== 0 || midAliensLife[i] !== 0 || bottomAliensLife[i] !== 0) {
                            rightBound = 37 + (-(i - 5) * 15)
                            i = -1
                        }
                    }
        }
    }
}

let playerRight = false
let playerLeft = false
let fire = false
let alienFire = false
addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') {
        playerRight = true
        playerLeft = false
    }
    if (e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') {
        playerLeft = true
        playerRight = false
    }
    if (e.key === ' ' && ready === true) {
        shotX = playerX
        fire = true
    }
})
addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') {
        playerRight = false
    }
    if (e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') {
        playerLeft = false
    }
})

const alienTopArray = 
    [0, 1, 2, 5, 6, 7,
     8, 9, 14, 15,
     16, 23,
     26, 29,

     40, 41, 43, 44, 46, 47,
     48, 50, 53, 55,
     57, 57, 59, 60, 62, 62
    ]

    let alienTop = new Array(alienTopArray.length)
    for (let i = 0; i < alienTopArray.length; i++) {
        alienTop[i] = alienTopArray[i]
    }

const alienMiddleArray = 
    [0, 1, 3, 4, 5, 6, 7, 9, 10, //8
     11, 12, 13, 15, 16, 17, 19, 20, 21, //17
     22, 23, 31, 32, //21
     33, 36, 40, 43, //25

     56, 64, //27
     67, 69, 70, 71, 72, 73, 75, //34
     77, 78, 79, 82, 82, 82, 85, 86, 87 //43
    ]

    let alienMiddle = new Array(alienMiddleArray.length)
    for (let i = 0; i < alienMiddleArray.length; i++) {
        alienMiddle[i] = alienMiddleArray[i]
    }

const bottomAlienArray = 
    [0, 1, 2, 3, 8, 9, 10, 11, //7
     12, 23, //9

     39, 40, 43, 44, //13

     60, 61, 61, 65, 66, 70, 70, 71, //21
     72, 75, 76, 79, 80, 83, //27
     84, 85, 88, 89, 90, 91, 94, 95 //35
    ]

    let alienBottom = new Array(bottomAlienArray.length)
    for (let i = 0; i  < bottomAlienArray.length; i++) {
        alienBottom[i] = bottomAlienArray[i]
    }

const barrierArray = 
    [6, 7, 8, 9, 10, 11, 12, 13,
    26, 27, 28, 29, 30, 31, 32, 33,
    46, 47, 48, 49, 50, 51, 52, 53,
    66, 67, 68, 69 ,70, 71, 72, 73,
    87, 88, 89, 90, 91, 92,
    108, 109, 110, 111,
    160, 179,
    180, 181, 198, 199]

let clearBarrierLeft = new Array(barrierArray.length)
for (let i = 0; i < barrierArray.length; i++) {
    clearBarrierLeft[i] = barrierArray[i]
}

let clearBarrierMid = new Array(barrierArray.length)
for (let i = 0; i < barrierArray.length; i++) {
    clearBarrierMid[i] = barrierArray[i]
}

let clearBarrierRight = new Array(barrierArray.length)
for (let i = 0; i < barrierArray.length; i++) {
    clearBarrierRight[i] = barrierArray[i]
}

let playerX = 0
let countFrames = 0
let hold = 0

function invadeSpace() {
    requestAnimationFrame(invadeSpace)
    c.beginPath
    c.clearRect(0, 0, cols * blockSize, rows * blockSize)
    c.stroke()
    
    if (playerRight === true && playerX < Math.round(cols/2) - 6) {
        playerX += 1
    }
        if (playerLeft === true && playerX > -Math.round(cols/2) + 4) {
            playerX += -1
        }
    drawPlayer(playerX)

    alienAnimations()
    moveAliens(64, 8, 15.5, 0, alienTop, 0.25, topAliensLife)
    moveAliens(88, 11, 15, 10, alienMiddle, 0, midAliensLife)
    moveAliens(96, 12, 15, 20, alienBottom, -0.5, bottomAliensLife)

    c.beginPath
    c.fillStyle='orange'
    
    let barrierY = 11
    let barrierLX = 10
    let barrierMX = 53
    let barrierRX = 96

    for (let ii = 0; ii < 200; ii++) {
        if (ii % 20 === 0 && ii > 0) {
            barrierY += 1
            barrierLX = 10
            barrierMX = 53
            barrierRX = 96
        }
        
        barriers(barrierLX, clearBarrierLeft, ii, barrierY)
        barrierLX += 1

        barriers(barrierMX, clearBarrierMid, ii, barrierY)
        barrierMX += 1

        barriers(barrierRX, clearBarrierRight, ii, barrierY)
        barrierRX += 1
    }
    c.stroke()

    if (fire === true) {
        ready = false
        shoot(shotX + (cols / 2), rows - shotY)
        shotY += 2
        if (rows - shotY < 0 || hit === true) {
            fire = false
            shotY = 10
            ready = true
            hit = false
        }

        if (shotX > -54 && shotX < -33) {
            hitBarrier(53, clearBarrierLeft)
        }
            if (shotX > -11 && shotX < 10) {
                hitBarrier(10, clearBarrierMid)
            }
                if (shotX > 32 && shotX < 53) {
                    hitBarrier(-33, clearBarrierRight)
                }

        if (rows - shotY >= alienY - 7 && rows - shotY <= alienY) {
            hitAlien(topAliensLife, 15.5, 8, 0.75)
        }
        else if (rows - shotY + 1 >= alienY - 7 && rows - shotY + 1 <= alienY) {
            hitAlien(topAliensLife, 15.5, 8, 0.75)
        }

            if (rows - shotY >= alienY + 3 && rows - shotY <= alienY + 10) {
                hitAlien(midAliensLife, 15, 11, 0.5)
            }
            else if (rows - shotY + 1 >= alienY + 3 && rows - shotY + 1 <= alienY + 10) {
                hitAlien(midAliensLife, 15, 11, 0.5)
            }

                if (rows - shotY >= alienY + 13 && rows - shotY <= alienY + 20) {
                    hitAlien(bottomAliensLife, 15, 12, 0)
                }
                else if (rows - shotY + 1 >= alienY + 13 && rows - shotY + 1 <= alienY + 20) {
                    hitAlien(bottomAliensLife, 15, 12, 0)
                }
    }

    if (alienFire === false) {
        hold += 1
    }

    if (alienFire === false && hold >= 20) {
        alienShotCol = Math.floor(Math.random() * 6)

        if (topAliensLife[alienShotCol] !== 0 || midAliensLife[alienShotCol] !== 0 || bottomAliensLife[alienShotCol] !== 0) {
            if (bottomAliensLife[alienShotCol] !== 0) {
                alienShotX = alienX + (((bottomAliensLife[alienShotCol] - 1) * 15) - 8)
                alienShotY = alienY + 21
                alienFire = true
                hold = 0
            }
            else if (midAliensLife[alienShotCol] !== 0) {
                alienShotX = alienX + (((midAliensLife[alienShotCol] - 1) * 15) - 8)
                alienShotY = alienY + 11
                alienFire = true
                hold = 0
            }
            else if (topAliensLife[alienShotCol] !== 0) {
                if (topAliensLife[alienShotCol] < 4) {
                    alienShotX = alienX + (((topAliensLife[alienShotCol] - 1) * 15) - 8)
                }
                else {
                    alienShotX = alienX + (((topAliensLife[alienShotCol] - 1) * 15) - 7)
                }
                alienShotY = alienY + 1
                alienFire = true
                hold = 0
            }
        }
    }
    
    if (alienFire === true) {
        alienShoot(alienShotX, alienShotY)
        alienShotY += 1
        if (alienShotY >= rows) {
            alienFire = false
        }
    }
    countFrames += 1
}
invadeSpace()