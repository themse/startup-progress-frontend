# Startup Progress Frontend

Simple website where you can mark and analyze the progress of your startup.

## Getting Started

Run the project using the following steps:

- Install all dependencies

```sh
npm i
```

- Start the server

```sh
npm run start
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `app` - containing business logic for the entire project
  - `common` - containing common features, entities and repositories
  - `components` - containing components in the context of business logic
- `components` - containing independent and reusable components
- `context` - containing usage of state management Context API
- `hooks` - containing usage of general and specific reusable features
- `services` - containing abstractions for external services and utils
- `styles` - containing global styles and imports of external css libraries
- `types` - containing common data types for the entire project

## Preview

<div style="display:flex; justify-content: center;">
    <img src="./preview.jpg" style="max-width: 700px;" />
</div>

## Tech Stack

- [CRA](https://create-react-app.dev/) - is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.
- [Typescript](https://www.typescriptlang.org/) - is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.

## Developed and tested on

- NodeJS v16.17.0
- NPM v9.2.0
- macOS Ventura v.13.1

## What's next?

- Cover code with tests
- Implement form to create, update and delete tasks dynamically
- Move `components` to storybook UI-kit
- to be continued
  