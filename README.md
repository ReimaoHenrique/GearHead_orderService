**Claro! Aqui está um `README.md` (ou `.md`) completo com todos os `curl` do seu CRUD de veículos — pronto pra colar no seu projeto.**

---

````md
# CRUD de Veículos - Exemplos com `curl`

API rodando em: `http://localhost:3000`

---

## 1. Criar um veículo (POST)

```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "XYZ123",
    "nome_carro": "Fiat Uno",
    "modelo": "Mille",
    "ano": 2020,
    "quilometragem": 50000,
  }'
```
````

> **Obrigatório:** `placa` e `nome_carro`  
> `placa` será salva em **MAIÚSCULO**

---

## 2. Listar todos os veículos (GET)

```bash
curl http://localhost:3000/api/vehicles
```

---

## 3. Buscar veículo por **placa** (GET)

```bash
curl http://localhost:3000/api/vehicles/placa/XYZ123
```

> Case-insensitive: `xyz123`, `XyZ123`, `XYZ123` → todos funcionam

---

## 4. Buscar veículo por **ID (CUID)** (GET)

```bash
curl http://localhost:3000/api/vehicles/cmhh1bvbq000740h1wjzfvjs2
```

---

## 5. Atualizar veículo por **placa** (PUT)

```bash
curl -X PUT http://localhost:3000/api/vehicles/placa/XYZ123 \
  -H "Content-Type: application/json" \
  -d '{
    "nome_carro": "Honda Civic",
    "modelo": "Civic EX",
    "ano": 2023,
    "quilometragem": 15000,
    "dono_id": "dono-007"
  }'
```

> Atualiza **apenas os campos enviados**  
> `placa` **não pode ser alterada**

---

## 6. Deletar veículo por **placa** (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/vehicles/XYZ123
```

> Remove o veículo com a placa `XYZ123`

---

## 7. Verificar se foi deletado (GET)

```bash
curl http://localhost:3000/api/vehicles/placa/XYZ123
```

> Deve retornar: `404` → "Veículo não encontrado"

---

## Rotas Resumidas

| Método   | URL                          | Descrição           |
| -------- | ---------------------------- | ------------------- |
| `POST`   | `/api/vehicles`              | Criar               |
| `GET`    | `/api/vehicles`              | Listar todos        |
| `GET`    | `/api/vehicles/placa/:placa` | Buscar por placa    |
| `GET`    | `/api/vehicles/:id`          | Buscar por ID       |
| `PUT`    | `/api/vehicles/placa/:placa` | Atualizar por placa |
| `DELETE` | `/api/vehicles/:placa`       | Deletar por placa   |

---

## Dicas para `curl`

- Use **aspas simples** `'` no JSON para evitar problemas com `$`
- Sempre use `-H "Content-Type: application/json"` em `POST`/`PUT`
- `placa` é **case-insensitive** (não importa maiúscula/minúscula)

---

## Exemplo completo (criar → atualizar → deletar)

```bash
# 1. Criar
curl -X POST http://localhost:3000/api/vehicles -H "Content-Type: application/json" -d '{"placa":"ABC999","nome_carro":"Gol"}'

# 2. Atualizar
curl -X PUT http://localhost:3000/api/vehicles/placa/ABC999 -H "Content-Type: application/json" -d '{"quilometragem":30000}'

# 3. Deletar
curl -X DELETE http://localhost:3000/api/vehicles/ABC999
```

---

**Pronto! Seu CRUD está 100% funcional com `curl`.**

Salve esse arquivo como `API_CURL_EXEMPLOS.md` no seu projeto!

```

---

**Salve como:** `API_CURL_EXEMPLOS.md`
**Onde:** na raiz do projeto ou em `/docs`

Se quiser, posso gerar um **PDF** ou **HTML** também.

Quer? Só pedir!
```
