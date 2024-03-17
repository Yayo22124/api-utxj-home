
# iHouse API REST Documentación

iHouse es un proyecto por parte de la carrera de T.I en Desarrollo de Software Multiplataforma de la **UTXJ**, desarrollado por los alumnos del **5 B** (Quinto Cuatrimestre Grupo B), para dar lógica y ofrecer servicios con el fin de ser consumidos por una aplicación de control y gestión de una casa domótica, garantizando la unión de materias como Internet de las Cosas (IoT), Bases de Datos para Cómputo en la Nube (BDCN) y Aplicaciones Web para la Industria 4.0.

Este documento presenta la información y documentación necesaria para hacer uso de la API REST creada para manejar los datos de la casa.



## API REST Endpoints

> [!IMPORTANT]  
> La url para la API REST en **Railway** (Sin ningún endpoint) es: https://api-utxj-home.up.railway.app

Esta API REST está basada en endpoints para cada tipo de cuarto contemplado en la casa:

- Recámara/s (bedrooms).
- Baño/s (bathrooms).
- Cocina/s (kitchens).
- Garaje/s (garages).
- Sala/s de estar (livingrooms).

#### Obtener los registros de todas las Recámaras:

```http
  GET /api/v1/bedrooms/
```

#### Obtener los registros de todos las Salas de Estar:

```http
  GET /api/v1/livingrooms/
```

#### Obtener los registros de todos los Baños:

```http
  GET /api/v1/bathrooms/
```


#### Obtener los registros de la **Recámara 3**:

```http
  GET /api/v1/bedrooms/?location=Recámara 3
```

#### Obtener los 20 registros del **Baño 1** ordenados por **nombre** de forma **ascendente**:

```http
  GET /api/v1/bathrooms/?location=Baño 1&limit=20&sortBy=name&typeSort=asc
```

| Query Param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `location`      | `string` | **Opcional**. Nombre de la ubicación a filtrar en la base de datos. |
| `limit`      | `number` | **Default/Opcional**. Número de registros a devolver, por defecto: **10**. |
| `sortBy`      | `string` | **Default/Opcional**. Propiedad del documento por la cual hacer **sort** (ordenar), por defecto **registeredDate**. |
| `typeSort`      | `string` | **Default/Opcional**. Tipo de ordenamiento (asc, desc), por defecto: "**asc**". |

#### Insertar un documento/registro de un Sensor de Temperatura y Humedad en Recámaras (colección bedrooms):

```http
  POST /api/v1/bedrooms/

  {
  "type": "Sensor",
  "name": "Temperatura y Humedad",
  "brand": "Genérico",
  "model": "DHT11",
  "specifications": [
    {
      "name": "Rango de medición de temperatura",
      "minValue": 0,
      "maxValue": 50,
      "unit": "°C"
    },
    {
      "name": "Rango de medición de húmedad",
      "minValue": 20,
      "maxValue": 90,
      "unit": "%"
    },
    {
      "name": "Voltage de operación",
      "value": 5.5,
      "unit": "V"
    },
    {
      "name": "Corriente de operación",
      "value": 2.5,
      "unit": "mA",
      "type": "VCD"
    },
    {
      "name": "Consumo eléctrico",
      "value": 0.00125,
      "unit": "W"
    }
  ],
  "location": "Recámara 3",
  "status": "Disponible",
  "owner": "MAHITECH",
  "readings": [
    {
      "name": "Detección de Temperatura",
      "value": 30.5,
      "measurementUnit": "°C"
    },
    {
      "name": "Detección de Humedad",
      "value": 25,
      "measurementUnit": "%"
    }
  ]
}
```

## Instalación

Clona este repositorio en tu sistema:
```bash
  git clone https://github.com/Yayo22124/api-utxj-home.git
```

Dirígete a la carpeta creada: 

```bash
  cd api-utxj-home
```

Instala las dependencias de Javascript:

```bash
  npm install
```
    
## Variables de Entorno

Este proyecto protege información importante de la aplicación como la URL de conexión a **MongoDB Atlas** haciendo uso de un archivo **.env** ubicado dentro de la carpeta **src**.

> [!NOTE]  
> Puedes usar tanto una URL de conexión a MongoDB Atlas como a una base de datos en local. 

`PORT`

`CONNECTION_DB`


## Ejecutar Proyecto

Inicial el servidor en modo desarrollo:

```bash
  npm run start:dev
```

O en su defecto en modo producción:

```bash
  npm run start:prod
```

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Yayo22124"><img src="https://avatars.githubusercontent.com/Yayo22124" width="100px;" alt="Haziel Ortiz"/><br /><sub><b>Haziel Ortiz</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zac-ek"><img src="https://avatars.githubusercontent.com/Zac-ek" width="100px;" alt="Zacek"/><br /><sub><b>Ángel Zacek</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KalidRs"><img src="https://avatars.githubusercontent.com/KalidRs" width="100px;" alt="Kalid"/><br /><sub><b>Kalid Reyes</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/IrvingMordo"><img src="https://avatars.githubusercontent.com/IrvingMordo" width="100px;" alt="Irving"/><br /><sub><b>Irving Morales</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ederdal"><img src="https://avatars.githubusercontent.com/Ederdal" width="100px;" alt="Edgar"/><br /><sub><b>Edgar Cruz</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MendezPro"><img src="https://avatars.githubusercontent.com/MendezPro" width="100px;" alt="Orlando Méndez"/><br /><sub><b>Orlando Méndez</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ali-2121"><img src="https://avatars.githubusercontent.com/Ali-2121" width="100px;" alt="Alina Bonilla"/><br /><sub><b>Alina Bonilla</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Aldotd12"><img src="https://avatars.githubusercontent.com/Aldotd12" width="100px;" alt="Aldo Tolentino"/><br /><sub><b>Aldo Tolentino</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
