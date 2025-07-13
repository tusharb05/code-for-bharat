import os
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from core.llm_client import LLMClient

class PlannerAgent:
    def __init__(self):
        # Load prompt template from file
        with open("prompts/planner.txt", "r") as file:
            self.template = file.read()

        self.prompt = PromptTemplate(
            input_variables=["goal", "duration", "skills"],
            template=self.template
        )

        self.llm = LLMClient.get_llm()

        self.chain = self.prompt | self.llm

    def run(self, goal: str, duration: str, skills: str) -> str:
        llm_reponse = self.chain.invoke({
            "goal": goal,
            "duration": duration,
            "skills": skills
        })

        return llm_reponse.content
    
