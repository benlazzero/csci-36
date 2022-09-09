FROM node:10.14.1

# Set environment variables
ENV PORT 5000

# Copy project into conatiner
# This respects the .dockerignore and will not pull
# the legacy code under the 'archive' directory
COPY . .

# Install the project and all dependencies
RUN npm install

# Run tests
RUN npm test

# Expose port 5000 to the host operating system
EXPOSE ${PORT}

# Run the server.js script to run the program
ENTRYPOINT [ "node", "server.js"]
