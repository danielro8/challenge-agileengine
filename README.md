# challenge-agileengine

	
These are the techonologies used for this Challenge 
* **React**
The frontend is written in ReactJS using the module "create-react-app" as scaffold.
I use Hooks and Redux to get all the state info in an only place.
* **Express**
The backend is written in the NodeJS framework ExpressJS, using 
the express-generator module as scaffolding

**Concurrency for transactions**
It's managed with Mutex through the module async-mutex

**Running**
You can run this challenge via Docker by running `sudo docker-compose up -d --build`

**API**

These are the API Endpoints:

**Get balance history**

`curl --location --request GET 'http://localhost:3001/api/transactions/history'`

**Get transaction by ID**

`curl --location --request GET 'http://localhost:3001/api/transactions/44690160-1710-11eb-9320-1b02fc9983e5'`

**Create Transaction**

`curl --location --request POST 'http://localhost:3001/api/transactions' \--header 'Content-Type: application/json' \--data-raw '{"type": "credit" "amount": 100
}'`

**Get current Balance**

`curl --location --request GET 'http://localhost:3001/api/transactions'`
