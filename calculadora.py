# ========================================================
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
    print("\n" + "=" * 36)
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
            print("\nObrigado por usar a calculadora! Bons estudos na programação.")
            break

        # 2. Opção para visualizar histórico
        elif opcao == "5" or opcao.lower() == "h":
            print("\n--- HISTÓRICO DE CÁLCULOS ---")
            if not historico:
                print("Nenhum cálculo registrado ainda.")
            else:
                for idx, item in enumerate(historico, start=1):
                    print(f"{idx}. {item}")
            continue

        # 3. Validação da opção das 4 operações básicas
        elif opcao not in ["1", "2", "3", "4", "+", "-", "*", "/"]:
            print("\n[!] Opção inválida. Digite 1, 2, 3, 4, 5 ou 0.")
            continue

        # 4. Entrada dos números com tratamento de erros
        try:
            num1 = float(input("Digite o primeiro número: ").replace(",", "."))
            num2 = float(input("Digite o segundo número: ").replace(",", "."))
        except ValueError:
            print("\n[!] Erro: Você deve digitar apenas números válidos (ex: 10 ou 3.5).")
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
            print(f"\n❌ {resultado}")
        else:
            registro = f"{num1} {simbolo} {num2} = {resultado}"
            historico.append(registro)
            print(f"\n✅ Resultado: {registro}")

# Garante que o script rode apenas quando executado diretamente
if __name__ == "__main__":
    main()
