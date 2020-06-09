## Refactor Monolith to Microservices

This project refactors a monolithic web application (an Instagram clone, Udagram) into a microservices architecture. The repository originally consisted of frontend and backend servers. These have been deconstructed into the following microservices:

1. Frontend
2. Backend feed - /api/v0/feed endpoint
3. Backend users - /api/v0/user endpoint
4. Reverse proxy - for clients to communicate with a single endpoint, using nginx

The repo is set up for automatic builds on Travis CI on a merge to master. Each microservice is deployed in a Docker container. The entire application is orchestrated with Kubernetes, using AWS EKS.

## Demo

The front end:

![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/udagram%20app.png)

### Deployment Pipeline
* Containers pushed to DockerHub
![](https://github.com/clavance/udagram-microservices/blob/master/screenshots/dockerhub%20repo.png)

* Travis CI integration
![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/travisCI%20build.png)

### Kubernetes
* Deployment of Kubernetes pods
A screenshot of `kubectl` commands show the Frontend and API projects deployed in Kubernetes.
The output of `kubectl get pods` indicates that the pods are running successfully with the STATUS value `Running`.

```bash
kubectl get pods
```
![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/kubectl%20get%20pods%20(and%20kubectl%20get%20secrets).png)

* Kubernetes services set up, with `kubectl describe services` not exposing any sensitive strings such as database passwords.
`kubectl get secrets` above shows that sensitive strings are configured using the `secrets.yaml` file.

```bash
kubectl describe services
```
![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/kubectl%20describe%20services.png)

Kubernetes services showing a reverse proxy.
![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/kubectl%20describe%20services%20(shows%20reverseproxy).png)

To demonstrate the use of replicas, 2 udagram-frontend endpoints are shown with the command `kubectl describe services udagram-frontend`, reflecting the fact that 2 replicas have been deployed.

![](https://github.com/clavance/udagram-microservices/blob/master/screenshots/kubectl%20describe%20services%20(shows%202%20frontend%20replicas:endpoints).png)


* Demonstrating use of horizontal scaling set against CPU usage
```bash
kubectl describe hpa
```
![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/kubectl%20get%20hpa.png)

* Demonstration of logging with a backend application

Making a call to an API in the backend feed pod:
![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/kubectl%20exec%20-it%20API%20call%20in%20backend%20pod.png)

Showing database response and logged activity on an API call:
```bash
kubectl logs {pod_name}
```
![](https://raw.githubusercontent.com/clavance/udagram-microservices/master/screenshots/kubectl%20logs%20shows%20logged%20activity%20on%20API%20call.png)



## Instructions for Backend API
* To download all the package dependencies, run the command from the directory `udagram-api/`:
    ```bash
    npm i
    ```
* To run the application locally, run:
    ```bash
    npm run dev
    ```
* You can visit `http://localhost:8080/api/v0/feed` in your web browser to verify that the application is running. You should see a JSON payload. Feel free to play around with Postman to test the API's.

## Instructions for Frontend App
* To download all the package dependencies, run the command from the directory `udagram-frontend/`:
    ```bash
    npm i
    ```
* Install Ionic Framework's Command Line tools for us to build and run the application:
    ```bash
    npm install -g ionic
    ```
* Prepare your application by compiling them into static files.
    ```bash
    ionic build
    ```
* Run the application locally using files created from the `ionic build` command.
    ```bash
    ionic serve
    ```
* You can visit `http://localhost:4200` in your web browser to verify that the application is running. You should see a web interface.
