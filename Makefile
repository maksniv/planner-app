GREEN='\e[1m\e[92m'
BLUE='\e[1m\e[34m'
NC='\e[0m'

prod:
	logo
	@echo "${GREEN}Environment configuration...${NC}"
	docker compose up --build -d

first-start:
	make logo
	@echo "${GREEN}Environment configuration...${NC}"
	cp ./.env.dev.dist ./.env || exit
	cp ./back/.env.dev.dist ./back/.env || exit
	cp ./front/.env.dev.dist ./front/.env || exit
	@echo "${GREEN}Environment configuration complete!${NC}"
	make down
	@echo "${GREEN}Back-end installation start...${NC}"
	cd ./back && yarn install && cd ../ || exit
	@echo "${GREEN}Back-end installation complete!${NC}"
	@echo "${GREEN}Front-end installation start...${NC}"
	cd ./front && yarn install && cd ../ || exit
	@echo "${GREEN}Front-end installation complete!${NC}"
	@echo "${GREEN}Docker-compose build and up start...${NC}"
	docker compose up --build --force-recreate
	@echo "${GREEN}Bye!${NC}"

dev:
	make logo
	@echo "${GREEN}Environment configuration...${NC}"
	cp ./.env.dev.dist ./.env || exit
	cp ./back/.env.dev.dist ./back/.env || exit
	cp ./front/.env.dev.dist ./front/.env || exit
	@echo "${GREEN}Environment configuration complete!${NC}"
	make down
	@echo "${GREEN}Docker-compose build and up start...${NC}"
	docker compose up --build --force-recreate
	@echo "${GREEN}Bye!${NC}"

down:
	@echo "${GREEN}Docker-compose down start...${NC}"
	docker compose down --remove-orphans
	@echo "${GREEN}Docker-compose down is complete!${NC}"

#action_up_prod() {
#  # Set Environment
#  echo -e "${GREEN}Environment configuration...${NC}"
#  echo -e "${GREEN}...${NC}"
#  cp "./.env.dev.dist.$ARG.dist" ./.env.dev.dist || exit
#  cp "./back/.env.dev.dist.$ARG.dist" ./back/.env.dev.dist.local || exit
#  echo -e "${GREEN}Environment configuration complete!${NC}"
#  echo -e "${GREEN}...${NC}"
#  action_down
#  # Docker Compose build & up
#  echo -e "${GREEN}DOCKER-COMPOSE BUILD AND UP START...${NC}"
#  echo -e "${GREEN}...${NC}"
#  docker-compose up -d --build
#  echo -e "${GREEN}...${NC}"
#  echo -e "${GREEN}DOCKER-COMPOSE UP IS COMPLETE!${NC}"
#}

logo:
	@echo "${GREEN} __    __     ______     __  __   ${NC}"
	@echo "${GREEN}/\ \-./  \   /\  __ \   /\_\_\_\  ${NC}"
	@echo "${GREEN}\ \ \-./\ \  \ \  __ \  \/_/\_\/_ ${NC}"
	@echo "${GREEN} \ \_\ \ \_\  \ \_\ \_\   /\_\/\_\${NC}"
	@echo "${GREEN}  \/_/  \/_/   \/_/\/_/   \/_/\/_/${NC}"
	@echo "${GREEN}                                  ${NC}"
	@echo "${GREEN} ______   __         ______     __   __     __   __     ______     ______   ${NC}"
	@echo "${GREEN}/\  == \ /\ \       /\  __ \   /\ '-.\ \   /\ '-.\ \   /\  ___\   /\  == \  ${NC}"
	@echo "${GREEN}\ \  _-/ \ \ \____  \ \  __ \  \ \ \-.\ \  \ \ \-.\ \  \ \  __\   \ \  __<  ${NC}"
	@echo "${GREEN} \ \_\    \ \_____\  \ \_\ \_\  \ \_\  \_\  \ \_\  \_\  \ \_____\  \ \_\ \_\${NC}"
	@echo "${GREEN}  \/_/     \/_____/   \/_/\/_/   \/_/ \/_/   \/_/ \/_/   \/_____/   \/_/ /_/${NC}"
	@echo "${GREEN}                                                                            ${NC}"







