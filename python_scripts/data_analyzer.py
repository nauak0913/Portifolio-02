# data_analyzer.py
# Este arquivo Python é um placeholder para a lógica de backend que processaria
# dados e cálculos complexos, caso o projeto fosse full-stack.

import json

def analyze_data(data_list):
    """
    Simula uma análise de dados complexa em Python.
    Calcula estatísticas básicas e retorna um JSON.
    """
    if not data_list:
        return {"error": "Lista de dados vazia"}

    try:
        # Converte strings para float, ignorando erros
        numbers = [float(x) for x in data_list if x.strip()]
    except ValueError:
        return {"error": "Dados inválidos. Certifique-se de que são números."}

    if not numbers:
        return {"error": "Nenhum número válido encontrado"}

    count = len(numbers)
    total_sum = sum(numbers)
    mean = total_sum / count
    
    # Simulação de cálculo de desvio padrão (apenas para demonstração)
    variance = sum([(x - mean) ** 2 for x in numbers]) / count
    std_dev = variance ** 0.5

    # Simulação de um resultado de análise
    analysis_result = {
        "status": "success",
        "count": count,
        "sum": round(total_sum, 2),
        "mean": round(mean, 2),
        "std_dev": round(std_dev, 2),
        "message": "Análise de dados simulada concluída com sucesso em Python."
    }

    return analysis_result

# Exemplo de uso (apenas para teste interno do script)
if __name__ == "__main__":
    sample_data = ["10", "20", "30", "40", "50"]
    result = analyze_data(sample_data)
    print(json.dumps(result, indent=4))

    sample_data_invalid = ["10", "abc", "30"]
    result_invalid = analyze_data(sample_data_invalid)
    print(json.dumps(result_invalid, indent=4))
