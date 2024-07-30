# NEAR Social Example

## Overview

This project is a simple Next.js application that demonstrates interaction with the NEAR Social contract. It allows users to view and update their profile name on the NEAR testnet.

## Features

- Connect to NEAR wallet
- Retrieve user's profile name from NEAR Social contract
- Update user's profile name on NEAR Social contract
- Simple and intuitive user interface

## Prerequisites

- Node.js (version 12 or higher)
- npm
- NEAR testnet account

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
- `components/Form.js`: Form component for updating profile name
- `components/SignIn.js`: Sign-in component for NEAR wallet connection
- `context/index.js`: NEAR context provider
- `styles/app.module.css`: Styles for the application

## Key Dependencies

- Next.js
- @builddao/near-social-js: For interacting with NEAR Social contract
- near-api-js: For NEAR blockchain interactions

## NEAR Social Integration

This project uses the `@builddao/near-social-js` library to interact with the NEAR Social contract. Key functions include:

  - `Social.get()`: Retrieves data from the NEAR Social contract, used here to get the user's profile name
  - `Social.set()`: Updates data on the NEAR Social contract, used here to set the user's profile name

  These functions are used within the getProfileName() and setProfile() methods in the application to interact with the NEAR Social contract.

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
