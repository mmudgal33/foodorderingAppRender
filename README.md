run client and backend concurrently using npm run project.
backend has .env has MONGO_URL and JWT_SECRET present
client has constants.js for static render server, render frontend, url for production
client has constants.js for local system url for production

client has navbar with home, create, foods, cart, login buttons
login first then go to foods to see foodTypes ,basically category, click on category to call api for 
available products. click on any to give order. set quantity and click give order. checkout

MONGO_URL is basically mongoDB Atlas url

npm run start
nodemon index.js
npm run project