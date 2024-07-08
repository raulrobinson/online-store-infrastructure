# online-store-infrastructure

Infrastructure solution project for an online product store, with NestJS, React, Kafka...

![e-shop.png](img/e-shop.png)

- Create a KAKFA cluster:
    - `docker-compose -f docker-compose.yml up -d`        
  ![kafka_docker.png](img/kafka_docker.png)

- Create a KAFKAJS microservice:
    - `cd kafka-js`
    - `npm install`
    - `npm run start:dev`
  ```bash
    curl --location 'http://localhost:3000/kafka/send' 
      --header 'Content-Type: application/json' 
      --data '{ 
        "message": "Je m'\''appelle Raul Bolivar Navas et je suis programmeur de software... "
      }'
  ```
  ![sent_message.png](img/sent_message.png)
    
  ![result_sent_message.png](img/result_sent_message.png)

  ```bash
    curl --location 'http://localhost:3000/kafka/messages'
  ```  
  ![received_message.png](img/received_message.png)

---
@RASYSBOX | 2024
