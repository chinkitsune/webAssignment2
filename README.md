# AlgonquinAssignment2

## How to install
I assume nodejs has already been installed in your system.

### Installing required packages.
First, install the required package by using package.json\
`npm install package.json`

### Installing mongodb
I assume that mongodb has already been installed in your system.\
In my working environment (Linux), the following steps were done.\
Just use the following as a reference.\
If you are using windows, you need to follow the corresponding steps not like below.

`apt update && apt install -y curl gnupg`\
`curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc |    gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg`\
`echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list`\
`apt install -y mongodb-org`\
`apt update`\
`apt install -y mongodb-org`\
`rm /etc/apt/sources.list.d/mongodb-org-8.0.list`\
`echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list`\
`apt update`\
`apt install -y mongodb-org`\
`mkdir -p /data/db`\
`chown -R mongodb:mongodb /data/db`\
`mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db`\


## Running server.
You can run the server with the following command\
`node server.js`\
If you want to develop this website, it's better to use nodemon\
`nodemon server.js`

## Access this website
Open a browser, go the the following URL. \
http://localhost:3000/
