from openai import OpenAI

client = OpenAI(api_key="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")

def generate_recommendations(objective,budget):
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[

    {"role": "system","content": "i want you to act as a financial counselor.analyse this objective and give me 6 recommendations to achieve them or get the best result possible.dont write too much"},

    {"role": "user","content": objective +"my budget is : " + budget}
        ],

    temperature=0.7
    )

    return response.choices[0].message.content

#print(generate_recommendations("i wanna host a hackathon with 13 teams in 3 days i have to feed theme give me financial advuce","1000$"))