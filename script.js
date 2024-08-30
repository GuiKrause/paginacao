const table = document.querySelector('#table');
const um = document.querySelector('#um');
const dois = document.querySelector('#dois');
const tres = document.querySelector('#tres');
let alunos = [];

let pagina = 1;

renderizarTabela()

um.addEventListener('click', (e) => {
    e.preventDefault();
    pagina = 1
    renderizarTabela()
})
dois.addEventListener('click', (e) => {
    e.preventDefault();
    pagina = 2
    renderizarTabela()
})
tres.addEventListener('click', (e) => {
    e.preventDefault();
    pagina = 3
    renderizarTabela()
})

async function fetchData(pagina) {
const url = `http://localhost:3000/alunos?_page=${pagina}`;
  try {
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error(`Status da resposta: ${response.status}`);
    }
    const json = await response.json();
    alunos = json.data;
    console.log(alunos)
  } catch (error) {
    console.error(error.message);
  }
}

async function renderizarTabela() {
    await fetchData(pagina);
    table.innerHTML =
    `<table>
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Idade</th>
                <th scope="col">Curso</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>
            ${alunos.map((aluno) => `
                <tr>
                    <th scope="row">${aluno.nome}</th>
                    <td scope="row">${aluno.idade}</td>
                    <td scope="row">${aluno.curso}</td>
                    <td scope="row">${aluno.email}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    `
} 