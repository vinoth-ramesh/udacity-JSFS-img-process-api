# Image processing API

This project is part of the Udacity Javascript Full-Stack Nanodegree

It is an express server which is able to take images located in a folder and create a resized thumb version of it and save it on the disk. Once created a thumb version is reused when a new request us made for the same file with same parameters via the api.

## API Reference

### List available images which can be accessed through the endpoint

```http
  GET /api/listImages
```

#### Create thumb version of image

```http
  GET /api/images/?filename={filename}&height={height}&width={width}
```

| Parameter  | Type     | Description                                               |
| :--------- | :------- | :-------------------------------------------------------- |
| `filename` | `string` | **Required**. filename of the desired image to be resized |
| `height`   | `number` | **Required**. desired height                              |
| `width`    | `number` | **Required**. desired width                               |

### Functionality

-   This will create a thumb version of the image (if it does not exist already)
-   If you change the height or width parameter it will create the image with new size
-   Futhermore it will be delivered as the response to the client

## Scripts

Run prettier

```bash
  npm run prettier
```

Build the project

```bash
  npm run build
```

Start the dev server

```bash
  npm run dev
```

Run tests

```bash
  npm run test
```

Run the application

```bash
  npm run start
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/vinoth-ramesh/udacity-JSFS-img-process-api.git
```

Go to the project directory

```bash
  cd img-process-api
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Author

Vinoth Ramesh ([@vinoth-ramesh](https://gitlab.com/vinoth-ramesh))
