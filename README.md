## Levantar MySQL con Docker:

```bash
docker compose up -d
```

## Iniciar la aplicación:

```bash
npm run dev
```

## Link visita documentacion API

http://localhost:8000/api-docs/

# Pruebas de la API

## crear una URL corta:
```JSON
POST  http://localhost:8000/api/urls/shorten

{
"originalUrl": "https://www.ejemplo.com"
}
```
## Response:

```JSON
{
    "id": 1,
    "originalUrl": "https://www.ejemplo.com",
    "shortCode": "re10w9"
}
```

## Para redireccionar, abre en el navegador
```JSON
http://localhost:8000/api/urls/<shortCode> (donde <shortCode> es el código generado).
```

