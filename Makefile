GREEN='\e[1m\e[92m'
BLUE='\e[1m\e[34m'
NC='\e[0m'

prod:
	make logo
	@echo "${GREEN}Environment configuration...${NC}"
	cp ./.env.prod.dist ./.env || exit
	cp ./back/.env.prod.dist ./back/.env || exit
	cp ./front/.env.prod.dist ./front/.env || exit
	@echo "${GREEN}Environment configuration complete!${NC}"
	make down
	@echo "${GREEN}Docker-compose build and up start...${NC}"
	docker compose up --build -d
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
	docker compose stop
	@echo "${GREEN}Docker-compose down is complete!${NC}"

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







