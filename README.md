# Proyecto de empleados
### Despliegue del proyecto

#### Backend [DJango]
Para ejecutar este proyecto le recomendamos tener instalado Python 3, Postgresql, luego se debe conectar el proyecto a este servidor de base de datos.
Para más información ingresar a la página https://codigospython.com/integracion-de-django-con-postgresql/ para lo antes mencionado.

Luego hacer los siguientes pasos.
 1. Ingresar al directorio backend
 2. Ejecutar el comando ```pip install -r requirements.txt```
 3. Ejecutar el comando ```venv/scripts/activate```
 4. Luego de realizar la conexión se debe ejecutar el comando ```python manage.py makemigration``` y ```python manage.py migrate``` (Esta operación solo se realiza en la primera ejecución del programa, para migrar los modelos)
 4. Ejecutar el comando ```python manage.py runserver``` o ```pip manage.py runserver```
 
#### Frontend [React]
Antes ejecutar esta parte debe tener Node JS instalado en el equipo, luego realizar las siguientes operaciones
1. Ejecutar el comando ```npm install``` (Esto solo se realiza la primera vez de clonar el proyecto)
2. Ejecutar el comando ```npm start```


#### Detalles de la Api
La API de este proyecto es realizado por DJango, y el mapa de operaciones es el siguiente

- employees/employees
-- ```employees/employees``` [get]: Lista los empleados existentes en la base de datos.
-- ```employees/employees``` [post]: Crea un nuevo empleado.
-- ```employees/employees/{id}``` [put]: Actualiza el empleado del id.
-- ```employees/employees/{id}``` [delete]: Elimina el empleado del id.

- employees/emails
-- ```employees/emails?empleadoId={empleadoId}``` [get]: Lista los correos pertenecientes al empleado identificado
-- ```employees/emails?empleadoId={empleadoId}``` [post]: Crea un nuevo correo para el empleado del id especificado.
-- ```employees/emails/{id}``` [delete]: Elimina el correo del id especificado.

- employees/phones
-- ```employees/phones?empleadoId={empleadoId}``` [get]: Lista los teléfonos pertenecientes al empleado identificado
-- ```employees/phones?empleadoId={empleadoId}``` [post]: Crea un nuevo teléfono para el empleado del id especificado.
-- ```employees/phones/{id}``` [delete]: Elimina el teléfono del id especificado.


## Guía del usuario
Estado la vista de frontend ejecutada y mostrada en el navegador debe realizar los siguientes pasos para realizar la operación:

- **Crear un nuevo empleado**: Debe presionar el botón ```Add``` y aparecerá un cuadro de dialogo donde deberá diligenciar sus datos, para que por último presione el botón ```Add``` del cuadro de dialogo.

- **Editar un empleado**: Para esto debe presionar el botón representado por el lápiz, luego de esto aparecerá un cuadro de dialogo donde deberá modificar los datos que prefiera. Por último, para guardar los datos debe presionar el botón ```Edit```.

- **Eliminar un empleado**: Para esto debe presionar el botón representado por la canasta de basura, le aparecerá un cuadro de dialogo preguntando por la confirmación de esta operación, por último, debe presionar el botón ```Yes```.
- **Listar correos de un empleado**: Para esto debe presionar el botón representado por una carta de mensaje que aparece en la parte derecha del registro del empleado y le aparecerá un cuadro de dialogo con el listado de correos pertenecientes a este.
- **Agregar correo a un empleado**: Teniendo abierto el cuadro de dialogo de los correos pertenecientes al empleado que se le desea añadir, se debe escribir el correo deseado en el cuadro de texto que se presenta en la parte superior del cuadro, para después presionar el botón ```Add```, al realizar esto se le enviara un correo electrónico de bienvenida al empleado por medio del correo ingresado.
- **Eliminar correo a un empleado**: Teniendo abierto el cuadro de dialogo de los correos pertenecientes al empleado que se le desea eliminar, se debe presionar el botón representado por la canasta de basura.
- **Listar teléfonos de un empleado**: Para esto debe presionar el botón representado por un teléfono móvil que aparece en la parte derecha del registro del empleado y le aparecerá un cuadro de dialogo con el listado de teléfonos pertenecientes a este.
- **Agregar teléfono a un empleado**: Teniendo abierto el cuadro de dialogo de los teléfonos pertenecientes al empleado que se le desea añadir, se debe escribir el número, tipo e indicativo deseado en los cuadros de texto que se presentan en la parte superior del cuadro, para después presionar el botón ```Add```.
- **Eliminar teléfono a un empleado**: Teniendo abierto el cuadro de dialogo de los teléfonos pertenecientes al empleado que se le desea eliminar, se debe presionar el botón representado por la canasta de basura.


