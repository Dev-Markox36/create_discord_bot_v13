# <center>create_discord_bot_v13</center>

<br>
<div align="center">
<a href="https://www.npmjs.com/package/create_discord_bot_v13">
<img src="https://img.shields.io/npm/v/create_discord_bot_v13?label=Version&logo=npm&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/create_discord_bot_v13">
<img alt="npm" src="https://img.shields.io/npm/dw/create_discord_bot_v13?logo=npm&style=for-the-badge">
</a><br>
</div>
<br>

> <br>
> <center>INFORMACIÓN</center>
> <center>Plantilla para bot de discord.js v13 + MongoDB (Opcional)<br></center>
> <br>

<br>

## Instalación

_Comando que se debe ejecutar en la cmd para iniciar la instalación._

```
npx create_discord_bot_v13 nombre_de_tu_proyecto
```

---

_Primero cargamos la ruta del proyecto_

```
cd "nombre_de_tu_proyecto"
```

---

_Ahora renombraremos y rellenaremos el archivo **`.env.example`** → **`.env`**_

```yml
BOT_TOKEN=
DB_ACCESS=
```

---

_Finalizaremos con el siguiente comando de cmd_

```
npm run dev
```

---

## Configuración ⚙️

_Parametros del bot configurables_

```js
module.exports = {
	bot: {
		prefix: "!", //Aqui se puede modificar el prefijo del bot
	},
	colors: {
		default: "#fffff1", //Añade colores con la misma sintaxis
	},
	emotes: {
		error: "⚠️",
		success: "✅", //añade emojis con la misma sintaxis
	},
	/* Crea nuevas apartados
    canales: {
        logs: "1241552315235",
        sugerencias: "id_del_canal"
    } 
    */
};
```
