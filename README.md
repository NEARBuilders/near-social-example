# NEAR Social Feed App

## Overview
This project is a Next.js application that demonstrates interaction with the NEAR Social contract. It allows users to view a social feed and create posts on the NEAR network.

## Features

- Connect to NEAR wallet
- View a feed of posts from NEAR Social contract
- Create new posts on NEAR Social contract
- Responsive and intuitive user interface

## Prerequisites

- Node.js (version 12 or higher)
- npm
- NEAR account


## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/NEARBuilders/near-social-example.git
   cd near-social-example
   ```

2. Install dependencies:
   ```
   npm install
   ```
   (We have been seeing issues with yarn while using limited keys so don't recommend it for the app.)

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `pages/index.js`: Main component with NEAR Social integration
- `components/PostForm.js`: Form component for creating new posts
- `components/PostFeed.js`: Component for displaying the social feed
- `components/SignIn.js`: Sign-in component for NEAR wallet connection
- `context/index.js`: NEAR context provider
- `config/index.js`: Configuration values

## Key Dependencies

- Next.js
- @builddao/near-social-js: For interacting with NEAR Social contract
- near-api-js: For NEAR blockchain interactions

## NEAR Social Integration
This project uses the `@builddao/near-social-js` library to interact with the NEAR Social contract. Key functions include:
  - `Social.index()`: Retrieves indexed data from the NEAR Social contract, used here to get the list of posts
  - `Social.get()`: Retrieves specific data from the NEAR Social contract, used here to get the content of each post
  - `Social.set()`: Updates data on the NEAR Social contract, used here to create new posts

These functions are used within the `fetchPosts()` and `createPost()` methods in the application to interact with the NEAR Social contract.

## Deployment

You can deploy this Next.js app using platforms like Vercel or by following the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Learn More

To learn more about the technologies used in this project:

- [NEAR Documentation](https://docs.near.org)
- [NEAR Social Documentation](https://docs.near.org/social)
- [NEAR Social JS](https://nearbuilders.github.io/near-social-js/)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
