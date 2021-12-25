# Using node:16.13.1 as the base image
FROM node:16.13.1

# Copying the package.json file
COPY ./package*.json /client/

# Changing working directory
WORKDIR /client/

# Installing packages
RUN npm install

# handling permissioning issue specific to react, don't worry about it
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Copying the source code
COPY . .

# Setting the command
CMD ["npm", "start"]
