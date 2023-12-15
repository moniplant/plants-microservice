```mermaid
graph TD
  subgraph Plant_Service
    A(Plant Service)
  end

  subgraph MySQL
    B(MySQL)
  end

  subgraph Kafka_Consumer
    C(Kafka Consumer)
  end

  A -->|MySQL| B
  B -->|Kafka Events| C
```