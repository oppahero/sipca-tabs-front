# Pautas de Contribución

### Contents

- [Primera Contribución](#book-primera-contibución)
    - [Clonar Repositorio](#clonar-repositorio)
    - [Extensiones en VsCode](#bulb-extensiones-en-vscode)
    - [Node Version Manager](#rocket-node-version-manager)
- [Roles](#memo-roles)
- [Crear Rama](#seedling-crear-rama)
- [Cambiar de Rama](#arrow_right_hook-cambiar-de-rama)
- [Subir Cambios](#outbox_tray-subir-rama)
- [Incidentes](#beetle-incidentes)
- [Merge Request](#love_letter-merge-requests)
- [Revisión de Código](#white_check_mark-revisión-de-código)
- [Estilo de Codificación](#nail_care-estilo-de-codificación)

> **Esta guía sirve para establecer expectativas claras para todos los involucrados en el proyecto. Seguir estas pautas ayudará a garantizar una experiencia positiva para los contribuyentes y mantenedores.**

## :book: Primera contribución

¡Bienvenido/a al equipo de OPENSIPCA! Estamos emocionados de que quieras contribuir a nuestro proyecto Angular. Esta guía te ayudará a dar tus primeros pasos

**Requisitos Previos**

1. **Node.js y npm**: Asegúrate de tener instalado Node.js en tu sistema. La versión recomendada para este proyecto es la `20.9.0`. Puedes verificar tu versión ejecutando `node -v` y `npm -v` en tu terminal.<br>
2. **Git**: Necesitarás Git para clonar el repositorio y gestionar tus cambios. Puedes descargarlo desde https://git-scm.com/downloads. En la dirección `\\sirfile2\APLICA\software\Git` hay disponible un instalador para 64bits <br>
3. **Editor de código**: Elige un editor de código que te sea cómodo, como Visual Studio Code.<br>

### Clonar repositorio

<img align="right" width="250" src="https://firstcontributions.github.io/assets/Readme/copy-to-clipboard.png" alt="copy URL to clipboard" />

En el repositorio del proyecto que deseamos clonar, haz click en el botón Clone y haz click en el icono de copiar de la opción Clone with HTTP.

Luego abré un terminal de git en la carpeta donde tendrás el proyecto     y ejecutarás:

```
git clone "url que acabas de copiar"
```
Donde "url que acabas de copiar" (sin las comillas), en este caso será la URL de este repositorio:

```
git clone http://10.50.36.67:8081/pyl/sipca-front.git
```

> [!NOTE]
> Ya que el repositorio está en un servidor en la red, se abrirá una ventana que te solicitará autenticación. Ingresa tu usuario y contraseña de red.

### :bulb: Extensiones en VsCode

Algunas de las extensiones recomendadas:

1. **EsLint**: Herramienta que examina el código buscando problemas, errores de sintaxis, e incluso ayudando a corregir malas prácticas.<br>
2. **GitLens**: Herramienta que nos permite ver información del repositorio del proyecto desde el vscode. Como las ramas, los commits en la rama, entre otros.<br>
3. **ErrorLens**: Resalta los errores detectados por el EsLint directamente en el código.<br> 
3. **Angular Language Service**: Extensión que mejora la experiencia en el desarrollo con Angular.<br> 


#### **EsLint en vsCode.**

Configuracion en VSCode settings.json

```
    "[typescript]": { 
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit"
    }
```

### :rocket: **Node Version Manager** 

Para manejar varias versiones de nodeJs, en caso de que tengas varias versiones de Angular, instala [NVM](https://github.com/coreybutler/nvm-windows/releases)

> [!NOTE]
> Antes de instalar nvm desinstala el nodeJs istalado en tu equipo

**Comandos de NVM**

```
// Lista las versiones de node instaladas en el equipo
nvm list 

// Instala la versión indicada (xx.xx.xx)
nvm install xx.xx.xx

// Desinstala la versión indicada (xx.xx.xx)
nvm uninstall xx.xx.xx

// Cambia la versión de node activa a la indicada (xx.xx.xx)
nvm use xx.xx.xx

// Indica la versión de node activa
nvm current

// Lista las últimas versiones de node disponibles
nvm list available
```
## :memo: Roles

Dentro del proyecto cada recurso tiene asignado un rol, es cual determinará su participación y permisos dentro de este.

### Manteiner

Gestionan y administran casi todos los aspectos del proyecto, teniendo la responsabilidad de mantenerlo en buen estado y tomar decisiones clave.<br>

**Permisos y Responsabilidades:**<br>

- **Gestión de Miembros.** Pueden agregar, eliminar y cambiar los roles de otros miembros del proyecto.
- **Protección de Ramas.** Configuran las reglas de protección para las ramas, como requerir aprobaciones de merge request o permitir solo ciertos tipos de commits.
- **Administración de Etiquetas.** Crean, editan y eliminan etiquetas para organizar el código.
- **Gestión de Issues y Merge Requests.** Pueden cerrar, reabrir, asignar y etiquetar issues y merge requests.

### Developer

Tienen permisos para proponer cambios, revisar el código de otros y colaborar en la construcción del software.<br>

**Permisos y Responsabilidades:**<br>

- **Crear y modificar código.** Pueden crear nuevas ramas, realizar commits y enviar solicitudes de fusión (merge requests) para incorporar sus cambios al código base.
- **Revisar código.** Pueden revisar las solicitudes de fusión de otros desarrolladores y proporcionar comentarios.
- **Crear y administrar issues.** Pueden abrir, cerrar y asignar issues para rastrear tareas y errores.
- **Acceder a la documentación.** Pueden ver la documentación del proyecto y contribuir a ella.

### Reporter

Pueden colaborar en el proyecto, pero carecen de permisos para modificar el código directamente, crear ramas o commits, ni enviar merge request.<br>

**Sus permisos están restringidos a:**<br>

- **Informar de problemas.** Pueden crear issues para reportar errores, solicitar nuevas funcionalidades o hacer preguntas sobre el proyecto.
- **Comentar en issues y merge requests.** Pueden participar en las discusiones sobre los issues y merge requests, ofreciendo sugerencias o información adicional.
- **Ver el código.** Tienen acceso a la base de código del proyecto para entender cómo funciona y para identificar posibles problemas.

### Guest 

Nivel de acceso más básico que puedes tener en un proyecto.<br>

**Sus permisos están restringidos a:**<br>

- **Ver información pública.** Puedes ver el nombre del proyecto, su descripción, la lista de miembros, el historial de commits (cambios en el código) y la actividad reciente.
- **Leer issues y merge requests.** Puedes ver los problemas reportados (issues) y las solicitudes de fusión (merge requests) que están abiertos en el proyecto.
- **Comentar en issues y merge requests.** Puedes dejar comentarios para hacer preguntas o proporcionar información adicional sobre los issues y merge requests.

## :seedling: Crear Rama

Para iniciar con el desarrollo de una nueva funcionalidad u operación, debes crear una nueva a partir de la rama main, en la cual harás el nuevo desarrollo.

Puedes crear la rama desde el vsCode, para ello entra a la opción 'Source Control' del menú, y ubica la sección de ramas (BRANCHES) y haz click en el icono(+).

1. Se abrirá un menú que pide seleccionar la rama apartir de la cuál crearás la nueva, selecciona la rama main.
2. Luego escribe el nombre de la nueva rama


> [!IMPORTANT]
> Como nombre de la rama pon el nombre de la operación a desarrollar

## :arrow_right_hook: Cambiar de Rama

Para cambiar de rama desde el vsCode, entra a la opción '*Source Control*' del menú, y ubica la sección de ramas (BRANCHES) y haz click en el icono de la flecha.

1. Se abrirá un menú con la lista de ramas disponibles
2. Selecciona la rama a la que deseas cambiarte

## :outbox_tray: Subir cambios 

Para el desarrollador subir los cambios realizados en su rama, lo hará desde el vsCode desde la opción '*Source Control*' del menú. Aquí se listarán todos los archivos que fueron modificados. 

1. Seleccione los archivos a subir en la sección 'Changes'. Los archivos ya seleccionados saldrán en la sección 'Staged changes'. <br>
2. Escriba un mensaje para el commit en el recuadro superior.<br>
3. Luego, en el botón commit, haga click en el icono de la fecha que está del lado izquierdo
4. Seleccione la opción 'Commit & Push'

> [!IMPORTANT]
> El mensaje del commit debe representar los cambios subidos. Ej. Listar Usuarios

## :beetle: Incidentes

### Informes de errores y otros problemas

Una buena manera de contribuir al proyecto es enviar un informe detallado cuando se encuentra un problema.

- **¡No abras un ticket duplicado!** Busca entre los problemas existentes para ver si tu problema ya se ha informado anteriormente. Si tu problema existe, comenta con cualquier información adicional que tengas.  

- **Complete la plantilla del problema.** La plantilla de informe de error solicita toda la información para abordar el problema de manera rápida y eficiente. Sea claro, conciso y descriptivo. Proporcione la mayor cantidad de información posible, incluidos los pasos para reproducir y las capturas de pantalla (si corresponde).

## :love_letter: Merge Requests

El desarrollador una vez terminada una operación generara una solicitud de merge sobre su rama, puede hacerlo desde el repositorio de gitlab. 

Para la solicitud de merge indicar:
- Titulo de la solicitud
- Una descripción de la funcionalidad (opcinal)
- Asignar la solicitud a alguno de los líderes de equipo o a algún usuario con rol Manteiner

El líder de equipo indicará a qué recurso de QAS le será asignada la operación/funcionalidad para ser probada.

Si la persona de QAS indica que la revisión fue completada con éxito el manteiner procederá a aceptar la solicitud de merge y resolver conflictos en caso de haberlos.


## :white_check_mark: Revisión de código

- **Revisa el código, no el autor.** Busca y sugiere mejoras. Proporcione comentarios prácticos y explique su razonamiento.

- **Tú no eres tu código.** Cuando tu código sea cuestionado o criticado constructivamente, recuerda que tú no eres tu código. No te tomes la revisión del código como algo personal.

- **Haz siempre lo mejor que puedas.** Nadie escribe errores a propósito. Haz tu mejor esfuerzo y aprende de tus errores.

- Tenga en cuenta las pautas especificadas en este documento.

## :nail_care: Estilo de Codificación

La coherencia es lo más importante. Siguiendo las convenciones de estilo, formato y nomenclatura existentes del archivo que está modificando y del proyecto en general.

* Los nombres de los archivos de los componentes deben estar en minúsculas y las palabras separadas por _. Ejemplo: `eje_prog_carga`
* Los nombres de los métodos, variables y funciones deben estar en camelCase. Ejemplo: `thisIsMyNewMethod`
* Los nombres de las clases e interfaces deben estar en PascalCase. Ejemplo: `EjecucionProgramaCargaComponent`

Cuando sea posible, el estilo y el formato se aplicarán con un linter.
