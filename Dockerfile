FROM php:8.4-apache

RUN a2enmod rewrite

COPY ./counter/ /var/www/html/

EXPOSE 80