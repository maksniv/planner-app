GREEN='\e[1m\e[92m'
BLUE='\e[1m\e[34m'
NC='\e[0m'

prod:
	logo
	@echo "${GREEN}Environment configuration...${NC}"
	docker compose up --build -d

dev:
	make logo
	@echo "${GREEN}ENVIRONMENT CONFIGURATION...${NC}"
	cp ./.env.dev.dist ./.env || exit
	cp ./back/.env.dev.dist ./back/.env || exit
	cp ./front/.env.dev.dist ./front/.env || exit
	@echo "${GREEN}ENVIRONMENT CONFIGURATION COMPLETE!${NC}"
	make down
	@echo "${GREEN}Back-end installation start...${NC}"
	cd ./back && yarn install && cd ../ || exit
	@echo "${GREEN}Back-end installation complete!${NC}"
	@echo "${GREEN}Front-end installation start...${NC}"
	cd ./front && yarn install && cd ../ || exit
	@echo "${GREEN}Front-end installation complete!${NC}"
	@echo "${GREEN}DOCKER-COMPOSE BUILD AND UP START...${NC}"
	docker compose up --build --force-recreate
	@echo "${GREEN}BYE BYE!${NC}"

down:
	@echo "${GREEN}DOCKER COMPOSE DOWN START...${NC}"
	docker compose down --remove-orphans
	@echo "${GREEN}DOCKER COMPOSE DOWN IS COMPLETE!${NC}"

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
# __    __     ______     __  __
#/\ "-./  \   /\  __ \   /\_\_\_\
#\ \ \-./\ \  \ \  __ \  \/_/\_\/_
# \ \_\ \ \_\  \ \_\ \_\   /\_\/\_\
#  \/_/  \/_/   \/_/\/_/   \/_/\/_/
#
# ______   __         ______     __   __     __   __     ______     ______
#/\  == \ /\ \       /\  __ \   /\ "-.\ \   /\ "-.\ \   /\  ___\   /\  == \
#\ \  _-/ \ \ \____  \ \  __ \  \ \ \-.  \  \ \ \-.  \  \ \  __\   \ \  __<
# \ \_\    \ \_____\  \ \_\ \_\  \ \_\\"\_\  \ \_\\"\_\  \ \_____\  \ \_\ \_\
#  \/_/     \/_____/   \/_/\/_/   \/_/ \/_/   \/_/ \/_/   \/_____/   \/_/ /_/







