# Tshirtshop2

## Dev setup

run `yarn dev` to start nodeJS server and react development server

## Backend setup

Install MySQL, create a database called "tshirtshop". Run the `tshirtshop.sql` file to create tables and seed DB with preset data.

Create a `.env` file in root to store your DB password and ensure you are running a mysql server when developing.

## Features

Feature requirements
Users can see all items when entering the website
Items are displayed properly based on the selected department and category
Users can search items through search box
Support paging if we have too many items
Users can see item details by selecting a specific item
Users can add items to their shopping carts
Users can register/login using website custom forms, or social login libraries
Users can checkout with 3rd party payment gateways: Paypal or Stripe. This requirement is mandatory, you must use the related API for the payment.
Users will get confirmations over emails about their orders
