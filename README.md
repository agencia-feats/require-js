## FUNÇÃO REQUIRE PARA JAVASCRIPT 

Função desenvolvida para importar um scripts Javascript de maneira simples e rápida.

### Modo de usar:

Antes de carregar qualquer coisa, insira o script em seu sistema:

```html	
 <script src="/assets/js/require.js"></script>
```

Agora vamos configurar os alias e caminhos criando um arquivo JSON (*cdnjs.json*):

```json	
{
	"bootstrap": {
		"js": [
			"/assets/js/bootstrap.js",
			"/assets/js/bootstrap.bundle.min.js"
		],
		"css": [
			"/assets/css/style.css",
			"/assets/css/bootstrap.min.css"
		]
	},
	"slickCarousel": {
		"js": ["/assets/js/slick.min.js"],
		"css": ["/assets/css/slick.min.css"]
	},
}
```

Importamos  agora o JSON com todos os caminhos 

```javascript
require.setup('path/json/arquivo.json');
```
Para utilizar os arquivos utilize assim:
```html
<!DOCTYPE html>
<html>  
	<head>    
		<script src="/assets/js/require.js"></script>
		<script>
			require.setup('/assets/json/arquivo.json');
		</script>
	</head>
	<body>
		<div>Olá Mundo</div>
		<script>
			require.require('bootstrap');
			require.require('slickCarousel');
		</script>
	</body>
</html>
```
### ALIAS vs URL:
Caso o script não esteja cadastrado no alias, a classe entenderá que é uma URL e inserirá como um arquivo remoto da seguinte maneira:
```html
<script>
	require.require('/jquery-3.2.1.min.js'); // URL
</script>

<!-- RETORNA !-->
<script src="/jquery-3.2.1.min.js"></script>
	
```
 Caso o script inserido esteja no JSON, a classe interpretará da seguinte maneira:
  ```html
	<script>
		require.require('bootstrap'); //ALIAS
	</script>
	
	<!-- Retornará o preset inteiro: !-->
	<link href="/assets/css/bootstrap.bundle.min.js" rel="stylesheet">
	<link href="/assets/css/style.css" rel="stylesheet">
	<script src="/assets/js/bootstrap.js"></script>
	<script src="/assets/js/bootstrap.bundle.min.js"></script>

```

## Importação inline
Você pode configurar também o modo de importação:
```html
<script>
	require.import('./assets/js/localScript.js',{async: false,inline: false});
	require.import('./assets/js/localScript.js',{async: false,inline: true});
	require.import('./assets/css/style.css',{inline: false});
	require.import('./assets/css/style.css',{inline: true});
</script>
```
O Resultado será:
```html

<script required="true" src="./assets/js/localScript.js"></script>
<script required="true"  path="./assets/js/localScript.js">
	alert("esse é meu script")
</script>



<link required="true" rel="stylesheet" type="text/css" href="./assets/css/style.css">
<style required="true" rel="stylesheet" type="text/css" path="./assets/css/style.css">
	#div{
		display:none;
	}
</style>

```

## Exportando e importando funções

Para exportar suas funções, é necessário que o arquivo importado esteja dentro de objetos dessa maneira:
```javascript
/* 
   meu_arquivo.js
*/
exemplo={
	minhaFn:function(){
		alert("Olá mundo!")
	}
}
//Exportando
require.export(exemplo,"meuAlias");
```

Agora para utilizar ele globalmente em seu projeto basta utilizar assim:
```javascript
require.import('/assets/js/meu_arquivo.js')
require.meuAlias.minhaFn();
```
Ou ainda escrever inline direto no arquivo desta maneira:

```javascript
require.export(function(){

	alert("testeeeeeee")

},"alerta")
```

e executar normalmente posteriormente:
```javascript
require.alerta()
```



