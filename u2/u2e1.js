// T3. JavaScript profesional en una aplicación web
// U2. Delegación de eventos
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

const TASK_LIST = [
    {
        name: 'Work',
        done: false,
    },
    {
        name: 'Shopping',
        done: false,
    },
    {
        name: 'Call mom',
        done: true,
    },
];

// MGG - Clase TodoList
class TodoList {
    #appRef;
    #listRef;
    #todoTpl;
    list = [];

    constructor(appRef, listRef, todoTpl) {
        this.#appRef = appRef;
        this.#listRef = listRef;
        this.#todoTpl = todoTpl;
        this.init();
    }

    init() {
        // MGG - Delegación: añadir tarea
        this.#appRef.addEventListener('click', (event) => {
            if (event.target.classList.contains('js-todo-add')) {
                event.preventDefault();
                const input = this.#appRef.querySelector('.js-todo-new-name');
                const name = input.value.trim();
                this.add(name, false);
                input.value = '';
            }
        });

        // MGG - Delegación: lista (toggle + delete)
        this.#listRef.addEventListener('click', (event) => {
            const todoElement = event.target.closest('.js-todo');
            if (!todoElement) return;
            const name = todoElement.dataset.todo;
            if (event.target.classList.contains('js-todo-done')) {
                this.toggle(name);
            }
            if (event.target.classList.contains('js-todo-delete')) {
                this.remove(name);
            }
        });
    }

    add(todo, status) {
        if (todo === '') return false;
        if (this.list.some(t => t.name === todo)) {
            return false;
        }
        this.list.push({ name: todo, done: status });
        this.render();
        return true;
    }

    remove(todo) {
        const index = this.list.findIndex(t => t.name === todo);
        if (index === -1) return false;
        this.list.splice(index, 1);
        this.render();
        return true;
    }

    toggle(todo) {
        const index = this.list.findIndex(t => t.name === todo);
        if (index === -1) return false;
        this.list[index].done = !this.list[index].done;
        this.render();
        return true;
    }

    render() {
        this.#listRef.innerHTML = '';
        this.list.forEach(t => {
            const node = this.#todoTpl.content.cloneNode(true);
            const li = node.querySelector('.js-todo');
            const nameEl = node.querySelector('.js-todo-name');
            const doneEl = node.querySelector('.js-todo-done');
            li.dataset.todo = t.name;
            li.dataset.done = t.done;
            nameEl.textContent = t.name;
            doneEl.textContent = t.done ? 'done' : 'pending';
            this.#listRef.appendChild(node);
        });
    }
}

// MGG - Instanciación
const appRef = document.getElementById('app');
const listRef = document.querySelector('.js-todo-list');
const todoTpl = document.getElementById('todo-tpl');
const todosApp = new TodoList(appRef, listRef, todoTpl);

// MGG - Carga inicial
TASK_LIST.forEach(t => {
    todosApp.add(t.name, t.done);
});

// MGG - Llamadas adicionales
todosApp.add('New one', false);
todosApp.toggle('Shopping');
todosApp.remove('Call mom');
todosApp.add('Another one', true);
document.querySelector('.js-todo-new-name').value = 'Test';
document.querySelector('.js-todo-add').click();
document.querySelector('.js-todo[data-todo="New one"] .js-todo-done').click();
document.querySelector('.js-todo[data-todo="Another one"] .js-todo-delete').click();