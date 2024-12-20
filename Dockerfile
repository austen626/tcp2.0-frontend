FROM node:11-slim

RUN apt-get update \
    && apt-get -y install apache2 \
    && mkdir -p /usr/src/app

#Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY . .

#Installation of NPM
RUN npm install react-scripts@3.4.1 \
    && npm install \
    && yarn build
    
RUN cp -r /usr/src/app/build/* /var/www/html
COPY .htaccess /var/www/html

RUN cat apache.conf > /etc/apache2/sites-available/000-default.conf \
    && a2enmod rewrite \
    && service apache2 restart

CMD ["apachectl", "-D", "FOREGROUND"]
