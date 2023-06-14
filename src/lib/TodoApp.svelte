<script lang="ts">
  import { quotes } from "./Quotes";
  import { supabase } from "./supabaseClient";
  import { onMount } from 'svelte'

  interface Todo {
    id: number;
    titlem: string;
    status: boolean;
  }

  let todos = [];
  let inputText ='';
  let quote = quotes[Math.floor(Math.random() * quotes.length)];
  let totalTodos = 0;
  let completedTodos = 0;

  const handleInputChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement; }) => inputText = e.currentTarget.value;

  const handleDeleteTodo = async (id: number) => {
    todos = todos.filter(todo => todo.id !== id);
    totalTodos = todos.length;
    completedTodos = todos.filter(todo => todo.status).length;
    await supabase.from('todos').delete().eq('id', id);
  };

  const handleToggleComplete = async (id: number) => {
    todos = todos.map(todo => todo.id === id ? { ...todo, status: !todo.status } : todo);
    completedTodos = todos.filter(todo => todo.status).length;
    await supabase.from('todos').update({ status: 'true' }).eq('id', id);
  };

  const handleAddTodo = async () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        titlem: inputText,
        status: false,
      };
      todos = [...todos, newTodo];
      inputText = '';
      totalTodos = todos.length;
      await supabase.from('todos').insert([newTodo])
    }
  };

  const getTodoList = async () => {
    let { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      console.log("error", error);
    } else {
      todos = data;
      totalTodos = todos.length;
      completedTodos = todos.filter(todo => todo.status).length;
    }
  };
  onMount(() => getTodoList());
</script>

<div class="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
  <div class="max-w-lg w-full mx-4 p-4 bg-gray-800 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-white mb-4">TaskMaster</h1>
    <div class="flex mb-4">
      <input
        type="text"
        value={inputText}
        on:change={handleInputChange}
        on:keyup={e => e.key === 'Enter' && handleAddTodo()}
        class="flex-grow bg-gray-700 text-white placeholder-gray-400 border-gray-400 border-2 p-2 rounded-l-md focus:outline-none"
        placeholder="Add a new todo..."
      />
      <button
        on:click={handleAddTodo}
        class="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none"
      >
        Add
      </button>
    </div>
    <ul class="space-y-2">
      {#each todos as todo}
        <li class={`flex items-center bg-gray-700 p-3 rounded-md ${
        todo.status ? 'text-gray-500 line-through' : 'text-white'
      }`}>
        <span class="flex-grow">{todo.titlem}</span>
        {#if !todo.status}
        <button on:click={() => handleToggleComplete(todo.id)}
          class="text-green-500 hover:text-green-600 ml-2 focus:outline-none">✓</button>
        {/if}
        <button on:click={() => handleDeleteTodo(todo.id)}
          class="text-red-500 hover:text-red-600 ml-2 focus:outline-none">X</button>
        </li>
      {/each}
    </ul>
    <div class="mt-8 text-white">
      <p>
        Total Todos: {totalTodos} | Completed Todos: {completedTodos}
      </p>
      <p class="mt-2">
        <em>"{quote.q}"</em> - {quote.a}
      </p>
    </div>
  </div>
</div>