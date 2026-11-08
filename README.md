# Fora de Ordem

Visualizador de algoritmos de ordenação feito para a Feira de Extensão de Ciência da Computação do ICMC-USP, na disciplina SCC0201.

**[Abrir o projeto](https://fora-de-ordem.vercel.app)**

## Como funciona

- **Ordenar:** acompanha cada comparação e escrita, com pseudocódigo, contadores e navegação pelos passos.
- **Comparar:** coloca dois ou quatro algoritmos para ordenar cópias da mesma lista. A posição depende da quantidade de passos, não do tempo de CPU.
- **Medir:** testa os seis algoritmos com listas de 10 a 2.000 números. Os resultados podem ser baixados em CSV.

Inclui Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort e Heap Sort. As listas podem ser aleatórias, quase ordenadas, inversas, com números repetidos ou digitadas manualmente.

## Rodar localmente

Abra `index.html` no navegador. Não precisa instalar dependências nem fazer build. Estilos, fontes e scripts estão no arquivo, então a aplicação também funciona offline.

O tema fica salvo no navegador. O som é opcional e só começa depois de ativado pelo botão.

## Alguns detalhes

A ordenação registra snapshots antes de iniciar a animação. O player reproduz esses passos, permitindo pausar, voltar e mudar a velocidade sem alterar a execução do algoritmo.

Uma troca conta como duas escritas. No Merge Sort, as escritas no vetor auxiliar também entram na contagem. O tempo da aba Ordenar mede a animação; a aba Medir usa uma Worker, com aquecimento e mediana de cinco execuções por tamanho. A medição inclui a instrumentação dos contadores.

## Testes

Com Node.js instalado:

```sh
node --test tests/sorting.test.cjs
```

Os testes verificam a saída dos seis algoritmos, preservação da entrada, snapshots imutáveis, posições finalizadas e contadores conhecidos.

## Autores

Fábio Machado da Silva e Victor Domingues Paccini.

SCC0201 — Introdução à Ciência da Computação II · ICMC-USP, São Carlos.

As fontes Inter e JetBrains Mono estão incorporadas. Os avisos de licença estão em [LICENCAS-FONTES.txt](LICENCAS-FONTES.txt).
