class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    update(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    toString() {
        return `ID: ${this.id}, Nome: ${this.nome}, Cargo: ${this.cargo}, Salário: R$ ${this.salario.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let funcionarios = [];
    let nextId = 1;
    let modoEdicao = false;
    let idEdicao = null;

    const form = document.getElementById('form-funcionario');
    const btnSalvar = document.getElementById('btnSalvar');
    const tbody = document.getElementById('tbody-funcionarios');
    const outputRelatorios = document.getElementById('resultado-relatorios');

    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const inputCargo = document.getElementById('cargo');
    const inputSalario = document.getElementById('salario');

    const btnSalarioMaior = document.getElementById('btnSalarioMaior');
    const btnMediaSalarial = document.getElementById('btnMediaSalarial');
    const btnCargosUnicos = document.getElementById('btnCargosUnicos');
    const btnNomesMaiusculos = document.getElementById('btnNomesMaiusculos');

    const renderizarTabela = () => {
        tbody.innerHTML = '';
        funcionarios.forEach(func => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${func.nome}</td>
                <td>${func.idade}</td>
                <td>${func.cargo}</td>
                <td>R$ ${func.salario.toFixed(2)}</td>
                <td>
                    <button class="editar">Editar</button>
                    <button class="excluir">Excluir</button>
                </td>
            `;

            const btnEditar = tr.querySelector('.editar');
            btnEditar.addEventListener('click', () => {
                prepararEdicao(func);
            });

            const btnExcluir = tr.querySelector('.excluir');
            btnExcluir.addEventListener('click', () => {
                excluirFuncionario(func.id);
            });

            tbody.appendChild(tr);
        });
    };

    const limparFormulario = () => {
        form.reset();
        modoEdicao = false;
        idEdicao = null;
        btnSalvar.textContent = 'Cadastrar';
        inputNome.focus();
    };

    const prepararEdicao = (func) => {
        modoEdicao = true;
        idEdicao = func.id;

        inputNome.value = func.nome;
        inputIdade.value = func.idade;
        inputCargo.value = func.cargo;
        inputSalario.value = func.salario;

        btnSalvar.textContent = 'Atualizar';
        inputNome.focus();
    };

    const excluirFuncionario = (id) => {
        funcionarios = funcionarios.filter(func => func.id !== id);
        renderizarTabela();
        alert('Funcionário excluído com sucesso!');
    };

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value);
        const cargo = inputCargo.value;
        const salario = parseFloat(inputSalario.value);

        if (modoEdicao) {
            const funcParaEditar = funcionarios.find(f => f.id === idEdicao);
            if (funcParaEditar) {
                funcParaEditar.update(nome, idade, cargo, salario);
            }
            alert('Funcionário atualizado com sucesso!');
        } else {
            const novoFunc = new Funcionario(nextId++, nome, idade, cargo, salario);
            funcionarios.push(novoFunc);
            alert('Funcionário cadastrado com sucesso!');
        }

        limparFormulario();
        renderizarTabela();
    });

    btnSalarioMaior.addEventListener('click', () => {
        const filtrados = funcionarios.filter(f => f.salario > 5000);
        const resultado = filtrados
            .map(f => `${f.nome} (R$ ${f.salario.toFixed(2)})`)
            .join('\n');

        outputRelatorios.textContent = 'Salários > R$ 5000:\n' + (resultado || 'Nenhum encontrado.');
    });

    btnMediaSalarial.addEventListener('click', () => {
        if (funcionarios.length === 0) {
            outputRelatorios.textContent = 'Nenhum funcionário cadastrado.';
            return;
        }
        const total = funcionarios.reduce((acc, f) => acc + f.salario, 0);
        const media = total / funcionarios.length;
        outputRelatorios.textContent = `Média Salarial: R$ ${media.toFixed(2)}`;
    });

    btnCargosUnicos.addEventListener('click', () => {
        const cargos = funcionarios.map(f => f.cargo);
        const unicos = [...new Set(cargos)];

        outputRelatorios.textContent = 'Cargos Únicos:\n' + (unicos.join('\n') || 'Nenhum cargo cadastrado.');
    });

    btnNomesMaiusculos.addEventListener('click', () => {
        const nomes = funcionarios
            .map(f => f.nome.toUpperCase())
            .join('\n');

        outputRelatorios.textContent = 'Nomes (Maiúsculo):\n' + (nomes || 'Nenhum funcionário cadastrado.');
    });

    renderizarTabela();
});