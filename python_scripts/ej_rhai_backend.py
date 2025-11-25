# ej_rhai_backend.py
# Este arquivo Python é um placeholder para a lógica de backend que processaria
# a busca de candidatos, a análise de desempenho e a análise de dados do EJ RHAI.

import json

def search_candidates_ai(job_description):
    """
    Simula a busca de candidatos por IA baseada na descrição do trabalho.
    """
    print(f"IA buscando candidatos para: {job_description}")
    
    # Simulação de dados retornados pela IA
    candidates = [
        {"name": "Maria Santos", "specialization": "Programadora", "itd": 8.9, "match": "95%"},
        {"name": "Ana Oliveira", "specialization": "Analista de Sistemas", "itd": 9.1, "match": "92%"},
        {"name": "Pedro Costa", "specialization": "Técnico em Eletrônica", "itd": 8.5, "match": "85%"},
        {"name": "João Silva", "specialization": "Operador Agrícola", "itd": 8.7, "match": "78%"},
        {"name": "Carlos Mendes", "specialization": "Operador Agrícola", "itd": 8.3, "match": "72%"}
    ]
    
    return {"status": "success", "message": "Busca por IA concluída.", "results": candidates}

def analyze_employee_performance(employee_id):
    """
    Simula a análise de desempenho de um funcionário.
    """
    print(f"Analisando desempenho do funcionário ID: {employee_id}")
    
    # Simulação de dados de desempenho
    performance_data = {
        "employee_id": employee_id,
        "tech_score": 8.7,
        "behavior_score": 7.6,
        "itd_score": 8.26,
        "analysis": "Desempenho técnico crescente, leve queda emocional. Recomendado acompanhamento leve e incentivo de pausas."
    }
    
    return {"status": "success", "message": "Análise de desempenho concluída.", "data": performance_data}

def custom_data_analysis(data_list):
    """
    Simula a análise de dados customizados.
    """
    print(f"Analisando {len(data_list)} pontos de dados.")
    
    try:
        numbers = [float(x) for x in data_list]
    except ValueError:
        return {"error": "Dados inválidos. Certifique-se de que são números."}

    if not numbers:
        return {"error": "Nenhum número válido encontrado"}

    count = len(numbers)
    total_sum = sum(numbers)
    mean = total_sum / count
    
    # Simulação de cálculo de desvio padrão
    variance = sum([(x - mean) ** 2 for x in numbers]) / count
    std_dev = variance ** 0.5

    analysis_result = {
        "status": "success",
        "count": count,
        "mean": round(mean, 2),
        "std_dev": round(std_dev, 2),
        "insight": f"Análise de {count} valores. Média: {round(mean, 2)}, Desvio Padrão: {round(std_dev, 2)}. Os dados mostram uma variação de {round(max(numbers) - min(numbers), 2)} unidades."
    }

    return analysis_result

# Exemplo de uso (apenas para teste interno do script)
if __name__ == "__main__":
    print("--- Teste de Busca de Candidatos ---")
    search_result = search_candidates_ai("Programador Python Pleno")
    print(json.dumps(search_result, indent=4))

    print("\n--- Teste de Análise de Desempenho ---")
    performance_result = analyze_employee_performance(101)
    print(json.dumps(performance_result, indent=4))

    print("\n--- Teste de Análise de Dados Customizados ---")
    data_result = custom_data_analysis([100, 150, 200, 180, 220])
    print(json.dumps(data_result, indent=4))
