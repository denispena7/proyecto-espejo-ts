import { TaskManager } from './models/TaskManager.js';
import type { Prioridad, Filtro } from './interfaces/tarea.interface';

// 1. Selectores del DOM principales
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// Comprobar que existen los elementos del DOM
if (
    !(formulario instanceof HTMLFormElement) ||
    !(inputTitulo instanceof HTMLInputElement) ||
    !(selectPrioridad instanceof HTMLSelectElement)
) {
    throw new Error('No se han encontrado todos los elementos del DOM');
}

// 2. Instanciar la clase TaskManager
const taskManager = new TaskManager();

// 3. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event: SubmitEvent) => {

    event.preventDefault();

    // TODO: Capturar los valores de los inputs de forma segura
    const titulo = inputTitulo.value.trim();
    const prioridad = selectPrioridad.value as Prioridad;

    if (!titulo) {
        inputTitulo.focus();
        return;
    }

    // TODO: Crear un nuevo objeto tarea inmutable con un id único (Date.now())
    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        prioridad: prioridad,
        completada: false
    };

    // TODO: Añadir el objeto al array global de tareas de forma inmutable (operador spread)
    taskManager.tareas = [...taskManager.tareas, nuevaTarea];

    // TODO: Volver a invocar pintarTareas() y resetear el formulario
    taskManager.pintarTareas();

    // Limpiar el formulario
    formulario.reset();
    inputTitulo.focus();
});

// 4. MANEJO DE EVENTOS: Captura de botones de filtrado
botonesFiltro.forEach(boton => {

    boton.addEventListener('click', () => {

        // Quitar clase active al botón anterior y ponérsela al pulsado
        botonesFiltro.forEach(b => b.classList.remove('active'));
        boton.classList.add('active');

        // TODO: Actualizar la variable 'filtroActual' con el atributo 'data-filtro' del botón
        const nuevoFiltro = boton.getAttribute('data-filtro');

        if (
            nuevoFiltro === 'Todas' ||
            nuevoFiltro === 'Pendientes' ||
            nuevoFiltro === 'Completadas'
        ) {
            taskManager.filtroActual = nuevoFiltro as Filtro;
        }

        // TODO: Invocar pintarTareas() para refrescar la pantalla
        taskManager.pintarTareas();
    });
});

// 5. Arrancar la aplicación
taskManager.inicializar();
