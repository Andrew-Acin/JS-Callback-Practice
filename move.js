function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }
//this changes the direction facing when pressing button (but only if you remember the callback after left, bottom)
    function moveWithArrowKeys(left, bottom, callback) {
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'

        function moveCharacter() {
            if (y < 250){ //this was supose to change the z-index of character and other images but only got it to work with the collumn and staff
                element.style.zIndex = 1;
            } else {
                element.style.zIndex = -1;
            }
            
            if (direction === 'west' && x > 80) {
                x -= 1
            }
            if (direction === 'north' && y < window.innerHeight - element.clientHeight) {
                y += 1
            }
            if (direction === 'east' && x < 600) {
                x += 1
            }
            if (direction === 'south' && y > 200) {
                y -= 1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        

        setInterval(moveCharacter, 1)

        document.addEventListener('keydown', function (e) {
            if (e.repeat) return;

            if (e.key === 'ArrowLeft') {
                direction = 'west'
            }
            if (e.key === 'ArrowUp') {
                direction = 'north'
            }
            if (e.key === 'ArrowRight') {
                direction = 'east'
            }
            if (e.key === 'ArrowDown') {
                direction = 'south'
            }
            callback(direction)
        })

        document.addEventListener('keyup', function (e) {
            direction = null
            callback(direction)
        })
    }

    

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}