//1
//Selecionando Elementos do Dom 
const tarefaForm = document.getElementById('form__tarefa');
const tarefaInput = document.getElementById('input__tarefa')
const tarefasLista = document.getElementById('lista__tarefas')

//7
//Carrega as tarefas do armazenamento local adiciona à página da web
const carregarTarefas = () => {
    //// Recupera as tarefas do armazenamento local como objeto. Se não houver tarefas, define um array vazio.
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    //// Itera sobre cada tarefa e a adiciona ao DOM (Modelo de Objeto de Documento) d HTML
    tarefas.forEach(tarefa => adicionarTarefaNoDOM(tarefa))
}

//4
//É criada uma função para armazenar as tarefas no navegador do usuário
const salvarTarefas = tarefas => {
    //o método setItem vai salvar no localStorage um item com uma chave e um valor
    //os dados serão guardados na chave 'tarefas' e em formato de string por isso a conversão p/ JSON.stringify
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

//5
//A função a seguir adiciona a tarefa escrita no html 
const adicionarTarefaNoDOM = tarefa => {
    //cria um novo elemento de item de lista
    const li = document.createElement('li');
    //Define o conteúdo de texto do item da lista como a tarefa passada para a função
    li.textContent = tarefa;
    //Cria um botão de exclusão (elemento span)
    const deletarBtn = document.createElement('span')
    //Define o conteúdo de texto do botão de exclusão como 'x'
    deletarBtn.textContent = 'x'
    //Adiciona uma classe 'delete' ao botão de exclusão
    deletarBtn.classList.add('delete')
    //ao clicar no botão de deletar...
    deletarBtn.onclick = () => {
        //remove o item da lista
        li.remove()
        //chama a função deletar tarefa
        deletarTarefa(tarefa)
    }
    //adiciona o botão de deletar no item da lista de tarefas
    li.appendChild(deletarBtn);
    //adiciona o novo <li> ao <ul> pai
    tarefasLista.appendChild(li)
}

//3
//Uma função que adiciona uma nova tarefa a uma lista de tarefas armazenada no localStorage, salva a lista atualizada e atualiza o DOM com a nova tarefa
const adicionarTarefa = tarefa => {
    // Recupera a lista de tarefas do localStorage. Se não existir, inicializa com um array vazio.
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    // Adiciona a nova tarefa à lista.
    tarefas.push(tarefa)
    // Salva a lista atualizada de tarefas no localStorage.
    salvarTarefas(tarefas)
    // Adiciona a nova tarefa ao DOM.
    adicionarTarefaNoDOM(tarefa)
}

//6
//Exclui uma tarefa do localStorage
const deletarTarefa = tarefa => {
    //Esta linha recupera as tarefas do armazenamento local sob a chave 'tarefas'. Se não houver tarefas no armazenamento local, inicializa tarefas como um array vazio.
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    //cria um array com todos os elementos que passa, no teste implementador
    //retorna um novo array que contém todas as tarefas de tarefas, exceto aquela que é estritamente diferente da variável tarefa. Em resumo, ele remove a tarefa especificada do array tarefas.
    tarefas = tarefas.filter(t => t !== tarefa)
    //salvar as tarefas atualizadas de volta no armazenamento local
    salvarTarefas(tarefas)
}

//2
//define que ao enviar o formulário, o seguinte evento acontece:
tarefaForm.addEventListener('submit', e =>{
    //Previne o comportamento padrão do formulário de ser submetido, o que geralmente levaria a uma atualização da página
    e.preventDefault()
    //Aqui, estamos obtendo o valor do campo de entrada de texto com o ID tarefaInput e removendo espaços em branco extras usando o método trim(). Isso garante que não tenhamos espaços em branco desnecessários antes ou depois do texto da tarefa
    const tarefa = tarefaInput.value.trim();
    //Se o texto da tarefa não está vazio...
    if (tarefa) {
        //...chamamos a função adicionarTarefa e passamos o texto da tarefa como argumento...
        adicionarTarefa(tarefa);
        //... limpamos o campo de entrada de texto definindo seu valor como uma string vazia, para que o campo esteja pronto para receber a próxima tarefa.
        tarefaInput.value = ''
    }
})

carregarTarefas()
