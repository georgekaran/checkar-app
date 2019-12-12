### Checkar App Back-end

- Install dependencies

`npm i`

- Run app

`npm start`

- Run tests

`npm test`

#### Available endpoints

- [GET] `/` - Hello world from application
- [GET] `/auth/login` - Login   
    Request body: `{email, password}`
- [GET] `/auth/logout` - Logout

##### Helper Endpoint
- [GET] `/user/create` - Create a default admin user

##### CRUD endpoints

- [GET] `/` - Get all register of an object
- [GET] `/:id` - Get register by object id
- [POST] `/` - Create an object
- [PUT] `/:id` - Update register by object id
- [DELETE] `/:id` - Delete register by object id

All the next endpoints has the same basic structure for a basic CRUD operation:

- `/user`
- `/user/type`
- `/vehicle`
- `/vehicle/item`
- `/vehicle/type`
- `/item`
- `/item/type`
- `/inspection`
- `/inspection/item`
- `/company`
