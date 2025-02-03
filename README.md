# Getting started with Angular
This guide will help you to start a new Angular project and run it locally.

### Prerequisites
Before you start, you need to have the following software installed on your computer:

- Node.js and npm (Node Package Manager) - To install Node.js, visit https://nodejs.org

- Angular CLI - To install Angular CLI, run `npm install -g @angular/cli` in your terminal/command prompt.

### Creating a new Angular project

To create a new Angular project, follow these steps:

1. Open your terminal/command prompt and navigate to the directory where you want to create your project.

2. Run the following command to create a new Angular project:

`ng new my-app`


Replace "my-app" with the name of your project.

3. When prompted, choose your preferred styling format (CSS, SCSS, Sass, etc.) and whether you want to add Angular routing to your project.

4. After the installation process is complete, navigate to your project directory by running:

`cd my-app`


### Running the project

To run the project locally, follow these steps:

1. Open your terminal/command prompt and navigate to your project directory.

2. Run the following command to start the development server:

`ng serve`

3. Once the server is running, open your browser and navigate to *http://localhost:4200/*. You should see your Angular app running.

### Building the project
When you are ready to deploy your Angular app, you need to build it. To build the project, follow these steps:

1. Open your terminal/command prompt and navigate to your project directory.

2. Run the following command to build your app for production:

`ng build --prod`

After the build process is complete, the compiled files will be located in the "dist" folder.

### Conclusion
Congratulations! You have successfully started a new Angular project and run it locally. 
