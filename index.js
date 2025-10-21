// Função para validar o formulário
function validarFormulario() {
    // Limpar validações anteriores
    limparValidacoes();
    
    const erros = [];
    
    // Obter elementos do formulário
    const nomeObra = document.getElementById('nomeObra');
    const autor = document.getElementById('autor');
    const anoObra = document.getElementById('anoObra');
    const periodoObra = document.getElementById('periodoObra');
    const tipoObra = document.getElementById('tipoObra');
    const detalhamento = document.getElementById('detalhamento');
    
    // Validar Nome da Obra
    if (!nomeObra.value.trim()) {
        erros.push('Nome da obra é obrigatório');
        nomeObra.classList.add('campo-invalido');
    } else if (nomeObra.value.trim().length < 6) {
        erros.push('Nome da obra deve ter pelo menos 6 caracteres');
        nomeObra.classList.add('campo-invalido');
    }
    
    // Validar Autor
    if (!autor.value.trim()) {
        erros.push('Autor é obrigatório');
        autor.classList.add('campo-invalido');
    } else if (autor.value.trim().length < 10) {
        erros.push('Nome do autor deve ter pelo menos 10 caracteres');
        autor.classList.add('campo-invalido');
    }
    
    // Validar Ano da Obra
    if (!anoObra.value.trim()) {
        erros.push('Ano da obra é obrigatório');
        anoObra.classList.add('campo-invalido');
    } else {
        const ano = parseInt(anoObra.value.trim());
        if (isNaN(ano) || ano < 0 || ano > new Date().getFullYear()) {
            erros.push('Ano da obra deve ser um número válido');
            anoObra.classList.add('campo-invalido');
        }
    }
    
    // Validar Período da Obra
    if (!periodoObra.value) {
        erros.push('Período da obra é obrigatório');
        periodoObra.classList.add('campo-invalido');
    }
    
    // Validar Tipo da Obra
    if (!tipoObra.value) {
        erros.push('Tipo da obra é obrigatório');
        tipoObra.classList.add('campo-invalido');
    }
    
    // Exibir erros se houver
    if (erros.length > 0) {
        exibirErros(erros);
        return false;
    }
    
    // Se não houver erros, registrar na tabela
    registrarNaTabela(nomeObra.value, autor.value, anoObra.value, periodoObra.value, tipoObra.value, detalhamento.value);
    limparFormulario();
    return true;
}

// Função para limpar validações anteriores
function limparValidacoes() {
    // Remover bordas vermelhas
    const camposInvalidos = document.querySelectorAll('.campo-invalido');
    camposInvalidos.forEach(campo => campo.classList.remove('campo-invalido'));
    
    // Limpar lista de erros
    const listaErros = document.getElementById('listaErros');
    if (listaErros) {
        listaErros.innerHTML = '';
        listaErros.style.display = 'none';
    }
}

// Função para exibir lista de erros
function exibirErros(erros) {
    let listaErros = document.getElementById('listaErros');
    
    // Criar elemento se não existir
    if (!listaErros) {
        listaErros = document.createElement('ul');
        listaErros.id = 'listaErros';
        listaErros.style.color = 'red';
        listaErros.style.border = '1px solid #ff0000';
        listaErros.style.padding = '10px';
        listaErros.style.backgroundColor = '#ffe6e6';
        listaErros.style.borderRadius = '4px';
        
        const formulario = document.querySelector('form');
        formulario.parentNode.insertBefore(listaErros, formulario.nextSibling);
    }
    
    // Adicionar erros à lista
    listaErros.innerHTML = '';
    erros.forEach(erro => {
        const item = document.createElement('li');
        item.textContent = erro;
        listaErros.appendChild(item);
    });
    
    listaErros.style.display = 'block';
}

// Função para registrar obra na tabela
function registrarNaTabela(nome, autor, ano, periodo, tipo, detalhamento) {
    const tabela = document.getElementById('tabelaObras').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    
    // Adicionar células com os dados
    novaLinha.insertCell(0).textContent = nome;
    novaLinha.insertCell(1).textContent = autor;
    novaLinha.insertCell(2).textContent = ano;
    novaLinha.insertCell(3).textContent = periodo;
    novaLinha.insertCell(4).textContent = tipo;
    
    // Célula para ações (exibir detalhes e excluir)
    const celulaAcoes = novaLinha.insertCell(5);
    
    // Botão para exibir detalhes
    const btnDetalhes = document.createElement('button');
    btnDetalhes.textContent = 'Ver Detalhes';
    btnDetalhes.onclick = function() {
        exibirDetalhes(detalhamento);
    };
    
    // Botão para excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onclick = function() {
        excluirObra(novaLinha, nome);
    };
    
    celulaAcoes.appendChild(btnDetalhes);
    celulaAcoes.appendChild(btnExcluir);
    
    // Adicionar evento de clique na linha para exibir detalhes
    novaLinha.onclick = function(event) {
        // Evitar que o clique nos botões dispare o evento da linha
        if (event.target.tagName !== 'BUTTON') {
            exibirDetalhes(detalhamento);
        }
    };
}

// Função para exibir detalhes da obra
function exibirDetalhes(detalhamento) {
    // Criar ou atualizar modal de detalhes
    let modalDetalhes = document.getElementById('modalDetalhes');
    
    if (!modalDetalhes) {
        modalDetalhes = document.createElement('div');
        modalDetalhes.id = 'modalDetalhes';
        modalDetalhes.style.position = 'fixed';
        modalDetalhes.style.top = '50%';
        modalDetalhes.style.left = '50%';
        modalDetalhes.style.transform = 'translate(-50%, -50%)';
        modalDetalhes.style.backgroundColor = 'white';
        modalDetalhes.style.padding = '20px';
        modalDetalhes.style.border = '2px solid #2c3e50';
        modalDetalhes.style.borderRadius = '8px';
        modalDetalhes.style.zIndex = '1000';
        modalDetalhes.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        modalDetalhes.style.maxWidth = '500px';
        modalDetalhes.style.width = '90%';
        
        document.body.appendChild(modalDetalhes);
        
        // Adicionar overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '999';
        overlay.id = 'overlayDetalhes';
        
        // Fechar modal ao clicar no overlay
        overlay.onclick = function() {
            fecharModalDetalhes();
        };
        
        document.body.appendChild(overlay);
    }
    
    modalDetalhes.innerHTML = `
        <h3>Detalhamento da Obra</h3>
        <p>${detalhamento || 'Nenhum detalhamento informado.'}</p>
        <button onclick="fecharModalDetalhes()" style="margin-top: 10px;">Fechar</button>
    `;
}

// Função para fechar modal de detalhes
function fecharModalDetalhes() {
    const modal = document.getElementById('modalDetalhes');
    const overlay = document.getElementById('overlayDetalhes');
    
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}

// Função para excluir obra
function excluirObra(linha, nomeObra) {
    if (confirm(`Tem certeza que deseja excluir a obra "${nomeObra}"?`)) {
        linha.remove();
    }
}

// Função para limpar formulário após registro
function limparFormulario() {
    document.getElementById('nomeObra').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('anoObra').value = '';
    document.getElementById('periodoObra').value = '';
    document.getElementById('tipoObra').value = '';
    document.getElementById('detalhamento').value = '';
}

// Inicializar a tabela se não existir
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('tabelaObras')) {
        const tabela = document.createElement('table');
        tabela.id = 'tabelaObras';
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th>Nome da Obra</th>
                    <th>Autor</th>
                    <th>Ano</th>
                    <th>Período</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        document.body.appendChild(tabela);
    }
});