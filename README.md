# Code Challenge Repository

## Overview

This repository contains boilerplate code you will use to build the create account form.

## Tech used

You have been given a starter repository using TypeScript / React / Vite / Tailwind / Ruby on Rails. You will only need
a basic understanding of these technologies to successfully complete this coding challenge. Refer to the documentation
links below for more information.

### Development

- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [React docs](https://reactjs.org/docs/hello-world.html)
- [Tailwind docs](https://tailwindcss.com/docs/installation)
- [Vite - Getting Started](https://vitejs.dev/guide/)
- [Ruby on Rails - Getting Started](https://guides.rubyonrails.org/getting_started.html)

### Testing

- [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- [Testing Rails Applications](https://guides.rubyonrails.org/testing.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro)

## Commands

`make -j dev` installs packages and starts the development server. The site exists at `localhost:3000`.

`make -j test` runs the tests.

## Versions

```
▶ node -v
v18.17.1

▶ npm -v
10.1.0
```

If NodeJS is not installed on your computer, we recommend using [nvm](https://github.com/nvm-sh/nvm) for version management.

```
▶ ruby -v
ruby 3.1.4p223 (2023-03-30 revision 957bb7cb81) [arm64-darwin22]
```

If Ruby is not installed on your computer, we recommend using [rbenv](https://github.com/rbenv/rbenv) for version management.

**Note:** `[arm64-darwin22]` may be different as it is dependent on your operating system.

###

Run `rails credentials:edit`

# Generate JWT Secret key

Run `rails secret` to generate your secret

Run `rails credentials:edit`

and add this line to your credentials:

```
jwt_secret_key: b09f2eaf980958fcab28f755e6d9f6cebdd47e2390d96fd0cb7736f913e049d1570f40a1d01c8426212f606a6768d6f1390150ba9cbef1f7c8ba20b223664903
```

# Approach

## UX

The goal of this screen is to provide not only functionality, but a clear overview of what the user is supposed to do on this page

In this case, fill out a create account form.

### User flow

Upon page load, the `Create Account` button is disabled, and stays disabled until the form is properly filled out with no validation errors.

The `username` field is also auto-focused, and the line underneath the input field is highlighted blue with a glowing effect to indicate that the user is supposed to start filling out that field. As soon as the user begins typing, the username validation is displayed, showing the user what the restrictions are around username length.

Upon moving to the `password` field, as soon as the user starts typing, the password strength meter is displayed, as well as the validation rules to tell the user what they need to change to get the password to be valid.

As soon as each of these fields are valid, the `Create Account` button color changes to a solid blue to indicate that it is no longer disabled, and the user may click it to submit the form.

### Responsiveness

The UX responds to all sizes of devices and changes accordingly with support for all major sizes (Desktop, tablet, and mobile).

# Backend

I used a conventional token-ized approach for creating a login token that a user would receive after creating an account, which is stored in `localStorage`. This simplifies logging out on the backend, as the frontend just desroys the token from `localStorage`. In the future, this would also be used in Login form. The functionality is effectively already built, so there would just need to be a front end piece built.

### Future Implementations

In the future, there should be some exploration into the UX of card sizes and button placements, as this changes for each page. This could be alleviated in the short-term by aligning the button to the bottom of each card.

Building a login card would also be one of the next logical steps in development.

## API

## API Documentation

### Documentation for `/api/create_account` Endpoint

#### Endpoint

`POST /api/create_account`

#### Description

This endpoint is used to create a new user account. Upon successful account creation, it returns a JSON Web Token (JWT) and the user information.

#### Request

##### Headers

- `Content-Type: application/json`

##### Body Parameters

- `username` (string, required): The username for the new account.
- `password` (string, required): The password for the new account.

##### Example Request Body

```
{
  "user": {
    "username": "newuser",
    "password": "password123"
  }
}
```

#### Endpoint

`POST /api/login`

#### Description

This endpoint is used to authenticate a user and provide a JSON Web Token (JWT) upon successful authentication.

#### Request

##### Headers

`Content-Type: application/json`

#### Body Parameters

- `username` (string, required): The username for authentication.
- `password` (string, required): The password for authentication.

##### Example Request Body

```
{
  "username": "existinguser",
  "password": "password123"
}
```

### Documentation for `/api/logged_in` Endpoint

#### Endpoint

`GET /api/logged_in`

#### Description

This endpoint checks if a user is logged in based on the provided JSON Web Token (JWT).

#### Request

##### Headers

- `Authorization: Bearer <jwt_token>`

##### Example Request

```
GET /api/logged_in
Authorization: Bearer jwt_token_string
```

### Documentation for `/api/verify_token` Endpoint

#### Endpoint

`POST /api/verify_token`

#### Description

This endpoint verifies the validity of a provided JSON Web Token (JWT).

#### Request

##### Headers

- `Authorization: Bearer <jwt_token>`

##### Example Request

```http
POST /api/verify_token
Authorization: Bearer jwt_token_string
```
