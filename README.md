
# 🎓 Projet Microservices - Étudiants & Cours

Ce projet implémente une architecture microservices en Node.js pour gérer des **étudiants** et des **cours**, en utilisant plusieurs styles de communication : REST, gRPC, GraphQL et Kafka.

---

## 📌 Objectifs pédagogiques

- Démontrer l’usage de **gRPC** pour les appels inter-services.
- Exposer des **API REST** classiques pour les opérations CRUD.
- Centraliser les accès avec une **API Gateway** basée sur **GraphQL**.
- Utiliser **Kafka** pour propager des événements asynchrones.
- Structurer proprement un projet de microservices en JavaScript/Node.js.

---

## 🧱 Architecture des services

```
                    +----------------+
                    |  API Gateway   |   ← GraphQL
                    +--------+-------+
                             |
      +----------------------+----------------------+
      |                                             |
+-----v-----+                                +------v------+
| Student   |← REST, gRPC                    |  Course     |← REST, gRPC
| Service   |                                |  Service    |
+-----+-----+                                +------+------+
      |                                             |
      |                                             |
      |              Kafka Events                   |
      +------------> students-topic                 |
                    courses-topic <-----------------+
```

---

## ⚙️ Technologies

- Node.js + Express
- gRPC (`@grpc/grpc-js`, `protobufjs`)
- GraphQL (`@apollo/server`, `graphql`)
- Kafka (`kafkajs`)
- Postman (pour les tests)

---

## 🚀 Démarrage sans Docker

### 1. Démarrer Zookeeper et Kafka localement

Depuis le dossier Kafka :

```bash
.in\windows\zookeeper-server-start.bat .\config\zookeeper.properties
.in\windows\kafka-server-start.bat .\config\server.properties
```

Créer les topics :

```bash
.in\windows\kafka-topics.bat --create --topic students-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
.in\windows\kafka-topics.bat --create --topic courses-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

---

### 2. Lancer les microservices

Dans 3 terminaux différents :

```bash
# Student service
cd student-service
npm install
npm start

# Course service
cd course-service
npm install
npm start

# API Gateway
cd api-gateway
npm install
npm start
```

---

## 🧪 Tester les APIs

### REST :
- `GET http://localhost:3001/students`
- `POST http://localhost:3002/courses`

### GraphQL :  
URL : `http://localhost:4000/graphql`  
Exemple :
```graphql
query {
  getAllStudents {
    id
    name
    email
  }
}
```

---

## 📡 Kafka Events

- `createStudent` → envoie un événement dans `students-topic`
- `createCourse` → envoie un événement dans `courses-topic`

---

## 🧠 À compléter

- [ ] Ajouter MongoDB pour persister les données
- [ ] Ajouter un consumer pour Kafka
- [ ] Créer des tests unitaires
- [ ] Ajouter Docker/Docker Compose

---

## 👤 Auteur

**Farah Frouja** 4GL2
Projet réalisé dans le cadre d’un exercice de mise en pratique de microservices en Node.js

---

## 📄 Licence

Ce projet est libre de droit pour usage pédagogique ou personnel.
