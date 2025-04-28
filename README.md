# API Security Hardening

This project focuses on enhancing the security of an API by implementing essential security practices such as authentication, rate-limiting, and securing HTTP headers. The goal is to ensure the API is robust, safe from common attacks, and follows security best practices.

## Features

- **Authentication**: API Key-based authentication to ensure only authorized users can access the API.
- **Rate-Limiting**: Implemented using the `express-rate-limit` package to prevent abuse by limiting requests.
- **Security Headers**: Secured the API using Helmet to prevent common web vulnerabilities.
- **Logging and Monitoring**: Logs requests for monitoring suspicious activities.

## Setup

Follow the steps below to get the project up and running locally.

### Prerequisites

- Node.js (v14 or later)
- npm (or yarn)

### Installation

1. Clone the repository:

       git clone https://github.com/aleemhydr/api-security-hardening.git
2. Navigate to the project directory:

        cd api-security-hardening

3. Install dependencies:

        npm install

4. Create a .env file at the root of the project and set the following variables:

        API_KEY=your_api_key_here

5. Run the server:

        npm start

6. API Usage

-All requests must include an x-api-key header for authentication.

-The rate limit is set to 100 requests per minute per IP address.

-Example request:

    curl -X GET https://your-api-url.com/resource -H "x-api-key: your_api_key_here"

## Security Features
1. Authentication
The API uses an API Key for authentication. Every request must include a valid x-api-key header to authenticate the user.

2. Rate Limiting
To prevent abuse, a rate limiter is applied to restrict the number of requests per minute per IP address. The default limit is 100 requests per minute.

3. Security Headers
We use Helmet to set important HTTP headers for added security, including:

-Content-Security-Policy

-Strict-Transport-Security

-X-Content-Type-Options

-X-Frame-Options

These headers prevent various types of attacks such as clickjacking, cross-site scripting (XSS), and MIME-type sniffing.
