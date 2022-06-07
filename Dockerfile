# # Stage 1: Compile and Build angular codebase

# # Use official node image as the base image
# FROM node:latest as build

# # Set the working directory
# WORKDIR /usr/local/app

# # Add the source code to app
# COPY ./ /usr/local/app/

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build


# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:alpine

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/local/app/dist/smart-house /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY /dist/smart-house /usr/share/nginx/html

# FROM trion/ng-cli as builder
# WORKDIR /app
# COPY package.json package.json
# COPY package-lock.json package-lock.json
# RUN npm ci  --debug 
# COPY . .
# RUN ng build --prod


# FROM nginx:1.17.5
# COPY default.conf.template /etc/nginx/conf.d/default.conf.template
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder  /app/dist/smart-house /usr/share/nginx/html 
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'


# FROM node:latest as node

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # Stage 2
# FROM nginx:1.13.12-alpine

# COPY --from=node /usr/src/app/dist /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'



# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.16.1 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/smart-house /usr/share/nginx/html

# Expose port 80
#EXPOSE ${PORT}

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'