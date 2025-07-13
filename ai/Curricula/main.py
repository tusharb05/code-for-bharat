from agents.planner import PlannerAgent
from agents.tasker import TaskerAgent
from agents.task_elaboration import ElaboratorAgent 
from testing_data import dummy_planner_response, dummy_tasker_response, dummy_weekly_xml, dummy_elaborator_response
import re
import json


import uvicorn
from api.serve import app

from dotenv import load_dotenv
import os


def main(mode: str = "debug"):
    load_dotenv()
    # Set up LLM

    if mode == "debug":
        # Set up PlannerAgent
        planner_agent = PlannerAgent()
        # deduper_agent = DeduperAgent()
        tasker_agent = TaskerAgent()
        # parser_agent = ParserAgent()
        elaborator_agent = ElaboratorAgent()  

        # Test it with a simple message
        # response = LLMClient.get_llm().invoke([ HumanMessage(content="Give me a study plan to learn Python in 2 weeks, structure should be a weekly goal list that person can use to track progress")])


        # planner_response = planner_agent.run(
        #     goal="Learn Python",
        #     duration="2",
        #     skills="basic programming, problem-solving"
        # )

        # print("✅ planner response generated")

        # # print(dummy_planner_response)
        # planner_response = dummy_planner_response

        
        tasker_response = tasker_agent.run(goal=planner_response)
        # print(tasker_response)

        def extract_weeks(xml_string: str) -> list[str]:
            week_blocks = re.findall(r"<week>.*?</week>", xml_string, re.DOTALL)
            return [block.strip() for block in week_blocks]
        tasker_response = dummy_tasker_response
        weekly_xml = extract_weeks(tasker_response)
        
        json_response = dict()

        for i in range(len(weekly_xml)):
            current_week = weekly_xml[i]
            elaborator_response = elaborator_agent.run(goal=current_week)
            
            # # for testing
            # elaborator_response = dummy_elaborator_response
            
            # Remove ```json or ``` if present
            elaborator_response = re.sub(r"^```(?:json)?|```$", "", elaborator_response.strip(), flags=re.MULTILINE).strip()

            #remove everything before the first `{` and after the last `}`
            start = elaborator_response.find("{")
            end = elaborator_response.rfind("}") + 1
            json_str = elaborator_response[start:end]
            
            json_response[f'week_{i+1}'] = json.loads(json_str)
        


        
        print("Final output generated.")
        print(json.dumps(json_response, indent=2))
        

    elif mode == "prod":
        uvicorn.run(app, host="0.0.0.0", port=8000)
    else:
        pass


if __name__ == "__main__":
    main('prod')
    
