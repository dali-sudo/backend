# Petbook Server

This is the server component of Petbook, a social network app where users can share their activities with their pets via posts, interact with other users through a chat feature, and locate nearby pet shops and vets using a map. This server provides the REST APIs required for various functionalities such as managing pets, users, posts, and chat.

## Prerequisites

- Node.js v1.0.0 or later
- Dependencies:
    - bcryptjs v2.4.3
    - cors v2.8.5
    - deep-email-validator v0.1.21
    - dotenv v16.0.3
    - express v4.18.2
    - express-validator v6.14.0
    - jsonwebtoken v8.5.1
    - mongoose v6.7.1
    - morgan v1.10.0
    - multer v1.4.4
    - socket.io v4.5.4

## Installation

1. Download the project repository.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the required dependencies:
   ```
   npm install
   ```
4. Once the dependencies are installed, start the server using the following command:
   ```
   npm run start
   ```

## Usage

After starting the server, you can access the endpoints through the Swagger UI. Visit the following URL in your web browser:
```
http://localhost:9090/api-docs
```
The Swagger UI will provide a user-friendly interface to explore and interact with the available endpoints.

## Folder Structure

The server follows the MVC (Model-View-Controller) architecture for organizing files and directories. The structure is as follows:

```
- controllers/         # Contains the controllers for different routes and their implementation
- models/              # Defines the data models used by the application
- routes/              # Defines the route handlers for different endpoints
- config/              # Contains configuration files or modules
- utils/               # Utility functions or modules
- tests/               # Unit tests for the server
- server.js            # Entry point of the server application
- .env                 # Environment variables configuration file
```

## Contact Information

For any inquiries or issues, you can reach out to the following email addresses:
- Mohamed Ali Abid: mohamedali.abid@esprit.tn
- Mohamed Khalil Labidi: mohamedkhalil.labidi@esprit.tn

Please feel free to contribute to this project or report any bugs by contacting us or submitting issues through GitHub.

## License

This project is licensed under the ESPRIT license .

## Acknowledgments

- We would like to extend our sincere appreciation to our tutor, Mr. Khaled Guedria, and all the teaching staff, for their invaluable guidance and support during the development of this project. Their expertise and dedication have played a crucial role in shaping the success of this implementation.