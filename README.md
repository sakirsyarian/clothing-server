# Server for Clothing Store

This Express application serves as the backend for an e-commerce website. It handles user authentication, product management, order processing, and payment.

## Features

Features contained on this website include, for the authentication system using bcryptjs for hasing passwords, then for server maintenance using jwt. In addition, there is also a social login using Google. There is also a mini transaction that uses midtrans as a payment gateway.

Tech Stack:

-   Express.js
-   Seqeulize ORM

## Getting Started

### Prerequisites

-   Node.js (v16.14.2 or later)
-   npm (v8.1.0 or later)

### Clone

Cloning the repository:

```sh
git clone https://github.com/sakirsyarian/clothing-server.git
```

### Configuration

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=YOUR_PREFER_PORT
JWT=YOUR_SECRET_KEY
G_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
DEFAULT_PASSWORD = YOUR_PASSWORD_DUMMY
MIDTRANS_SERVER_KEY=YOUR_MIDTRANS_SERVER_KEY
```

### Installation

Install the dependencies:

```sh
npm install
```

Make sure to globally install sequelize:

```
npm install -g sequelize-cli
```

In addition, you must also install nodemon:

```
npm install -g nodemon
```

Create a database:

```
sequelize db:create
```

Create a migration table:

```
sequelize db:migrate
```

Entering dummy data:

```
sequelize db:seed:all
```

Running server on development mode:

```sh
npm run dev
```

## Endpoints

The following endpoints are available:

-   `/`: Get the home page.
-   `/users`: Get all users.
-   `/users/:id`: Get a user by ID.
-   `/users/register`: Create a new user.
-   `/users/login`: Login a user.
-   `/products`: Get all products.
-   `/products/:id`: Get a product by ID.
-   `/products/create`: Create a new product.
-   `/products/update/:id`: Update a product by ID.
-   `/products/delete/:id`: Delete a product by ID.
-   `/categories`: Get all categories.
-   `/categories/create`: Create a new category.
-   `/categories/delete/:id`: Delete a category by ID.
-   `/histories`: Get all histories.
-   `/midtrans-token`: Get a midtrans token.

## Information

To run this server, you must also run the clothing store client. You can clone the client here:

```sh
https://github.com/sakirsyarian/clothing-client
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
