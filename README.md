# Doodle chat

## \_The Last Markdown Editor, dbarabashdev

Doodle chat is an application that uses an api and allows you to send messages.

<img width="998" alt="Screenshot 2023-02-14 at 15 29 32" src="https://user-images.githubusercontent.com/10253529/218767413-e8dab78e-0555-45ee-ba83-c98f842f43f0.png">

- Type some text
- Click send button
- ✨Magic ✨

## Features

- Responsive user interface
- Send button disabled if input value absent
- User-friendly scroll bar
- Sent message without a mouse

## Tech

- [React] - A JavaScript library for building user interfaces
- [TypeScript] - JavaScript with syntax for types
- [create-react-app] - Set up a modern web app by running one command
- [styled-components] - Visual primitives for the component age.
- [node.js] - evented I/O for the backend

## Installation

Doodle chat application i development mode requires [Node.js](https://nodejs.org/) v19+ to run.

Install the dependencies and devDependencies and start the server.

```sh
yarn
yarn start
```

Running tests with react-testing-library

```sh
yarn test
```

## Deployment

This project is deployed using Vercel and is available at the following URL:

https://doodle-chat.vercel.app/

## Potential features

- Reaction emojis: Allow users to react to messages with different emojis
- Message editing: Allow users to edit messages they've already sent in the chat
- Message deleting: Allow users to delete messages they've already sent in the chat
- Correct displaying links in message boxes
- Virtualized message list


## Technical decisions

- One technical decision made in this app is the use of the useQuery hook from the react-query library to fetch data from an API. This library provides a way to manage and cache API data in a declarative and efficient way, reducing boilerplate code and providing a simple and consistent API.

- Another technical decision made is the use of useRef hook to get the last message in the chat container and then scroll to the bottom of the container when a new message is added. This approach is efficient because it doesn't require a re-render of the component tree and can significantly improve performance in larger applications.

- Finally, the use of lazy loading with `import()` and `React.lazy()` is another technical decision made to improve performance by asynchronously loading components only when they are needed, reducing the initial bundle size of the application. This can provide a faster user experience, especially for users with slower internet connections or devices.

## Potential questions

**Why not Redux?**
In the provided code, React hooks are used to manage the state and data flow of the application. Specifically, useRef, useEffect, and useQuery are used to manage the application's state, fetch data from an API, and render components based on that data. Additionally, the useState hook is used in the Form component to manage the state of the form input.

While Redux is another popular state management solution for React applications, it is not required or necessary to use it in all cases. In smaller applications or applications with simpler data requirements, it may be easier and more efficient to use React's built-in state management functionality and hooks instead of bringing in a separate library like Redux.

Furthermore, React Query, the library used in this code to fetch data from the API, has its own caching and state management functionality that can reduce the need for additional state management solutions like Redux.

**Why styled-components?**
Styled-components is used in this app for styling because it provides a way to write CSS-in-JS, which allows for creating styles that are encapsulated and scoped to individual components. This can make it easier to reason about how styles are applied to components and avoid style conflicts that can occur with traditional CSS. Additionally, styled-components has many other benefits, including support for dynamic styles, theming, and server-side rendering, which can make it a powerful and flexible tool for building complex user interfaces.

**Folder structure**
This project seems to follow a simple folder structure based on feature or function. The root directory contains the main files, such as `index.html`, `index.tsx`, `constants.ts`, and `styles.ts`, while the components directory contains all the React components used in the app.

The components directory contains two subdirectories: `Chat` and `Form`. Each subdirectory groups together all the components related to a particular feature. Additionally, the styles.ts file contains all the styled-components used in the app, and the constants.ts file holds all the application-wide constants.

This kind of organization is helpful because it allows developers to easily find the code they need when working on a specific feature or function, making the codebase more modular and maintainable.
