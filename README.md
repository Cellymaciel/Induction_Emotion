# 🚀 Inducing Emotion App: Indução e Reconhecimento de Emoções

## Visão Geral do Projeto
Este projeto de iniciação científica, desenvolvido na Universidade Federal do Paraná (UFPR), apresenta o aplicativo **Inducing Emotion**. Ele foi criado com o objetivo de **induzir emoções específicas** (alegria, tristeza, raiva, surpresa, neutralidade) em usuários por meio de **estímulos audiovisuais cuidadosamente selecionados**. A principal meta é testar a eficácia dessa indução emocional e identificar padrões através da análise facial em tempo real. O projeto é um campo de grande importância nas ciências psicológicas e serve como base para aprimorar a interação humano-máquina, como no caso do Pia Robot.

## ✨ Como Funciona
O aplicativo opera da seguinte forma:
1.  **Seleção de Estímulos:** Vídeos curtos, cientificamente validados por meio de pesquisa, são apresentados ao usuário. Cada vídeo é projetado para evocar uma emoção específica.
2.  **Captura e Análise Facial Contínua:** Durante a exibição dos vídeos, o aplicativo realiza a captura de imagens faciais dos usuários a cada 2 segundos. Essas imagens são processadas pela biblioteca **DeepFace**, que identifica e analisa as expressões faciais associadas a diferentes emoções, baseando-se em estudos renomados como os de Paul Ekman.
3.  **Validação e Análise de Padrões:** A emoção detectada pelo DeepFace é comparada com a emoção esperada pelo estímulo do vídeo. O objetivo é testar a eficácia da indução emocional e identificar padrões de como os estímulos audiovisuais influenciam as emoções humanas, por meio da precisão da análise facial.

## 🎯 Objetivo e Impacto
O principal objetivo do Inducing Emotion é contribuir para a compreensão de como diferentes estímulos influenciam as emoções humanas e utilizar essa compreensão para aprimorar as interações entre pessoas e tecnologias. Este aplicativo pode servir como base para futuras pesquisas e no desenvolvimento de sistemas mais empáticos, como robôs interativos que respondem de forma mais humanizada às emoções dos usuários.

## 🛠️ Tecnologias Utilizadas
* **Desenvolvimento Mobile (Front-end):** `React Native` (para Android)
* **Linguagem de Programação (Back-end):** `Java`
* **Framework (Back-end):** `Spring Boot`
* **Banco de Dados:** `PostgreSQL`
* **Reconhecimento Facial:** `DeepFace` (biblioteca)
* **Controle de Versão:** `Git`

## 💡 Desafios e Aprendizados
* **Integração Complexa:** Conectar o front-end em React Native com o back-end Spring Boot e a biblioteca DeepFace para análise em tempo real.
* **Validação Científica de Estímulos:** Seleção e pesquisa aprofundada de vídeos eficazes para indução emocional.
* **Processamento de Imagens Faciais:** Gerenciamento eficiente da captura e análise de imagens em intervalos curtos.
* **Análise e Interpretação de Dados:** Avaliação da precisão da indução emocional e identificação de padrões comportamentais.
* **Abordagem Interdisciplinar:** Colaboração na interface entre as ciências psicológicas e a ciência da computação para um projeto coeso.
