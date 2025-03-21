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
    git clone <repository_url>
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



## Assumptions and Limitations

- The API uses in-memory storage (arrays) for products and categories. Data will be lost when the server restarts. A database would be required for persistent storage.
- Basic error handling and input validation are implemented, but could be further enhanced for production use.
- Authentication and authorization are not implemented in this version.
- The variant management is basic. More complex scenarios (e.g., different pricing or inventory per variant) are not supported.
