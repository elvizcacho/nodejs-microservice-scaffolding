CREATE USER app;
ALTER USER app WITH encrypted password 'apppassword';
CREATE DATABASE freelancer_service;
GRANT ALL PRIVILEGES ON DATABASE freelancer_service TO app;

