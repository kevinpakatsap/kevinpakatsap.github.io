import os
import openai

openai.api_key = "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"

# Upload the file
response = openai.File.create(
  file=open("kevin-data.jsonl", "rb"),
  purpose='fine-tune'
)
file_id = response['id']

# Start the fine-tuning job
openai.FineTuningJob.create(training_file=file_id, model="gpt-3.5-turbo")
