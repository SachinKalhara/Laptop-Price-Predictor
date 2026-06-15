# Python 3.9 භාවිතා කිරීම
FROM python:3.9-slim

# වැඩ කරන ෆෝල්ඩරය සැකසීම
WORKDIR /code

# Requirements ගොනුව Copy කර අදාළ packages Install කිරීම
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# සියලුම ගොනු (Model එක සහ Python කේත) Copy කිරීම
COPY . /code

# Hugging Face හි Default Port එක වන 7860 හරහා FastAPI Run කිරීම
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]