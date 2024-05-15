FROM node:20
WORKDIR app/
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build
CMD ["npm", "run", "preview", "--host", "0.0.0.0", "--port", "8000"]
