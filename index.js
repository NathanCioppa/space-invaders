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

function shoot(x, y) {
    c.beginPath
    c.fillStyle='black'
    c.fillRect(((x + 0.75)* blockSize), y * blockSize, 0.5 * blockSize, 3 * blockSize)
    c.stroke()
}

function barriers(barrier, barrierArray, n, y) {
    c.fillRect(barrier * blockSize, (rows - y) * blockSize, blockSize, blockSize)
        for (let i = 0; i < barrierArray.length; i++) {
            if (n === clearBarrierLeft[i]) {
                c.clearRect(barrier * blockSize, (rows - y) * blockSize, blockSize, blockSize)
            }
        }
}

let playerRight = false
let playerLeft = false
let fire = false
addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'ArrowRight') {
        playerRight = true
        playerLeft = false
    }
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        playerLeft = true
        playerRight = false
    }
    if (e.key === ' ' && ready === true) {
        shotX = playerX
        fire = true
    }
})
addEventListener('keyup', (e) => {
    if (e.key === 'd' || e.key === 'ArrowRight') {
        playerRight = false
    }
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        playerLeft = false
    }
})

let clearBarrierLeft = 
    [6, 7, 8, 9, 10, 11, 12, 13,
    26, 27, 28, 29, 30, 31, 32, 33,
    46, 47, 48, 49, 50, 51, 52, 53,
    66, 67, 68, 69 ,70, 71, 72, 73,
    87, 88, 89, 90, 91, 92,
    108, 109, 110, 111,
    160, 179,
    180, 181, 198, 199]

let clearBarrierMid = new Array(clearBarrierLeft.length)
for (let i = 0; i < clearBarrierLeft.length; i++) {
    clearBarrierMid[i] = clearBarrierLeft[i] + 44
}

let clearBarrierRight = new Array(clearBarrierLeft.length)
for (let i = 0; i < clearBarrierLeft.length; i++) {
    clearBarrierRight[i] = clearBarrierMid[i] + 44
}

let playerX = 0
let shotX = 0
let shotY = 10
let ready = true
let hit = false
let old = false

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

        if (shotX < -Math.round(cols/2) + 30 && shotX > -Math.round(cols/2) + 9) {
            let checkBarrier = 53
            for (let i = 11; i <= 20; i++) {
                if (shotY === i && clearBarrierLeft.includes(shotX + checkBarrier) === false) {
                    hit = true
                    clearBarrierLeft.push(shotX + checkBarrier)
                    i = 22
                }
                else if(shotY - 1 === i && clearBarrierLeft.includes(shotX + checkBarrier) === false) {
                    hit = true
                    clearBarrierLeft.push(shotX + checkBarrier)
                    i = 22
                }
                checkBarrier += 20
            }
        }
    }

    c.beginPath
    c.fillStyle='red'
    c.fillRect(9 * blockSize, (rows - 10) * blockSize, blockSize, blockSize)
    c.fillRect(9 * blockSize, (rows - 21) * blockSize, blockSize, blockSize)
    c.fillRect(30 * blockSize, (rows - 10) * blockSize, blockSize, blockSize)
    c.fillRect((cols - 9) * blockSize, (rows - 10) * blockSize, blockSize, blockSize)
    c.fillRect((cols - 9) * blockSize, (rows - 21) * blockSize, blockSize, blockSize)
    c.fillRect((cols - 30) * blockSize, (rows - 10) * blockSize, blockSize, blockSize)
    c.fillRect(52 * blockSize, (rows - 10) * blockSize, blockSize, blockSize)
    c.fillRect(52 * blockSize, (rows - 21) * blockSize, blockSize, blockSize)
    c.fillRect(73 * blockSize, (rows - 10) * blockSize, blockSize, blockSize)
    c.fillStyle='grey'
    for (let i = 0; i < 500; i++) {
        if (i % 2 === 0) {
            c.fillRect(i * blockSize, (cols - 9)*blockSize, blockSize, blockSize)
        }
    }
    c.stroke()
    
}
invadeSpace()