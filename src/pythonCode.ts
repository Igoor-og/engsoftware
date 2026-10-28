export const FULL_PYTHON_SCRIPT = `# ========================================================
# CALCULADORA BÁSICA EM PYTHON COM 4 OPERAÇÕES
# Criado para iniciantes em programação
# Autor: Igor Almeida (@igoralmeidall | igoralmeida.online)
# ========================================================

def somar(a: float, b: float) -> float:
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a: float, b: float) -> float:
    """Retorna a subtração entre dois números."""
    return a - b

def multiplicar(a: float, b: float) -> float:
    """Retorna o produto da multiplicação de dois números."""
    return a * b

def dividir(a: float, b: float):
    """
    Retorna a divisão do primeiro número pelo segundo.
    Evita erro matemático ao dividir por zero.
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def exibir_menu():
    """Exibe o menu de operações disponíveis no terminal."""
    print("\\n" + "=" * 36)
    print("      CALCULADORA DO IGOR ALMEIDA    ")
    print("=" * 36)
    print("  [1] + Adição")
    print("  [2] - Subtração")
    print("  [3] * Multiplicação")
    print("  [4] / Divisão")
    print("  [5] H Ver Histórico")
    print("  [0] S Sair do programa")
    print("=" * 36)

def main():
    """Função principal que gerencia o fluxo da aplicação."""
    historico = []  # Lista para armazenar cálculos realizados
    
    print("Olá! Bem-vindo(a) à sua Calculadora em Python.")

    # Loop infinito: o programa continua rodando até o usuário escolher sair
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (0 a 5): ").strip()

        # 1. Opção para encerrar
        if opcao == "0" or opcao.lower() == "s":
            print("\\nObrigado por usar a calculadora! Bons estudos na programação.")
            break

        # 2. Opção para visualizar histórico
        elif opcao == "5" or opcao.lower() == "h":
            print("\\n--- HISTÓRICO DE CÁLCULOS ---")
            if not historico:
                print("Nenhum cálculo registrado ainda.")
            else:
                for idx, item in enumerate(historico, start=1):
                    print(f"{idx}. {item}")
            continue

        # 3. Validação da opção das 4 operações básicas
        elif opcao not in ["1", "2", "3", "4", "+", "-", "*", "/"]:
            print("\\n[!] Opção inválida. Digite 1, 2, 3, 4, 5 ou 0.")
            continue

        # 4. Entrada dos números com tratamento de erros
        try:
            num1 = float(input("Digite o primeiro número: ").replace(",", "."))
            num2 = float(input("Digite o segundo número: ").replace(",", "."))
        except ValueError:
            print("\\n[!] Erro: Você deve digitar apenas números válidos (ex: 10 ou 3.5).")
            continue

        # 5. Identificação da operação e chamada da função correta
        if opcao in ["1", "+"]:
            simbolo = "+"
            resultado = somar(num1, num2)
        elif opcao in ["2", "-"]:
            simbolo = "-"
            resultado = subtrair(num1, num2)
        elif opcao in ["3", "*"]:
            simbolo = "*"
            resultado = multiplicar(num1, num2)
        elif opcao in ["4", "/"]:
            simbolo = "/"
            resultado = dividir(num1, num2)

        # 6. Apresentação do resultado e salvamento no histórico
        if isinstance(resultado, str) and "Erro" in resultado:
            print(f"\\n❌ {resultado}")
        else:
            registro = f"{num1} {simbolo} {num2} = {resultado}"
            historico.append(registro)
            print(f"\\n✅ Resultado: {registro}")

# Garante que o script rode apenas quando executado diretamente
if __name__ == "__main__":
    main()
`;

export const PYTHON_CORE_EXPLANATIONS = [
  {
    id: 'componentes',
    title: '1. Quais são os principais componentes do código?',
    badge: 'Estrutura & Blocos',
    items: [
      {
        term: 'Funções Operacionais (def)',
        detail: 'Pequenos blocos reutilizáveis (somar, subtrair, multiplicar, dividir). Cada uma recebe dois números como argumentos (a e b) e retorna (return) o cálculo correspondente.'
      },
      {
        term: 'Menu de Navegação (exibir_menu)',
        detail: 'Função responsável por desenhar a interface visual no terminal, listando as opções numeradas de 1 a 4, histórico e saída.'
      },
      {
        term: 'Loop Principal (while True)',
        detail: 'Mantém o programa em execução contínua, permitindo que você realize quantos cálculos quiser sem precisar reiniciar o script a cada conta.'
      },
      {
        term: 'Estrutura de Armazenamento (Lista historico = [])',
        detail: 'Uma lista na memória onde cada conta calculada é guardada como texto para consulta posterior através do comando append().'
      },
      {
        term: 'Tratamento de Exceções (try / except)',
        detail: 'Mecanismo de proteção. Se o usuário digitar letras em vez de números, o programa captura o erro de tipo (ValueError) amigavelmente em vez de travar e fechar.'
      },
      {
        term: 'Ponto de Entrada (if __name__ == "__main__")',
        detail: 'Boas práticas profissionais em Python: garante que a função main() só seja executada quando o arquivo for rodado diretamente no terminal.'
      }
    ]
  },
  {
    id: 'entrada_identificacao',
    title: '2. Como a aplicação recebe os números e identifica a operação?',
    badge: 'Entrada de Dados (I/O)',
    items: [
      {
        term: 'Coleta de Dados com input()',
        detail: 'A função nativa input("...") interrompe o programa e aguarda o usuário digitar um valor no teclado e pressionar Enter. Por padrão, o Python lê essa entrada como texto (String).'
      },
      {
        term: 'Conversão Numérica com float()',
        detail: 'Para fazer contas matemáticas, o texto precisa virar número decimal. Usamos float(input(...)). Usamos também .replace(",", ".") para aceitar vírgula (padrão brasileiro) e convertê-la no ponto decimal do Python.'
      },
      {
        term: 'Identificação da Operação (Condicionais if / elif / else)',
        detail: 'A variável opcao armazena o que o usuário escolheu. O Python compara essa escolha usando elif opcao in ["1", "+"]: se for 1 ou +, ele sabe que é Adição; se for 2 ou -, Subtração; se 3 ou *, Multiplicação; e se 4 ou /, Divisão.'
      },
      {
        term: 'Validação Prévia',
        detail: 'Se o usuário digitar uma opção fora do previsto (por exemplo "9" ou "abc"), o bloco elif opcao not in [...] avisa imediatamente sobre a opção inválida antes mesmo de pedir os números.'
      }
    ]
  },
  {
    id: 'logica_calculos',
    title: '3. Como a lógica de programação realiza cálculos e apresenta resultados?',
    badge: 'Processamento & Saída',
    items: [
      {
        term: 'Operadores Matemáticos Nativos',
        detail: 'O Python usa símbolos universais: + para soma, - para subtração, * para multiplicação e / para divisão com casas decimais.'
      },
      {
        term: 'Regra de Negócio: Proteção contra Divisão por Zero',
        detail: 'Na matemática, dividir qualquer número por 0 é indefinido. Antes de calcular a / b, o código testa if b == 0: e retorna uma mensagem de aviso elegante, impedindo o erro ZeroDivisionError do sistema operacional.'
      },
      {
        term: 'Armazenamento do Resultado em Variável',
        detail: 'A variável resultado recebe o valor retornado pela função chamada (ex: resultado = multiplicar(num1, num2)).'
      },
      {
        term: 'Formatação Elegante com F-Strings',
        detail: 'Utilizamos f"{num1} {simbolo} {num2} = {resultado}". As f-strings (format strings) interpolam as variáveis diretamente dentro do texto, deixando a saída clara tanto para o usuário quanto para salvar no histórico.'
      }
    ]
  }
];
