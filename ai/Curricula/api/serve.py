from fastapi import FastAPI
from fastapi.responses import JSONResponse
from agents.planner import PlannerAgent
from agents.tasker import TaskerAgent
from agents.task_elaboration import ElaboratorAgent 
from pydantic import BaseModel
import re
import json

from dotenv import load_dotenv
import os

"""
TODO: 
- Move the api business logic to a separate module
- Add proper response parsing
"""

class planIdea(BaseModel):
     goal: str
     duration: str
     skills: str


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.post("/generate-plan")
async def generate_plan(request: planIdea):    
    planner_agent = PlannerAgent()
    tasker_agent = TaskerAgent()
    elaborator_agent = ElaboratorAgent()  

    planner_response = planner_agent.run(
        goal=request.goal,
        duration=request.duration,
        skills=request.skills
    )
    
    tasker_response = tasker_agent.run(goal=planner_response)

    def extract_weeks(xml_string: str) -> list[str]:
        week_blocks = re.findall(r"<week>.*?</week>", xml_string, re.DOTALL)
        return [block.strip() for block in week_blocks]

    weekly_xml = extract_weeks(tasker_response)
    
    json_response = dict()

    for i in range(len(weekly_xml)):
        current_week = weekly_xml[i]
        elaborator_response = elaborator_agent.run(goal=current_week)
        
        # Remove ```json or ``` if present
        elaborator_response = re.sub(r"^```(?:json)?|```$", "", elaborator_response.strip(), flags=re.MULTILINE).strip()

        #remove everything before the first `{` and after the last `}`
        start = elaborator_response.find("{")
        end = elaborator_response.rfind("}") + 1
        json_str = elaborator_response[start:end]
        
        json_response[f'week_{i+1}'] = json.loads(json_str)
    print(json_response)
    print(type(json_response))
    # return json_response
    
    try:
        parsed_json = json_response
    except json.JSONDecodeError as e:
        return JSONResponse(status_code=500, content={"error": "Invalid JSON", "details": str(e)})
    
    return JSONResponse(content=parsed_json)


