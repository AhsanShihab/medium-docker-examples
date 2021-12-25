# Using python:3.10 as the base image
FROM python:3.10

# Changing working directory to /server
WORKDIR /server/

# Copying the requirements.txt file
COPY ./requirements.txt /server/requirements.txt

# Installing the dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copying the source code
COPY . .

# Setting the command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
