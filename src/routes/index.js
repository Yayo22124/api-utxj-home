/*
! This is a barrel file:
    A barrel file is one file that EXPORTS ALL CONTENT of other files like components, controllers, models, etc..
    this is more pretty to see, because when import for another file is like: 
        *"import { sensorsDao, actuatorsDao } from "../dao/index.js"
        And not like this:
        ?"import sensorsDao  from "../dao/index.js"
        ?"import actuatorsDao from "../dao/index.js"

    ! Its important to consider that in this project is necesary use at the end the "index.js", ussually that is not necessary, because "index" is the default file to run. 

*/
export * from "./bedrooms.routes.js"
<<<<<<< HEAD
export * from "./livingroom.routes.js"
=======
<<<<<<< HEAD
export * from "./kitchen.routes.js"
=======
export * from "./garage.routes.js"
>>>>>>> b945921f5c86332a0ce4b123df5174a0826b6bea
>>>>>>> 42462e2e1bd47c72fc4e653323478ef537735b6c
