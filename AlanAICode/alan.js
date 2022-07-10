// The code in this file contains the code used and written on the alan ai library
// You are required to program on their SDK and sign in on their website at https://alan.app/
let roomID = '', isDelete = false, isOpen = false;

function clearSpaces(roomValue) {
  roomID = roomValue.replace(/\s/g, '');
}

function checkAndRespond(pInstance) {
    const appState = pInstance.visual;
    if(roomID.length !== 11 && roomID.length !== 9 && roomID.length > 0) {
        return pInstance.play('Sorry this is an invalid i d...');
    }
    
    if(isDelete) {
        isDelete = false;
        pInstance.play({
            command: 'deleteRoom',
            data: appState,
            roomID: pInstance.ROOM.value.toLowerCase()
        });
    } else if(isOpen) {
        isOpen = false;
        pInstance.play({
            command: 'openRoom',
            data: appState,
            roomID: pInstance.ROOM.value.toLowerCase()
        });
    } else {
        pInstance.play({
            command: 'joinRoom',
            data: appState,
            roomID: pInstance.ROOM.value.toLowerCase()
        });
    }
}

// Join a room
intent('Join room $(ROOM* .+)', p => {
    clearSpaces(p.ROOM.value);
    checkAndRespond(p);
});

// Leaving a room
intent('(Delete|Leave) room $(ROOM* .+)', p => {
    isDelete = true;
    checkAndRespond(p);
});

// Opening a room
intent('Open room $(ROOM* .+)', p => {
    isOpen = true;
    checkAndRespond(p);
});