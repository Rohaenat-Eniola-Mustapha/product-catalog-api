# Product Catalog API

This project is a RESTful API built with Node.js and Express.js for managing a product catalog. It allows users to perform CRUD operations on products, organize them into categories, search for products, and manage inventory.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Example Requests & Responses](#example-requests--responses)
- [Assumptions and Limitations](#assumptions-and-limitations)

## Features

- Create, Read, Update, and Delete products.
- Organize products into categories.
- Search for products by name and description.
- Support for product variants (e.g., size, color).
- Basic inventory tracking.
- Basic pricing and discount support.
- Basic reporting on low stock items.

## Prerequisites

- Node.js (version >= 14)
- npm or yarn

## Setup and Installation

1. Clone the repository:

    ```bash
    git clone <[repository_url](https://github.com/Rohaenat-Eniola-Mustapha/product-catalog-api.git)>
    cd product-catalog-api
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables (if needed, e.g., for database connection).
4. Start the server:

    ```bash
    npm start
    # or
    yarn start
    ```

    The API will be accessible at `http://localhost:3000`

## API Documentation

### Products

- **Create a Product (`POST /products`):**
  - **Request Body (JSON):**
        ```json
        {
            "name": "Product Name",
            "description": "Product Description",
            "price": 9.99,
            "categoryId": 1,
            "inventory": 10,
            "discount": 0
        }
        ```
    - `name` (string, required): The name of the product.
    - `description` (string, required): A description of the product.
    - `price` (number, required): The price of the product.
    - `categoryId` (number, required): The ID of the category the product belongs to.
    - `inventory` (number, optional, default: 0): The initial inventory level.
    - `discount` (number, optional, default: 0): The discount percentage (0-100).
  - **Response (JSON):** The newly created product object.
  - **Status Codes:** `201 Created`, `400 Bad Request`.
- **Get All Products (`GET /products`):**
  - **Response (JSON):** An array of product objects.
  - **Status Codes:** `200 OK`.
- **Get a Product by ID (`GET /products/:id`):**
  - **Response (JSON):** The product object.
  - **Status Codes:** `200 OK`, `404 Not Found`.
- **Update a Product (`PUT /products/:id`):**
  - **Request Body (JSON):** (Partial update is supported)
        ```json
        {
            "name": "Updated Product Name",
            "price": 12.99
        }
        ```
  - **Response (JSON):** The updated product object.
  - **Status Codes:** `200 OK`, `400 Bad Request`, `404 Not Found`.
- **Delete a Product (`DELETE /products/:id`):**
  - **Status Codes:** `204 No Content`, `404 Not Found`.
- **Search Products (`GET /products/search?query=searchTerm`):**
  - **Query Parameter:** `query` (string, required): The search term.
  - **Response (JSON):** An array of product objects matching the search term.
  - **Status Codes:** `200 OK`, `400 Bad Request`.
- **Get Product Inventory (`GET /products/:id/inventory`):**
  - **Response (JSON):** `{ "inventory": number }`.
  - **Status Codes:** `200 OK`, `404 Not Found`.
- **Update Product Inventory (`PUT /products/:id/inventory`):**
  - **Request Body (JSON):** `{ "inventory": number }`.
  - **Response (JSON):** `{ "message": "Inventory updated successfully", "inventory": number }`.
  - **Status Codes:** `200 OK`, `400 Bad Request`, `404 Not Found`.

### Categories

- **Create a Category (`POST /categories`):**
  - **Request Body (JSON):**
        ```json
        {
            "name": "Category Name",
            "description": "Category Description"
        }
        ```
  - **Response (JSON):** The newly created category object.
  - **Status Codes:** `201 Created`, `400 Bad Request`.
- **Get All Categories (`GET /categories`):**
  - **Response (JSON):** An array of category objects.
  - **Status Codes:** `200 OK`.
- **Get a Category by ID (`GET /categories/:id`):**
  - **Response (JSON):** The category object.
  - **Status Codes:** `200 OK`, `404 Not Found`.
- **Update a Category (`PUT /categories/:id`):**
  - **Request Body (JSON):** (Partial update is supported)
        ```json
        {
            "name": "Updated Category Name"
        }
        ```
  - **Response (JSON):** The updated category object.
  - **Status Codes:** `200 OK`, `400 Bad Request`, `404 Not Found`.
- **Delete a Category (`DELETE /categories/:id`):**
  - **Status Codes:** `204 No Content`, `404 Not Found`.

### Variants

- **Create a Product Variant (`POST /products/:productId/variants`):**
  - **Request Body (JSON):**
        ```json
        {
            "size": "L",
            "color": "Blue",
            "material": "Cotton"
        }
        ```
  - **Response (JSON):** The newly created variant object.
  - **Status Codes:** `201 Created`, `404 Not Found`.
- **Update a Product Variant (`PUT /products/:productId/variants/:variantId`):**
  - **Request Body (JSON):** (Partial update is supported)
        ```json
        {
            "color": "Red"
        }
        ```
  - **Response (JSON):** The updated variant object.
  - **Status Codes:** `200 OK`, `404 Not Found`.
- **Delete a Product Variant (`DELETE /products/:productId/variants/:variantId`):**
  - **Status Codes:** `204 No Content`, `404 Not Found`.

### Reports

- **Get Low Stock Items (`GET /reports/low-stock`):**
  - **Response (JSON):** An array of product objects with inventory less than or equal to 5.
  - **Status Codes:** `200 OK`.

## Example Requests & Responses

1. **Create a Product:**

- **Request:**
  - **Method:** `POST`
  - **URL:** `http://localhost:3000/products`
  - **Headers:** `Content-Type: application/json`
  - **Body (JSON):**

      ```json
      {
        "_id": "67dd2b7fc4bab6b492dcbf55",
        "name": "T-shirt",
        "description": "It comes in different shapes, colors and sizes. It also is for both male and female.",
        "price": 99.99,
        "categoryId": "67dbeb099e765786524b3ec4",
        "inventory": 100,
        "discount": 10,
      }
      ```

- **Response (Success - 201 Created):**

  ```json
      {
        "_id": "67dd2b7fc4bab6b492dcbf55",
        "name": "T-shirt",
        "description": "It comes in different shapes, colors and sizes. It also is for both male and female.",
        "price": 99.99,
        "categoryId": {
            "_id": "67dbeb099e765786524b3ec4",
            "name": "Clothing",
            "description": "Apparel and fashion items",
            "__v": 0
        },
        "inventory": 100,
        "discount": 10,
        "variants": [
            "67dd35ec9a2971a097d0799e",
            "67dd36229a2971a097d079a2",
            "67dd36409a2971a097d079a6"
        ],
        "__v": 3
      }
  ```

- **Response (Error - 400 Bad Request):**

  ```json
  {
    "errors": [
        {
            "type": "field",
            "msg": "Invalid categoryId",
            "path": "categoryId",
            "location": "body"
        }
    ]
  }
  ```

2. **Get All Products:**

- **Request:**.
  - **Method:** `GET`
  - **URL:** `http://localhost:3000/products`

- **Response (Success - 201 OK):**

  ```json
  [
      {
          "_id": "67dd2b7fc4bab6b492dcbf55",
          "name": "T-shirt",
          "description": "It comes in different shapes, colors and sizes. It also is for both male and female.",
          "price": 99.99,
          "categoryId": {
              "_id": "67dbeb099e765786524b3ec4",
              "name": "Clothing",
              "description": "Apparel and fashion items",
              "__v": 0
          },
          "inventory": 100,
          "discount": 10,
          "variants": [
              "67dd35ec9a2971a097d0799e",
              "67dd36229a2971a097d079a2",
              "67dd36409a2971a097d079a6"
          ],
          "__v": 3
      },
      {
          "_id": "67dd2bc4c4bab6b492dcbf58",
          "name": "Gowns",
          "description": "It is a long dress.It comes in different shapes, colors and sizes. It also only for females.",
          "price": 99.99,
          "categoryId": {
              "_id": "67dbeb099e765786524b3ec4",
              "name": "Clothing",
              "description": "Apparel and fashion items",
              "__v": 0
          },
          "inventory": 70,
          "discount": 5,
          "variants": [],
          "__v": 0
      },
      {
          "_id": "67dd2c04c4bab6b492dcbf5b",
          "name": "Pyjamas",
          "description": "It is an outfit only for the night. This is available for both genders. It comes in different colors.",
          "price": 29.99,
          "categoryId": {
              "_id": "67dbeb099e765786524b3ec4",
              "name": "Clothing",
              "description": "Apparel and fashion items",
              "__v": 0
          },
          "inventory": 20,
          "discount": 50,
          "variants": [],
          "__v": 0
      },
      {
          "_id": "67dd2c4dc4bab6b492dcbf5e",
          "name": "iPhone 16",
          "description": "Latest iPhone with the best features in the product",
          "price": 399.99,
          "categoryId": {
              "_id": "67dbe9f39e765786524b3ebf",
              "name": "Electronics",
              "description": "Electronic devices and accessories",
              "__v": 0
          },
          "inventory": 100,
          "discount": 2,
          "variants": [],
          "__v": 0
      },
      {
          "_id": "67dd2c7fc4bab6b492dcbf61",
          "name": "Samsung Tablet",
          "description": "Flat samsung tablet for both work and children's entertainmnet",
          "price": 599.99,
          "categoryId": {
              "_id": "67dbe9f39e765786524b3ebf",
              "name": "Electronics",
              "description": "Electronic devices and accessories",
              "__v": 0
          },
          "inventory": 50,
          "discount": 5,
          "variants": [],
          "__v": 0
      },
      {
          "_id": "67dd2cc8c4bab6b492dcbf64",
          "name": "Lenovo Desktop",
          "description": "This brings your gamming experience to life, your business ten times lesser and easy to carry.",
          "price": 999.99,
          "categoryId": {
              "_id": "67dbe9f39e765786524b3ebf",
              "name": "Electronics",
              "description": "Electronic devices and accessories",
              "__v": 0
          },
          "inventory": 80,
          "discount": 50,
          "variants": [],
          "__v": 0
      }
  ]
  ```

## Assumptions and Limitations

- The API uses MongoDB for products and categories. Data will not be lost when the server restarts.
- Basic error handling and input validation are implemented, but could be further enhanced for production use.
- Authentication and authorization are not implemented in this project.
- The variant management is basic. More complex scenarios (e.g., different pricing or inventory per variant) are not supported.
