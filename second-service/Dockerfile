# Base image
FROM node:22

# working directory 컨테이너 안에 설정
WORKDIR /app

# package.json & package-lock.jsond 복사
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the source code
COPY . .

# Expose 포트
EXPOSE 3000

# nestjs 
CMD ["yarn", "start:dev"];