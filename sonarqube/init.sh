# Install docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker

# Install dockercompose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo docker-compose --version

#Install sonarqube
sudo docker-compose up -d