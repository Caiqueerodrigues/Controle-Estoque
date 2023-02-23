var estoqueLocal = [{
    nome: `Exemplo de ração`,
    categoria: `ração`,
    quantidadeKgCadaPacote: 15,
    quantidadeKG: 30,
    pacotes: 2
},
{
    nome: `Luck dog`,
    categoria: `ração`,
    quantidadeKgCadaPacote: 10,
    quantidadeKG: 40,
    pacotes: 4
},
{
    nome: `Mix`,
    categoria: `ração`,
    quantidadeKgCadaPacote: 5,
    quantidadeKG: 20,
    pacotes: 4
}]
// var estoqueLocal = 
// console.log(estoqueLocal)


const br = document.createElement(`br`)
let section = document.querySelector(`section`)
let divSeparador = document.getElementById(`separador`)
let divSeparador1 = ``
let divPai = ``
let mostrador = document.getElementById(`mostrador`)
let janela = document.getElementById(`janela`)
let btnSwitch = document.getElementById(`flexSwitchCheckChecked`)

//inicio
let divInicio = document.getElementById(`inicio`)
let btnDanger = document.querySelectorAll(`.btn-outline-danger`)
let btnLimpar = document.getElementById(`limparDados`)

//inicio Escolha de dados
function escolher () {
    if(!btnSwitch.checked) {
        console.log(localStorage)
        if(localStorage.length === 0) {
            salvarLocal()
        } else {
            estoqueLocal = JSON.parse(localStorage.getItem(`estoque`))
        }
    }
    divInicio.style.display=`none`
    document.getElementById(`limparDados`).style.display=`inline-block`
    document.querySelectorAll(`.btn-outline-danger`).forEach(item => {
        item.style.display=`inline-block`
    })
    section.style.display=`flex`
    inicioEstoque()
}
// divEstoque
let categoriaEstoque = document.getElementById(`categoria1`).innerText= estoqueLocal[0].categoria
let nomeProduto = document.getElementById(`produto1`).innerText = estoqueLocal[0].nome
let qtdEstoque = document.getElementById(`0`).innerText = estoqueLocal[0].quantidadeKG

function salvarLocal() {
    localStorage.setItem(`estoque`,JSON.stringify(estoqueLocal))
    estoqueLocal = JSON.parse(localStorage.getItem(`estoque`))
}
function inicioEstoque() {
    for (i = 0; i < estoqueLocal.length; i++) {
        divSeparador1 = divSeparador.cloneNode(false)
            divSeparador1.id = 'separador' + i
            divSeparador1.style.display=`flex`
        let pCategoria = document.createElement(`p`)
            pCategoria.classList.add(`produto`)
            pCategoria.innerText = estoqueLocal[i].categoria
        let pNome = document.createElement(`p`)
            pNome.innerText = estoqueLocal[i].nome
        var qtd = document.createElement(`div`)
            qtd.id = i
            qtd.classList.add(`estoque`)
            qtd.innerText = estoqueLocal[i].quantidadeKG

    
        divSeparador1.append(pCategoria, pNome, qtd)
        section.append(divSeparador1)
    }
}
//venda
function vender () {
    if(divPai.length != 0) {
        divPai.innerHTML = ``
    }
    const nomeProduto = document.createElement(`label`)
        nomeProduto.innerHTML = `<label for= "produto">Qual o nome do Produto da Venda?</label>`
    const produtoVendido = document.createElement(`input`)
        produtoVendido.type=`text`
        produtoVendido.classList.add(`inputs`)
        produtoVendido.style.width=`200px`
        produtoVendido.required
        produtoVendido.placeholder=`Ex: Ração Luck Dog`
        produtoVendido.id='produto'
        produtoVendido.style.marginBottom = `20px`
    const titleVenda = document.createElement(`label`)
        titleVenda.innerHTML=`<label for= quantidade"produto">Quantidade Vendida?(em KG ou g)</label>`
    const quantidadeVenda = document.createElement(`input`)
        quantidadeVenda.type = `number`
        quantidadeVenda.classList.add(`inputs`)
        quantidadeVenda.style.width=`100px`
        quantidadeVenda.required
        quantidadeVenda.id='quantidade'
        quantidadeVenda.placeholder=`EX: 1 ou 1.20`
    const vendaPacote = document.createElement(`label`)
        vendaPacote.innerHTML = `<label for= "pacote">Quantidade de Pacotes?</label>`
    let quantidadePacote = document.createElement(`input`)
        quantidadePacote.classList.add(`inputs`)
        quantidadePacote.type=`number`
        quantidadePacote.style.width=`40px`
        quantidadePacote.maxLength=`2`
        quantidadePacote.id='pacote'
        quantidadePacote.required
        quantidadePacote.placeholder=`0`
    const btnConfirmar = document.createElement(`button`)
        btnConfirmar.innerText = `Confirmar`
        btnConfirmar.classList.add(`btn`)
        btnConfirmar.classList.add(`btn-outline-success`)
        btnConfirmar.style.width='min-content'
        btnConfirmar.style.margin=`0 auto 20px`
    divPai = document.createElement(`div`)
        divPai.classList.add(`vendaDiv`)

    divPai.append(nomeProduto, produtoVendido,titleVenda, quantidadeVenda, vendaPacote, quantidadePacote, br, btnConfirmar)
    section.append(divPai)

    //venda
    btnConfirmar.addEventListener(`click`, () => {
        if (produtoVendido.value !== `` || quantidadeVenda.value !== ``) {
            let saidaProduto = produtoVendido.value
            console.log(saidaProduto, produtoVendido)
            if (quantidadePacote == ``) {
                quantidadePacote = 0
            }
            if(quantidadePacote.value < 0 ) {
                alert(`[ERRO] Verifique as Quantidades Informada`)
                return
            }
            const indiceVenda = estoqueLocal.findIndex(produto => produto.nome === saidaProduto)
            if (indiceVenda === -1 || indiceVenda === undefined) {
                alert(`[ERRO] Verifique o nome do produto informado!`)
            } else {
                if (quantidadeVenda.value > estoqueLocal[indiceVenda].quantidadeKG || quantidadePacote.value > estoqueLocal[indiceVenda].pacotes){
                    alert(`[ERRO] Estoque indísponivel`)
                } else {
                    estoqueLocal[indiceVenda].quantidadeKG = estoqueLocal[indiceVenda].quantidadeKG - Number(quantidadeVenda.value)
                    if (quantidadePacote.value >0) {
                        estoqueLocal[indiceVenda].pacotes = estoqueLocal[indiceVenda].pacotes - Number(quantidadePacote.value)
                        estoqueLocal[indiceVenda.quantidadeKG = estoqueLocal[indiceVenda].quantidadeKG - estoqueLocal[indiceVenda].quantidadeKgCadaPacote]
                        if (!btnSwitch.checked) {
                            salvarLocal()
                            console.log(btnSwitch)
                        }
                    }
                    divPai.innerHTML = ``
                    section.innerHTML = ``
                    inicioEstoque()
                    alert(`Venda Confirmada`)
                    console.log(estoqueLocal)
                    //aqui vai o comando para salvar localmente a estoque
                    // section.removeChild(divPai)
                }
            }          
        } else {
            alert(`[ERRO] Confirme as informações e tente Novamente`)
        }
    }) 
}
function entrada() {
    if(divPai.length != 0) {
        divPai.innerHTML = ``
    }
    const labelName = document.createElement(`label`)
        labelName.innerHTML = `<label for="produtoEntrada"> Qual nome da Ração: </label>`
    const inputName = document.createElement(`input`)
        inputName.type= `text`
        inputName.classList.add(`inputs`)
        inputName.style.width=`200px`
        inputName.required
        inputName.id= `produtoEntrada`
        inputName.placeholder=`Ex: Ração Luck Dog`
    const labelQuantidade = document.createElement(`label`)
        labelQuantidade.innerHTML = `<label for="qtdEntrada"> Quantidade em kilos: </label>`
    const inputEntrada = document.createElement(`input`)
        inputEntrada.type=`number`
        inputEntrada.id=`qtdEntrada`
        inputEntrada.style.width=`100px`
        inputEntrada.classList.add(`inputs`)
        inputEntrada.placeholder= `30 ou 20.5`
    const labelPacote = document.createElement(`label`)
        labelPacote.innerHTML= `<label for="qtdPacote"> Quantidade de pacotes: </label>`
    let inputPacote = document.createElement(`input`)
        inputPacote.type=`number`
        inputPacote.classList.add(`inputs`)
        inputPacote.style.width= `40px`
        inputPacote.placeholder = `12`
    const btnConfirmar = document.createElement(`button`)
        btnConfirmar.innerText = `Confirmar`
        btnConfirmar.classList.add(`btn`)
        btnConfirmar.classList.add(`btn-outline-success`)
        btnConfirmar.style.width='min-content'
        btnConfirmar.style.margin=`20px auto`
    divPai = document.createElement(`div`)
        divPai.classList.add(`vendaDiv`)
    
    divPai.append(labelName, inputName, labelQuantidade, inputEntrada, labelPacote, inputPacote, btnConfirmar)
    section.append(divPai)

    btnConfirmar.addEventListener(`click`, () => {
        if (inputPacote.value ===``) {
            inputPacote = 0
        }
        if(inputEntrada.value <= 0) {
            alert(`[ERRO] Valores inválidos para ENTRADAS`)
            return
        }
        if (inputPacote.value < 0) {
            alert(`[ERRO] Valores inválidos para ENTRADAS`)
            return
        }
        if (inputName.value === `` || inputEntrada.value === ``) {
            alert(`[ERRO] Verifique as informações`)
            return
        } 
        let EntradaProduto = inputName.value.toLowerCase()
        const indiceEntrada = estoqueLocal.findIndex(produto => produto.nome === EntradaProduto)
        if( indiceEntrada === -1 || indiceEntrada === undefined) {
            alert(`[ERRO] Verifique o nome informado`)
        } else {
            estoqueLocal[indiceEntrada].quantidadeKG = estoqueLocal[indiceEntrada].quantidadeKG + Number(inputEntrada.value)
            estoqueLocal[indiceEntrada].pacotes = (estoqueLocal[indiceEntrada].pacotes) + (Number(inputPacote.value))
            //aqui vai comando para salvar o estque localmente
            if (!btnConfirmar.checked) {
                salvarLocal()
            }
            divPai.innerHTML = ``
            section.innerHTML = ``
            inicioEstoque()
            alert(`Entrada Efetuada com Sucesso!`)
            divPai.innerHTML = ``
        }
    })
}
function cadastro() {
    if(divPai.length != 0) {
        divPai.innerHTML = ``
    }
    const labelCategoria = document.createElement(`label`)
        labelCategoria.innerHTML = `<label for="categoria"> Qual a Categoria: </label>`
    const inputCategoria = document.createElement(`input`)
        inputCategoria.id=`categoria`
        inputCategoria.type= `text`
        inputCategoria.classList.add(`inputs`)
        inputCategoria.placeholder = `Ex: Ração`
    const labelNomeProduto = document.createElement(`label`)
        labelNomeProduto.innerHTML = `<label for="nomeProduto"> Qual o nome do Produto: </label>`
    const inputNomeProduto = document.createElement(`input`)
        inputNomeProduto.type = `text`
        inputNomeProduto.classList.add(`inputs`)
        inputNomeProduto.id=`nomeProduto`
        inputNomeProduto.placeholder = `Ex: Filhotes Felizes`
    const labelQuantidade = document.createElement(`label`)
        labelQuantidade.innerHTML = `<label for="quantidadeKg"> Qual a quantidade em Kg/Un: </label>`
    const inputQuantidade = document.createElement(`input`)
        inputQuantidade.id= `quantidadeKg`
        inputQuantidade.type=`number`
        inputQuantidade.classList.add(`inputs`)
        inputQuantidade.placeholder = `2 ou 2.5`
        inputQuantidade.style.width = `60px`
    const labelQuantidadePct = document.createElement(`label`)
        labelQuantidadePct.innerHTML = `<label for="quantidadePct"> Qual a quantidade de Pacotes: </label>`
    const inputQuantidadePct = document.createElement(`input`)
        inputQuantidadePct.id= `quantidadePct`
        inputQuantidadePct.type=`number`
        inputQuantidadePct.classList.add(`inputs`)
        inputQuantidadePct.placeholder = `10`
        inputQuantidadePct.style.width = `60px`
    const labelQuantidadeKgPct = document.createElement(`label`)
        labelQuantidadeKgPct.innerHTML = `<label for="quantidadeKgPct"> Qual a quantidade de Kg/Un em cada Pacote: </label>`
    const inputQuantidadeKgPct = document.createElement(`input`)
        inputQuantidadeKgPct.id= `quantidadeKgPct`
        inputQuantidadeKgPct.type=`number`
        inputQuantidadeKgPct.classList.add(`inputs`)
        inputQuantidadeKgPct.placeholder = `10`
        inputQuantidadeKgPct.style.width = `60px`
    const btnConfirmar = document.createElement(`button`)
        btnConfirmar.innerText = `Confirmar`
        btnConfirmar.classList.add(`btn`)
        btnConfirmar.classList.add(`btn-outline-success`)
        btnConfirmar.style.width='min-content'
        btnConfirmar.style.margin=`20px auto`
    divPai = document.createElement(`div`)
        divPai.classList.add(`vendaDiv`)

    divPai.append(labelCategoria, inputCategoria, labelNomeProduto, inputNomeProduto, labelQuantidade, inputQuantidade, labelQuantidadePct, inputQuantidadePct, labelQuantidadeKgPct, inputQuantidadeKgPct, btnConfirmar)
    section.append(divPai)

    btnConfirmar.addEventListener(`click`, () =>{
        if (inputCategoria.value === `` || inputNomeProduto.value === ``) {
            alert(`[ERRO] Verifique o Nome e/ou a Categoria`)
            return
        }
        if (inputQuantidade.value === `` || inputQuantidadeKgPct.value === `` || inputQuantidadePct.value === ``) {
            alert(`[ERRO] Quantidades precisam ser Preenchidas`)
            console.log(inputQuantidade.value, inputQuantidadeKgPct.value, inputQuantidadePct.value)
            return
        }
        if (inputQuantidade.value <= 0 || inputQuantidadeKgPct.value <= 0 || inputQuantidadePct.value <= 0) {
            alert(`[ERRO] Quantidades precisam ser Superiores a 0`)
            return
        }
        let cadastroProduto = inputNomeProduto.value.toLowerCase()
        const indiceCadastro = estoqueLocal.findIndex(produto => produto.nome === cadastroProduto)
        if( indiceCadastro === -1 || indiceCadastro === undefined) {
            estoqueLocal.push({nome: inputNomeProduto.value, categoria: inputCategoria.value, quantidadeKG: Number(inputQuantidade.value), quantidadeKgCadaPacote: Number(inputQuantidadeKgPct.value), pacotes: Number(inputQuantidadePct.value)},
            )
            console.log(estoqueLocal)
            alert(`Cadastro de Produto Realizado com sucesso`)
            //aqui vai o comando para salvar localmente
            divPai.innerHTML = ``
        } else {
            alert(`[ERRO] Verifique o nome informado, produto já Existe`)
        }
        section.innerHTML = ``
        divPai.remove(labelCategoria, inputCategoria, labelNomeProduto, inputNomeProduto, labelQuantidade, inputQuantidade, labelQuantidadePct, inputQuantidadePct, labelQuantidadeKgPct, inputQuantidadeKgPct, btnConfirmar)
        salvarLocal()
        inicioEstoque()
    })
}
function consulta() {
    if(divPai.length != 0) {
        divPai.innerHTML = ``
    }
    const paragraph = document.createElement(`p`).innerText = `Deseja Pesquisar por: `
    const labelPesqCat = document.createElement(`label`)
        labelPesqCat.innerHTML = `<label for ="categoria"> Categoria `
    const pesquisaCategoria = document.createElement(`input`)
        pesquisaCategoria.type=`radio`
        pesquisaCategoria.value = `categoria`
        pesquisaCategoria.id = `categoria`
        pesquisaCategoria.name = `pesquisa`
        pesquisaCategoria.classList.add(`radio`)
    const labelPesqNome = document.createElement(`label`)
        labelPesqNome.innerHTML = `<label for ="nome"> Nome `
    const pesquisaNome = document.createElement(`input`)
        pesquisaNome.type=`radio`
        pesquisaNome.id = `nome`
        pesquisaNome.value = `nome`
        pesquisaNome.name = `pesquisa`
        pesquisaNome.classList.add(`radio`)
        pesquisaNome.setAttribute("checked", true)
    const labelPesqQtd = document.createElement(`label`)
        labelPesqQtd.innerHTML = `<label for ="qtd"> Quantidade de Kg no Saco `
    const pesquisaQtd = document.createElement(`input`)
        pesquisaQtd.type=`radio`
        pesquisaQtd.id = `qtd`
        pesquisaQtd.value = `quantidade`
        pesquisaQtd.name = `pesquisa`
        pesquisaQtd.classList.add(`radio`)
    const btnConfirmar = document.createElement(`button`)
        btnConfirmar.innerText = `Confirmar`
        btnConfirmar.classList.add(`btn`)
        btnConfirmar.classList.add(`btn-outline-success`)
        btnConfirmar.style.width='min-content'
        btnConfirmar.style.margin=`20px auto`
    divPai = document.createElement(`div`)
        divPai.classList.add(`vendaDiv`)

    labelPesqCat.append(pesquisaCategoria)
    labelPesqNome.append(pesquisaNome)
    labelPesqQtd.append(pesquisaQtd)
    divPai.append(paragraph , labelPesqCat, labelPesqNome, labelPesqQtd, btnConfirmar)
    section.append(divPai)

    btnConfirmar.addEventListener(`click`, () => {
        let opcaoPesquisa = ``
            opcaoPesquisa = document.querySelector(`input[name="pesquisa"]:checked`).value
        if( opcaoPesquisa === `nome`) {
            if(divPai.length != 0) {
                divPai.innerHTML = ``
            }
            const inputPesquisa = document.createElement(`input`)
                inputPesquisa.type=`text`
                inputPesquisa.placeholder=`Nome da Ração`
                inputPesquisa.classList.add(`inputs`)
                divPai.innerHTML = ``
            divPai.append(inputPesquisa, btnConfirmar)
            section.append(divPai)
            btnConfirmar.addEventListener(`click`, () => {
                if ( inputPesquisa.value === ``) {
                    alert(`[ERRO] Digite um nome valido`)
                } else {
                let pesquisaPorNome = inputPesquisa.value
                const indicePesquisa = estoqueLocal.findIndex(produto => produto.nome === pesquisaPorNome)
                    if (indicePesquisa === -1 || indicePesquisa === undefined) {
                        alert(`[ERRO] Verifique o nome Digitado`)
                        return
                    } else {
                        let resultadoPesquisa = ``
                        resultadoPesquisa = ` Categoria: ${estoqueLocal[indicePesquisa].categoria},
                        Nome: ${estoqueLocal[indicePesquisa].nome},
                        Quantidade de Kg's: ${estoqueLocal[indicePesquisa].quantidadeKG},
                        Quantidade de Kg em cada Pacote: ${estoqueLocal[indicePesquisa].quantidadeKgCadaPacote},
                        Quantidade de Pacotes ${estoqueLocal[indicePesquisa].pacotes}`

                        section.style.height=`max-content`
                        janela.style.display=`block`
                        mostrador.innerText =resultadoPesquisa
                    }
                }
            })
        }
        if (opcaoPesquisa === `categoria`) {
            if(divPai.length != 0) {
                divPai.innerHTML = ``
            }
            const inputPesquisa = document.createElement(`input`)
                inputPesquisa.type=`text`
                inputPesquisa.placeholder=`Categoria do Produto`
                inputPesquisa.classList.add(`inputs`)
            divPai.append(inputPesquisa, btnConfirmar)
            section.append(divPai)
            btnConfirmar.addEventListener(`click`, () => {
                if ( inputPesquisa.value === ``) {
                    alert(`[ERRO] Digite uma Categoria válida`)
                } else {
                let pesquisaPorCategoria = inputPesquisa.value
                const indicePesquisa = estoqueLocal.findIndex(produto => produto.categoria === pesquisaPorCategoria.toLowerCase())
                    if (indicePesquisa === -1 || indicePesquisa === undefined) {
                        alert(`[ERRO] Verifique o nome Digitado`)
                        return
                    } else {
                        for(i=0; estoqueLocal.length > i; i++) {
                            let pesquisaPorCategoria = ``
                            pesquisaPorCategoria += ` Categoria: ${estoqueLocal[i].categoria},
                            Nome: ${estoqueLocal[i].nome},
                            Quantidade de Kg's: ${estoqueLocal[i].quantidadeKG},
                            Quantidade de Kg em cada Pacote: ${estoqueLocal[i].quantidadeKgCadaPacote},
                            Quantidade de Pacotes ${estoqueLocal[i].pacotes} \n\n`
                            
                            section.style.height=`max-content`
                            janela.style.display=`block`
                            console.log(estoqueLocal[indicePesquisa])
                            mostrador.innerText += pesquisaPorCategoria
                        }
                    }
                }
            })
        }
        if (opcaoPesquisa === `quantidade`){
            if(divPai.length != 0) {
                divPai.innerHTML = ``
            }
            const inputPesquisa = document.createElement(`input`)
                inputPesquisa.type=`number`
                inputPesquisa.placeholder=`Kg por Saco`
                inputPesquisa.style.width=`120px`
                inputPesquisa.classList.add(`inputs`)
            divPai.append(inputPesquisa, btnConfirmar)
            section.append(divPai)
            btnConfirmar.addEventListener(`click`, () => {
                if ( inputPesquisa.value === ``) {
                    alert(`[ERRO] Digite uma Categoria válida`)
                } else {
                let pesquisaPorQuantidade = Number(inputPesquisa.value)
                const indicePesquisa = estoqueLocal.findIndex(produto => produto.quantidadeKgCadaPacote === pesquisaPorQuantidade)
                    if (indicePesquisa === -1 || indicePesquisa === undefined) {
                        alert(`[ERRO] Verifique a Quantidade informada`)
                        return
                    } else {
                        section.style.height=`max-content`
                        janela.style.display=`block`
                        mostrador.innerText = `Categoria: ${estoqueLocal[indicePesquisa].categoria}
                        Nome: ${estoqueLocal[indicePesquisa].nome}
                        Quantidade Kg: ${estoqueLocal[indicePesquisa].quantidadeKG}
                        Quantidade Kg Pacote: ${estoqueLocal[indicePesquisa].quantidadeKgCadaPacote}
                        Pacotes: ${estoqueLocal[indicePesquisa].pacotes}`
                    }
                }
            })
        }
        document.getElementById(`fechar`).addEventListener(`click`, () => {
            mostrador.innerText = ``
            janela.style.display=`none`
            divPai.innerHTML = ``
        })
    })
}
function consultaEstoque() {
    if(divPai.length != 0) {
        divPai.innerHTML = ``
    }
    mostrador.innerText = ``
    for(i=0; estoqueLocal.length > i; i++) {
        let resultadoEstoque = ``
        resultadoEstoque += ` Categoria: ${estoqueLocal[i].categoria},
        Nome: ${estoqueLocal[i].nome},
        Quantidade de Kg's: ${estoqueLocal[i].quantidadeKG},
        Quantidade de Kg em cada Pacote: ${estoqueLocal[i].quantidadeKgCadaPacote},
        Quantidade de Pacotes ${estoqueLocal[i].pacotes} \n\n`
        
        section.style.height=`max-content`
        janela.style.display=`block`
        mostrador.innerText += resultadoEstoque
        // console.log(estoqueLocal[i])

    }
    document.getElementById(`fechar`).addEventListener(`click`, () => {
        mostrador.innerText = ``
        janela.style.display=`none`
    })
}
function limparDados() {
    let confimacao = confirm(`Tem certeza que deseja APAGAR todos os Dados Salvos? 
    (Após confirmado, Não há volta)`)
    if (confimacao === true) {
        localStorage.clear()
        alert(`Dados Apagados Com Sucesso!`)
        location.reload()
    } else {
        alert(`Operação Cancelada`)
    }
}