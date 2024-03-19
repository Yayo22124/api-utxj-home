import {rooms} from "../common/rooms.structure.js"

function getCollectionByLocation(location) {
    for (const room_collection in rooms) {
        room_collection.forEach(roomName => {
            if (location === roomName) {
                return room_collection;
            }
        });
    }
    return null;
}