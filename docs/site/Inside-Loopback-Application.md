---
lang: en
title: 'Inside a Loopback Application'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Inside-Loopback-Application.html
---

## The Shopping Cart Example

The example application [loopback4-example-shopping](https://github.com/strongloop/loopback4-example-shopping)
is a nice place for developers to start looking on how to use Loopback 4.

## Open API specification 

The shopping cart use case requires the following basic API endpoints

list of users
/users


```
  /users:
    post:
      responses:
        '200':
          description: 'User'
          content:
            application/json:
              schema:
                "x-ts-type": "User"
    get:
      ......
```

list of items in the shopping cart
/shoppingCarts/{userId}

```
  /shoppingCarts/{userId}/items:
    post:
      responses:
        '200':
          description: 'User shopping cart item is created'
          content:
            application/json:
              schema:
                "x-ts-type": "ShoppingCart"
    get:
      ......
```


list of orders
/users/{userId}/orders

```
  /users/{userId}/orders:
    post:
      responses:
        '200':
          description: 'User.Order model instance'
          content:
            application/json:
              schema:
                "x-ts-type": "Order"
    get:
      .......
```

## Starting with the API endpoints


### configuring the controllers


### creating the models



## Starting from the back end

### Configuring a datasource

### The ORM layer

