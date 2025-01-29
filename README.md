# 🚀 XeonWallet - A Simple, Secure Digital Wallet

XeonWallet is a cutting-edge digital wallet that prioritizes simplicity and security. With a streamlined user experience and top-tier performance, XeonWallet is built to scale. This project leverages modern DevOps practices, including Docker, CI/CD pipelines, and AWS deployment, to ensure seamless development, testing, and production environments.


## 🌟 Key Features

- **Simplicity**: An easy-to-use wallet interface for efficient management of your digital assets.
- **Security**: Built with the latest security protocols to ensure your data is safe and protected.
- **Scalability**: Fully Dockerized application that can easily scale with increasing demands.
- **Automated CI/CD Pipeline**: Continuous integration and deployment that ensures automated builds, testing, and seamless deployment.
- **Monorepo Architecture**: Efficiently manages multiple apps and packages in one repository.

## 🛠️ Technologies & Tools Used

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **Containerization**: Docker
- **CI/CD Pipeline**: GitHub Actions (`build.yml`, `deploy.yml`)
- **Database**: Prisma (ORM)
- **Deployment**: AWS EC2
- **Reverse Proxy**: To be configured for custom domain routing (pending)

## 🏗️ CI/CD Pipeline & Automation

Our CI/CD pipelines ensure automated testing, building, and deployment of the app with every change, saving time and reducing human error.

1. **CI Pipeline (`build.yml`)**

   - Triggered on **Pull Requests** to the `main` branch.
   - Installs dependencies, generates the Prisma client, and builds the app.

2. **CD Pipeline (`deploy.yml`)**
   - Triggered on **Pushes** to the `main` branch.
   - Builds a Docker image and pushes it to Docker Hub.
   - Automatically deploys the latest image to an AWS EC2 instance.

## 🐳 Dockerized Monorepo

This project is **fully containerized** using Docker to ensure seamless development and deployment. Here’s the workflow:

- **Dockerfile**: Creates a lightweight image for the app, installs dependencies, generates Prisma client, builds the application, and starts the user-facing app.
- **Docker Hub**: The Docker image is pushed to Docker Hub under the `prayag09/xeon-wallet` repository, ensuring portability across environments.

## 🌐 AWS Deployment

XeonWallet is deployed to **AWS EC2** for high availability and scalability. Here’s what’s automated:

- **Deployment via SSH**: GitHub Actions handle the entire deployment process using SSH.
- **Dynamic Updates**: Every push to the `main` branch triggers an automatic pull of the latest Docker image from Docker Hub and redeploys the app on EC2.

### **How it Works:**

1. **Build**: The Docker image is built and pushed to Docker Hub.
2. **Deploy**: The latest Docker image is pulled onto the EC2 instance, and the app is redeployed, ensuring that the most recent version of the app is always live.

## 🚧 Pending Tasks

- **Reverse Proxy Setup**: The last step before full production is configuring a reverse proxy (e.g., Nginx) to route traffic and assign a custom domain.

## 🚀 Getting Started

### Prerequisites

1. **Docker** installed on your local machine.
2. **AWS EC2 instance** with SSH access configured.
3. **GitHub Secrets** for Docker Hub credentials and EC2 SSH access.

### Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/prayag09/xeon-wallet.git
   cd xeon-wallet

   2.	Build and run the Docker container locally:
   ```

docker build -t xeon-wallet .
docker run -p 3000:3000 xeon-wallet

    3.	Visit the app at http://localhost:3000 and start using it!

## 🤝 Contributions

We welcome contributions! Feel free to fork the repository and open pull requests for bug fixes, improvements, or new features. Please check out the issues tab to see if there are any ongoing discussions.

## 💬 Contact

For questions or suggestions, you can reach me at:

• Email: prayagtushat2016@gmail.com

• LinkedIn: [prayagtushar](https://www.linkedin.com/in/prayagtushar/)
