FROM python:3.10
RUN pip install "fastapi[all]"
COPY . /server/
WORKDIR /server/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]