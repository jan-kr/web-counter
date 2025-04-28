FROM php:8.2-apache

RUN a2enmod rewrite

COPY ./counter/ /var/www/html/

EXPOSE 80