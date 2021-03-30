<div align="center">
    <a href="https://edsont8.github.io/TCC_Frontend">
        <img src="https://edsont8.github.io/TCC_Frontend/assets/logoma3.png" alt="Dragon Store" width="150px" />
    </a>
</div>

# DragonStore Front-end APP

## Introduction 
This is a Front-end App in Angular 9 for a distributed Application (microservices), with the Backend using .NET Core 3.1 - There are 7 API's communicating through MessageBus [(RabbitMQ)](https://www.rabbitmq.com).

This is a project to conclude the Technical Course in Systems Development (TCC) at the Brazilian [School SENAI "Ary Torres"](https://www.sp.senai.br).
The project consists of an e-commerce website with front-end developed in [Angular 9](https://angular.io), back-end in [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet/3.1), [Entity Framework Core](https://docs.microsoft.com/pt-br/ef/core/) and [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-2019). Initially, it was managed in [Microsoft Azure DevOps](https://azure.microsoft.com/pt-br/services/devops/) and transferred to Github.

The source code of the .NET Core Back-end you can find in this repository: https://github.com/edsont8/TCC_Backend and is hosted at this address: https://edsont8.github.io/TCC_Backtend 

## List of API's hosted on Heroku

1.	API - [Authentication](https://heroku-auth-chat.herokuapp.com/swagger/index.html)
2.	API - [Clients](https://heroku-clients.herokuapp.com/swagger/index.html)
3.	API - [Catalog of products](https://heroku-products.herokuapp.com/swagger/index.html)
4.	API - Gateway (BFF)
5.	API - Payment
6.	API - Cart
7.	API - Orders

To start using the DragonStore UI it is a prerequisite to have ```Node.js``` installed (version 10.x or above) and your favorite package manager in the most current version. If you have not yet installed the ```@ angular / cli package```, install it via ```npm``` or ```yarn```.

## Installing with npm:

```bash
npm i -g @angular/cli
```


If you prefer to install with yarn:

```bash
yarn global add @angular/cli
```

## Step 1 - Installing the dependencies


Access your project's root folder and execute the command below:

Installing with npm:

```bash
npm install
```

If you prefer to install with yarn:

```bash
yarn install
```


## Step 2 - Run the project

Now just run another command to upload the application and see your project running in the browser ;).

```bash
ng serve
```
Open your browser and access the url http: // localhost: 4200. Ready!



## Contributors ✨

<table>    
  <tr>
    <td align="center"><a href="https://github.com/edsont8"><img src="https://avatars1.githubusercontent.com/u/55901214?v=4?s=100" width="100px;"  alt=""/><br /><sub><b>Edson Costa</b></sub></a><br /><a href="https://github.com/edsont8/TCC_Frontend/commits?author=edsont8" title="Documentation">📖 Commits</a></td>
    <td align="center"><a href="https://github.com/miguellz67"><img src="https://avatars1.githubusercontent.com/u/55901848?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Luiz Miguel</b></sub></a><br /><a href="https://github.com/edsont8/TCC_Frontend/commits?author=miguellz67" title="Documentation">📖 Commits</a></td>
    <td align="center"><a href="https://github.com/Pereiracode"><img src="https://avatars2.githubusercontent.com/u/55901172?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mateus Pereira</b></sub></a><br /><a href="https://github.com/edsont8/TCC_Frontend/commits?author=Pereiracode" title="Documentation">📖 Commits</a></td>
  </tr>
</table>

## Used in this project:

### Front-end:
![Skill](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Skill](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Skill](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Skill](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Skill](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![Skill](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Skill](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)

### Back-end:
![Skill](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![Skill](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![Skill](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Skill](https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![Skill](https://img.shields.io/badge/Microsoft_SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)
![Skill](https://img.shields.io/badge/Visual_Studio_2019-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white)
![Skill](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Skill](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## Repo status:
[![All Contributors](https://img.shields.io/badge/Contribuitors-3-orange.svg?style=flat-square)](#contributors-)
[![Star on GitHub](https://img.shields.io/github/stars/edsont8/TCC_Frontend.svg?style=social)](https://github.com/edsont8/TCC_Frontend/stargazers)
