import os
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from core.llm_client import LLMClient


class TaskerAgent:
    def __init__(self):
        with open("prompts/tasker.txt", "r") as file:
            self.template = file.read()

        self.prompt = PromptTemplate(
            input_variables=["goal"],
            template=self.template
        )

        self.llm = LLMClient.get_llm()

        self.chain = self.prompt | self.llm

    def run(self, goal: str) -> str:
        return self.chain.invoke({
            "goal": goal,
        }).content
