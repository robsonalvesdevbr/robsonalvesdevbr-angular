import { inject, provideAppInitializer } from "@angular/core"
import { ConfigService } from "@path-services/config.service"

// essa função será registrada em app.config.ts
export function provideConfigInitializer() {
	// essa função registra um initializer de forma transparente
	return provideAppInitializer(() => {
		// faz a injeção do service que permite recuperar as configurações do servidor
		const configService = inject(ConfigService)

		// faz a requisição HTTP e mantém as configurações em memória
		return configService.getData()
    console.log('Configurações carregadas no startup...')
	})
}
