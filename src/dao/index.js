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
export * from "./bedrooms.dao.js"
<<<<<<< HEAD
export * from "./garage.dao.js"

=======
export * from "./bathrooms.dao.js"
>>>>>>> eb1fd773c943107a078100c4bdbb87fb2eced35b
// export * from "./actuators.dao.js"