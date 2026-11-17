import type { Tarea, Filtro } from '../interfaces/tarea.interface';

export class TaskManager {

    // 1. Estado de la aplicación (Datos iniciales que simulan venir de una base de datos)
    tareas: Tarea[] = [
        { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
        { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
        { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
    ];

    // Estado del filtro activo actual ('Todas', 'Pendientes', 'Completadas')
    filtroActual: Filtro = 'Todas';

    // 2. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
    async inicializar(): Promise<void> {

        // TODO: Simular una espera de 1.5 segundos usando una Promesa (setTimeout)
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });

        // TODO: Una vez pasada la espera, ocultar el div #loading-state
        const loadingState = document.querySelector('#loading-state');

        if (loadingState) {
            loadingState.remove();
        }

        // TODO: Invocar a la función pintarTareas()
        this.pintarTareas();
    }

    // 3. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
    pintarTareas(): void {

        // Obtener el contenedor de las tareas
        const listaContenedor = document.querySelector('#lista-tareas');

        if (!(listaContenedor instanceof HTMLUListElement)) {
            return;
        }

        // TODO: Limpiar el contenedor listaContenedor (innerHTML = '')
        listaContenedor.innerHTML = '';

        // TODO: Filtrar el array 'tareas' según el 'filtroActual' usando .filter()
        const tareasFiltradas = this.tareas.filter((tarea: Tarea) => {

            if (this.filtroActual === 'Pendientes') {
                return !tarea.completada;
            }

            if (this.filtroActual === 'Completadas') {
                return tarea.completada;
            }

            return true;
        });

        // TODO: Recorrer el array filtrado y crear dinámicamente un elemento <li> por cada tarea
        tareasFiltradas.forEach(tarea => {

            const li = document.createElement('li');

            // Crear el título de forma segura
            const titulo = document.createElement('span');
            titulo.textContent = tarea.titulo;

            // Asignar clase según la prioridad
            li.classList.add('item-tarea', tarea.prioridad);

            // Marcar visualmente las tareas completadas
            if (tarea.completada) {
                li.classList.add('completada');
                titulo.classList.add('texto-completado');
            }

            // TODO: Configurar las clases CSS según la prioridad y el estado (completada)
            const prioridad = document.createElement('span');
            prioridad.textContent = tarea.prioridad;
            prioridad.classList.add('etiqueta-prioridad');

            // TODO: Añadir un botón dentro de cada <li> para poder alternar el estado
            const botonEstado = document.createElement('button');

            botonEstado.type = 'button';
            botonEstado.textContent = tarea.completada
                ? 'Marcar pendiente'
                : 'Completar';

            botonEstado.classList.add('btn-estado');

            // Alternar el estado de la tarea
            botonEstado.addEventListener('click', () => {

                this.tareas = this.tareas.map(t =>
                    t.id === tarea.id
                        ? { ...t, completada: !t.completada }
                        : t
                );

                this.pintarTareas();
            });

            // TODO: Inyectar el <li> resultante en listaContenedor usando .appendChild()
            li.append(titulo, prioridad, botonEstado);

            listaContenedor.appendChild(li);
        });
    }
}
